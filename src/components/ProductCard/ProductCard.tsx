import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import AlertDialogModel from '../AlertDialog/AlertDialogModel'
import { Button } from '../ui/button'
import { deleteRestaurant } from '../../store/thunks/restaurantsThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

import RestaurantForm from '../RestaurantForm/RestaurantForm';

interface Product {
    id: number
    name: string,
    location: string,
    description: string
}

const ProductCard: React.FC<Product> = ({ name, location, description, id }: Product) => {

    const [deleteOpen, setDeleteOpen] = useState<Boolean>(false);
    const [updateFormOpen, setUpdateFormOpen] = useState<Boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const currentRestaurent = { name, location, description, id }

    const toogleDeleteButton = () => {
        setDeleteOpen(!deleteOpen)
    }

    const toogleUpdateButton = () => {
        setUpdateFormOpen(!updateFormOpen)
    }

    const getDeleteButtonState = (state: string) => {
        if (state === "cancel") {
            setDeleteOpen(false)
        }
        if (state === "contiue") {
            dispatch(deleteRestaurant(id));
            setDeleteOpen(false)
        }
    }

    const getUpdateButtonState = () => {
        setUpdateFormOpen(false)
    }

    return (
        <>
            <Card x-chunk="dashboard-01-chunk" className='py-6' key={id}>
                <CardContent>
                    <div className="text-2xl font-bold pt-2">Name:{name}</div>
                    <h4 className="text-xs text-muted-foreground pt-2">
                        Location:{location}
                    </h4>
                    <p className="text-xs text-muted-foreground pt-2">
                        Description:{description}
                    </p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button onClick={toogleUpdateButton} className='bg-slate-500'>Edit</Button>
                    <Button onClick={toogleDeleteButton} className='bg-red-500'>Delete</Button>
                </CardFooter>
            </Card>
            {deleteOpen && <AlertDialogModel getState={getDeleteButtonState} />}
            {updateFormOpen && <RestaurantForm currentRes={currentRestaurent} getUpdateState={getUpdateButtonState} />}
        </>
    )
}

export default ProductCard