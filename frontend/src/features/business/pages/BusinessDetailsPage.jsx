import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";

import {
  BusinessProfileCard,
  BusinessInformation,
  BusinessStatistics,
} from "../components";

import { businessService } from "../services/businessService";

export default function BusinessDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusiness();
  }, [id]);

  async function loadBusiness() {
    try {
      const data = await businessService.getById(id);

      if (!data) {
        navigate("/businesses");
        return;
      }

      setBusiness(data);
    } catch (error) {
      console.error(error);
      navigate("/businesses");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        Loading Business...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <Button
          variant="outline"
          onClick={() => navigate("/businesses")}
        >
          ← Back
        </Button>

      </div>

      <BusinessProfileCard
        business={business}
        onEdit={() =>
          navigate(`/businesses/${business.id}/edit`)
        }
      />

      <BusinessInformation
        business={business}
      />

      <BusinessStatistics />

    </div>
  );
}