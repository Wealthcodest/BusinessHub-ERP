import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Card, Select, Textarea } from "@/components/ui";
import BusinessLogoUpload from "./BusinessLogoUpload";
import { businessSchema } from "../schemas/businessSchema";

const businessTypes = [
  { value: "company", label: "Company" },
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "non_profit", label: "Non Profit" },
];

const industries = [
  { value: "construction", label: "Construction" },
  { value: "creative", label: "Creative Agency" },
  { value: "technology", label: "Technology" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
];

const currencies = [
  { value: "NGN", label: "Nigerian Naira (₦)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "GBP", label: "British Pound (£)" },
];

const statuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function BusinessForm({
  defaultValues = {},
  onSubmit,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      businessType: "",
      industry: "",
      registrationNumber: "",
      taxNumber: "",
      email: "",
      phone: "",
      website: "",
      country: "Nigeria",
      state: "",
      city: "",
      address: "",
      currency: "NGN",
      timezone: "Africa/Lagos",
      status: "active",
      description: "",
      logo: null,
      ...defaultValues,
    },
  });

  const logo = watch("logo");

  const submitForm = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-8"
    >
      {/* BUSINESS INFORMATION */}

      <Card>
        <h2 className="mb-6 text-xl font-semibold">
          Business Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Business Name *
            </label>

            <Input {...register("name")} />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Business Type *
            </label>

            <Select
              options={businessTypes}
              value={watch("businessType")}
              onChange={(value) =>
                setValue("businessType", value)
              }
            />

            {errors.businessType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.businessType.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Industry *
            </label>

            <Select
              options={industries}
              value={watch("industry")}
              onChange={(value) =>
                setValue("industry", value)
              }
            />

            {errors.industry && (
              <p className="mt-1 text-sm text-red-500">
                {errors.industry.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Registration Number
            </label>

            <Input
              {...register("registrationNumber")}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tax Number
            </label>

            <Input {...register("taxNumber")} />
          </div>

        </div>
      </Card>

      {/* CONTACT */}

      <Card>

        <h2 className="mb-6 text-xl font-semibold">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Email *
            </label>

            <Input
              type="email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Phone *
            </label>

            <Input {...register("phone")} />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Website
            </label>

            <Input {...register("website")} />

          </div>

        </div>

      </Card>

      {/* ADDRESS */}

      <Card>

        <h2 className="mb-6 text-xl font-semibold">
          Address
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <Input
            placeholder="Country"
            {...register("country")}
          />

          <Input
            placeholder="State"
            {...register("state")}
          />

          <Input
            placeholder="City"
            {...register("city")}
          />

          <Input
            placeholder="Address"
            {...register("address")}
          />

        </div>

      </Card>

      {/* SETTINGS */}

      <Card>

        <h2 className="mb-6 text-xl font-semibold">
          Business Settings
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Currency
            </label>

            <Select
              options={currencies}
              value={watch("currency")}
              onChange={(value) =>
                setValue("currency", value)
              }
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Status
            </label>

            <Select
              options={statuses}
              value={watch("status")}
              onChange={(value) =>
                setValue("status", value)
              }
            />

          </div>

          <div className="md:col-span-2">

            <BusinessLogoUpload
              value={logo}
              onChange={(file) =>
                setValue("logo", file)
              }
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium">
              Description
            </label>

            <Textarea
              rows={5}
              {...register("description")}
            />

          </div>

        </div>

      </Card>

      <div className="flex justify-end gap-4">

        <Button
          type="button"
          variant="outline"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Business"}
        </Button>

      </div>

    </form>
  );
}