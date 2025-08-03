import React from 'react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Zap, 
  Brain, 
  FileText, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description: "Advanced AI models create high-quality, engaging content tailored to your needs."
    },
    {
      icon: FileText,
      title: "20+ Content Templates",
      description: "Blog posts, social media content, YouTube descriptions, and much more."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team to create and manage content efficiently."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your content and data are protected with enterprise-grade security."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Generate content in seconds instead of hours with our AI tools."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant results and updates as you work on your content."
    }
  ];

  const templates = [
    { name: "Blog Content", category: "Writing" },
    { name: "Social Media Posts", category: "Marketing" },
    { name: "YouTube Descriptions", category: "Video" },
    { name: "Product Descriptions", category: "E-commerce" },
    { name: "Email Campaigns", category: "Marketing" },
    { name: "SEO Content", category: "SEO" }
  ];

  return (
           <div className="min-h-screen bg-gradient-genify-subtle">
         {/* Navigation Bar */}
         <nav className="bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-genify rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Genify</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#templates" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Templates
              </Link>
              <Link href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                About
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Sign In
                  </Button>
                </SignInButton>
                                 <SignUpButton mode="modal">
                   <Button className="bg-gradient-genify hover:opacity-90 text-white">
                     Get Started
                   </Button>
                 </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-4">
                                       <Link href="/dashboard">
                       <Button className="bg-gradient-genify hover:opacity-90 text-white">
                         Dashboard
                       </Button>
                     </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-genify text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-2" />
                AI-Powered Content Generation
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Create Amazing Content
              <span className="text-gradient-genify">
                {" "}with AI
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your content creation with Genify's AI-powered platform. Generate blog posts, 
              social media content, YouTube descriptions, and more in seconds. Save time and boost your productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-gradient-genify hover:opacity-90 text-white text-lg px-8 py-4">
                    Start Creating Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-genify hover:opacity-90 text-white text-lg px-8 py-4">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </SignedIn>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Free 10,000 words
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to create amazing content
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful AI tools designed to help you create high-quality content faster than ever before.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              20+ Content Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide variety of templates designed for different content types and industries.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-900 mb-2">{template.name}</div>
                <div className="text-xs text-gray-500">{template.category}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Explore All Templates
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Explore All Templates
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your content creation?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators who are already using Genify to create amazing content.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Genify</span>
              </div>
              <p className="text-gray-400">
                AI-powered content generation platform for creators and businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Genify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
