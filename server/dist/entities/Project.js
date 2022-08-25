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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Issue_1 = require("./Issue");
const Users_1 = require("./Users");
let Project = class Project extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Project.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Users_1.Users),
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (user) => user.ownedProjects),
    __metadata("design:type", Users_1.Users)
], Project.prototype, "owner", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Users_1.Users]),
    (0, typeorm_1.ManyToMany)(() => Users_1.Users, (user) => user.projects),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Project.prototype, "members", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Issue_1.Issue]),
    (0, typeorm_1.OneToMany)(() => Issue_1.Issue, (issue) => issue.project),
    __metadata("design:type", Array)
], Project.prototype, "issues", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "lastUpdate", void 0);
Project = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Project);
exports.Project = Project;
//# sourceMappingURL=Project.js.map