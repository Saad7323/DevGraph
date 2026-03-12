import { getUser, getRepos } from "@/services/github";
import RepoCard from "@/components/RepoCard";
import StatCard from "@/components/StatCard";
import LanguageChart from "@/components/LanguageChart";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getUser(username);
  const repos = await getRepos(username);

  // ⭐ TOTAL STARS
  const totalStars = repos.reduce(
    (sum: number, repo: any) => sum + repo.stargazers_count,
    0
  );

  // 📊 LANGUAGE STATS
  const languageStats: Record<string, number> = {};

  repos.forEach((repo: any) => {
    if (repo.language) {
      languageStats[repo.language] =
        (languageStats[repo.language] || 0) + 1;
    }
  });

  // 🔥 TOP REPOSITORIES
  const topRepos = [...repos]
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          DevGraph
        </h1>

        <nav className="space-y-4">

          <div className="text-slate-400 hover:text-white cursor-pointer">
            Dashboard
          </div>

          <div className="text-slate-400 hover:text-white cursor-pointer">
            Repositories
          </div>

          <div className="text-slate-400 hover:text-white cursor-pointer">
            Insights
          </div>

        </nav>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          DevGraph Dashboard
        </h1>

        {/* USER INFO */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-10">

          <h2 className="text-xl font-semibold mb-4">
            {user.name} ({user.login})
          </h2>

          <p className="text-slate-400 mb-6">
            {user.bio}
          </p>

          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-4">

            <StatCard
              label="Repositories"
              value={user.public_repos}
            />

            <StatCard
              label="Followers"
              value={user.followers}
            />

            <StatCard
              label="Following"
              value={user.following}
            />

            <StatCard
              label="Total Stars"
              value={totalStars}
            />

          </div>

        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-2 gap-6 mb-10">

          {/* LANGUAGE CHART */}
          <LanguageChart data={languageStats} />
            
          {/* TOP REPOSITORIES */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

            <h2 className="text-xl font-semibold mb-4">
              Top Repositories
            </h2>

            <div className="space-y-3">

              {topRepos.map((repo: any) => (

                <div
                  key={repo.id}
                  className="flex justify-between text-slate-300"
                >

                  <span>{repo.name}</span>

                  <span>⭐ {repo.stargazers_count}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* REPOSITORY GRID */}
        <div>

          <h2 className="text-2xl font-bold mb-6">
            Repositories
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {repos.map((repo: any) => (

              <RepoCard
                key={repo.id}
                repo={repo}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}