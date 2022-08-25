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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const Users_1 = require("../entities/Users");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const userInput_1 = require("../util/userInput");
const constants_1 = require("../constants");
const sendEmail_1 = require("../util/sendEmail");
const uuid_1 = require("uuid");
const Project_1 = require("../entities/Project");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Users_1.Users, { nullable: true }),
    __metadata("design:type", Users_1.Users)
], UserResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    ownedProjects(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield Users_1.Users.createQueryBuilder("users")
                .leftJoinAndSelect("users.ownedProjects", "project")
                .where("users.userId = :id", { id: user.userId })
                .getOne();
            return _user === null || _user === void 0 ? void 0 : _user.ownedProjects;
        });
    }
    projects(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield Users_1.Users.createQueryBuilder("users")
                .leftJoinAndSelect("users.projects", "project")
                .where("users.userId = :id", { id: user.userId })
                .getOne();
            return _user === null || _user === void 0 ? void 0 : _user.projects;
        });
    }
    userProjects({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.Users.findOneBy({ userId: req.session.userId });
            if (!user) {
                return null;
            }
            const projects = yield this.ownedProjects(user);
            const memberProjects = yield this.projects(user);
            if (!projects) {
                return memberProjects;
            }
            if (memberProjects) {
                return projects === null || projects === void 0 ? void 0 : projects.concat(memberProjects);
            }
            return projects;
        });
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("cookie: ", req.session.cookie);
            if (!req.session.userId) {
                return null;
            }
            return yield Users_1.Users.findOneBy({ userId: req.session.userId });
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return Users_1.Users.find({});
        });
    }
    oneUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Users_1.Users.findOneBy({ userId });
        });
    }
    register(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield argon2_1.default.hash(options.password);
            const user = Users_1.Users.create({
                username: options.username,
                password: hashedPassword,
                email: options.email
            });
            try {
                yield user.save();
            }
            catch (err) {
                if (err.code === '23505') {
                    if (err.detail.includes('username')) {
                        return {
                            errors: [{
                                    field: "username",
                                    message: "Username already taken"
                                }]
                        };
                    }
                    else {
                        return {
                            errors: [{
                                    field: "email",
                                    message: "Email already registered"
                                }]
                        };
                    }
                }
            }
            req.session.userId = user.userId;
            return { user };
        });
    }
    login(usernameOrEmail, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.Users.findOneBy(usernameOrEmail.includes("@") ?
                { email: usernameOrEmail } :
                { username: usernameOrEmail });
            if (!user) {
                return {
                    errors: [{
                            field: 'usernameOrEmail',
                            message: 'Username or Email does not exist'
                        }]
                };
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return {
                    errors: [{
                            field: 'password',
                            message: 'incorrect password'
                        }]
                };
            }
            req.session.userId = user.userId;
            return {
                user
            };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            res.clearCookie(constants_1.COOKIE_NAME);
            resolve(true);
        }));
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.Users.findOneBy({ email });
            if (!user) {
                return false;
            }
            const token = (0, uuid_1.v4)();
            yield redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.userId, 'EX', 1000 * 60 * 60 * 24 * 3);
            yield (0, sendEmail_1.sendEmail)(email, "Change password", `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`);
            return true;
        });
    }
    changePassword({ redis, req }, token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = constants_1.FORGET_PASSWORD_PREFIX + token;
            const userId = yield redis.get(key);
            if (!userId) {
                return {
                    errors: [{
                            field: "token",
                            message: "token expired"
                        }],
                };
            }
            const user = yield Users_1.Users.findOneBy({ userId: parseInt(userId) });
            if (!user) {
                return {
                    errors: [{
                            field: "token",
                            message: "user no longer exists"
                        }],
                };
            }
            user.password = yield argon2_1.default.hash(newPassword);
            yield user.save();
            yield redis.del(key);
            req.session.userId = user.userId;
            return { user };
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [Project_1.Project]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_1.Users]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "ownedProjects", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [Project_1.Project]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_1.Users]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Project_1.Project]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userProjects", null);
__decorate([
    (0, type_graphql_1.Query)(() => Users_1.Users, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Users_1.Users]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => Users_1.Users),
    __param(0, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "oneUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userInput_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("usernameOrEmail")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("token")),
    __param(2, (0, type_graphql_1.Arg)("newPassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(Users_1.Users)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map