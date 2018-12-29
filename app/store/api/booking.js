import mockedResponse from "./trainsResponse.json"

export const fetchTrains = (from, to, date, time) =>
    fetch("https://checker-for-booking-uz-api.herokuapp.com/trains", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({ from, to, date, time })
    })
    .catch(() => ({ json: () => mockedResponse }));