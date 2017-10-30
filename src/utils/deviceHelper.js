const statusMap = {
  on: true,
  off: false,
  open: true,
  close: false
}

export const isActive = (status) => {
  if (typeof (status) === 'boolean') return status
  return statusMap[status]
}
