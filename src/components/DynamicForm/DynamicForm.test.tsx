import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { DynamicForm } from "./DynamicForm";
import { DynamicFormField } from "./DynamicForm.types";

describe("DynamicForm", () => {
  const mockSubmit = jest.fn();

  it("renders text inputs correctly", () => {
    const fields: DynamicFormField[] = [
      { type: "text", label: "Name", name: "name" },
    ];
    render(<DynamicForm fields={fields} onSubmit={mockSubmit} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders number inputs correctly", () => {
    const fields: DynamicFormField[] = [
      { type: "number", label: "Age", name: "age" },
    ];
    render(<DynamicForm fields={fields} onSubmit={mockSubmit} />);

    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders select inputs with options correctly", () => {
    const fields: DynamicFormField[] = [
      {
        type: "select",
        label: "Choice",
        options: ["Option1", "Option2"],
        name: "choice",
      },
    ];

    render(<DynamicForm fields={fields} onSubmit={mockSubmit} />);

    expect(screen.getByText("Choice")).toBeInTheDocument();
    expect(screen.getByText("Option1")).toHaveValue("Option1");
  });

  it("handles input change", () => {
    const fields: DynamicFormField[] = [
      { type: "text", label: "Name", name: "name" },
    ];

    render(<DynamicForm fields={fields} onSubmit={mockSubmit} />);

    const input = screen.getByTestId("dynamic-form-input");
    fireEvent.change(input, { target: { value: "John" } });

    expect(input).toHaveValue("John");
  });

  it("handles form submission", () => {
    const fields: DynamicFormField[] = [
      { type: "text", label: "Name", name: "name" },
    ];

    render(<DynamicForm fields={fields} onSubmit={mockSubmit} />);

    const input = screen.getByTestId("dynamic-form-input");

    fireEvent.change(input, { target: { value: "John" } });

    fireEvent.click(screen.getByText("Submit"));

    expect(mockSubmit).toHaveBeenCalledWith({ name: "John" });
  });
});
