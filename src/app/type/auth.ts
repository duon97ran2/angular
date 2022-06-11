export type LoginType = {
  email: string,
  password: string
}
export type LoginResponse = {
  email: string,
  _id: string,
  avatar: string[],
  username?: string
}