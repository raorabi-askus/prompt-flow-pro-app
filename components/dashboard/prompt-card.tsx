"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Copy, Wand2 } from "lucide-react"
import { ImprovePromptModal } from "@/components/dashboard/improve-prompt-modal"

interface PromptCardProps {
  prompt: any
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [showImprove, setShowImprove] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">{prompt.title}</CardTitle>
                <CardDescription className="mt-1">{prompt.categories?.name}</CardDescription>
              </div>
            </div>
            {prompt.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{prompt.description}</p>
            )}
          </CardHeader>

          <CardContent className="flex-1">
            <div className="bg-muted/50 rounded-lg p-3 min-h-24 max-h-32 overflow-hidden">
              <p className="text-sm text-foreground line-clamp-4">{prompt.content}</p>
            </div>
          </CardContent>

          <div className="border-t p-4 flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={() => setShowImprove(true)}>
                <Wand2 className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      <ImprovePromptModal isOpen={showImprove} onClose={() => setShowImprove(false)} prompt={prompt} />
    </>
  )
}
