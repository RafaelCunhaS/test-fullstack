import ClientController from '../controller/ClientController'
import ClientRepository from '../repository/ClientRepository'
import ClientService from '../service/ClientService'

export default (): ClientController => {
  const model = new ClientRepository()
  const service = new ClientService(model)
  const controller = new ClientController(service)

  return controller
}
