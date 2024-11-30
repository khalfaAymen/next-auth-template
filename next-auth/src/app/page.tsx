

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
    console.log(session)
  return (
    <>
      {session?.user ? <h1 className="text-2xl">Welcome Mr {session?.user.name}</h1>:<h1 className="text-2xl">Please Login to see this page</h1>}
    </>
  );
}
