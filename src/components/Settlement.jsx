import { useMemo } from 'react';

function Settlement({ balances, settlements, total }) {
  const summary = useMemo(() => {
    const credit = Object.values(balances || {}).filter((v) => v > 0).reduce((a, b) => a + b, 0);
    const debt = Object.values(balances || {}).filter((v) => v < 0).reduce((a, b) => a + b, 0);
    return { credit, debt };
  }, [balances]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Settlement</h2>
          <p className="mt-1 text-sm text-white/60">Minimal payments to settle up fairly.</p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">Total Spent: ${total.toFixed(2)}</span>
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-emerald-300">Net = {(summary.credit + summary.debt).toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-medium">Balances</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {Object.entries(balances).map(([name, value]) => (
              <li key={name} className="flex items-center justify-between">
                <span className="text-white/80">{name}</span>
                <span className={value >= 0 ? 'text-emerald-300' : 'text-rose-300'}>
                  {value >= 0 ? '+' : ''}${value.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-medium">Who pays whom</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {settlements.length === 0 && (
              <li className="text-white/60">You're all settled up. 🎉</li>
            )}
            {settlements.map((s, idx) => (
              <li key={idx} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2">
                <span>
                  <span className="font-medium">{s.from}</span> → <span className="font-medium">{s.to}</span>
                </span>
                <span className="text-emerald-300">${s.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Settlement;
