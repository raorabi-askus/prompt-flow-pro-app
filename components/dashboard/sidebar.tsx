"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Globe, Users, Settings, LogOut, Menu, X } from "lucide-react"

const sidebarItems = [
  { label: "Global Board", href: "/dashboard", icon: Globe },
  { label: "My Team", href: "/dashboard/team", icon: Users },
  { label: "Admin Settings", href: "/dashboard/admin", icon: Settings },
]

interface SidebarProps {
  onOpenChange?: (open: boolean) => void
}

export function Sidebar({ onOpenChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const toggleSidebar = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:bg-card md:border-r md:border-border md:z-40 md:flex md:flex-col"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PF</span>
              </div>
              <div>
                <p className="font-bold text-sm">PromptFlow Pro</p>
                <p className="text-xs text-muted-foreground">Team Prompts</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10"
                      } transition-colors`}
                      size="lg"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-destructive/10 transition-colors"
                size="lg"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 md:hidden flex flex-col"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PF</span>
              </div>
              <div>
                <p className="font-bold text-sm">PromptFlow Pro</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toggleSidebar(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

              return (
                <Link key={item.href} href={item.href} onClick={() => toggleSidebar(false)}>
                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10"
                      } transition-colors`}
                      size="lg"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 hover:bg-destructive/10 transition-colors"
              size="lg"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Toggle Button */}
      <motion.button
        onClick={() => toggleSidebar(!isOpen)}
        className="fixed left-4 top-4 z-50 md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
      </motion.button>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 md:hidden z-30" onClick={() => toggleSidebar(false)} />}
    </>
  )
}
