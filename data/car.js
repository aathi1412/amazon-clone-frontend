class Car{
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(brand, model){
        this.#brand = brand
        this.#model = model
        this.speed = 0;
        this.isTrunkOpen = false;
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'close';

        console.log(`Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed} km/h, Trunk status: ${trunkStatus}`);

        
    }
    go(){
        if(!this.isTrunkOpen){
            this.speed += 5;
        }

        if(this.speed > 200){
            this.speed = 200;
        }
    }
    brake(){
        this.speed -= 5;

        if(this.speed < 0){
            this.speed = 0;
        }
    }

    openTrunk(){
        if(this.speed === 0) this.isTrunkOpen = true;
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }


}

class RaceCar extends Car{
    accelaration;
    

    constructor(brand, model, accelaration){
        super(brand, model);
        this.accelaration =  accelaration;
    }

    go(){
        this.speed += this.accelaration;

        if(this.speed > 300){
            this.speed = 300;
        }
    }

    openTrunk(){
        console.log('Race Cars DO NOT Have Trunk');
    }
    closeTrunk(){
        console.log('Race Cars DO NOT Have Trunk');
    }

}

const car1 = new Car('toyota', 'corolla');

car1.go();
car1.go();
car1.brake();
car1.brake();
car1.go();
car1.go();


car1.openTrunk();
car1.closeTrunk();

car1.displayInfo();

// -----------------------------------

const car2 = new Car('tesla', 'model 3');

car2.go();
car2.go();
car2.brake();
car2.go();
car2.go();

car2.openTrunk();

car2.displayInfo();

// --------------------
const raceCar1 = new RaceCar('McLaren', 'F1', 20);
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.brake();

raceCar1.openTrunk();
raceCar1.displayInfo();