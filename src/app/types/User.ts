type User = {
    docNo: string;
    userId: string;
    name: string;
    life: number;
    claimableReward: number;
    totalClaimed: number;
    mailAddress: string;
    purchasedNftFlg: boolean;
};

type UserCredential = {
    uid: string;
    isLogin: boolean;
};