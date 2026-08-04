import React from "react";

export default function Select({
  label,
  options = [],
  value = "",
  onChange,
  placeholder = "Select...",
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          px-3
          py-2
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          ${className}
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}