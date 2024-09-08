"use client";

import useAuthStore from "../../lib/store";

export default function ProtectedPage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1>Welcome, {user}!</h1>
    </div>
  );
}
