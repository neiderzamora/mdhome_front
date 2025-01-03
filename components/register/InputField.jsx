export const InputField = ({ id, name, label, type = "text", required = false, value, onChange, ...props }) => (
  <div className="sm:col-span-3">
    <label htmlFor={id} className="block text-lg font-medium text-primary-100">{label}{required && <span className="text-red-500">*</span>}</label>
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
      {...props}
    />
  </div>
);