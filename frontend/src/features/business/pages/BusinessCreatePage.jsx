import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui";

import { BusinessForm } from "../components";
import { businessService } from "../services/businessService";

export default function BusinessCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await businessService.create(data);

      toast.success("Business created successfully.");

      navigate("/businesses");
    } catch (error) {
      console.error(error);

      toast.error("Unable to create business.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Create Business
          </h1>

          <p className="mt-1 text-slate-500">
            Add a new business to your ERP.
          </p>

        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/businesses")}
        >
          ← Back
        </Button>

      </div>

      {/* Form */}

      <Card>

        <BusinessForm
          loading={loading}
          onSubmit={handleSubmit}
        />

      </Card>

    </div>
  );
}
