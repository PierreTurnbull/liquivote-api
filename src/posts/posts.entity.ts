import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, Index } from "typeorm";
import { UsersEntity } from "src/users/users.entity";
import { VotesEntity } from "src/votes/votes.entity";

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

    @OneToMany(type => VotesEntity, vote => vote.post)
    votes: VotesEntity[];
}