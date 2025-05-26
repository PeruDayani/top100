

type ScoreboardProps = {
    title: string,
    description?: string,
    score: number
    attempts: number
}

export default function Scoreboard({
    title,
    description,
    score,
    attempts
 }: ScoreboardProps) {
    return (
        <div className="p-4 m-4 flex flex-col gap-4 border rounded-md">
            <div> {title} </div>
            {description && <div> {description} </div>}
            <div> Score: {score} </div>
            <div> Attempts: {attempts} </div>
        </div>
    )
}