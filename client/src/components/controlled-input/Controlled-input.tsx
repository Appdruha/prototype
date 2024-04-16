import { Controller, FieldValues, RegisterOptions } from 'react-hook-form'
import { TextInput } from '@gravity-ui/uikit'

interface ControlledInputProps {
  name: string
  type: 'number' | 'search' | 'text' | 'tel' | 'url' | 'email' | 'password' | undefined
  placeholder: string
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  existingValue?: string
}

export const ControlledInput = (
  {
    name,
    type = 'text',
    placeholder,
    existingValue,
    rules = { required: 'Поле не заполнено' },
  }: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field: { value = existingValue || '', onChange, onBlur }, fieldState: { error } }) => (
        <TextInput
          size='l'
          style={{marginTop: '16px'}}
          errorPlacement='inside'
          placeholder={placeholder}
          type={type}
          errorMessage={error?.message}
          validationState={error && 'invalid'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  )
}