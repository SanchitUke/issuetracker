import { Project } from "../entities/Project";
import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Users } from "../entities/Users";
import { Mycontext } from "src/types";
import { isAuth } from "../middleware/isAuth";
import { dataSource } from "../typeormconfig";
import { Issue } from "../entities/Issue";

@Resolver(Project)
export class ProjectResolver {
    @FieldResolver(() => Users)
    async owner(@Root() project: Project) {
        const _project = await Project.createQueryBuilder("project")
        .leftJoinAndSelect("project.owner", "users")
        .where("project.id = :id", {id: project.id})
        .getOne();
        return _project?.owner;
    }
    @FieldResolver(() => [Users])
    async members(@Root() project: Project) {
        const _project = await Project.createQueryBuilder("project")
        .leftJoinAndSelect("project.members", "users")
        .where("project.id = :id", {id: project.id})
        .getOne();

        return _project?.members;
    }
    @FieldResolver(() => [Issue])
    async issues(@Root() project: Project) {
        const _project = await Project.createQueryBuilder("project")
        .leftJoinAndSelect("project.issues", "issue")
        .where("project.id = :id", {id: project.id})
        .getOne();

        return _project?.issues;
    }
    @Query(() => [Project])
    async projects() {
        return Project.find({ });
    }
    // @Query(() => [Project])
    // async projectMembers(@Arg() {}) {
    //     const members = this.members()
    //     return Project.find({ });
    // }
    @Query(() => Project)
    async project(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: Mycontext
    ) {
        const project = await Project.findOne({ where: { id } });
        if(!project) {
            return null;
        }
        if(project?.ownerId !== req.session.userId) {
            const members = await this.members(project);
            let isValid = false;
            members?.forEach((m) => {
                if(m.userId === req.session.userId) {
                    isValid = true;
                }
            })
            if(!isValid) {
                return null;
            }
        }
        req.session.projectId = id;
        console.log("req.session: ", req.session);
        return project;
    }
    @Mutation(() => Project)
    @UseMiddleware(isAuth)
    async createProject(
        @Arg('name', () => String) name: string,
        @Ctx() { req }: Mycontext
    ){
        const owner = await Users.findOneBy({ userId: req.session.userId });
        if(!owner) {
            throw new Error("Not Authenticated");
        }
        if(name === "") {
            throw new Error("Project name cannot be empty");
        }
        const project = Project.create({
            name, ownerId: req.session.userId, owner
        });
        await project.save();
        req.session.projectId = project.id;
        
        return project;
    }
    @Mutation(() => Boolean)
    async deleteProject(@Ctx() {req}: Mycontext) {
        const project = await Project.findOneBy({ id: req.session.projectId });
        if(!project) {
            return false;
        }
        if(project?.ownerId !== req.session.userId) {
            return false;
        }
        await Project.delete({ id: req.session.projectId });
        return true;
    }
    @Mutation(() => String)
    async addMember(
        @Arg('username', () => String) username: string,
        @Ctx() { req }: Mycontext
    ) {
        const owner = await Users.findOneBy({ userId: req.session.userId });
        const project = await Project.findOneBy({ id: req.session.projectId });
        const user = await Users.findOneBy({ username });
        if(!project || !owner) {
            return "";
        }
        if(project.ownerId !== owner.userId) {
            return "";
        }
        if(owner?.username === username) {
            return "Cannot add yourself!!";
        }
        if(!user) {
            return "User not found";
        }
        // project.members?.push(user);
        await dataSource
            .createQueryBuilder()
            .relation(Project, "members")
            .of(project.id)
            .add(user.userId);
        // await project?.save();
        return "";
    }
}