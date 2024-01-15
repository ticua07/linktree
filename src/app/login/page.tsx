'use client';

import styles from './page.module.css'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const supabase = createClientComponentClient();
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [error, setError] = useState<string | null>()

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data.user !== null) {
                router.replace("/dashboard")
            }
        }
        getData()
    }, [])

    const toggleOption = () => {
        setIsLogin(!isLogin)
        setPassword("")
        setError(null)
    }

    const logInAccount = async () => {
        setError(null)
        if (email.trim() === "" || password.trim() === "") {
            setError("Missing form fields.")
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError(`${error.name}, ${error.message}`)
        } else {
            router.replace("/dashboard")
        }
    }

    const signInAccount = async () => {
        setError(null)
        if (email.trim() === "" || password.trim() === "") {
            setError("Missing form fields.")
            return;
        }

        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            setError(`${error.name}, ${error.message}`)
        } else {
            // TODO: Add error handling

            await supabase.from("usernames").insert({
                userid: data.user?.id,
                username
            })
            await supabase.from("links").insert({
                userid: data.user?.id,
                links: JSON.stringify([])
            })

            router.replace("/dashboard")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                {isLogin
                    ?
                    <>
                        <h1 className={styles.title}>Log in</h1>
                        <div className={styles.form_container}>
                            <input value={email} onChange={(event) => setEmail(event.target.value)} className={[styles.form_elements, styles.input].join(" ")} type="email" placeholder="Email" />
                            <input value={password} onChange={(event) => setPassword(event.target.value)} className={[styles.form_elements, styles.input].join(" ")} type="password" placeholder="Password" />
                            <button onClick={logInAccount} className={[styles.form_elements, styles.button].join(" ")}>Log in</button>
                            <span onClick={toggleOption} className={[styles.form_elements, styles.change_method].join(" ")}>Or, create an account</span>
                            {error ? <span className={[styles.form_elements, styles.error].join(" ")}>{error}</span> : <></>}
                        </div>
                    </>
                    :
                    <>
                        <h1 className={styles.title}>Sign in</h1>
                        <div className={styles.form_container}>
                            <input value={username} onChange={(event) => setUsername(event.target.value)} className={[styles.form_elements, styles.input].join(" ")} type="text" placeholder="Username" />
                            <input value={email} onChange={(event) => setEmail(event.target.value)} className={[styles.form_elements, styles.input].join(" ")} type="email" placeholder="Email" />
                            <input value={password} onChange={(event) => setPassword(event.target.value)} className={[styles.form_elements, styles.input].join(" ")} type="password" placeholder="Password" />
                            <button onClick={signInAccount} className={[styles.form_elements, styles.button].join(" ")}>Sign in</button>
                            <span onClick={toggleOption} className={[styles.form_elements, styles.change_method].join(" ")}>Or, login to an account</span>
                            {error ? <span className={[styles.form_elements, styles.error].join(" ")}>{error}</span> : <></>}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
