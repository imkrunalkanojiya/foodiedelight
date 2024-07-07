export interface Restaurant {
    id: number
    name: string,
    location: string,
    description: string
}

export interface RestaurantsState {
    restaurants: Restaurant[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null;
}