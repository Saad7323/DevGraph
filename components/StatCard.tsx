export default function StatCard({ label, value }: any) {
  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <p className="text-slate-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}