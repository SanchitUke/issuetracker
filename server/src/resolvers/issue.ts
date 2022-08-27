import { Issue } from "../entities/Issue";
import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { Mycontext } from "src/types";
import { Project } from "../entities/Project";
import { Comments } from "../entities/Comments";
import { Users } from "../entities/Users";


@Resolver(Issue)
export class IssueResolver {
    @FieldResolver(() => Project)
    async project(@Root() issue: Issue) {
        // return Project.findOneBy({ id: issue.})
        const _issue = await Issue.createQueryBuilder("issue")
            .leftJoinAndSelect("issue.project", "project")
            .where("issue.id = :id", {id: issue.id})
            .getOne();
        return _issue?.project;
    }
    @FieldResolver(() => [Comments])
    async comments(@Root() issue: Issue) {
        // const _issue = await Issue.createQueryBuilder("issue")
        //     .leftJoinAndSelect("issue.comments", "comments")
        //     .where("issue.id = :id", {id: issue.id})
        //     .getOne();
        const comments = await Comments.createQueryBuilder("comments")
            .leftJoinAndSelect("comments.issue", "issue")
            .where("issue.id = :id", {id: issue.id})
            .getMany();
        return comments;
    }
    @Query(() => [Issue])
    async issues(@Ctx() {req}: Mycontext) {
        const issues = await Issue.createQueryBuilder("issue")
            .innerJoinAndSelect("issue.project", "project")
            .where("project.id = :id", {id: req.session.projectId})
            .getMany();
        return issues;
    }
    @Query(() => Issue)
    async issue(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: Mycontext
    ) {
        const issue =  await Issue.findOneBy({ id });
        if(!issue) {
            return null;
        }
        const project = await this.project(issue);
        if(project?.id !== req.session.projectId) {
            return null;
        }
        req.session.issueId = id;
        return issue;
    }
    @Query(() => Issue)
    async searchIssue(
        @Arg('nameSnippet', () => String) nameSnippet: string,
        @Ctx() { req }: Mycontext
    ) {
        const issues = await this.issues({ req } as Mycontext);
        let issue = null;
        issues.forEach((i) => {
            if(i.title.includes(nameSnippet)) {
                issue = i;
            }
        })
        return issue;
    }
    @Mutation(() => Issue)
    async createIssue(
        @Arg('id', () => Int) id: number,
        @Arg('title', () => String) title: string,
        @Arg('text', () => String) text: string,
        @Arg('priority', () => String) priority: string,
        @Ctx() { req }: Mycontext
    ) {
        const project = await Project.findOneBy({id});
        if(!project) {
            return null;//throw new Error("Project not found!");
        }
        const user = await Users.findOneBy({ userId: req.session.userId });
        const issue = Issue.create({ title, text, status: "open", priority, raisedBy: user?.username,  project })
        req.session.issueId = issue.id;
        await issue.save();
        return issue;
    }
    @Mutation(() => Issue)
    async closeIssue(@Ctx() {req}: Mycontext) {
        const issue = await Issue.findOneBy({ id: req.session.issueId });
        const project = await Project.findOneBy({ id: req.session.projectId });
        if(project?.ownerId !== req.session.userId) {
            return null;
        }
        if(issue) {
            issue.status = "closed";
            issue.save()
        }
        return issue;
    }
    // @Mutation(() => Boolean)
    // async deleteIssue(@Ctx() {req}: Mycontext) {
    //     const issue = await Issue.findOneBy({id: req.session.issueId});
    //     const project = await Project.findOneBy({ id: req.session.projectId });
    //     if((req.session.userId !== issue?.raisedBy) || req.session.userId !== project?.ownerId) {
    //         return false;
    //     }
    //     await issue?.remove();
    //     return true;
    // }
    // @Mutation(() => Issue)
    // async editTitle( 
    //     @Arg('title', () => String) title: string,
    //     @Ctx() { req }: Mycontext
    // ) {
    //     const issue = await Issue.findOneBy({ id: req.session.issueId });
    //     if(!issue) {
    //         return null;
    //     }
    //     if(issue.raisedBy !== req.session.userId) {
    //         return null;
    //     }
    //     if(typeof title !== undefined) {
    //         issue.title = title;
    //         await issue.save();
    //     }
    //     return issue;
    // }
    // @Mutation(() => Issue)
    // async editText(
    //     @Arg('text', () => String) text: string,
    //     @Ctx() { req }: Mycontext
    // ) {
    //     const issue = await Issue.findOneBy({ id: req.session.issueId });
    //     if(!issue) {
    //         return null;
    //     }
    //     if(issue.raisedBy !== req.session.userId) {
    //         return null;
    //     }
    //     if(typeof text !== undefined) {
    //         issue.text = text;
    //         await issue.save();
    //     }
    //     return issue;
    // }
}