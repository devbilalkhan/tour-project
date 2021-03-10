import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export const GlobalStyle: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      setIsActive(!isActive)
    }
  }
  return (
    <button className="focus:outline-none" onClick={switchTheme}>
      {theme === 'light' ? (
        <svg
          className="w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  )
}

function Navbar() {
  return (
    <header>
      <div className="py-8">
        <div className="grid grid-cols-3 gap-32">
          <div className="">
            <Link href="/">
              <a>
                <div className="flex items-center text-xl font-semibold tracking-ultra-widest">
                  TWORIST
                </div>
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <GlobalStyle />
          </div>
          <div className="flex justify-between  items-center font-semibold dark:text-gray-500 text-black">
            <Link href="/">
              <a>Signup</a>
            </Link>
            <Link href="/">
              <a>Login</a>
            </Link>
            <button className="bg-blue-beaut text-sm text-white font-bold px-4 py-2 rounded-md">
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
