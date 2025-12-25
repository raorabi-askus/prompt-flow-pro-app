"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, FolderPlus, Settings } from "lucide-react"

export function AdminQuickAccess() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Admin Quick Access
        </CardTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-3 gap-3">
        <Link href="/dashboard/admin?tab=teams" className="flex-1">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
            <Users className="w-4 h-4 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium">Create Team</p>
              <p className="text-xs text-muted-foreground">Add new team</p>
            </div>
          </Button>
        </Link>
        <Link href="/dashboard/admin?tab=categories" className="flex-1">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
            <FolderPlus className="w-4 h-4 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium">Add Category</p>
              <p className="text-xs text-muted-foreground">Organize prompts</p>
            </div>
          </Button>
        </Link>
        <Link href="/dashboard/admin?tab=members" className="flex-1">
          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
            <Users className="w-4 h-4 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium">Add Member</p>
              <p className="text-xs text-muted-foreground">Invite users</p>
            </div>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
