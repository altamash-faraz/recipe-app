'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

export default function RecipeList() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('vegetarian');

  useEffect(() => {
    fetchMeals();
  }, [searchTerm]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      // First try to get vegetarian category meals
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`);
      let data = await response.json();
      
      // If no vegetarian category, search for vegetarian recipes
      if (!data.meals) {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        data = await response.json();
        // Filter results to only show vegetarian-friendly meals
        const vegetarianKeywords = ['vegetarian', 'veg', 'salad', 'pasta', 'pizza', 'soup', 'rice', 'bean', 'lentil', 'mushroom', 'cheese', 'egg'];
        const filteredMeals = data.meals?.filter((meal: Meal) => 
          vegetarianKeywords.some(keyword => 
            meal.strMeal.toLowerCase().includes(keyword) ||
            meal.strCategory.toLowerCase().includes('vegetarian')
          )
        ) || [];
        setMeals(filteredMeals);
      } else {
        setMeals(data.meals || []);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for healthy recipes..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading healthy recipes...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && meals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-700 font-medium">No healthy recipes found. Try a different search term.</p>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && meals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/recipe/${meal.idMeal}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {meal.strMeal}
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                    {meal.strCategory}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {meal.strArea}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}