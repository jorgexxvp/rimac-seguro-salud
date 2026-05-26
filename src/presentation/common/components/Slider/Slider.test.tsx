import { render, screen, fireEvent } from "@testing-library/react";
import { Slider, type Slide } from "./Slider";

// Mockeamos el icono para aislar la lógica del componente
vi.mock("@/presentation/toolbox/assets/icons", () => ({
  ArrowLeftIcon: ({ className }: { className: string }) => (
    <svg data-testid="arrow-icon" className={className} />
  ),
}));

describe("Slider - Vitest", () => {
  // Generamos una lista de slides de prueba
  const mockSlides: Slide[] = [
    { id: "1", component: <div>Slide 1</div> },
    { id: "2", component: <div>Slide 2</div> },
    { id: "3", component: <div>Slide 3</div> },
  ];

  // La función children requerida por el componente para renderizar cada item
  const renderChildren = (slide: Slide) => (
    <li data-testid="slide-item">{slide.id}</li>
  );

  test("debe renderizar la cantidad correcta de items visibles por defecto (visibleItemsNumber = 1)", () => {
    render(<Slider slides={mockSlides}>{renderChildren}</Slider>);

    // Por defecto se muestra 1 item
    const items = screen.getAllByTestId("slide-item");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("1");

    // Debe mostrar la paginación inicial "1/3"
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  test("debe avanzar al siguiente slide al hacer click en el botón derecho", () => {
    render(<Slider slides={mockSlides}>{renderChildren}</Slider>);

    // El segundo botón (índice 1 de los contenedores de click de las flechas) es el derecho
    // Para identificarlo con seguridad, buscamos el contenedor con la clase de "right"
    const nextButton = screen.getByText("1/3").nextSibling as HTMLElement;

    fireEvent.click(nextButton);

    // Ahora el item visible debe ser el segundo
    const items = screen.getAllByTestId("slide-item");
    expect(items[0]).toHaveTextContent("2");
    expect(screen.getByText("2/3")).toBeInTheDocument();
  });

  test("debe retroceder al slide anterior al hacer click en el botón izquierdo", () => {
    render(<Slider slides={mockSlides}>{renderChildren}</Slider>);

    const prevButton = screen.getByText("1/3").previousSibling as HTMLElement;
    const nextButton = screen.getByText("1/3").nextSibling as HTMLElement;

    // Primero avanzamos al slide 2
    fireEvent.click(nextButton);
    expect(screen.getByText("2/3")).toBeInTheDocument();

    // Ahora retrocedemos al slide 1
    fireEvent.click(prevButton);
    expect(screen.getByText("1/3")).toBeInTheDocument();
    const items = screen.getAllByTestId("slide-item");
    expect(items[0]).toHaveTextContent("1");
  });

  test("no debe avanzar más allá del límite final de los slides disponibles", () => {
    render(<Slider slides={mockSlides}>{renderChildren}</Slider>);

    const nextButton = screen.getByText("1/3").nextSibling as HTMLElement;

    // Hacemos click múltiples veces para intentar desbordar el estado
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Se debe quedar estancado en el último slide sin romper la app
    expect(screen.getByText("3/3")).toBeInTheDocument();
    const items = screen.getAllByTestId("slide-item");
    expect(items[0]).toHaveTextContent("3");
  });

  test("no debe retroceder a valores negativos si ya está en el primer slide", () => {
    render(<Slider slides={mockSlides}>{renderChildren}</Slider>);

    const prevButton = screen.getByText("1/3").previousSibling as HTMLElement;

    // Intentamos ir hacia atrás estando en el inicio
    fireEvent.click(prevButton);

    // Debe mantenerse firme en la posición "1/3"
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  test("debe cambiar las clases de los botones condicionalmente según el estado 'start'", () => {
    render(<Slider slides={mockSlides}>{renderChildren}</Slider>);

    const prevButton = screen.getByText("1/3").previousSibling as HTMLElement;
    const nextButton = screen.getByText("1/3").nextSibling as HTMLElement;

    // 1. Cuando start === 0 (Inicio)
    expect(prevButton.className).toContain("border_light");

    // Avanzamos al slide 3 (donde start pasará a ser 2)
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // 2. Cuando start === 2 (Límite condicional de tu diseño)
    expect(nextButton.className).toContain("border_light");
  });

  test("debe soportar renderizar múltiples items a la vez modificando 'visibleItemsNumber'", () => {
    render(
      <Slider slides={mockSlides} visibleItemsNumber={2}>
        {renderChildren}
      </Slider>,
    );

    // Validamos que renderice el número de elementos configurados en la prop
    const items = screen.getAllByTestId("slide-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("1");
    expect(items[1]).toHaveTextContent("2");
  });
});
