import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">My Awesome Company</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">We'd love to hear from you. Fill out the form below to send us a message.</p>
            <ContactForm />
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2023 My Awesome Company. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

