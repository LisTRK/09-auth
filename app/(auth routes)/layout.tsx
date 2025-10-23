"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const router = useRouter();
  useEffect(() => {
    clearIsAuthenticated();
    router.refresh();
    setLoading(false);
  }, [clearIsAuthenticated, router]);

  return (
    <>
      {loading ? (
        <div>
          <FadeLoader />
          Loading...
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PublicLayout;
