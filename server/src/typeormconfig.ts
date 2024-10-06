import path from "path";
import { DataSource } from "typeorm";
import { Comments } from "./entities/Comments";
import { Issue } from "./entities/Issue";
import { Project } from "./entities/Project";
import { Users } from "./entities/Users";
import 'dotenv/config';

export const dataSource = new DataSource({
    type: "postgres",
    //host: "localhost",
    //port: 3306,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    synchronize: true,
    //entities: ["src/entities/*{.ts}"],
    entities: [Comments, Users, Project, Issue],
    migrations: [path.join(__dirname, "./migrations/*")]
});