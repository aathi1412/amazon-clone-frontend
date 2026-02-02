export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId){
    let matchingorder;

    orders.forEach(order => {
            if(order.id === orderId){
                matchingorder = order
            }
    });

    return matchingorder;
}