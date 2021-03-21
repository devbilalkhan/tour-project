import Navbar from './Navbar'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="container max-w-6xl mx-auto">
      <Navbar />
      {children}
    </div>
  )
}
