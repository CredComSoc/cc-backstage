const active = true
import { authenticate, checkAdminStatus } from "~/pages/expressFetch"
export default async function (context) {

    //Code below works for authenticating and checking admin status. It is called when each page is loaded.
    //Set active to true when authentication is to be enabled (requires running CreditCoop backend)
    if(active){
        if(context.route.name == "admin-admin_login")
        {
            return
        }else if(!(await authenticate()) || !(await checkAdminStatus()))
        {
            return context.redirect('/admin/admin_login')
        }
    }

}
