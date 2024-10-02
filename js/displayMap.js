import apiHandler from './apiHandler.js';

let api = new apiHandler();
let map;

api.login().then((res) => {
    console.log(res);
    setWaypoints();
});

// TODO: Change everything before here

const getApiData = async () => {

    const res1 = await api.getTimeArrival(1675, 132);
    const res2 = await api.getTimeArrival(3281, 132);

    return {
        res1: res1.data,
        res2: res2.data
    };
    
};

const setWaypoints = () => {
    getApiData().then((data) => {

        console.log(data);

        data.res1[0].Arrive.forEach((element) => {
            let coord = element.geometry.coordinates;
            console.log(coord);
            L.marker([coord[1], coord[0]]).addTo(map);
        });

        data.res2[0].Arrive.forEach((element) => {
            let coord = element.geometry.coordinates;
            L.marker([coord[1], coord[0]]).addTo(map);
        });
    });
}

const displayMap = () => {
    map = L.map('map').setView([40.45176, -3.70282], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
};

window.onload = displayMap;