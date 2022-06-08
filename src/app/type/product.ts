export type Product = {
  _id: string,
  name: string,
  price: number,
  newPrice: number,
  image: string[],
  stock: number,
  category: string,
  description: string,
  author: string,
}
export type createType = {
  name: string,
  price: number,
  newPrice: number,
  image: string[],
  stock: number,
  category: string,
  description: string,
  author: string,

}
export type CartType = {
  _id: string
  name: string,
  price: number,
  newPrice: number,
  image: string[],
  stock: number,
  category: string,
  description: string,
  author: string,
  quantity: number,
  totalPrice: number;

}