import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateRestaurant } from '../../store/thunks/restaurantsThunk'

interface RestaurantForm {
    getUpdateState: Function,
    currentRes: any
}

const schema = z.object({
    name: z.string().nonempty('Name is required'),
    location: z.string().nonempty('Location is required'),
    description: z.string().nonempty('Description is required'),
});

const RestaurantForm: React.FC<RestaurantForm> = ({ getUpdateState, currentRes }: RestaurantForm) => {

    const dispatch = useDispatch<AppDispatch>();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: currentRes
    });

    const onSubmit = (data: any) => {
        const { id }: any = currentRes
        const updatedData = { ...data, id }
        // handle form submission
        dispatch(updateRestaurant(updatedData));
        getUpdateState(false)
        reset()
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Restaurent</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" {...register('name')} className="col-span-3" />
                        {errors.name && typeof errors.name.message === 'string' && (
                            <p className="col-span-4 text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input id="location" {...register('location')} className="col-span-3" />
                        {errors.location && typeof errors.location.message === 'string' && (
                            <p className="col-span-4 text-red-500">{errors.location.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" {...register('description')} className="col-span-3" />
                        {errors.description && typeof errors.description.message === 'string' && (
                            <p className="col-span-4 text-red-500">{errors.description.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RestaurantForm