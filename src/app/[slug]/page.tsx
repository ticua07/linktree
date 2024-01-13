'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Database } from "../../../database";
import { useLinksByUsername } from "../../../hooks/hooks";
import styles from "./page.module.css"

interface Params {
    params: { slug: string }
}

export default function ProductDetail({ params }: Params) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const links = useLinksByUsername(params.slug);
    const capitalized_name = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

    const trim_protocol = (url: string) => {
        if (url.startsWith("https://")) {
            return url.slice(8).split("/")[0]
        } else {
            return url.slice(7).split("/")[0]
        }
    }

    return <div className={styles.container}>
        <div className={styles.title_container}>
            <h1 className={styles.title}>{capitalized_name}'s links</h1>
        </div>
        {
            links?.map((item) => (
                <a href={item.link} className={styles.link_container} key={item.lid}>
                    <img className={styles.favicon} src={"https://icon.horse/icon/" + trim_protocol(item.link)} />
                    {item.name}
                </a>
            ))
        }
    </div>;
}