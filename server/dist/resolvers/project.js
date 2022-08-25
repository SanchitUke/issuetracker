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
exports.ProjectResolver = void 0;
const Project_1 = require("../entities/Project");
const type_graphql_1 = require("type-graphql");
const Users_1 = require("../entities/Users");
const isAuth_1 = require("../middleware/isAuth");
const typeormconfig_1 = require("../typeormconfig");
const Issue_1 = require("../entities/Issue");
let ProjectResolver = class ProjectResolver {
    owner(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const _project = yield Project_1.Project.createQueryBuilder("project")
                .leftJoinAndSelect("project.owner", "users")
                .where("project.id = :id", { id: project.id })
                .getOne();
            return _project === null || _project === void 0 ? void 0 : _project.owner;
        });
    }
    members(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const _project = yield Project_1.Project.createQueryBuilder("project")
                .leftJoinAndSelect("project.members", "users")
                .where("project.id = :id", { id: project.id })
                .getOne();
            return _project === null || _project === void 0 ? void 0 : _project.members;
        });
    }
    issues(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const _project = yield Project_1.Project.createQueryBuilder("project")
                .leftJoinAndSelect("project.issues", "issue")
                .where("project.id = :id", { id: project.id })
                .getOne();
            return _project === null || _project === void 0 ? void 0 : _project.issues;
        });
    }
    projects() {
        return __awaiter(this, void 0, void 0, function* () {
            return Project_1.Project.find({});
        });
    }
    project(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield Project_1.Project.findOne({ where: { id } });
            if (!project) {
                return null;
            }
            if ((project === null || project === void 0 ? void 0 : project.ownerId) !== req.session.userId) {
                const members = yield this.members(project);
                let isValid = false;
                members === null || members === void 0 ? void 0 : members.forEach((m) => {
                    if (m.userId === req.session.userId) {
                        isValid = true;
                    }
                });
                if (!isValid) {
                    return null;
                }
            }
            req.session.projectId = id;
            console.log("req.session: ", req.session);
            return project;
        });
    }
    createProject(name, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield Users_1.Users.findOneBy({ userId: req.session.userId });
            if (!owner) {
                throw new Error("Not Authenticated");
            }
            if (name === "") {
                throw new Error("Project name cannot be empty");
            }
            const project = Project_1.Project.create({
                name, ownerId: req.session.userId, owner
            });
            yield project.save();
            req.session.projectId = project.id;
            return project;
        });
    }
    deleteProject({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield Project_1.Project.findOneBy({ id: req.session.projectId });
            if (!project) {
                return false;
            }
            if ((project === null || project === void 0 ? void 0 : project.ownerId) !== req.session.userId) {
                return false;
            }
            yield Project_1.Project.delete({ id: req.session.projectId });
            return true;
        });
    }
    addMember(username, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield Users_1.Users.findOneBy({ userId: req.session.userId });
            const project = yield Project_1.Project.findOneBy({ id: req.session.projectId });
            const user = yield Users_1.Users.findOneBy({ username });
            if (!project || !owner) {
                return "";
            }
            if (project.ownerId !== owner.userId) {
                return "";
            }
            if ((owner === null || owner === void 0 ? void 0 : owner.username) === username) {
                return "Cannot add yourself!!";
            }
            if (!user) {
                return "User not found";
            }
            yield typeormconfig_1.dataSource
                .createQueryBuilder()
                .relation(Project_1.Project, "members")
                .of(project.id)
                .add(user.userId);
            return "";
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Users_1.Users),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Project_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "owner", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [Users_1.Users]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Project_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "members", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [Issue_1.Issue]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Project_1.Project]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "issues", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Project_1.Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.Query)(() => Project_1.Project),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Project_1.Project),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('name', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)('username', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "addMember", null);
ProjectResolver = __decorate([
    (0, type_graphql_1.Resolver)(Project_1.Project)
], ProjectResolver);
exports.ProjectResolver = ProjectResolver;
//# sourceMappingURL=project.js.map