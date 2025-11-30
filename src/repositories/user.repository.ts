import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser } from "../commons/interface/user.interface";
import { UserModel } from "../schema/user.schema";

// CREATE
const createUser = async (data: IUser) => {
    try {
        return await UserModel.create(data);
    } catch (err) {
        console.log(`Error at [UserRepository :: createUser], err: ${err}`);
        throw err;
    }
};

// GET ONE
const getUser = async (filter: FilterQuery<any>) => {
    try {
        return await UserModel.findOne(filter).lean();
    } catch (err) {
        console.log(`Error at [UserRepository :: createUser], err: ${err}`);
        throw err;
    }
};

// GET MANY
const getUsers = async (filter: FilterQuery<IUser> = {}) => {
    try {
        return await UserModel.find(filter).lean();
    } catch (err) {
        console.log(`Error at [UserRepository :: createUser], err: ${err}`);
        throw err;
    }
};

// GET FIELDS
// const getUserField = async <K extends keyof IUser>(
//     filter: FilterQuery<IUser>,
//     field: K
// ): Promise<IUser[K] | null> => {
//     try {
//         const user = await UserModel.findOne(filter).select(field).lean();
//         return user ? user[field] : null;
//     } catch (err) {
//         console.error(`[UserRepository :: getUserField] Error: ${err}`);
//         throw err;
//     }
// };

// UPDATE ONE
const updateUser = async (
    filter: FilterQuery<IUser>,
    data: UpdateQuery<IUser>
) => {

    try {
        return await UserModel.findOneAndUpdate(filter, data, { new: true }).lean();
    } catch (err) {
        console.log(`Error at [UserRepository :: createUser], err: ${err}`);
        throw err;
    }
};

// UPDATE MANY
const updateUsers = async (
    filter: FilterQuery<IUser>,
    data: UpdateQuery<IUser>
) => {
    try {
        return await UserModel.updateMany(filter, data);
    } catch (err) {
        console.log(`Error at [UserRepository :: createUser], err: ${err}`);
        throw err;
    }
};

export {
    createUser,
    getUser,
    getUsers,
    updateUser,
    updateUsers
};

