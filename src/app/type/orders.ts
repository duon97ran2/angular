export type orderRequest = {
  products: [{
    _id: string,
    name: string,
    price: number,
    newPrice: number,
    image: string[],
    stock: number,
    category: string,
    description: string,
    author: string,
    status: number,
    quantity: number
  }],
  name: string,
  email: string,
  phone: string,
  address: string,
  total: number,
  shipping: number
}
export type orderResponse = {
  products: [{
    _id: string,
    name: string,
    price: number,
    newPrice: number,
    image: string[],
    stock: number,
    category: string,
    description: string,
    author: string,
    status: number,
    quantity: number
  }],
  name: string,
  phone: string,
  email: string,
  address: string,
  total: number,
  shipping: number,
  status: number,
  _id: string
}