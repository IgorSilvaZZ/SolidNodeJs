import { SqLiteUserRepository } from "../../repositories/implementations/SqLiteUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export default (): CreateUserController => {
  const sqlLiteUserRepository = new SqLiteUserRepository();

  const createUserUseCase = new CreateUserUseCase(sqlLiteUserRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
