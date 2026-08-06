import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui";

import {
  BusinessProfileCard,
  BusinessInformation,
  BusinessStatistics,
  BusinessQuickActions,
  BusinessActivity,
  BusinessHealth,
} from "../components";

import { businessService } from "../services/businessService";

export default function BusinessDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusiness();
  }, [id]);

  async function loadBusiness() {
    try {
      const data = await businessService.getById(id);

      if (!data) {
        toast.warning("Business not found.");
        navigate("/businesses");
        return;
      }

      setBusiness(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load business.");
      navigate("/businesses");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-lg">
        Loading Business...
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex h-64 items-center justify-center text-lg">
        Business not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <Button
          variant="outline"
          onClick={() => navigate("/businesses")}
        >
          ← Back
        </Button>

      </div>

      {/* Business Profile */}

      <BusinessProfileCard
        business={business}
        onEdit={() =>
          navigate(`/businesses/${business.id}/edit`)
        }
      />

      {/* Business Information */}

      <BusinessInformation
        business={business}
      />

      {/* Statistics */}

      <BusinessStatistics />

      {/* Activity + Health */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <BusinessActivity />
        </div>

        <BusinessHealth />

      </div>

      {/* Quick Actions */}

      <BusinessQuickActions
        businessId={business.id}
      />

    </div>
  );
}
