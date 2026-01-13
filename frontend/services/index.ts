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
    const idToken = session.backendToken
    console.log(idToken)
    try {
        const response = await fetch(`${API_URL}/api/v1${endpoint}`, {
            method: options.method || "GET",
            headers: {
                Authorization: `Bearer ${idToken}`,
                ...options.headers
            },
            body: options.body,
        })
return response.body
    } catch (error) {
       console.log("Api request failed",error)
    }
}