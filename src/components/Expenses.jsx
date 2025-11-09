import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

function Expenses({ members, onAddExpense, expenses, onRemoveExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [participants, setParticipants] = useState([]);

  const valid = useMemo(() => {
    const a = parseFloat(amount);
    return title.trim() && !Number.isNaN(a) && a > 0 && payer && participants.length > 0;
  }, [title, amount, payer, participants]);

  const toggleParticipant = (name) => {
    setParticipants((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onAddExpense({ title: title.trim(), amount: parseFloat(amount), payer, participants });
    setTitle('');
    setAmount('');
    setPayer('');
    setParticipants([]);
  };

  const total = useMemo(() => expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0), [expenses]);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="mt-1 text-sm text-white/60">Log what was paid and who benefited.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80">Total: ${total.toFixed(2)}</div>
      </div>

      <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What for? (e.g., Dinner)"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-emerald-400/50"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          min="0"
          step="0.01"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/40 focus:border-emerald-400/50"
        />
        <select
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-emerald-400/50"
        >
          <option value="" disabled>
            Paid by
          </option>
          {members.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add Expense
        </button>

        <div className="sm:col-span-2 lg:col-span-4 mt-1">
          <p className="text-xs text-white/60 mb-2">Who participated?</p>
          <div className="flex flex-wrap gap-2">
            {members.map((m) => {
              const active = participants.includes(m);
              return (
                <button
                  type="button"
                  key={m}
                  onClick={() => toggleParticipant(m)}
                  className={`rounded-xl border px-3 py-1.5 text-sm transition ${
                    active
                      ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200'
                      : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
      </form>

      <ul className="mt-6 space-y-2">
        {expenses.length === 0 && (
          <li className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
            No expenses yet. Add your first one above.
          </li>
        )}
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div>
              <p className="font-medium">{e.title} • ${e.amount.toFixed(2)}</p>
              <p className="text-xs text-white/60">
                Paid by {e.payer} • Split among {e.participants.join(', ')}
              </p>
            </div>
            <button
              onClick={() => onRemoveExpense(e.id)}
              className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              title="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
