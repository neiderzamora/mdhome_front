export const SelectField = ({ id, name, label, options, required = false, value, onChange }) => (
  <div className="sm:col-span-3">
    <label htmlFor={id} className="block text-lg font-medium text-primary-100">{label}{required && <span className="text-red-500">*</span>}</label>
    <select
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="border p-2 mt-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary-100"
    >
      <option value="">Seleccione una opción</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);