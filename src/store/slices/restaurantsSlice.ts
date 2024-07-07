import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addRestaurant, deleteRestaurant, fetchRestaurants, updateRestaurant } from '../thunks/restaurantsThunk';
import { Restaurant, RestaurantsState } from '../types/types';

const initialState: RestaurantsState = {
    restaurants: [],
    status: 'idle',
    error: null
};

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
                state.status = 'succeeded';
                state.restaurants = action.payload;
            })
            .addCase(addRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
                state.restaurants.push(action.payload);
            })
            .addCase(updateRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
                const index = state.restaurants.findIndex(restaurant => restaurant.id === action.payload.id);
                state.restaurants[index] = action.payload;
            })
            .addCase(deleteRestaurant.fulfilled, (state, action: PayloadAction<number>) => {
                state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload);
            });
    }
});

export default restaurantsSlice.reducer;