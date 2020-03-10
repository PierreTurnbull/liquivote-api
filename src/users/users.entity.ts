import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { PostsEntity } from "src/posts/posts.entity";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    hashedPassword: string;

    @OneToMany(type => PostsEntity, post => post.user)
    posts: PostsEntity[];
}