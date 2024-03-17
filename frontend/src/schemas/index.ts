import * as yup from 'yup'
import isValidCPF from '../utils/cpfValidator'

export const validationSchema = yup
  .object()
  .shape({
    name: yup.string().required('Nome é obrigatório').min(2, 'Nome precisa de pelo menos 2 letras'),
    email: yup.string().required('E-mail é obrigatório').email('Precisa ser um email válido'),
    cpf: yup
      .string()
      .required('CPF é obrigatório')
      .test('test-invalid-cpf', 'CPF inválido', (cpf) => isValidCPF(cpf)),
    phonenumber: yup
      .string()
      .required('Telefone é obrigatório')
      .min(15, 'Formato esperado: (00) 00000-0000')
      .max(15, 'Formato esperado: (00) 00000-0000'),
    status: yup.string().oneOf(['Ativo', 'Inativo', 'Aguardando ativação', 'Desativado']).required()
  })
  .required()
