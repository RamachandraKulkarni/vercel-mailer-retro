import './globals.css'
import { VT323 } from 'next/font/google'
import Script from 'next/script'

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
})

export const metadata = {
  title: 'Retro Contact Form',
  description: 'A retro-styled contact form',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${vt323.variable}`}>
        {children}
        <Script id="cursor-trail">
          {`
            function createCursorTrail() {
              const trail = [];
              const trailLength = 20;

              for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.className = 'cursor-trail';
                document.body.appendChild(dot);
                trail.push(dot);
              }

              window.addEventListener('mousemove', e => {
                trail.forEach((dot, index) => {
                  setTimeout(() => {
                    dot.style.left = e.pageX + 'px';
                    dot.style.top = e.pageY + 'px';
                  }, index * 30);
                });
              });
            }

            document.addEventListener('DOMContentLoaded', createCursorTrail);
          `}
        </Script>
      </body>
    </html>
  )
}

