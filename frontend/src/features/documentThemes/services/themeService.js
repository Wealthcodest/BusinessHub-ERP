import { createDefaultTheme } from "../utils/themeDefaults";
import { normalizeTheme } from "../utils/themeHelpers";
import { getStoredThemes, saveStoredThemes } from "../storage/themeStorage";

const forBusiness = (businessId) => getStoredThemes().filter((theme) => String(theme.businessId) === String(businessId)).map(normalizeTheme);
const ensureThemes = (businessId) => { const themes = forBusiness(businessId); if (themes.length) return themes; const theme = createDefaultTheme(businessId); saveStoredThemes([...getStoredThemes(), theme]); return [theme]; };
const saveBusinessThemes = (businessId, themes) => saveStoredThemes([...getStoredThemes().filter((theme) => String(theme.businessId) !== String(businessId)), ...themes]);

export const themeService = {
  getAll(businessId) { return ensureThemes(businessId); },
  getById(businessId, themeId) { return ensureThemes(businessId).find((theme) => String(theme.id) === String(themeId)) || null; },
  create(businessId, data) { const themes = ensureThemes(businessId); const now = new Date().toISOString(); const theme = normalizeTheme({ ...createDefaultTheme(businessId), ...data, id: `theme-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, businessId, isDefault: false, createdAt: now, updatedAt: now }); saveBusinessThemes(businessId, [...themes, theme]); return theme; },
  update(businessId, themeId, data) { const themes = ensureThemes(businessId).map((theme) => String(theme.id) === String(themeId) ? normalizeTheme({ ...theme, ...data, id: theme.id, businessId, updatedAt: new Date().toISOString() }) : theme); saveBusinessThemes(businessId, themes); return themes.find((theme) => String(theme.id) === String(themeId)) || null; },
  delete(businessId, themeId) { const themes = ensureThemes(businessId); if (themes.length === 1) return false; const remaining = themes.filter((theme) => String(theme.id) !== String(themeId)); if (!remaining.some((theme) => theme.isDefault)) remaining[0].isDefault = true; saveBusinessThemes(businessId, remaining); return true; },
  setDefault(businessId, themeId) { const themes = ensureThemes(businessId).map((theme) => ({ ...theme, isDefault: String(theme.id) === String(themeId), updatedAt: new Date().toISOString() })); saveBusinessThemes(businessId, themes); return themes.find((theme) => theme.isDefault) || null; },
  getDefault(businessId) { return ensureThemes(businessId).find((theme) => theme.isDefault) || ensureThemes(businessId)[0]; },
};
