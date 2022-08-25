import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./Comments";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Issue extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field(() => String, { nullable: true })
    @Column()
    priority: string;

    @Field()
    @Column()
    status!: string;

    @Field(() => Project)
    @ManyToOne(() => Project, (project) => { project.issues })
    project: Project

    @Field()
    @Column({nullable: true})
    raisedBy!: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column()
    text: string;

    // @Field()
    // @Column({nullable: true})
    // creator: string;

    @Field(() => [Comments])
    @OneToMany(() => Comments, (comment) => { comment.issue })
    comments: Comments[];
}