import { render, screen, fireEvent } from "@testing-library/react";
import { CustomButton } from "./CustomButton";

describe("CustomButton - Vitest", () => {
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });

  test("debe renderizar el botón con el texto correcto", () => {
    render(
      <CustomButton text="Guardar Cambios" handleSubmit={mockHandleSubmit} />,
    );

    const buttonElement = screen.getByRole("button", {
      name: /guardar cambios/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  test("debe ejecutar la función handleSubmit al hacer click", () => {
    render(<CustomButton text="Clickme" handleSubmit={mockHandleSubmit} />);

    const buttonElement = screen.getByRole("button", { name: /clickme/i });
    fireEvent.click(buttonElement);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("no debe ejecutar el click ni estar activo si disabled es true", () => {
    render(
      <CustomButton
        text="Inactivo"
        handleSubmit={mockHandleSubmit}
        disabled={true}
      />,
    );

    const buttonElement = screen.getByRole("button", { name: /inactivo/i });

    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  test("debe aplicar la clase CSS correspondiente a su variante", () => {
    const { rerender } = render(
      <CustomButton
        text="Boton Rojo"
        handleSubmit={mockHandleSubmit}
        variant="red"
      />,
    );

    let buttonElement = screen.getByRole("button", { name: /boton rojo/i });

    expect(buttonElement.className).toContain("button_red");

    rerender(
      <CustomButton
        text="Boton Negro"
        handleSubmit={mockHandleSubmit}
        variant="black"
      />,
    );

    buttonElement = screen.getByRole("button", { name: /boton negro/i });
    expect(buttonElement.className).toContain("button_black");
  });
});
