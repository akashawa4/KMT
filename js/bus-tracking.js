document.addEventListener('DOMContentLoaded', function() {
    const busRoutes = {
        'KMT-01': {
            name: 'Rankala Route',
            path: [
                { lat: 16.7050, lng: 74.2433 }, // Central Bus Stand
                { lat: 16.7080, lng: 74.2350 }, // Bindu Chowk
                { lat: 16.7100, lng: 74.2300 }, // Rankala Lake
                { lat: 16.7080, lng: 74.2350 }, // Return via Bindu Chowk
                { lat: 16.7050, lng: 74.2433 }  // Back to Central Bus Stand
            ],
            status: 'On Time',
            nextStop: 'Bindu Chowk',
            capacity: 60
        },
        'KMT-02': {
            name: 'Kalamba Route',
            path: [
                { lat: 16.7050, lng: 74.2433 }, // Central Bus Stand
                { lat: 16.7000, lng: 74.2400 }, // Shahupuri
                { lat: 16.6950, lng: 74.2350 }, // Kalamba
                { lat: 16.7000, lng: 74.2400 }, // Return via Shahupuri
                { lat: 16.7050, lng: 74.2433 }  // Back to Central Bus Stand
            ],
            status: 'Delayed',
            nextStop: 'Shahupuri',
            capacity: 75
        }
    };

    function interpolatePosition(start, end, progress) {
        return {
            lat: start.lat + (end.lat - start.lat) * progress,
            lng: start.lng + (end.lng - start.lng) * progress
        };
    }

    function updateBusPosition(bus, startPoint, endPoint, progress) {
        const position = interpolatePosition(startPoint, endPoint, progress);
        const left = ((position.lng - 74.2433) * 1000 + 50);
        const top = ((16.7050 - position.lat) * 1000 + 50);
        bus.style.left = `${left}%`;
        bus.style.top = `${top}%`;
    }

    Object.entries(busRoutes).forEach(([busId, routeInfo]) => {
        const bus = document.createElement('div');
        bus.className = 'bus-marker';
        bus.innerHTML = '🚌';
        bus.setAttribute('data-bus', busId);
        
        const info = document.createElement('div');
        info.className = 'bus-info-popup';
        info.textContent = `${busId}: ${routeInfo.name}`;
        bus.appendChild(info);

        document.querySelector('.bus-overlay').appendChild(bus);

        const busCard = createBusCard(busId, routeInfo);
        document.querySelector('.bus-list').appendChild(busCard);

        let currentPointIndex = 0;
        let progress = 0;
        
        function animate() {
            const currentPoint = routeInfo.path[currentPointIndex];
            const nextPoint = routeInfo.path[(currentPointIndex + 1) % routeInfo.path.length];
            
            updateBusPosition(bus, currentPoint, nextPoint, progress);
            
            progress += 0.001; // Reduced from 0.005 to make movement much slower
            
            if (progress >= 1) {
                progress = 0;
                currentPointIndex = (currentPointIndex + 1) % routeInfo.path.length;
            }
            
            requestAnimationFrame(animate);
        }

        animate();
    });

    function createBusCard(busId, routeInfo) {
        const card = document.createElement('div');
        card.className = 'bus-card';
        card.innerHTML = `
            <div class="bus-info">
                <span class="bus-number">${busId}</span>
                <span class="bus-route">${routeInfo.name}</span>
                <span class="bus-status status-${routeInfo.status.toLowerCase().replace(' ', '-')}">${routeInfo.status}</span>
            </div>
            <div class="bus-details">
                <div class="next-stop">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Next Stop: ${routeInfo.nextStop}</span>
                </div>
                <div class="capacity-container">
                    <span>Capacity:</span>
                    <div class="capacity-bar">
                        <div class="capacity-fill" style="width: ${routeInfo.capacity}%"></div>
                    </div>
                </div>
            </div>
        `;
        return card;
    }
});