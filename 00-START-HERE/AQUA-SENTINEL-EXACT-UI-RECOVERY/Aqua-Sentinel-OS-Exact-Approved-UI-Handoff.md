# Aqua Sentinel OS — Exact Approved UI Handoff

**Filename:** `Aqua-Sentinel-OS-Exact-Approved-UI-Handoff.md`  
**Recovery date:** July 24, 2026  
**Owner and final human authority:** Dave (Deyve)  
**Request type:** Forensic recovery and implementation handoff  
**Design authority:** The approved photograph identified in the conversation at message 185, not a later code screenshot  
**Repository inspected:** `deyve55/aqua-homes-os`  
**Recovered implementation branch:** `agent/aqua-sentinel-ui-personality-v640`  
**Recovered implementation commit:** `d08a12f0107f555e0dd1ee942fa2a3070e27c088`  
**Draft pull request:** [PR #191](https://github.com/deyve55/aqua-homes-os/pull/191)  
**Production status:** Isolated review proof; not merged to `main`

---

## 1. Executive recovery determination

The binding visual authority is the photograph Dave uploaded and approved in the conversation with:

> “This is the approved design you generated.”

The assistant then confirmed:

> “This exact on-screen design is now the approved visual source of truth—no reinterpretation.”

That approved photograph came after these design decisions:

1. Use the cleaner orbital/command-center upper composition.
2. Use the earlier three-dimensional business-card deck for the lower composition.
3. Replace the softer/fluid `A` with the sharp architectural metallic `A`.
4. Keep the `A` completely stationary.
5. Pulse only the center voice light, narrow waveform, and light beams.
6. Keep five curved cards visible.
7. Keep both lower intelligence cards and the complete bottom navigation visible.
8. Preserve compact portrait density instead of expanding the design into a desktop dashboard.

The later `v0.64.0` APK is **not** the original approved photograph. It is a source-recoverable implementation attempt based on the photograph. Its CSS values are useful engineering evidence, but they are not authoritative measurements of the original image.

The exact original approved photograph and exact original MP4 were created in a previous scratch workspace. Automated workspace maintenance removed those scratch bytes. Dave did not delete them. Neither file is present in:

- The current scratch workspace.
- The three supplied Golden Goose files.
- The recovered `v0.64.0` GitHub source.
- The recovered GitHub Actions artifact.

Therefore this handoff does not substitute a recreated image or a newly rendered video for the missing originals.

---

## 2. Evidence classification

This handoff uses four explicit evidence classes.

### VERIFIED ORIGINAL VALUES

Values explicitly approved by Dave or stated in the design conversation. These are binding even when the original pixels are temporarily unavailable.

### VALUES RECOVERED FROM SOURCE

Exact HTML, CSS, JavaScript, SVG, Android, workflow, and artifact values recovered from commit `d08a12f`. These describe the `v0.64.0` implementation attempt. They must not silently replace measurements from the approved photograph.

### VALUES THAT MUST STILL BE MEASURED

Values that require the original approved photograph or original video bytes. No exact number is asserted without those bytes.

### ANY MISSING ASSETS

Named or identifiable assets whose provenance survives but whose actual bytes were not recoverable.

---

# VERIFIED ORIGINAL VALUES

## 3. Binding visual authority

The following points are verified from Dave’s approval and correction chain.

### 3.1 Overall composition

- Phone-first portrait composition.
- Compact, premium, cinematic density.
- Entire approved surface remains visible as one composition.
- Do not stretch the design into a desktop dashboard.
- Do not split the portrait composition into unrelated left/right dashboard columns.
- The central Aqua presence remains visually dominant.
- Five curved/orbital application cards remain visible together.
- Two lower intelligence/operational cards remain visible.
- The complete bottom navigation rail remains visible.
- No generic oversized tiles.
- No generic circular energy field.
- No flat-letter replacement for the architectural `A`.
- No cartoonish, explosive, oversized, or rainbow motion.
- No redesign, simplification, modernization, or “inspired by” interpretation.

### 3.2 Aqua architectural `A`

- The metallic/faceted architectural `A` is Aqua’s stable frame.
- Its geometry, position, and scale remain stationary in idle, listening, thinking, and speaking states.
- The `A` does not breathe.
- The `A` does not lift.
- The `A` does not scale.
- The `A` does not pulsate.
- Aqua’s light originates within the center of the frame.

### 3.3 Voice light and waveform

- The waveform is narrow, symmetrical, centered, and contained.
- Listening emphasizes a restrained rear-aura shimmer.
- Speaking emphasizes the center light and contained waveform.
- Speaking energy starts at the center, then radiates left, right, and slightly upward.
- The light follows Aqua’s actual outgoing speech cadence.
- The animation is not a generic looping video.
- Pulse intensity and timing are tied to spoken output.
- Voice energy remains close to the architectural `A`.

### 3.4 Application deck

- Exactly five application cards remain visible in the intended curved composition.
- Cards rotate smoothly as one synchronized deck.
- The selected card is visually forward and slightly larger.
- Dummy client and business information is permitted during development.
- Aqua can rotate the deck by voice.
- Aqua can select a card by voice.
- A selected card opens into the lower half of the screen.
- A “Go deeper” action opens the selected application full-screen.
- Aqua can read and discuss the dummy information inside the selected card.

### 3.5 Lower intelligence cards and navigation

- Two lower intelligence cards remain visible beneath the rotating deck.
- They synchronize with the selected application.
- The complete bottom navigation remains visible in the normal closed state.
- The approved navigation may not be replaced with a different generic navigation system.

### 3.6 Conversation behavior

- One activation begins a continuing conversation session.
- Aqua automatically returns to listening after she finishes speaking.
- The user can interrupt Aqua.
- Aqua must not interrupt the user.
- Aqua supports natural turn-taking and barge-in.
- Aqua’s personality can move between warm/giddy/witty and focused/professional.
- The business backends may remain deferred while the UI and Aqua’s conversational presence are developed.

### 3.7 Name recovered from the original demonstration

The generated demonstration video used the exact spoken reply:

> “Good morning, Davy. I’m online and ready. What would you like to handle first?”

The conversation also records that `Good morning, Davy` was displayed as live highlighted words.

`Davy` is therefore verified for the demonstration video. The precise name and title printed in the approved still photograph cannot be verified without the original image bytes and must not be silently changed to `Dave`, `Deyve`, or another spelling.

### 3.8 Original video facts

- Known filename: `Aqua-Sentinel-OS-Good-Morning-Davy-Demo.mp4`
- Known duration: approximately 9.6 seconds.
- Known sequence:
  1. A person holds or raises the phone.
  2. The user says, “Good morning, Aqua.”
  3. Aqua changes from idle to listening.
  4. Aqua answers using `Davy`.
  5. The center light and directional beams respond to Aqua’s spoken cadence.
- The demonstration was described as audio-envelope-driven rather than a repeating generic pulse.

---

# VALUES RECOVERED FROM SOURCE

## 4. Source and artifact provenance

The following implementation files were recovered byte-for-byte from commit `d08a12f0107f555e0dd1ee942fa2a3070e27c088`.

| Path | Git blob SHA |
|---|---|
| `.github/workflows/android-sentinel-apk.yml` | `4f2670a9388477b4a953d275fbb83c757c2cea75` |
| `SENTINEL_UI_PERSONALITY_PROOF_V640.md` | `22e8c11edb693e4eba7bcbbabaab7c690d3222c4` |
| `package.json` | `2763303badce074d203aa4b5238f32fef2f1ddaf` |
| `sentinel-app/index.html` | `be415d68b6791019ad5fc97f0711412ea19cbbdd` |
| `sentinel-app/styles.css` | `bac3ae01ca19afde53e528f85ccdb578d978f95a` |
| `sentinel-app/v64.css` | `83d8259f4c4efb104d14466e28b62c591ccb3afb` |
| `sentinel-app/app.js` | `d2b29668ca03cfd021b301a0d768d1b8ca6c51bb` |
| `sentinel-app/manifest.webmanifest` | `20a91393656603aaa77b83859d8c9a36ab18a3df` |
| `sentinel-app/service-worker.js` | `1ca4cac301ae447173dbba830d103a64c51c105e` |
| `android/settings.gradle` | `eb314961d65dd97c9cc8fa9c0feb40d80c3823d1` |
| `android/build.gradle` | `48d2fa10af0d11f9ed6d2e3309b4c6c59395ff34` |
| `android/gradle.properties` | `2e11322913e56c04783e2f5dbe7927b9e0539007` |
| `android/app/build.gradle` | `125255ecc35314453f74027deafc24e1d5230ca2` |
| `android/app/src/main/AndroidManifest.xml` | `09b67875beebbaed9503a8be7bed57f453032ce1` |
| `android/app/src/main/java/com/aquahomes/sentinel/MainActivity.java` | `21beb342be65baa97cc44521890e9112933c9172` |
| `tests/sentinel-smoke.mjs` | `38861b8ffb0ec4f355cb7be83a4597799c3fd40f` |

The six web assets packaged inside the APK match the recovered source byte-for-byte:

- `app.js`
- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `styles.css`
- `v64.css`

## 5. Recovered artifact bundle

GitHub Actions run: `30089762544`  
Artifact ID: `8595204447`  
Artifact name: `Aqua-Sentinel-OS-v0.64.0-ui-personality`

Original GitHub artifact link:

<https://github.com/deyve55/aqua-homes-os/actions/runs/30089762544/artifacts/8595204447>

The artifact contains:

| File | Dimensions / type | SHA-256 |
|---|---:|---|
| `Aqua-Sentinel-OS-v0.64.0-Fold-portrait-idle.png` | 729 × 1536 PNG | `a2b66472adc7d1f62c8319fc2bbf5e46dd3f8bd78ec7f0bacf1dbb1f328baca7` |
| `Aqua-Sentinel-OS-v0.64.0-Fold-portrait-speaking.png` | 729 × 1536 PNG | `b3350fded7596a5abb91d11863a65d778228242ea7a71a8de108a2f23ff87f73` |
| `Aqua-Sentinel-OS-v0.64.0-DeX-landscape.png` | 1536 × 1024 PNG | `73807e4d0ad0fe47e4a1d39c8db8134d753a5292b1feb0a1fb47f58e04a4cd80` |
| `Aqua-Sentinel-OS-v0.64.0-ui-personality.apk` | Android APK | `361d350869cf80c100f9530268eb8eb3c77825ac88b2d5b025ddaf7efb5d6c88` |

The screenshots above are implementation evidence. They are not the original approved photograph.

## 6. Recovered viewport and shell values

### 6.1 Workflow render viewports

| Mode | Exact workflow viewport | Aspect ratio |
|---|---:|---:|
| Fold portrait proof | `729 × 1536` | `243:512` |
| DeX landscape proof | `1536 × 1024` | `3:2` |

These are exact workflow values. They are not proven to be the pixel dimensions of the original approved photograph.

### 6.2 Base shell

Final `v64.css` values:

```css
.sentinel-shell {
  --shell-width: 820px;
  width: min(100%, var(--shell-width));
  min-height: 100vh;
  padding:
    var(--safe-top)
    clamp(12px, 3vw, 24px)
    calc(82px + var(--safe-bottom));
  overflow: hidden;
}
```

Inherited safe-area values:

```css
--safe-top: max(14px, env(safe-area-inset-top));
--safe-bottom: max(12px, env(safe-area-inset-bottom));
```

At a 729-pixel CSS viewport, the horizontal shell padding evaluates to `21.87px` before pixel rounding.

## 7. Recovered measurements and positions

All values in this section describe the source-recovered `v0.64.0` implementation.

### 7.1 Header

```css
.system-bar {
  display: grid;
  grid-template-columns: 1.05fr 1.65fr 1fr 0.9fr auto auto;
  gap: 12px;
  min-height: 68px;
  padding: 10px 14px;
  border: 1px solid rgba(128, 196, 223, 0.16);
  border-radius: 15px;
  background: rgba(1, 7, 13, 0.82);
  backdrop-filter: blur(22px);
}
```

Recovered header content:

- AQUA / SENTINEL OS
- Demo Command Center
- Site ID: DEMO-01 · UI proof
- Ready / Local personality
- Private / Audio not stored
- 98% battery
- Local time

The source header does **not** contain Dave’s printed name or title. That is a known mismatch with the requested approved-photo measurement.

### 7.2 Aqua region

| Element | Recovered source value |
|---|---|
| `.aqua-domain` | `min-height: 605px; padding-top: 10px` |
| `.presence-stage` | `height: 405px; perspective: 1000px` |
| Rear halo | `top: 43%; left: 50%; width: min(86vw, 620px); height: 270px; blur(8px)` |
| Aqua orbit | `top: 49%; left: 50%; width: min(92vw, 690px); height: 160px; rotateX(70deg)` |
| Aqua core | `top: 48%; width: min(52vw, 330px); aspect-ratio: 340/360; translateZ(72px)` |
| Voice field | `top: 49%; width: min(94vw, 700px); height: 240px` |
| Identity block | `margin-top: -24px; centered` |
| Conversation console | `width: min(92%, 610px); min-height: 120px; margin-top: 15px` |

At the 729-pixel workflow viewport, `.aqua-core` is capped at `330px` wide. Its aspect ratio produces an approximately `349.41px` high SVG box before rendering effects.

### 7.3 Greeting, name, and title in source

The source contains:

```text
Good morning, Davy. I’m ready when you are.
```

The longer source greeting is:

```text
Good morning, Davy. There you are. I was beginning to think the coffee had won.
I’m awake, the interface is alive, and Financial Command is centered.
What are we tackling first?
```

Source states use:

- `Listening to Davy`
- Speaker label `DAVY`
- Speaker label `AQUA`

The source does not contain an exact printed owner title for Dave. The approved photograph must be measured to recover that text.

### 7.4 Architectural `A`

Recovered SVG view box:

```html
viewBox="0 0 340 360"
```

Recovered paths:

```svg
<path
  d="M170 18 322 329 256 329 216 246 124 246 84 329 18 329 170 18Zm0 112-28 60h56l-28-60Z"
/>
<path
  d="M170 65 286 307 254 307 170 132 86 307 54 307 170 65Z"
/>
<path d="M170 116 238 259 211 259 170 176 129 259 102 259 170 116Z" />
<path d="M104 231 170 191 236 231 209 251 170 228 131 251Z" />
<path d="M103 231H237" />
```

Recovered metallic gradient:

| Stop | Color |
|---:|---|
| `0` | `#f7fcff` |
| `.12` | `#8d9ba8` |
| `.30` | `#182632` |
| `.52` | `#03080d` |
| `.75` | `#152634` |
| `.90` | `#6f8493` |
| `1` | `#e8f6fb` |

Recovered edge gradient:

| Stop | Color |
|---:|---|
| `0` | `#14d9ff` |
| `.48` | `#dffbff` |
| `1` | `#eab052` |

Recovered dark face gradient:

| Stop | Color / opacity |
|---:|---|
| `0` | `#183043` at `.72` |
| `.58` | `#02070d` at `.98` |
| `1` | `#07131e` |

Recovered frame lock:

```css
.architectural-a,
.sentinel-shell[data-aqua-state] .architectural-a,
.sentinel-shell.voice-pulse .architectural-a {
  animation: none !important;
  transform: none !important;
  transition: none !important;
}
```

### 7.5 Center light and contained waveform

Recovered center light:

```css
.core-light {
  top: 64.1%;
  width: 16%;
  height: 5px;
  background: #f5feff;
  transform: translate(-50%, -50%) scaleX(var(--voice-core-scale));
  box-shadow:
    0 0 3px 1px #fff,
    0 0 var(--voice-core-glow) var(--voice-core-spread)
      rgba(23, 215, 255, 0.78),
    -18px 0 22px 1px rgba(23, 215, 255, 0.14),
    18px 0 22px 1px rgba(23, 215, 255, 0.14);
}
```

Recovered waveform:

```css
.voice-spectrum {
  top: 64%;
  width: min(42vw, 270px);
  height: 38px;
  mask-image:
    linear-gradient(90deg, transparent, #000 24%, #000 76%, transparent);
}
```

- Exact source bar count: `48`.
- Default bar width: `2px`.
- Every third bar: `1px`.
- Default/minimum bar height: `2px`.
- Maximum CSS bar height: `20px`.
- Speaking energy algorithm weights the bars toward the center.

Recovered speaking-energy mapping:

```text
core scale  = 1 + energy × 0.10
core glow   = 12px + energy × 10px
core spread = 3px + energy × 3px
```

Native audio energy is clamped to `[0, 1]` and held for `100ms` per update.

### 7.6 Five-card curved carousel

Base card:

```css
.app-card {
  top: 19px;
  left: 50%;
  width: 154px;
  height: 286px;
  gap: 10px;
  padding: 14px 12px 12px;
  border-radius: 13px;
}
```

The parent `.deck-viewport` provides `perspective: 1200px`.

Exact recovered positions:

| Position | Transform | Opacity | z-index |
|---|---|---:|---:|
| Far previous | `translate3d(-350px, 29px, -170px) rotateY(28deg) scale(.74)` | `.57` | `1` |
| Previous | `translate3d(-230px, 10px, -70px) rotateY(15deg) scale(.90)` | `.84` | `3` |
| Active | `translate3d(-50%, -3px, 56px) rotateY(0deg) scale(1.08)` | `1` | `8` |
| Next | `translate3d(76px, 10px, -70px) rotateY(-15deg) scale(.90)` | `.84` | `3` |
| Far next | `translate3d(196px, 29px, -170px) rotateY(-28deg) scale(.74)` | `.57` | `1` |

Carousel viewport:

```css
.deck-viewport {
  min-height: 340px;
  perspective: 1200px;
}
```

Carousel ring:

```css
.deck-ring {
  bottom: 13px;
  left: 50%;
  width: 112%;
  height: 94px;
  rotateX: 70deg;
}
```

Recovered transition:

```css
transform: 680ms cubic-bezier(0.16, 0.78, 0.24, 1);
opacity: 480ms ease;
border-color: 480ms ease;
box-shadow: 480ms ease;
filter: 480ms ease;
```

The JavaScript keeps the deck-turning class active for `720ms`.

### 7.7 Two lower intelligence cards

Recovered grid:

```css
.exception-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 14px;
  padding-top: 21px;
}
```

Recovered card:

```css
.exception-card {
  min-height: 222px;
  padding: 17px;
  border-radius: 15px;
}
```

The right card uses gold attention styling. The left card uses cyan/confirmed styling. Both synchronize to the selected application in JavaScript.

### 7.8 Bottom navigation rail

Recovered base geometry:

```css
.bottom-nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  width: min(100%, var(--shell-width));
  min-height: calc(70px + var(--safe-bottom));
  margin: 0 auto;
  padding: 8px 12px var(--safe-bottom);
  border-radius: 0;
  background: rgba(1, 7, 13, 0.94);
}
```

Recovered items:

1. Home
2. Messages
3. Data Hub
4. Settings
5. Sign Out

The exact approved-photograph icons and labels must be compared after the original photograph is restored.

## 8. Recovered palette, glass, borders, shadows, and background

### 8.1 Core palette

| Token | Exact source value |
|---|---|
| Black | `#01050a` |
| Ink | `#020914` / base `#02070d` |
| Panel | `rgba(3, 15, 25, .90)` |
| Cyan | `#18d7ff` / base `#17d7ff` |
| Cyan white | `#e8fcff` |
| Gold | `#eab052` |
| White | `#f6fbff` |
| Muted | `#7892a3` / base `#8299aa` |
| Success | `#63d49d` |
| Warning | `#f0b74b` |
| Danger | `#ff7c5e` |

### 8.2 Body background

```css
background:
  radial-gradient(
    circle at 50% 22%,
    rgba(0, 134, 185, 0.14),
    transparent 28rem
  ),
  radial-gradient(
    circle at 50% 70%,
    rgba(0, 72, 105, 0.09),
    transparent 36rem
  ),
  linear-gradient(167deg, #06111b 0%, #02070d 43%, #010307 100%);
```

### 8.3 Source glass values

| Surface | Background | Blur | Border |
|---|---|---:|---|
| Header | `rgba(1, 7, 13, .82)` | `22px` | `rgba(128, 196, 223, .16)` |
| App card | dark radial + `rgba(9, 28, 42, .94)` to `rgba(1, 7, 12, .98)` | `16px` | `rgba(122, 194, 220, .29)` |
| Active card | dark/gold radial + near-black linear | `16px` | `rgba(234, 176, 82, .84)` |
| Caption panel | `rgba(2, 12, 20, .76)` plus cyan wash | none specified | `rgba(23, 215, 255, .27)` |
| Demo sheet | `rgba(3, 14, 23, .97)` plus cyan radial | `26px` | `rgba(126, 202, 229, .28)` |
| Bottom rail | `rgba(1, 7, 13, .94)` | inherited base `24px` | cyan-tinted top border |

## 9. Recovered typography

No font files or web-font imports exist in the recovered implementation.

Exact font stack:

```css
font-family:
  Inter,
  "SF Pro Display",
  "Segoe UI Variable",
  "Segoe UI",
  system-ui,
  -apple-system,
  sans-serif;
```

This means the actual rendered face depends on fonts installed on the device. `Inter` is requested but not bundled.

Key recovered type values:

| Element | Size | Weight | Letter spacing / line height |
|---|---:|---:|---|
| Header brand AQUA | `.82rem` | `390` | `.20em` |
| Header brand subtitle | `.44rem` | inherited | `.28em` |
| Header data labels | `.64rem` | `560` | `.07em` |
| Aqua identity | `clamp(1.05rem, 3.7vw, 1.72rem)` | `300` | `.18em` |
| Identity subtitle | `clamp(.42rem, 1.3vw, .58rem)` | `650` | `.34em` |
| Conversation state | `.62rem` | `560` | `.12em` |
| Conversation subtitle | `.54rem` | normal | `.04em` |
| Live response | `clamp(.72rem, 2.1vw, .92rem)` | `340` | `.035em`, `1.55` line height |
| Card header | `.56rem` | `560` | `.025em` |
| Card title | `.62rem` | `590` | normal |
| Card subtitle | `.48rem` | normal | normal |
| Lower-card label | `.58rem` | `700` | `.12em` |
| Lower-card title | `clamp(.94rem, 3.4vw, 1.2rem)` | `480` | normal |
| Bottom-nav label | `.52rem` | normal | normal |

The approved photograph’s exact typeface cannot be declared from this stack. It must be identified from the original image or original generation record.

## 10. Recovered icons, logos, card art, and textures

### 10.1 External assets

The recovered `v0.64.0` source contains no external bitmap artwork, no external logo file, no external icon set, and no bundled font file.

### 10.2 Inline/generated assets

- Main `A`: inline SVG.
- Header mini `A`: CSS polygon clip path and gradient.
- Card artwork: CSS gradients, grid backgrounds, clip paths, pseudo-elements, and small radial dots.
- Icons: inline Unicode glyphs.
- Background texture: two CSS grid gradients over radial and linear dark gradients.
- Orbits: CSS elliptical borders.
- Voice waveform: 48 inline empty `<i>` elements animated by CSS and JavaScript.

Recovered app icons:

| App | Glyph |
|---|---|
| Overview | `▦` |
| Site Intelligence | `◇` |
| Financial Command | `$` |
| Operations | `▤` |
| Risk Monitor | `△` |

Recovered bottom-nav glyphs:

| Destination | Glyph |
|---|---|
| Home | `⌂` |
| Messages | `▤` |
| Data Hub | `◇` |
| Settings | `⌁` |
| Sign Out | `⇥` |

These are source values, not proof that the approved photograph used the same glyphs.

## 11. Recovered animation specifications

### 11.1 Idle

- Architectural `A`: no animation.
- Core values reset to:
  - Scale `1`.
  - Glow `12px`.
  - Spread `3px`.
- Waveform bars reset to `2px`.
- No repeating speaking pulse.

### 11.2 Listening

```css
listenMeter 820ms ease-in-out infinite alternate
```

- Bar delays use `calc(var(--i) * -64ms)`.
- Center light width becomes `14%`.
- Center becomes cyan-blue with a restrained shadow.
- The seven-bar state indicator uses:

```css
v64Meter 520ms ease-in-out infinite alternate
```

### 11.3 Thinking

- Core light:

```css
coreThink 780ms ease-in-out infinite alternate
```

- Rear orbit:

```css
ringThink 2.4s linear infinite
```

This rotates the ring, not the `A`.

### 11.4 Speaking

Per native TTS audio callback:

- Audio energy is normalized to `[0, 1]`.
- Core scale/glow/spread update for `100ms`.
- Waveform bars are recalculated with center weighting.

Per spoken word:

- Pulse class is removed and reapplied so each word can restart the animation.
- Left beam: `360ms ease-out`.
- Right beam: `360ms ease-out`.
- Up beam: `400ms ease-out`.
- Elliptical voice plane: `400ms cubic-bezier(.16, .72, .24, 1)`.
- The `A` remains fixed.

Browser fallback:

- Speech rate `1.03`.
- Pitch `.96`.
- Volume `1`.
- When speech-boundary events are unavailable, the fallback advances approximately every `205ms` per word.

### 11.5 Carousel rotation

- Card transform: `680ms cubic-bezier(.16, .78, .24, 1)`.
- Ring turn: `680ms`.
- Turn class removed after `720ms`.
- Swipe threshold: `34px`.
- Keyboard: left/right arrows.
- Voice: next, previous, named app, or “spin/rotate.”

### 11.6 Half-screen card opening

The recovered source does **not** implement the approved half-screen application opening exactly.

It implements a fixed demo sheet:

```css
.demo-sheet {
  position: fixed;
  right: 18px;
  bottom: calc(80px + var(--safe-bottom));
  left: 18px;
  width: min(calc(100% - 36px), 520px);
  padding: 24px;
  border-radius: 20px;
}
```

The source toggles `hidden` immediately and has no recovered opening transition for this sheet.

### 11.7 Full-screen application opening

The recovered source does **not** implement the approved “Go deeper” full-screen application transition. This remains a functional gap.

### 11.8 Conversation state timing

| Transition | Recovered source timing |
|---|---:|
| Listening → thinking/speaking preparation | `430ms` |
| Speaking complete → resume listening | `460ms` |
| Tap interruption → listening | `180ms` |
| Initial conversation start → listening | `120ms` |
| Native recognition retry | generally `520ms`; `900ms` for code 8 |
| Browser recognition retry | `640ms` |

## 12. Recovered implementation behavior

### 12.1 Working in `v0.64.0`

- Five retained cards.
- Swipe, arrow, dot, keyboard, and voice selection.
- Synchronized lower cards.
- Fixed architectural `A`.
- Center light and beams respond to outgoing local TTS.
- One-tap local listening loop.
- Tap-to-interrupt while Aqua is speaking.
- Word highlighting.
- Local canned warm/playful/professional replies.
- PWA service worker.
- Android WebView wrapper.
- Offline speech preference.
- No microphone click sound from the WebView control.

### 12.2 Not working as production AI

- No open-ended reasoning backend.
- No persistent memory.
- No live business data.
- No app-service integration.
- No provider credential.
- No Internet permission in the Android manifest.
- No production Realtime session.
- No proven full-duplex acoustic barge-in.
- No proven construction-noise speaker lock.

The source response library is deterministic/canned. It must not be represented as the final Aqua intelligence.

---

# VALUES THAT MUST STILL BE MEASURED

## 13. Original-photo measurement register

The following values require the highest-resolution approved photograph.

| Item | Exact missing measurement |
|---|---|
| Original image canvas | Pixel width, pixel height, embedded color profile, and crop |
| Phone display | Exact inner-screen bounds inside the hand-held phone image |
| Phone viewport | Exact CSS/design viewport and device pixel ratio used by the original generation |
| Header | x, y, width, height, padding, internal columns, border radius |
| Greeting | baseline, bounding box, font face, weight, size, letter spacing, line height |
| Dave/Davy name | exact spelling, capitalization, position, size, and color in the still |
| Dave’s title | exact wording, position, font, size, and color |
| Main `A` | outer box, individual facet vertices, crossbar, perspective, stroke thickness |
| Main `A` lighting | highlight positions, metallic reflections, edge colors, glow radius |
| Center light | exact width, thickness, falloff, and position inside `A` |
| Waveform | exact pixel width/height, bar count, bar spacing, symmetry, and vertical alignment |
| Rear aura | exact ellipse bounds, intensity, blur, opacity, and depth relationship |
| Application cards | exact width/height, curve, overlap, tilt, z-order, spacing, and front-card scale |
| Card contents | exact labels, imagery, typography, and placeholder data in the photograph |
| Lower cards | exact bounds, gap, border, content, and vertical position |
| Bottom rail | exact bounds, labels, icons, active state, and safe-area padding |
| Glass effects | exact alpha, blur, noise, border, inner highlight, and shadow values |
| Transitions | exact timing/easing from original motion design, if not recoverable from video frames |

No number in the source-recovered sections should be promoted into this table without an overlay comparison against the original photograph.

## 14. Original-video measurement register

The following values require the original MP4:

- Exact frame width and height.
- Exact frame rate.
- Exact video codec/profile.
- Exact audio codec/sample rate.
- Exact duration beyond the reported approximately `9.6s`.
- Exact idle-state duration.
- Exact listening-state duration.
- Exact speech start/end times.
- Per-frame pulse scale and opacity.
- Light travel distance left, right, and upward.
- Phone/hand camera motion.
- Screen-corner tracking and perspective.
- Exact highlighted-word timing.
- Whether the video contains embedded captions, separate audio, or a single flattened render.

---

# ANY MISSING ASSETS

## 15. Missing original visual assets

| Asset | Last known provenance | Recovery status |
|---|---|---|
| A-08A structural synthesis | `generated_images/call_JmjN1b7BqGCHOyUa9oWifJzj.png` | Missing after scratch maintenance |
| A-08B deeper speaking pulse | `generated_images/call_eu00zjdztpx3Tsu4aUr3KwC6.png` | Missing after scratch maintenance |
| A-09 Orbital Business Deck | `generated_images/call_xAiVxpccB0boBCZIKaLkxIzD.png` | Missing after scratch maintenance |
| Post-A-09 sharp-`A` merged visual | Identifiable from messages 101–104; no surviving stable filename in the supplied transcript | Missing |
| Final approved hand-held-phone photograph | User-uploaded/approved at conversation message 185 | Missing as file bytes |
| Original `Davy` demonstration MP4 | `motion_prototype/Aqua-Sentinel-OS-Good-Morning-Davy-Demo.mp4` | Missing after scratch maintenance |

## 16. Missing editable/generation assets

No surviving evidence was found for:

- PSD.
- Figma file.
- Canva design.
- After Effects project.
- Editable 3D project.
- Original layered composition.
- Image-generation seed.
- Image-generation model/version.
- Sampling steps.
- Guidance scale.
- Exact tool-level image-generation prompt payload.
- Exact video-generation/render script.
- Exact audio file used by the MP4.
- Exact font package used by the generated photograph.

The recovered assistant commentary describes the intended generation, but it is not the same thing as the exact tool-call payload.

---

## 17. Recovered prompt and decision history

This section preserves the exact recoverable design instructions from the supplied conversation transcript.

### 17.1 Top/bottom synthesis

Dave:

> “Let me see the top section of this one and the bottom section of the top one together and see how they look.”

Assistant synthesis record:

> “I’m keeping the entire upper orbital launcher through the selected `ACCOUNTING` tile, then replacing the alert/action/input stack with the earlier three-dimensional business-card carousel.”

### 17.2 Architectural `A` replacement and speech motion

Dave:

> “On the second image to the right that I uploaded, take the A out and put this A that's coming out on the left side.”

Dave:

> “Now when Aqua talks, it pulsates to the left and to the right, and it pulsates up.”

Dave:

> “It’s really as she talks, not just a generic playing of a video.”

### 17.3 Video demonstration

Dave:

> “Make me a video, short video of someone using the cell phone … saying, good morning, Aqua, and Aqua starts to talk.”

Dave:

> “Add me name to when agua answers back to video in dem9nstartion davy”

Assistant confirmation:

> “Good morning, Davy. I’m online and ready. What would you like to handle first?”

### 17.4 Production-direction adjustment

Dave:

> “Only thing I would tweak is slighlt larger tile on buttom of the appstack … and the lights that come out of her need to be closer to the image leave all the cards ans place holder”

### 17.5 Fixed-frame correction

Dave:

> “I don’t want the A to pulsate. The A always stays in place because the A is like her frame.”

Dave:

> “The only thing pulsating is the beams of light.”

Dave:

> “Pulsate in the middle and then radiate out … according to the voice.”

### 17.6 Final approval

Dave:

> “This is the approved design you generated.”

Dave:

> “My explicit command is to reproduce the photograph 100%.”

Dave:

> “I want to see this approved design functioning. The cards should rotate, everything to function, and the A to look like that way, and the A to function that way.”

### 17.7 Prompt-recovery truth boundary

The exact underlying image-generation tool prompt was not preserved in the supplied transcript or repository. The text above is the exact recoverable human/assistant instruction chain. It must not be relabeled as the original hidden tool payload.

---

## 18. Mismatch audit: recovered `v0.64.0` versus approved authority

The following gaps must be treated as open work.

| Area | Recovered `v0.64.0` | Required authority |
|---|---|---|
| Visual match | Coded approximation | Original photograph matched by overlay |
| Header | Demo command/status strip | Exact photograph header and Dave identity |
| `A` | Inline SVG approximation | Exact facets and metallic lighting from photograph |
| Waveform | 48 CSS bars and beams | Exact contained waveform from photograph |
| Cards | Five visible CSS cards | Exact photograph card geometry/art |
| Selected open | Small fixed demo sheet | Lower-half application opening |
| Go deeper | Not implemented | Full-screen application opening |
| Aqua intelligence | Canned local response library | Governed live conversational intelligence |
| Barge-in | Tap stops TTS, then listens | Natural interruption with correct audio lifecycle |
| DeX | Two-column split at `min-width: 1000px` | Preserve approved composition; do not become a desktop dashboard |
| Font fidelity | Device-dependent system stack | Exact photograph font or approved bundled substitute |

The `@media (min-width: 1000px)` two-column layout in `v64.css` conflicts with Dave’s locked instruction not to stretch the design into a desktop dashboard. It must not be treated as approved.

---

## 19. Exact implementation handoff

### 19.1 Non-negotiable first step

Before changing visual code:

1. Restore the original approved photograph.
2. Preserve it unchanged as the golden visual reference.
3. Record its SHA-256, pixel dimensions, and color profile.
4. Place it beside the implementation in a visual-regression fixture.
5. Do not generate a replacement reference.

If the original cannot be restored, stop exact-pixel claims. Continue only with explicitly labeled source recovery and request the original file.

### 19.2 Coordinate system

After the original is restored:

1. Identify the inner display rectangle inside the hand-held phone.
2. Perspective-correct that rectangle into a flat reference image without altering its internal pixels.
3. Establish `(0, 0)` at the flat display’s upper-left corner.
4. Measure every required component in reference pixels.
5. Store measurements as:
   - Absolute reference pixels.
   - Normalized fractions of reference width/height.
   - Responsive CSS tokens.
6. Record which values are exact and which are optical adjustments.

### 19.3 Visual architecture

Use independent layers, not a flattened screenshot:

1. Background and subtle texture.
2. Header/greeting/identity.
3. Rear aura.
4. Rear orbital line.
5. Fixed faceted `A`.
6. Center voice light.
7. Contained waveform.
8. Directional light beams.
9. Front orbital line.
10. Five-card curved deck.
11. Two lower intelligence cards.
12. Bottom navigation.
13. Lower-half detail panel.
14. Full-screen application route.

The photograph may be used only as a locked reference or visual-test overlay, not as the production screen background.

### 19.4 PWA implementation

Recommended boundary:

- Semantic HTML for structure and accessibility.
- CSS custom properties for all measured tokens.
- Inline SVG or measured vector asset for the `A`.
- Web Animations API or CSS animations only where timing is fixed.
- JavaScript state reducer for carousel and interaction state.
- Audio analyser/actual outgoing audio envelope for speaking visuals.
- Service worker for installability and offline shell.
- No provider secret in browser code.

Required UI state:

```text
idle
listening
thinking
speaking
card-rotating
card-half-open
app-full-screen
```

### 19.5 Carousel model

Use a five-item circular array with one active index.

Each render derives:

- Far previous.
- Previous.
- Active.
- Next.
- Far next.

Inputs:

- Horizontal swipe.
- Left/right controls.
- Card tap.
- Pagination dot.
- Keyboard.
- Aqua voice tool call.

On selection:

1. Rotate all five cards.
2. Move the selected card to the active transform.
3. Update both lower intelligence cards atomically.
4. Update Aqua’s conversational context.
5. Announce the selected application.

### 19.6 Lower-half application opening

The selected card opens a true half-screen panel:

- Anchored above the bottom safe area.
- Target height: measured from the approved motion/reference, not guessed.
- Keeps the fixed `A` visible above.
- Keeps visual connection to the selected card.
- Contains demo information and two actions:
  - Close/return.
  - `Go deeper`.

The recovered `demo-sheet` is a placeholder and must not be mistaken for completion.

### 19.7 Full-screen application opening

`Go deeper` must:

1. Promote the selected application into a full-screen route.
2. Preserve the selected application ID and conversational context.
3. Keep Aqua available.
4. Provide a deterministic return transition to the exact carousel position.
5. Avoid launching unrelated external Android applications through simulated taps.

### 19.8 Voice-reactive visual contract

The `A` layer is immutable during voice states.

Listening:

- Use microphone input energy only for restrained rear shimmer and contained listening bars.
- Do not animate the entire `A`.

Speaking:

- Use Aqua’s outgoing audio stream.
- Compute a smoothed RMS/peak envelope.
- Drive only:
  - Center light scale/intensity.
  - Contained waveform.
  - Left beam.
  - Right beam.
  - Up beam.
- Apply attack/release smoothing.
- Do not run a generic loop when no outgoing audio exists.
- Stop the pulse when the output audio buffer is empty.

### 19.9 Aqua conversation architecture

The recovered canned response library is a demo only.

Production direction:

- One stable Aqua gateway.
- Versioned JSON-RPC 2.0 over HTTPS unless Dave approves a different contract.
- Provider routing server-side.
- No API key in PWA or APK.
- Shared platform-neutral AI orchestration package.
- Typed UI tools:
  - `rotate_cards(direction)`
  - `select_app(app_id)`
  - `open_card(app_id)`
  - `go_deeper(app_id)`
  - `close_detail()`
  - `read_demo_card(app_id)`
- Memory and business data remain separately permissioned.

Required audio lifecycle:

```text
one activation
→ listening
→ thinking
→ speaking
→ automatic listening
```

Barge-in:

- Detect the operator while Aqua is speaking.
- Stop or duck Aqua’s audio immediately.
- Suppress Aqua’s own playback from the microphone path.
- Transition to listening without requiring another activation.
- Do not allow Aqua to interrupt the operator.

### 19.10 Android-ready implementation

The recovered Android wrapper is a WebView proof. A production Android-ready build must:

- Preserve the exact PWA visual tokens.
- Use Android audio focus correctly.
- Use echo cancellation/noise suppression where supported.
- Support Samsung Fold 7 cover/inner displays.
- Respect hinge, safe areas, and display changes.
- Preserve the portrait composition on wider displays.
- Center or proportionally scale the approved surface in DeX; do not convert it into a different dashboard.
- Keep secrets server-side.
- Use explicit offline/queued/error states.

### 19.11 Responsive rule

The reference portrait composition is the master.

For wider screens:

- Preserve its hierarchy and relative vertical order.
- Do not split Aqua and the card deck into separate dashboard columns.
- Use bounded scaling, centered framing, or additional negative space.
- Keep all five cards, both lower cards, and navigation in the intended composition.

### 19.12 Accessibility

- Maintain semantic buttons and landmarks.
- Provide visible focus states.
- Provide accessible labels for the `A`, carousel, cards, and voice state.
- Announce selected-card changes.
- Support reduced motion without moving the architectural `A`.
- Preserve adequate text contrast.
- Never replace essential state information with glow alone.

---

## 20. Acceptance gates

No build may claim “100% visual fidelity” until all gates pass.

### Gate A — Asset recovery

- Original approved still restored.
- Original MP4 restored.
- Hashes and dimensions recorded.

### Gate B — Pixel overlay

At the reference viewport:

- Header aligns.
- Greeting/name/title align.
- `A` facets align.
- Center waveform aligns.
- Five cards align.
- Two lower cards align.
- Bottom rail aligns.

Differences must be documented in pixels. “Looks close” is not a pass.

### Gate C — State screenshots

Capture:

- Idle.
- Listening.
- Thinking.
- Speaking low energy.
- Speaking high energy.
- Each of five card selections.
- Half-screen detail.
- Full-screen app.
- Return transition.

### Gate D — Motion

- `A` remains pixel-stationary across the frame sequence.
- Speech light begins only with outgoing audio.
- Pulse stops with outgoing audio.
- Card transition timing matches the approved motion reference.

### Gate E — Function

- Swipe rotates.
- Voice rotates.
- Voice selects.
- Selected card synchronizes lower cards.
- Selected card opens half-screen.
- `Go deeper` opens full-screen.
- Return restores exact carousel state.
- Aqua reads and discusses demo content.
- One activation continues the session.
- Barge-in works.

### Gate F — Physical truth

- Samsung Fold 7 physical test.
- Fold inner display.
- Fold cover display where supported.
- DeX.
- Microphone/speaker.
- Bluetooth route.
- Background construction noise.

Dave is the final visual acceptance authority.

---

## 21. Recovery validation performed

- Inspected all three supplied Golden Goose files for applicable governance and UI boundaries.
- Inspected Draft PR #191 and commit `d08a12f`.
- Recovered the full changed Sentinel source plus required build files.
- Verified every recovered source file against its GitHub blob SHA.
- Downloaded GitHub artifact `8595204447`.
- Verified APK SHA-256.
- Verified PNG dimensions and hashes.
- Verified all six packaged APK web assets match the recovered source exactly.
- Executed the recovered Sentinel tests in the partial recovery tree:
  - `10/11` passed.
  - The remaining test requires the unrelated protected keeper file `AH_v54I-3.html`, which the connector would not download because of its size.
  - The original GitHub PR record reports `11/11` on the complete repository tree.
- Did not create a substitute image.
- Did not create a substitute video.
- Did not invent original pixel measurements.

---

## 22. Exact next recovery action

Recover either of these from the original design conversation:

1. The highest-resolution image attached at the approval message:

   > “This is the approved design you generated.”

2. `Aqua-Sentinel-OS-Good-Morning-Davy-Demo.mp4`

Once either file is reattached, measure it directly and issue a new version of this same handoff. Preserve the same filename and replace/update this document rather than creating a competing “final” design record.

Until then:

- Use this handoff for provenance and source recovery.
- Use the recovered screenshots only as implementation evidence.
- Do not claim that `v0.64.0` is the exact approved visual.
- Do not authorize a redesign to fill missing measurements.

---

## 23. Final authority statement

The approved photograph and original `Davy` video remain the binding visual and motion authority. Source code, screenshots, prompts, and written descriptions are subordinate when they conflict with those originals. Missing evidence must be restored or marked missing; it must never be silently invented.
