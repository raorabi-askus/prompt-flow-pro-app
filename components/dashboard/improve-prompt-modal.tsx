"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Copy, Wand2 } from "lucide-react"

interface ImprovePromptModalProps {
  isOpen: boolean
  onClose: () => void
  prompt: any
}

export function ImprovePromptModal({ isOpen, onClose, prompt }: ImprovePromptModalProps) {
  const [improvedContent, setImprovedContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleImprove = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.content }),
      })

      const data = await response.json()
      setImprovedContent(data.improved || "")
    } catch (error) {
      setImprovedContent("Failed to improve prompt. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Improve with AI</DialogTitle>
          <DialogDescription>Enhance your prompt with AI suggestions</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Original Prompt</label>
            <div className="bg-muted/50 rounded-lg p-3 mt-1 max-h-24 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap">{prompt.content}</p>
            </div>
          </div>

          {improvedContent ? (
            <div>
              <label className="text-sm font-medium">Improved Prompt</label>
              <Textarea value={improvedContent} readOnly className="mt-1 max-h-32" />
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={handleCopy} className="flex-1 bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Improved"}
                </Button>
                <Button onClick={() => setImprovedContent("")}>Try Again</Button>
              </div>
            </div>
          ) : (
            <Button onClick={handleImprove} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Improving...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
