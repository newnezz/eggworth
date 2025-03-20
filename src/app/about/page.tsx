'use client';

import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-egg-primary mb-8">About EggWorth</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-egg-primary mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              EggWorth was created to provide a fun and intuitive way to understand wealth and financial value. 
              By converting monetary values into something tangible like eggs, we can better grasp the scale of 
              different financial figures.
            </p>
            <p className="text-lg text-gray-600">
              Our goal is to make financial concepts more accessible and engaging for everyone, from students 
              learning about economics to anyone curious about how their income compares to the wealthy.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-egg-primary mb-4">Why Eggs?</h2>
            <p className="text-lg text-gray-600 mb-4">
              Eggs are a nearly universal food item that most people buy regularly. They're relatively consistent 
              in size and quality, making them an interesting unit of measurement. Additionally:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Eggs have been consumed by humans for thousands of years</li>
              <li>Egg prices are tracked historically and vary with inflation</li>
              <li>Unlike currency, eggs represent a physical item of actual value</li>
              <li>Everyone can visualize what an egg looks like - making large numbers more comprehensible</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-egg-primary mb-4">How We Calculate Egg Worth</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our calculation is simple: we divide a monetary value by the current average price of a single egg.
            </p>
            <div className="bg-egg-shell p-6 rounded-lg">
              <code className="text-lg">
                Egg Worth = Money Value ÷ Egg Price
              </code>
              <p className="mt-4 text-gray-600">
                For example, if your annual income is $50,000 and an egg costs $0.25, your egg worth would be:
              </p>
              <p className="mt-2 font-semibold">
                $50,000 ÷ $0.25 = 200,000 eggs
              </p>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-egg-primary mb-4">About Egg Prices</h2>
            <p className="text-lg text-gray-600 mb-4">
              Egg prices vary based on location, quality, and market conditions. For our calculations, we use
              an average price of $0.25 per egg, which approximates the U.S. national average for conventional eggs
              when purchased by the dozen.
            </p>
            <p className="text-lg text-gray-600">
              Actual egg prices may differ based on your location, the time of year, and whether you're purchasing
              organic, free-range, or other specialty eggs.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-egg-primary mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-4">
              Have suggestions, comments, or questions? We'd love to hear from you!
            </p>
            <p className="text-lg text-gray-600">
              Email us at: <a href="mailto:info@eggworth.com" className="text-egg-yolk hover:underline">info@eggworth.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 