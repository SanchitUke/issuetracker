import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import type { RedisClientType } from 'redis';

export type Mycontext = {
    req: Request & { 
        session: Session & Partial<SessionData> & { 
            userId: number,
            projectId: number,
            issueId: number 
        };
    };
    redis: RedisClientType;
    res: Response ;
    //userLoader: ReturnType<typeof createUserLoader>;
    //updootLoader: ReturnType<typeof createUpdootLoader>;
}