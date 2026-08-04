import { useRef, useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function BusinessLogoUpload({
  value,
  onChange,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!value) {
      setPreview("");
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    const objectUrl = URL.createObjectURL(value);

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);

  }, [value]);

  const handleSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  const removeLogo = () => {
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">

      <div>

        <label className="block mb-2 font-medium">

          Business Logo

        </label>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
        />

      </div>

      {preview ? (

        <div className="flex items-center gap-6">

          <img
            src={preview}
            alt="Business Logo"
            className="h-28 w-28 rounded-xl border object-cover"
          />

          <div className="space-y-2">

            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              Change Logo
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={removeLogo}
            >
              Remove Logo
            </Button>

          </div>

        </div>

      ) : (

        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">

          <p className="mb-4 text-slate-500">

            Upload your company logo

          </p>

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            Choose Logo
          </Button>

        </div>

      )}

    </div>
  );
}