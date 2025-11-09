import { useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import Members from './components/Members.jsx';
import Expenses from './components/Expenses.jsx';
import Settlement from './components/Settlement.jsx';

function App() {
  const [members, setMembers] = useState(["Alex", "Sam", "Jordan"]);
  const [expenses, setExpenses] = useState([]);

  const addMember = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (members.includes(trimmed)) return;
    setMembers((m) => [...m, trimmed]);
  };

  const removeMember = (name) => {
    setMembers((m) => m.filter((x) => x !== name));
    // Also clean up expenses that reference removed member
    setExpenses((exps) =>
      exps
        .map((e) => ({
          ...e,
          participants: e.participants.filter((p) => p !== name),
        }))
        .filter((e) => e.payer !== name && e.participants.length > 0)
    );
  };

  const addExpense = (expense) => {
    setExpenses((e) => [
      ...e,
      {
        id: crypto.randomUUID(),
        ...expense,
      },
    ]);
  };

  const removeExpense = (id) => {
    setExpenses((e) => e.filter((x) => x.id !== id));
  };

  const { balances, settlements, total } = useMemo(() => {
    const bal = Object.fromEntries(members.map((m) => [m, 0]));
    let sum = 0;

    for (const e of expenses) {
      const amt = Number(e.amount) || 0;
      if (amt <= 0 || !e.payer || e.participants.length === 0) continue;
      sum += amt;
      const share = amt / e.participants.length;
      // Credit payer full amount
      bal[e.payer] = (bal[e.payer] || 0) + amt;
      // Each participant owes their share
      for (const p of e.participants) {
        bal[p] = (bal[p] || 0) - share;
      }
    }

    // Build settlements (greedy)
    const creditors = Object.entries(bal)
      .filter(([, v]) => v > 0.00001)
      .map(([name, v]) => ({ name, amount: v }))
      .sort((a, b) => b.amount - a.amount);

    const debtors = Object.entries(bal)
      .filter(([, v]) => v < -0.00001)
      .map(([name, v]) => ({ name, amount: -v })) // store as positive owed
      .sort((a, b) => b.amount - a.amount);

    const tx = [];
    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const pay = Math.min(debtors[i].amount, creditors[j].amount);
      if (pay > 0) {
        tx.push({ from: debtors[i].name, to: creditors[j].name, amount: pay });
        debtors[i].amount -= pay;
        creditors[j].amount -= pay;
      }
      if (debtors[i].amount <= 0.00001) i++;
      if (creditors[j].amount <= 0.00001) j++;
    }

    return { balances: bal, settlements: tx, total: sum };
  }, [members, expenses]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 -mt-20">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6">
            <Members members={members} onAdd={addMember} onRemove={removeMember} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6 lg:col-span-2">
            <Expenses members={members} onAddExpense={addExpense} expenses={expenses} onRemoveExpense={removeExpense} />
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6">
          <Settlement balances={balances} settlements={settlements} total={total} />
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
        Built for easy, fair group splits. No signup required.
      </footer>
    </div>
  );
}

export default App;
