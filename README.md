# 🍽️ Recipe App

> Discover delicious recipes from around the world with our modern, responsive web application.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## ✨ Features

- 🔍 **Smart Search** - Find recipes by name with real-time filtering
- 📖 **Detailed Recipes** - Complete ingredients, instructions, and cooking tips
- 🎬 **Video Integration** - Watch cooking videos directly from YouTube
- ⚡ **Lightning Fast** - Powered by Next.js with optimized performance
- 🌍 **Multiple Cuisines** - Recipes from various categories and cuisines

## 🚀 Live Demo

**[👉 Visit the Live App](https://recipe-app-steel-omega.vercel.app/)**

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API**: TheMealDB (Free recipe database)
- **Deployment**: Vercel
- **Icons**: Emoji-based design

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & Tailwind
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   └── recipe/
│       └── [id]/
│           └── page.tsx     # Dynamic recipe detail page
├── components/
│   └── RecipeList.tsx       # Main recipe listing component
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/altamash-faraz/recipe-app.git

# Navigate to project directory
cd recipe-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🌍 API Information

This app uses [TheMealDB API](https://www.themealdb.com/api.php) - a free, open recipe database.

- ✅ No API key required
- ✅ Rate limit friendly
- ✅ High quality recipe data
- ✅ Community driven

## 🚀 Deployment

The app is deployed on Vercel for optimal performance and reliability.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/altamash-faraz/recipe-app)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Future Enhancements

- [ ] Favorites system
- [ ] Meal planning
- [ ] Shopping list generation
- [ ] User profiles
- [ ] Advanced filters (cuisine, diet type, cooking time)
- [ ] Nutritional information

---

**Made with ❤️ for food lovers everywhere**

*Happy Cooking! 👨‍🍳👩‍🍳*
