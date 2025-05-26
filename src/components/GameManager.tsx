'use client'

import { GamePayload, Item } from "@/lib/types";
import { useCallback, useState } from "react";
import Scoreboard from "./Scoreboard";
import GuessInput from "./GuessInput";
import { isEqual } from 'lodash'
import PastGuesses from "./PastGuesses";

type GameManagerProps = {
    game: GamePayload
}

export default function GameManager({ game }: GameManagerProps) {

    const [attempts, setAttempts] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [pastGuesses, setPastGuesses] = useState<Item[]>([])

    const submitGuess = useCallback((item: Item) => {
        const alreadyGuessed = pastGuesses.find((i) => isEqual(i, item))
        if (!alreadyGuessed) {
            setScore(score + item.rank)
            setAttempts(attempts + 1)
            setPastGuesses([
                ...pastGuesses,
                item
            ])
        }

        // TODO: Give feedback if already guessed
    }, [attempts, score, pastGuesses])

    return (
        <div>
            <Scoreboard
                title={game.title}
                description={game.description}
                score={score}
                attempts={attempts}
            />
            <GuessInput
                items={game.items}
                submitGuess={submitGuess}
            />
            <PastGuesses
                items={pastGuesses}
            />
        </div>
    )
}