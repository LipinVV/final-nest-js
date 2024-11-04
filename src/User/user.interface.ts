import { User } from './user.schema';

interface SearchUserParams {
    limit: number;
    offset: number;
    email?: string;
    name?: string;
    contactPhone?: string;
}

interface IUser {
    email: string;
    password: string;
    name: string;
    role: string;
    _id?: string;
    contactPhone?: string;
    salt?: string;
}

interface IUserService {
    create(data: Partial<User>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(params: SearchUserParams): Promise<User[]>;
}

export { IUser, IUserService, SearchUserParams }
