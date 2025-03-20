import { NextResponse } from 'next/server';

// Sample data for the top 100 richest people (simplified for the demo)
// In a real app, this would come from a database or external API
const billionaires = [
  { id: 1, rank: 1, name: "Elon Musk", netWorth: 234, company: "Tesla, SpaceX", country: "USA" },
  { id: 2, rank: 2, name: "Jeff Bezos", netWorth: 189, company: "Amazon", country: "USA" },
  { id: 3, rank: 3, name: "Bernard Arnault", netWorth: 183, company: "LVMH", country: "France" },
  { id: 4, rank: 4, name: "Bill Gates", netWorth: 128, company: "Microsoft", country: "USA" },
  { id: 5, rank: 5, name: "Warren Buffett", netWorth: 121, company: "Berkshire Hathaway", country: "USA" },
  { id: 6, rank: 6, name: "Larry Page", netWorth: 115, company: "Google", country: "USA" },
  { id: 7, rank: 7, name: "Sergey Brin", netWorth: 111, company: "Google", country: "USA" },
  { id: 8, rank: 8, name: "Larry Ellison", netWorth: 107, company: "Oracle", country: "USA" },
  { id: 9, rank: 9, name: "Steve Ballmer", netWorth: 104, company: "Microsoft", country: "USA" },
  { id: 10, rank: 10, name: "Mukesh Ambani", netWorth: 97, company: "Reliance Industries", country: "India" },
  // Additional entries would be added here to reach 100
];

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
  const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset') as string) : 0;
  
  // Apply pagination
  const paginatedData = limit 
    ? billionaires.slice(offset, offset + limit) 
    : billionaires;
  
  return NextResponse.json({
    data: paginatedData,
    total: billionaires.length,
    limit,
    offset,
  });
}

export async function HEAD(request: Request) {
  return NextResponse.json({
    total: billionaires.length,
  });
} 