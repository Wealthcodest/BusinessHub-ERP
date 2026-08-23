import {
  getBusinessInitials,
  getLogoSize,
} from "../utils/brandingHelpers";

export default function LogoPreview({
  business = {},
  branding = {},
}) {
  const size = getLogoSize(branding);

  const shape =
    {
      original: "rounded-none",
      square: "rounded-none",
      rounded: "rounded-xl",
      circle: "rounded-full",
    }[branding.logoShape] || "rounded-none";

  const style = {
    width: size,
    height: size,

    backgroundColor: branding.showBusinessLogoBackground
      ? branding.logoBackgroundColor
      : "transparent",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden ${shape}`}
      style={style}
      aria-label={`${business.name || "Business"} logo`}
    >
      {business.logo ? (
        <img
          src={business.logo}
          alt={`${business.name || "Business"} logo`}
          className={`h-full w-full object-contain ${shape}`}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center ${
            branding.showBusinessLogoBackground
              ? ""
              : "bg-slate-100"
          } text-sm font-bold text-slate-600`}
        >
          {getBusinessInitials(business.name)}
        </span>
      )}
    </div>
  );
}