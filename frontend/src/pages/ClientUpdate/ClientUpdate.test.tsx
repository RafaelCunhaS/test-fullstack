import { render, screen, act, fireEvent } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientUpdate from './index'
import Home from '../Home/index.tsx'

const mocks = vi.hoisted(() => {
  return {
    mockListClients: vi.fn().mockResolvedValue({
      totalPages: 2,
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '123.456.789-00',
          phonenumber: '+1 123-456-7890',
          status: 'Ativo'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          cpf: '987.654.321-00',
          phonenumber: '+1 987-654-3210',
          status: 'Inativo'
        }
      ]
    }),
    mockfindClient: vi.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '58113834796',
      phonenumber: '123456789011',
      status: 'Ativo'
    }),
    mockUpdateClient: vi.fn()
  }
})

vi.mock('../../services/clientResources.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../services/clientResources.ts')>()
  return {
    ...mod,
    listClients: mocks.mockListClients,
    findClient: mocks.mockfindClient,
    updateClient: mocks.mockUpdateClient
  }
})

describe('ClientUpdate', () => {
  beforeEach(async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<ClientUpdate />} />
        </Routes>
      </BrowserRouter>
    )
  })

  test('renders the component', async () => {
    await screen.findByTestId('edit-button-1')

    act(() => {
      fireEvent.click(screen.getByTestId('edit-button-1'))
    })

    expect(screen.getByText('Atualizar cliente')).toBeInTheDocument()
    expect(screen.getByText('Informe os campos a seguir para atualizar cliente:')).toBeInTheDocument()
  })

  test('displays client data when editing', async () => {
    expect(screen.getByPlaceholderText('Nome')).toHaveValue('John Doe')
    expect(screen.getByPlaceholderText('E-mail')).toHaveValue('johndoe@example.com')
    expect(screen.getByPlaceholderText('CPF')).toHaveValue('581.138.347-96')
    expect(screen.getByPlaceholderText('Telefone')).toHaveValue('(12) 34567-8901')
    expect(screen.getByRole('combobox')).toHaveValue('Ativo')
  })

  test('updates client data and navigates back to home page', async () => {
    await act(async () => {
      const updateButton = screen.getByText('Atualizar')
      updateButton.click()
    })

    expect(mocks.mockUpdateClient).toHaveBeenCalledWith('1', {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '58113834796',
      phonenumber: '12345678901',
      status: 'Ativo'
    })
    expect(screen.getByText('Listagem de clientes')).toBeInTheDocument()
  })
})
