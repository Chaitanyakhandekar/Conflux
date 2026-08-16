import { IUser } from "./user.type.ts";
import "multer";

type Id = {
    _id: string
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            file?: Express.Multer.File;
            files?:
            { [fieldname: string]: Multer.File[] }
            | Multer.File[];
        }
    }
}

export { };