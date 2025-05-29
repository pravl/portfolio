import { useState, useEffect } from 'react'
import cssPlaceholder from '../assets/css-post-placeholder.jpg';
import javascriptPlaceholder from '../assets/javascript-post-placeholder.jpg';
import htmlAccessibilityPlaceholder from '../assets/html-accessibility-placeholder.jpg';

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  url: string
  source: 'linkedin' | 'medium'
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated data - Replace with actual API calls to Medium and LinkedIn
    const fetchPosts = async () => {
      try {
        // Example data structure
        const samplePosts: BlogPost[] = [
          {
            id: '1',
            title: 'CSS Property content-visibility ',
            excerpt: 'Discover how the content-visibility CSS property can significantly improve your website\'s rendering performance...',
            date: '2019-09-22',
            image: cssPlaceholder,
            url: 'https://www.linkedin.com/posts/praval-jain-aa346488_css-webdevelopment-performanceoptimization-activity-7332292915488010240-bUgH?utm_source=share&utm_medium=member_desktop&rcm=ACoAABKTtxsB51DHcjM3Df9RzmbHLljsUHYjS58',
            source: 'linkedin',
          },
          {
            id: '4',
            title: 'CSS Property @scope',
            excerpt: 'Exploring the new @scope CSS feature and how it revolutionizes style scoping and component isolation...',
            date: '2019-09-22',
            image: cssPlaceholder,
            url: 'https://www.linkedin.com/posts/praval-jain-aa346488_css-webdevelopment-frontend-activity-7330985093387255809--WY6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABKTtxsB51DHcjM3Df9RzmbHLljsUHYjS58',
            source: 'linkedin',
          },
          {
            id: '2',
            title: 'React App authentication With MSAL.js',
            excerpt: 'A comprehensive guide to implementing Microsoft Authentication Library (MSAL.js) in your React applications...',
            date: '2019-09-22',
            image: javascriptPlaceholder,
            url: 'https://medium.com/praval-jain/react-app-authentication-with-msal-js-a5b09b7ceb4e',
            source: 'medium'
          },
          {
            id: '3',
            title: 'Use of Sub-Resource Integrity in CDNs',
            excerpt: 'Learn how to enhance security when using CDNs by implementing Sub-Resource Integrity checks...',
            date: '2019-09-29',
            image: javascriptPlaceholder,
            url: 'https://medium.com/@praval_jain/use-of-sub-resource-integrity-in-cdns-b0242b1dba72',
            source: 'medium'
          },
          {
            id: '5',
            title: 'Unfold the Web Accessibility',
            excerpt: 'An introduction to web accessibility principles and practices for creating inclusive digital experiences...',
            date: '2020-03-01',
            image: htmlAccessibilityPlaceholder,
            url: 'https://medium.com/@praval_jain/unfold-the-web-accessibility-part-1-1e7325eb0b33',
            source: 'medium'
          },
          // Add more sample posts
        ]

        setPosts(samplePosts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <h2 className="hero-title">Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="hero-title">Blog Posts</h2>
        <p className="hero-subtitle">
          Thoughts and insights about web development, technology, and more.
        </p>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card animate-fade-in">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.source === 'medium' ? 'Medium' : 'LinkedIn'}</span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ marginTop: '1rem' }}
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog 