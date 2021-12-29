import { getConnection } from "typeorm";

export default async () => {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.close();
};
