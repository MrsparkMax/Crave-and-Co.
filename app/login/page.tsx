"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeIcon } from "lucide-react";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentYear] = useState<number | null>(null);

  useEffect(() => {
    (new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken);
      router.push(CONFIG.ROUTES.DASHBOARD);
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-50 to-amber-50/40 flex flex-col justify-between p-6 text-stone-800">
      
      {/* Top Bar Navigation - Home Icon on Top Left */}
      <header className="w-full flex items-center justify-start">
        <Link href="/">
          <Button variant="ghost" size="icon" title="Home Page" className="hover:bg-stone-200/60 text-stone-700">
            <HomeIcon className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-md space-y-6">
          
          {/* Brand Heading */}
          <div className="text-center space-y-1.5">
            <h1 className="text-4xl font-serif font-bold tracking-wider text-stone-900">Crave & Co.</h1>
            <p className="text-xs font-serif italic text-stone-600 tracking-wide">
              Simple, catchy, and focuses on satisfying everyday cravings.
            </p>
          </div>

          {/* Card Form */}
          <Card className="border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 pb-4 text-center">
              <CardTitle className="text-2xl font-serif text-stone-900">Login</CardTitle>
              <CardDescription className="text-xs text-stone-500">
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 text-xs bg-rose-50 text-rose-800 border border-rose-200 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xs font-medium text-stone-700">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-stone-300 focus:border-stone-900 focus:ring-stone-900 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-medium text-stone-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-stone-300 focus:border-stone-900 focus:ring-stone-900 bg-white"
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium shadow transition-colors"
                >
                  {loading ? "Signing in..." : "Login"}
                </Button>

                <p className="text-xs text-center text-stone-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-700">
                    Register
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-stone-500">
        <p>&copy; {currentYear || "2026"} Crave & Co. All rights reserved.</p>
      </footer>
    </div>
  );
}