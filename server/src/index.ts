import "reflect-metadata";
import { dataSource } from "./typeormconfig";
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import { buildSchema } from "type-graphql";
import { ProjectResolver } from "./resolvers/project";
import { UserResolver } from "./resolvers/user";
import { IssueResolver } from "./resolvers/issue";
import session from "express-session";
import { createClient } from "redis";
import { RedisStore } from 'connect-redis';
import { COOKIE_NAME, FRONTEND_URL, __prod__ } from "./constants";
import cors from 'cors';
import { CommentResolver } from "./resolvers/comment";
import 'dotenv/config';
import http from 'http'

const main = async () => {

    await dataSource.initialize();

    const app = express();

    if(!FRONTEND_URL) {
        throw new Error("FRONTEND_URL not found")
    }

    const redis = createClient({ url: 'redis://127.0.0.1:6379' });
    await redis.connect();

    const redisStore = new RedisStore({ 
        client: redis,
        prefix: 'sess:'
    })

    const appSecret = process.env.APP_SECRET;
    if(!appSecret) {
        throw new Error("APP_SECRET not found");
    }
    app.use(
        session({
            name: COOKIE_NAME,
            store: redisStore,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                secure: __prod__,
                sameSite: 'lax',
                // secure: true,
                // sameSite: 'none'
            },
            saveUninitialized: false,
            secret: appSecret,
            resave: false,
        })
    );
    const httpServer = http.createServer(app)

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ProjectResolver, UserResolver, IssueResolver, CommentResolver],
            validate: false
        }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();

    app.use('/graphql',
        cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
        }),
        express.json(),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }) => ({ req, res, redis }),
        }),
    );

    const appPort = parseInt(process.env.APP_PORT!);
    await new Promise<void>(resolve => httpServer.listen({ port: appPort }, resolve));
    console.log(`🚀 Server ready at http://localhost:${appPort}/graphql`);
}

main();