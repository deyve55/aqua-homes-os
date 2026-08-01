import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function decode(value) {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
}

function sign(input, secret) {
  return createHmac('sha256', secret).update(input).digest('base64url');
}

function safeEqualText(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function hashPassword(password, salt) {
  return `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`;
}

export function verifyPassword(password, stored) {
  const [algorithm, salt, expected] = stored.split('$');
  if (algorithm !== 'scrypt' || !salt || !expected) return false;
  return safeEqualText(hashPassword(password, salt), stored);
}

export function issueSession(config, claims) {
  const now = Math.floor(Date.now() / 1000);
  const header = encode({ alg: 'HS256', typ: 'AQUA' });
  const payload = encode({ ...claims, iat: now, exp: now + config.sessionTtlSeconds });
  const input = `${header}.${payload}`;
  return `${input}.${sign(input, config.sessionSecret)}`;
}

export function verifySession(config, token) {
  if (!token || !config.sessionSecret) return null;
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return null;
  const input = `${header}.${payload}`;
  if (!safeEqualText(sign(input, config.sessionSecret), signature)) return null;
  try {
    const claims = decode(payload);
    if (!claims.exp || claims.exp <= Math.floor(Date.now() / 1000)) return null;
    if (!claims.sub || !claims.tenantId) return null;
    return claims;
  } catch {
    return null;
  }
}

export function authenticateOwner(config, params) {
  if (config.developmentAuth) {
    return {
      sub: 'development-owner',
      email: params.email,
      tenantId: 'aqua-homes-development',
      roles: ['owner'],
      deviceId: params.deviceId,
    };
  }
  const emailMatches = params.email.toLocaleLowerCase('en-US') === config.ownerEmail.toLocaleLowerCase('en-US');
  if (!emailMatches || !verifyPassword(params.password, config.ownerPasswordHash)) return null;
  return {
    sub: 'owner',
    email: config.ownerEmail,
    tenantId: 'aqua-homes',
    roles: ['owner'],
    deviceId: params.deviceId,
  };
}

export function verifyAdapterCredential(config, { adapterId, key, tenantId }) {
  if (!adapterId || !key || !tenantId) return false;
  const credential = config.adapterCredentials?.[adapterId];
  if (!credential || typeof credential !== 'object') return false;
  const expected = String(credential.key ?? '');
  if (!expected || !safeEqualText(key, expected)) return false;
  const allowedTenantIds = Array.isArray(credential.tenantIds)
    ? credential.tenantIds.map(String)
    : [];
  return allowedTenantIds.includes(tenantId);
}
