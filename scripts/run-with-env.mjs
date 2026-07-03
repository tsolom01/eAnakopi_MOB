#!/usr/bin/env node
/**
 * Runs Expo with APP_ENV + EXPO_PUBLIC_API_BASE_URL from config/environments.js
 *
 * Usage:
 *   node scripts/run-with-env.mjs development start
 *   node scripts/run-with-env.mjs production start --clear
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envModule = await import(pathToFileURL(path.join(__dirname, '..', 'config', 'environments.js')));

const envName = process.argv[2] ?? 'development';
const expoArgs = process.argv.slice(3);

if (expoArgs.length === 0) {
    expoArgs.push('start');
}

const isProd = envName === 'prod' || envName === 'production';
process.env.APP_ENV = isProd ? 'production' : 'development';

const { resolveEnvironment } = envModule;
const { env, appName, apiBaseUrl } = resolveEnvironment();

process.env.EXPO_PUBLIC_API_BASE_URL = apiBaseUrl;

console.log(`[env] ${env} → ${appName}`);
console.log(`[env] API: ${apiBaseUrl}`);
console.log('[env] Override with EANAKOPI_FORCE_API_URL or edit config/environments.js');

const child = spawn('npx', ['expo', ...expoArgs], {
    stdio: 'inherit',
    env: process.env,
    shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
