import { useEffect, useState, useCallback } from "react";
import { businessService } from "../services/businessService";

export default function useBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBusinesses = useCallback(async () => {
    try {
      setLoading(true);

      const data = await businessService.getAll();

      setBusinesses(data);
    } catch (error) {
      console.error("Failed to load businesses.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBusinesses();
  }, [loadBusinesses]);

  return {
    businesses,
    loading,
    refreshBusinesses: loadBusinesses,
  };
}