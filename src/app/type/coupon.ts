export type CouponResponse = {
  name: string,
  code: string,
  amount_off: number,
  valid_users: Array<string>,
  status: number,
  redeem_times: number,
  _id: number
}
export type CouponRequest = {
  name: string,
  code: string,
  amount_off: number,
  valid_users: Array<string>,
  status: number,
  redeem_times: number
}