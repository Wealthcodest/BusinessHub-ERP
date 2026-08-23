import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Card, Select, Textarea } from "@/components/ui";
import BusinessLogoUpload from "./BusinessLogoUpload";
import { businessSchema } from "../schemas/businessSchema";
import { fileToBase64 } from "@/utils/fileToBase64";

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

export default function BusinessForm({ defaultValues = {}, onSubmit, loading = false }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
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
      tagline: "",
      logo: null,
      paymentAccounts: [],
      ...defaultValues,
    },
  });

  const { fields: paymentAccounts, append: appendPaymentAccount, remove: removePaymentAccount } = useFieldArray({
    control,
    name: "paymentAccounts",
  });

  const logo = watch("logo");

  useEffect(() => {
    reset({
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
      tagline: "",
      logo: null,
      paymentAccounts: [],
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  async function submitForm(values) {
    const payload = {
      ...values,
      paymentAccounts: (values.paymentAccounts || []).map((account, index) => ({
        ...account,
        id: account.id || `account-${Date.now()}-${index}`,
        isPrimary: Boolean(account.isPrimary),
      })),
    };

    if (payload.logo instanceof File) {
      payload.logo = await fileToBase64(payload.logo);
    }

    if (onSubmit) {
      await onSubmit(payload);
    }
  }

  function setPrimaryAccount(index) {
    const currentAccounts = watch("paymentAccounts") || [];
    setValue(
      "paymentAccounts",
      currentAccounts.map((account, accountIndex) => ({
        ...account,
        isPrimary: accountIndex === index,
      })),
      { shouldDirty: true }
    );
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-8">
      <Card>
        <h2 className="mb-6 text-xl font-semibold">Business Information</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Business Name *</label>
            <Input {...register("name")} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-2 block font-medium">Business Type *</label>
            <Select options={businessTypes} value={watch("businessType")} onChange={(value) => setValue("businessType", value)} />
            {errors.businessType && <p className="mt-1 text-sm text-red-500">{errors.businessType.message}</p>}
          </div>

          <div>
            <label className="mb-2 block font-medium">Industry *</label>
            <Select options={industries} value={watch("industry")} onChange={(value) => setValue("industry", value)} />
            {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>}
          </div>

          <div>
            <label className="mb-2 block font-medium">Registration Number</label>
            <Input {...register("registrationNumber")} />
          </div>

          <div>
            <label className="mb-2 block font-medium">Tax Number</label>
            <Input {...register("taxNumber")} />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Email *</label>
            <Input type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block font-medium">Phone *</label>
            <Input {...register("phone")} />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-2 block font-medium">Website</label>
            <Input {...register("website")} />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-semibold">Address</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input placeholder="Country" {...register("country")} />
          <Input placeholder="State" {...register("state")} />
          <Input placeholder="City" {...register("city")} />
          <Input placeholder="Address" {...register("address")} />
        </div>
      </Card>

      <Card>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Payment / Bank Details</h2>
            <p className="mt-1 text-sm text-slate-500">Optional accounts shown on documents when the active theme enables bank details.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => appendPaymentAccount({ id: `account-${Date.now()}`, bankName: "", accountName: "", accountNumber: "", isPrimary: paymentAccounts.length === 0 })}
          >
            + Add Bank Account
          </Button>
        </div>

        <div className="space-y-4">
          {paymentAccounts.map((account, index) => (
            <div key={account.id || index} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <b>Account {index + 1}</b>
                <Button type="button" variant="ghost" className="text-rose-600" onClick={() => removePaymentAccount(index)}>
                  Delete
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="text-sm font-medium">
                  Bank Name
                  <Input className="mt-1" {...register(`paymentAccounts.${index}.bankName`)} />
                </label>
                <label className="text-sm font-medium">
                  Account Name
                  <Input className="mt-1" {...register(`paymentAccounts.${index}.accountName`)} />
                </label>
                <label className="text-sm font-medium">
                  Account Number
                  <Input className="mt-1" {...register(`paymentAccounts.${index}.accountNumber`)} />
                </label>
              </div>

              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="radio" checked={watch(`paymentAccounts.${index}.isPrimary`) === true} onChange={() => setPrimaryAccount(index)} />
                Primary account
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-semibold">Business Settings</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Currency</label>
            <Select options={currencies} value={watch("currency")} onChange={(value) => setValue("currency", value)} />
          </div>

          <div>
            <label className="mb-2 block font-medium">Status</label>
            <Select options={statuses} value={watch("status")} onChange={(value) => setValue("status", value)} />
          </div>

          <div className="md:col-span-2">
            <BusinessLogoUpload value={logo} onChange={(file) => setValue("logo", file, { shouldDirty: true, shouldValidate: true })} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">Business Tagline</label>
            <Input placeholder="Creative solutions, lasting impact" {...register("tagline")} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">Description</label>
            <Textarea rows={5} {...register("description")} />
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Business"}
        </Button>
      </div>
    </form>
  );
}
