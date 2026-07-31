# Aqua Command Center v0.2.3 — Upload Required

Dave stated that the other chat owns the v0.2.3 repair and will upload it.

Upload these files into this directory:

```text
Aqua-Command-Center-Widget-v0.2.3.apk
Aqua-Command-Center-Widget-v0.2.3-source.zip
Aqua-Command-Center-Widget-v0.2.3-verification.txt
Aqua-Command-Center-Widget-v0.2.3-package.txt
README.md
```

The verification receipt must contain:

- APK SHA-256;
- source ZIP SHA-256;
- version code and version name;
- application ID;
- main activity;
- widget provider/receiver class;
- `appwidget-provider` XML path;
- `resizeMode`, min/max dimensions, and target cells;
- signing certificate SHA-256;
- ZIP integrity result;
- signature schemes verified;
- exact Sentinel component:
  `com.aquahomes.sentinel/com.aquahomes.sentientos.MainActivity`;
- confirmation that the visible order is
  `Ask Aqua · Video · Photo · File`;
- confirmation that no keystore, private signing key, token, or password is
  present in the source ZIP.

After upload, update `CURRENT-STATE.json`. Do not replace pending values with
guesses or values copied from v0.2.1/v0.2.2.
