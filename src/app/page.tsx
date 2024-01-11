'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Home() {
    const supabase = createClientComponentClient();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            setUser((await supabase.auth.getUser()).data.user);
        }
        getUser()
    }, [])

    return (
        <div>
            {user ? user?.email : <p>Loading....</p>}
        </div>
    )
}
