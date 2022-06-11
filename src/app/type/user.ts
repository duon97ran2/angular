export type UserResponse = {
  email: string,
  username: string,
  status: number,
  role: number,
  avatar: string[],
  password: string,
  _id: string
}
export type UserRequest = {
  email: string,
  username: string,
  status: number,
  avatar: string[],
  password: string,
  role: number,
}