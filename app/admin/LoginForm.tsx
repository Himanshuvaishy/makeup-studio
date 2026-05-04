export default function LoginForm({ error }: { error?: string }) {
  return (
    <form
      action="/api/login"
      method="post"
      className="space-y-4 rounded-2xl border border-brand-soft/70 bg-white p-6 shadow-sm"
    >
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-foreground/55">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="mt-1 w-full rounded-md border border-brand-soft bg-white px-3 py-2 text-foreground outline-none focus:border-brand"
        />
      </label>

      {error ? (
        <p className="text-sm text-red-600">Wrong password. Please try again.</p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand/90"
      >
        Sign in
      </button>
    </form>
  );
}
