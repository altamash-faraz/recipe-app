'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export default function RecipeDetail() {
  const params = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchMealDetail(params.id as string);
    }
  }, [params.id]);

  const fetchMealDetail = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals?.[0] || null);
    } catch (error) {
      console.error('Error fetching meal detail:', error);
      setMeal(null);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (meal: MealDetail) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || ''
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 mb-4 font-medium">Recipe not found.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/')}
            className="text-green-600 hover:text-green-700 mb-2 font-medium"
          >
            ← Back to recipes
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{meal.strMeal}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image and Basic Info */}
          <div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Recipe Info</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Category:</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {meal.strCategory}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Cuisine:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {meal.strArea}
                  </span>
                </div>
                {meal.strTags && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Tags:</span>
                    <span className="text-gray-700 text-sm font-medium">{meal.strTags}</span>
                  </div>
                )}
              </div>
              
              {meal.strYoutube && (
                <div className="mt-4">
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
                  >
                    📺 Watch on YouTube
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Ingredients and Instructions */}
          <div className="space-y-6">
            {/* Ingredients */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-900">🥗 Ingredients</h2>
              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-semibold text-gray-800">{item.ingredient}</span>
                    <span className="text-gray-700 font-medium">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-900">👩‍🍳 Instructions</h2>
              <div className="prose prose-sm max-w-none">
                {meal.strInstructions.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-gray-800 leading-relaxed font-medium">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}