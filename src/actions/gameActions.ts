'use server'

import { AllGames } from "@/lib/constants"
import { GamePayload } from "@/lib/types"

// Get all games

type SearchGamesParams = {
    title?: string
}

export async function searchGames({ title = '' }: SearchGamesParams): Promise<GamePayload[]> {
    return AllGames.filter((g) => g.title.toLowerCase().includes(title.toLowerCase()))
}

// Get game by id

type GetGameParams = {
    id: number
}

export async function getGame({ id }: GetGameParams): Promise<GamePayload | undefined> {
    return AllGames.find((g) => g.id === id)
}