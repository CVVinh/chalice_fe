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
            UPDATE: (id: number) => `/func/update-payment-method-info?paymentMethodId=${id}`,
            DELETE: (id: number) => `/func/delete-payment-method?payment_method_id=${id}`,
        },
        RENTAL_ORDER: {
            LIST: `/rentalOrder`,
            CREATE: `/rentalOrder`,
        },
        RENTAL_ORDER_CART: {
            LIST: `/func/get-rental-order-cart-list`,
            DETAIL: `/func/get-rental-order-cart-info`,
            CREATE: `/func/add-rental-order-cart`,
            CREATE_MULTI: `/func/add-multi-rental-order-cart`,
            UPDATE: `/func/update-rental-order-cart-info`,
            DELETE_SOFT: (id: number) => `/func/delete-soft-rental-order-cart?rentalOrdersCartId=${id}`,
            DELETE_HARD: (id: number) => `/func/delete-hard-rental-order-cart?rentalOrdersCartId=${id}`,
            DELETE_SOFT_MULTI: `/func/delete-soft-rental-order-cart`,
        },
    }
}

export default CONST
