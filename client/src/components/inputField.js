import React from "react";
import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      <ErrorMessage
        name={field.name}
        render={(msg) => (
          <div className="my-3 text-red-400 f absolute Err text-sm ">{msg}</div>
        )}
      />
      <label for={field.name} class="block text-gray-700">
        {label}
      </label>
      <input
        {...props}
        {...field}
        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autofocus
        autocomplete
        required
      />
    </div>
  );
};

export default InputField;
