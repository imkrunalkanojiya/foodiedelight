import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Restaurant } from '../types/types';

// Thunks
export const fetchRestaurants: any = createAsyncThunk<Restaurant[]>('restaurants/fetchRestaurants', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/fakedata`);
    return response.data;
});

export const addRestaurant: any = createAsyncThunk('restaurants/addRestaurant', async (newRestaurant) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/fakedata`, newRestaurant);
    return response.data;
});

export const updateRestaurant: any = createAsyncThunk('restaurants/updateRestaurant', async (updatedRestaurant) => {
    const { id }: any = updatedRestaurant;
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/fakedata/${id}`, updatedRestaurant);
    return response.data;
});

export const deleteRestaurant: any = createAsyncThunk('restaurants/deleteRestaurant', async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/fakedata/${id}`);
    return id;
});