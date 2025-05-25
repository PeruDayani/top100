import Fuse from 'fuse.js'
import { Item } from "./types";

// TODO: fixxy matching
export function findItem(query: string, items: Item[]): Item | undefined {
    return items.find((i) => i.label.toLowerCase() === query.toLowerCase())
}
