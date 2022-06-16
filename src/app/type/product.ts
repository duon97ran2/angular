import { CategoryResponse } from "./category"

export type Product = {
  _id: string,
  name: string,
  price: number,
  newPrice: number,
  image: string[],
  stock: number,
  category: CategoryResponse,
  description: string,
  author: string,
  status: number
}
export type createType = {
  _id?: string,
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
  category: CategoryResponse,
  description: string,
  author: string,
  quantity: number,
  totalPrice: number;

}