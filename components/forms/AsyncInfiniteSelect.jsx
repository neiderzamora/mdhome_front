"use client";

import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const AsyncInfiniteSelect = ({ loadOptions, value, onChange, placeholder, name }) => {
  return (
    <AsyncPaginate
      name={name}
      value={value}
      onChange={onChange}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      placeholder={placeholder}
      cacheOptions
      defaultOptions
      isClearable
      className="w-full"
    />
  );
};

export default AsyncInfiniteSelect;