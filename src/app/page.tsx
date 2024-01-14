'use client';
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import styles from "./page.module.css"

export default function Home() {
    const supabase = createClientComponentClient();
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const getUser = async () => {
            setUser(await useUser())
        }
        getUser()
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Welcome to Linker</h1>
                <h2 className={styles.subtitle}>Your one-stop solution for managing all your online presence.<br />Simplify your profile with Linker. </h2>
                <div className={styles.button_container}>
                    <a href="/login" className={styles.get_started}>Get started</a>
                </div>
            </div>
        </div>
    )
}
