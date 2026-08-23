import { useCallback, useEffect, useState } from "react";
import { quotationService } from "../services/quotationService";
export default function useQuotations() { const [quotations, setQuotations] = useState([]); const [loading, setLoading] = useState(true); const refreshQuotations = useCallback(async () => { setLoading(true); try { setQuotations(await quotationService.getAll()); } finally { setLoading(false); } }, []); useEffect(() => { refreshQuotations(); }, [refreshQuotations]); return { quotations, loading, refreshQuotations }; }
