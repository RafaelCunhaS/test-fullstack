import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from './index'
import '@testing-library/jest-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientCreate from '../ClientCreate'
import ClientUpdate from '../ClientUpdate/index.tsx'

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
    })
  }
})

vi.mock('../../services/clientResources.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../services/clientResources.ts')>()
  return {
    ...mod,
    listClients: mocks.mockListClients
  }
})

describe('Home', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ClientCreate />} />
          <Route path="/update/:id" element={<ClientUpdate />} />
        </Routes>
      </BrowserRouter>
    )
  })

  test('renders the component', () => {
    expect(screen.getByText('Listagem de clientes')).toBeInTheDocument()
  })

  test('fetches and displays clients', async () => {
    expect(mocks.mockListClients).toHaveBeenCalledWith(0)

    const client1 = await screen.findByText('John Doe')
    const client2 = await screen.findByText('Jane Smith')

    expect(client1).toBeInTheDocument()
    expect(client2).toBeInTheDocument()
  })

  test('navigates to create page when "Novo cliente" button is clicked', () => {
    act(() => {
      fireEvent.click(screen.getByText('Novo cliente'))
    })

    expect(screen.getByText('Informe os campos a seguir para criar novo cliente:')).toBeInTheDocument()
  })

  test('navigates back to home page when "Voltar" button is clicked', () => {
    act(() => {
      fireEvent.click(screen.getByText('Voltar'))
    })

    expect(screen.getByText('Listagem de clientes')).toBeInTheDocument()
  })

  test('navigates to update page when "Editar" button is clicked', async () => {
    const editButton = await screen.findByTestId('edit-button-1')

    act(() => {
      editButton.click()
    })

    expect(screen.getByText('Atualizar cliente')).toBeInTheDocument()
  })
})
