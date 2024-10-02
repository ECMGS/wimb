import apiHandler from './apiHandler.js';

let api = new apiHandler();

api.login().then((res) => {
    console.log(res);
    displayTimeTable();
});

const getApiData = async () => {

    const res1 = await api.getTimeArrival(1675, 132);
    const res2 = await api.getTimeArrival(3281, 132);

    return {
        res1: res1.data,
        res2: res2.data
    };
    
};

const generateDivElement = (text) => {
    let div = document.createElement('div');
    div.textContent = text;
    return div;
}

const generateReadableTime = (time) => {
    let date = new Date(1970,0,1);
    date.setSeconds(time);
    return date.getMinutes() + "min " + date.getSeconds() + "s";
}

const appendDataToContainer = (data, container) => {
    data.forEach((element) => {
        let time = generateReadableTime(element.estimateArrive);
        let div = generateDivElement(time);
        container.appendChild(div);
    });
}

const displayTimeTable = () => {
    let fc_data_container = document.getElementById('fc_data_container');
    let cf_data_container = document.getElementById('cf_data_container');

    getApiData().then((data) => {
        console.log(data);

        let fc_data = data.res1[0].Arrive;
        let cf_data = data.res2[0].Arrive;

        console.log(fc_data);
        console.log(cf_data);

        appendDataToContainer(fc_data, fc_data_container);
        appendDataToContainer(cf_data, cf_data_container);
    });
};