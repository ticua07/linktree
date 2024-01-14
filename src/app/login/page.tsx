'use client';

import styles from './page.module.css'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const supabase = createClientComponentClient();


    useEffect(() => {
        const getData = async () => {
            const data = await supabase.auth.getUser();
            console.log(data)
        }

        getData()
    }, [])

    return (
        <>
            {isLogin
                ? <div className={styles.container}>
                    <div className={styles.title_container}>
                        <h1 className={styles.title}>Log in</h1>
                        <div className={styles.form_container}>
                            <input className={[styles.form_elements, styles.input].join(" ")} type="email" placeholder="Email" />
                            <input className={[styles.form_elements, styles.input].join(" ")} type="password" placeholder="Password" />
                            <button className={[styles.form_elements, styles.button].join(" ")}>Log in</button>
                            <span onClick={() => setIsLogin(!isLogin)} className={[styles.form_elements, styles.change_method].join(" ")}>Or, create an account</span>
                        </div>
                    </div>
                </div>

                : <div className={styles.container}>
                    <div className={styles.title_container}>
                        <h1 className={styles.title}>Log in</h1>
                        <div className={styles.form_container}>
                            <input className={[styles.form_elements, styles.input].join(" ")} type="text" placeholder="Username" />
                            <input className={[styles.form_elements, styles.input].join(" ")} type="email" placeholder="Email" />
                            <input className={[styles.form_elements, styles.input].join(" ")} type="password" placeholder="Password" />
                            <button className={[styles.form_elements, styles.button].join(" ")}>Log in</button>
                            <span onClick={() => setIsLogin(!isLogin)} className={[styles.form_elements, styles.change_method].join(" ")}>Or, login to an account</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
