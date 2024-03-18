import { yupResolver } from '@hookform/resolvers/yup'
import { FiMail, FiPhone, FiUser } from 'react-icons/fi'
import { HiOutlineIdentification } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { ClientFormProps, IDataForm } from '../../interfaces'
import styles from './styles.module.scss'
import { CustomInput } from '../../components/Input'
import { Button } from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { validationSchema } from '../../schemas'
import { cpfMask, phonenumberMask } from '../../utils/masks'
import { useEffect } from 'react'

export default function ClientForm({ onSubmit, clientData }: ClientFormProps) {
  const navigate = useNavigate()
  const params = useParams()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IDataForm>({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    if (clientData) {
      setValue('name', clientData.name)
      setValue('email', clientData.email)
      setValue(
        'cpf',
        clientData.cpf
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
      )
      setValue(
        'phonenumber',
        clientData.phonenumber
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4,5})(\d{4})/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      )
      setValue('status', clientData.status)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off" autoCapitalize="off">
      <CustomInput placeholder={'Nome'} Icon={FiUser} {...register('name')} error={errors.name} />

      <CustomInput placeholder={'E-mail'} Icon={FiMail} {...register('email')} error={errors.email} />

      <CustomInput
        placeholder={'CPF'}
        Icon={HiOutlineIdentification}
        {...register('cpf')}
        error={errors.cpf}
        onInput={cpfMask}
      />

      <CustomInput
        placeholder={'Telefone'}
        Icon={FiPhone}
        {...register('phonenumber')}
        error={errors.phonenumber}
        onInput={phonenumberMask}
      />

      <select className={styles.selectForm} {...register('status')} required>
        <option value="Ativo">Ativo</option>
        <option value="Inativo">Inativo</option>
        <option value="Aguardando ativação">Aguardando ativação</option>
        <option value="Desativado">Desativado</option>
      </select>

      <div className={styles.buttonContainer}>
        <Button title={params.id ? 'Atualizar' : 'Criar'} type="submit" />
        <Button title="Voltar" onClick={() => navigate('/')} />
      </div>
    </form>
  )
}
