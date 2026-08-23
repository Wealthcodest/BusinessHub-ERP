import BusinessIdentityBlock from "./BusinessIdentityBlock";
import { getThemeBranding } from "../utils/themeHelpers";
import { getThemeColors, getThemeTypography } from "../utils/themeHelpers";
export default function DocumentBrandingPreview({ theme, business }) { const branding = getThemeBranding(theme); const colors = getThemeColors(theme); const typography = getThemeTypography(theme); return <div className="p-6" style={{ backgroundColor: colors.primary, color: colors.tableHeaderText, fontFamily: typography.bodyFont }}><BusinessIdentityBlock business={business} branding={branding} /></div>; }
