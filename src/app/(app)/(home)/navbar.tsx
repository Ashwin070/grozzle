"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import localFont from "next/font/local";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const oriole = localFont({
  src: "../fonts/Oriole-Bold.woff2",
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent hover:text-white rounded-full hover:border-white border-transparent px-3.5 text-lg",
        isActive && "bg-white text-black hover:bg-white hover:text-black"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b border-b-gray-500 justify-between font-medium bg-black text-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl tracking-wide", oriole.className)}>
          Grozzle
        </span>
      </Link>

      <NavbarSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        items={navbarItems}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l-0 border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-pink-400 text-black hover:bg-white transition-colors text-lg hover:text-black"
          >
            <Link href="/admin">
              Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-white transition-colors text-lg hover:text-black border-l-gray-500"
          >
            <Link prefetch href="/sign-in">
              Log in
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="border-l-0 border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-pink-400 text-black hover:bg-white transition-colors text-lg hover:text-black"
          >
            <Link prefetch href="/sign-up">
              Start selling
            </Link>
          </Button>
        </div>
      )}
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-transparent hover:bg-transparent hover:text-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
