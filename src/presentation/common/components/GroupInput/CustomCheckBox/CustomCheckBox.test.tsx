import { render, screen, fireEvent } from "@testing-library/react";
import { CustomCheckBox } from "./CustomCheckBox";

// Simulamos el ícono para tener un selector limpio en los tests
vi.mock("@/presentation/toolbox/assets/icons", () => ({
  CheckIcon: ({ className }: { className: string }) => (
    <svg data-testid="check-icon" className={className} />
  ),
}));

describe("CustomCheckBox - Vitest", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("debe renderizar el contenedor del checkbox correctamente", () => {
    const { container } = render(
      <CustomCheckBox checked={false} onChange={mockOnChange} />,
    );

    const checkboxContainer = container.firstChild as HTMLElement;
    expect(checkboxContainer).toBeInTheDocument();

    // Al ser un <div>, su className sí es un string
    expect(checkboxContainer.className).toMatch(/checkbox_default/);
  });

  test("debe ejecutar la función onChange al hacer click", () => {
    const { container } = render(
      <CustomCheckBox checked={false} onChange={mockOnChange} />,
    );

    const checkboxContainer = container.firstChild as HTMLElement;
    fireEvent.click(checkboxContainer);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("debe aplicar las clases de selección cuando checked es true", () => {
    const { container } = render(
      <CustomCheckBox
        checked={true}
        onChange={mockOnChange}
        variant="default"
      />,
    );

    const checkboxContainer = container.firstChild as HTMLElement;
    expect(checkboxContainer).toHaveClass(/checkbox_default_selected/);

    // Usamos toHaveClass con la expresión regular para el SVG
    const icon = screen.getByTestId("check-icon");
    expect(icon).toHaveClass(/checkbox_default_selected_icon/);
  });

  test("debe aplicar la variante 'round' correctamente", () => {
    const { container } = render(
      <CustomCheckBox
        checked={false}
        onChange={mockOnChange}
        variant="round"
      />,
    );

    const checkboxContainer = container.firstChild as HTMLElement;
    expect(checkboxContainer).toHaveClass(/checkbox_round/);

    const icon = screen.getByTestId("check-icon");
    expect(icon).toHaveClass(/checkbox_round_icon/);
  });
});
