'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { Dispatch, useEffect, useState } from 'react';
import { TasksAction, Task } from '@/types/task';

export function TaskForm({
  task,
  tasks,
  dispatch,
}: {
  task?: Task;
  tasks: Task[];
  dispatch: Dispatch<TasksAction>;
}) {
  const [text, setText] = useState(task?.text || '');
  
  const [done, setDone] = useState(task?.done || false);
  const router = useRouter();

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDone(task.done);
    }
  }, [task]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) {
      toast('Error', {
        description: 'Task text cannot be empty',
      });
      return;
    }

    if (task) {
      // Update existing task
      dispatch({
        type: 'changed',
        task: {
          id: task.id,
          text,
          done,
        },
      });
      toast('Success', {
        description: 'Task text cannot be empty',
      });
    } else {
      // Add new task
      dispatch({
        type: 'added',
        id: Date.now(),
        text,
      });
      toast('Error', {
        description: 'Task text cannot be empty',
      });
    }

    router.push('/todos');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="task-text">Task</Label>
        <Input
          id="task-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
        />
      </div>
      {task && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="task-done"
            checked={done}
            onCheckedChange={(checked) => setDone(Boolean(checked))}
          />
          <Label htmlFor="task-done">Completed</Label>
        </div>
      )}
      <Button type="submit">{task ? 'Update Task' : 'Add Task'}</Button>
    </form>
  );
}