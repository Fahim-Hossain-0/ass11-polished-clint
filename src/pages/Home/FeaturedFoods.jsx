import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FoodCard from '../../components/FoodCard';
import Loading from '../../components/Loading';
import { Link } from 'react-router'; // ✅ fix this import

const fetchFoods = async () => {
  const res = await axios.get('https://food-hub-server-green.vercel.app/foods');
  return res.data;
};

const FeaturedFoods = () => {
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ['foods'],
    queryFn: fetchFoods,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Something went wrong loading foods.</p>;

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-5xl text-center lg:text-left font-bold mt-22 text-blue-900">All Available Food</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {foods.slice(0, 6).map(food => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/availableFoods"
          className="text-lg btn bg-blue-600 text-white hover:bg-gray-200 hover:text-blue-700 w-1/4 text-center"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
