// services
import { getGameScoreForObj } from '../service/score';
import { getPoolsForSnap, getPoolSize, transferPoolObj } from '../service/pool';
import { DocumentData, runTransaction, doc } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore";

/**
 * ランキングと報酬登録
 * ランキング解放数と更新したランキンングを比較して
 * 報酬対象の場合報酬を登録する
 * Memo:1つでもランキングを更新されたときコールする
 * 処理概要
 * 1. すでにscoreが登録されているのでスコア、プール情報を再取得
 * 2. 現在の自分のランキングを取得し、報酬対象かチェック
 * 3. 報酬対象の時、transaction.get()でドキュメント変更を検知しつつ
 * ユーザとプールの情報を更新する
 * 
 * 処理概要
 * @param gameId 
 * @param score 
 * @param user 
 */
export const updateRanking = async (gameId: string, score: number, user: User) =>{
    // DEB: debag code
    const newScore = score;
    const db = fireStoreInitialized();
    console.log(`start updating ranking`);

    // start transaction
    await runTransaction(db, async (transaction) => {
        console.log("start update transaction");
        
        // reCalculation ranking
        const scoreData = await getGameScoreForObj(gameId);
        const afterRankingNo = getNowRankingNo(scoreData, user.userId);
        
        // get pool docNo
        const poolSnap = await getPoolsForSnap(gameId);
        const poolObject = transferPoolObj(poolSnap);
        const updatePoolDocNo = poolSnap.docs[afterRankingNo - 1].id;

        // ranking check
        if (!isEligibleForRankingReward(getPoolSize(poolSnap), afterRankingNo)) {
            console.log(`success updating just ranking, but not into poolsize`);
            return;
        }

        // get user docNo & reward
        const updateUserDocNo = user.docNo;
        const rewardAmount = poolObject[afterRankingNo - 1].potAmount;

        // refetch pool data & user data
        const rePoolRef = doc(db, `${gameId}_pools`, updatePoolDocNo);
        const rePoolSnap = await transaction.get(rePoolRef);
        const reUserRef = doc(db, `users`, updateUserDocNo);
        const reUserSnap = await transaction.get(reUserRef);

        if (!rePoolSnap.exists() || !reUserSnap.exists()) {
            //throw "ticketEvent document does not exist!"
            console.log("err. snap does not exist in transaction");
        };

        transaction.update(rePoolRef, { pot_amount: 0, });
        transaction.update(reUserRef, { claimable_reward: rewardAmount, });
    });
};


const isEligibleForRankingReward = (rankingSize: number, rankingNo: number) => {
    console.log(`rankingSize: ${rankingSize}, rankingNo: ${rankingNo}`);
    return rankingSize >= rankingNo;
};

export const getBeforeRankingNo = (_scoreFetchData: DocumentData[], _userId: string) => {
    const index = _scoreFetchData.findIndex(scoreData => scoreData.userId == _userId);
    if (index == -1) {
        return index;
    }
    return index + 1;
}

export const getNewRankingNo = (_scoreFetchData: DocumentData[], _score: number) => {
    var newRankingNoIndex =  -1;
    for(let i = 0; i < _scoreFetchData.length; i++) {
        if (_scoreFetchData[i].score < _score) {
            newRankingNoIndex = i;
            break;
        } 
    };
    return newRankingNoIndex + 1;
};

export const getNowRankingNo = (_scoreFetchData: DocumentData[], _userId: string) => {
    const index = _scoreFetchData.findIndex(scoreData => scoreData.userId == _userId);
    if (index == -1) {
        // dat not found
        // TODO: throw exception
        return index;
    }
    const newRankingNo = index + 1;
    return newRankingNo;
};

export const isUpRanking = (_beforeRankingNo: number ,_afterRankingNo: number) => {
    return _beforeRankingNo > _afterRankingNo;
};
