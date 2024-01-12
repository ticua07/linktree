import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface WebsiteLinks {
    name: string,
    link: string,
    lid: string
}

export function useLinksByUsername(username: string): WebsiteLinks[] | null {
    const [links, setLinks] = useState<WebsiteLinks[] | null>(null);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getData = async () => {
            let data = await supabase.from("usernames").select("userid").eq("username", username);

            if (data.data?.[0] === undefined) {
                setLinks(null)
            } else {
                let links = await supabase.from("links").select("links").eq("userid", data.data?.[0].userid || "SHOULD-NOT-HAPPEN");
                setLinks(JSON.parse(links.data?.[0].links || "[]") || null);
            };

        }
        getData()
    }, [])

    return links;
}

export async function getLinksByUserid(userid: string | undefined): Promise<WebsiteLinks[] | null> {
    const supabase = createClientComponentClient();

    let links = await supabase.from("links").select("links").eq("userid", userid);
    return JSON.parse((links.data?.[0].links || "[]") || null);
}

export async function useUser() {
    const supabase = createClientComponentClient();
    let user = (await supabase.auth.getUser()).data.user
    return user;
}

export async function getUsername(userid: string | undefined) {
    const supabase = createClientComponentClient();

    let data = await supabase.from("usernames").select("username").eq("userid", userid);

    return data.data?.[0].username
}
