import { config } from '../../constants/config';

/**
 * @param {string} path
 * @param {RequestInit & { accessToken?: string }} [options]
 */
export const apiRequest = async (path, options = {}) => {
    const { accessToken, headers: customHeaders, ...rest } = options;

    const headers = {
        'Content-Type': 'application/json',
        ...customHeaders,
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${config.apiBaseUrl}${path}`, {
        ...rest,
        headers,
    });

    let body = null;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        body = await response.json();
    }

    return { response, body };
};
