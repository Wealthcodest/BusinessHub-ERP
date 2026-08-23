import { themeService } from "../services/themeService";
import { createDefaultTheme } from "./themeDefaults";
import { getThemeBranding, normalizeTheme } from "./themeHelpers";

/**
 * Resolves the single source of document appearance for an invoice or quotation.
 * It deliberately reads the current business theme so branding stays live until
 * finalized-document snapshots are introduced.
 */
export function resolveDocumentTheme({ business, selectedThemeId, document } = {}) {
  const businessId = business?.id ?? document?.businessId;
  const themeId = selectedThemeId ?? document?.themeId;
  let theme = null;

  if (businessId !== undefined && businessId !== null) {
    theme = themeId ? themeService.getById(businessId, themeId) : null;
    theme ||= themeService.getDefault(businessId);
  }

  theme ||= normalizeTheme({ ...createDefaultTheme(businessId ?? "system"), id: "system-document-theme", businessId: businessId ?? null });
  const branding = getThemeBranding(theme);

  return {
    theme,
    branding,
    colors: theme.colors,
    typography: theme.typography,
  };
}

export default resolveDocumentTheme;
