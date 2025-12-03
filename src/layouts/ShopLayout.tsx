
import { LayoutGrid, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/voucher";

  return (
    <section className="relative max-w-7xl mx-auto outline-1 bg-white text-gray-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">{children}</div>
      {!hideFooter && (
        <footer className="w-full sticky bottom-0 py-5 flex justify-evenly border-t border-gray-200 bg-white">
          <Link to={'/'} className="flex flex-col items-center gap-1 cursor-pointer group">
            <LayoutGrid  className="group-hover:text-[#EC6D13]"/>
            <p className="group-hover:text-[#EC6D13]">Productos</p>
          </Link>
          <Link to={'/cart'} className="flex flex-col items-center gap-1 cursor-pointer group">
            <ShoppingCart className="group-hover:text-[#EC6D13]"/>
            <p className="group-hover:text-[#EC6D13]">Carrito</p>
          </Link>
        </footer>
      )}
    </section>
  );
}
