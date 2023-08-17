// Listening
const searchButton = document.getElementById('flightSearch');
searchButton.addEventListener('click', async function() {
    const departureAirportValue = document.getElementById('departureAirport').value;
    const destinationAirportValue = document.getElementById('destinationAirport').value;
    const dateValue = document.getElementById('date').value;
    const adultValue = document.getElementById('adult').value;
    await searchFlights(departureAirportValue, destinationAirportValue, dateValue, adultValue, 'Availableflights');
});

async function searchFlights(departureAirport, destinationAirport, date, adult, resultElementId) {
    try {
        const response = await fetch(`https://flight-fare-search.p.rapidapi.com/v2/flights/?from=${departureAirport}&to=${destinationAirport}&date=${date}&adult=${adult}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6b40d026b9msh182876c2def42fbp12c874jsn52683e712fde',
                'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
            }
        });

        const responseSearch = await response.json();
        console.log('API response:', responseSearch); // Debugging output

        const resultElement = document.getElementById(resultElementId);

        if (responseSearch.results && responseSearch.results.length > 0) {
            const flights = responseSearch.results;

            let flightInfo = 'Available flights are:\n';

            flights.forEach((flight, index) => {
                flightInfo += `Flight ${index + 1}:\n`;
                flightInfo += `Departure: ${flight.departureAirport.code} at ${flight.departureAirport.time}\n`;
                flightInfo += `Arrival: ${flight.arrivalAirport.code} at ${flight.arrivalAirport.time}\n`;
                flightInfo += `Duration: ${flight.duration.text}\n`;
                flightInfo += `Cabin Type: ${flight.cabinType}\n`;
                flightInfo += `Total Price: ${flight.totals.total} ${flight.totals.currency}\n\n`;
            });

            resultElement.textContent = flightInfo;
        } else {
            resultElement.textContent = 'You have exceeded your daily limit or No flight data available for this date.';
        }

    } catch (error) {
        console.error(error);
    }
}
