# 🌤️ Frontend Mentor - Weather App

A responsive weather application built with **React + TypeScript + Vite**, consuming the **Open-Meteo API** to provide detailed forecasts.  
This project is part of a [Frontend Mentor](https://www.frontendmentor.io/) challenge and is deployed via **GitHub Pages**.

---

## 🚀 Demo

👉 [Live Demo on GitHub Pages](https://fabian-guerrero.github.io/FrontendMentor-WeatherApp/)

---

## ✨ Features

- 🔍 **City search** with autocomplete
- 🌡️ **Unit conversion** (Celsius ↔ Fahrenheit)
- 📅 **Daily and hourly forecasts** with day selector
- 📱 **Responsive and accessible design**
- ⚡ **Modular architecture** with reusable components
- 🧪 **Unit and integration tests** using Vitest + React Testing Library
- 🔄 **Automated CI/CD** with GitHub Actions (tests, build, deploy to Pages)

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) bundler
- [SCSS Modules](https://sass-lang.com/) for styling
- [Open-Meteo API](https://open-meteo.com/) for weather data
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) for testing
- [GitHub Actions](https://docs.github.com/en/actions) for CI/CD

---

## 📂 Project Structure

```
/src
├── /components     # UI components (SearchBar, WeatherInfoCard, etc.)
├── /hooks          # Custom hooks (useWeather)
├── /assets         # Icons and resources
├── /styles         # SCSS modules
├── App.tsx         # Root component
├── main.tsx        # Entry point
└── setupTests.ts   # Vitest configuration
```
---

## ⚙️ Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/fabian-guerrero/FrontendMentor-WeatherApp.git
   cd FrontendMentor-WeatherApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the build:
   ```bash
   npm run preview
   ```

---

## 🧪 Testing

Run tests locally:

```bash
npm run test
```

In CI/CD:

```bash
npm run test:run
```

---

## 🔄 CI/CD Workflow

The project includes a GitHub Actions workflow that:

Runs tests with Vitest

Builds the project with Vite

Publishes automatically to the gh-pages branch for GitHub Pages

---

## 👨‍💻 Author

Developed by Fabián Guerrero Frontend Developer focused on building accessible, modular, and user‑friendly web interfaces.
