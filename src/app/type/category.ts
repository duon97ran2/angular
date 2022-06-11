export type CategoryResponse = {
  name: string,
  _id: string,
  thumbnail: string[],
  status: number;
  createdAt: Date
}
export type CategoryRequest = {
  name?: string,
  thumbnail?: string[],
  status: number,
}