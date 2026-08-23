import { defaultThemeValues } from "./themeDefaults";

const defaultSectionOrder = Array.isArray(defaultThemeValues?.layout?.sectionOrder) ? [...defaultThemeValues.layout.sectionOrder] : [];
const toVisibilityMap = (sections = {}) => Object.fromEntries(Object.entries(sections).map(([key, value]) => [key, { ...(value && typeof value === "object" ? value : {}), visible: value?.visible !== false } ]));
const defaultSectionVisibility = Object.fromEntries(defaultSectionOrder.map((id) => [id, { visible: true }]));

export const getThemeBranding = (theme = {}) => ({ ...defaultThemeValues.branding, showLogo: theme.showLogo ?? defaultThemeValues.branding.showLogo, logoPosition: theme.logoPosition ?? defaultThemeValues.branding.logoPosition, logoSize: theme.logoSize ?? defaultThemeValues.branding.logoSize, ...theme.branding });
export const getThemeColors = (theme = {}) => ({ ...defaultThemeValues.colors, primary: theme.primaryColor ?? defaultThemeValues.colors.primary, secondary: theme.secondaryColor ?? defaultThemeValues.colors.secondary, accent: theme.accentColor ?? defaultThemeValues.colors.accent, ...theme.colors });
export const getThemeTypography = (theme = {}) => ({ ...defaultThemeValues.typography, headingFont: theme.headingFont ?? defaultThemeValues.typography.headingFont, bodyFont: theme.bodyFont ?? theme.fontFamily ?? defaultThemeValues.typography.bodyFont, ...theme.typography });
const nested = (key, theme) => ({ ...defaultThemeValues[key], ...theme?.[key], ...(key === "table" ? { columnVisibility: { ...defaultThemeValues.table.columnVisibility, ...theme?.table?.columnVisibility }, columnLabels: { ...defaultThemeValues.table.columnLabels, ...theme?.table?.columnLabels }, alignment: { ...defaultThemeValues.table.alignment, ...theme?.table?.alignment } } : {}), ...(key === "layout" ? { sectionOrder: Array.isArray(theme?.layout?.sectionOrder) && theme.layout.sectionOrder.length ? theme.layout.sectionOrder : defaultThemeValues.layout.sectionOrder, sections: { ...defaultSectionVisibility, ...defaultThemeValues.layout.sections, ...toVisibilityMap(theme?.layout?.sections || {}) } } : {}) });
export const normalizeTheme = (theme = {}) => {
  const safeTheme = theme || {};
  const colors = getThemeColors(safeTheme);
  const typography = getThemeTypography(safeTheme);
  const layout = nested("layout", safeTheme);
  const sectionOrder = Array.isArray(layout.sectionOrder) && layout.sectionOrder.length ? layout.sectionOrder.filter((id) => defaultSectionOrder.includes(id) || typeof id === "string") : [...defaultSectionOrder];
  const sections = { ...defaultSectionVisibility, ...defaultThemeValues.layout.sections, ...toVisibilityMap(layout.sections || {}) };
  for (const sectionId of defaultSectionOrder) sections[sectionId] = { visible: sections[sectionId]?.visible !== false, ...(sections[sectionId] || {}) };
  return { ...safeTheme, primaryColor: colors.primary, secondaryColor: colors.secondary, accentColor: colors.accent, fontFamily: typography.bodyFont, headingFont: typography.headingFont, bodyFont: typography.bodyFont, colors, typography, branding: getThemeBranding(safeTheme), layout: { ...layout, sectionOrder, sections }, table: nested("table", safeTheme), session: nested("session", safeTheme), totals: nested("totals", safeTheme), payment: nested("payment", safeTheme), footer: nested("footer", safeTheme), isDefault: Boolean(safeTheme.isDefault), watermarkOpacity: Number(safeTheme.watermarkOpacity ?? 0.12) };
};
export const themeLabel = (theme) => theme?.name || "BusinessHub Professional";
export const getSectionOrder = (theme = {}) => { const order = Array.isArray(theme?.layout?.sectionOrder) ? theme.layout.sectionOrder : []; const sanitized = order.filter((id) => typeof id === "string" && (defaultSectionOrder.includes(id) || !defaultSectionOrder.length)); return sanitized.length ? sanitized : [...defaultSectionOrder]; };
export const getSectionVisibility = (theme = {}) => { const provided = theme?.layout?.sections || {}; const base = { ...defaultSectionVisibility, ...defaultThemeValues.layout.sections, ...toVisibilityMap(provided) }; for (const sectionId of Object.keys(base)) base[sectionId] = { visible: base[sectionId]?.visible !== false, ...(base[sectionId] || {}) }; return base; };
