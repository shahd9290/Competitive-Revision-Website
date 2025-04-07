import type React from "react"
import { SidebarMenu } from "@/components/ui/SidebarMenu"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarMenu role="ROLE_USER">
        <main className="flex-1">{children}</main>
      </SidebarMenu>
    </div>
  )
}

