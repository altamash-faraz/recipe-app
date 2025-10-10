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

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function RecipeList() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [viewMode, setViewMode] = useState<'all' | 'categories' | 'search'>('all');

  useEffect(() => {
    fetchCategories();
    fetchMeals();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      setViewMode('search');
      fetchMeals();
    } else if (selectedCategory) {
      setViewMode('categories');
      fetchMealsByCategory(selectedCategory);
    } else {
      setViewMode('all');
      fetchMeals();
    }
  }, [searchTerm, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
        // When no search term, load recipes from ALL available categories
        const allCategories = [
          'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 
          'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'
        ];
        
        const categoryPromises = allCategories.map(async (category) => {
          try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            // Take first 12 recipes from each category for more variety
            return (data.meals || []).slice(0, 12);
          } catch (error) {
            console.error(`Error fetching ${category} recipes:`, error);
            return [];
          }
        });

        const categoryResults = await Promise.all(categoryPromises);
        allMeals = categoryResults.flat();
        
        // Shuffle for variety and limit to prevent overwhelming display
        allMeals = allMeals.sort(() => Math.random() - 0.5).slice(0, 100);
      }

      setMeals(allMeals);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMealsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error(`Error fetching ${category} recipes:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleShowAll = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setViewMode('all');
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'Beef': '🥩',
      'Chicken': '🍗',
      'Dessert': '🍰',
      'Lamb': '🐑',
      'Miscellaneous': '🍽️',
      'Pasta': '🍝',
      'Pork': '🥓',
      'Seafood': '🦐',
      'Side': '🥗',
      'Starter': '🥙',
      'Vegan': '🌱',
      'Vegetarian': '🥬',
      'Breakfast': '🥞',
      'Goat': '🐐'
    };
    return emojiMap[category] || '🍴';
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500 bg-white"
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

      {/* Category Filter Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
          <button
            onClick={handleShowAll}
            className={`mr-2 mb-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              !selectedCategory && viewMode === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🍽️ All Recipes
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={() => handleCategoryClick(category.strCategory)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.strCategory
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getCategoryEmoji(category.strCategory)} {category.strCategory}
            </button>
          ))}
        </div>
      </div>

      {/* Current View Indicator */}
      <div className="text-center mb-6">
        {viewMode === 'search' && (
          <p className="text-gray-600 font-medium">
            🔍 Search results for "{searchTerm}" ({meals.length} recipes)
          </p>
        )}
        {viewMode === 'categories' && (
          <p className="text-gray-600 font-medium">
            {getCategoryEmoji(selectedCategory)} {selectedCategory} recipes ({meals.length} found)
          </p>
        )}
        {viewMode === 'all' && (
          <p className="text-gray-600 font-medium">
            🍽️ All recipes from various categories ({meals.length} recipes)
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600 font-medium">Loading delicious recipes...</p>
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
            <Link href={`/recipe/${meal.idMeal}`} key={meal.idMeal}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {getCategoryEmoji(meal.strCategory)} {meal.strCategory}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {meal.strMeal}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    🌍 {meal.strArea || 'International'} Cuisine
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}