"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Comments_1 = require("./entities/Comments");
const Issue_1 = require("./entities/Issue");
const Project_1 = require("./entities/Project");
const Users_1 = require("./entities/Users");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    username: "postgres",
    password: "postgres",
    database: "issuetracker",
    logging: true,
    synchronize: true,
    entities: [Comments_1.Comments, Users_1.Users, Project_1.Project, Issue_1.Issue],
    migrations: [path_1.default.join(__dirname, "./migrations/*")]
});
//# sourceMappingURL=typeormconfig.js.map