// hooks/useAuthGuard.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

interface AuthGuardOptions {
  requireAuth?: boolean;
}

export function useAuthGuard(options: AuthGuardOptions = { requireAuth: true }) {
  const router = useRouter();
  const token = getAccessToken();
  const isChecking = options.requireAuth ? !token : false;

  useEffect(() => {
    if (options.requireAuth && !token) {
      router.push(CONFIG.ROUTES.LOGIN);
    }
  }, [router, options.requireAuth, token]);

  return { isChecking };
}