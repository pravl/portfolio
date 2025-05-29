const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'A full-stack web application built with React and Node.js',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/yourusername/project-one',
      demo: 'https://project-one.demo.com'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Mobile-responsive website with modern UI/UX',
      image: 'https://via.placeholder.com/400x300',
      technologies: ['React', 'TypeScript', 'CSS'],
      github: 'https://github.com/yourusername/project-two',
      demo: 'https://project-two.demo.com'
    }
  ]

  return (
    <div className="section">
      <div className="container">
        <h2 className="hero-title">My Projects</h2>
        <p className="hero-subtitle">
          Here are some of my recent projects. Each one is crafted with attention to detail and modern best practices.
        </p>

        <div className="blog-grid">
          {projects.map((project) => (
            <article key={project.id} className="blog-card animate-fade-in">
              <img src={project.image} alt={project.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-title">{project.title}</h3>
                <p className="blog-excerpt">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-sm bg-gray-100 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    View Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects 