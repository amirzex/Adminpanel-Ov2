import http from "../../interceptor/index";

export const Getadmincalndr = async ({startDate,endDate}) => {
    try {
        const ress = await http.get(`/Schedual/GetAdminScheduals?startDate=${startDate}&endDate=${endDate}`, {
            headers: { 'Cache-Control': 'no-cache' },
            params: { t: new Date().getTime() } // جلوگیری از کش مرورگر
        })
        return ress
    } catch (err) {
        console.log(err);
        return { data: [] }
    }
}
