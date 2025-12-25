"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreatePromptModal } from "@/components/dashboard/create-prompt-modal"

interface CreatePromptButtonProps {
  onPromptCreated: () => void
}

export function CreatePromptButton({ onPromptCreated }: CreatePromptButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" />
        Create Prompt
      </Button>
      <CreatePromptModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSuccess={onPromptCreated} />
    </>
  )
}
