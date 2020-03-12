import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index } from "typeorm";
import { PostsEntity } from "src/posts/posts.entity";

@Entity('votes')
@Index(['postId', 'userId'], { unique: true })
export class VotesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId: number;

    @Column()
    userId: number;

    @Column()
    value: boolean;

    @ManyToOne(type => PostsEntity, { primary: true })
    @JoinColumn({ name: 'postId' })
    post: PostsEntity;
}