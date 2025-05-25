export type GamePayload = {
    id: number,
    title: string,
    description: string,
    items: Item[],
    // autocomplete options
    // format item value function
    // source of the list
}

export type Item = {
    rank: number,
    label: string,
    value: string
    // Add byline
}
