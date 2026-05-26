# RIMAC SEGURO SALUD

 Construida con **React**, **TypeScript**, **SASS** y **Vite**, siguiendo los principios de **Clean Architecture**.

## 📋 Requisitos Previos

- **Node.js** 20+ 
- **pnpm** 8+ ([Instalar pnpm](https://pnpm.io/installation))
- **Git**


## 🚀 Instalación y Ejecución

Sigue estos sencillos pasos para clonar el repositorio, instalar las dependencias y levantar el proyecto en tu entorno local.

1. **Clonar el repositorio**
   Abre tu terminal y descarga el proyecto con el siguiente comando:
   git clone https://github.com/jorgexxvp/rimac-seguro-salud

2. **Acceder al directorio del proyecto**
   Muévete a la carpeta raíz del proyecto:
   cd rimac-seguro-salud

3. **Instalar las dependencias**
   Instala todos los módulos necesarios ejecutando el comando:
   pnpm install

4. **Levantar el servidor de desarrollo**
   Para encender el entorno local con Vite, ejecuta el comando:
   pnpm run dev

   La terminal te mostrará un enlace local (usualmente http://localhost:5173). Abre esa dirección en tu navegador para interactuar con la aplicación.

5. **Compilar para producción (Build)**
   Si necesitas generar los archivos optimizados listos para producción, ejecuta el comando:
   pnpm run build

---

## 🧪 Pruebas Unitarias (Testing)

Este proyecto cuenta con pruebas unitarias utilizando **Vitest** y **React Testing Library**.

* **Ejecutar los tests en modo interactivo (Watch mode):**
  pnpm run test
  
* **Generar el reporte de cobertura de código (Coverage):**
  pnpm run test:coverage

---


## 🛠️ Tech Stack

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 18+ | UI Framework |
| **TypeScript** | 5+ | Type Safety |
| **Vite** | 5+ | Build Tool |
| **SASS** | 3+ | Styling |
| **Zustand** | Latest | State Management |
| **pnpm** | 8+ | Package Manager |

## 📁 Estructura del Proyecto
```
src/
├── core/                          # Lógica de negocio central
│   ├── application/               # Use Cases y servicios
│   │   ├── PlanUseCase.ts
│   │   └── UserUseCase.ts
│   ├── domain/                    # Entidades e interfaces
│   │   ├── models/                # Modelos de datos
│   │   │   ├── Plan.ts
│   │   │   └── User.ts
│   │   └── repositories/          # Interfaces de repositorios
│   │       ├── PlanRepository.ts
│   │       └── UserRepository.ts
│   └── infrastructure/            # Implementaciones de APIs
│       ├── api/
│       │   └── Api.ts             
│       └── services/              # Servicios de API
│           ├── PlanApi.ts         # Configuración HTTP cliente
│           └── UserApi.ts
├── presentation/                  # Capa de presentación (UI)
│   ├── assets/
│   │   ├── images/
│   │   └── svg/
│   ├── components/                # Componentes reutilizables
│   │   ├── CustomButton/
│   │   ├── GroupInput/
│   │   ├── Header/
│   │   ├── Loading/
│   │   ├── Slider/
│   │   ├── Stepper/
│   ├── Views/                  # Módulos por feature
│   │   └── Login/
│   │   │   ├── Login/
│   │   │   └── index.ts
│   │   └── Portal/
│   │       ├── Portal/
│   │       └── index.ts
│   │   └── Summary/
│   │       ├── Summary/
│   │       └── index.ts
│   ├── zustand/                   # Global State Management
│   │   ├── userInfoState.tsx
│   ├── toolbox/                   # Utilidades y constantes
│   │   ├── constants/
│   │   ├── interface/
│   │   ├── utils/
│   │   └── index.ts
│   ├── routes/                    # Configuración de rutas
│   └── App.tsx
├── index.ts                       # Entry point
├── vite.config.ts                 # Configuración de Vite
├── tailwind.config.ts             # Configuración de Tailwind
└── tsconfig.json                  # Configuración de TypeScript
```