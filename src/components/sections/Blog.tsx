import React from 'react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  slug: string
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'The Future of Web Design: Trends to Watch in 2024',
      excerpt: 'Explore the latest trends shaping the future of web design, from AI-powered interfaces to sustainable design practices.',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Design Trends',
      image: '/images/blog/web-design-trends.jpg',
      slug: 'future-of-web-design-2024'
    },
    {
      id: 'post-2',
      title: 'Building Accessible React Components: A Complete Guide',
      excerpt: 'Learn how to create React components that are accessible to all users, including best practices and common pitfalls to avoid.',
      date: 'March 8, 2024',
      readTime: '8 min read',
      category: 'Development',
      image: '/images/blog/accessible-react.jpg',
      slug: 'accessible-react-components-guide'
    },
    {
      id: 'post-3',
      title: 'UX Research Methods That Actually Work',
      excerpt: 'Discover practical UX research methods that provide actionable insights and improve user satisfaction.',
      date: 'February 28, 2024',
      readTime: '6 min read',
      category: 'UX Research',
      image: '/images/blog/ux-research.jpg',
      slug: 'ux-research-methods-that-work'
    },
    {
      id: 'post-4',
      title: 'Optimizing React Performance: Tips and Tricks',
      excerpt: 'Learn advanced techniques to optimize your React applications for better performance and user experience.',
      date: 'February 20, 2024',
      readTime: '7 min read',
      category: 'Development',
      image: '/images/blog/react-performance.jpg',
      slug: 'optimizing-react-performance'
    },
    {
      id: 'post-5',
      title: 'Design Systems: Building Consistency at Scale',
      excerpt: 'How to create and maintain design systems that scale with your organization and ensure consistent user experiences.',
      date: 'February 12, 2024',
      readTime: '9 min read',
      category: 'Design Systems',
      image: '/images/blog/design-systems.jpg',
      slug: 'design-systems-consistency-at-scale'
    },
    {
      id: 'post-6',
      title: 'The Psychology of Color in UI Design',
      excerpt: 'Understanding how color affects user behavior and emotions, and how to use this knowledge in your designs.',
      date: 'February 5, 2024',
      readTime: '4 min read',
      category: 'Design Theory',
      image: '/images/blog/color-psychology.jpg',
      slug: 'psychology-of-color-ui-design'
    }
  ]

  const handleReadMore = (slug: string) => {
    // This would typically navigate to the full blog post
    console.log('Navigate to blog post:', slug)
  }

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on design, development, and the ever-evolving 
            world of digital experiences.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Featured Post Image */}
              <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-6xl">📝</span>
              </div>

              {/* Featured Post Content */}
              <div className="p-8 lg:p-12 text-white">
                <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-4">
                  Featured
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-100 text-sm">
                    <span>{blogPosts[0].date}</span>
                    <span className="mx-2">•</span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <button
                    onClick={() => handleReadMore(blogPosts[0].slug)}
                    className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Post Image */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-3xl">📄</span>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Category */}
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full mb-3">
                  {post.category}
                </span>

                {/* Post Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Post Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => handleReadMore(post.slug)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Read Article
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors duration-300">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  )
}

export default Blog