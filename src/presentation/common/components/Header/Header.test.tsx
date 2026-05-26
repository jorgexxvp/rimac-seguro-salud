import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import { ROUTE_LOGIN } from "@/presentation/toolbox/constants/route";

// 1. Mockeamos las constantes de rutas por si acaso
vi.mock("@/presentation/toolbox/constants/route", () => ({
  ROUTE_LOGIN: "/login",
}));

// 2. Mockeamos los íconos para aislar el HTML
vi.mock("@/presentation/toolbox/assets/icons", () => ({
  LogoIcon: ({ className }: { className: string }) => (
    <svg data-testid="logo-icon" className={className} />
  ),
  PhoneIcon: ({ className }: { className: string }) => (
    <svg data-testid="phone-icon" className={className} />
  ),
}));

describe("Header - Vitest", () => {
  test("debe renderizar correctamente el logo y los textos de contacto", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Header />
      </MemoryRouter>,
    );

    // Verificar que el logo y el texto de compra existan
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();
    expect(screen.getByText("¡Compra por este medio!")).toBeInTheDocument();
    expect(screen.getByText("(01) 411 6001")).toBeInTheDocument();
  });

  test("debe contener los enlaces (href) hacia las rutas correctas", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Header />
      </MemoryRouter>,
    );

    // Buscamos el enlace que envuelve al logo (apunta a ROUTE_LOGIN)
    const logoLink = screen.getByTestId("logo-icon").closest("a");
    expect(logoLink).toHaveAttribute("href", "/login");

    // Buscamos el enlace de compra (apunta a "" o "/")
    const shopLink = screen.getByText("¡Compra por este medio!").closest("a");
    expect(shopLink).toHaveAttribute("href", "/");
  });

  test("debe aplicar la clase de estilo 'header_login' cuando la ubicación actual sea ROUTE_LOGIN", () => {
    // Forzamos al MemoryRouter a iniciar exactamente en la ruta de Login
    const { container } = render(
      <MemoryRouter initialEntries={[ROUTE_LOGIN]}>
        <Header />
      </MemoryRouter>,
    );

    // El primer div es el contenedor del header
    const headerContainer = container.firstChild as HTMLElement;

    // Verificamos que se le inyecte la clase condicional de Sass
    expect(headerContainer.className).toContain("header_login");
  });

  test("no debe aplicar la clase 'header_login' cuando esté en cualquier otra ruta", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Header />
      </MemoryRouter>,
    );

    const headerContainer = container.firstChild as HTMLElement;

    // Aseguramos que no contenga el estilo exclusivo del login
    expect(headerContainer.className).not.toContain("header_login");
  });
});
