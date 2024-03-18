import { ChangeEvent } from 'react'
import { IDataForm } from '../interfaces'

export const cpfMask = (value: ChangeEvent<HTMLInputElement>) => {
  value.currentTarget.value = value.currentTarget.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const phonenumberMask = (value: ChangeEvent<HTMLInputElement>) => {
  value.currentTarget.value = value.currentTarget.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export const removeMasks = (dataForm: IDataForm) => {
  dataForm.cpf = dataForm.cpf.replace(/[.-]/g, '')
  dataForm.phonenumber = dataForm.phonenumber.replace(/[()-\s]/g, '')
  return dataForm
}
