'use client';
import { useRouter } from 'next/navigation';
import { DefaultTemplate } from '@/app/templates/DefaultTemplate';
import styles from '../../page.module.css';

export default function UserPage() {
    const router = useRouter();
    return (
        <main className={styles.main}>
            <DefaultTemplate title='User Page'>
                <button onClick={() => router.push('/')}>Top</button>
            </DefaultTemplate>
        </main>
    );
}
