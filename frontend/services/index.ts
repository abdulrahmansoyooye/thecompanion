import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";


const API_URL = "http://localhost:4000";


interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    params?: any;
    silent?: boolean; // New option to suppress toast
}

export async function fetchWithAuth(endpoint: string, options: FetchOptions = {}) {
    const session: any = await getSession();

    if (!session) {
        console.log("Not Authenticated");
        if (!options.silent) {
            toast.error("Authentication required", {
                description: "Please sign in to continue."
            });
        }
        return null;
    }

    const token = session.backendToken;

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

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data?.message || `Request failed with status ${response.status}`;
            if (!options.silent) {
                toast.error("Action Failed", {
                    description: errorMessage
                });
            }
            throw new Error(errorMessage);
        }

        return data;
    } catch (error: any) {
        console.log("Api request failed", error);
        if (!options.silent && error.name !== 'Error') { // Don't toast twice if thrown above
            toast.error("Network Error", {
                description: "Failed to connect to the server. Please check your connection."
            });
        }
        throw error;
    }
}