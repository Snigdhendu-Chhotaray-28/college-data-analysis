import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/client';

export interface TodoItem {
  id: string | number;
  name?: string;
  title?: string;
  [key: string]: any;
}

export const SupabaseTodos: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('todos').select('*');
        if (error) {
          setError(error.message);
        } else {
          setTodos(data || []);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Loading Supabase records...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
        <p className="font-semibold">Supabase Notice:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200">
      <h3 className="text-base font-semibold text-slate-800 mb-3">Supabase Records (todos)</h3>
      {todos.length === 0 ? (
        <p className="text-sm text-slate-500">No records found in table 'todos'.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-2 bg-slate-50 rounded border border-slate-100 text-sm text-slate-700"
            >
              {todo.name || todo.title || JSON.stringify(todo)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
