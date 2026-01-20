import { COLORS } from "@/constants/constants";
import { fetchWithAuth } from ".";

export async function getCompanionByID(id: string) {
    return fetchWithAuth(`/companions/${id}`);
}

export async function getAllCompanions() {
    return fetchWithAuth("/companions");
}

export async function CreateCompanion(companionData: any) {
    const payload = {
        name: companionData.name,
        topic: companionData.topic,
        voiceType: companionData.voiceType,
        style: companionData.style,
        language: companionData.language,
        subject: companionData.subject || '',
        icon: companionData.icon || '🧠',
        iconColor: companionData.iconColor || COLORS[companionData.subject as keyof typeof COLORS] || COLORS["Science"],
    };

    return fetchWithAuth("/companions/create", {
        method: "POST",
        body: payload
    });
}

export async function updateCompanion(id: string, companionData: any) {
    return fetchWithAuth(`/companions/${id}`, {
        method: "PUT",
        body: companionData
    });
}

export async function removeCompanion(id: string) {
    return fetchWithAuth(`/companions/${id}`, {
        method: "DELETE"
    });
}