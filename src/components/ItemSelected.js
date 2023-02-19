import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ItemSelected = (props) => {
    const { dispatch } = useContext(AppContext);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = ()=>{
        const item = {
            name,
            quantity: parseInt(quantity)
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_QUANTITY',
                payload:  item
            });
        } else {
            dispatch({
                type: 'ADD_QUANTITY',
                payload: item
            });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className='input-group mb-3' style={{ marginLeft: '2rem' }}>
                    <div className='input-group-prepend'>
                        <label className='input-group-text' htmlFor='inputGroupSelect01'>Items</label>
                    </div>
                    <select className='custom-select' id="inputGroupSelect01" onChange={e => setName(e.target.value)}>
                        <option defaultValue>choose ...</option>
                        <option value="Shirt" name="Shirt">Shirt</option>
                        <option value="Dress" name="Dress">Dress</option>
                        <option value="Jeans" name="Jeans">Jeans</option>
                        <option value="Dinner Set" name="Dinner Set">Dinner Set</option>
                        <option value="Bags" name="Bags">Bags</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className='input-group-text' htmlFor='inputGroupSelect02'>Quantity</label>                
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={e => setAction(e.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>

                    <span className="eco" style={{ marginLeft: '2rem', marginRight: '8px' }}></span> 
                    <input required='required' type='number' id='cost' value={ quantity } style={{ size: 10 }} onChange={e => setQuantity(e.target.value)}></input>
                    <button className="btn btn-primary" onClick={ submitEvent } style={{ marginLeft: '2rem' }}>Save</button> 
                </div>
            </div>
        </div>
    );
};

export default ItemSelected;
