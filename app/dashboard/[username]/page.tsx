async function getUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export default async function Dashboard({ params }: { params: Promise<{ username: string }> }) {

  const { username } = await params;

  const user = await getUser(username);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        DevGraph Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          {user.name} ({user.login})
        </h2>

        <p className="text-gray-600 mb-4">
          {user.bio}
        </p>

        <div className="grid grid-cols-3 gap-4">

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Repositories</p>
            <p className="text-2xl font-bold">{user.public_repos}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Followers</p>
            <p className="text-2xl font-bold">{user.followers}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Following</p>
            <p className="text-2xl font-bold">{user.following}</p>
          </div>

        </div>

      </div>

    </div>
  );
}