export interface createOrderDto {
  guestUserName: string;
  guestUserPhone: string;
  typeOfDelivery: string;
  guestUserAddress?: string;
  typeOfPayment: string;
  imageVoucher?: string;
  notes?: string;
}

export interface orderedProductDto {
  id: string,
  quantity: number
  price: number
}