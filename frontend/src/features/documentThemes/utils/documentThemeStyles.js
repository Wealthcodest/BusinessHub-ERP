import { getThemeColors, getThemeTypography } from "./themeHelpers";

export const getDocumentThemeStyle = (theme = {}) => {
  const colors = getThemeColors(theme);
  const typography = getThemeTypography(theme);
  return {
    "--document-primary": colors.primary, 
    "--document-secondary": colors.secondary, 
    "--document-accent": colors.accent, 
    "--document-session-title": theme.session?.titleColor ?? colors.accent,
    "--document-background": colors.background, 
    "--document-surface": colors.surface, 
    "--document-text": colors.text, 
    "--document-muted": colors.mutedText, 
    "--document-border": colors.border, 
    "--document-table-header": colors.tableHeaderBackground,
     "--document-table-header-text": colors.tableHeaderText, 
     "--document-total-background": colors.totalBackground, 
     "--document-total-text": colors.totalText,
    "--document-heading-font": typography.headingFont, 
    "--document-body-font": typography.bodyFont, 
    "--document-title-size": typography.documentTitleSize, 
    "--document-heading-size": typography.headingSize, 
    "--document-body-size": typography.bodySize, 
    "--document-table-size": typography.tableTextSize, 
    "--document-small-size": typography.smallTextSize, 
    "--document-heading-weight": typography.headingWeight, 
    "--document-body-weight": typography.bodyWeight,
    backgroundColor: colors.background, color: colors.text, fontFamily: typography.bodyFont, fontSize: typography.bodySize, fontWeight: typography.bodyWeight,
    "--document-margin-top": `${theme.layout?.marginTop ?? 20}mm`, 
    "--document-margin-right": `${theme.layout?.marginRight ?? 20}mm`, 
    "--document-margin-bottom": `${theme.layout?.marginBottom ?? 20}mm`, 
    "--document-margin-left": `${theme.layout?.marginLeft ?? 20}mm`,
  };
};
