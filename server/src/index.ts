import "reflect-metadata";
import { dataSource } from "./typeormconfig";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ProjectResolver } from "./resolvers/project";
import { UserResolver } from "./resolvers/user";
import { IssueResolver } from "./resolvers/issue";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from 'connect-redis';
import { COOKIE_NAME, __prod__ } from "./constants";
import cors from 'cors';
import { CommentResolver } from "./resolvers/comment";

const main = async () => {

    await dataSource.initialize();
    const app = express();
    app.set("trust proxy", !__prod__);
    app.set("Access-Control-Allow-Origin", "http://localhost:3000");
    app.set("Access-Control-Allow-Origin", "https://studio.apollographql.com");
    app.set("Access-Control-Allow-Credentials", true);

    const RedisStore = connectRedis(session);
    // ioredis
    const redis = new Redis();
    app.use(
        cors({
            // origin: "https://studio.apollographql.com",
            // origin: true,
            // origin: "http://localhost:3000", 
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
            credentials: true
        })
    )
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ 
                client: redis,
                disableTouch: true
            }),
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax',
                // secure: true,
                // sameSite: 'none'
            },
            secret: "dfryjdfghrer",
            resave: false,
        }),
    );
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ProjectResolver, UserResolver, IssueResolver, CommentResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redis })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app,
        cors: false
    });

    app.listen(4000, () => {
        console.log("Server started on local host 4000");
    })
   
}

main();