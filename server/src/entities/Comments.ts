import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Issue } from "./Issue";

@ObjectType()
@Entity()
export class Comments extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    text!: string;

    @Field()
    @Column()
    commentedBy: string;

    @Field()
    @CreateDateColumn()
    commentedOn!: Date;

    @Field(() => Issue)
    @ManyToOne(() => Issue, (issue) => issue.comments)
    issue: Issue;

    //codewindow
}