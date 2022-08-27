import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    userId!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => [Project], { nullable: true })
    @OneToMany(() => Project, (project) => project.owner)
    ownedProjects: Project[];

    @Field(() => [Project])
    @ManyToMany(() => Project, (project) => project.members)
    projects: Project[];

}