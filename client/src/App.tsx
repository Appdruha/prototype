import { Button, Modal } from '@gravity-ui/uikit'
import { RequestModal } from './components/request-modal/Request-modal.tsx'
import { RequestsTable } from './components/requests-table/Requests-table.tsx'
import { useEffect, useState } from 'react'
import { RequestData } from './models/Request-data.ts'
import { getRequests } from './api/api.ts'
import styles from './app.module.css'

export const App = () => {
  const [modalData, setModalData] = useState<null | RequestData>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [requests, setRequests] = useState<null | RequestData[]>(null)

  useEffect(() => {
    getRequests().then(response => {
      setRequests(response.data)
    })
  }, [])

  return (
    <main className={styles.container}>
      {!!requests &&
        <>
          <RequestsTable requests={requests} setIsModalOpen={setIsModalOpen} setModalData={setModalData} />
          <Button className={styles.createRequestBtn} onClick={() => setIsModalOpen(true)}>Создать заявку</Button>
          <Modal open={isModalOpen}>
            <RequestModal setRequests={setRequests} setModalData={setModalData} setIsModalOpen={setIsModalOpen} existingData={modalData} />
          </Modal>
        </>
      }
    </main>
  )
}