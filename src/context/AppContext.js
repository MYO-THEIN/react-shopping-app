import React, { createContext, useReducer } from 'react';

// the root Reducer
export const AppReducer = (state, action)=>{
    let new_expenses = [];
    
    switch (action.type) {
        case 'ADD_QUANTITY':
            state.expenses.map(e => {
                if (e.name === action.payload.name) {
                    e.quantity += action.payload.quantity;
                }
                
                new_expenses.push(e);
                return true;
            })

            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state
            };

        case 'RED_QUANTITY':
            state.expenses.map(e => {
                if (e.name === action.payload.name) {
                    e.quantity -= action.payload.quantity;
                }
                
                e.quantity = e.quantity < 0 ? 0: e.quantity;
                new_expenses.push(e);
                return true;
            })
                
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state
            };

        case 'DELETE_ITEM':
            state.expenses.map(e => {
                if (e.name === action.payload.name)
                    e.quantity = 0;
                
                new_expenses.push(e);
                return true;
            })

            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state
            };

        case 'CHG_LOCATION':
            action.type = "DONE";
            state.location = action.payload;
            return {
                ...state
            };

        default:
            return state;
    }
};

// sets the initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitPrice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitPrice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitPrice: 400 },
        { id: "Dinner Set", name: 'Dinner Set', quantity: 0, unitPrice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitPrice: 200 }
    ],
    location: '£'
};

// creates the context which is the thing our components import and use to get the state
export const AppContext = createContext();

// Provider component wraps the components we want to give access to the state
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, expense) => {
        return total = total + (expense.quantity * expense.unitPrice);
    }, 0);
    state.cartValue = totalExpenses;

    return (
        <AppContext.Provider
            value = {{
                expenses: state.expenses,
                location: state.location,
                cartValue: state.cartValue,
                dispatch
            }}>
            { props.children }
        </AppContext.Provider>
    );
};
