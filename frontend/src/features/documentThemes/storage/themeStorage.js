const STORAGE_KEY = "businesshub_document_themes";

export const getStoredThemes = () => { try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } };
export const saveStoredThemes = (themes) => localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
