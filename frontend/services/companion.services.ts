import { fetchWithAuth } from ".";

export async function getCompanionByID() {

}

export async function getAllCompanions() {

}

export async function CreateCompanion(companionData: any) {
    // Filter and transform data to match backend schema
    const payload = {
        name: companionData.name,
        topic: companionData.topic,
        voiceType: companionData.voiceType,
        style: companionData.style || companionData.speakingStyle,
        language: companionData.language,
        mode: companionData.mode || 'Chat',
        icon: companionData.icon || '🧠',
        iconImage: companionData.iconImage || '',
    };

    return fetchWithAuth("/companions/create", {
        method: "POST",
        body: JSON.stringify(payload)
    })
}


export async function removeCompanion() {

}