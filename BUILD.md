# Build APK for testing

Uses [EAS Build](https://docs.expo.dev/build/introduction/) (Expo cloud) to produce a shareable **`.apk`**.

The **preview** profile bakes in the dev API URL:
`https://ea-94b10f92401641a89159d8440108e002.ecs.eu-central-1.on.aws`

## One-time setup

1. **Expo account** — free at [expo.dev](https://expo.dev/signup)

2. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

3. **Log in**
   ```bash
   eas login
   ```

4. **Link project** (first time only)
   ```bash
   cd eAnakopi_MOB
   eas init
   ```
   Accept creating a project on Expo. This writes `projectId` into `app.config.js` via `eas.json` / Expo dashboard.

## Build the APK

```bash
npm run build:apk
```

Or:

```bash
eas build --platform android --profile preview
```

- First build takes ~10–20 minutes (cloud).
- When finished, EAS prints a **download link** for the `.apk`.
- Share that link with testers — they install directly (enable “Install unknown apps” if prompted).

## Test credentials

Use the same login as the dev API, e.g. `demo` / `demo1234` or your own user.

## Update API URL later

Edit `eas.json` → `build.preview.env.EXPO_PUBLIC_API_BASE_URL`, then run `npm run build:apk` again.

## Local build (optional, needs Android SDK)

```bash
npm run build:apk:local
```

Requires Android Studio / SDK on your Mac.
