# YourLoot v0.0.1

YourLoot is a modern web application built with React and Vite, designed to provide a seamless and interactive user experience. This project leverages cutting-edge technologies to deliver high performance and scalability.

## Features

- **Fast and Responsive**: Built with Vite for lightning-fast development and production builds.
- **Modern UI**: Styled with TailwindCSS for a sleek and customizable design.
- **State Management**: Utilizes Zustand for efficient and simple state management.
- **API Integration**: Axios is used for seamless communication with backend APIs.
- **Type Safety**: Developed with TypeScript for robust and maintainable code.

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Deployment**: Firebase Hosting

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd demo-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Build

To create a production build:

```bash
npm run build
# or
yarn build
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
# or
yarn lint
```

## Deployment

This project is configured for deployment on Firebase Hosting. To deploy:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Folder Structure

```
public/         # Static assets
src/            # Main source code
  app/          # Application-level components and routes
  assets/       # Images, icons, and other assets
  components/   # Reusable UI components
  constants/    # Shared constants
  contexts/     # React context providers
  hooks/        # Custom hooks
  services/     # API services and utilities
  store/        # Zustand state management
  environments/ # Environment-specific configurations
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules
  }
})
```

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.yourloot.xyz/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### ssh -R 80:localhost:4300 localhost.run
