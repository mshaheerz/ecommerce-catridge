import { get, postForm } from "@/lib/axios";

export const products = {

    get: {
        key:'products',
        call: () => get('/products'),
    },
    create:{
        call: (data) => postForm('/products', data),
    }

}

