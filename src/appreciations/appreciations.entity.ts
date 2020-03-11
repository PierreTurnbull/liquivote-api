import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn, Index } from "typeorm";
import { PostsEntity } from "src/posts/posts.entity";

@Entity('appreciations')
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
    @JoinColumn([
        { name: 'postId', referencedColumnName: 'id' },
        { name: 'userId', referencedColumnName: 'userId' }
    ])
    post: PostsEntity;
}