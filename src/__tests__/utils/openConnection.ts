import createConnection from "../../database";

export default async () => {
  const connection = await createConnection();
  await connection.runMigrations();
};
