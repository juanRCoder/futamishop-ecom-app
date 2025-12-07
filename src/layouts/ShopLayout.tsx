import { LayoutGrid, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/voucher";

  return (
    <section className="relative max-w-7xl mx-auto min-h-screen flex flex-col outline-1">
      <div className="flex-1 flex flex-col bg-sidebar text-primary">{children}</div>
      {!hideFooter && (
        <footer className="w-full sticky bottom-0 py-5 flex justify-evenly border-t bg-background text-primary">
          <Link to={'/'} className="flex flex-col items-center gap-1 cursor-pointer group">
            <LayoutGrid  className="group-hover:text-muted-foreground"/>
            <p className="group-hover:text-muted-foreground">Productos</p>
          </Link>
          <Link to={'/cart'} className="flex flex-col items-center gap-1 cursor-pointer group">
            <ShoppingCart className="group-hover:text-muted-foreground"/>
            <p className="group-hover:text-muted-foreground">Carrito</p>
          </Link>
        </footer>
      )}
    </section>
  );
}
