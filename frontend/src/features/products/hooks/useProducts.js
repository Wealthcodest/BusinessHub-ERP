import { useCallback, useEffect, useState } from "react";
import { productService } from "../services/productService";
export default function useProducts() { const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const refreshProducts = useCallback(async () => { setLoading(true); try { setProducts(await productService.getAll()); } finally { setLoading(false); } }, []); useEffect(() => { refreshProducts(); }, [refreshProducts]); return { products, loading, refreshProducts }; }
