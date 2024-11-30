import Link from "next/link";
import { Box } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./toggle";
import NavbarClient from "./NavbarClient"; // Import the client-side component
import { Button } from "./ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { SignOut } from "./SignOut";

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Contact", href: "/contact" },
];

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-[80%] flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Box />
          <span className="hidden font-bold sm:inline-block">
            Next.js Starter
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Right-side Controls */}
        <div className="flex items-center space-x-2">
          <NavbarClient /> {/* Include client-side parts */}
          {session?.user ? (
            <SignOut />
          ) : (
            <Button variant="ghost" className="hidden md:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
          )}
          {!session?.user && (
            <Button className="hidden md:inline-flex">
              <Link href="/register">Register</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
