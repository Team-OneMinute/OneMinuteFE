import { getUserData } from '@/app/api/infrastructure/user';

export const getUser = async (uid: string) => {
    const userData = getUserData(uid);
    return userData;
};
