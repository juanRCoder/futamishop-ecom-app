import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AdminLayout } from "@/layouts/AdminLayout"
import { AdminProductCard } from "@/components/admin/AdminProductCard"


const ProductsAdmin = () => {
  const navigate = useNavigate()
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm z-10'>
        <ArrowLeft onClick={() => navigate('/admin/dashboard')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Productos</h2>
      </div>
      {/* CONTENT */}
      <div className="bg-gray-50 flex-1 flex flex-col px-3 gap-5 py-10">
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
        <AdminProductCard />
      </div>
    </AdminLayout>
  )
}

export default ProductsAdmin
