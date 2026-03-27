# Renart

A gold jewelry product catalog built as a case study. The app displays a horizontally scrollable list of engagement rings with live pricing calculated from the real-time gold spot price (fetched from [GoldAPI](https://www.goldapi.io/)). Users can filter products by price range and popularity, and switch between yellow, rose, and white gold color variants for each ring.

## Tech Stack

- **React 19** (JSX + TypeScript components)
- **Vite 7** (dev server and build tool)
- **Tailwind CSS 4** (utility-first styling via the Vite plugin)
- **Lucide React** (icons)
- **GoldAPI** (real-time XAU/USD gold price)

## Prerequisites

- Node.js (v18 or later recommended)
- npm
- A [GoldAPI](https://www.goldapi.io/) API key

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/omar-dakalbab/Renart.git
   cd Renart
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your GoldAPI key:

   ```
   VITE_GOLD_API_KEY=your_goldapi_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the Vite dev server      |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview the production build   |
| `npm run lint`    | Run ESLint                     |

## Environment Variables

| Variable            | Description                          | Required |
| ------------------- | ------------------------------------ | -------- |
| `VITE_GOLD_API_KEY` | API key from https://www.goldapi.io/ | Yes      |

> **Note:** Never commit your `.env` file. It is already included in `.gitignore`.

## How It Works

Product data (name, weight, popularity score, and image URLs for each gold color) is stored in `src/data/products.json`. On load, the app fetches the current gold price per troy ounce from GoldAPI and calculates each ring's price using the formula:

```
price = (popularityScore * 5 + 1) * weight * goldPrice
```

Users can filter the displayed products by price range (dual range sliders) and minimum popularity rating.
