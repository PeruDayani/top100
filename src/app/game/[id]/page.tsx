import { getGame } from "@/actions/gameActions"
import GameManager from "@/components/GameManager";

type PageProps = {
    params: {
        id: string;
    }
}

export default async function GamePage({ params }: PageProps) {
    const game = await getGame({id: parseInt(params.id)})

    if (!game) {
        return (
            <div>
                No Game found. Go back 
                <a href="/"> home </a>
            </div>
        )
    }

    return (
        <GameManager game={game} />
    )
}