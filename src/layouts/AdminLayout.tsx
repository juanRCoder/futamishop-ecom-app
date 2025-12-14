
export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative max-w-7xl mx-auto outline-1 bg-white text-gray-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col bg-sidebar">{children}</div>
    </section>
  )
}
