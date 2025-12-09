import http from "../../interceptor/index";
export const Getadmincalndr = async( )=>{
    try{ const ress = await http.get("/Schedual/GetAdminScheduals")
        return ress
    }
    catch(err)
    {
        console.log(err);
        return []
    }
   

    

}