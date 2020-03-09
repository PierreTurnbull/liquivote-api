import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    hashedPassword: string;
}