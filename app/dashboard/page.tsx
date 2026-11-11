"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeTokens, getAccessToken } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCartIcon, HomeIcon, CheckCircle2Icon } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: "Food" | "Drinks" | "Dessert";
}

interface DecodedToken {
  username?: string;
  sub?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  
  const [username, setUsername] = useState<string>("User");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Food" | "Drinks" | "Dessert">("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const paymentMethod = "Cash on Delivery"; // Fixed to Cash on Delivery

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace(CONFIG.ROUTES.LOGIN);
      return;
    }

    queueMicrotask(() => setIsChecking(false));

    // Safe Token Validation & Decoding
    try {
      if (token.split('.').length === 3) {
        const decoded = jwtDecode<DecodedToken>(token);
        const tokenUsername = decoded.username || decoded.sub;
        if (tokenUsername) {
          queueMicrotask(() => setUsername(tokenUsername));
        }
      } else {
        throw new Error("Invalid token structure");
      }
    } catch (e) {
      console.error("Token decode error, clearing invalid token:", e);
      removeTokens();
      router.replace(CONFIG.ROUTES.LOGIN);
      return;
    }

    // Fetch menu items from your backend /menu-items endpoint
    async function fetchMenu() {
      try {
        const data = await apiClient<MenuItem[]>("/menu-items", { requiresAuth: true });
        setMenuItems(data);
      } catch {
        // Fallback menu items categorized into Food, Drinks, and Dessert
        setMenuItems([
          // --- Food Items ---
          { 
            id: 1, 
            name: "Classic Cheeseburger", 
            price: 149.00, 
            description: "Juicy beef patty with melted cheese and fresh greens",
            image: "/images/Classic Cheeseburger.jpg",
            category: "Food"
          },
          { 
            id: 2, 
            name: "Crispy Fried Chicken", 
            price: 199.00, 
            description: "Golden brown crispy chicken served with rich gravy",
            image: "/images/Crispy Fried Chicken.jpg",
            category: "Food"
          },
          { 
            id: 3, 
            name: "Bacon & Mushroom Carbonara", 
            price: 175.00, 
            description: "Creamy pasta loaded with crispy bacon and mushrooms",
            image: "/images/Bacon & Mushroom Carbonara.jpg",
            category: "Food"
          },
          { 
            id: 4, 
            name: "Spicy Pepperoni Pizza", 
            price: 299.00, 
            description: "Hand-tossed crust topped with spicy pepperoni and mozzarella",
            image: "/images/Spicy Pepperoni Pizza.jpg",
            category: "Food"
          },
          { 
            id: 5, 
            name: "Beef Tapa Rice Meal", 
            price: 160.00, 
            description: "Savory cured beef served with garlic fried rice and egg",
            image: "/images/Beef Tapa Rice Meal.jpg",
            category: "Food"
          },
          { 
            id: 6, 
            name: "Pork Sisig Rice", 
            price: 155.00, 
            description: "Sizzling chopped pork with onions, chili, and egg over rice",
            image: "/images/Pork Sisig.jpg",
            category: "Food"
          },
          { 
            id: 7, 
            name: "Loaded French Fries", 
            price: 95.00, 
            description: "Crispy fries drizzled with cheese sauce and bacon bits",
            image: "/images/Loaded French Fries.jpg",
            category: "Food"
          },
          { 
            id: 8, 
            name: "Hawaiian Barbecue Wings (6pcs)", 
            price: 210.00, 
            description: "Crispy chicken wings glazed in sweet and tangy BBQ sauce",
            image: "/images/Hawaiian Barbecue Wings (6pcs).jpg",
            category: "Food"
          },
          // --- Drink Items ---
          { 
            id: 9, 
            name: "Large Wintermelon Milk Tea", 
            price: 110.00, 
            description: "Sweet milk tea with chewy pearl sinkers",
            image: "/images/Large Wintermelon Milk Tea.jpg",
            category: "Drinks"
          },
          { 
            id: 10, 
            name: "Iced Caramel Macchiato", 
            price: 120.00, 
            description: "Rich espresso layered with cold milk and caramel drizzle",
            image: "/images/Iced Caramel Macchiato.jpg",
            category: "Drinks"
          },
          { 
            id: 11, 
            name: "Matcha Green Tea Latte", 
            price: 135.00, 
            description: "Smooth and creamy Japanese green tea infusion",
            image: "/images/Matcha Green Tea Latte.jpg",
            category: "Drinks"
          },
          { 
            id: 13, 
            name: "Iced Americano", 
            price: 90.00, 
            description: "Bold espresso shots poured over iced water",
            image: "/images/Iced Americano.jpg",
            category: "Drinks"
          },
          { 
            id: 14, 
            name: "Fresh Mango Shake", 
            price: 100.00, 
            description: "Blended sweet ripe mangoes with milk and crushed ice",
            image: "/images/Fresh Mango Shake.jpg",
            category: "Drinks"
          },
          { 
            id: 15, 
            name: "Classic Black Milk Tea", 
            price: 95.00, 
            description: "Traditional black tea milk blend with tapioca pearls",
            image: "/images/Classic Black Milk Tea.jpg",
            category: "Drinks"
          },
          { 
            id: 16, 
            name: "Strawberry Fruit Tea", 
            price: 105.00, 
            description: "Refreshing green tea infused with sweet strawberry flavor and nata de coco",
            image: "/images/Strawberry Fruit Tea.jpg",
            category: "Drinks"
          },
          { 
            id: 17, 
            name: "Fresh Lemonade", 
            price: 85.00, 
            description: "Zesty and refreshing squeezed fresh lemons with simple syrup",
            image: "/images/Fresh Lemonade.jpg",
            category: "Drinks"
          },
          // --- Dessert Items ---
          { 
            id: 12, 
            name: "Chocolate Lava Cake", 
            price: 130.00, 
            description: "Warm moist chocolate cake with a gooey molten center",
            image: "/images/Chocolate Lava Cake.jpg",
            category: "Dessert"
          },
          { 
            id: 18, 
            name: "Mango Graham Cake", 
            price: 115.00, 
            description: "Layers of crushed graham crackers, rich cream, and fresh sweet mango slices",
            image: "/images/Mango Graham Cake.jpg",
            category: "Dessert"
          },
          { 
            id: 19, 
            name: "Traditional Leche Flan", 
            price: 90.00, 
            description: "Smooth and creamy caramelized egg custard dessert",
            image: "/images/Traditional Leche Flan.jpg",
            category: "Dessert"
          },
          { 
            id: 20, 
            name: "Ube Halaya", 
            price: 95.00, 
            description: "Sweet purple yam jam topped with toasted latik",
            image: "/images/Ube Halaya.jpg",
            category: "Dessert"
          },
          { 
            id: 21, 
            name: "Special Halo-Halo", 
            price: 140.00, 
            description: "Crushed ice, sweet beans, fruits, jellies, leche flan, and ube ice cream",
            image: "/images/Special Halo-Halo.jpg",
            category: "Dessert"
          },
          { 
            id: 22, 
            name: "Brownie Fudge Sundae", 
            price: 125.00, 
            description: "Warm chocolate fudge brownie topped with vanilla ice cream and syrup",
            image: "/images/Brownie Fudge Sundae.jpg",
            category: "Dessert"
          },
        ]);
      } finally {
        setLoadingMenu(false);
      }
    }

    fetchMenu();
  }, [router]);

  if (isChecking) return null;

  const handleLogout = () => {
    removeTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => [...prev, item]);
    setMessage("");
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    setMessage("");

    try {
      await apiClient("/orders", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify({
          items: cart.map(i => i.id),
          total: totalAmount,
          paymentMethod: paymentMethod,
        }),
      });

      setMessage("Order successfully placed!");
      setCart([]);
      setIsCartOpen(false);
    } catch (err: unknown) {
      setMessage((err as Error).message || "Internal server error");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Filter menu items based on selected tab
  const filteredItems = activeTab === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-50 to-amber-50/40 p-6 md:p-10 relative text-stone-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Centered Elegant Header */}
        <div className="border-b border-stone-200 pb-6 relative flex flex-col items-center justify-center text-center">
          <div className="absolute left-0 top-0">
            <Link href="/">
              <Button variant="ghost" size="icon" title="Home Page" className="hover:bg-stone-200/60">
                <HomeIcon className="w-5 h-5 text-stone-700" />
              </Button>
            </Link>
          </div>
          <div className="absolute right-0 top-0">
            <Button variant="outline" onClick={handleLogout} className="border-stone-300 hover:bg-stone-100 text-stone-700">
              Logout
            </Button>
          </div>

          <div className="space-y-1.5 mt-1">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider text-stone-900">Crave & Co.</h1>
            <p className="text-sm font-serif italic text-stone-600 tracking-wide">
              Simple, catchy, and focuses on satisfying everyday cravings.
            </p>
            <p className="text-xs uppercase tracking-widest text-stone-500 pt-2 font-medium">
              Welcome back, <span className="font-semibold text-stone-900">{username}</span>
            </p>
          </div>
        </div>

        {message && (
          <div className="flex items-center justify-center space-x-2 py-3 px-5 text-sm bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200/80 shadow-md transition-all duration-300 max-w-md mx-auto">
            <CheckCircle2Icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-medium tracking-wide">{message}</span>
          </div>
        )}

        {/* Menu Section */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-semibold tracking-tight text-stone-900">Our Menu</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 border-b border-stone-200 pb-3">
            {(["All", "Food", "Drinks", "Dessert"] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab 
                    ? "bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-sm" 
                    : "border-stone-300 bg-white/80 text-stone-700 hover:bg-stone-100"
                }
              >
                {tab}
              </Button>
            ))}
          </div>

          {loadingMenu ? (
            <p className="text-stone-500 italic">Loading menu items...</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-stone-500 py-8 text-center italic">No items found in this category.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filteredItems.map((item, index) => (
                <Card key={item.id} className="flex flex-col justify-between overflow-hidden border-stone-200/80 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300">
                  {item.image && (
                    <Dialog>
                      <DialogTrigger render={
                        <button type="button" className="h-40 w-full overflow-hidden bg-stone-100 cursor-pointer group relative text-left border-0 p-0 block">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={800}
                            height={600}
                            unoptimized
                            loading={index === 0 ? "eager" : "lazy"}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-xs bg-stone-900/80 text-stone-100 px-2.5 py-1 rounded-full shadow">Click to enlarge</span>
                          </div>
                        </button>
                      } />
                      <DialogContent className="max-w-md bg-stone-50 border-stone-200">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-xl">{item.name}</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-hidden rounded-lg mt-2 shadow-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={800}
                            height={600}
                            unoptimized
                            className="w-full h-auto object-cover rounded-md"
                          />
                        </div>
                        <p className="text-sm text-stone-600 mt-3">{item.description}</p>
                        <p className="font-bold text-stone-900 text-lg mt-1">₱{item.price.toFixed(2)}</p>
                      </DialogContent>
                    </Dialog>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-serif text-stone-900">{item.name}</CardTitle>
                    <CardDescription className="text-xs text-stone-500 line-clamp-2">{item.description || "Freshly prepared item"}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-lg font-bold text-stone-900">₱{item.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button size="sm" className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium shadow-sm transition-colors" onClick={() => addToCart(item)}>
                      Add to Order
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Floating Cart Button on Bottom Right */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogTrigger render={
          <button 
            type="button" 
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-stone-900 text-stone-50 shadow-2xl hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cart.length}
              </span>
            )}
          </button>
        } />
        <DialogContent className="max-w-md bg-stone-50 border-stone-200">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Order Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-xs text-stone-500 uppercase tracking-wider">{cart.length} item(s) selected</p>
            {cart.length === 0 ? (
              <p className="text-sm text-stone-500 py-8 text-center italic">Your cart is empty.</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto pr-1">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-stone-200">
                        <TableHead className="text-stone-700">Item</TableHead>
                        <TableHead className="text-right text-stone-700">Price</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item, idx) => (
                        <TableRow key={idx} className="border-stone-100">
                          <TableCell className="font-medium text-stone-800">{item.name}</TableCell>
                          <TableCell className="text-right text-stone-800">₱{item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <button 
                              onClick={() => removeFromCart(idx)}
                              className="text-xs text-rose-600 hover:underline font-medium"
                            >
                              Remove
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Payment Method Display */}
                <div className="space-y-1 pt-2 border-t border-stone-200 text-sm">
                  <span className="text-xs font-medium text-stone-700 uppercase tracking-wider block">Payment Method</span>
                  <p className="text-stone-900 font-semibold bg-stone-100 p-2 rounded-md border border-stone-200">Cash on Delivery</p>
                </div>

                <div className="border-t border-stone-200 pt-3 flex justify-between items-center font-bold text-lg text-stone-900">
                  <span>Total:</span>
                  <span>₱{totalAmount.toFixed(2)}</span>
                </div>

                <Button 
                  className="w-full mt-2 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium shadow" 
                  onClick={handlePlaceOrder} 
                  disabled={checkoutLoading || cart.length === 0}
                >
                  {checkoutLoading ? "Submitting Order..." : "Place Order"}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}