import { Select } from '@gravity-ui/uikit'
import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import styles from './controlled-select.module.css'

interface ControlledSelectProps {
  name: string
  options: { value: any, content: string }[]
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  existingValue?: 'новая' | 'в работе' | 'завершено'
}

export const ControlledSelect = ({ existingValue, name, rules = { required: 'Поле не заполнено' }, options }: ControlledSelectProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = [existingValue] || [options[0].value], onBlur, onChange }, fieldState: { error } }) => (
        <Select
          className={styles.select}
          size='l'
          errorPlacement='inside'
          options={options}
          errorMessage={error?.message}
          validationState={error && 'invalid'}
          onBlur={onBlur}
          value={[value]}
          onUpdate={(value) => onChange(value[0])}
        />
      )}
    />
  )
}