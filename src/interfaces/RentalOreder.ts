import RentalOrederDetail from "./RentalOrederDetail";

export default interface RentalOrder {
    rental_orders_id?: number,
    total_amount?: number,
    rental_status?: number,
    
    created_at?: string,
    modified_at?: string,
    deleted_at?: string,

    created_by?: number,
    modified_by?: number,
    deleted_by?: number,
    is_deleted?: boolean,
    details?: [RentalOrederDetail]
}
