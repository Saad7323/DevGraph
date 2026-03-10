"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleAnalyze = () => {
    if (!username) return;
    router.push(`/dashboard/${username}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold text-center mb-2">
          DevGraph
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Analyze any developer's GitHub profile
        </p>

        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Analyze Developer
        </button>

      </div>

    </main>
  );
}