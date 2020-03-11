import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, Index } from "typeorm";
import { UsersEntity } from "src/users/users.entity";
import { AppreciationsEntity } from "src/appreciations/appreciations.entity";

@Entity('posts')
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    content: string;

    @Column()
    userId: number;

    @ManyToOne(type => UsersEntity, user => user.posts)
    user: UsersEntity;

    @OneToMany(type => AppreciationsEntity, appreciation => appreciation.post)
    appreciations: AppreciationsEntity[];
}