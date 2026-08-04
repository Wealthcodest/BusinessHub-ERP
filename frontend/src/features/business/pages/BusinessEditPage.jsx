import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { BusinessForm } from "../components";
import { businessService } from "../services/businessService";

export default function BusinessEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBusiness();
  }, []);

  async function loadBusiness() {
    try {
      const data = await businessService.getById(id);

      if (!data) {
        alert("Business not found.");
        navigate("/businesses");
        return;
      }

      setBusiness(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load business.");
      navigate("/businesses");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(values) {
    try {
      setSaving(true);

      await businessService.update(id, values);

      alert("Business updated successfully.");

      navigate("/businesses");
    } catch (error) {
      console.error(error);
      alert("Unable to update business.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        Loading business...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Edit Business
          </h1>

          <p className="mt-1 text-slate-500">
            Update your business information.
          </p>

        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/businesses")}
        >
          ← Back
        </Button>

      </div>

      <Card>

        <BusinessForm
          defaultValues={business}
          loading={saving}
          onSubmit={handleSubmit}
        />

      </Card>

    </div>
  );
}