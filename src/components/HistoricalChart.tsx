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
import { useEffect, useRef, useState } from 'react';

import { Line } from 'react-chartjs-2';
import axios from 'axios';

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
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const chartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchHistoricalPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use axios instead of fetch for better error handling
        const response = await axios.get('/api/eggprices');
        
        // Check if the response has the expected data structure
        if (response.data && Array.isArray(response.data.data)) {
          // Sort the data by year to ensure chronological order
          const sortedData = [...response.data.data].sort((a, b) => {
            return Number(a.year) - Number(b.year);
          });
          
          setHistoricalData(sortedData);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Failed to load historical egg price data:', err);
        setError('Failed to load historical egg price data');
        
        // Fallback to sample data if API fails
        setHistoricalData([
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

  const isMobile = windowWidth < 768;

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
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: isMobile ? 'Egg Prices & Purchasing Power' : 'Historical Egg Prices & Purchasing Power',
        font: {
          size: isMobile ? 14 : 16
        }
      },
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          boxWidth: isMobile ? 12 : 40,
          font: {
            size: isMobile ? 10 : 12
          }
        }
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
      x: {
        ticks: {
          maxRotation: isMobile ? 45 : 0,
          font: {
            size: isMobile ? 10 : 12
          },
          // For mobile, show fewer labels to prevent overlap
          callback: function(value, index, values) {
            if (isMobile) {
              // On mobile, only show every other label when there are many years
              return historicalData.length > 6 && index % 2 !== 0 ? null : this.getLabelForValue(Number(value));
            }
            return this.getLabelForValue(Number(value));
          }
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: !isMobile,
          text: 'Egg Price ($)',
          font: {
            size: 12
          }
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: !isMobile,
          text: 'Number of Eggs',
          font: {
            size: 12
          }
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
    },
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto card p-4 sm:p-8 text-center">
        <p>Loading historical egg price data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto card p-3 sm:p-6">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">
          {error} (using sample data)
        </div>
      )}
      <p className="text-center text-gray-600 mb-4 text-sm sm:text-base px-2">
        With your current income of ${new Intl.NumberFormat().format(income)}, here&apos;s how many eggs you could buy throughout history:
      </p>
      <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full px-1">
        <Line ref={chartRef} options={chartOptions} data={chartData} />
      </div>
      <div className="mt-4 text-xs sm:text-sm text-gray-500 px-2">
        <p>* Egg prices are based on historical averages from the U.S. Bureau of Labor Statistics</p>
      </div>
    </div>
  );
};

export default HistoricalChart; 