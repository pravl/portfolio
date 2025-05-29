import { useState } from 'react'
import type { FormEvent } from 'react'
import { sanitizeInput } from '../utils/inputSanitize'

const API_URL = import.meta.env.PROD 
  ? 'https://portfolio-w7e5.onrender.com/api/send-email'  // You'll replace this with your Render URL
  : 'http://localhost:3001/api/send-email'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    const sanitizedFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedFormData)
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="section">
      <div className="container max-w-2xl">
        <h2 className="hero-title">Get in Touch</h2>
        <p className="hero-subtitle">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-6">
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        {/* <div className="mt-12 text-center">
          <p className="text-secondary">
            You can also reach me at:{' '}
            <a
              href="mailto:pravaljain43@gmail.com"
              className="text-primary hover:underline"
            >
              pravaljain43@gmail.com
            </a>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default Contact 