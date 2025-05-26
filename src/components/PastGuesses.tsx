import { Item } from "@/lib/types"

type PastGuessesProps = {
    items: Item[]
}

export default function PastGuesses({ items }: PastGuessesProps) {
    if (items.length < 1) {
        return null
    }

    return (
        <div className="p-4 m-4 flex flex-col gap-4 border rounded-md">
            <div className="text-center italic"> History </div>
            <div className="flex flex-col-reverse gap-2">
                {
                    items.map((i) => (
                        <Guess key={i.label} item={i} />
                    ))
                }
            </div>
        </div>
    )
}

type GuessProps = {
    item: Item
}

export function Guess({ item }: GuessProps) {
    return (
        <div className="p-4 flex gap-4 border rounded-md">
            <div className="rounded-full border w-14 h-14 flex flex-col justify-center text-center">
                <div>
                    {item.rank}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div> {item.label} </div>
                <div className="text-sm"> {item.value} </div>
            </div>
        </div>
    )
}