import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { UsersEntity } from "src/users/users.entity";

@Entity('posts')
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    content: string;

    @ManyToOne(type => UsersEntity, user => user.posts)
    user: UsersEntity;
}