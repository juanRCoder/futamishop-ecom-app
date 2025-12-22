import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { FormImg } from "@/components/FormImg";
import { FormInput } from "@/components/FormInput";
import type { CategoryType } from "@/types/categories.type";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { schemaProductForm, type TypeProductForm } from "@/schemas/product.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultProductForm } from "@/lib/default";
import {
  Button,
  DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Dialog,
  Field, FieldLabel,
  ScrollArea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui"

type AdminProductFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: 'create' | 'edit';
  id?: string;
}

export const AdminProductForm = ({ open, onOpenChange, mode = 'create', id }: AdminProductFormProps) => {
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = useState<File | null>(null); // For image upload handling
  const { data: product } = useProducts.useGetById(id || '');
  const { data: categories } = useCategories.AllCategories();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<TypeProductForm>({
    resolver: zodResolver(schemaProductForm),
    defaultValues: defaultProductForm
  })

  // methods
  const onSubmit = (data: TypeProductForm) => {
    if (imageFile) data.imageUrl = imageFile;
    console.log(data);

    queryClient.invalidateQueries({
      queryKey: ["allProducts"],
    });

    onOpenChange(false);
  }
  const resetForm = () => {
    reset(defaultProductForm);
    setImageFile(null);
  }

  // lifecycle
  useEffect(() => {
    if (product && mode === 'edit') {
      reset({
        name: product.payload.name,
        price: product.payload.price,
        stock: product.payload.stock,
        status: product.payload.status,
        categoryId: product.payload.Categories.id,
        imageUrl: product.payload.imageUrl,
        imagePublicId: product.payload.imagePublicId,
      })
    }
  }, [reset, product, mode])


  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      onOpenChange(isOpen);
    }}>
      <DialogContent
        className='flex max-h-[min(600px,90vh)] flex-col gap-0 p-0 sm:max-w-xl'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4'>
            {mode === 'create' ? 'Nuevo' : 'Editar'} Producto
          </DialogTitle>
          <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogDescription asChild>
                <div className="p-6 grid sm:grid-cols-2 gap-4">
                  <FormInput
                    id="name"
                    label="Nombre"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                  <FormInput
                    id="price"
                    label="Precio"
                    type="number"
                    step="any"
                    {...register("price", {
                      valueAsNumber: true,
                    })}
                    error={errors.price?.message}
                  />
                  <FormInput
                    id="stock"
                    label="Stock"
                    type="number"
                    {...register("stock", {
                      valueAsNumber: true,
                    })}
                    error={errors.stock?.message}
                  />
                  <Field>
                    <FieldLabel>Estado</FieldLabel>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="checkout-7j9-exp-status-f59">
                            <SelectValue placeholder="Disponible" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Disponible</SelectItem>
                            <SelectItem value="unavailable">Agotado</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.status && (
                      <p className="text-sm text-destructive">
                        {errors.status.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel>Categoría</FieldLabel>
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="checkout-7j9-exp-category-f59">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.payload
                              ?.filter((category: CategoryType) => Boolean(category.id))
                              .map((category: CategoryType) => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.categoryId && (
                      <p className="text-sm text-destructive">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel>Imagen</FieldLabel>
                    <FormImg
                      onChange={(file) => setImageFile(file)}
                      alt="Imagen del producto"
                    />
                  </Field>
                </div>
              </DialogDescription>
              <DialogFooter className='px-6 pb-6 sm:justify-end'>
                <DialogClose asChild>
                  <Button onClick={resetForm} type="button" variant='outline' className="cursor-pointer">
                    Salir
                  </Button>
                </DialogClose>
                <Button type='submit' className="cursor-pointer">
                  {mode === 'create' ? 'Crear' : 'Actualizar'} Producto
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
