const CONST = {
    API: {
        ITEMSET: {
            LIST: '/func/get-item-set-list',
            DETAIL: (id: string) => `/func/get-item-set-info?itemIdSet=${id}`,
            CREATE: `/func/add-item-set`,
            UPDATE: `/func/update-item-set-info`,
            DELETE: `/func/delete-item-set`,

        },
        MAKER: {
            LIST: '/func/get-maker-list',

        },
        SHIPPING: {
            DETAIL: (id: string) => `/func/get-shipping-info?assetId=${id}`,
        },
        PICKUP: {
            DETAIL: (id: string) => `/func/get-pickup-info?assetId=${id}`,
            UPDATE: `/func/update-pickup`
        },
        KITTING: {
            LIST: '/master/get-kitting-list',
            DETAIL: (id: string) => `/func/get-kitting-info?assetId=${id}`,
            UPDATE: `/func/update-kitting`,
        },
        REPAIRING: {
            DETAIL: (id: string) => `/func/get-repairing-info?assetId=${id}`,
            UPDATE: `/func/update-repairing-info`,
        },
        DISPOSAL: {
            DETAIL: (id: string) => `/func/get-disposal-info?assetId=${id}`,
            UPDATE: `/func/update-disposal-info`,
        },
        ACCOUNT: {
            LIST: '/func/get-account-list',
        },
        OUTSOURCING_COMPANY: {
            LIST: '/func/get-outsourcing-company-list',
        },
        BASE: {
            GET_ALL_LIST_BASE: `/func/get-base-list`,
            GET_ACCOUNT_USER_INFO: (id: number) =>  `/func/get-base-user-info?accountId=${id}`,
        },
        PAYMENT_METHOD: {
            LIST: `/func/get-payment-method-list`,
            DETAIL: (id: number) =>  `/func/get-payment-method-info?paymentMethodId=${id}`,
            CREATE: `/func/add-payment-method`,
            CREATE_MULTI: `/func/add-multi-payment-method`,
            UPDATE: (id: number) => `/func/update-payment-method-info?paymentMethodId=${id}`,
            DELETE: (id: number) => `/func/delete-payment-method?payment_method_id=${id}`,
            DELETE_MULTI: `/func/delete-multi-payment-method`,
            EXPORT: `/func/export-payment-method-list`,
        },
        RENTAL_ORDER: {
            LIST: `/rentalOrder`,
            CREATE: `/rentalOrder`,
        },
        CAR_CART: {
            //LIST: `/func/get-car-cart-list`,
            LIST: `/func/get-list-car-cart`,
            DETAIL: `/func/get-car-cart-info`,
            CAR_CART_DETAIL: `/func/get-list-car-cart`,
            CREATE: `/func/add-car-cart`,
            CREATE_MULTI: `/func/add-multi-car-cart`,
            UPDATE: `/func/update-car-cart-info`,
            DELETE_SOFT: (id: number) => `/func/delete-soft-car-cart?rentalOrdersCartId=${id}`,
            DELETE_HARD: (id: number) => `/func/delete-hard-car-cart?rentalOrdersCartId=${id}`,
            DELETE_SOFT_MULTI: `/func/delete-soft-car-cart`,
        },
        OPTION: {
            LIST: `/func/get-option-list`,
            DETAIL: (id: number) =>  `/func/get-option-info?option_id=${id}`,
            CREATE: `/func/add-option`,
            CREATE_MULTI: `/func/add-multi-option`,
            UPDATE: `/func/update-option-info`,
            DELETE: (id: number) => `/func/delete-option?option_id=${id}`,
            DELETE_MULTI: `/func/delete-multi-option`,
            EXPORT: `/func/export-option-list`,
        },
        INSURANCE: {
            LIST: `/func/get-insurance-list`,
            DETAIL: (id: number) =>  `/func/get-insurance-info?insurance_id=${id}`,
            CREATE: `/func/add-insurance`,
            CREATE_MULTI: `/func/add-multi-insurance`,
            UPDATE: `/func/update-insurance-info`,
            DELETE: (id: number) => `/func/delete-insurance?insurance_id=${id}`,
            DELETE_MULTI: `/func/delete-multi-insurance`,
            EXPORT: `/func/export-insurance-list`,
        },
    }
}

export default CONST
