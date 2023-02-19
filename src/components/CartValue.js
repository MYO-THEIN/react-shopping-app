import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartValue = () => {
    const { expenses, location } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, expense) => {
        return total += (expense.quantity * expense.unitPrice);
    }, 0);

    return (
        <div className='alert alert-primary'>
            <span>Cart Value: { location }{ totalExpenses }</span>
        </div>
    );
}

export default CartValue;
