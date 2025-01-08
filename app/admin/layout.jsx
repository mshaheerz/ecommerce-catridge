import { AppSidebar } from "@/components/layout/admin/sidebar/app-sidebar";
import TopBar from "@/components/layout/admin/topbar/top-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


export default function AdminLayout({children}) {

    return (
      <SidebarProvider>
        <AppSidebar  />
        <SidebarInset>
          <TopBar />
          <div className="p-12">{children}</div>
          
        </SidebarInset>
      </SidebarProvider>
    );
  }
  