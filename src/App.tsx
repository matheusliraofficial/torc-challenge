import { useState } from "react";
import { DynamicForm } from "./components/DynamicForm";
import { DynamicFormField } from "./components/DynamicForm/DynamicForm.types";

export const App = () => {
  const [formData, setFormData] = useState({});

  const fields: DynamicFormField[] = [
    {
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      type: "number",
      name: "age",
      label: "Age",
    },
    {
      type: "select",
      name: "gender",
      label: "Gender",
      options: ["Male", "Female", "Other"],
    },
  ];

  return (
    <>
      <DynamicForm fields={fields} onSubmit={setFormData} />
      {Object.values(formData).length !== 0 && (
        <>
          <p>Form data:</p>
          <pre>{JSON.stringify(formData)}</pre>
        </>
      )}
    </>
  );
}
