'use client';

import { useEffect, useState } from "react";
import { getLinksByUserid, useUser } from "../../../hooks/hooks";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface WebsiteLinks {
    name: string,
    link: string,
    lid: string
}

// [{"lid": "283bd040-b819-42bc-8197-b0f118d41dff", "name": "First website", "link": "https://youtube.com"}]

function Dashboard() {
    // const user = useUser();
    const [links, setLinks] = useState<WebsiteLinks[] | null>(null);
    const [userID, setUserID] = useState<string | null>()
    const supabase = createClientComponentClient();


    useEffect(() => {
        useUser().then((user) => {
            const getLinks = async () => {
                let data = await getLinksByUserid(user?.id);
                setUserID(user?.id)
                setLinks(data)
            }
            getLinks()
        })
    }, [])

    const addItem = () => {
        console.log(crypto.randomUUID())
    };

    const deleteItem = async (lid: string) => {
        let temp_links = links?.filter((val) => val.lid !== lid) || []
        console.log(links)
        console.log(temp_links)
        setLinks(temp_links);
        let { data, error } = await supabase.from("links").update({ links: JSON.stringify(temp_links) }).eq("userid", userID)
        console.log(data, error)
    };


    return (
        <div>
            {
                links ? links.map((item: WebsiteLinks, idx: number) => (
                    <p key={idx}>
                        {idx}. {item.lid} - {item.link}
                        <a onClick={() => deleteItem(item.lid).then()}>a</a>
                    </p>
                )) : <p>loading..</p>
            }
        </div>
    );
}

export default Dashboard;