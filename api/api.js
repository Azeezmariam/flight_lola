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
                'X-RapidAPI-Key': 'd413b30fefmsh6cfba2a3cf56ddap18b957jsn93fe1cc335fa',
                'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
            }
        });

        const responseSearch = await response.json();
        console.log('API response:', responseSearch); // Debugging output

        const resultElement = document.getElementById(resultElementId);

        if (responseSearch.results && responseSearch.results.length > 0) {
            const flights = responseSearch.results;
        
            let flightInfo = '';
        
            flights.forEach((flight, index) => {
                flightInfo += `<div class="flight-info">`;
                flightInfo += `<h4>Flight ${index + 1}</h4>`;
                flightInfo += `<p><span>Flight Name:</span> ${flight.flight_name}</p>`;
                flightInfo += `<p><span>Flight Code:</span> ${flight.flight_code}</p>`;
                flightInfo += `<p><span>Departure:</span> ${flight.departureAirport.code} at ${flight.departureAirport.time}</p>`;
                flightInfo += `<p><span>Arrival:</span> ${flight.arrivalAirport.code} at ${flight.arrivalAirport.time}</p>`;
                flightInfo += `<p><span>Duration:</span> ${flight.duration.text}</p>`;
                flightInfo += `<p><span>Cabin Type:</span> ${flight.cabinType}</p>`;
                flightInfo += `<p><span>Total Price:</span> ${flight.totals.total} ${flight.totals.currency}</p>`;
                flightInfo += `</div>`;
            });
        
            resultElement.innerHTML = flightInfo.replace(/\n/g, '<br>');
        } else {
            resultElement.textContent = 'You have exceeded your daily limit or No flight data available for this date.';
        }

    } catch (error) {
        console.error(error);
    }
}
