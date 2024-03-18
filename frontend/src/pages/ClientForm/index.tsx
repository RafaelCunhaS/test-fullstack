import { yupResolver } from '@hookform/resolvers/yup'
import { FiMail, FiPhone, FiUser } from 'react-icons/fi'
import { HiOutlineIdentification } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { IDataForm } from '../../interfaces'
import styles from './styles.module.scss'
import { CustomInput } from '../../components/Input'
import { Button } from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { validationSchema } from '../../schemas'
import { createClient, findClient, updateClient } from '../../services/clientResources'
import { useEffect, useState } from 'react'
import ClientHeader from '../../components/ClientHeader'
import { cpfMask, phonenumberMask } from '../../utils/masks'

export default function ClientForm() {
  const navigate = useNavigate()
  const params = useParams()
  const [notFound, setNotFound] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<IDataForm>({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const data: IDataForm = await findClient(params.id)
        if (data !== null) {
          setValue('name', data.name)
          setValue('email', data.email)
          setValue(
            'cpf',
            data.cpf
              .replace(/\D/g, '')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})/, '$1-$2')
              .replace(/(-\d{2})\d+?$/, '$1')
          )
          setValue(
            'phonenumber',
            data.phonenumber
              .replace(/\D/g, '')
              .replace(/(\d{2})(\d)/, '($1) $2')
              .replace(/(\d{4,5})(\d{4})/, '$1-$2')
              .replace(/(-\d{4})\d+?$/, '$1')
          )
          setValue('status', data.status)
        } else setNotFound(true)
      }
    }
    fetchData()
  }, [params.id, setValue])

  const removeMasks = (dataForm: IDataForm) => {
    dataForm.cpf = dataForm.cpf.replace(/[.-]/g, '')
    dataForm.phonenumber = dataForm.phonenumber.replace(/[()-\s]/g, '')
    return dataForm
  }

  const onSubmit = async (dataForm: IDataForm) => {
    console.log(dataForm)
    const data = removeMasks(dataForm)
    params.id ? await updateClient(params.id, data) : await createClient(data)
    params.id ? navigate('/') : reset()
  }

  return (
    <main className={styles.container}>
      <ClientHeader />
      {params.id ? (
        <div className={styles.subtext}>
          <h3>Atualizar cliente</h3>
          <p>Informe os campos a seguir para atualizar cliente:</p>
        </div>
      ) : (
        <div className={styles.subtext}>
          <h3>Novo cliente</h3>
          <p>Informe os campos a seguir para criar novo cliente:</p>
        </div>
      )}
      {!notFound ? (
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
      ) : (
        <h1 className={styles.notFound}>Cliente não encontrado</h1>
      )}
    </main>
  )
}
