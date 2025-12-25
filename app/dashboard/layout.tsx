"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Sidebar } from "@/components/dashboard/sidebar"
import { LoadingScreen } from "@/components/dashboard/loading-screen"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [supabase, router])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-auto ml-64 md:ml-0">{children}</main>
    </div>
  )
}
