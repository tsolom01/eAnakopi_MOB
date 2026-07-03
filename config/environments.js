/**
 * Single source of truth for dev vs prod settings.
 * Override at build time with EXPO_PUBLIC_API_BASE_URL or APP_ENV.
 *
 * Prod URL: after `bash deploy/ecs-express.sh prod` in eAnakopi_APIs, copy the printed
 * EXPO_PUBLIC_API_BASE_URL into production.apiBaseUrl below.
 */

const environments = {
    development: {
        appName: 'eAnakopi Dev',
        apiBaseUrl: 'https://ea-94b10f92401641a89159d8440108e002.ecs.eu-central-1.on.aws',
    },
    production: {
        appName: 'eAnakopi',
        // TODO: replace with your prod ECS Express URL after first prod deploy
        apiBaseUrl: 'https://ea-REPLACE_WITH_PROD_ENDPOINT.ecs.eu-central-1.on.aws',
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

    // When APP_ENV is set (npm run dev/prod, EAS), use config URLs — not a stale .env override.
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
