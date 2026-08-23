export default function Avatar({ src, name = "User", size = "md", className = "" }) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-12 w-12 text-base" };
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return src ? <img src={src} alt={name} className={`${sizes[size]} shrink-0 rounded-full border border-slate-200 object-cover ${className}`} /> : <div aria-label={name} className={`flex shrink-0 items-center justify-center rounded-full bg-[#103746] font-semibold text-white ${sizes[size]} ${className}`}>{initial}</div>;
}
