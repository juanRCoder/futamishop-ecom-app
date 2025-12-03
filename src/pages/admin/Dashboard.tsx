import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BoxIcon, ChevronRight, LayoutGrid, NotepadText } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const adminActions = [
    {
      icon: BoxIcon,
      title: "Productos",
      link: "/admin/products",
      description: "Gestionar productos y stock",
    },
    {
      icon: LayoutGrid,
      title: "Categorias",
      link: "products",
      description: "Organizar categorias",
    },
    {
      icon: NotepadText,
      title: "Ordenes",
      link: "products",
      description: "Ver y administrar ordenes",
    },
  ];

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm z-10'>
        <ArrowLeft onClick={() => navigate('/')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Panel de administración </h2>
      </div>
      {/* CONTENT */}
      <div className="bg-gray-50 flex-1 flex flex-col px-3 gap-5">
        <div className="flex flex-col justify-center items-center mt-10 py-5 rounded-md bg-white shadow-sm">
          <img
            src="/user_default.png"
            className="h-36 w-36 border-8 border-[#EEE] rounded-full shadow-xl"
          />
          <p className="mt-6 mb-1 text-3xl font-semibold">Ricardo</p>
          <p className="text-2xl text-gray-500">Administrador</p>
        </div>
        <section className="flex flex-col gap-5 my-10">
          {adminActions.map(action => (
            <Link key={action.title} to={action.link} className="flex items-center justify-between gap-4 py-4 px-3 cursor-pointer rounded-md bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <action.icon size={40} />
                <div>
                  <p className="font-semibold text-lg">{action.title}</p>
                  <p className="text-gray-500">{action.description}</p>
                </div>
              </div>
              <ChevronRight size={40} color="#999" strokeWidth={1.5} />
            </Link>
          ))}
        </section>
      </div>
    </AdminLayout>
  )
}

export default Dashboard;