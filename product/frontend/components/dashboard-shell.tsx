import type React from "react"
import { SidebarMenu } from "@/components/ui/SidebarMenu"

interface DashboardShellProps {
  children: React.ReactNode
}

/**
 * A layout component that wraps the dashboard content with a sidebar.
 *
 * Displays a sidebar for navigation and renders the provided children inside the main content area.
 * The sidebar is visible for users with the "ROLE_USER" role.
 *
 * @param children - The content to be rendered inside the dashboard layout.
 */
export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarMenu role="ROLE_USER">
        <main className="flex-1">{children}</main>
      </SidebarMenu>
    </div>
  )
}

