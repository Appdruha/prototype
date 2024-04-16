import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ControlledInput } from '../controlled-input/Controlled-input.tsx'
import { ControlledSelect } from '../controlled-select/Controlled-select.tsx'
import { ControlledDatePicker } from '../controlled-date-picker/Controlled-date-picker.tsx'
import { Button } from '@gravity-ui/uikit'
import { RequestData } from '../../models/Request-data.ts'
import { createRequest, updateRequest } from '../../api/api.ts'
import styles from './request-modal.module.css'

interface RequestModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setModalData: React.Dispatch<React.SetStateAction<null | RequestData>>
  existingData: RequestData | null
  setRequests: React.Dispatch<React.SetStateAction<null | RequestData[]>>
}

export const RequestModal = ({ setIsModalOpen, setModalData, existingData, setRequests }: RequestModalProps) => {
  const formMethods = useForm<RequestData>({
    mode: 'onBlur',
    defaultValues: {
      requestNumber: existingData?.requestNumber,
      date: existingData?.date,
      companyName: existingData?.companyName,
      transporterName: existingData?.transporterName,
      transporterPhone: existingData?.transporterPhone,
      comments: existingData?.comments,
      requestStatus: existingData?.requestStatus,
      ATICode: existingData?.ATICode
    },
  })

  const {
    handleSubmit,
  } = formMethods

  const onSubmit: SubmitHandler<RequestData> = async (data) => {
    if (!existingData) {
      data.requestStatus = 'новая'
      createRequest(data).then(response => setRequests(response.data))
    } else {
      updateRequest(data).then(response => setRequests(response.data))
    }
    setIsModalOpen(false)
    setModalData(null)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <ControlledInput name='requestNumber' type='text' placeholder='Номер заявки'
                         existingValue={existingData?.requestNumber} />
        <ControlledDatePicker name='date' existingValue={existingData?.date} />
        <ControlledInput name='companyName' type='text' placeholder='Название фирмы'
                         existingValue={existingData?.companyName} />
        <ControlledInput name='transporterName' type='text' placeholder='ФИО перевозчика'
                         existingValue={existingData?.transporterName} />
        <ControlledInput name='transporterPhone' type='tel' placeholder='Контактный телефон перевозчика'
                         existingValue={existingData?.transporterPhone} />
        <ControlledInput name='comments' type='text' placeholder='Комментарии' existingValue={existingData?.comments} />
        {existingData && <ControlledSelect name='requestStatus' existingValue={existingData?.requestStatus} options={
          [{ value: 'новая', content: 'новая' },
            { value: 'в работе', content: 'в работе' },
            { value: 'завершено', content: 'завершено' },
          ]}
        />}
        <ControlledInput name='ATICode' type='text' placeholder='ATI код' existingValue={existingData?.ATICode} />
        <Button className={styles.submitBtn} type='submit' view='action'
                size='l'>{existingData ? 'Сохранить' : 'Создать заявку'}</Button>
        <Button className={styles.closeBtn} onClick={() => {
          setIsModalOpen(false)
          setModalData(null)
        }}>Закрыть</Button>
      </form>
    </FormProvider>
  )
}