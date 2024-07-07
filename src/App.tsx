import React, { useEffect, lazy, Suspense, useState } from 'react';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';

import { Button } from './components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/index';
import { addRestaurant, fetchRestaurants } from './store/thunks/restaurantsThunk';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ProductCard = lazy(() => import('./components/ProductCard/ProductCard'));

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  location: z.string().nonempty('Location is required'),
  description: z.string().nonempty('Description is required'),
});

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const status = useSelector((state: RootState) => state.restaurants.status);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // handle form submission
    dispatch(addRestaurant(data));
    setIsDialogOpen(false);
    reset();
  };

  const handleFetchRestaurants = () => {
    if (status === 'idle') {
      dispatch(fetchRestaurants());
    }
  };

  useEffect(() => {
    handleFetchRestaurants();
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        {status === 'succeeded' ? (
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="w-full flex justify-end">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add New Restaurant</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Restaurent</DialogTitle>
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
                      <Button type="submit">Add Restaurent</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Suspense fallback={<Loader />}>
                {restaurants.map((item) => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </Suspense>
            </div>
            <div className='w-full flex justify-center'>
              {restaurants.length === 0 && <p>No Restaurent Found!</p>}
            </div>
          </main>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default App;
