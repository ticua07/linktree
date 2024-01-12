'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { Database } from "../../../database";
import { useLinksByUsername } from "../../../hooks/hooks";

interface Params {
    params: { slug: string }
}



export default function ProductDetail({ params }: Params) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const links = useLinksByUsername(params.slug);



    return <div>
        <h1>Getting links for '{params.slug}'</h1>
        {
            links?.map((item, idx) => (
                <h3 key={idx}>{item.name} -&gt; {item.link}</h3>
            ))
        }
    </div>;
}