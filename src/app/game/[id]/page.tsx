import { getGame } from "@/actions/gameActions"
import GameManager from "@/components/GameManager";
import Link from 'next/link'

type PageProps = {
    params: Promise<{
        id: string;
    }>
}

export default async function GamePage({ params }: PageProps) {
    const { id } = await params
    const game = await getGame({id: parseInt(id)})

    if (!game) {
        return (
            <div>
                No Game found. Go back 
                <Link href="/"> home </Link>
            </div>
        )
    }

    return (
        <GameManager game={game} />
    )
}