import { createContext, useContext, useMemo, useState } from "react";
import { getBusinesses } from "@/features/business/storage/businessStorage";

const ActiveBusinessContext = createContext(null);
const STORAGE_KEY = "businesshub_active_business_id";

export function ActiveBusinessProvider({ children }) {
  const [activeBusinessId, setActiveBusinessId] = useState(() => {
    const businesses = getBusinesses();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && businesses.some((business) => String(business.id) === String(saved))) return saved;
    return businesses.find((business) => business.status === "active")?.id || businesses[0]?.id || "";
  });
  const businesses = getBusinesses();
  const activeBusiness = businesses.find((business) => String(business.id) === String(activeBusinessId)) || null;
  const switchBusiness = (businessId) => { const id = String(businessId || ""); setActiveBusinessId(id); localStorage.setItem(STORAGE_KEY, id); };
  const value = useMemo(() => ({ businesses, activeBusiness, activeBusinessId: String(activeBusinessId || ""), switchBusiness }), [activeBusinessId, activeBusiness, businesses]);
  return <ActiveBusinessContext.Provider value={value}>{children}</ActiveBusinessContext.Provider>;
}

export function useActiveBusiness() {
  const context = useContext(ActiveBusinessContext);
  if (!context) throw new Error("useActiveBusiness must be used within ActiveBusinessProvider.");
  return context;
}