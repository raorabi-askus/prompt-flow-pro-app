import type React from "react"
export const metadata = {
  title: "Authentication - PromptFlow Pro",
  description: "Sign in or create an account to access PromptFlow Pro",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
