import { FieldValue } from 'firebase-admin/firestore';
// util
import { dateFormatForString } from '@/app/utils/date'

// infrastructure
import { addDocument } from '@/app/api/infrastructure/firestore/firestore'

export const addTransaction = (uid: string, gameId: string) => {
    const now: string = dateFormatForString(new Date());
    const docId = `${uid}_${now}`;
    const collectionId = `game_transactions/${gameId}/game_transactions`;
    const fieldData = {
        start_date: FieldValue.serverTimestamp(),
        user_id: uid,
    };
    addDocument(collectionId, docId, fieldData);
}