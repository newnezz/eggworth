'use client';

import HistoricalChart from '@/components/HistoricalChart';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function HistoryPage() {
  const [income, setIncome] = useState<number>(50000);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setIncome(value);
    }
  };

  return (
    <Layout>
      <div className="container-responsive py-8 sm:py-12">
        <h1 className="heading-1 text-center text-egg-primary mb-6 sm:mb-8">Historical Egg Worth Data</h1>
        
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <p className="body-text mb-6 sm:mb-8">
            Throughout history, the price of eggs has fluctuated due to various factors including inflation,
            agricultural advancements, and economic conditions. This page lets you explore how many eggs
            your current income would have been worth at different points in history.
          </p>
          
          <div className="bg-egg-shell rounded-lg p-4 sm:p-6 mb-8 sm:mb-10">
            <label htmlFor="historyIncome" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Your Annual Income
            </label>
            <div className="mt-1 relative rounded-md shadow-sm max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="historyIncome"
                id="historyIncome"
                className="input-field pl-7 pr-4 w-full py-2"
                placeholder="50000"
                value={income}
                onChange={handleIncomeChange}
                min="0"
                step="1000"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-10 sm:mb-16">
          <h2 className="heading-2 text-egg-primary mb-4 sm:mb-6 text-center sm:text-left">Historical Egg Worth Chart</h2>
          <HistoricalChart income={income} />
        </div>
        
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h2 className="heading-2 text-egg-primary mb-4 sm:mb-6 text-center sm:text-left">Interesting Egg Price Facts</h2>
          
          <div className="responsive-grid">
            <div className="card">
              <h3 className="heading-3 mb-2">The Great Depression</h3>
              <p className="body-text">
                During the Great Depression of the 1930s, egg prices fell dramatically, but so did wages. 
                The average price of a dozen eggs in 1933 was about 30 cents, equivalent to around 2.5 cents per egg.
              </p>
            </div>
            
            <div className="card">
              <h3 className="heading-3 mb-2">Egg Prices in the 1950s</h3>
              <p className="body-text">
                In the 1950s, the average price of an egg was around 6 cents. This was during a period of 
                economic growth after World War II when many Americans were experiencing increased prosperity.
              </p>
            </div>
            
            <div className="card">
              <h3 className="heading-3 mb-2">Modern Egg Production</h3>
              <p className="body-text">
                Modern egg production methods have helped keep egg prices relatively stable despite inflation. 
                Technology and farming practices have significantly increased the efficiency of egg production.
              </p>
            </div>
            
            <div className="card">
              <h3 className="heading-3 mb-2">Recent Price Fluctuations</h3>
              <p className="body-text">
                In recent years, various factors including avian flu outbreaks, feed costs, and new animal welfare 
                regulations have caused egg prices to be more volatile than in previous decades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 