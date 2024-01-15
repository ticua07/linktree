'use client';

import { useEffect, useState } from "react";
import { getLinksByUserid, useUser } from "../../../hooks/hooks";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./page.module.css"
import { useRouter } from "next/navigation";

interface WebsiteLinks {
    name: string,
    link: string,
    lid: string
}

// [{"lid": "283bd040-b819-42bc-8197-b0f118d41dff", "name": "First website", "link": "https://youtube.com"}]

function Dashboard() {
    // const user = useUser();
    const [links, setLinks] = useState<WebsiteLinks[] | null>(null);
    const [user, setUser] = useState<User | null>()
    const router = useRouter()
    const supabase = createClientComponentClient();

    const [name, setName] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        useUser().then((user) => {
            const getLinks = async () => {
                let data = await getLinksByUserid(user?.id);
                setUser(user)
                setLinks(data)
            }
            getLinks()
        })
    }, [])


    const deleteItem = async (lid: string) => {
        let temp_links = links?.filter((val) => val.lid !== lid) || []
        setLinks(temp_links);
        await supabase.from("links").update({ links: JSON.stringify(temp_links) }).eq("userid", user?.id)
    };

    const addLink = async () => {
        if (url.trim() === "" || name.trim() === "" || links === null) { return }

        let new_links = [...links, { lid: crypto.randomUUID(), link: url, name }];
        setLinks(new_links)

        await supabase.from("links").update({ links: JSON.stringify(new_links) }).eq("userid", user?.id)
    }

    const logOut = async () => {
        await supabase.auth.signOut()
        router.replace("/")
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Add a link</h1>
                <div className={styles.form_container}>
                    <input value={name} onChange={(event) => { setName(event.target.value) }} className={[styles.form_elements, styles.input].join(" ")} type="text" placeholder="Name" />
                    <input value={url} onChange={(event) => { setUrl(event.target.value) }} className={[styles.form_elements, styles.input].join(" ")} type="url" placeholder="Url" />
                    <button onClick={addLink} className={[styles.add_button, styles.form_elements].join(" ")} >Add link</button>
                    <span onClick={logOut} className={[styles.form_elements, styles.log_out].join(" ")}>Log Out</span>

                </div>
            </div>
            {
                links ? links.map((item: WebsiteLinks) => (
                    <div className={styles.link_container} key={item.lid}>
                        <div>
                            <h2 className={styles.title}>{item.name}</h2>
                            <a target="_blank" className={styles.a} href={item.link}>{item.link}</a>
                        </div>
                        <button className={styles.button} onClick={() => deleteItem(item.lid).then()}>Delete</button>
                    </div>
                )) : <p className={styles.loading}>Loading...</p>
            }
        </div >
    );
}

export default Dashboard;