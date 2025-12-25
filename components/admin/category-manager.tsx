"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"

export function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [teamId, setTeamId] = useState("")
  const [isGlobal, setIsGlobal] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: teamData } = await supabase.from("teams").select("*")

    const { data: catData } = await supabase.from("categories").select("*, teams(name)").order("created_at", {
      ascending: false,
    })

    setTeams(teamData || [])
    setCategories(catData || [])
    setLoading(false)
  }

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !teamId) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from("categories").insert({
      name,
      team_id: teamId,
      is_global: isGlobal,
      created_by: user.id,
    })

    if (!error) {
      setName("")
      setTeamId("")
      setIsGlobal(false)
      setIsOpen(false)
      fetchData()
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    const { error } = await supabase.from("categories").delete().eq("id", categoryId)

    if (!error) {
      fetchData()
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Categories</CardTitle>
          <Button onClick={() => setIsOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Category
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading categories...</p>
          ) : categories.length > 0 ? (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cat.teams?.name} {cat.is_global && "• Global"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No categories created yet</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" placeholder="Frontend" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="team">Team</Label>
              <Select value={teamId} onValueChange={setTeamId}>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="global" checked={isGlobal} onCheckedChange={(checked) => setIsGlobal(!!checked)} />
              <Label htmlFor="global">Set as global category</Label>
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
