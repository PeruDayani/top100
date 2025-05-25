'use client'

import { GamePayload, Item } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";
import Fuse from 'fuse.js'

type GameManagerProps = {
    game: GamePayload
}

export default function GameManager({ game }: GameManagerProps) {

    const [turn, setTurn] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [input, setInput] = useState<string>('')
    const [pastGuesses, setPastGuesses] = useState<Item[]>([])

    const fuseSearch = useMemo(() => {
        return new Fuse(game.items, {
            keys: ['label'],
            threshold: 0.3,
            includeScore: true
        })
    }, [game.items])

    const onGuess = useCallback(() => {
        if (!input) return

        const searchResult = fuseSearch.search(input)
        const foundItems = searchResult.map(result => result.item)

        // Some edge cases will need to be addressed with fuzzy seach
        console.log("Close? ", searchResult)
    
        if (foundItems.length === 1) {
            const item = foundItems[0]
            setScore(score + item.rank)
            setPastGuesses([
                ...pastGuesses,
                item
            ])
        } 
        else if (foundItems.length > 1) {
            setPastGuesses([
                ...pastGuesses,
                {
                    rank: 0,
                    label: input,
                    value: 'You are close!'
                }
            ])
        } else {
            setPastGuesses([
                ...pastGuesses,
                {
                    rank: 0,
                    label: input,
                    value: 'N/A'
                }
            ])
        }
        
        setTurn(turn + 1)
        setInput('')
    }, [turn, input, score, pastGuesses, fuseSearch])

    return (
        <div>
            <div>
                <h1> {game.title} </h1>
                <h1> {game.description} </h1>
                <div> Score: {score} </div>
                <div> Attempts: {turn}</div>
            </div>
            <div>
                <input value={input} onChange={(ev) => setInput(ev.target.value)}/>
                <button onClick={onGuess}> Guess </button>
            </div>
            <div>
                <h1> Past Guesses: </h1>
                {
                    pastGuesses.length === 0 && (
                        <div> None so far</div>
                    )
                }
                <ol>
                    {
                        pastGuesses.map((g) => (
                            <li key={g.label}>
                                {g.rank}: {g.label} - {g.value}
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}