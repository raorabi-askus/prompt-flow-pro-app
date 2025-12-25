"use client"

import { motion } from "framer-motion"
import { PromptCard } from "@/components/dashboard/prompt-card"

interface PromptGridProps {
  prompts: any[]
}

export function PromptGrid({ prompts }: PromptGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {prompts.map((prompt, index) => (
        <motion.div
          key={prompt.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PromptCard prompt={prompt} />
        </motion.div>
      ))}
    </motion.div>
  )
}
