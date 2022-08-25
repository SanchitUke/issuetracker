import { Request, Response } from "express";
import Redis from "ioredis";

export type Mycontext = {
    req: Request & { session: Express.Session };
    redis: Redis;
    res: Response ;
    //userLoader: ReturnType<typeof createUserLoader>;
    //updootLoader: ReturnType<typeof createUpdootLoader>;
}