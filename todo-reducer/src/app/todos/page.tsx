'use client';

import { useReducer } from 'react';
import { tasksReducer } from '@/lib/tasksReduces';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';
import { Task } from '@/types/task';

const initialTasks: Task[] = [
  { id: 1, text: 'Izabeuns', done: true },
  { id: 2, text: 'Aliciunns', done: false },
  { id: 3, text: 'Build a todo app', done: false },
];

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Todo List with Reducer</h1>
      <AddTask dispatch={dispatch} />
      <TaskList tasks={tasks} dispatch={dispatch} />
    </div>
  );
}