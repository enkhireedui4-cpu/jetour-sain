"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F6] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border border-[#E7E7EA] shadow-lg p-8"
      >
        <h1 className="text-2xl font-extrabold text-[#17181B] mb-1">Админ нэвтрэх</h1>
        <p className="text-sm text-[#6B7280] mb-6">JETOUR Mongolia удирдлагын самбар</p>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Нэвтрэх нэр</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-lg border border-[#E7E7EA] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E20A17]/30"
          />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Нууц үг</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-[#E7E7EA] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E20A17]/30"
          />
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#17181B] hover:bg-[#E20A17] transition-colors text-white font-bold rounded-lg py-2.5 text-sm disabled:opacity-60"
        >
          {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
