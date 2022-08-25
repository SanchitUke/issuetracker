import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Issue } from "./Issue";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    ownerId!: number;

    @Field(() => Users)
    @ManyToOne(() => Users, (user) => user.ownedProjects)
    owner: Users;

    @Field(() => [Users])
    @ManyToMany(() => Users, (user) => user.projects)
    @JoinTable()
    members: Users[];

    @Field(() => [Issue])
    @OneToMany(() => Issue, (issue) => issue.project)
    issues: Issue[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    lastUpdate: Date;
}