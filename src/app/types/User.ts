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
    characterNftFlg: boolean;
};

type UserCredential = {
    uid: string;
    isLogin: boolean;
};