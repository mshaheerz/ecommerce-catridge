"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavActions } from "./nav-actions";
import React from "react";

import { usePathname } from "next/navigation";
import { data } from "../sidebar/app-sidebar";

function getBreadcrumbItems(currentPath) {
  const pathParts = currentPath.split("/").filter(Boolean);
  const breadcrumbItems = [];

  let currentItem = { items: data.navMain };
  let currentUrl = "";

  for (const part of pathParts) {
    currentUrl += `/${part}`;
    const foundItem = currentItem?.items[0].items?.find(
      (item) => item.url === currentUrl
    );
    if (foundItem) {
      breadcrumbItems.push(foundItem);
      currentItem = foundItem;
    }
  }

  return breadcrumbItems;
}
function TopBar() {
  const currentPath = usePathname()
  const breadcrumbItems = getBreadcrumbItems(currentPath);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.title}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbItems.length - 1 ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.url}>
                      {item.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto px-3">
        <NavActions />
      </div>
    </header>
  );
}

export default TopBar;
