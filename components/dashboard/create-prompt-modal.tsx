"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface CreatePromptModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreatePromptModal({ isOpen, onClose, onSuccess }: CreatePromptModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [teamId, setTeamId] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const supabase = createClient()

  useEffect(() => {
    if (isOpen) {
      fetchTeamsAndCategories()
    }
  }, [isOpen])

  const fetchTeamsAndCategories = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Fetch user's teams
      const { data: teamData } = await supabase.from("team_members").select("teams(id, name)").eq("user_id", user.id)

      const uniqueTeams = teamData?.map((t: any) => t.teams).filter(Boolean) || []
      setTeams(uniqueTeams)

      // Fetch categories
      if (uniqueTeams.length > 0) {
        const { data: catData } = await supabase
          .from("categories")
          .select("*")
          .in(
            "team_id",
            uniqueTeams.map((t: any) => t.id),
          )

        setCategories(catData || [])
      }
    }
  }

  const handleCreatePrompt = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title || !content || !categoryId || !teamId) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("User not authenticated")
        return
      }

      const { error: insertError } = await supabase.from("prompts").insert({
        title,
        description,
        content,
        category_id: categoryId,
        team_id: teamId,
        created_by: user.id,
      })

      if (insertError) {
        setError(insertError.message)
        return
      }

      // Reset form
      setTitle("")
      setDescription("")
      setContent("")
      setCategoryId("")
      setTeamId("")
      onSuccess()
      onClose()
    } catch (err) {
      setError("Failed to create prompt")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNewCategory = async () => {
    if (!newCategoryName || !teamId) {
      setError("Please enter a category name")
      return
    }

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("User not authenticated")
        return
      }

      const { data: newCat, error: insertError } = await supabase
        .from("categories")
        .insert({
          name: newCategoryName,
          team_id: teamId,
          created_by: user.id,
        })
        .select()
        .single()

      if (insertError) {
        setError(insertError.message)
        return
      }

      setCategories([...categories, newCat])
      setCategoryId(newCat.id)
      setNewCategoryName("")
      setShowNewCategory(false)
    } catch (err) {
      setError("Failed to create category")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Prompt</DialogTitle>
            <DialogDescription>Add a new prompt to your team's directory</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePrompt} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Prompt Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Create a React Component"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of what this prompt does"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="team">Team *</Label>
                <Select value={teamId} onValueChange={setTeamId}>
                  <SelectTrigger id="team">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team: any) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((cat: any) => cat.team_id === teamId)
                      .map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Prompt Content *</Label>
              <Textarea
                id="content"
                placeholder="Enter the full prompt text..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-32"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Prompt"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
