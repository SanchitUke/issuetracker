import path from "path";
import { DataSource } from "typeorm";
import { Comments } from "./entities/Comments";
import { Issue } from "./entities/Issue";
import { Project } from "./entities/Project";
import { Users } from "./entities/Users";

export const dataSource = new DataSource({
    type: "postgres",
    //host: "localhost",
    //port: 3306,
    username: "postgres",
    password: "postgres",
    database: "issuetracker",
    logging: true,
    synchronize: true,
    //entities: ["src/entities/*{.ts}"],
    entities: [Comments, Users, Project, Issue],
    migrations: [path.join(__dirname, "./migrations/*")]
});