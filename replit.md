# MaddaSoft - School Website Platform

## Overview

MaddaSoft is a multi-tenant school website platform built with React and TypeScript. It provides a unified solution for Indonesian schools to manage their web presence through a single platform. The system supports three distinct user roles (Super Admin, School Admin, Operator) and features domain-based routing to serve either the main platform landing page or individual school websites.

The application uses a domain detection system to determine whether to display the platform marketing site or a specific school's public website, with development mode simulation capabilities for testing different school contexts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool with React SWC plugin for fast compilation
- **React Router** for client-side routing with role-based layouts

### UI Component System
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for component variant management
- CSS variables for theming, enabling per-school color customization

### State Management
- **TanStack Query (React Query)** for server state management and caching
- **React Context API** for global state:
  - `AuthContext` - User authentication state and role management
  - `DomainContext` - Domain detection and school context simulation

### Routing Architecture
The application uses a multi-layout routing structure:
- `/` - Dynamic index that renders either PlatformLanding or SchoolWebsite based on domain
- `/domain-pusat/admin/*` - Super admin dashboard with `SuperAdminLayout`
- `/domain-pusat/login` - Super admin authentication
- `/admin/*` - School admin dashboard with `SchoolAdminLayout`
- `/operator/*` - Operator dashboard with `OperatorLayout`
- `/school-login` - School-specific authentication

### Domain Detection System
- Detects current hostname to determine if user is on platform domain or school subdomain
- Development mode allows simulation of different school contexts via localStorage
- `DevModeToggle` component provides UI for switching between schools during development

### Data Layer
- Currently uses in-memory dummy data (`src/data/dummyData.ts`) for development
- Data models include: Schools, Staff, Students, Users, Posts, Gallery items
- Supports multiple school levels (SD, SMP, SMA, SMK)

### Testing Setup
- **Vitest** for unit testing with jsdom environment
- Test files located in `src/test/` directory
- Global test setup includes jest-dom matchers

## External Dependencies

### UI Framework
- Radix UI primitives (accordion, dialog, dropdown-menu, tabs, toast, etc.)
- Lucide React for iconography
- Embla Carousel for image sliders
- React Day Picker for date selection
- Sonner for toast notifications

### Form Handling
- React Hook Form with Zod resolvers for validation

### Styling
- Tailwind CSS with custom configuration
- Inter font family from Google Fonts
- next-themes for dark mode support (configured but theme variables defined)

### Data Fetching
- TanStack React Query for async state management

### Build Tools
- Vite with path aliasing (`@/` maps to `src/`)
- PostCSS with Tailwind and Autoprefixer plugins
- TypeScript with relaxed strict mode for faster development

### Development
- ESLint with React Hooks and React Refresh plugins
- Hot Module Replacement configured on port 5000