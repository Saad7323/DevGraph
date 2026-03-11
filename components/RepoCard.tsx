export default function RepoCard({ repo }: any) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition">

      <h3 className="text-lg font-semibold mb-2">
        {repo.name}
      </h3>

      <p className="text-slate-400 text-sm mb-4">
        {repo.description || "No description"}
      </p>

      <div className="flex gap-4 text-sm text-slate-400">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>{repo.language}</span>
      </div>

    </div>
  );
}