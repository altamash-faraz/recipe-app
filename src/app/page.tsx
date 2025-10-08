import RecipeList from '@/components/RecipeList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Recipe App</h1>
          <p className="text-gray-600 mt-2">Discover delicious recipes from around the world</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <RecipeList />
      </main>
      
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500">
            Recipe data provided by TheMealDB API
          </p>
        </div>
      </footer>
    </div>
  );
}
