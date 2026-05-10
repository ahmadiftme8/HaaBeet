'use client'
import { useQuery } from '@tanstack/react-query'

export interface HabitEntry {
    id: string ;
    habitId : string ;
    date: string ;
    completed: boolean ;
    completedAt : string | null ;
}

async function fetchHabitEntries(): Promise<HabitEntry[]>{
    const res = await fetch ('api/habits/entries');
    if(!res.ok){
        throw new Error('oh sorry could not fetch the habit entries')
    }
    return res.json()
}

export default function useHabitEntries(){
    return useQuery<HabitEntry[]>({
        queryKey : ['habitEntries'],
        queryFn : fetchHabitEntries
    })
}