import { searchGames } from "@/actions/gameActions";

export default async function Home() {

  const games = await searchGames({})

  return (
    <div>
      <h1> Games </h1>
      <ol>
        {
          games.map((g) => (
            <li key={g.id}>
              <a href={`/game/${g.id}`}>
                {g.title}
              </a>
            </li>
          ))
        }

      </ol>
    </div>
  );
}
