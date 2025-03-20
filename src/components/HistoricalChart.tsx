'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type EggPriceData = {
  year: number | string;
  price: number;
};

type HistoricalChartProps = {
  income?: number;
};

const HistoricalChart = ({ income = 50000 }: HistoricalChartProps) => {
  const [historicalData, setHistoricalData] = useState<EggPriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/eggprices');
        
        if (!response.ok) {
          throw new Error('Failed to fetch historical egg prices');
        }
        
        const result = await response.json();
        setHistoricalData(result.data);
      } catch (err) {
        setError('Failed to load historical egg price data');
        console.error(err);
        // Fallback to sample data if API fails
        setHistoricalData([
          { year: 1950, price: 0.06 },
          { year: 1960, price: 0.08 },
          { year: 1970, price: 0.09 },
          { year: 1980, price: 0.12 },
          { year: 1990, price: 0.15 },
          { year: 2000, price: 0.17 },
          { year: 2010, price: 0.21 },
          { year: 2020, price: 0.23 },
          { year: 2023, price: 0.25 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistoricalPrices();
  }, []);

  const calculateEggWorth = (price: number): number => {
    return Math.floor(income / price);
  };

  const chartData = {
    labels: historicalData.map(data => data.year),
    datasets: [
      {
        label: 'Egg Price ($)',
        data: historicalData.map(data => data.price),
        borderColor: 'rgb(149, 94, 66)',
        backgroundColor: 'rgba(149, 94, 66, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Eggs You Could Buy',
        data: historicalData.map(data => calculateEggWorth(data.price)),
        borderColor: 'rgb(255, 195, 0)',
        backgroundColor: 'rgba(255, 195, 0, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Historical Egg Prices & Purchasing Power',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 0) {
              label += `$${context.parsed.y.toFixed(2)}`;
            } else {
              label += `${new Intl.NumberFormat().format(context.parsed.y)} eggs`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Egg Price ($)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Number of Eggs',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto card p-8 text-center">
        <p>Loading historical egg price data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto card">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">
          {error} (using sample data)
        </div>
      )}
      <p className="text-center text-gray-600 mb-6">
        With your current income of ${new Intl.NumberFormat().format(income)}, here&apos;s how many eggs you could buy throughout history:
      </p>
      <div className="h-80 w-full">
        <Line options={chartOptions} data={chartData} />
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <p>* Egg prices are approximate historical averages in the United States</p>
      </div>
    </div>
  );
};

export default HistoricalChart; 