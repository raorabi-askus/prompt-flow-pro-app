"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { PromptGrid } from "@/components/dashboard/prompt-grid"
import { CreatePromptButton } from "@/components/dashboard/create-prompt-button"
import { SearchBar } from "@/components/dashboard/search-bar"
import { TeamOnboarding } from "@/components/dashboard/team-onboarding"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [prompts, setPrompts] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: teamData } = await supabase.from("teams").select("*").order("created_at", { ascending: false })

      const { data } = await supabase
        .from("prompts")
        .select("*, categories(name), teams(name)")
        .order("created_at", { ascending: false })

      setTeams(teamData || [])
      setPrompts(data || [])
      setShowOnboarding((teamData || []).length === 0)
    }
    setLoading(false)
  }

  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (showOnboarding && teams.length === 0) {
    return <TeamOnboarding onTeamCreated={fetchData} />
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Global Board</h1>
        <p className="text-muted-foreground">Browse and manage all team prompts</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CreatePromptButton onPromptCreated={fetchData} />
        </div>
        {teams.length === 0 && (
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-3">No team yet? Create one to get started.</p>
              <Link href="/dashboard/admin">
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Team
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Prompts Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading prompts...</p>
        </div>
      ) : filteredPrompts.length > 0 ? (
        <PromptGrid prompts={filteredPrompts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {teams.length === 0 ? "Create a team to add prompts" : "No prompts found"}
          </p>
          {teams.length > 0 && <CreatePromptButton onPromptCreated={fetchData} />}
        </div>
      )}
    </div>
  )
}
