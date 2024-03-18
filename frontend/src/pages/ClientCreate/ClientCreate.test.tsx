import { render, screen, fireEvent, act } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientCreate from './index'
import Home from '../Home'

const mocks = vi.hoisted(() => {
  return {
    mockCreateClient: vi.fn()
  }
})

vi.mock('../../services/clientResources.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../services/clientResources.ts')>()
  return {
    ...mod,
    createClient: mocks.mockCreateClient
  }
})

describe('ClientCreate', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ClientCreate />} />
        </Routes>
      </BrowserRouter>
    )
    act(() => {
      fireEvent.click(screen.getByText('Novo cliente'))
    })
  })

  test('renders the component', () => {
    expect(screen.getByText('Novo cliente')).toBeInTheDocument()
    expect(screen.getByText('Informe os campos a seguir para criar novo cliente:')).toBeInTheDocument()
  })

  test('renders the form with correct inputs', async () => {
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('CPF')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  test('should show errors if inputs are empty and not call the api function', async () => {
    act(() => {
      fireEvent.click(screen.getByText('Criar'))
    })

    await screen.findAllByTestId('errorText')

    expect(screen.getAllByTestId('errorText')).toHaveLength(4)
    expect(mocks.mockCreateClient).not.toBeCalled()
  })

  test('submits the form with correct data and return to home page', async () => {
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'johndoe@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('CPF'), { target: { value: '43027934813' } })
    fireEvent.change(screen.getByPlaceholderText('Telefone'), { target: { value: '(00) 00000-0000' } })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Ativo' } })

    act(() => {
      fireEvent.click(screen.getByText('Criar'))
    })

    await screen.findByText('Listagem de clientes')

    expect(mocks.mockCreateClient).toHaveBeenCalled()
    expect(screen.getByText('Listagem de clientes')).toBeInTheDocument()
  })
})
