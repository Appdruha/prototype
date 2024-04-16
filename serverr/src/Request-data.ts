export interface RequestData {
  requestNumber: string
  date: string
  companyName: string
  transporterName: string
  transporterPhone: string
  comments: string
  requestStatus: 'новая' | 'в работе' | 'завершено'
  ATICode: string
}