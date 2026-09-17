import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Brain, Rocket, User } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="floating">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About MeetEase
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            We're revolutionizing how teams capture, process, and act on meeting insights through the power of
            artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                In today's fast-paced business environment, meetings are essential but documentation is often
                overlooked. We believe that every conversation contains valuable insights that shouldn't be lost to poor
                note-taking or forgotten details.
              </p>
              <p className="text-lg text-muted-foreground">
                MeetEase harnesses advanced AI to ensure that no important decision, action item, or insight is
                ever missed again.
              </p>
            </div>
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-6 glow">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the global standard for intelligent meeting documentation, empowering teams to focus on what
                  matters most - meaningful conversations and decisive actions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card smooth-transition scale-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4 glow">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuously pushing the boundaries of AI technology to deliver cutting-edge solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card smooth-transition scale-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center mx-auto mb-4 glow-green">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">User-Centric</h3>
                <p className="text-muted-foreground">
                  Every feature is designed with our users' needs and workflows at the center.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card smooth-transition scale-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4 glow">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Committed to delivering the highest quality in accuracy, security, and user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center mb-6 glow-green">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Advanced Technology</h3>
                <p className="text-muted-foreground mb-4">
                  Our platform leverages state-of-the-art AI models including:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Advanced speech recognition with 95%+ accuracy</li>
                  <li>• Multi-language translation capabilities</li>
                  <li>• Natural language processing for intelligent summarization</li>
                  <li>• Sentiment analysis and context understanding</li>
                  <li>• Real-time processing and optimization</li>
                </ul>
              </CardContent>
            </Card>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for the Future</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our technology stack is designed to scale with your needs, from small team meetings to enterprise-wide
                implementations.
              </p>
              <p className="text-lg text-muted-foreground">
                We continuously update our AI models to ensure you always have access to the latest advancements in
                machine learning and natural language processing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}