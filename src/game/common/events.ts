export class GameEvent<T> {
    private readonly _listeners: Set<(state: T) => void> = new Set();

    subscribe(listener: (state: T) => void): () => void {
        this._listeners.add(listener);

        return () => {
            this._listeners.delete(listener);
        }
    }

    notify(state: T): void {
        this._listeners.forEach(listener => listener(state));
    }
}