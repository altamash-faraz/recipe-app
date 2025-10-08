import RecipeList from '@/components/RecipeList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-2 border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">🌱 Vegetarian Recipe App</h1>
          <p className="text-gray-700 mt-2 font-medium">Discover delicious vegetarian recipes from around the world</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <RecipeList />
      </main>
      
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 font-medium">
            🌿 Vegetarian recipe data provided by TheMealDB API
          </p>
        </div>
      </footer>
    </div>
  );
}
