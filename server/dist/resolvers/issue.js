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
exports.IssueResolver = void 0;
const Issue_1 = require("../entities/Issue");
const type_graphql_1 = require("type-graphql");
const Project_1 = require("../entities/Project");
const Comments_1 = require("../entities/Comments");
const Users_1 = require("../entities/Users");
let IssueResolver = class IssueResolver {
    project(issue) {
        return __awaiter(this, void 0, void 0, function* () {
            const _issue = yield Issue_1.Issue.createQueryBuilder("issue")
                .leftJoinAndSelect("issue.project", "project")
                .where("issue.id = :id", { id: issue.id })
                .getOne();
            return _issue === null || _issue === void 0 ? void 0 : _issue.project;
        });
    }
    comments(issue) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield Comments_1.Comments.createQueryBuilder("comments")
                .leftJoinAndSelect("comments.issue", "issue")
                .where("issue.id = :id", { id: issue.id })
                .getMany();
            return comments;
        });
    }
    issues({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield Issue_1.Issue.createQueryBuilder("issue")
                .innerJoinAndSelect("issue.project", "project")
                .where("project.id = :id", { id: req.session.projectId })
                .getMany();
            return issues;
        });
    }
    issue(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield Issue_1.Issue.findOneBy({ id });
            if (!issue) {
                return null;
            }
            const project = yield this.project(issue);
            if ((project === null || project === void 0 ? void 0 : project.id) !== req.session.projectId) {
                return null;
            }
            req.session.issueId = id;
            return issue;
        });
    }
    searchIssue(nameSnippet, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = yield this.issues({ req });
            let issue = null;
            issues.forEach((i) => {
                if (i.title.includes(nameSnippet)) {
                    issue = i;
                }
            });
            return issue;
        });
    }
    createIssue(id, title, text, priority, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield Project_1.Project.findOneBy({ id });
            if (!project) {
                return null;
            }
            const user = yield Users_1.Users.findOneBy({ userId: req.session.userId });
            const issue = Issue_1.Issue.create({ title, text, status: "open", priority, raisedBy: user === null || user === void 0 ? void 0 : user.username, project });
            req.session.issueId = issue.id;
            yield issue.save();
            return issue;
        });
    }
    closeIssue({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield Issue_1.Issue.findOneBy({ id: req.session.issueId });
            const project = yield Project_1.Project.findOneBy({ id: req.session.projectId });
            if ((project === null || project === void 0 ? void 0 : project.ownerId) !== req.session.userId) {
                return null;
            }
            if (issue) {
                issue.status = "closed";
                issue.save();
            }
            return issue;
        });
    }
    deleteIssue({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield Issue_1.Issue.findOneBy({ id: req.session.issueId });
            const project = yield Project_1.Project.findOneBy({ id: req.session.projectId });
            if ((req.session.userId !== (issue === null || issue === void 0 ? void 0 : issue.raisedBy)) || req.session.userId !== (project === null || project === void 0 ? void 0 : project.ownerId)) {
                return false;
            }
            yield (issue === null || issue === void 0 ? void 0 : issue.remove());
            return true;
        });
    }
    editTitle(title, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield Issue_1.Issue.findOneBy({ id: req.session.issueId });
            if (!issue) {
                return null;
            }
            if (issue.raisedBy !== req.session.userId) {
                return null;
            }
            if (typeof title !== undefined) {
                issue.title = title;
                yield issue.save();
            }
            return issue;
        });
    }
    editText(text, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const issue = yield Issue_1.Issue.findOneBy({ id: req.session.issueId });
            if (!issue) {
                return null;
            }
            if (issue.raisedBy !== req.session.userId) {
                return null;
            }
            if (typeof text !== undefined) {
                issue.text = text;
                yield issue.save();
            }
            return issue;
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Project_1.Project),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Issue_1.Issue]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "project", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [Comments_1.Comments]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Issue_1.Issue]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "comments", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Issue_1.Issue]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "issues", null);
__decorate([
    (0, type_graphql_1.Query)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "issue", null);
__decorate([
    (0, type_graphql_1.Query)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Arg)('nameSnippet', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "searchIssue", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('title', () => String)),
    __param(2, (0, type_graphql_1.Arg)('text', () => String)),
    __param(3, (0, type_graphql_1.Arg)('priority', () => String)),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "createIssue", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "closeIssue", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "deleteIssue", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Arg)('title', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "editTitle", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Issue_1.Issue),
    __param(0, (0, type_graphql_1.Arg)('text', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IssueResolver.prototype, "editText", null);
IssueResolver = __decorate([
    (0, type_graphql_1.Resolver)(Issue_1.Issue)
], IssueResolver);
exports.IssueResolver = IssueResolver;
//# sourceMappingURL=issue.js.map