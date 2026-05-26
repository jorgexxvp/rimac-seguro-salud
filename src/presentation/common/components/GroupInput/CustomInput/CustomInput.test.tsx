import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomInput } from "./CustomInput";

describe("CustomInput - Vitest", () => {
  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnBlur.mockClear();
  });

  test("debe renderizar el input con su valor y placeholder", () => {
    render(
      <CustomInput
        value="Texto de prueba"
        placeholder="Ingresa tu nombre"
        onChange={mockOnChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText(
      "Ingresa tu nombre",
    ) as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("Texto de prueba");
  });

  test("debe renderizar la etiqueta (label) si se pasa como prop", () => {
    render(
      <CustomInput
        value=""
        label="Correo Electrónico"
        onChange={mockOnChange}
      />,
    );

    // Buscamos el texto del label en el DOM
    const labelElement = screen.getByText("Correo Electrónico");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("LABEL");
  });

  test("no debe renderizar la etiqueta si la prop label no existe", () => {
    const { container } = render(
      <CustomInput value="" onChange={mockOnChange} />,
    );

    const labelElement = container.querySelector("label");
    expect(labelElement).toBeNull();
  });

  test("debe disparar onChange con el valor correcto cuando el usuario escribe", () => {
    render(
      <CustomInput value="" placeholder="Buscar..." onChange={mockOnChange} />,
    );

    const inputElement = screen.getByPlaceholderText("Buscar...");

    // Simula que el usuario escribe "Hola"
    fireEvent.change(inputElement, { target: { value: "Hola" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("Hola");
  });

  test("debe disparar onBlur con el valor correcto cuando el input pierde el foco", () => {
    render(
      <CustomInput
        value="Texto actual"
        placeholder="Input"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />,
    );

    const inputElement = screen.getByPlaceholderText("Input");

    // Simula el evento de desenfoque (blur)
    fireEvent.blur(inputElement);

    expect(mockOnBlur).toHaveBeenCalledTimes(1);
    expect(mockOnBlur).toHaveBeenCalledWith("Texto actual");
  });

  test("no debe romper el componente si ocurre un evento blur y la prop onBlur es opcional (undefined)", () => {
    render(
      <CustomInput
        value="Sin crash"
        placeholder="Input Opcional"
        onChange={mockOnChange}
        // onBlur no se pasa de manera intencional
      />,
    );

    const inputElement = screen.getByPlaceholderText("Input Opcional");

    // Forzamos el blur, no debería lanzar ningún error en consola
    expect(() => fireEvent.blur(inputElement)).not.toThrow();
  });

  test("debe aplicar la clase outline si se recibe la variante 'outline'", () => {
    render(
      <CustomInput
        value=""
        placeholder="Input Variante"
        onChange={mockOnChange}
        variant="outline"
      />,
    );

    const inputElement = screen.getByPlaceholderText("Input Variante");

    // Verificamos que contenga la clase dinámica de la variante
    expect(inputElement.className).toContain("input_outline");
  });
});
