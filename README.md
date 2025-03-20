# 🥚 EggWorth

EggWorth is a fun web application that lets you measure wealth in terms of eggs. Ever wondered how many eggs your salary could buy? Or how the world's richest people compare in egg-wealth? EggWorth has you covered!

## Features

- Calculate your personal egg worth based on your annual income
- View the top richest people in the world and their wealth converted to eggs
- Explore historical egg worth over time as egg prices fluctuated
- Responsive design that works on mobile, tablet, and desktop

## Tech Stack

- Next.js - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Chart.js - Data visualization

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/eggworth.git
cd eggworth
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:3000

## How It Works

EggWorth takes the current average price of an egg (default $0.25 USD) and uses it to calculate how many eggs your income or someone's net worth could buy. The application also shows historical data to demonstrate how egg purchasing power has changed over time.

## Project Structure

```
eggworth/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   │   ├── EggCalculator.tsx   # Calculator component
│   │   ├── RichestList.tsx     # Billionaires list component
│   │   ├── HistoricalChart.tsx # Historical data chart
│   │   └── Layout.tsx          # Layout wrapper
│   └── lib/                    # Utilities and shared functions
├── public/                     # Static assets
└── ...
```

## Future Enhancements

- Add API integration for real-time net worth data
- Create a more detailed history page with interactive charts
- Add ability to share results on social media
- Implement dark mode
- Add localization for multiple currencies and egg prices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Egg price data is approximated for demonstration purposes
- Net worth data is based on publicly available information
# eggworth
