import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (password === "") {
      throw new Error("Password is required!");
    }

    if (userAlreadyExists) {
      throw new Error("User Already exists!");
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
