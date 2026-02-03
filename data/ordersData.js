export const orders = JSON.parse(localStorage.getItem('orders')) || [];


//-------function for add the Order to orders array--------

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

//----save in local storage-----

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}


//------function to get Order details by order id-------

export function getOrder(orderId){
    let matchingorder;

    orders.forEach(order => {
            if(order.id === orderId){
                matchingorder = order
            }
    });

    return matchingorder;
}