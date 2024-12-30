'use client'

import { useState, useEffect } from 'react'
import { sendEmail } from '../actions/sendEmail'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ReloadIcon } from '@radix-ui/react-icons'

export default function RetroContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setIsEmailValid(false)
      return
    }
    setStatus('loading')

    try {
      const result = await sendEmail({ name, email, message })

      if (result.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 3000)
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsEmailValid(true)
  }

  return (
    <Card className="border-4 border-[#00FF00] bg-[#000000] p-6 shadow-[0_0_20px_rgba(0,255,0,0.3)] relative overflow-hidden">
      <div 
        className="absolute w-20 h-20 rounded-full bg-[#00FF00] opacity-10 blur-xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${cursorPosition.x - 40}px`,
          top: `${cursorPosition.y - 40}px`,
        }}
      />
      <div className="space-y-6 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#00FF00] mb-2 font-['VT323',monospace] glitch" data-text="<CONTACT/>">
            {'<CONTACT/>'}
          </h1>
          <div className="h-1 bg-[#00FF00] w-full mb-6" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="block text-[#00FF00] text-sm font-mono"
            >
              {'> NAME:'}
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-2 border-[#00FF00] bg-black text-[#00FF00] font-mono placeholder:text-[#00FF00]/50 hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-shadow duration-300"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-[#00FF00] text-sm font-mono"
            >
              {'> EMAIL:'}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={`border-2 ${isEmailValid ? 'border-[#00FF00]' : 'border-red-500'} bg-black text-[#00FF00] font-mono placeholder:text-[#00FF00]/50 hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-shadow duration-300`}
              placeholder="john@example.com"
            />
            {!isEmailValid && (
              <p className="text-red-500 text-xs font-mono">Please enter a valid email address</p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="message" 
              className="block text-[#00FF00] text-sm font-mono"
            >
              {'> MESSAGE:'}
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="border-2 border-[#00FF00] bg-black text-[#00FF00] font-mono placeholder:text-[#00FF00]/50 resize-none hover:shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-shadow duration-300"
              placeholder="Enter your message here..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#00FF00] text-black font-mono py-2 px-4 border-2 border-[#00FF00] hover:bg-black hover:text-[#00FF00] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <ReloadIcon className="animate-spin" />
                  SENDING...
                </span>
              ) : '> SEND MESSAGE'}
            </span>
            <span className="absolute inset-0 bg-[#00FF00] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
          </button>

          {status === 'success' && (
            <div className="text-[#00FF00] font-mono text-center mt-4 animate-pulse" role="alert">
              {'> MESSAGE SENT SUCCESSFULLY!'}
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-500 font-mono text-center mt-4 animate-pulse" role="alert">
              {'> ERROR: MESSAGE FAILED TO SEND'}
            </div>
          )}
        </form>
      </div>
    </Card>
  )
}

