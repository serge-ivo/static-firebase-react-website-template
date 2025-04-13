# Firebase + React + TypeScript + Vite + MUI Template

This template provides a starting point for building web applications using React, Vite, TypeScript, Firebase (Auth, Firestore, Hosting), and Material UI.

## Features

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: Emotion (used by MUI)
- **Firebase Integration**:
  - Firebase Authentication (Email/Password, Google, GitHub providers setup)
  - Firestore (Basic user profile storage in `users` and `usersPub` collections)
  - Firebase Hosting configuration included
  - **Easy Configuration**: Firebase config loaded via Vite environment variables from `.env` file (using `.env.example` as template).
- **Routing**: `react-router-dom` with examples of public (`/login`) and private (`/`, `/dashboard`) routes.
- **State Management**: React Context API for Authentication (`AuthContext`).
- **Notifications**: `react-toastify` for displaying notifications.
- **Configuration**: Simple application config (`src/config.ts`) for title, etc.
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier (integrated with ESLint)
- **Git Hooks**: Husky configured to run linting (`npm run lint`) and type checks (`npm run type:check`) before each commit.
- **Deployment**: Firebase Hosting configuration included
- **CI/CD**: Basic GitHub Actions workflow for building and deploying to Firebase Hosting

## Getting Started

### Prerequisites

- Node.js (Check `.nvmrc` or `package.json` engines field for recommended version)
- npm
- Firebase CLI: `npm install -g firebase-tools`
- A Firebase project created on [firebase.google.com](https://firebase.google.com/)

### Installation & Setup

1.  **Clone the repository or use it as a template:**

    ```bash
    # Using degit for a clean clone
    npx degit your-github-username/firebase-npm-react-ts-vite my-new-project
    cd my-new-project

    # Or clone directly (if you forked it)
    # git clone https://github.com/your-github-username/firebase-npm-react-ts-vite.git
    # cd firebase-npm-react-ts-vite
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    _(This will also install Husky Git hooks automatically)._

3.  **Configure Application Title (Optional):**

    - Edit the `APP_TITLE` constant in `src/config.ts`.

4.  **Configure Firebase:**
    - **IMPORTANT:** Copy the `.env.example` file in the root directory to a new file named `.env`.
    - Open the `.env` file and replace the placeholder values for `VITE_FIREBASE_...` variables with your actual Firebase project configuration. You can find these values in your Firebase project console (Project settings > General > Your apps > Web app > SDK setup and configuration).
    - **Do NOT commit your `.env` file to version control.** (`.gitignore` is already set up to ignore it).
    - Log in to Firebase CLI (if you haven't already): `firebase login`
    - Associate the project directory with your Firebase project: `firebase use --add` (Select your project and choose an alias like `default` or `prod`).
    - **Enable Authentication Providers:** In your Firebase project console, go to **Authentication** > **Sign-in method** and enable:
      - Email/Password
      - Google (You may need to configure OAuth consent screen details)
      - GitHub (You will need to provide the Client ID and Client Secret from a GitHub OAuth App)
    - **Configure Firestore:** This template uses Firestore to store basic user profile information.
      - Ensure Firestore is enabled for your project (Native mode is recommended).
      - Deploy the included Firestore rules (or your own custom rules) using the Firebase CLI: `firebase deploy --only firestore:rules`. The provided `firestore.rules` allow basic access for authenticated users to manage their own data. **Review and tighten these rules for production.**

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy). Visit `/login` to sign in.

_Note: When you commit changes (`git commit ...`), the pre-commit hook configured via Husky will automatically run `npm run lint` and `npm run type:check`. The commit will fail if any errors are found._

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the application for production using Vite.
- `npm run preview`: Serves the production build locally for previewing.
- `npm run lint`: Lints the code using ESLint.
- `npm test`: Runs tests using Jest.
- `npm run type:check`: Performs a TypeScript type check without emitting files.
- `npm run serve`: Serves the application using the Firebase emulator (useful for testing hosting rules, functions, etc.).
- `npm run deploy`: Builds the app and deploys only hosting to Firebase (using the default project alias).
- `npm run deploy:rules`: Deploys only Firestore rules.

## Deployment

This template includes configuration for deploying to Firebase Hosting and Firestore rules.

1.  **Build the application:**

    ```bash
    npm run build
    ```

2.  **Deploy Hosting and Rules:**
    ```bash
    firebase deploy
    # Or deploy only hosting:
    # firebase deploy --only hosting
    # Or deploy only rules:
    # firebase deploy --only firestore:rules
    # Specify a project alias if needed:
    # firebase deploy -P your-project-alias
    ```

See the `.github/workflows/` directory for an example CI/CD setup using GitHub Actions to automate deployment. You will need to configure Firebase Hosting secrets (`FIREBASE_SERVICE_ACCOUNT_YOUR_PROJECT_ID`) in your GitHub repository settings.

## Core Concepts

- **Configuration (`src/config.ts`):** Contains simple application-level configurations like the app title.
- **Firebase Setup (`src/services/firebaseConfig.ts`):** Initializes Firebase using configuration loaded via Vite from the `.env` file.
- **Authentication (`src/contexts/AuthContext.tsx`):** Uses Firebase Auth and React Context. Handles user state (`currentUser`), loading state, and provides functions for sign-up (Email/Password), sign-in (Email/Password, Google, GitHub), and logout. It also interacts with Firestore (`ensureUserDocument`) to create/update user profile documents in `users` and `usersPub` collections upon sign-in/sign-up.
- **Routing (`src/routes/`):** Uses `react-router-dom`. Defines public routes (like `/login`) and protected routes (like `/` and `/dashboard`) using the `PrivateRoute` component which checks the authentication state from `AuthContext`.
- **Layout (`src/components/layout/`):** Provides the main application structure (`MainLayout.tsx`) including a configurable top bar (`TopBar.tsx`) and footer using MUI components. The top bar displays the app title (from `src/config.ts`), user information, and relevant actions (login/logout, profile, dashboard).
- **Firestore Rules (`firestore.rules`):** Defines security rules for Firestore access. **Important:** Review and customize these rules for your application's security needs before deploying to production.
- **Git Hooks (`.husky/`):** Uses Husky to manage Git hooks. The `pre-commit` hook is configured to run linting and type checks automatically, ensuring code quality before commits.

## Customization

- **Firebase Config**: Copy `.env.example` to `.env` and **replace the placeholder values with your project's Firebase configuration.**
- **App Title & Config**: Modify `src/config.ts` to change the application title or add other configurations.
- **Modify Git Hooks**: Edit the script in `.husky/_/pre-commit` to change or add checks (e.g., run tests, format code with Prettier) that run before commits.
- **Remove Auth Providers**: If you don't need Google or GitHub login, remove the corresponding functions from `AuthContext.tsx` and the buttons from `LoginPage.tsx`.
- **Modify Firestore Data**: Change the `UserDocData` interface in `AuthContext.tsx` and the `ensureUserDocument` function to store different user profile information.
- **UI Library**: While integrated, MUI can be replaced. This would involve removing MUI dependencies (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`), removing MUI components and `sx` props throughout the codebase, and removing the `ThemeProvider` (if added).
- **State Management**: Replace or supplement `AuthContext` with other libraries (Redux Toolkit, Zustand, etc.) if needed for more complex global state.
- **Add Firebase Services**: Integrate other Firebase services like Cloud Functions, Storage, etc. by installing their SDKs and adding relevant configurations.

## Project Structure

```
.
├── .github/            # GitHub Actions workflows
├── .husky/             # Husky Git hooks configuration (e.g., pre-commit script)
├── public/             # Static assets served directly
├── src/
│   ├── assets/         # Images, fonts, etc. (e.g., logo.svg)
│   ├── components/     # Reusable UI components
│   │   ├── layout/       # MainLayout.tsx, TopBar.tsx, Footer (defined in MainLayout)
│   │   ├── UserProfileDialog.tsx # Dialog for user profile actions
│   │   ├── BreadCrumbs.tsx # Dynamic breadcrumbs component
│   │   └── UserDetails.tsx # Component to display basic user details
│   ├── config.ts       # Application configuration (e.g., APP_TITLE)
│   ├── contexts/       # React Context providers (AuthContext.tsx)
│   ├── hooks/          # Custom React hooks (useAuth)
│   ├── models/         # Data models/types (user.ts -> UserData)
│   ├── pages/          # Page-level components (routed components)
│   │   ├── auth/       # Auth pages (LoginPage.tsx)
│   │   ├── error/      # Error page component (ErrorPage.tsx)
│   │   ├── login/      # Contains ResetPasswordModal.tsx
│   │   ├── UserProfile/ # User Profile view & edit pages
│   │   │   ├── UserProfilePage.tsx
│   │   │   ├── UserProfileEditPage.tsx
│   │   │   └── UserProfileDetailsCard.tsx
│   │   ├── DashboardPage.tsx # Example protected dashboard page
│   │   └── HomePage.tsx      # Example protected home page
│   ├── repositories/   # Data access layer (UserRepository.ts)
│   ├── routes/         # Routing configuration (routes.tsx, PrivateRoute.tsx)
│   ├── services/       # Service integrations (firebaseConfig.ts, authService.ts)
│   ├── theme/          # MUI Theme configuration (if customized)
│   ├── utils/          # Utility functions (e.g., firestorePaths.ts)
│   ├── App.tsx         # Main application component (sets up router)
│   └── main.tsx        # Application entry point (renders App, providers)
├── .env.example        # Example environment variables (copy to .env and fill in values)
├── .firebaserc         # Firebase project aliases
├── .gitignore          # Git ignore rules
├── eslint.config.js    # ESLint configuration
├── firebase.json       # Firebase project config (Hosting, Firestore rules)
├── firestore.rules     # Firestore security rules
├── index.html          # HTML entry point for Vite
├── jest.config.js      # Jest test runner configuration
├── package.json        # Project dependencies and scripts
├── README.md           # This file
├── tsconfig.json       # TypeScript compiler options for the project
├── tsconfig.node.json  # TypeScript options for Node.js context (Vite config, etc.)
└── vite.config.ts      # Vite build tool configuration
```
