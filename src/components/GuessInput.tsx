import { Item } from "@/lib/types"
import Fuse from "fuse.js"
import { useCallback, useMemo, useState } from "react"

type GuessInputProps = {
    items: Item[]
    submitGuess: (item: Item) => void
}

export default function GuessInput({ items, submitGuess }: GuessInputProps) {
    const [query, setQuery] = useState<string>('')

    const fuseSearch = useMemo(() => {
        return new Fuse(items, {
            keys: ['label'],
            threshold: 0.3,
            includeScore: true
        })
    }, [items])
    
    const onGuess = useCallback(() => {
        const searchResults = fuseSearch.search(query)
        const searchResultsCount = searchResults.length

        if (searchResultsCount === 0) {
            submitGuess({
                rank: 0,
                label: `${query[0].toUpperCase()}${query.slice(1)}`,
                value: 'Not in the Top 100.'
            })
            setQuery('')
            return
        }

        const bestMatch = searchResults[0]
        const queryLength = query.length
        const bestMatchLength = bestMatch.item.label.length

        if (Math.abs(queryLength-bestMatchLength) < 3) {
            submitGuess({
                ...bestMatch.item
            })
            setQuery('')
            return 
        }

        submitGuess({
            rank: 0,
            label: `${query[0].toUpperCase()}${query.slice(1)}`,
            value: `Close! ${searchResultsCount} potential match${searchResultsCount > 1 ? 'es': ''} found`
        })
    }, [query, fuseSearch, submitGuess]) 

    return (
        <div className="p-4 m-4 flex flex-col items-center gap-4 border rounded-md">
            <input
                className="p-2 border w-full"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        onGuess()
                    }
                }}
            />
            <button
                onClick={onGuess}
                disabled={!query}
                className="py-2 px-6 border rounded-md w-fit"
            > 
                Guess 
            </button>
        </div>
    )
}