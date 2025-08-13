import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-[#EFEFEF] container mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-20 rounded">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Stay in the Loop</h2>
        <p className="mt-4 text-lg text-gray-600">
          Subscribe to our newsletter and never miss new hobby groups, events, or community updates.
        </p>

        <form className="mt-8 sm:flex sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-2 w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition cursor-pointer"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
