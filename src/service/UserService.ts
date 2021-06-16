import { userAccess } from "../data";

export function getAllUsers() {
    return userAccess.getAll();
}

export function getUserById(id: number) {
    return userAccess.getById(id);
}

export function getUserByUsername(name: string) {
    return userAccess.getByUsername(name);
}