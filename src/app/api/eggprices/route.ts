import { NextResponse } from 'next/server';
import axios from 'axios';

// Define the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_EGG_API_URL || 'http://localhost:3000';

// Define the data structure to match what the frontend expects
interface EggPriceData {
  year: number;
  price: number;
}

// Function to convert the API yearly averages to the format our frontend expects
function transformYearlyAveragesData(apiData: any[]): EggPriceData[] {
  return apiData.map(item => ({
    year: item.year,
    price: item.averagePrice
  }));
}

// Get raw egg price data (all records)
export async function POST() {
  try {
    // Directly fetch prices from the eggs-api
    const response = await axios.get(`${API_URL}/api/prices`);
    
    // Just pass through the raw data
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching raw egg prices from API:', error);
    
    // Return error
    return NextResponse.json(
      { error: 'Failed to fetch data from the egg price API' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch yearly average prices from the eggs-api
    const response = await axios.get(`${API_URL}/api/yearly-averages`);
    const transformedData = transformYearlyAveragesData(response.data);
    
    return NextResponse.json({
      data: transformedData,
    });
  } catch (error) {
    console.error('Error fetching egg prices from API:', error);
    
    // Fallback data in case the API is unavailable
    return NextResponse.json({
      data: [
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
      ],
      error: 'Failed to fetch data from the egg price API'
    });
  }
}

// Get the current egg price (most recent in our data)
export async function HEAD() {
  try {
    // Get all yearly averages
    const response = await axios.get(`${API_URL}/api/yearly-averages`);
    
    // Find the most recent year data
    const sortedData = [...response.data].sort((a, b) => b.year - a.year);
    const currentPrice = sortedData[0].averagePrice;
    
    return NextResponse.json({
      currentPrice,
    });
  } catch (error) {
    console.error('Error fetching current egg price from API:', error);
    
    // Fallback to a default price if the API is unavailable
    return NextResponse.json({
      currentPrice: 0.25,
      error: 'Failed to fetch current price from the egg price API'
    });
  }
} 