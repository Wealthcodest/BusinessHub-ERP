import { useCallback, useEffect, useState } from "react";
import { themeService } from "../services/themeService";

export default function useDocumentThemes(businessId) { const [themes, setThemes] = useState([]); const [loading, setLoading] = useState(Boolean(businessId)); const refreshThemes = useCallback(async () => { if (!businessId) { setThemes([]); setLoading(false); return; } setLoading(true); try { setThemes(await themeService.getAll(businessId)); } finally { setLoading(false); } }, [businessId]); useEffect(() => { const task = Promise.resolve().then(refreshThemes); return () => { void task; }; }, [refreshThemes]); return { themes, loading, refreshThemes }; }
