import { useState, ChangeEvent, FormEvent } from "react";
import type { DynamicFormField, DynamicFormProps } from "./DynamicForm.types";
import "./DynamicForm.styles.css";

export const DynamicForm = ({ fields, onSubmit }: DynamicFormProps) => {
  const initialFormData = fields.reduce<Record<string, string>>((acc, curr) => {
    acc[curr.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] =
    useState<Record<string, string>>(initialFormData);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderFieldByType = (field: DynamicFormField) => {
    if (["text", "number"].includes(field.type)) {
      return (
        <input
          data-testid="dynamic-form-input"
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          data-testid="dynamic-form-select"
          name={field.label}
          value={formData[field.name]}
          onChange={handleChange}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={`${field.label}-${index}`}>
          <label>{field.label}</label>
          {renderFieldByType(field)}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
