import { useMemo, useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShopLayout from '@/layouts/ShopLayout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
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
      <div className='bg-background text-foreground flex p-4 border-b'>
        <h2 className="text-2xl text-center flex-1 font-semibold">FutamiShop</h2>
        <div
          onClick={() => navigate('/cart')}
          className='flex items-center justift-center relative cursor-pointer'
        >
          {items.length > 0 && (
            <span className='outline-1 bg-accent flex items-center justify-center absolute right-7 bottom-2 z-50 rounded-full size-7 text-sm'>
              {items.length}
            </span>
          )}
          <ShoppingCart className='absolute right-4' />
        </div>
      </div>
      <div className='pt-4 px-4 flex flex-col gap-4'>
        <div className='flex gap-2 bg-input rounded-xl p-3'>
          <Search />
          <input
            type='text'
            placeholder='Buscar productos'
            value={searchTerm}
            onChange={(e) => handleSearchProducts(e)}
            className='w-full outline-none border-none'
          />
        </div>
        <div className="scrollbar-custom flex gap-2 overflow-x-auto">
          {errorCategories && (
            <span className="text-destructive">{errorCategories.message}</span>
          )}
          {categoriesWithAll?.map((ctg: categoryList) => (
            <Button
              key={ctg.id}
              variant='outline'
              className='cursor-pointer rounded-md select-none'
              onClick={() => handleProductsByCategory(ctg)}
            >
              {ctg.name}
            </Button>
          ))}
        </div>
      </div>
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <span className="block border-5 border-l-transparent w-12 h-12 rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <span className="text-destructive">{error.message}</span>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((prd: productList) => (
              <ProductCard key={prd.id} product={prd} />
            ))
          ) : (
            <div className="text-foreground col-span-full text-center py-10 select-none">
              No se encontraron productos con "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </ShopLayout>
  )
}

export default Products;
