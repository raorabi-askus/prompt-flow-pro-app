"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, Zap, ArrowRight } from "lucide-react"

interface TeamOnboardingProps {
  onTeamCreated: () => void
}

export function TeamOnboarding({ onTeamCreated }: TeamOnboardingProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const supabase = createClient()

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from("teams").insert({
      name,
      description,
      created_by: user.id,
    })

    if (!error) {
      setStep(2)
      onTeamCreated()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {step === 1 ? (
          <Card className="border-border/50 backdrop-blur">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl">Welcome to PromptFlow Pro!</CardTitle>
              <p className="text-muted-foreground">Let's set up your first team to start managing prompts.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTeam} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Team Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Engineering, Marketing, Product"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11"
                  />
                  <p className="text-xs text-muted-foreground">Choose a name that represents your team</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="What does this team do? e.g., Responsible for AI/ML model optimization"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-20"
                  />
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    What happens next?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ Your team will be created instantly</li>
                    <li>✓ You'll be added as the admin</li>
                    <li>✓ You can invite team members from Admin Settings</li>
                    <li>✓ Start adding prompts right away</li>
                  </ul>
                </div>

                <Button type="submit" disabled={loading || !name} className="w-full h-11 gap-2">
                  {loading ? "Creating..." : "Create Team"} <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50 backdrop-blur">
            <CardHeader className="space-y-2 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl">🎉</span>
                </div>
              </div>
              <CardTitle className="text-3xl">Team Created!</CardTitle>
              <p className="text-muted-foreground">Your team is ready to use. Let's get started!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Next Steps:</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Go to Admin Settings to manage your team</li>
                    <li>Invite team members from the Members tab</li>
                    <li>Create categories to organize your prompts</li>
                    <li>Add your first prompt and enhance it with AI</li>
                  </ol>
                </div>
              </div>
              <Button onClick={() => (window.location.href = "/dashboard")} className="w-full h-11">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
