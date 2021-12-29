import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class SqLiteUserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({ name, email, password }): Promise<User> {
    const user = await this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }
}
