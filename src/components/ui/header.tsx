"use client";
import React from "react";
import Link from "next/link";
import {
  User,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Search,
  Settings,
  Users2,
  LayoutDashboard,
  MessageCircleCode,
} from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ pageHeading = "AlgoMentor", searchbar = true }) => {
  const currentPath = usePathname();
  const { data: session } = useSession();
  return (
    <div>
      <header className="sticky top-0 z-30 flex h-14 py-4 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetHeader className="hidden">
            <SheetTitle>Dashboard Menu</SheetTitle>
            <SheetDescription>
              Dashboard menu for quick navigation
            </SheetDescription>
          </SheetHeader>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Home</span>
              </Link>
              <Link
                href="/dashboard"
                className={`flex items-center gap-4 px-2.5 transition-colors hover:text-foreground ${
                  currentPath.startsWith("/dashboard")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/socratic-ai"
                className={`flex items-center gap-4 px-2.5 transition-colors hover:text-foreground ${
                  currentPath.startsWith("/socratic-ai")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <MessageCircleCode className="h-5 w-5" />
                Socratic AI
              </Link>
              <Link
                href="/products"
                className={`flex items-center gap-4 px-2.5 transition-colors hover:text-foreground ${
                  currentPath.startsWith("/products")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="/collab"
                className={`flex items-center gap-4 px-2.5 transition-colors hover:text-foreground ${
                  currentPath.startsWith("/collab")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Users2 className="h-5 w-5" />
                Collaborate
              </Link>
              <Link
                href="/analytics"
                className={`flex items-center gap-4 px-2.5 transition-colors hover:text-foreground ${
                  currentPath.startsWith("/analytics")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <LineChart className="h-5 w-5" />
                Analytics
              </Link>
              <Link
                href="/settings"
                className={`flex items-center gap-4 px-2.5 transition-colors hover:text-foreground ${
                  currentPath.startsWith("/settings")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div
          className={`hidden sm:block lg:text-3xl sm:text-2xl font-bold ${
            pageHeading == "AlgoMentor" ? "text-primary" : ""
          } text-nowrap`}
        >
          {pageHeading}
        </div>

        <div className="relative ml-auto flex-1 md:grow-0">
          {searchbar && (
            <div>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              {session?.user ? (
                <Avatar>
                  <AvatarImage
                    src={session.user.image as string}
                    alt="user avatar"
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="cursor-context-menu">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={() => signOut}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </header>
    </div>
  );
};

export default Header;
