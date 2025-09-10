This project is a 	complementary project of  [AETA](https://github.com/BCemreD/AETA). React application that fetches and displays data from a backend API. It is styled with Tailwind CSS and uses a state management library to handle application data.

## Project Overview
This frontend serves as the user interface for an educational advisory platform. It's designed to simulate an experience similar to the "Geleceği Yazanlar" blog by pulling data from a separate backend API. The application allows users to view courses and blog posts, and to interact with them, such as marking them as favorites.

## Prerequisites
The following software must be installed on your system to run the project successfully:

- Node.js (LTS version): A JavaScript runtime environment.
- npm or yarn: A package manager for installing project dependencies.
- Git: A version control system to clone the project code.

### Setup and Running
#### 1. Install Dependencies
Open your terminal in the project's root directory and install the required packages:
```bash
npm install
```
or
```bash
yarn install
```
#### 2. Run the Backend Server
This frontend application is dependent on the backend API. Ensure the backend server is running and accessible at http://localhost:8080 before starting the frontend.

#### 3. Start the Application
Once the packages are installed and the backend is running, use the following command to start the application:

```bash
npm start
```
or
```bash
yarn start
```
The application will typically open automatically in your browser at http://localhost:3000.

## Technologies Used
- React: A JavaScript library for building the user interface.
- React Router: For handling client-side routing and navigation.
- Zustand: A lightweight state management library for managing application state.
- Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.
- Axios: A promise-based HTTP client for making API requests to the backend.
- 
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
