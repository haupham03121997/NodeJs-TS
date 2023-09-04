import User from '~/models/schemas/User.schema'
import { databaseService } from './config.service'

class UsersService {
  async registerService(payload: { email: string; password: string }) {
    const { email, password } = payload
    return databaseService.users.insertOne(
      new User({
        email,
        password
      })
    )
  }
}

const usersService = new UsersService()

export { usersService }