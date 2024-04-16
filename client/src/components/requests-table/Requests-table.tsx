import {
  Button,
  Select,
  Table,
  TableColumnConfig,
  TableDataItem, TextInput,
  withTableActions,
  withTableSorting,
} from '@gravity-ui/uikit'
import { RequestData } from '../../models/Request-data.ts'
import { RequestStatuses } from '../../models/RequestStatuses.ts'
import { ReactNode, useState } from 'react'
import styles from './request-table.module.css'

const columns: TableColumnConfig<any>[] = [
  { id: 'requestNumber', align: 'center', width: 120, meta: { sort: true } },
  {
    id: 'date', align: 'center', width: 120,
    meta: { sort: (a: RequestData, b: RequestData) => Date.parse(a.date) - Date.parse(b.date) },
  },
  { id: 'companyName', align: 'center', width: 120 },
  { id: 'transporterName', align: 'center', width: 120 },
  { id: 'transporterPhone', align: 'center', width: 120 },
  { id: 'comments', align: 'center', width: 120 },
  {
    id: 'requestStatus', align: 'center', width: 120,
    meta: { sort: (a: RequestData, b: RequestData) => RequestStatuses[a.requestStatus] - RequestStatuses[b.requestStatus] },
  },
  { id: 'ATILink', align: 'center', width: 120 },
]

interface RequestDataForTable extends RequestData {
  ATILink: ReactNode
}

interface RequestsTableProps {
  setModalData: React.Dispatch<React.SetStateAction<null | RequestData>>
  requests: RequestData[]
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const RequestsTable = ({ setModalData, requests, setIsModalOpen }: RequestsTableProps) => {
  const [requestStatusFilter, setRequestStatusFilter]
    = useState<'без опций' | 'новая' | 'в работе' | 'завершено'>('без опций')
  const [closeReadyRequests, setCloseReadyRequests] = useState(false)
  const [requestNumberTerm, setRequestNumberTerm] = useState('')

  const filterRows = (dataArr: RequestDataForTable[]) => {
    return dataArr.filter(data => {
      let isAcceptableRow = false
      if (closeReadyRequests && data.requestStatus === 'завершено') {
        return false
      }
      if (data.requestNumber.includes(requestNumberTerm)) {
        isAcceptableRow = true
      }
      if (requestStatusFilter === 'без опций' && isAcceptableRow) {
        return true
      }
      return data.requestStatus === requestStatusFilter && isAcceptableRow
    })
  }

  const createATILink = (dataArr: RequestData[]): RequestDataForTable[] => {
    return dataArr.map(data => ({
      ...data,
      ATILink: <a href={`https://ati.su/firms/${data.ATICode}/info`}>{`https://ati.su/firms/${data.ATICode}/info`}</a>,
    }))
  }

  const TableSorting = withTableSorting(Table)
  const TableActions = withTableActions(TableSorting)
  const getRowActions = () => {
    return [
      {
        text: 'Редактировать',
        handler: (item: TableDataItem) => {
          const data = item as RequestData
          setModalData(data)
          setIsModalOpen(true)
        },
      },
    ]
  }

  return (
    <>
      <Select
        defaultValue={['без опций']}
        options={[{ value: 'без опций', content: 'без опций' },
          { value: 'новая', content: 'новая' },
          { value: 'в работе', content: 'в работе' },
          { value: 'завершено', content: 'завершено' },
        ]}
        onUpdate={(values) => {
          const value = values[0] as 'без опций' | 'новая' | 'в работе' | 'завершено'
          setRequestStatusFilter(value)
        }}
      />
      <TextInput className={styles.input} placeholder='Поиск по номеру заявки'
                 onChange={(e) => setRequestNumberTerm(e.currentTarget.value)} />
      <Button className={styles.closeRequestsBtn} onClick={() => setCloseReadyRequests(!closeReadyRequests)}>
        {closeReadyRequests ? 'Показать все заявки' : 'Скрыть завершенные заявки'}
      </Button>
      <TableActions data={filterRows(createATILink(requests))} verticalAlign='middle' columns={columns}
                    getRowActions={getRowActions} />
    </>
  )
}