"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CategoryGuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoryGuide({ open, onOpenChange }: CategoryGuideProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Where to Add Categories</DialogTitle>
          <DialogDescription>Learn how to organize your prompts with categories</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">There are two ways to create categories:</h3>

            {/* Method 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    1
                  </span>
                  When Creating a Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  When you click "Create Prompt", you can create a new category on-the-fly in the dropdown. Just select
                  your team and type a new category name.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground">
                  This is the quickest way if you need a category immediately.
                </div>
              </CardContent>
            </Card>

            {/* Method 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    2
                  </span>
                  In Admin Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Go to Admin Settings → Categories tab to manage all categories in one place. You can:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li>✓ Create categories for specific teams</li>
                  <li>✓ Create global categories (visible to all)</li>
                  <li>✓ Delete categories you no longer need</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Quick Tips */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Pro Tips for Categories
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use descriptive names like "Marketing Copy", "Code Generation", "Customer Support"</li>
              <li>• Global categories are visible to all teams - use them for company-wide standards</li>
              <li>• Keep team-specific categories focused on that team's use cases</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link href="/dashboard/admin" className="flex-1">
              <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => onOpenChange(false)}>
                Go to Admin Settings <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button className="flex-1 gap-2">
              Create First Prompt <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
