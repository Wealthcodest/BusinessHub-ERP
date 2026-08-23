import { useCallback, useEffect, useState } from "react";
import { paymentService } from "../services/paymentService";
export default function usePayments() { const [payments, setPayments] = useState([]); const [loading, setLoading] = useState(true); const refreshPayments = useCallback(async () => { setLoading(true); try { setPayments(await paymentService.getAll()); } finally { setLoading(false); } }, []); useEffect(() => { refreshPayments(); }, [refreshPayments]); return { payments, loading, refreshPayments }; }
