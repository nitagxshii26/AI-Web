import React from 'react';

export const AiFeatureSection: React.FC = () => (
  <section id='ai-features' className='py-6 md:py-12 bg-gradient-to-br from-blue-50 to-cyan-100'>
    <div className='max-w-3xl mx-auto px-4 md:px-0'>
      <h2 className='text-3xl font-semibold text-gray-900 mb-4'>AI Enhancements</h2>
      <p className='text-lg text-gray-700 mb-8'>
        Power your app with cutting‑edge AI‑driven features—faster insights, smarter UI, & more automation.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <article className='bg-white shadow-sm rounded-lg p-6 transition hover:shadow-lg'>
          <div className='flex items-center space-x-3'>
            <svg className='h-6 w-6 text-indigo-600' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M17 8l-5 5-5-5h10z'></path>
            </svg>
            <h3 className='text-xl font-medium text-gray-800'>Real‑time Analytics</h3>
          </div>
          <p className='text-sm text-gray-600 mt-3'>Instant insights that help you act before the data even reaches you.</p>
          <a href='/docs/analytics' className='mt-4 inline-block text-indigo-600 hover:text-indigo-800'>Learn more →</a>
        </article>
        <article className='bg-white shadow-sm rounded-lg p-6 transition hover:shadow-lg'>
          <div className='flex items-center space-x-3'>
            <svg className='h-6 w-6 text-indigo-600' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 6v9l5 2'></path>
            </svg>
            <h3 className='text-xl font-medium text-gray-800'>Predictive Modelling</h3>
          </div>
          <p className='text-sm text-gray-600 mt-3'>Forecast future outcomes—say, where to invest resources next.</p>
          <a href='/docs/prediction' className='mt-4 inline-block text-indigo-600 hover:text-indigo-800'>Learn more →</a>
        </article>
      </div>
    </div>
  </section>
);
