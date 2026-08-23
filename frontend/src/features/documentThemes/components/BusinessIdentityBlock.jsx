import LogoPreview from "./LogoPreview";

import {
  getBusinessContactLines,
  getLogoPositionClass,
} from "../utils/brandingHelpers";

export default function BusinessIdentityBlock({
  business = {},
  branding = {},
}) {
  const lines = getBusinessContactLines(business, branding);

  const logoContainer = branding.logo?.container || {};

  const logoContainerStyle = logoContainer.enabled
    ? {
        backgroundColor:
          logoContainer.background || "transparent",

        width:
          logoContainer.width || "auto",

        height:
          logoContainer.height || "auto",

        paddingTop:
          logoContainer.paddingTop ?? 0,

        paddingRight:
          logoContainer.paddingRight ?? 0,

        paddingBottom:
          logoContainer.paddingBottom ?? 0,

        paddingLeft:
          logoContainer.paddingLeft ?? 0,

        marginTop:
          logoContainer.marginTop ?? 0,

        marginRight:
          logoContainer.marginRight ?? 0,

        marginBottom:
          logoContainer.marginBottom ?? 0,

        marginLeft:
          logoContainer.marginLeft ?? 0,

        border:
          logoContainer.borderEnabled
            ? `${logoContainer.borderWidth ?? 1}px solid ${
                logoContainer.borderColor || "#D1D5DB"
              }`
            : "none",

        borderRadius:
          logoContainer.borderRadius ?? 0,

        boxShadow:
          logoContainer.shadowEnabled
            ? "0 2px 8px rgba(0, 0, 0, 0.12)"
            : "none",
      }
    : undefined;

  return (
    <div
      className={`flex flex-col gap-3 ${getLogoPositionClass(
        branding.logoPosition
      )}`}
    >
      <div
        className={`flex w-full gap-4 ${
          branding.logoPosition === "right"
            ? "flex-row-reverse"
            : branding.logoPosition === "center"
              ? "flex-col"
              : "flex-row"
        } ${getLogoPositionClass(branding.logoPosition)}`}
      >
        {branding.showLogo && (
          <div style={logoContainerStyle}>
            <LogoPreview
              business={business}
              branding={branding}
            />
          </div>
        )}

        <div
          className={
            branding.logoPosition === "center"
              ? "text-center"
              : "min-w-0"
          }
        >
          {branding.showBusinessName && (
            <h2 className="text-xl font-bold text-current">
              {business.name || "Business Name"}
            </h2>
          )}

          {branding.showBusinessTagline && (
            <p className="mt-1 text-sm opacity-80">
              {business.tagline || "Business tagline"}
            </p>
          )}

          <div className="mt-2 space-y-0.5 text-xs opacity-85">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}