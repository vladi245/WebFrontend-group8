import React, { useState, useMemo } from 'react';
import Navbar from '../../components/NavbarVertical/Navbar';
import styles from './FoodsAdminPage.module.css';
import { Trash2, PlusCircle } from 'lucide-react';

interface Food {
  id: number;
  name: string;
  calories_intake: number;
  created_at: string;
}

export default function FoodsAdminPage() {
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: 'Chicken Breast', calories_intake: 165, created_at: '2025-01-01' },
    { id: 2, name: 'Apple', calories_intake: 95, created_at: '2025-01-02' },
    { id: 3, name: 'Avocado', calories_intake: 240, created_at: '2025-01-03' },
    { id: 4, name: 'Rice (100g)', calories_intake: 130, created_at: '2025-01-04' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newFood, setNewFood] = useState({ name: '', calories_intake: '' });

  const filteredFoods = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return foods;
    return foods.filter(f => f.name.toLowerCase().includes(q));
  }, [foods, searchTerm]);

  const deleteFood = (id: number) => {
    if (confirm('Delete this food?')) {
      setFoods(prev => prev.filter(f => f.id !== id));
    }
  };

  const addFood = () => {
    if (!newFood.name || !newFood.calories_intake) return;

    const newItem: Food = {
      id: Date.now(),
      name: newFood.name,
      calories_intake: Number(newFood.calories_intake),
      created_at: new Date().toISOString()
    };

    setFoods(prev => [...prev, newItem]);
    setNewFood({ name: '', calories_intake: '' });
  };

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <h1 className={styles.title}>Admin — Foods</h1>

        {/* Add Food Card */}
        <div className={styles.addCard}>
          <h2 className={styles.sectionTitle}>Add Food</h2>

          <div className={styles.formGrid}>
            <input
              className={styles.input}
              placeholder="Food name"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            />

            <input
              className={styles.input}
              placeholder="Calories intake"
              type="number"
              value={newFood.calories_intake}
              onChange={(e) => setNewFood({ ...newFood, calories_intake: e.target.value })}
            />
          </div>

          <button className={styles.addBtn} onClick={addFood}>
            <PlusCircle className={styles.addIcon} /> Add Food
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder="Search foods by name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Food List */}
        <div className={styles.listWrap}>
          {filteredFoods.length === 0 ? (
            <p className={styles.noResults}>No foods found.</p>
          ) : (
            filteredFoods.map(food => (
              <div key={food.id} className={styles.foodCard}>
                <div>
                  <h3 className={styles.foodName}>{food.name}</h3>
                  <p className={styles.foodDetails}>{food.calories_intake} calories</p>
                  <p className={styles.timestamp}>Added: {new Date(food.created_at).toLocaleDateString()}</p>
                </div>

                <button className={styles.deleteBtn} onClick={() => deleteFood(food.id)}>
                  <Trash2 className={styles.delIcon} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
