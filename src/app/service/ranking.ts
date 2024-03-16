// services
import { getGameScoreForSnapOrderScore, transferScoreObj, addScoreDocument, updateScoreDocByDocNo } from '../service/score';
import { getPoolsForSnap, getPoolSize, updatePoolsByDocNo, transferPoolObj } from '../service/pool';
import { addClaimableReward } from '../service/user';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

/**
 * ランキングの更新
 * 処理概要
 * 1.score 更新
 * 2.ランキング変動判定
 * 3.プールの更新
 * 4.ユーザへのreward追加
 * @param gameId 
 * @param score 
 * @param user 
 */
export const upsertRanking = async (gameId: string, score: number, user: User) =>{
    // DEB: debag code
    //const newScore = score;
    const newScore = 9981;

    const scoreSnap = await getGameScoreForSnapOrderScore(gameId);
    const scoreFetchData = transferScoreObj(scoreSnap);

    // ranking number
    const beforeRankingNo = getBeforeRankingNo(scoreFetchData, user.userId);;
    // FIXME:同点のスコアを取ると、名前順で下の判定をされてしまい、後続のらプール対象になる
    const afterRankingNo = getNewRankingNo(scoreFetchData, newScore);

    // update score
    if (isNewUser(beforeRankingNo)) {
        console.log("new user");
        await addScoreDocument(gameId, user.userId, newScore);
    } else if (isWinOwnScore(scoreFetchData, beforeRankingNo, newScore)) {
        console.log("Update score already played user");
        // TODO: fail safe. This should score is unique now but what happens err.
        const updateDocNo = scoreSnap.docs[beforeRankingNo - 1].id;
        updateScoreDocByDocNo(gameId, updateDocNo, newScore);
    } else {
        // don't update ranking
        console.log("don't update ranking");
        return;
    }

    // judge updating ranking 
    if (!isWinRanking(beforeRankingNo, afterRankingNo)){
        console.log("failed updating ranking");
        return;
    }
    console.log("success updating just ranking");

    // update pool & user reward
    const poolSnap = await getPoolsForSnap(gameId);
    if (isSuccessUpdatingRanking(getPoolSize(poolSnap), afterRankingNo)){
        console.log("get pool");
        // const updateDocNo = poolSnap.docs[beforeRankingNo - 1].id;
        // const poolObject = transferPoolObj(poolSnap);
        // const rewardAmount = poolObject[beforeRankingNo - 1].potAmount;
        //getReward(gameId, user, updateDocNo, rewardAmount);
        getReward(gameId, user, poolSnap, afterRankingNo);
    } else {
        console.log("can't get pool");
        return;
    }
};

const isNewUser = (_beforeRankingNo: number) => {
    return _beforeRankingNo < 0;
};

const isWinOwnScore = (_scoreFetchData: DocumentData[],_beforeRankingNo: number, _score: number) => {
    return _scoreFetchData[_beforeRankingNo - 1].score < _score;
};

const isSuccessUpdatingRanking = (rankingSize: number, rankingNo: number) => {
    return rankingSize >= rankingNo;
};

const getBeforeRankingNo = (_scoreFetchData: DocumentData[], _userId: string) => {
    const index = _scoreFetchData.findIndex(scoreData => scoreData.userId == _userId);
    if (index == -1) {
        return index;
    }
    return index + 1;
}

const getNewRankingNo = (_scoreFetchData: DocumentData[], _score: number) => {
    var newRankingNoIndex =  -1;
    for(let i = 0; i < _scoreFetchData.length; i++) {
        if (_scoreFetchData[i].score < _score) {
            newRankingNoIndex = i;
            break;
        } 
    };
    return newRankingNoIndex + 1;
};

const isWinRankingAlreadyPlayer = (_beforeRankingNo: number ,_afterRankingNo: number) => {
    return _beforeRankingNo > _afterRankingNo;
};

const isWinRanking = (_beforeRankingNo: number, _afterRankingNo: number) => {
    return isNewUser(_beforeRankingNo) || isWinRankingAlreadyPlayer(_beforeRankingNo, _afterRankingNo);
};

const getReward = (gameId: string, user: User, poolSnap: QuerySnapshot<DocumentData, DocumentData>, afterRankingNo: number) =>{
    const updateDocNo = poolSnap.docs[afterRankingNo - 1].id;
    const poolObject = transferPoolObj(poolSnap);
    const rewardAmount = poolObject[afterRankingNo - 1].potAmount;

    updatePoolsByDocNo(gameId, updateDocNo, 0);
    addClaimableReward(user.docNo, rewardAmount);
};