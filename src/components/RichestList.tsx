'use client';

import { useEffect, useState } from 'react';

type Person = {
  id: number;
  rank: number;
  name: string;
  netWorth: number; // in billions USD
  company: string;
  country: string;
};

type RichestListProps = {
  people?: Person[];
  eggPrice?: number;
  limit?: number;
};

const RichestList = ({ people, eggPrice = 0.25, limit = 6 }: RichestListProps) => {
  const [billionaires, setBillionaires] = useState<Person[]>(people || []);
  const [loading, setLoading] = useState<boolean>(!people);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (people) {
      setBillionaires(people);
      return;
    }
    
    const fetchBillionaires = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/billionaires?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch billionaires data');
        }
        
        const result = await response.json();
        setBillionaires(result.data);
      } catch (err) {
        setError('Failed to load billionaires data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBillionaires();
  }, [people, limit]);

  const calculateEggWorth = (netWorthBillions: number): number => {
    return Math.floor((netWorthBillions * 1_000_000_000) / eggPrice);
  };

  const formatEggWorth = (eggs: number): string => {
    if (eggs >= 1_000_000_000_000) {
      return `${(eggs / 1_000_000_000_000).toFixed(2)} Trillion`;
    }
    if (eggs >= 1_000_000_000) {
      return `${(eggs / 1_000_000_000).toFixed(2)} Billion`;
    }
    if (eggs >= 1_000_000) {
      return `${(eggs / 1_000_000).toFixed(2)} Million`;
    }
    return new Intl.NumberFormat().format(eggs);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center p-8">
        <p className="text-egg-primary">Loading billionaires data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center p-8">
        <p className="text-red-500">{error}</p>
        <p className="mt-4">Using sample data instead...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {billionaires.map((person) => {
        const eggWorth = calculateEggWorth(person.netWorth);
        
        return (
          <div key={person.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-gray-500 text-sm">{person.company}</p>
              </div>
              <div className="bg-egg-yolk rounded-full h-10 w-10 flex items-center justify-center font-bold">
                {person.rank}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-egg-primary">🥚 {formatEggWorth(eggWorth)}</p>
              <p className="text-sm text-gray-600">${person.netWorth} Billion USD</p>
              <p className="text-xs text-gray-500 mt-1">{person.country}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RichestList; 