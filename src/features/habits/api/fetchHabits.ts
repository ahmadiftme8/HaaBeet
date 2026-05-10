
export async function fetchHabits(){
  const res = await fetch('api/habits');
  if (!res.ok) throw new Error ('Failed to fetch habits ,sorry babe');
  return res.json();
}