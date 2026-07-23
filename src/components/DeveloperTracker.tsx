import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Plus, Loader2, User, Calendar, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  owner: string;
  dueDate: string;
  status: 'Todo' | 'In Progress' | 'Done';
}

export const DeveloperTracker: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskOwner, setNewTaskOwner] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_PAT}`,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      
      const mappedTasks = data.records.map((record: any) => ({
        id: record.id,
        name: record.fields['Name'] || 'Untitled',
        owner: record.fields['Owner'] || 'Unassigned',
        dueDate: record.fields['Due Date'] || '',
        status: record.fields['Status'] || 'Todo',
      }));
      setTasks(mappedTasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim() || !newTaskOwner.trim()) return;
    
    setIsAdding(true);
    try {
      const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                "Name": newTaskName,
                "Owner": newTaskOwner,
                "Status": "Todo"
              }
            }
          ]
        })
      });

      if (!response.ok) throw new Error('Failed to add task');
      await fetchTasks();
      setNewTaskName('');
      setNewTaskOwner('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Todo' ? 'In Progress' : currentStatus === 'In Progress' ? 'Done' : 'Todo';
    try {
      await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            "Status": nextStatus
          }
        })
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'In Progress': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            App Development Tracker
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage tasks for beginners at Linacre.site</p>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input 
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="New task..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
        <input 
          type="text"
          value={newTaskOwner}
          onChange={(e) => setNewTaskOwner(e.target.value)}
          placeholder="Owner name"
          className="w-32 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
        <button 
          type="submit"
          disabled={isAdding}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm disabled:opacity-50 transition-colors"
        >
          {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Task
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-slate-500 py-4 text-sm">No tasks found. Add one to get started!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-2xl transition-colors">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-200">{task.name}</h4>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <User className="w-3 h-3" /> {task.owner}
                    </span>
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" /> {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleUpdateStatus(task.id, task.status)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${getStatusColor(task.status)}`}
                >
                  {task.status}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
