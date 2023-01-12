import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validation from '@/resources/auth/auth.validation'
import UserService from "./user.service";
import { StatusCodes } from "http-status-codes";
import { AuthenticatedAdminMiddleware, AuthenticatedMiddleware } from "@/middleware/authenticated.middleware";

class UserController implements Controller {
    public path = '/users'
    public router = Router()
    private userService = new UserService()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get(
            `${this.path}`,
            AuthenticatedMiddleware,
            AuthenticatedAdminMiddleware,
            this.getUsers
        )

        // this.router.post(
        //     `${this.path}/login`,
        //     validationMiddleware(validation.login),
        //     this.login
        // )
    }

    private getUsers = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            
            const users = await this.userService.getUsers()

            res.status(StatusCodes.OK).json(users)

        } catch (error: any) {
            next(error)
        }
    }

}

export default UserController