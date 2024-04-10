type User = {
    docNo: string;
    userId: string;
    name: string;
    life: number;
    lifeNftTokenId: number;
    claimableReward: number;
    totalClaimed: number;
    mailAddress: string;
    walletAddress: string;
    characterNftTokenId: number;
};

type UserCredential = {
    uid: string;
    isLogin: boolean;
};