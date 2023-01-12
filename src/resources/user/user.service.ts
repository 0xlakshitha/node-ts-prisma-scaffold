import { PrismaClient } from "@prisma/client";
import User from "@/resources/user/user.interface";
import InternalServerException from "@/utils/exceptions/internal-server.exception";

class UserService {
    private prisma = new PrismaClient()

    /**
     * Get all users
     */
    public async getUsers(): Promise<User[] | Error> {
        try {
            const users: User[] = await this.prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true
                }
            })

            return users
        } catch (error) {
            throw new InternalServerException()
        }
    }

    /**
     * Attempt to login user
     */
    // public async login(
    //     email: string,
    //     password: string
    // ): Promise<string | Error | HttpException> {
    //     try {
    //         const user = await this.prisma.user.findUnique({
    //             where: {
    //                 email: email
    //             }
    //         })

    //         if(!user) throw new NotFoundException(`Unable to find user with ${email}`)

    //         if(await this.passwordValidation(password, user.hash)) {
    //             return token.createToken(user.id)
    //         }
    //         else {
    //             throw new HttpException(
    //                 StatusCodes.BAD_REQUEST,
    //                 'Wrong credentials given'
    //             )
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }
    
    // private passwordValidation = async function (
    //     password: string, hash: string | null
    // ): Promise<Error | boolean> {
    //     return await bcrypt.compare(password, hash? hash : '')
    // }

}

export default UserService