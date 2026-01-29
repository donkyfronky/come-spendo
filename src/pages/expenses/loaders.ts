import type { LoaderFunction } from "react-router"

// features/goals/loaders.ts
export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  dueDate: string
}

// Loader for list of goals
export async function expensesLoader(): Promise<Goal[]> {
  console.log('loader expensesLoader')
  return Promise.resolve([])
  // try {
  //   const response = await fetch("/api/goals")
  //   if (!response.ok) throw new Error("Failed to fetch goals")
  //   const data: Goal[] = await response.json()
  //   return data
  // } catch (error) {
  //   console.error(error)
  //   throw new Response("Error fetching goals", { status: 500 })
  // }
}

interface LoaderParams {
  goalId: string;
}
// Loader for single goal by ID
export const expenseLoader: LoaderFunction<LoaderParams> = async ({ params }) => {
  console.log('loader expenseLoader', params)
  return Promise.resolve([])
}
