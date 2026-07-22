/**
 * Single source of truth for app settings.
 * One cloud API (Lambda + HTTP API) — same URL for local "dev" and "prod" scripts.
 * Override: EANAKOPI_FORCE_API_URL=http://localhost:3000 npm run dev
 */

const API_BASE_URL = 'https://aqgxnr9ovb.execute-api.eu-central-1.amazonaws.com';

const environments = {
    development: {
        appName: 'eAnakopi Dev',
        apiBaseUrl: API_BASE_URL,
    },
    production: {
        appName: 'eAnakopi',
        apiBaseUrl: API_BASE_URL,
    },
};

function normalizeEnvName(value) {
    const raw = String(value ?? 'development').toLowerCase();
    if (raw === 'prod' || raw === 'production') return 'production';
    return 'development';
}

/** Resolves active environment for app.config.js and local scripts. */
export function resolveEnvironment() {
    const fromProfile = process.env.EAS_BUILD_PROFILE;
    const envKey = normalizeEnvName(process.env.APP_ENV ?? fromProfile ?? 'development');
    const base = environments[envKey];

    const apiBaseUrl = (
        process.env.EANAKOPI_FORCE_API_URL ??
        (process.env.APP_ENV || fromProfile ? base.apiBaseUrl : null) ??
        process.env.EXPO_PUBLIC_API_BASE_URL ??
        base.apiBaseUrl
    ).replace(/\/$/, '');

    return {
        env: envKey,
        appName: base.appName,
        apiBaseUrl,
    };
}

export { environments };
