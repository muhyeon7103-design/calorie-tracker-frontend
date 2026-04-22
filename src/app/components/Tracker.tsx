import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Meal {
  id: number;
  name: string;
  calories: number;
  time: string;
}

export default function Tracker() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [goalCalories] = useState(2000);
  const navigate = useNavigate();

  const eatenCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const remainingCalories = goalCalories - eatenCalories;

  const addFood = (name: string, cals: number) => {
    if (!name || cals <= 0) return;

    const newMeal: Meal = {
      id: Date.now(),
      name,
      calories: cals,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMeals([...meals, newMeal]);
    setFoodName('');
    setCalories('');
  };

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    const cals = parseInt(calories);
    if (foodName && !isNaN(cals)) {
      addFood(foodName, cals);
    }
  };

  const removeMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-center text-gray-800">Daily Calorie Tracker</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm border border-gray-200"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Goal Calories</div>
            <div className="text-3xl text-blue-600">{goalCalories}</div>
            <div className="text-xs text-gray-400 mt-1">kcal</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Eaten Calories</div>
            <div className="text-3xl text-orange-600">{eatenCalories}</div>
            <div className="text-xs text-gray-400 mt-1">kcal</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Remaining Calories</div>
            <div className={`text-3xl ${remainingCalories >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {remainingCalories}
            </div>
            <div className="text-xs text-gray-400 mt-1">kcal</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Daily Progress</span>
            <span className="text-sm text-gray-600">{Math.round((eatenCalories / goalCalories) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                eatenCalories > goalCalories ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((eatenCalories / goalCalories) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg text-gray-800 mb-4">Add Food</h2>
          <form onSubmit={handleAddFood} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors shadow-sm"
            >
              Add Food
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg text-gray-800 mb-4">Quick Add</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => addFood('Apple', 95)}
              className="px-6 py-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 rounded-xl transition-all shadow-sm"
            >
              🍎 Add Apple (95 kcal)
            </button>
            <button
              onClick={() => addFood('Banana', 200)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-yellow-700 rounded-xl transition-all shadow-sm"
            >
              🍌 Add Banana (200 kcal)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg text-gray-800 mb-4">Today's Meals</h2>
          {meals.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No meals added yet. Start tracking your calories!
            </div>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-1">
                    <div className="text-gray-800">{meal.name}</div>
                    <div className="text-sm text-gray-500">{meal.time}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-800">{meal.calories} kcal</div>
                    <button
                      onClick={() => removeMeal(meal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove meal"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
