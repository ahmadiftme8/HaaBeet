'use client';

import { useEffect, useState } from 'react';

interface Habit {
  id: string;
  title: string;
  description: string | null;
  frequencyType: string;
  frequencyConfig: any;
  isTemplate: boolean;
  isPublic: boolean;
  userId: string;
  createdAt: string;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/habits')
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { habits, loading, error };
}