import { useState } from 'react';
import { Plus, X } from 'lucide-react';

function Members({ members, onAdd, onRemove }) {
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onAdd(name);
    setName('');
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Group Members</h2>
      <p className="mt-1 text-sm text-white/60">Add everyone joining the plan.</p>

      <form onSubmit={submit} className="mt-4 flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a name"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none ring-0 placeholder:text-white/40 focus:border-emerald-400/50"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <ul className="mt-4 space-y-2">
        {members.map((m) => (
          <li key={m} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span>{m}</span>
            <button
              onClick={() => onRemove(m)}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
              title="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
