import React from 'react';

const Orders = ({ order, cancelOrder, editOrder }) => {

    const displayAdditions = () => {
        const additions = Object.keys(order.additions);

        const orderedAdditions = []

        additions.forEach(key => {
            if (order.additions[key]) {
                orderedAdditions.push(key);
            }
        })
        return orderedAdditions;
    }
    return (
        <div style={{margin: "2%", padding: '2%', borderRadius: "12px", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
            <h1>{order.name}:</h1>
            <p>{order.type},</p>
            <p>{order.toppings},</p>
            {displayAdditions().map((addition, i) => <p key={i}>+ {addition}</p>)}
            <p>{order.instructions}</p>
            <button className="edit-button" onClick={() => editOrder({...order, isEditing: 1})} >Edit</button>
            <button onClick={cancelOrder}>Cancel</button>
        </div>
    );
}

export default Orders;