import { NextRequest, NextResponse } from 'next/server';

interface PostParameters {
    uid: string;
}

export const POST = async (req: NextRequest) => {
    const { uid } = (await req.json()) as PostParameters;
    checkCheat();
};

const checkCheat = () => {
    console.log('cheat check');
    // TODOリスト
    /**
     * TODO1: ゲーム開始時に別のゲームIDで開始された場合
     *   - stateの中のselectedGameIdの値を書き換えられた状態でゲーム開始した場合
     *     - プレイ画面のURLにgameIdを持っているため、裏で送信するゲームデータにそのidを入れればチーターチェック可能
     * TODO2: メモリ改竄チェック
     * TODO3: 機械的操作チェック
     *   - 例：障害物の1px前で必ず飛んでいる
     */
}