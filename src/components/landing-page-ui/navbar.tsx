"use client";
import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Book,
  PanelLeft,
  ShoppingCart,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import LogInButton from "../LogInButton";
import { LogOutButton } from "../LogOutButton";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Socratic AI",
    href: "/socratic-ai",
    description: "Personalized algorithm learning through guided questions.",
  },
  {
    title: "Interactive Modules",
    href: "/dashboard",
    description: "Hands-on exercises for mastering algorithms.",
  },
  {
    title: "Popular Algorithms",
    href: "/dashboard",
    description: "Explore the most widely-used algorithms.",
  },
  {
    title: "Latest Notes",
    href: "/community",
    description: "Stay updated with fresh algorithm insights.",
  },
  {
    title: "Community",
    href: "/community",
    description: "Connect, share, and grow with fellow learners.",
  },
  {
    title: "Support",
    href: "/community",
    description: "Get help with any issues or queries.",
  },
];

export function Navbar({className}:{className?: string}) {
  const { status } = useSession();
  return (
    <NavigationMenu className="p-4 lg:px-10 xs:px-6">
      <NavigationMenuList className="flex flex-row justify-between items-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">
              <div className="lg:text-3xl text-2xl font-bold text-primary text-nowrap">
                Algo Mentor
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`text-xs lg:text-base px-2 lg:px-4 ${className}`}>
              Getting started
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Socratic AI
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        AlgoMentor is your Socratic AI mentor, guiding you
                        through algorithms interactively and enhancing
                        understanding.
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
                <ListItem href="#about" title="Introduction">
                  Master algorithms with AI-driven Socratic mentoring
                </ListItem>
                <ListItem href="#features" title="Features">
                  Why choose AlgoMentor?
                </ListItem>
                <ListItem href="#testimonials" title="Testimonials">
                  Latest reviews from our users
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`text-xs lg:text-base px-2 lg:px-4 ${className}`}>
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} px-2 lg:px-4 ${className}`}
            >
              <Link
                href="https://github.com/jatinkaushik-jk/algo-mentor"
                target="_blank"
              >
                <div className="text-xs lg:text-base">Documentation</div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} px-2 lg:px-4 ${className}`}
            >
              <Link href="/pricing">
                <div className="text-xs lg:text-base">Pricing</div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="gap-1 xs:gap-3">
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink asChild>
              {status === "authenticated" ? <Button asChild><Link href={"/dashboard"}>Dashboard</Link></Button> : <LogInButton />}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className={`md:hidden ${className}`}>
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/">
                    <div className="lg:text-3xl text-2xl font-bold text-primary text-nowrap">
                      Algo Mentor
                    </div>
                    <span className="sr-only">Logo</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Code className="h-5 w-5" />
                    Getting Started
                  </Link>
                  <Link
                    href="https:github.com/jatinkaushik-jk"
                    target="_blank"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Resources
                  </Link>
                  <Link
                    href="https:github.com/jatinkaushik-jk/algo-mentor"
                    target="_blank"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Book className="h-5 w-5" />
                    Documentation
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Book className="h-5 w-5" />
                    Pricing
                  </Link>
                  {status === "authenticated" && (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}

                  <LogOutButton
                      showIcon
                      className="flex items-center gap-4 px-2.5 text-muted-foreground text-lg font-medium hover:text-red-500"
                    />
                  <LogInButton className="w-full"/>
                </nav>
              </SheetContent>
            </Sheet>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
