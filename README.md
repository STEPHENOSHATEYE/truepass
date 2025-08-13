# TruePass

TruePass is a modern event management and ticketing platform built with Next.js and TypeScript. It provides features for creating, exploring, and managing events, as well as secure ticketing and QR code scanning. The project leverages Tailwind CSS for styling and includes a rich set of reusable UI components.

## Features

- **Event Creation & Management:** Create new events, manage event details, and view your tickets.
- **Event Exploration:** Browse and explore available events.
- **Ticketing System:** Add, view, and manage tickets for events.
- **QR Code Integration:** Generate and scan QR codes for event tickets.
- **Responsive UI:** Mobile-friendly design with reusable components.
- **Theming:** Customizable themes and dark mode support.
- **Modern UI Components:** Includes accordions, dialogs, forms, tables, carousels, and more.

## Project Structure

```
app/                # Next.js app directory (routing, pages, layouts)
components/         # Reusable React components and UI primitives
hooks/              # Custom React hooks
lib/                # Utility functions, types, and theme definitions
public/             # Static assets (images, SVGs, design references)
store/              # State management (Zustand stores)
styles/             # Global CSS styles
```

### Key Directories

- **app/**: Contains all Next.js pages and layouts, organized by feature (e.g., `create`, `events`, `explore`, `market`, etc.).
- **components/**: Houses both general and UI-specific components (e.g., buttons, modals, cards, QR code utilities).
- **hooks/**: Custom hooks for mobile detection and toast notifications.
- **lib/**: Utility functions (`cn` for classnames), type definitions, and theme management.
- **store/**: Zustand-based state management for app-wide and theme-specific states.
- **public/**: Images and design references for branding and UI.
- **styles/**: Global CSS file for base styles.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/STEPHENOSHATEYE/truepass.git
   cd truepass
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Create Events:** Navigate to `/create` to start building a new event.
- **Explore Events:** Visit `/explore` to browse available events.
- **Manage Tickets:** Access `/my-tickets` to view and manage your tickets.
- **Scan Tickets:** Use `/scan` for QR code scanning functionality.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) for class management
- [Zustand](https://zustand-demo.pmnd.rs/) for state management

## Customization

- **Themes:** Modify themes.ts and use-theme.ts for custom themes.
- **UI Components:** Extend or customize components in ui.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Inspired by modern event platforms and ticketing systems.
- UI components based on best practices for accessibility and responsiveness.
