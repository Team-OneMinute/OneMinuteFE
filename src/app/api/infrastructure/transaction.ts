import { FieldValue } from 'firebase-admin/firestore';
// util
import { dateFormatForString } from '@/app/utils/date'

// infrastructure
import { addDocument } from '@/app/api/infrastructure/firestore/firestore'

export const addTransaction = (uid: string, gameId: string) => {
    const now: string = dateFormatForString(new Date());
    const collectionId = `${gameId}_game_transactions`;
    const docId = `${gameId}_${uid}_${now}`;
    const fieldData = {
        start_date: FieldValue.serverTimestamp(),
        user_id: uid,
    };
    addDocument(collectionId, docId, fieldData);
}