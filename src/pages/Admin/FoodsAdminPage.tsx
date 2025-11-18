import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/NavbarVerticalAdmin/Navbar';
import styles from './ExercisesAdminPage.module.css'; // reuse same dark theme styles
import { Trash2, PlusCircle } from 'lucide-react';

interface Food {
  id: number;
  name: string;
  calories_intake: number;
}

export default function FoodsAdminPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFood, setNewFood] = useState({ name: '', calories: '' });

  useEffect(() => {
    async function fetchFoods() {
      const res = await fetch('http://localhost:5000/admin/foods');
      const data = await res.json();
      setFoods(data);
    }
    fetchFoods();
  }, []);

  const filteredFoods = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return foods;
    return foods.filter(f => f.name.toLowerCase().includes(q));
  }, [foods, searchTerm]);

  const deleteFood = async (id: number) => {
    if (!confirm('Delete this food?')) return;
    await fetch(`http://localhost:5000/admin/foods/${id}`, { method: 'DELETE' });
    setFoods(prev => prev.filter(f => f.id !== id));
  };

  const addFood = async () => {
    if (!newFood.name || !newFood.calories) return;
    const body = { name: newFood.name, calories_intake: Number(newFood.calories) };
    const res = await fetch('http://localhost:5000/admin/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const created = await res.json();
    setFoods(prev => [...prev, created]);
    setNewFood({ name: '', calories: '' });
  };

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>Admin — Foods</h1>

        <div className={styles.addCard}>
          <h2 className={styles.sectionTitle}>Add Food</h2>
          <div className={styles.formGrid}>
            <input className={styles.input} placeholder="Name" value={newFood.name} onChange={e => setNewFood({ ...newFood, name: e.target.value })} />
            <input className={styles.input} placeholder="Calories" type="number" value={newFood.calories} onChange={e => setNewFood({ ...newFood, calories: e.target.value })} />
          </div>
          <button className={styles.addBtn} onClick={addFood}><PlusCircle className={styles.addIcon} /> Add Food</button>
        </div>

        <div className={styles.searchWrap}>
          <input className={styles.searchInput} placeholder="Search food by name…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className={styles.listWrap}>
          {filteredFoods.map(f => (
            <div key={f.id} className={styles.exerciseCard}>
              <div>
                <h3 className={styles.exerciseName}>{f.name}</h3>
                <p className={styles.exerciseDetails}>{f.calories_intake} kcal</p>
              </div>
              <button className={styles.deleteBtn} onClick={() => deleteFood(f.id)}><Trash2 className={styles.delIcon} /></button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}