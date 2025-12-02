export async function apiFetch(path: string, options: RequestInit = {}) {
    // Determine API base. Prefer explicit VITE_API_URL, otherwise default to localhost backend.
    // If the default contains 'localhost' but the frontend is served from a different host,
    // replace 'localhost' with the current page hostname so requests go to the same machine.
    let apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
        if (typeof window !== 'undefined' && apiBase.includes('localhost')) {
            const host = window.location.hostname;
            apiBase = apiBase.replace('localhost', host);
        }
    } catch (e) {
        // ignore
    }

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        ...(options.headers ? (options.headers as Record<string, string>) : {}),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!headers['Content-Type'] && options.body) headers['Content-Type'] = 'application/json';

    // Try primary base, and if that fails (network error), fall back to relative path.
    const tryFetch = async (url: string) => {
        const res = await fetch(url, { ...options, headers });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const data = await res.json();
            if (!res.ok) throw data;
            return data;
        }
        if (!res.ok) throw new Error(`Request failed ${res.status}`);
        return res;
    };

    const primaryUrl = `${apiBase}${path}`;
    try {
        return await tryFetch(primaryUrl);
    } catch (err) {
        // If network failure or host unreachable, attempt relative path (same origin),
        // which is useful when backend is proxied or served from same host as frontend.
        try {
            const fallback = await tryFetch(path);
            return fallback;
        } catch (err2) {
            // rethrow original error for visibility
            throw err;
        }
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
