import axios from "axios";
import { getSession } from "next-auth/react";


const API_URL = "http://localhost:4000";


interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    params?: any;
}

export async function fetchWithAuth(endpoint: string, options: FetchOptions = {}) {
    const session: any = await getSession();

    if (!session) {
        throw new Error("Not Authenticated");
    }
    const token = session.backendToken || session.idToken;
    console.log("Using token for request:", token ? "Token present" : "Token missing");

    try {
        const response = await fetch(`${API_URL}/api/v1${endpoint}`, {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("Api request failed", error)
    }
}