import { NextResponse } from 'next/server';

// Sample historical egg price data (simplified for the demo)
// In a real app, this would come from a database or external API
const historicalEggPrices = [
  { year: 1950, price: 0.06 },
  { year: 1955, price: 0.07 },
  { year: 1960, price: 0.08 },
  { year: 1965, price: 0.09 },
  { year: 1970, price: 0.09 },
  { year: 1975, price: 0.11 },
  { year: 1980, price: 0.12 },
  { year: 1985, price: 0.13 },
  { year: 1990, price: 0.15 },
  { year: 1995, price: 0.16 },
  { year: 2000, price: 0.17 },
  { year: 2005, price: 0.19 },
  { year: 2010, price: 0.21 },
  { year: 2015, price: 0.22 },
  { year: 2020, price: 0.23 },
  { year: 2023, price: 0.25 },
];

export async function GET() {
  return NextResponse.json({
    data: historicalEggPrices,
  });
}

// Get the current egg price (most recent in our data)
export async function HEAD() {
  const currentPrice = historicalEggPrices[historicalEggPrices.length - 1].price;
  
  return NextResponse.json({
    currentPrice,
  });
} 