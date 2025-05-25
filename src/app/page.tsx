import { searchGames } from "@/actions/gameActions";
import Link from 'next/link'

export default async function Home() {

  const games = await searchGames({})

  return (
    <div>
      <h1> Games </h1>
      <ol>
        {
          games.map((g) => (
            <li key={g.id}>
              <Link href={`/game/${g.id}`}>
                {g.title}
              </Link>
            </li>
          ))
        }

      </ol>
    </div>
  );
}
