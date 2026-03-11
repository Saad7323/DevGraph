async function getUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

async function getRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }

  return res.json();
}

export default async function Dashboard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getUser(username);
  const repos = await getRepos(username);

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

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400">Repositories</p>
              <p className="text-2xl font-bold">{user.public_repos}</p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400">Followers</p>
              <p className="text-2xl font-bold">{user.followers}</p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-slate-400">Following</p>
              <p className="text-2xl font-bold">{user.following}</p>
            </div>

          </div>

        </div>

        {/* REPOSITORIES */}
        <div>

          <h2 className="text-2xl font-bold mb-6">
            Repositories
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {repos.map((repo: any) => (

              <div
                key={repo.id}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition"
              >

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

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}