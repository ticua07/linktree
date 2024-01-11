'use client';
import styles from './page.module.css'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Login() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClientComponentClient();

    const signIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password
        })
    }
    const signUp = async () => {
        await supabase.auth.signUp({
            email,
            password
        })
    }
    const signOut = async () => {
        await supabase.auth.signOut()
    }

    useEffect(() => {
        const getData = async () => {
            const data = await supabase.auth.getUser();
            console.log(data)
        }

        getData()
    }, [])

    return (
        <div className={styles.container}>

            <div className={styles.container_buttons}>
                <button onClick={signIn} className={styles.button}>log in</button>
                <button onClick={signUp} className={styles.button}>sign up</button>
                <button onClick={signOut} className={styles.button}>sign out</button>
            </div>

            <input value={user} type="text" onChange={(e) => setUser(e.target.value)} placeholder='username'></input>
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
            <input value={password} type="text" onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
        </div>
    )
}