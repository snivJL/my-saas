"use client";

import { useState, useEffect } from "react";
import { Bell, Search, HelpCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Moon, Sun } from "lucide-react";

const recentSearches = [
  "Dashboard analytics",
  "User management",
  "API documentation",
];
const sampleNotifications = [
  { id: 1, message: "New user signed up", time: "2 minutes ago" },
  { id: 2, message: "Server update completed", time: "1 hour ago" },
  { id: 3, message: "New feature released", time: "2 hours ago" },
];

export default function Navbar() {
  const { setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  useEffect(() => {
    // Simulate new notification after 5 seconds
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        {
          id: prev.length + 1,
          message: "Simulated new notification",
          time: "Just now",
        },
        ...prev,
      ]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-64 justify-start">
              <Search className="mr-2 h-4 w-4" />
              Search...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="bottom" align="start">
            <Command>
              <CommandInput placeholder="Type to search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Recent Searches">
                  {recentSearches.map((search) => (
                    <CommandItem
                      key={search}
                      onSelect={() => setSearchOpen(false)}
                    >
                      {search}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative" variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  {notifications.length}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                <div className="flex flex-col">
                  <span>{notification.message}</span>
                  <span className="text-sm text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@username" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover open={showWhatsNew} onOpenChange={setShowWhatsNew}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Zap className="h-4 w-4" />
              <span className="sr-only">What&apos;s New</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-4">
              <h3 className="font-semibold">What&apos;s New</h3>
              <div className="space-y-2">
                <h4 className="font-medium">Enhanced Analytics</h4>
                <p className="text-sm">
                  We&apos;ve added new charts and insights to help you
                  understand your data better.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm">
                  You can now switch between light and dark modes for better
                  viewing comfort.
                </p>
              </div>
              <Button onClick={() => setShowWhatsNew(false)} className="w-full">
                Got it
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          size="icon"
          onClick={() => alert("Opening help chat...")}
        >
          <HelpCircle className="h-4 w-4" />
          <span className="sr-only">Help</span>
        </Button>
      </div>
    </nav>
  );
}
