import React, { useEffect, useState } from "react";
import { getSupabase } from "../../modules/dashboard/supabaseClient";
import {
  ErrorText,
  GhostButton,
  LockCard,
  LockInput,
  LockScreenWrap,
  LockSubtitle,
  LockTitle,
  PrimaryButton
} from "./styles";

interface Props {
  children: React.ReactNode;
}

export const AuthGate = ({ children }: Props) => {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!checked) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const supabase = getSupabase();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      setPassword("");
    }
  };

  if (!loggedIn) {
    return (
      <LockScreenWrap>
        <LockCard onSubmit={submit}>
          <LockTitle>Dashboard</LockTitle>
          <LockSubtitle>Sign in to continue</LockSubtitle>
          <LockInput
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <LockInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <ErrorText>{error}</ErrorText>}
          <PrimaryButton type="submit" disabled={submitting || !email || !password} style={{ width: "100%" }}>
            {submitting ? "Signing in..." : "Sign in"}
          </PrimaryButton>
        </LockCard>
      </LockScreenWrap>
    );
  }

  return <>{children}</>;
};

export const SignOutButton = () => {
  const signOut = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
  };
  return (
    <GhostButton type="button" onClick={signOut}>
      Sign out
    </GhostButton>
  );
};
