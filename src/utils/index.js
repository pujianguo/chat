import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const showMessage = (msg) => {
  window.$message.success(msg)
}
export const showWarningMessage = (msg) => {
  window.$message.warning(msg)
}


export default function classnames (...classes) {
  return twMerge(clsx(...classes))
}

export const copy = (data) => JSON.parse(JSON.stringify(data))
