import RecipeList from '@/components/RecipeList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              🍽️ Recipe App
            </h1>
            <p className="text-green-100 text-lg md:text-xl font-medium max-w-3xl mx-auto mb-6 leading-relaxed">
              Discover delicious recipes from around the world - from appetizers to desserts!
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all cursor-default">
                🍗 Chicken
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all cursor-default">
                🍝 Pasta
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all cursor-default">
                🍰 Desserts
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all cursor-default">
                🥗 Healthy
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <RecipeList />
      </main>
      
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 font-medium">
            🍽️ Recipe data provided by TheMealDB API • v1.1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
