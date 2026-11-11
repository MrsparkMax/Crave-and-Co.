"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils, Coffee, Cake, ShoppingBag } from "lucide-react";

export default function HomePage() {
  const [currentYear] = useState<number | null>(null);

  useEffect(() => {
    (new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-50 to-amber-50/40 flex flex-col justify-between text-stone-800">
      {/* Navbar */}
      <header className="border-b border-stone-200/80 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-serif font-bold tracking-wider text-stone-900">Crave & Co.</h1>
        </div>
        <div className="flex space-x-3">
          <Link href="/login">
            <Button variant="outline" size="sm" className="border-stone-300 hover:bg-stone-100 text-stone-700">
              Login
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-stone-900 hover:bg-stone-800 text-stone-50">
              Order Now
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8">
        <div className="space-y-4">
          <span className="px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-900 rounded-full uppercase tracking-wider">
            Welcome to Crave & Co.
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-stone-900">
            Savory Bites, Refreshing Sips, & Sweet Treats
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-serif italic">
            Simple, catchy, and focuses on satisfying everyday cravings.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <Link href="/login">
            <Button size="lg" className="px-8 font-medium bg-stone-900 hover:bg-stone-800 text-stone-50 shadow-lg">
              <ShoppingBag className="w-5 h-5 mr-2" /> Explore Menu & Order
            </Button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid gap-6 sm:grid-cols-3 pt-12">
          <div className="p-6 rounded-xl border border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-md space-y-2">
            {/* Black Circular Background for the Icon */}
            <div className="w-12 h-12 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center mx-auto shadow-md transition-transform hover:scale-105">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Hearty Food</h3>
            <p className="text-xs text-stone-500">Juicy burgers, crispy chicken, rice meals, and wood-fired pizzas.</p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-md space-y-2">
            {/* Black Circular Background for the Icon */}
            <div className="w-12 h-12 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center mx-auto shadow-md transition-transform hover:scale-105">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Refreshing Drinks</h3>
            <p className="text-xs text-stone-500">Milk teas, iced lattes, fresh fruit shakes, and zesty lemonades.</p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-md space-y-2">
            {/* Black Circular Background for the Icon */}
            <div className="w-12 h-12 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center mx-auto shadow-md transition-transform hover:scale-105">
              <Cake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Decadent Desserts</h3>
            <p className="text-xs text-stone-500">Molten lava cakes, mango graham treats, and creamy local flans.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        <p>&copy; {currentYear || "2026"} Crave & Co. All rights reserved.</p>
      </footer>
    </div>
  );
}