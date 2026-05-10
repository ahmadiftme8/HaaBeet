import {z} from 'zod';
import * as schema from '@/db/schema';
import {db} from '@/db';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

const  USER_ID = 'user-1'; 

const HabitSchema = z.object({
  title :z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description : z.string().optional().nullable(),
  frequencyType : z.enum(['DAILY', 'WEEKLY', 'CUSTOM']),
  frequencyConfig : z.any().optional(),
});

export async function GET(){

  try{
   const habits = await db.select()
  .from(schema.habits)
  .where(eq( schema.habits.userId , USER_ID))
  return NextResponse.json(habits);
  }
  catch(error){
    console.error(error);
    return NextResponse.json({error: 'Failed to fetch habits'}, {status: 500});
  }
  
}


export async function POST(request: Request){
  try{
    const body = await request.json();
    const parsed = HabitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({error: parsed.error}, {status: 400});
    }
    const {title , description, frequencyType, frequencyConfig} = parsed.data;
const habitData = {
      id: crypto.randomUUID(),
      userId: USER_ID,
      title,
      description : description|| null,
      frequencyType,
      frequencyConfig: frequencyConfig || null,
      
    }
    await db.insert(schema.habits).values(habitData)
    return NextResponse.json(habitData, { status: 201 });
    
  }catch(error){
      console.error(error);
      return NextResponse.json({error: 'Failed to create habit'}, {status: 500});     
    }}
