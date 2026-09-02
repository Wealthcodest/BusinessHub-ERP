const variants = {
  primary: "border-[#103746] bg-[#103746] text-white hover:bg-[#18566E]",
  secondary: "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  danger: "border-rose-200 bg-white text-rose-700 hover:bg-rose-50",
  ghost: "border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};
const sizes = { sm: "h-8 px-3 text-xs", md: "h-9 px-3.5 text-sm", lg: "h-10 px-4 text-sm" };

export default function Button({ children, variant = "primary", size = "md", className = "", type = "button", ...props }) {
  return <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#18566E] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`} {...props}>{children}</button>;
}
