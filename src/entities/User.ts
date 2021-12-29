import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { uuid } from "uuidv4";

@Entity("users")
export class User {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  public created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
