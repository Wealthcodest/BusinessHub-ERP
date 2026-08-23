import { useCallback, useEffect, useState } from "react";
import { customerService } from "../services/customerService";
export default function useCustomers() { const [customers, setCustomers] = useState([]); const [loading, setLoading] = useState(true); const refreshCustomers = useCallback(async () => { setLoading(true); try { setCustomers(await customerService.getAll()); } finally { setLoading(false); } }, []); useEffect(() => { refreshCustomers(); }, [refreshCustomers]); return { customers, loading, refreshCustomers }; }
