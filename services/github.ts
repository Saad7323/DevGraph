export async function getUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export async function getRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }

  return res.json();
}