"use client"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-dark-navy to-accent-purple text-white py-6 text-center text-sm">
      <div className="container mx-auto px-4">
        <p>
          Developed by Sagar Nawaz <span className="text-red-500">❤️</span>
        </p>
        <p className="mt-2 text-gray-300">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
