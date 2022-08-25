"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResolver = void 0;
const Comments_1 = require("../entities/Comments");
const type_graphql_1 = require("type-graphql");
const Issue_1 = require("../entities/Issue");
const Users_1 = require("../entities/Users");
let CommentResolver = class CommentResolver {
    issue(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const _comment = yield Comments_1.Comments.createQueryBuilder("comments")
                .leftJoinAndSelect("comments.issue", "issue")
                .where("issue.id = :id", { id: comment.id })
                .getOne();
            return _comment === null || _comment === void 0 ? void 0 : _comment.issue;
        });
    }
    comments({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield Comments_1.Comments.createQueryBuilder("comments")
                .innerJoinAndSelect("comments.issue", "issue")
                .where("issue.id = :id", { id: req.session.issueId })
                .getMany();
            return comments;
        });
    }
    writeComment(text, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield Issue_1.Issue.findOneBy({ id: req.session.issueId });
            if (!issue) {
                return null;
            }
            const user = yield Users_1.Users.findOneBy({ userId: req.session.userId });
            return yield Comments_1.Comments.create({ text, commentedBy: user === null || user === void 0 ? void 0 : user.username, issue }).save();
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Comments_1.Comments]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "issue", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Comments_1.Comments]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "comments", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Comments_1.Comments),
    __param(0, (0, type_graphql_1.Arg)('text', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "writeComment", null);
CommentResolver = __decorate([
    (0, type_graphql_1.Resolver)(Comments_1.Comments)
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.js.map