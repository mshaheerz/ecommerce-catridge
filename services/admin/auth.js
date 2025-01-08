import { postForm } from "@/lib/axios";



export const auth = {

    login: {
        call: (data) => postForm('/admin/login', data),
    },

}

