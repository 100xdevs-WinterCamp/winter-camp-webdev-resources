import { useAuthStore } from "@/store/useAuthStore";

// src/pages/Profile.tsx
export default function Profile() {

  const user = useAuthStore(state => state.user);

  if (!user) return null;

  return (
    <section className="panel max-w-lg">
      <h1 className="page-title">Your profile</h1>

      <dl className="mt-6 divide-y divide-zinc-800">
        <div className="profile-row">
          <dt>Username</dt>
          <dd>{user.username}</dd>
        </div>

        <div className="profile-row">
          <dt>Email</dt>
          <dd className="break-all">{user.email}</dd>
        </div>
      </dl>
    </section>
  );
}