# Sistema de Reservas Web Reservas 🎫

Aplicación web moderna para gestión de reservas, reserva de servicios y administración de usuarios. Construida con **React**, **TypeScript**, **Tailwind CSS** y **Vite**, siguiendo los principios de **Clean Architecture**.

## 🚀 Características

- ✅ Autenticación y gestión de usuarios
- ✅ Reserva de servicios y maestros
- ✅ Dashboard administrativo
- ✅ Gestión de permisos y roles
- ✅ Interfaz moderna y responsiva
- ✅ State management con Zustand
- ✅ API REST con proxy CORS

## 📋 Requisitos Previos

- **Node.js** 20+ 
- **pnpm** 8+ ([Instalar pnpm](https://pnpm.io/installation))
- **Git**

## 🛠️ Tech Stack

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 18+ | UI Framework |
| **TypeScript** | 5+ | Type Safety |
| **Vite** | 5+ | Build Tool |
| **Tailwind CSS** | 3+ | Styling |
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