import { fetchWithAuth } from ".";

export async function deleteAccount() {
    return fetchWithAuth("/auth/delete-account", {
        method: "DELETE"
    });
}

export async function getProfile() {
    return fetchWithAuth("/auth/me");
}
