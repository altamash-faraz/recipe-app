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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMeals();
  }, [searchTerm]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      let allMeals: Meal[] = [];

      if (searchTerm.trim()) {
        // Search for specific recipes when user types something
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        allMeals = data.meals || [];
      } else {
        // When no search term, load recipes from multiple popular categories
        const categories = ['Chicken', 'Seafood', 'Vegetarian', 'Dessert', 'Pasta', 'Beef', 'Breakfast', 'Side'];
        
        const categoryPromises = categories.map(async (category) => {
          try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            // Take first 8 recipes from each category to have variety
            return (data.meals || []).slice(0, 8);
          } catch (error) {
            console.error(`Error fetching ${category} recipes:`, error);
            return [];
          }
        });

        const categoryResults = await Promise.all(categoryPromises);
        // Flatten all results and shuffle them for variety
        allMeals = categoryResults.flat();
        
        // Shuffle the array to mix different categories
        allMeals = allMeals.sort(() => Math.random() - 0.5);
        
        // Limit to 32 recipes for better performance
        allMeals = allMeals.slice(0, 32);
      }

      setMeals(allMeals);
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
              placeholder="Search for any recipe... (chicken, pasta, dessert, etc.)"
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
          <p className="mt-4 text-gray-700 font-medium">Loading delicious recipes...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && meals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-700 font-medium">No recipes found. Try searching for chicken, pasta, or dessert.</p>
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