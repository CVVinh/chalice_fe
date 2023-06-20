
import Vehicles from "./Vehicles";
import Options from "./Options";
import Insurances from "./Insurances";
export default interface CarCart {
    carCartId?: number,
    accountId?: number,
    vehicleId?: number,
    optionId?: number,
    insuranceId?: number,
    statusCart?: number,
    totalHour?: number,
    totalHourCar?: number,
    totalOption?: number,
    totalInsurance?: number,
    totalCost?: number,
    rentalStartDate?: string,
    rentalEndDate?: string,
    
    createdBy?: number,
    modifiedBy?: number,
    deletedBy?: number,

    createdAt?: string,
    modifiedAt?: string,
    deletedAt?: string,
    isDeleted?: boolean,

    vehicles?: Vehicles;
    options?: Options[];
    insurances?: Insurances[];
}
