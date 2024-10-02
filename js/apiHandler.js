import getCredentials from "./credentialsRetreiever.js";

class ApiHandler {
    constructor() {
        this.accessToken = "";
    }

    async login () {
        const url = 'https://openapi.emtmadrid.es/v2/mobilitylabs/user/login/';

        const credentials = getCredentials(); 

        const raw_res = await fetch(url, {
            headers: credentials,
            method: 'GET'
        });

        const res = await raw_res.json();

        if (res.code = "00") {
            this.accessToken = res.data[0].accessToken;
        }

        return res;
    }

    async isUserLogged() {

        if (this.accessToken === "") {
            return false;
        }

        const url = 'https://openapi.emtmadrid.es/v2/mobilitylabs/user/whoami/';

        const headerData = {
            'accessToken': this.accessToken
        };

        const raw_res = await fetch(url, {
            headers: headerData,
            method: 'GET'
        });

        const res = await raw_res.json();

        return res.code === "02";
    }

    async getTimeArrival(stopId, line) {

        if (this.accessToken === "") {
            return false;
        }

        const url = `https://openapi.emtmadrid.es/v2/transport/busemtmad/stops/${stopId}/arrives/${line}/`;
        
        const headerData = {
            'accessToken': this.accessToken
        };

        const format_date = (date) => {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return `${year}${month}${day}`;
        }

        const body = {
            cultureInfo: "ES",
            Text_StopRequired_YN: "N",
            Text_EstimationsRequired_YN: "Y",
            Text_IncidencesRequired_YN: "Y",
            DateTime_Referenced_Incidencies_YYYYMMDD: format_date(new Date())
        }

        const raw_res = await fetch(url, {
            headers: headerData,
            method: 'POST',
            body: JSON.stringify(body)
        });

        const res = await raw_res.json();

        return res;
    }
}

export default ApiHandler;