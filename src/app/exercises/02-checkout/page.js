'use client';
import React, {useEffect} from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
    const [items, dispatch] = React.useReducer(
        reducer,
        null,
    );
    const [savedCart, saveCart] = useLocalStorage("savedCart", null);

    useEffect(() => {
        if (items) {
            saveCart(items);
        }
    }, [items]);

    useEffect(() => {
        if (savedCart) {
            dispatch({
                type: 'restore',
                items: savedCart,
            });
        }else{
            dispatch({
                type: 'restore',
                items: [],
            });
        }
    }, []);

    return (
        <>
            <h1>Neighborhood Shop</h1>

            <main>
                <div className="items">
                    {DATA.map((item) => (
                        <StoreItem
                            key={item.id}
                            item={item}
                            handleAddToCart={(item) => {
                                dispatch({
                                    type: 'add-item',
                                    item,
                                });
                            }}
                        />
                    ))}
                </div>

                <CheckoutFlow
                    items={items}
                    taxRate={0.15}
                    handleDeleteItem={(item) =>
                        dispatch({
                            type: 'delete-item',
                            item,
                        })
                    }
                />
            </main>
        </>
    );
}

export default CheckoutExercise;
