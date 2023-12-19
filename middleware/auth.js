const active = true //If authentication is to be used or not (only turned off when developing)
import { authenticate, checkAdminStatus } from "~/pages/expressFetch"
export default async function (context) {

    //Code below works for authenticating and checking admin status. It is called when each page is loaded.
    //Set active to true when authentication is to be enabled (requires running CreditCoop backend)
    if(active){
        if(context.route.name == "admin-admin_login") //If routing to login page, no need to authenticate
        {
            return
        }else if(!(await authenticate()) || !(await checkAdminStatus())) //If the admin is not authenticated or not an admin, redirect them from anywhere to login page
        {
            return context.redirect('/admin/admin_login')
        }
    }

}
