import { useMemo, useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShopLayout from '@/layouts/ShopLayout';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useDebounce } from '@/hooks/useDebounce';
import { useCartStore } from '@/stores/cart.store';
import type { productList } from '@/types/products.type';
import type { categoryList } from '@/types/categories.type';


const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [onCategory, setOnCategory] = useState<string>('Todos')
  const [categoryId, setCategoryId] = useState<string>('')

  const navigate = useNavigate()
  const { items } = useCartStore()
  const debouncedSearch = useDebounce(searchTerm, 400);
  const { data: allProducts, isLoading: loadingAll, error: errorAll } = useProducts.AllProducts(debouncedSearch)
  const { data: productsByCategory, isLoading: loadingCategory, error: errorCategory } = useProducts.ProductsByCategory(categoryId)
  const { data: allCategories, error: errorCategories } = useCategories.AllCategories()

  const categoriesWithAll = useMemo(() => {
    if (errorCategories) return allCategories?.payload || [];

    const base = allCategories?.payload || [];
    return [{ id: "", name: "Todos" }, ...base];
  }, [allCategories, errorCategories]);


  const handleProductsByCategory = (ctg: categoryList) => {
    setOnCategory(ctg.name)
    setCategoryId(ctg.id)
    setSearchTerm('')
  }

  const handleSearchProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== '') {
      setOnCategory('Todos');
      setCategoryId('');
    }
  }

  const filteredProducts = onCategory === 'Todos' ? allProducts?.payload : productsByCategory?.payload
  const loading = loadingAll || loadingCategory;
  const error = errorAll || errorCategory;

  return (
    <ShopLayout>
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm'>
        <h2 className="text-2xl text-center flex-1 font-semibold">FutamiShop</h2>
        <div
          onClick={() => navigate('/cart')}
          className='flex items-center justift-center relative cursor-pointer'
        >
          {items.length > 0 && (
            <span className='flex items-center justify-center absolute right-7 bottom-0 z-50 bg-orange-500 text-white rounded-full size-7 text-sm'>
              {items.length}
            </span>
          )}
          <ShoppingCart className='absolute right-4' />
        </div>
      </div>
      {/* CONTENT */}
      <div className='py-4 px-3'>
        <div className='flex gap-2 bg-gray-100 rounded-xl p-3'>
          <Search color='#767D8A' />
          <input
            type='text'
            placeholder='Buscar productos'
            value={searchTerm}
            onChange={(e) => handleSearchProducts(e)}
            className='w-full outline-none border-none'
          />
        </div>
      </div>
      <div className="scrollbar-custom flex gap-3 pb-4 px-3 overflow-x-auto">
        {errorCategories && (
          <div className="flex-1 flex items-center gap-4">
            <span className="text-red-500">{errorCategories.message}</span>
          </div>
        )}
        {categoriesWithAll?.map((ctg: categoryList) => (
          <span
            key={ctg.id}
            className={`cursor-pointer py-1.5 px-3 rounded-4xl select-none
              ${onCategory === ctg.name ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}
              `}
            onClick={() => handleProductsByCategory(ctg)}
          >
            {ctg.name}
          </span>
        ))}
      </div>
      {loading && (
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <span className="block border-5 border-orange-500 border-l-transparent w-12 h-12 rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="flex-1 flex items-center justify-center gap-4">
          <span className="text-red-500">{error.message}</span>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 bg-gray-50 py-4">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((prd: productList) => (
              <ProductCard key={prd.id} product={prd} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10 select-none">
              No se encontraron productos
            </div>
          )}
        </div>
      )}
    </ShopLayout>
  )
}

export default Products;
