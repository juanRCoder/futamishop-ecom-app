
import { LayoutGrid, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hideFooter = pathname === "/voucher";

  const toNavigate = (path: string) => {
    navigate(path)
  }
  return (
    <section className="relative max-w-7xl mx-auto outline-1 bg-white text-gray-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">{children}</div>
      {!hideFooter && (
        <footer className="w-full sticky bottom-0 py-5 flex justify-evenly border-t border-gray-200 bg-white">
          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => toNavigate('/')}>
            <LayoutGrid  className="group-hover:text-[#EC6D13]"/>
            <p className="group-hover:text-[#EC6D13]">Productos</p>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => toNavigate('/cart')}>
            <ShoppingCart className="group-hover:text-[#EC6D13]"/>
            <p className="group-hover:text-[#EC6D13]">Carrito</p>
          </div>
        </footer>
      )}
    </section>
  );
}
