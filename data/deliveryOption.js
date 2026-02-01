import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999 
}];


export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((Option) => {
        if(Option.id === deliveryOptionId){
            deliveryOption = Option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function validDeliveryOption(deliveryOptionId){

    let found = false;
    deliveryOptions.forEach((Option) => {
        if(Option.id === deliveryOptionId){
            found = true;
        }
    });
    return found;
}

// export function calculateDeliveryDate(deliveryOption){
//     const today = dayjs();
//     const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

//     //  console.log(deliveryDate.format('dddd'));

//      const dateString = deliveryDate.format('dddd, MMMM D');

//      return dateString;
// }

export function calculateDeliveryDate(deliveryOption){
    let addDate = dayjs();
    let deliveryDate1 = deliveryOption.deliveryDays;

    while(deliveryDate1 != 0 ){
        addDate = addDate.add(1, 'days'); 
        if(isWeekend(addDate)){ 
            continue;
        }
        deliveryDate1--;
    }
    const dateString = addDate.format('dddd, MMMM D');
    return dateString;
}

function isWeekend(date){
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Sunday' || dayOfWeek === 'Saturday';
}

export function formatDeliveryDate(date){
    date = dayjs(date);
    const dd = date.format('MMMM D');
    return dd;
}