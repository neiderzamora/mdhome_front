// components/forms/FormField.jsx

"use client";

import React from 'react';
import PropTypes from 'prop-types';

export const FormField = ({
  id,
  name,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  options = [],
  isTextArea = false,
  error = [],
}) => (
  <div className="sm:col-span-3">
    <label htmlFor={id} className="block text-lg font-medium text-primary-100">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    {isTextArea ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        className={`border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error.length > 0 ? "border-red-500" : "border-gray-300"
        }`}
        rows={3}
      />
    ) : type === "select" ? (
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error.length > 0 ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Seleccione una opción</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        className={`border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error.length > 0 ? "border-red-500" : "border-gray-300"
        }`}
      />
    )}
    {error.length > 0 && (
      <p className="text-red-500 text-sm mt-1">{error.join(" ")}</p>
    )}
  </div>
);

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  isTextArea: PropTypes.bool,
  error: PropTypes.array,
};