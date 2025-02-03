import React from "react";

const DetailItem = React.memo(({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-primary-200 uppercase tracking-wide">
      {label}
    </span>
    <span className="text-lg font-medium text-gray-700">{value || "-"}</span>
  </div>
));

DetailItem.displayName = "DetailItem";

export default DetailItem;