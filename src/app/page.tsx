'use client';

import EggCalculator from '@/components/EggCalculator';
import HistoricalChart from '@/components/HistoricalChart';
import Layout from '@/components/Layout';
import RichestList from '@/components/RichestList';
import { useState } from 'react';

export default function Home() {
  const [income, setIncome] = useState<number>(50000);

  const handleIncomeChange = (newIncome: number) => {
    setIncome(newIncome);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-egg-shell to-white">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-egg-primary mb-6">Measure Wealth in Eggs</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ever wondered how many eggs your salary could buy? Or how the world&apos;s richest people compare in egg-wealth?
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#calculator" className="btn-primary">Calculate Your Egg Worth</a>
            <a href="#richest" className="btn-secondary">See Egg Billionaires</a>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-egg-primary mb-10">Calculate Your Egg Worth</h2>
          <EggCalculator defaultEggPrice={0.25} onIncomeChange={handleIncomeChange} />
        </div>
      </section>

      {/* Top Richest Section */}
      <section id="richest" className="py-16 bg-egg-shell">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-egg-primary mb-10">Top Egg Billionaires</h2>
          <RichestList />
        </div>
      </section>

      {/* Historical Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-egg-primary mb-10">Historical Egg Worth</h2>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            See how your egg worth would have changed throughout history as egg prices fluctuated.
          </p>
          <HistoricalChart income={income} />
        </div>
      </section>
    </Layout>
  );
} 