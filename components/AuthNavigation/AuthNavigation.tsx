"use client";

import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AuthNavigation = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const clearAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    clearAuthenticated();
    router.replace("/");
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleLogout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>Email</p>
            <button
              onClick={() => mutation.mutate()}
              className={css.logoutButton}
            >
              Logout
            </button>
          </li>
        </>
      )}
      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href={`/sign-in`}
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href={`/sign-up`}
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
