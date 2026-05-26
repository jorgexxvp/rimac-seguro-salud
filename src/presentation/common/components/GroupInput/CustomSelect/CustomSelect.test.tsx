import { render, screen, fireEvent } from "@testing-library/react";
import { CustomSelect } from "./CustomSelect";
import { useCustomSelect } from "./CustomSelect.hook";

// 1. Mockeamos el hook personalizado
vi.mock("./CustomSelect.hook", () => ({
  useCustomSelect: vi.fn(),
}));

// 2. Mockeamos el ícono para aislar la prueba visual
vi.mock("@/presentation/toolbox/assets/icons", () => ({
  ArrowDownIcon: ({ className }: { className: string }) => (
    <span data-testid="arrow-icon" className={className}>
      ▼
    </span>
  ),
}));

describe("CustomSelect - Vitest", () => {
  const mockOnChange = vi.fn();
  const mockSetOpen = vi.fn();

  const defaultOptions = [
    { label: "Opción 1", value: "opt1" },
    { label: "Opción 2", value: "opt2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Configuración por defecto del hook: cerrado
    vi.mocked(useCustomSelect).mockReturnValue({
      targetRef: { current: null },
      open: false,
      setOpen: mockSetOpen,
    });
  });

  test("debe renderizar el valor seleccionado actualmente", () => {
    render(
      <CustomSelect
        value="Valor Inicial"
        options={defaultOptions}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText("Valor Inicial")).toBeInTheDocument();
  });

  test("debe intentar alternar (toggle) el estado 'open' al hacer click en el select", () => {
    const { container } = render(
      <CustomSelect
        value="Selecciona"
        options={defaultOptions}
        onChange={mockOnChange}
      />,
    );

    // Obtenemos el contenedor principal del select
    const selectTrigger = container.firstChild?.firstChild as HTMLElement;
    fireEvent.click(selectTrigger);

    // Verifica que se llame a setOpen modificando el estado anterior
    expect(mockSetOpen).toHaveBeenCalledTimes(1);

    // Probamos la función actualizadora de estado funcional (prev => !prev)
    const updaterFunction = mockSetOpen.mock.calls[0][0];
    expect(updaterFunction(false)).toBe(true);
    expect(updaterFunction(true)).toBe(false);
  });

  test("debe mostrar las opciones y el fondo (background) cuando 'open' es true", () => {
    vi.mocked(useCustomSelect).mockReturnValue({
      targetRef: { current: null },
      open: true,
      setOpen: mockSetOpen,
    });

    const { container } = render(
      <CustomSelect
        value="Selecciona"
        options={defaultOptions}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText("Opción 1")).toBeInTheDocument();
    expect(screen.getByText("Opción 2")).toBeInTheDocument();

    const backgroundElement = container.querySelector(
      '[class*="select_background"]',
    );
    expect(backgroundElement).toBeInTheDocument();
  });

  test("debe aplicar la clase de variante 'outline' correctamente", () => {
    const { container } = render(
      <CustomSelect
        value="Selecciona"
        options={defaultOptions}
        onChange={mockOnChange}
        variant="outline"
      />,
    );

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer.className).toContain("select_outline");
  });
});
