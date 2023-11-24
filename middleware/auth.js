
import { authenticate, checkAdminStatus } from "~/pages/expressFetch"
export default async function (context) {
    return
    //Code below works for authenticating and checking admin status. It is called when each page is loaded.
    //Uncomment when showing or not developing and remove the "return" above
    // if(context.route.name == "admin-admin_login")
    // {
    //     return
    // }else if(!(await authenticate()) || !(await checkAdminStatus()))
    // {
    //     return context.redirect('/admin/admin_login')
    // }

}
