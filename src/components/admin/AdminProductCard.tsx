import { useState } from "react"
import { Edit2, Trash2 } from "lucide-react"
import { Button, Card, CardContent } from "@/components/ui"
import type { ProductType } from "@/types/products.type"
import { AdminProductForm } from "./AdminProductForm"

type AdminProductCardProps = {
  product: ProductType
}

export const AdminProductCard = ({ product }: AdminProductCardProps) => {
  const [modalForm, setModalForm] = useState<boolean>(false)

  return (
    <Card className='flex flex-row items-center justify-between px-4'>
      <CardContent className="flex gap-6 px-0">
        <div className="flex justify-center items-center rounded-xl">
          <img
            src={product.imageUrl || '/default-img.png'}
            className={`object-contain w-24 h-24 rounded-xl outline-1 outline-border`}
          />
        </div>
        <div className="flex flex-col gap-1 text-primary">
          <p className="font-semibold text-lg">{product.name}</p>
          <p className="font-medium">{product.Categories?.name}</p>
          <p className="text-foreground">${product.price.toFixed(2)}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </CardContent>
      <CardContent className="flex flex-col px-0">
        <Button onClick={() => setModalForm(true)} variant='ghost' className="h-16 w-16 cursor-pointer rounded-full">
          <Edit2 className="text-foreground size-5" />
        </Button>
        <Button variant='ghost' className="h-16 w-16 cursor-pointer rounded-full">
          <Trash2 className="text-destructive size-5" />
        </Button>
      </CardContent>
      <AdminProductForm open={modalForm} onOpenChange={setModalForm} mode="edit" id={product.id}/>
    </Card>
  )
}
