import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaMedium, FaHandPeace, FaArrowRight, FaEnvelope } from 'react-icons/fa'
import mediumPlaceholder from '../assets/medium-placeholder.jpg';
import linkedinPlaceholder from '../assets/linkedin-placeholder.jpg';
import DeveloperAvatar from '../components/DeveloperAvatar';
import TypingText from '../components/TypingText';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate-fade-in">
              <h1 className="hero-title">
                Hi, I'm Praval <span className="wave-emoji">
                  <FaHandPeace size={48} />
                </span>
              </h1>
              <p className="hero-subtitle">
                Learner | Tech Enthusiast | Software Engineer
              </p>
              <TypingText
                text="I build modern web applications and share my knowledge through writing. Passionate about creating seamless user experiences and solving complex problems."
                className="mb-8"
                typingSpeed={30}
                startDelay={1000}
              />
              <div className="flex gap-4">
                <Link to="/contact" className="btn btn-primary">
                  Contact Me <FaEnvelope />
                </Link>
                <Link to="/blog" className="btn btn-outline">
                  Read Blog <FaArrowRight />
                </Link>
              </div>
              <div className="flex gap-6 mt-8">
                <a
                  href="https://github.com/pravl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/praval-jain-aa346488/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                {/* <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  <FaTwitter size={24} />
                </a> */}
                <a
                  href="https://medium.com/@praval_jain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  <FaMedium size={24} />
                </a>
              </div>
            </div>
            <div className="hero-image animate-fade-in">
              <DeveloperAvatar />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Posts</h2>
          <p className="section-subtitle">Check out my latest articles and insights</p>
          
          <div className="featured-grid">
            <article className="featured-card">
              <div className="featured-image-container">
                <img
                  src={mediumPlaceholder}
                  alt="Latest from Medium"
                  className="featured-image"
                />
                <div className="featured-overlay">
                  <FaMedium size={32} />
                </div>
              </div>
              <div className="featured-content">
                <h3 className="featured-title">Latest from Medium</h3>
                <p className="featured-excerpt">
                  Deep dives into web development, best practices, and technical tutorials.
                </p>
                <a
                  href="https://medium.com/@praval_jain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-link"
                >
                  Read on Medium <FaArrowRight className="icon-right" />
                </a>
              </div>
            </article>

            <article className="featured-card">
              <div className="featured-image-container">
                <img
                  src={linkedinPlaceholder}
                  alt="Latest from LinkedIn"
                  className="featured-image"
                />
                <div className="featured-overlay">
                  <FaLinkedin size={32} />
                </div>
              </div>
              <div className="featured-content">
                <h3 className="featured-title">Latest from LinkedIn</h3>
                <p className="featured-excerpt">
                  Professional insights, industry updates, and career development tips.
                </p>
                <a
                  href="https://linkedin.com/in/praval-jain-aa346488/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-link"
                >
                  View on LinkedIn <FaArrowRight className="icon-right" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home 