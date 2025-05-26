import { searchGames } from "@/actions/gameActions";
import Link from 'next/link'

export default async function Home() {

  const games = await searchGames({})

  return (
    <div className="p-4 flex flex-col items-center gap-4">
        {
          games.map((g) => (
              <Link href={`/game/${g.id}`} key={g.id}>
                <div className="w-72 p-4 text-center border rounded-md">
                  {g.title}
                </div>
              </Link>
          ))
        }
    </div>
  );
}
