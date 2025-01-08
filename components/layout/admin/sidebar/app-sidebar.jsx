"use client";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  ImageIcon,
  LayoutDashboard,
  ListIcon,
  Map,
  Package,
  PieChart,
  Settings2,
  ShoppingCart,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Image from "next/image";

// This is sample data.
export const data = {
  user: {
    name: "Trafalger",
    email: "trafalger@example.com",
    avatar: "/vites.svg",
  },
  teams: [
    {
      name: "Cartridge Point.",
      logo: ()=><Image height={200} width={200} alt='C' src="/images/logo_transparent.png" />,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  Items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      url: "#/orders",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      url: "/products",
      icon: Package,
    },
    {
      name: "Categories",
      url: "/categories",
      icon: ListIcon,
    },
    {
      name: "Banners",
      url: "/banners",
      icon: ImageIcon,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const currentPath = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          {/* <NavMain items={data.navMain} currentPath={currentPath} /> */}
          <NavProjects projects={data.Items} currentPath={currentPath} />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
