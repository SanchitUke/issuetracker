import { Comments } from "../entities/Comments";
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Mycontext } from "../types";
import { Issue } from "../entities/Issue";
import { Users } from "../entities/Users";

@Resolver(Comments)
export class CommentResolver {
    @FieldResolver(() => Issue)
    async issue(@Root() comment: Comments) {
        const _comment = await Comments.createQueryBuilder("comments")
        .leftJoinAndSelect("comments.issue", "issue")
        .where("issue.id = :id", {id: comment.id})
        .getOne();
        return _comment?.issue;
    }
    @Query(() => [Comments])
    async comments(@Ctx() {req}: Mycontext) {
        const comments = await Comments.createQueryBuilder("comments")
            .innerJoinAndSelect("comments.issue", "issue")
            .where("issue.id = :id", {id: req.session.issueId})
            .getMany();
        return comments;
    }
    @Mutation(() => Comments)
    async writeComment(
        @Arg('text', () => String) text: string,
        @Ctx() { req }: Mycontext
    ) {
        const issue = await Issue.findOneBy({id: req.session.issueId});
        if(!issue) {
            return null;
        }
        const user = await Users.findOneBy({ userId: req.session.userId });
        return await Comments.create({ text, commentedBy: user?.username, issue }).save();
    }
}