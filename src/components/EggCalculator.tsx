'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import axios from 'axios';

type EggCalculatorProps = {
  defaultEggPrice?: number;
  onIncomeChange?: (income: number) => void;
};

const EggCalculator = ({ defaultEggPrice = 0.25, onIncomeChange }: EggCalculatorProps) => {
  const [income, setIncome] = useState<string>('');
  const [eggPrice, setEggPrice] = useState<number>(defaultEggPrice);
  const [eggWorth, setEggWorth] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [priceDate, setPriceDate] = useState<string>('');

  // Fetch the current egg price from the API
  useEffect(() => {
    const fetchCurrentEggPrice = async () => {
      try {
        setIsLoadingPrice(true);
        setPriceError(null);
        
        // Use the local API endpoint that fetches and passes through raw data from the Eggs API
        const response = await axios.post('/api/eggprices');
        
        if (response.data && Array.isArray(response.data)) {
          // Sort by year and period to get the most recent
          const sortedData = [...response.data].sort((a, b) => {
            // First sort by year
            if (a.year !== b.year) {
              return b.year - a.year; // Descending order for year
            }
            // Then by month code (M01-M12)
            return b.period.localeCompare(a.period); // Descending order for month
          });
          
          // Get the most recent price
          const mostRecent = sortedData[0]; // First item after sorting is the most recent
          
          if (mostRecent && mostRecent.value) {
            // Divide by 12 to get price per single egg (assuming value is per dozen)
            const pricePerEgg = mostRecent.value / 12; 
            setEggPrice(pricePerEgg);
            setPriceDate(mostRecent.monthLabel || `${mostRecent.year} ${mostRecent.period.replace('M', 'Month ')}`);
          } else {
            throw new Error('No valid price data found');
          }
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Failed to fetch current egg price:', error);
        setPriceError('Using default price (API unavailable)');
        // Keep using the defaultEggPrice if there's an error
      } finally {
        setIsLoadingPrice(false);
      }
    };
    
    fetchCurrentEggPrice();
  }, [defaultEggPrice]);

  const handleIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newIncomeValue = e.target.value;
    setIncome(newIncomeValue);
    
    // Notify parent component about income change if callback exists
    if (onIncomeChange && newIncomeValue) {
      const numericIncome = parseFloat(newIncomeValue);
      if (!isNaN(numericIncome)) {
        onIncomeChange(numericIncome);
      }
    }
  };

  const calculateEggWorth = (e: FormEvent) => {
    e.preventDefault();
    
    const incomeValue = parseFloat(income);
    
    if (isNaN(incomeValue) || eggPrice <= 0) {
      return;
    }
    
    const eggs = Math.floor(incomeValue / eggPrice);
    setEggWorth(eggs);
    setHasCalculated(true);

    // Also update parent component with new income
    if (onIncomeChange) {
      onIncomeChange(incomeValue);
    }
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };
  
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="w-full max-w-lg mx-auto card p-4 sm:p-6">
      <form onSubmit={calculateEggWorth}>
        <div className="mb-4 sm:mb-6">
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
            Your Annual Income
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="income"
              id="income"
              className="input-field pl-7 pr-12 w-full py-2"
              placeholder="0.00"
              value={income}
              onChange={handleIncomeChange}
              aria-describedby="income-currency"
              min="0"
              step="1"
              required
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Current Egg Price
            </label>
            <span className="text-sm font-medium text-egg-primary">
              {isLoadingPrice ? 'Loading...' : formatCurrency(eggPrice)}
            </span>
          </div>
          <div className="mt-1">
            <p className="text-xs sm:text-sm text-gray-500">
              {priceDate ? `Price per egg as of ${priceDate}` : 'Current average price of a single egg in the US'}
            </p>
            {priceError && <p className="text-xs text-amber-600 mt-1">{priceError}</p>}
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-2 sm:py-3 text-sm sm:text-base">
          Calculate
        </button>
      </form>

      <div className={`mt-6 sm:mt-8 p-3 sm:p-4 bg-egg-shell rounded-lg text-center ${hasCalculated ? 'opacity-100' : 'opacity-70'}`}>
        <h3 className="text-lg sm:text-xl font-semibold text-egg-primary mb-1 sm:mb-2">Your Annual Egg Worth</h3>
        <p className="text-3xl sm:text-4xl font-bold text-egg-primary">🥚 {formatNumber(eggWorth)}</p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
          {hasCalculated
            ? `You could buy ${formatNumber(eggWorth)} eggs with your annual income`
            : 'Enter your income and calculate to see your egg worth'}
        </p>
      </div>
    </div>
  );
};

export default EggCalculator; 