const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        ...(options.headers ? (options.headers as Record<string, string>) : {}),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!headers['Content-Type'] && options.body) headers['Content-Type'] = 'application/json';

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    }

    if (!res.ok) throw new Error(`Request failed ${res.status}`);
    return res;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
