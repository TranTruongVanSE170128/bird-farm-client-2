import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { OrderNestStatus, Role, Voucher } from './types'
import moment from 'moment'
import 'moment/dist/locale/vi'

moment.locale('vi')

// generated by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// created by chatgpt
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
  return base64Regex.test(imageData)
}

//created by google bard
export const generateRandomHexCode = () => {
  const randomNumber = Math.floor(Math.random() * 16777215)
  return randomNumber.toString(16)
}

export function formatPrice(num: number) {
  return Number(num).toLocaleString().replaceAll(',', '.') + 'đ'
}

// created by chatgpt
export function calculateAge(birthday: Date | string | undefined): string {
  if (!birthday) return 'Không có thông tin'
  const now = moment()
  const birthdayMoment = moment(birthday, 'YYYY-MM-DD')

  if (!birthdayMoment.isValid()) {
    throw new Error('Lỗi ngày sinh')
  }

  const ageInMonths = now.diff(birthdayMoment, 'months')
  return ageInMonths + ' tháng tuổi'
}

export function calculateTime(time: Date | string | undefined): string {
  moment.locale('vi')
  return moment(time).locale('vi').fromNow()
}

export function calculateDiscount(originPrice: number, voucher: Voucher, userId: string | undefined): number {
  if (voucher.users.includes(userId || '')) {
    return 0
  }
  if (voucher.quantity <= 0) {
    return 0
  }
  if (voucher.expiredAt < new Date()) {
    return 0
  }
  if (originPrice < voucher.conditionPrice) {
    return 0
  }
  const discountByPercent = Math.round((originPrice * voucher.discountPercent) / 100)
  return discountByPercent > voucher.maxDiscountValue ? voucher.maxDiscountValue : discountByPercent
}

export function calculateExpired(time: Date | string | undefined) {
  moment.locale('vi')
  const now = moment()
  const diff = moment(time).diff(now)

  const duration = moment.duration(diff)

  return duration.humanize()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addSearchParams(url: string, params: Record<string, any>) {
  url += '?'
  Object.keys(params).forEach((key) => {
    if (params[key]) url += key.toString() + '=' + params[key].toString() + '&'
  })
  return url
}

export const roleToVi: Record<Role, string> = {
  admin: 'Quản trị viên',
  customer: 'Khách hàng',
  guest: '',
  manager: 'Quản lý',
  staff: 'Nhân viên'
}

export const roleToVariant: Record<Role, Variant> = {
  admin: 'info',
  customer: 'breed',
  manager: 'warning',
  staff: 'success',
  guest: 'destructive'
}

export const statusToVi: Record<OrderNestStatus, string> = {
  processing: 'Đang chờ xử lý',
  delivering: 'Đang vận chuyển',
  success: 'Hoàn thành',
  canceled: 'Đã hủy',
  breeding: 'Đang phối giống',
  'wait-for-payment': 'Chờ thanh toán'
}

export const statusToMessage: Record<OrderNestStatus, string> = {
  processing: 'Đơn hàng đang được chuẩn bị',
  delivering: 'Đơn hàng đang trên đường đến tay bạn',
  success: 'Đơn hàng đã được giao thành công',
  canceled: 'Đơn hàng đã bị hủy',
  breeding: 'Tổ chim đang trong quá trình phát triển',
  'wait-for-payment': 'Tổ chim đã sẵn sàng vận chuyển, hãy thanh toán phần còn lại'
}

type Variant = 'warning' | 'info' | 'success' | 'destructive' | 'breed'

export const statusToVariant: Record<OrderNestStatus, Variant> = {
  processing: 'warning',
  delivering: 'info',
  breeding: 'breed',
  success: 'success',
  canceled: 'destructive',
  'wait-for-payment': 'info'
}

const options: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
}

export const formatDate = (date: Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('vi', options)
}
