type User = {
    docNo: string;
    userId: string;
    name: string;
    life: number;
    claimableReward: number;
    totalClaimed: number;
};

type UserCredential = {
    uid: string;
    isLogin: boolean;
};