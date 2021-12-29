import { SqLiteUserRepository } from "../../repositories/implementations/SqLiteUserRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "../../useCases/CreateUser/CreateUserDTO";
import { CreateUserUseCase } from "../../useCases/CreateUser/CreateUserUseCase";
import closeConnection from "../utils/closeConnection";
import openConnection from "../utils/openConnection";

describe("CreateUser", () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    await openConnection();
    usersRepository = new SqLiteUserRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  afterAll(async () => {
    await closeConnection();
  });

  //Cenário de Sucesso!
  it("Espero que um novo usuario seja criado", async () => {
    const userRequest: ICreateUserRequestDTO = {
      name: "Test",
      email: "test@email.com",
      password: "1234",
    };

    const user = await createUserUseCase.execute({
      name: userRequest.name,
      email: userRequest.email,
      password: userRequest.password,
    });

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(user.name).toBe("Test");
    expect(user.password).toBe("1234");
  });

  it("Espero que o usuario criado contenha o password vazio e seja lançado uma execessão", async () => {
    const userRequest = {
      name: "Igor",
      email: "igor.test@email.com",
      password: "",
    };

    await expect(
      createUserUseCase.execute({
        name: userRequest.name,
        email: userRequest.email,
        password: userRequest.password,
      })
    ).rejects.toEqual(new Error("Password is required!"));
  });
});
