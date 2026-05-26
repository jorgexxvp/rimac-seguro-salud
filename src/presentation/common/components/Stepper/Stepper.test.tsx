import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Stepper } from "./Stepper";

// 1. Creamos un mock para el hook useNavigate de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 2. Mockeamos el ícono
vi.mock("@/presentation/toolbox/assets/icons", () => ({
  ArrowLeftIcon: ({ className }: { className: string }) => (
    <svg data-testid="back-arrow" className={className} />
  ),
}));

describe("Stepper - Vitest", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("debe iniciar en el Paso 1 por defecto y mostrar la barra inicial", () => {
    //  Un solo render limpio asignado a una constante
    const { container } = render(
      <MemoryRouter>
        <Stepper path="/dashboard" />
      </MemoryRouter>,
    );

    // Validamos el texto del paso inicial
    expect(screen.getByText(/paso/i)).toHaveTextContent("Paso 1 de 2");

    // Buscamos la barra usando un selector parcial seguro para CSS Modules
    const stepperBar = container.querySelector('[class*="stepper_bar"]');

    // Al inicio no debe tener la clase de completado
    expect(stepperBar).not.toHaveClass(/stepper_bar_completed/);
  });

  test("debe redirigir a la ruta correcta usando navigate al hacer click en la flecha", () => {
    render(
      <MemoryRouter>
        <Stepper path="/back-page" />
      </MemoryRouter>,
    );

    const backButton = screen.getByTestId("back-arrow")
      .parentElement as HTMLElement;
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/back-page");
  });

  test("debe cambiar automáticamente al Paso 2 después de 500ms", () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <Stepper path="/dashboard" />
      </MemoryRouter>,
    );

    expect(screen.getByText(/paso/i)).toHaveTextContent("Paso 1 de 2");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText(/paso/i)).toHaveTextContent("Paso 2 de 2");

    vi.useRealTimers();
  });

  test("debe aplicar la clase 'stepper_bar_completed' cuando cambia al Paso 2", () => {
    vi.useFakeTimers();

    const { container } = render(
      <MemoryRouter>
        <Stepper path="/dashboard" />
      </MemoryRouter>,
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    //  Buscamos con selector parcial y evaluamos con expresión regular
    const stepperBar = container.querySelector('[class*="stepper_bar"]');
    expect(stepperBar).toHaveClass(/stepper_bar_completed/);

    vi.useRealTimers();
  });
});
