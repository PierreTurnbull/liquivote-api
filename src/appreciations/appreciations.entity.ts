import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Index } from "typeorm";
import { PostsEntity } from "src/posts/posts.entity";

@Entity('appreciations')
@Index(['postId', 'userId'], { unique: true })
export class AppreciationsEntity {
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