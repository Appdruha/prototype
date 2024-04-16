import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import { DatePicker } from '@gravity-ui/date-components'
import { dateTime } from '@gravity-ui/date-utils'
import { useEffect } from 'react'

interface ControlledInputProps {
  name: string
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  existingValue?: string
}

export const ControlledDatePicker = ({ existingValue, name, rules = { required: 'Поле не заполнено' } }: ControlledInputProps) => {
  useEffect(() => {
    console.log(existingValue)
  }, [])
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = existingValue || null, onBlur, onChange }, fieldState: { error } }) => (
        <DatePicker
          onUpdate={(value) => {
            onChange(dateTime({input: value}).format('YYYY-MM-DD'))
          }
        }
          size='l'
          style={{ marginTop: '16px' }}
          value={value ? dateTime({input: value}) : null}
          errorPlacement='inside'
          errorMessage={error?.message}
          validationState={error && 'invalid'}
          onBlur={onBlur}
        />
      )}
    />
  )
}