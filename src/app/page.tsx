'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "../../hooks/hooks";

export default function Home() {
    const supabase = createClientComponentClient();
    const user = useUser();

    return (
        <div>
            {user ? user?.email : <p>Loading....</p>}
        </div>
    )
}
