export async function apiFetch(path: string, options: RequestInit = {}) {
    let apiBase = import.meta.env.VITE_API_URL || "http://localhost:5002";

    if (typeof window !== "undefined" && apiBase.includes("localhost")) {
        apiBase = apiBase.replace("localhost", window.location.hostname);
    }

    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> | undefined),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    if (!headers["Content-Type"] && options.body) {
        headers["Content-Type"] = "application/json";
    }

    const tryFetch = async (url: string) => {
        const res = await fetch(url, { ...options, headers });
        const isJson = (res.headers.get("content-type") || "").includes("application/json");

        if (!res.ok) {
            if (isJson) throw await res.json();
            throw new Error(`Request failed ${res.status}`);
        }

        return isJson ? res : res;
    };

    // Primary request to API base
    const primaryUrl = `${apiBase}${path}`;

    try {
        return await tryFetch(primaryUrl);
    } catch (err) {
        // Fallback to same-origin path (useful when proxied)
        try {
            return await tryFetch(path);
        } catch {
            throw err; // rethrow original error
        }
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
