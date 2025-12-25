"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Sparkles, Lock, BarChart3 } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleNavigate = (href: string) => {
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-xl bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold block">PromptFlow Pro</span>
              <span className="text-xs text-muted-foreground">AI-Powered Prompt Management</span>
            </div>
          </div>
          <button onClick={() => handleNavigate("/auth/login")} disabled={isPending}>
            <Button variant="outline" className="bg-transparent hover:bg-accent/10">
              Sign In
            </Button>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
                Organize Your Team's{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  AI Prompts
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance">
                Centralize, enhance, and collaborate on prompts with AI-powered suggestions. Build better prompts
                together, faster.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button onClick={() => handleNavigate("/auth/signup")} disabled={isPending}>
                <Button size="lg" className="gap-2 px-8 h-12 text-base">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </button>
              <button onClick={() => handleNavigate("/auth/login")} disabled={isPending}>
                <Button size="lg" variant="outline" className="bg-transparent px-8 h-12 text-base hover:bg-accent/10">
                  Sign In
                </Button>
              </button>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required. Free trial includes 100 AI enhancements.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Teams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage, improve, and collaborate on prompts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">AI Enhancement</h3>
              <p className="text-sm text-muted-foreground">
                Polish your prompts with OpenAI-powered suggestions to make them more effective and precise
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Organize prompts by team and category. Share knowledge across your entire organization
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">
                End-to-end encryption, role-based access control, and comprehensive audit logs included
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Analytics & Insights</h3>
              <p className="text-sm text-muted-foreground">
                Track usage patterns and see which prompts are most effective for your teams
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get started in minutes with our simple 3-step process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold mb-2">Create Your Team</h3>
                  <p className="text-muted-foreground">
                    Sign up and create your first team. Invite team members to collaborate and share prompts.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold mb-2">Add Your Prompts</h3>
                  <p className="text-muted-foreground">
                    Upload and organize prompts by category. Add descriptions and tags for easy discovery.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold mb-2">Enhance with AI</h3>
                  <p className="text-muted-foreground">
                    Use AI to improve your prompts. Get suggestions and refinements instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Teams</h2>
            <p className="text-lg text-muted-foreground">Join hundreds of teams improving their prompt engineering</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "AI Engineer at TechCorp",
                text: "PromptFlow Pro has revolutionized how our team manages prompts. The AI enhancement feature alone saves us hours every week.",
              },
              {
                name: "Sarah Johnson",
                role: "Product Manager at StartupXYZ",
                text: "The team collaboration features are outstanding. Everyone now uses the same optimized prompts, improving consistency across products.",
              },
              {
                name: "Marcus Williams",
                role: "CTO at InnovateCo",
                text: "Security and compliance were critical for us. PromptFlow Pro checked all the boxes with enterprise-grade features.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur">
                <p className="text-sm text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="p-12 rounded-2xl border border-border bg-card/50 backdrop-blur space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Prompts?</h2>
              <p className="text-lg text-muted-foreground">
                Start managing and enhancing your team's prompts with PromptFlow Pro today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => handleNavigate("/auth/signup")} disabled={isPending}>
                <Button size="lg" className="gap-2 px-8">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </button>
              <button onClick={() => handleNavigate("/auth/login")} disabled={isPending}>
                <Button size="lg" variant="outline" className="bg-transparent px-8 hover:bg-accent/10">
                  Sign In to Existing Account
                </Button>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-xl bg-background/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">PromptFlow Pro</h3>
              <p className="text-sm text-muted-foreground">AI-powered prompt management for modern teams.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PromptFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
