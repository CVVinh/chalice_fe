export default interface CarCart {
    rentalOrdersCartId?: number,
    accountId?: number,
    vehicleId?: number,
    optionId?: number,
    insuranceId?: number,
    statusCart?: number,
    rentalStartDate?: string,
    rentalEndDate?: string,
    
    createdBy?: number,
    modifiedBy?: number,
    deletedBy?: number,

    createdAt?: string,
    modifiedAt?: string,
    deletedAt?: string,
    isDeleted?: boolean,
}
