'use client';

import { useRouter } from 'next/navigation';
import { useReducer } from 'react';
import React from 'react';
import { TaskForm } from '@/components/TaskForm';
import { tasksReducer } from '@/lib/tasksReduces';
import { Task } from '@/types/task';

const initialTasks: Task[] = [
  { id: 1, text: 'Learn React', done: true },
  { id: 2, text: 'Learn Next.js', done: false },
  { id: 3, text: 'Build a todo app', done: false },
];

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const { id } = React.use(params);

  const task = id !== 'new'
    ? tasks.find((t) => t.id === Number(id))
    : undefined;

  React.useEffect(() => {
    if (id !== 'new' && !task) {
      router.push('/todos');
    }
  }, [id, task, router]);

  if (id !== 'new' && !task) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">
        {task ? 'Edit Task' : 'Add New Task'}
      </h1>
      <TaskForm task={task} tasks={tasks} dispatch={dispatch} />
    </div>
  );
}