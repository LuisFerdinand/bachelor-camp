'use client'

import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "5 Tips to Improve Your English Speaking Skills",
      excerpt: "Discover practical strategies to enhance your English speaking fluency and confidence in everyday conversations.",
      date: "May 15, 2023",
      author: "Sarah Johnson",
      category: "Learning Tips",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding IELTS Scoring: A Complete Guide",
      excerpt: "Learn how IELTS is scored across all four sections and what you need to do to achieve your target band score.",
      date: "April 28, 2023",
      author: "Michael Chen",
      category: "IELTS Preparation",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "The Benefits of Immersive Language Learning",
      excerpt: "Explore how immersive learning environments can accelerate your language acquisition and cultural understanding.",
      date: "April 10, 2023",
      author: "Emily Williams",
      category: "Learning Methods",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Business English: Essential Vocabulary for Professionals",
      excerpt: "Master key business English terms and phrases that will help you communicate effectively in professional settings.",
      date: "March 22, 2023",
      author: "David Brown",
      category: "Business English",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "How to Prepare for the TOEFL Test: Expert Strategies",
      excerpt: "Get expert advice on preparing for the TOEFL test, including study plans and practice techniques.",
      date: "March 5, 2023",
      author: "Lisa Anderson",
      category: "Test Preparation",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "The Importance of Grammar in English Communication",
      excerpt: "Understand why grammar matters in effective communication and how to improve your grammatical accuracy.",
      date: "February 18, 2023",
      author: "Robert Taylor",
      category: "Grammar",
      readTime: "6 min read"
    }
  ];

  const categories = [
    "All",
    "Learning Tips",
    "IELTS Preparation",
    "Learning Methods",
    "Business English",
    "Test Preparation",
    "Grammar"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Insights, tips, and resources to help you on your English learning journey.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background-primary flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    index === 0
                      ? 'bg-primary-600 text-white'
                      : 'bg-background-secondary text-text-secondary hover:bg-primary-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="bg-gradient-secondary rounded-xl overflow-hidden shadow-medium">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 text-white">
                  <div className="text-sm font-medium mb-2">Featured Post</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">The Future of English Language Learning</h2>
                  <p className="mb-6 opacity-90">Explore how technology and innovative teaching methods are shaping the future of English education worldwide.</p>
                  <div className="flex items-center text-sm mb-6">
                    <span>By Alex Johnson</span>
                    <span className="mx-2">•</span>
                    <span>June 1, 2023</span>
                    <span className="mx-2">•</span>
                    <span>10 min read</span>
                  </div>
                  <Link href="/blog/the-future-of-english-language-learning" className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block">
                    Read Article
                  </Link>
                </div>
                <div className="md:w-1/2 h-64 md:h-auto bg-gradient-subtle"></div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-background-secondary rounded-xl shadow-medium overflow-hidden hover:shadow-glow transition-shadow">
                <div className="h-48 bg-gradient-subtle"></div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-text-muted mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{post.title}</h3>
                  <p className="text-text-secondary mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary-600">{post.category}</span>
                    <Link href={`/blog/${post.id}`} className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-background-secondary rounded-xl shadow-medium p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-text-secondary max-w-2xl mx-auto mb-6">
              Get the latest articles, learning tips, and exclusive resources delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}