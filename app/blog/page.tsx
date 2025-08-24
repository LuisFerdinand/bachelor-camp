'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  User, 
  Clock, 
  Search,
  ChevronRight,
  Bookmark
} from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Effective Strategies for Learning English Vocabulary",
      excerpt: "Discover proven techniques to expand your English vocabulary quickly and retain new words longer.",
      author: "Sarah Johnson",
      date: "May 15, 2023",
      readTime: "5 min read",
      category: "Learning Tips",
      image: "vocabulary"
    },
    {
      id: 2,
      title: "IELTS Speaking Test: Common Mistakes to Avoid",
      excerpt: "Learn about the most frequent errors candidates make in the IELTS speaking test and how to avoid them.",
      author: "Michael Chen",
      date: "April 28, 2023",
      readTime: "7 min read",
      category: "IELTS Preparation",
      image: "ielts"
    },
    {
      id: 3,
      title: "The Benefits of Immersion Learning",
      excerpt: "Explore how immersion learning can accelerate your English language acquisition and cultural understanding.",
      author: "Emma Rodriguez",
      date: "April 10, 2023",
      readTime: "6 min read",
      category: "Learning Methods",
      image: "immersion"
    },
    {
      id: 4,
      title: "Business English: Email Writing Essentials",
      excerpt: "Master the art of professional email communication with these essential tips and templates.",
      author: "David Kim",
      date: "March 22, 2023",
      readTime: "8 min read",
      category: "Business English",
      image: "business"
    },
    {
      id: 5,
      title: "Understanding CEFR Levels: A Complete Guide",
      excerpt: "Everything you need to know about the Common European Framework of Reference for Languages.",
      author: "Lisa Thompson",
      date: "March 5, 2023",
      readTime: "10 min read",
      category: "CEFR",
      image: "cefr"
    },
    {
      id: 6,
      title: "Pronunciation Tips for Non-Native Speakers",
      excerpt: "Improve your English pronunciation with these practical exercises and techniques.",
      author: "James Wilson",
      date: "February 18, 2023",
      readTime: "6 min read",
      category: "Pronunciation",
      image: "pronunciation"
    }
  ]

  const categories = [
    { id: 1, name: "Learning Tips", count: 12 },
    { id: 2, name: "IELTS Preparation", count: 8 },
    { id: 3, name: "Business English", count: 7 },
    { id: 4, name: "Grammar", count: 9 },
    { id: 5, name: "Vocabulary", count: 11 },
    { id: 6, name: "Pronunciation", count: 5 }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                Knowledge Center
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                English Learning Blog
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Expert tips, strategies, and insights to help you master the English language.
              </p>
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="h-48 bg-gradient-to-r from-brand-400 to-accent-400 flex items-center justify-center">
                        <span className="text-white font-medium">{post.image}</span>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">{post.category}</Badge>
                          <Bookmark className="h-4 w-4 text-neutral-400 cursor-pointer hover:text-brand-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-neutral-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-brand-600 hover:text-brand-800 justify-between px-0">
                          Read Article <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white">
                    Load More Articles
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <a href="#" className="text-neutral-600 hover:text-brand-600 transition-colors">
                            {category.name}
                          </a>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular Posts */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-start space-x-3">
                          <div className="w-16 h-16 rounded bg-gradient-to-r from-brand-300 to-accent-300 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium line-clamp-2 mb-1">{post.title}</h4>
                            <div className="flex items-center text-xs text-neutral-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Newsletter */}
                <Card className="border-0 shadow-md bg-gradient-to-br from-brand-50 to-accent-50">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Subscribe to Our Newsletter</h3>
                    <p className="text-neutral-600 mb-4">Get the latest learning tips and updates delivered to your inbox.</p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                      <Button className="w-full bg-brand-500 hover:bg-brand-600">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Tags */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["Grammar", "Vocabulary", "IELTS", "Pronunciation", "Business", "Writing", "Listening", "Speaking"].map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}