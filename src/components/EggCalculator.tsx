'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type EggCalculatorProps = {
  defaultEggPrice?: number;
  onIncomeChange?: (income: number) => void;
};

const EggCalculator = ({ defaultEggPrice = 0.25, onIncomeChange }: EggCalculatorProps) => {
  const [income, setIncome] = useState<string>('');
  const [eggPrice, setEggPrice] = useState<string>(defaultEggPrice.toString());
  const [eggWorth, setEggWorth] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

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

  const handleEggPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEggPrice(e.target.value);
  };

  const calculateEggWorth = (e: FormEvent) => {
    e.preventDefault();
    
    const incomeValue = parseFloat(income);
    const eggPriceValue = parseFloat(eggPrice);
    
    if (isNaN(incomeValue) || isNaN(eggPriceValue) || eggPriceValue <= 0) {
      return;
    }
    
    const eggs = Math.floor(incomeValue / eggPriceValue);
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

  return (
    <div className="max-w-lg mx-auto card">
      <form onSubmit={calculateEggWorth}>
        <div className="mb-6">
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
              className="input-field pl-7 pr-12"
              placeholder="0.00"
              value={income}
              onChange={handleIncomeChange}
              aria-describedby="income-currency"
              min="0"
              step="1"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="eggPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Average Egg Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="eggPrice"
              id="eggPrice"
              className="input-field pl-7 pr-12"
              placeholder="0.25"
              value={eggPrice}
              onChange={handleEggPriceChange}
              step="0.01"
              min="0.01"
              required
              aria-describedby="price-currency"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Current average price of a single egg in the US</p>
        </div>

        <button type="submit" className="btn-primary w-full">
          Calculate
        </button>
      </form>

      <div className={`mt-8 p-4 bg-egg-shell rounded-lg text-center ${hasCalculated ? 'opacity-100' : 'opacity-70'}`}>
        <h3 className="text-xl font-semibold text-egg-primary mb-2">Your Annual Egg Worth</h3>
        <p className="text-4xl font-bold text-egg-primary">🥚 {formatNumber(eggWorth)}</p>
        <p className="text-sm text-gray-600 mt-2">
          {hasCalculated
            ? `You could buy ${formatNumber(eggWorth)} eggs with your annual income`
            : 'Enter your income and calculate to see your egg worth'}
        </p>
      </div>
    </div>
  );
};

export default EggCalculator; 