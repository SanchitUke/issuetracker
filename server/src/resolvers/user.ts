import { Users } from "../entities/Users";
import { Arg, Ctx, Field, FieldResolver, Int, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import argon2 from 'argon2';
import { UserInput } from "../util/userInput";
import { Mycontext } from "../types";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../util/sendEmail";
import { v4 } from "uuid";
import { Project } from "../entities/Project";
import "dotenv/config";

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}
@ObjectType()
class UserResponse {
    @Field(() => Users, { nullable: true })
    user: Users;
    @Field(() => [FieldError], { nullable: true })
    errors: FieldError[];
}
@Resolver(Users)
export class UserResolver  {
    @FieldResolver(() => [Project])
    async ownedProjects(@Root() user: Users) {
        const _user = await Users.createQueryBuilder("users")
        .leftJoinAndSelect("users.ownedProjects", "project")
        .where("users.userId = :id", {id: user.userId})
        .getOne();
        return _user?.ownedProjects;
    }
    @FieldResolver(() => [Project])
    async projects(@Root() user: Users) {
        const _user = await Users.createQueryBuilder("users")
        .leftJoinAndSelect("users.projects", "project")
        .where("users.userId = :id", {id: user.userId})
        .getOne();
        return _user?.projects;
    }
    @Query(() => [Project])
    async userProjects(@Ctx() {req}: Mycontext) {
        // const projects = await Project.findBy({ ownerId: req.session.userId });
        // const memberProjects = await Project
        const user =  await Users.findOneBy({ userId: req.session.userId });
        if(!user) {
            return null;
        }
        const projects = await this.ownedProjects(user);
        const memberProjects = await this.projects(user);
        if(!projects) {
            return memberProjects;
        }
        if(memberProjects) {
            return projects?.concat(memberProjects);
        }
        return projects;
    }
    @Query(() => Users, {nullable: true})
    async me(@Ctx() { req }: Mycontext) {
        console.log("cookie: ", req.session.cookie);
        if(!req.session.userId) {
            return null;
        }
        
        return await Users.findOneBy({ userId: req.session.userId });
    }
    @Query(() => [Users])
    async users() {
        return Users.find({ });
    }
    @Query(() => Users)
    async oneUser(
        @Arg('userId', () => Int) userId: number
    ) {
        return await Users.findOneBy({ userId });
    }
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UserInput,
        @Ctx() { req }: Mycontext
    ) {
        const hashedPassword = await argon2.hash(options.password);
        const user = Users.create({ 
            username: options.username, 
            password: hashedPassword, 
            email: options.email 
        })
        try {
            await user.save();
        } catch(err) {
            if (err.code === '23505') {
                if(err.detail.includes('username')) {
                    return {
                        errors: [ {
                            field: "username",
                            message: "Username already taken"
                        }]
                    }   
                } else {
                    return {
                        errors: [ {
                            field: "email",
                            message: "Email already registered"
                        }]
                    }   
                }
            }
        }
        //log in user
        req.session.userId = user.userId;
        return { user };
    }
    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req }: Mycontext
    ) {
        const user = await Users.findOneBy( usernameOrEmail.includes("@") ? 
        { email: usernameOrEmail } : 
        { username: usernameOrEmail });
        if(!user) {
            return {
                errors: [{
                    field: 'usernameOrEmail',
                    message: 'Username or Email does not exist'
                }]
            };
        }
        const valid = await argon2.verify(user.password, password);
        if(!valid) {
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
        }
    }
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Mycontext) {
        return new Promise((resolve) =>
            req.session.destroy((err: any) => {
                if(err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                res.clearCookie(COOKIE_NAME);
                resolve(true);
            })
        )
    }
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() { redis }: Mycontext
    ) {
        const user = await Users.findOneBy({ email });
        if(!user) {
            return false;
        }
        const token = v4();
        await redis.set(FORGET_PASSWORD_PREFIX + token, user.userId, {
            expiration: {
                type: "EX",
                value: 1000 * 60 * 24 * 3 
            }
        }); // 3 days
        
        await sendEmail(
            email, 
            "Change password",
            `<a href="${process.env.FRONTEND_URL}/change-password/${token}">Reset Password</a>`
        );
        return true;
    }
    @Mutation(() => UserResponse)
    async changePassword(
        @Ctx() { redis, req }: Mycontext,
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string
    ) { 
        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if(!userId) {
            return {
                errors: [{
                    field: "token",
                    message: "token expired"
                }],
            };
        }
        const user = await Users.findOneBy({ userId: parseInt(userId) });
        if(!user) {
            return {
                errors: [{
                    field: "token",
                    message: "user no longer exists"
                }],
            };
        }
        user.password = await argon2.hash(newPassword);
        await user.save();
        await redis.del(key);
        //log in user after change password
        req.session.userId = user.userId;

        return { user };
    }
    // @Mutation(() => [Users])
    // async deleteUsers() {
    //     await Users.delete({ });
    //     return await Users.find({ });
    // }
}