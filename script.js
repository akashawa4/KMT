// KMT Tracker - Main JavaScript File

// Bus stops array for search suggestions
const busStops = [
    'Central Bus Stand',
    'Railway Station',
    'Rankala Lake',
    'New Palace',
    'Rajarampuri',
    'Tarabai Park',
    'Bindu Chowk',
    'Shahupuri',
    'Kalamba',
    'Market Yard',
    'Shivaji University',
    'Mahadwar Road'
];

// Cache DOM elements for better performance
const domCache = {};

// Helper function to get DOM elements with caching
function getElement(selector) {
    if (!domCache[selector]) {
        domCache[selector] = document.querySelector(selector);
    }
    return domCache[selector];
}

// Helper function to get multiple DOM elements with caching
function getElements(selector) {
    if (!domCache[selector]) {
        domCache[selector] = document.querySelectorAll(selector);
    }
    return domCache[selector];
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initNavigation();
    initForms();
    initModal();
    initAnimations();
    
    // Initialize language buttons
    const languageButtons = document.querySelectorAll('.language-btn');
    
    // Add click event to each language button
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected language from button
            const selectedLang = this.getAttribute('data-lang');
            
            // Apply translations using the language code
            applyTranslations(selectedLang);
            
            // Save language preference
            localStorage.setItem('preferred-language', selectedLang);
        });
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
        // Find the button for saved language
        const savedLangButton = document.querySelector(`.language-btn[data-lang="${savedLanguage}"]`);
        if (savedLangButton) {
            // Simulate click on the saved language button
            savedLangButton.click();
        }
    }
    
    // Initialize bus tracking simulation
    initBusTracking();
    
    // Initialize schedule tabs
    initScheduleTabs();
});

// Apply translations using the language code
function applyTranslations(langCode) {
    if (!window.translations || !window.translations[langCode]) {
        console.error('Translations not found for language:', langCode);
        return;
    }
    
    // Update text content based on data-translate attributes
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (window.translations[langCode][key]) {
            element.textContent = window.translations[langCode][key];
        }
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (window.translations[langCode][key]) {
            element.placeholder = window.translations[langCode][key];
        }
    });
    
    // Update document language for accessibility
    document.documentElement.lang = langCode;
}

// Get translation for a key (used in other functions)
function getTranslation(key, langCode) {
    // Get current language from active button
    if (!langCode) {
        const activeButton = document.querySelector('.language-btn.active');
        langCode = activeButton ? activeButton.getAttribute('data-lang') : 'en';
    }
    
    if (window.translations && window.translations[langCode] && window.translations[langCode][key]) {
        return window.translations[langCode][key];
    }
    
    // Fallback to English or key itself
    return window.translations?.en?.[key] || key;
}

// Initialize navigation and smooth scrolling
function initNavigation() {
    // Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});
 // Smooth scrolling for navigation links

    
    // Mobile menu toggle
    const mobileMenuBtn = getElement('.mobile-menu-btn');
    const navLinksContainer = getElement('.nav-links');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
}

// Initialize language selector
function initLanguageSelector() {
    const languageButtons = getElements('.language-btn');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const language = this.getAttribute('data-lang');
            changeLanguage(language);
        });
    });
}

// Change language function
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('preferred-language', lang);
    updateLanguageUI(lang);
    
    // Update text content based on data-translate attributes
    const elements = getElements('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    const placeholders = getElements('[data-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Update language UI (active button)
function updateLanguageUI(lang) {
    const languageButtons = getElements('.language-btn');
    languageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Get translation for a key
function getTranslation(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return translations.english[key] || key;
}

// Initialize forms
function initForms() {
    // Contact form
    const contactForm = getElement('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Search form
    const searchForm = getElement('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchForm);
    }
    
    // Fare calculator form
    const fareForm = getElement('#fare-form');
    if (fareForm) {
        fareForm.addEventListener('submit', handleFareForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    showLoading('contact-response');
    
    // Simulate form submission with delay (would be an API call in production)
    setTimeout(() => {
        const responseDiv = getElement('#contact-response');
        if (responseDiv) {
            responseDiv.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <p>${getTranslation('contact_success')}</p>
                </div>
            `;
        }
        this.reset();
    }, 1000);
}

// Handle search form submission
function handleSearchForm(e) {
    e.preventDefault();
    
    const fromInput = this.querySelector('input[data-placeholder="search_from"]');
    const toInput = this.querySelector('input[data-placeholder="search_to"]');
    
    if (!fromInput.value || !toInput.value) {
        showAlert(getTranslation('search_error'));
        return;
    }
    
    showLoading('search-results');
    
    // Simulate search results with delay (would be an API call in production)
    setTimeout(() => {
        displaySearchResults(fromInput.value, toInput.value);
    }, 1000);
}

// Display search results
function displaySearchResults(from, to) {
    const resultsDiv = getElement('#search-results');
    
    if (!resultsDiv) return;
    
    // Generate random departure and arrival times
    const now = new Date();
    const departureTime1 = new Date(now.getTime() + 30 * 60000);
    const arrivalTime1 = new Date(departureTime1.getTime() + 30 * 60000);
    const departureTime2 = new Date(now.getTime() + 60 * 60000);
    const arrivalTime2 = new Date(departureTime2.getTime() + 30 * 60000);
    
    resultsDiv.innerHTML = `
        <div class="search-result">
            <h3>Available Routes</h3>
            <div class="route-option">
                <div class="route-details">
                    <span class="route-number">KMT-101</span>
                    <div class="route-path">
                        <span>${from}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span>${to}</span>
                    </div>
                </div>
                <div class="route-time">
                    <div>Departure: ${formatTime(departureTime1)}</div>
                    <div>Arrival: ${formatTime(arrivalTime1)}</div>
                </div>
                <button class="book-now" onclick="showTicketingOptions('KMT-101', '${from}', '${to}', '${formatTime(departureTime1)}')">Book Now</button>
            </div>
            <div class="route-option">
                <div class="route-details">
                    <span class="route-number">KMT-102</span>
                    <div class="route-path">
                        <span>${from}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span>${to}</span>
                    </div>
                </div>
                <div class="route-time">
                    <div>Departure: ${formatTime(departureTime2)}</div>
                    <div>Arrival: ${formatTime(arrivalTime2)}</div>
                </div>
                <button class="book-now" onclick="showTicketingOptions('KMT-102', '${from}', '${to}', '${formatTime(departureTime2)}')">Book Now</button>
            </div>
        </div>
    `;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Handle fare form submission
function handleFareForm(e) {
    e.preventDefault();
    
    const from = getElement('#fare-from').value;
    const to = getElement('#fare-to').value;
    const fareType = getElement('#fare-type').value;
    
    if (!from || !to) {
        showAlert(getTranslation('fare_error'));
        return;
    }
    
    showLoading('fare-result');
    
    // Simulate fare calculation with delay
    setTimeout(() => {
        calculateFare(from, to, fareType);
    }, 800);
}

// Add this to your existing script.js
function initializeSearchSuggestions() {
    const fromInput = document.getElementById('from-location');
    const toInput = document.getElementById('to-location');
    const fromSuggestions = document.getElementById('from-suggestions');
    const toSuggestions = document.getElementById('to-suggestions');

    function showSuggestions(input, suggestionsList) {
        const value = input.value.toLowerCase();
        if (value.length < 2) {
            suggestionsList.style.display = 'none';
            return;
        }

        const filtered = busStops.filter(stop => 
            stop.toLowerCase().includes(value)
        );

        if (filtered.length > 0) {
            suggestionsList.innerHTML = filtered.map(stop => `
                <div class="suggestion-item">
                    <i class="fas fa-map-marker-alt"></i> ${stop}
                </div>
            `).join('');
            suggestionsList.style.display = 'block';

            // Add click handlers to suggestions
            const items = suggestionsList.getElementsByClassName('suggestion-item');
            Array.from(items).forEach(item => {
                item.addEventListener('click', () => {
                    input.value = item.textContent.trim().replace('', '');
                    suggestionsList.style.display = 'none';
                });
            });
        } else {
            suggestionsList.style.display = 'none';
        }
    }

    // Event listeners for from input
    if (fromInput && fromSuggestions) {
        fromInput.addEventListener('input', () => showSuggestions(fromInput, fromSuggestions));
        fromInput.addEventListener('focus', () => {
            if (fromInput.value.length >= 2) {
                showSuggestions(fromInput, fromSuggestions);
            }
        });
    }

    // Event listeners for to input
    if (toInput && toSuggestions) {
        toInput.addEventListener('input', () => showSuggestions(toInput, toSuggestions));
        toInput.addEventListener('focus', () => {
            if (toInput.value.length >= 2) {
                showSuggestions(toInput, toSuggestions);
            }
        });
    }

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-input-group')) {
            if (fromSuggestions) fromSuggestions.style.display = 'none';
            if (toSuggestions) toSuggestions.style.display = 'none';
        }
    });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchSuggestions();
    // ... your existing initialization code ...
});
// Add this function to handle route search
function findRoutes() {
    const fromLocation = document.getElementById('from-location').value;
    const toLocation = document.getElementById('to-location').value;
    const searchResults = document.getElementById('search-results');
    
    if (!fromLocation || !toLocation) {
        searchResults.innerHTML = '<div class="alert alert-warning">Please enter both starting and destination locations</div>';
        return;
    }
    
    // Show loading indicator
    searchResults.innerHTML = '<div class="loading-indicator"></div>';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Sample route data
        const routes = [
            {
                routeId: 'KMT-01',
                from: fromLocation,
                to: toLocation,
                departureTime: '07:30 AM',
                arrivalTime: '08:15 AM',
                fare: '₹25',
                distance: '7.5 km',
                duration: '45 min',
                stops: 8,
                status: 'On Time'
            },
            {
                routeId: 'KMT-03',
                from: fromLocation,
                to: toLocation,
                departureTime: '08:00 AM',
                arrivalTime: '08:50 AM',
                fare: '₹30',
                distance: '8.2 km',
                duration: '50 min',
                stops: 10,
                status: 'Delayed'
            },
            {
                routeId: 'KMT-05',
                from: fromLocation,
                to: toLocation,
                departureTime: '08:30 AM',
                arrivalTime: '09:10 AM',
                fare: '₹25',
                distance: '7.2 km',
                duration: '40 min',
                stops: 7,
                status: 'On Time'
            }
        ];
        
        // Display results
        if (routes.length > 0) {
            let resultsHTML = `
                <h3>Available Routes</h3>
                <div class="routes-container">
            `;
            
            routes.forEach(route => {
                const statusClass = route.status === 'On Time' ? 'on-time' : 'delayed';
                resultsHTML += `
                    <div class="route-card">
                        <div class="route-header">
                            <span class="route-id">${route.routeId}</span>
                            <span class="status-badge ${statusClass}">${route.status}</span>
                        </div>
                        <div class="route-body">
                            <div class="route-stations">
                                <div class="station-from">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div>
                                        <span class="time">${route.departureTime}</span>
                                        <span class="name">${route.from}</span>
                                    </div>
                                </div>
                                <div class="route-line">
                                    <span class="stops">${route.stops} stops</span>
                                </div>
                                <div class="station-to">
                                    <i class="fas fa-map-marker"></i>
                                    <div>
                                        <span class="time">${route.arrivalTime}</span>
                                        <span class="name">${route.to}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="route-info">
                                <span><i class="fas fa-clock"></i> ${route.duration}</span>
                                <span><i class="fas fa-road"></i> ${route.distance}</span>
                                <span><i class="fas fa-ticket-alt"></i> ${route.fare}</span>
                            </div>
                        </div>
                        <div class="route-footer">
                            <button class="btn book-btn" onclick="showTicketingOptions('${route.routeId}', '${route.from}', '${route.to}', '${route.departureTime}')">Book Ticket</button>
                            <button class="btn track-btn" onclick="trackBus('${route.routeId}')">Track Bus</button>
                        </div>
                    </div>
                `;
            });
            
            resultsHTML += `</div>`;
            searchResults.innerHTML = resultsHTML;
        } else {
            searchResults.innerHTML = '<div class="alert alert-info">No routes found between these locations. Please try different locations.</div>';
        }
    }, 1500); // Simulate loading delay
}

// Add this function to track a specific bus
function trackBus(routeId) {
    const modal = document.getElementById('feature-modal');
    const modalContent = document.getElementById('modal-content-container');
    
    if (!modal || !modalContent) return;
    
    modalContent.innerHTML = `
        <h2>Live Tracking - ${routeId}</h2>
        <div class="tracking-container">
            <div class="tracking-map">
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=16.7050,74.2433&zoom=14&size=600x300&maptype=roadmap&markers=color:red|16.7050,74.2433&key=YOUR_API_KEY" alt="Map">
                <div class="bus-position" style="left: 45%; top: 50%;">
                    <i class="fas fa-bus"></i>
                </div>
            </div>
            <div class="tracking-info">
                <div class="info-item">
                    <span class="label">Current Location:</span>
                    <span class="value">Bindu Chowk</span>
                </div>
                <div class="info-item">
                    <span class="label">Next Stop:</span>
                    <span class="value">Rankala Lake (3 min)</span>
                </div>
                <div class="info-item">
                    <span class="label">Speed:</span>
                    <span class="value">32 km/h</span>
                </div>
                <div class="info-item">
                    <span class="label">Occupancy:</span>
                    <span class="value">Medium</span>
                </div>
                <div class="info-item">
                    <span class="label">Last Updated:</span>
                    <span class="value">Just now</span>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Add event listener to the search button
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', findRoutes);
    }
});

// Format time for display
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Show loading indicator
function showLoading(elementId) {
    const element = getElement(`#${elementId}`);
    if (element) {
        element.innerHTML = '<div class="loading-indicator"></div>';
    }
}

// Calculate fare and display result
function calculateFare(from, to, fareType) {
    // Simulate fare calculation based on distance
    const baseFare = Math.floor(Math.random() * 50) + 20; // Random fare between 20 and 70
    
    // Apply discount based on fare type
    let discount = 0;
    let fareTypeText = getTranslation('fare_regular');
    
    if (fareType === 'senior') {
        discount = 0.25;
        fareTypeText = getTranslation('fare_senior');
    } else if (fareType === 'student') {
        discount = 0.15;
        fareTypeText = getTranslation('fare_student');
    }
    
    const finalFare = baseFare * (1 - discount);
    
    // Display result
    const fareResultDiv = getElement('#fare-result');
    if (fareResultDiv) {
        fareResultDiv.innerHTML = `
            <h3>${getTranslation('fare_details')}</h3>
            <p><strong>${getTranslation('fare_route')}:</strong> ${from} ${getTranslation('fare_to_connector')} ${to}</p>
            <p><strong>${getTranslation('fare_type')}:</strong> ${fareTypeText}</p>
            <p><strong>${getTranslation('fare_base')}:</strong> ₹${baseFare.toFixed(2)}</p>
            ${discount > 0 ? `<p><strong>${getTranslation('fare_discount')}:</strong> ${(discount * 100)}%</p>` : ''}
            <p><strong>${getTranslation('fare_final')}:</strong> ₹${finalFare.toFixed(2)}</p>
        `;
    }
}

// ... existing code ...

// Initialize modal functionality
function initModal() {
    const modal = getElement('#feature-modal');
    const closeBtn = getElement('.close-modal');
    
    if (modal && closeBtn) {
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Close modal when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // Add click event to feature cards
    const featureCards = getElements('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('.feature-title').textContent;
            showFeatureDetails(featureTitle);
        });
    });
}

// Function to close the modal
function closeModal() {
    const modal = getElement('#feature-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Function to show feature details in modal
function showFeatureDetails(featureTitle) {
    const modalContent = getElement('#modal-content-container');
    if (!modalContent) return;
    
    let content = '';
    
    switch(featureTitle) {
        case 'Mobile App':
            content = `
                <h2>Mobile App <span class="badge coming-soon">Coming Soon</span></h2>
                <div class="feature-details">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Mobile App">
                    </div>
                    <div class="feature-info">
                        <p>The KMT Tracker mobile application is currently under development and will be available soon for Android and iOS devices.</p>
                        
                        <h3>Upcoming Features:</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle"></i> Real-time bus tracking with live map view</li>
                            <li><i class="fas fa-check-circle"></i> Offline capabilities for route information</li>
                            <li><i class="fas fa-check-circle"></i> Journey planning with multiple stops</li>
                            <li><i class="fas fa-check-circle"></i> Digital ticket purchase and storage</li>
                            <li><i class="fas fa-check-circle"></i> Push notifications for service updates</li>
                            <li><i class="fas fa-check-circle"></i> Personalized travel history and favorites</li>
                        </ul>
                        
                        <div class="app-stores">
                            <p>Sign up to be notified when our app launches:</p>
                            <div class="notification-form">
                                <input type="email" placeholder="Enter your email" class="form-control">
                                <button class="btn btn-primary">Notify Me</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Notifications':
            content = `
                <h2>Real-Time Notifications</h2>
                <div class="feature-details">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90aWZpY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Notifications">
                    </div>
                    <div class="feature-info">
                        <p>Stay informed with real-time notifications about your bus journey and service updates.</p>
                        
                        <h3>Notification Types:</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-bell"></i> <strong>Departure Alerts:</strong> Get notified when your bus is about to depart</li>
                            <li><i class="fas fa-exclamation-triangle"></i> <strong>Delay Notifications:</strong> Instant alerts when your bus is running late</li>
                            <li><i class="fas fa-route"></i> <strong>Route Changes:</strong> Updates about any changes to your bus route</li>
                            <li><i class="fas fa-map-marker-alt"></i> <strong>Arrival Notifications:</strong> Alerts when your bus is approaching your stop</li>
                            <li><i class="fas fa-bullhorn"></i> <strong>Service Announcements:</strong> Important updates about KMT services</li>
                        </ul>
                        
                        <h3>Notification Channels:</h3>
                        <div class="notification-channels">
                            <div class="channel">
                                <i class="fas fa-mobile-alt"></i>
                                <span>Push Notifications</span>
                            </div>
                            <div class="channel">
                                <i class="fas fa-sms"></i>
                                <span>SMS Alerts</span>
                            </div>
                            <div class="channel">
                                <i class="fas fa-envelope"></i>
                                <span>Email Updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'QR Tickets':
            content = `
                <h2>QR Code Ticketing System</h2>
                <div class="feature-details">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1622676666769-1a0767518fcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cXIlMjBjb2RlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="QR Tickets">
                    </div>
                    <div class="feature-info">
                        <p>Our digital ticketing system uses QR codes for quick, contactless boarding on all KMT buses.</p>
                        
                        <h3>How It Works:</h3>
                        <ol class="numbered-list">
                            <li>Book your ticket online through our website or mobile app</li>
                            <li>Receive a unique QR code ticket via email or in the app</li>
                            <li>Show the QR code to the conductor when boarding</li>
                            <li>The conductor scans the code with a handheld device</li>
                            <li>Board the bus and enjoy your journey!</li>
                        </ol>
                        
                        <h3>Benefits:</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle"></i> <strong>Contactless:</strong> No need to handle cash or paper tickets</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Quick Boarding:</strong> Reduces boarding time by up to 60%</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Eco-Friendly:</strong> Reduces paper waste from traditional tickets</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Secure:</strong> Each QR code is unique and can't be duplicated</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Convenient:</strong> Store multiple tickets in one place</li>
                        </ul>
                        
                        <div class="qr-demo">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KMT-DEMO-TICKET" alt="Sample QR Ticket">
                            <p>Sample QR Ticket</p>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Digital Payments':
            content = `
                <h2>Digital Payment Options</h2>
                <div class="feature-details">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMHBheW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Digital Payments">
                    </div>
                    <div class="feature-info">
                        <p>KMT Tracker supports multiple digital payment options for a seamless ticket purchasing experience.</p>
                        
                        <h3>Supported Payment Methods:</h3>
                        <div class="payment-methods">
                            <div class="payment-method">
                                <i class="fas fa-mobile-alt"></i>
                                <span>UPI</span>
                            </div>
                            <div class="payment-method">
                                <i class="fas fa-credit-card"></i>
                                <span>Credit/Debit Cards</span>
                            </div>
                            <div class="payment-method">
                                <i class="fas fa-wallet"></i>
                                <span>Digital Wallets</span>
                            </div>
                            <div class="payment-method">
                                <i class="fas fa-university"></i>
                                <span>Net Banking</span>
                            </div>
                        </div>
                        
                        <h3>Benefits:</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle"></i> <strong>Secure Transactions:</strong> All payments are encrypted and secure</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Instant Confirmation:</strong> Receive ticket immediately after payment</li>
                            <li><i class="fas fa-check-circle"></i> <strong>No Cash Needed:</strong> Avoid the hassle of carrying exact change</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Transaction History:</strong> Keep track of all your ticket purchases</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Refund Processing:</strong> Easy refunds for cancelled journeys</li>
                        </ul>
                        
                        <div class="payment-partners">
                            <p>Our payment partners include:</p>
                            <div class="partner-logos">
                                <span>Google Pay</span>
                                <span>PhonePe</span>
                                <span>Paytm</span>
                                <span>Amazon Pay</span>
                                <span>BHIM</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Multilingual':
            content = `
                <h2>Multilingual Support</h2>
                <div class="feature-details">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZ3VhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Multilingual">
                    </div>
                    <div class="feature-info">
                        <p>KMT Tracker is available in multiple languages to serve all residents and visitors of Kolhapur.</p>
                        
                        <h3>Supported Languages:</h3>
                        <div class="language-options">
                            <div class="language-option">
                                <span class="language-name">English</span>
                                <span class="language-status">Available</span>
                            </div>
                            <div class="language-option">
                                <span class="language-name">मराठी (Marathi)</span>
                                <span class="language-status">Available</span>
                            </div>
                            <div class="language-option">
                                <span class="language-name">हिंदी (Hindi)</span>
                                <span class="language-status">Available</span>
                            </div>
                        </div>
                        
                        <h3>Language Features:</h3>
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle"></i> <strong>Full Translation:</strong> All content available in all supported languages</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Easy Switching:</strong> Change language with one click</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Remembers Preference:</strong> System remembers your language choice</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Regional Formats:</strong> Dates, times and numbers in local formats</li>
                        </ul>
                        
                        <p>We're committed to making public transportation accessible to everyone, regardless of language preference.</p>
                    </div>
                </div>
            `;
            break;
            
        case 'Journey Planner':
            content = `
                <h2>Journey Planner</h2>
                <div class="feature-details">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1566396084807-c79cdb1cc12b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm91dGUlMjBwbGFubmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Journey Planner">
                    </div>
                    <div class="feature-info">
                        <p>Plan your entire journey with our advanced route planning system that helps you find the most efficient way to travel across Kolhapur.</p>
                        
                        <h3>Features:</h3>
                        <ul class="feature-list">
                                                       <li><i class="fas fa-check-circle"></i> <strong>Multi-Stop Planning:</strong> Plan journeys with multiple destinations</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Optimal Routes:</strong> Get suggestions for fastest or most direct routes</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Real-Time Updates:</strong> Routes adjust based on current traffic conditions</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Fare Estimation:</strong> Get accurate fare estimates before booking</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Walking Directions:</strong> First and last mile walking directions to bus stops</li>
                            <li><i class="fas fa-check-circle"></i> <strong>Accessibility Options:</strong> Filter routes based on accessibility needs</li>
                        </ul>
                        
                        <h3>Try the Journey Planner:</h3>
                        <div class="journey-planner-demo">
                            <div class="form-group">
                                <label for="demo-from">From:</label>
                                <select id="demo-from" class="form-control">
                                    <option value="">Select starting point</option>
                                    <option value="Central Bus Stand">Central Bus Stand</option>
                                    <option value="Railway Station">Railway Station</option>
                                    <option value="Rankala Lake">Rankala Lake</option>
                                    <option value="New Palace">New Palace</option>
                                    <option value="Rajarampuri">Rajarampuri</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="demo-to">To:</label>
                                <select id="demo-to" class="form-control">
                                    <option value="">Select destination</option>
                                    <option value="Central Bus Stand">Central Bus Stand</option>
                                    <option value="Railway Station">Railway Station</option>
                                    <option value="Rankala Lake">Rankala Lake</option>
                                    <option value="New Palace">New Palace</option>
                                    <option value="Rajarampuri">Rajarampuri</option>
                                </select>
                            </div>
                            <button class="btn btn-primary" onclick="showDemoRoute()">Plan Journey</button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        default:
            content = `
                <h2>${featureTitle}</h2>
                <div class="feature-details">
                    <p>Detailed information about this feature is being updated. Please check back soon.</p>
                </div>
            `;
    }
    
    // Show modal
    const modal = getElement('#feature-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
    
    // Update modal content
    modalContent.innerHTML = content;
}

// Function to show a demo route for the journey planner
function showDemoRoute() {
    const fromSelect = document.getElementById('demo-from');
    const toSelect = document.getElementById('demo-to');
    
    if (!fromSelect || !toSelect) return;
    
    const from = fromSelect.value;
    const to = toSelect.value;
    
    if (!from || !to) {
        alert('Please select both starting point and destination');
        return;
    }
    
    if (from === to) {
        alert('Starting point and destination cannot be the same');
        return;
    }
    
    // Find the journey planner demo container
    const demoContainer = document.querySelector('.journey-planner-demo');
    if (!demoContainer) return;
    
    // Show loading indicator
    demoContainer.innerHTML += `
        <div class="demo-loading">
            <i class="fas fa-spinner fa-spin"></i> Planning your journey...
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate a random route
        const routeId = 'KMT-' + Math.floor(Math.random() * 10 + 1).toString().padStart(2, '0');
        const departureTime = '08:' + Math.floor(Math.random() * 60).toString().padStart(2, '0');
        const duration = Math.floor(Math.random() * 30 + 15) + ' min';
        const stops = Math.floor(Math.random() * 5 + 2);
        const fare = '₹' + Math.floor(Math.random() * 30 + 20);
        
        // Remove loading indicator
        const loadingIndicator = document.querySelector('.demo-loading');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        
        // Show route details
        demoContainer.innerHTML += `
            <div class="demo-route-result">
                <h4>Recommended Route</h4>
                <div class="route-card">
                    <div class="route-header">
                        <span class="route-id">${routeId}</span>
                        <span class="status-badge on-time">On Time</span>
                    </div>
                    <div class="route-body">
                        <div class="route-stations">
                            <div class="station-from">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <span class="time">${departureTime}</span>
                                    <span class="name">${from}</span>
                                </div>
                            </div>
                            <div class="route-line">
                                <span class="stops">${stops} stops</span>
                            </div>
                            <div class="station-to">
                                <i class="fas fa-map-marker"></i>
                                <div>
                                    <span class="time">${calculateArrivalTime(departureTime, duration)}</span>
                                    <span class="name">${to}</span>
                                </div>
                            </div>
                        </div>
                        <div class="route-info">
                            <span><i class="fas fa-clock"></i> ${duration}</span>
                            <span><i class="fas fa-ticket-alt"></i> ${fare}</span>
                        </div>
                    </div>
                    <div class="route-footer">
                        <button class="btn book-btn">Book Ticket</button>
                        <button class="btn track-btn">Track Bus</button>
                    </div>
                </div>
                <button class="btn btn-outline" onclick="resetDemoPlanner()">Plan Another Journey</button>
            </div>
        `;
    }, 1500);
}

// Helper function to calculate arrival time
function calculateArrivalTime(departureTime, duration) {
    const [hours, minutes] = departureTime.split(':').map(Number);
    const durationMinutes = parseInt(duration);
    
    let newMinutes = minutes + durationMinutes;
    let newHours = hours + Math.floor(newMinutes / 60);
    newMinutes = newMinutes % 60;
    newHours = newHours % 24;
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
}

// Reset the journey planner demo
function resetDemoPlanner() {
    const demoContainer = document.querySelector('.journey-planner-demo');
    if (!demoContainer) return;
    
    demoContainer.innerHTML = `
        <div class="form-group">
            <label for="demo-from">From:</label>
            <select id="demo-from" class="form-control">
                <option value="">Select starting point</option>
                <option value="Central Bus Stand">Central Bus Stand</option>
                <option value="Railway Station">Railway Station</option>
                <option value="Rankala Lake">Rankala Lake</option>
                <option value="New Palace">New Palace</option>
                <option value="Rajarampuri">Rajarampuri</option>
            </select>
        </div>
        <div class="form-group">
            <label for="demo-to">To:</label>
            <select id="demo-to" class="form-control">
                <option value="">Select destination</option>
                <option value="Central Bus Stand">Central Bus Stand</option>
                <option value="Railway Station">Railway Station</option>
                <option value="Rankala Lake">Rankala Lake</option>
                <option value="New Palace">New Palace</option>
                <option value="Rajarampuri">Rajarampuri</option>
            </select>
        </div>
        <button class="btn btn-primary" onclick="showDemoRoute()">Plan Journey</button>
    `;
}
                            
// Simulate bus movements on the map
function initBusTracking() {
    const busRoutes = {
        'KMT-01': {
            name: 'Rankala Route',
            path: [
                { lat: 16.7050, lng: 74.2433, left: '50%', top: '50%' },
                { lat: 16.7080, lng: 74.2350, left: '45%', top: '45%' },
                { lat: 16.7100, lng: 74.2300, left: '40%', top: '40%' }
            ]
        },
        'KMT-02': {
            name: 'Kalamba Route',
            path: [
                { lat: 16.7050, lng: 74.2433, left: '50%', top: '50%' },
                { lat: 16.7000, lng: 74.2400, left: '55%', top: '55%' },
                { lat: 16.6950, lng: 74.2350, left: '60%', top: '60%' }
            ]
        }
    };

    // Create bus markers container if it doesn't exist
    let busMarkersContainer = document.querySelector('.bus-overlay');
    if (!busMarkersContainer) {
        busMarkersContainer = document.createElement('div');
        busMarkersContainer.className = 'bus-overlay';
        document.body.appendChild(busMarkersContainer);
    }

    // Bus colors array definition
    const busColors = ['#4a6cf7', '#ff4757'];

    // Create bus markers
    Object.entries(busRoutes).forEach(([busId, routeInfo], index) => {
        const busMarker = document.createElement('div');
        busMarker.className = 'bus-marker';
        busMarker.id = `bus-marker-${busId}`;
        busMarker.innerHTML = `<i class="fas fa-bus" style="color: ${busColors[index]}"></i>`;
        busMarker.style.position = 'absolute';
        busMarker.style.left = routeInfo.path[0].left;
        busMarker.style.top = routeInfo.path[0].top;
        busMarker.style.fontSize = '20px';
        busMarker.style.textShadow = '0 0 3px white, 0 0 5px white';
        busMarker.style.zIndex = '1000';
        busMarkersContainer.appendChild(busMarker);
    });
}

// ... rest of the code ...

// Animate bus along route
function animateBus(busMarker, route, position) {
    // Move to next position with animation
    busMarker.style.transition = 'left 3s, top 3s';
    busMarker.style.left = route[position].left;
    busMarker.style.top = route[position].top;
    
    // Calculate next position
    const nextPosition = (position + 1) % route.length;
    
    // Continue animation
    setTimeout(() => {
        animateBus(busMarker, route, nextPosition);
    }, 3000); // Move every 3 seconds
}

// Initialize the application when DOM is fully loaded
// Helper function to get multiple DOM elements with caching
function getElement(selector) {
    if (!domCache[selector]) {
        domCache[selector] = document.querySelector(selector);
    }
    return domCache[selector];
}


// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI components
    initNavigation();
    initForms();
    initModal();
    initAnimations();
    
    // Initialize language buttons
    const languageButtons = document.querySelectorAll('.language-btn');
    
    // Add click event to each language button
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected language from button
            const selectedLang = this.getAttribute('data-lang');
            
            // Map the button language to translation.js language code
            const langCode = selectedLang === 'english' ? 'en' : 
                            selectedLang === 'marathi' ? 'mr' : 
                            selectedLang === 'hindi' ? 'hi' : 'en';
            
            // Update the current language
            currentLanguage = selectedLang;
            
            // Apply translations using the mapped language code
            applyTranslations(langCode);
            
            // Save language preference
            localStorage.setItem('preferred-language', selectedLang);
        });
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
        // Find the button for saved language
        const savedLangButton = document.querySelector(`.language-btn[data-lang="${savedLanguage}"]`);
        if (savedLangButton) {
            // Simulate click on the saved language button
            savedLangButton.click();
        }
    }
    
    // Initialize bus tracking simulation
    initBusTracking();
    
    // Initialize schedule tabs
    initScheduleTabs();
});

// Apply translations using the language code from translation.js
function applyTranslations(langCode) {
    // Check if translations exist and are properly loaded
    if (!window.translations) {
        console.error('Translations object not found. Make sure translation.js is loaded before script.js');
        return;
    }
    
    if (!window.translations[langCode]) {
        console.error('Translations not found for language:', langCode);
        // Fall back to English if the requested language is not available
        langCode = 'en';
        
        // If even English is not available, return
        if (!window.translations.en) {
            console.error('No fallback translations available');
            return;
        }
    }
    
    // Update text content based on data-translate attributes
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (window.translations[langCode][key]) {
            element.textContent = window.translations[langCode][key];
        }
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (window.translations[langCode][key]) {
            element.placeholder = window.translations[langCode][key];
        }
    });
    
    // Update document language for accessibility
    document.documentElement.lang = langCode;
}
// Show ticketing options
function showTicketingOptions(routeId, from, to, departureTime) {
    const modalContent = getElement('#modal-content-container');
    if (!modalContent) return;
    
    const ticketId = generateTicketId();
    const ticketPrice = Math.floor(Math.random() * 30) + 20; // Random price between 20 and 50
    
    modalContent.innerHTML = `
        <h2>Book Your Ticket</h2>
        <div style="margin: 20px 0;">
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <p><strong>Route:</strong> ${routeId}</p>
                <p><strong>From:</strong> ${from}</p>
                <p><strong>To:</strong> ${to}</p>
                <p><strong>Departure:</strong> ${departureTime}</p>
                <p><strong>Ticket ID:</strong> ${ticketId}</p>
                <p><strong>Price:</strong> ₹${ticketPrice.toFixed(2)}</p>
            </div>
            
            <h3>Select Payment Method</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
                <label style="flex: 1; min-width: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                    <input type="radio" name="payment" value="upi" checked>
                    <span style="margin-left: 5px;">UPI</span>
                </label>
                <label style="flex: 1; min-width: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                    <input type="radio" name="payment" value="card">
                    <span style="margin-left: 5px;">Credit/Debit Card</span>
                </label>
                <label style="flex: 1; min-width: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                    <input type="radio" name="payment" value="wallet">
                    <span style="margin-left: 5px;">Digital Wallet</span>
                </label>
            </div>
            
            <div class="qr-scanner">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}" alt="QR Code">
                <p style="margin-top: 10px;">Scan this QR code to pay</p>
            </div>
        </div>
        <button class="submit-rating" onclick="processPayment('${ticketId}', '${routeId}', '${from}', '${to}', '${departureTime}', ${ticketPrice})">Complete Payment</button>
    `;
        // Show modal
        const modal = getElement('#feature-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }
    
    // ... existing code ...

// Process payment
function processPayment(ticketId, routeId, from, to, departureTime, price) {
    const modalContent = getElement('#modal-content-container');
    if (!modalContent) return;
    
    // Show loading state
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #4a6cf7; margin-bottom: 20px;"></i>
            <h2>Processing Payment</h2>
            <p>Please wait while we process your payment...</p>
        </div>
    `;
    
    // Simulate payment processing with delay
    setTimeout(() => {
        // Show success message
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-check-circle" style="font-size: 48px; color: #4a6cf7; margin-bottom: 20px;"></i>
                <h2>Payment Successful!</h2>
                <p>Your ticket has been booked successfully.</p>
                <div style="margin: 20px 0; background: #f5f5f5; padding: 15px; border-radius: 5px; text-align: left;">
                    <p><strong>Ticket ID:</strong> ${ticketId}</p>
                    <p><strong>Route:</strong> ${routeId}</p>
                    <p><strong>From:</strong> ${from}</p>
                    <p><strong>To:</strong> ${to}</p>
                    <p><strong>Departure:</strong> ${departureTime}</p>
                    <p><strong>Amount Paid:</strong> ₹${price.toFixed(2)}</p>
                </div>
                <p>A copy of your ticket has been sent to your email and mobile number.</p>
                <div class="qr-scanner">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}" alt="QR Code">
                    <p style="margin-top: 10px;">Show this QR code to the conductor when boarding</p>
                </div>
                <button onclick="closeModal()" class="submit-rating" style="margin-top: 20px;">Close</button>
            </div>
        `;
    }, 2000);
}

// Add new function for goods transportation info
// Add function to show goods booking form
function showGoodsBookingForm() {
    const modalContent = getElement('#modal-content-container');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <h2>Book Goods Transportation</h2>
        <div class="goods-booking-form">
            <div class="form-group">
                <label for="pickup-location">Pickup Location</label>
                <input type="text" id="pickup-location" class="form-control" placeholder="Enter pickup address" required>
            </div>
            
            <div class="form-group">
                <label for="delivery-location">Delivery Location</label>
                <input type="text" id="delivery-location" class="form-control" placeholder="Enter delivery address" required>
            </div>
            
            <div class="form-group">
                <label for="package-type">Package Type</label>
                <select id="package-type" class="form-control" required>
                    <option value="">Select package type</option>
                    <option value="small">Small Package (Up to 5kg)</option>
                    <option value="medium">Medium Package (5-15kg)</option>
                    <option value="large">Large Package (15-30kg)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="delivery-time">Delivery Time</label>
                <select id="delivery-time" class="form-control" required>
                    <option value="">Select delivery time</option>
                    <option value="same-day">Same Day Delivery (Extra ₹50)</option>
                    <option value="next-day">Next Day Delivery</option>
                    <option value="scheduled">Scheduled Delivery</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="contact-number">Contact Number</label>
                <input type="tel" id="contact-number" class="form-control" placeholder="Enter your phone number" required>
            </div>
            
            <div class="form-group">
                <label for="special-instructions">Special Instructions (Optional)</label>
                <textarea id="special-instructions" class="form-control" rows="3" placeholder="Any special handling instructions"></textarea>
            </div>
            
            <button class="btn btn-primary" onclick="processGoodsBooking()">Book Now</button>
            <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        </div>
    `;
    
    // Show modal
    const modal = getElement('#feature-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// ... existing code ...

// Add new function for goods transportation info
function showGoodsTransportInfo() {
    const modalContent = getElement('#modal-content-container');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <h2 data-i18n="goods_info_title">Goods Transportation Services</h2>
        <div class="goods-info-content">
            <div class="goods-info-section">
                <h3><i class="fas fa-truck"></i> Our Transportation Methods</h3>
                <p>KMT offers efficient goods transportation services using our extensive bus network throughout Kolhapur and surrounding areas. We utilize:</p>
                <ul class="goods-features-list">
                    <li><strong>Dedicated Cargo Compartments:</strong> Special sections in regular buses for smaller packages</li>
                    <li><strong>Cargo-Only Vehicles:</strong> Dedicated transport vehicles during off-peak hours</li>
                    <li><strong>Last-Mile Delivery:</strong> Partnerships with local delivery services for door-to-door delivery</li>
                </ul>
            </div>
            
            <div class="goods-info-section">
                <h3><i class="fas fa-box"></i> Package Types We Handle</h3>
                <div class="package-types">
                    <div class="package-type">
                        <div class="package-icon"><i class="fas fa-box"></i></div>
                        <div class="package-details">
                            <h4>Small Packages</h4>
                            <p>Up to 5kg</p>
                            <p class="package-price">₹50-100</p>
                        </div>
                    </div>
                    <div class="package-type">
                        <div class="package-icon"><i class="fas fa-box-open"></i></div>
                        <div class="package-details">
                            <h4>Medium Packages</h4>
                            <p>5-15kg</p>
                            <p class="package-price">₹100-200</p>
                        </div>
                    </div>
                    <div class="package-type">
                        <div class="package-icon"><i class="fas fa-dolly-flatbed"></i></div>
                        <div class="package-details">
                            <h4>Large Packages</h4>
                            <p>15-30kg</p>
                            <p class="package-price">₹200-350</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="goods-info-section">
                <h3><i class="fas fa-clock"></i> Delivery Timeframes</h3>
                <ul class="goods-features-list">
                    <li><strong>Same-Day Delivery:</strong> For packages booked before 10 AM (within city limits)</li>
                    <li><strong>Next-Day Delivery:</strong> For all other packages within 30km radius</li>
                    <li><strong>Scheduled Delivery:</strong> Book in advance for specific delivery dates</li>
                </ul>
            </div>
            
            <div class="goods-cta">
                <button class="btn btn-primary" onclick="showGoodsBookingForm()">Book Goods Transport</button>
            </div>
        </div>
    `;
    
    // Show modal
    const modal = getElement('#feature-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
}

// ... rest of your code ...
// Add function to process goods booking
function processGoodsBooking() {
    const modalContent = getElement('#modal-content-container');
    if (!modalContent) return;
    
    // Get form values
    const pickupLocation = document.getElementById('pickup-location').value;
    const deliveryLocation = document.getElementById('delivery-location').value;
    const packageType = document.getElementById('package-type').value;
    const deliveryTime = document.getElementById('delivery-time').value;
    
    // Validate form
    if (!pickupLocation || !deliveryLocation) {
        alert('Please enter both pickup and delivery locations');
        return;
    }
    
    // Generate booking ID
    const bookingId = 'KMT-G-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    // Calculate price based on package type
    let price = 0;
    switch (packageType) {
        case 'small':
            price = Math.floor(Math.random() * 51) + 50; // 50-100
            break;
        case 'medium':
            price = Math.floor(Math.random() * 101) + 100; // 100-200
            break;
        case 'large':
            price = Math.floor(Math.random() * 151) + 200; // 200-350
            break;
    }
    
    // Add express fee for same-day delivery
    if (deliveryTime === 'same-day') {
        price += 50;
    }
    
    // Show loading state
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #4a6cf7; margin-bottom: 20px;"></i>
            <h2>Processing Your Booking</h2>
            <p>Please wait while we process your goods transportation request...</p>
        </div>
    `;
    
    // Simulate processing with delay
    setTimeout(() => {
        // Show confirmation
        modalContent.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-check-circle" style="font-size: 48px; color: #4a6cf7; margin-bottom: 20px;"></i>
                <h2>Booking Confirmed!</h2>
                <p>Your goods transportation request has been confirmed.</p>
                
                <div style="margin: 20px 0; background: #f5f5f5; padding: 15px; border-radius: 5px; text-align: left;">
                    <p><strong>Booking ID:</strong> ${bookingId}</p>
                    <p><strong>Pickup:</strong> ${pickupLocation}</p>
                    <p><strong>Delivery:</strong> ${deliveryLocation}</p>
                    <p><strong>Package Type:</strong> ${packageType.charAt(0).toUpperCase() + packageType.slice(1)}</p>
                    <p><strong>Delivery Type:</strong> ${deliveryTime.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    <p><strong>Amount:</strong> ₹${price.toFixed(2)}</p>
                </div>
                
                <p>A confirmation has been sent to your phone number. Our team will contact you shortly for pickup arrangements.</p>
                
                <div class="qr-scanner">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}" alt="QR Code">
                    <p style="margin-top: 10px;">Your booking QR code for reference</p>
                </div>
                
                <button onclick="closeModal()" class="btn btn-primary" style="margin-top: 20px;">Close</button>
            </div>
        `;
    }, 2000);
}

// ... existing code ...
    
    // Close modal
    function closeModal() {
        const modal = getElement('#feature-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    }
    // Generate random ticket ID
    function generateTicketId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = 'KMT-';
        for (let i = 0; i < 8; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    
    // Format time for display
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Show loading state
    function showLoading(elementId) {
        const element = getElement(`#${elementId}`);
        if (element) {
            element.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #4a6cf7;"></i>
                    <p style="margin-top: 10px;">Loading...</p>
                </div>
            `;
        }
    }
    
    // Hide loading and show content
    function hideLoading(elementId, content) {
        const element = getElement(`#${elementId}`);
        if (element) {
            element.innerHTML = content;
        }
    }
    
    // Show alert message
    function showAlert(message) {
        // Create alert element if it doesn't exist
        let alertElement = getElement('#alert-message');
        
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.id = 'alert-message';
            alertElement.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #ff6b6b;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(alertElement);
        }
        
        // Set message and show alert
        alertElement.textContent = message;
        alertElement.style.transform = 'translateX(0)';
        
        // Hide alert after 3 seconds
        setTimeout(() => {
            alertElement.style.transform = 'translateX(120%)';
        }, 3000);
    }
    
    // Initialize schedule tabs
function initScheduleTabs() {
    const tabs = getElements('.schedule-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab type (weekday or weekend)
            const tabType = this.getAttribute('data-tab');
            
            // Show/hide rows based on tab type
            const weekdayRows = document.querySelectorAll('.weekday');
            const weekendRows = document.querySelectorAll('.weekend');
            
            if (tabType === 'weekday') {
                weekdayRows.forEach(row => row.style.display = 'table-row');
                weekendRows.forEach(row => row.style.display = 'none');
            } else {
                weekdayRows.forEach(row => row.style.display = 'none');
                weekendRows.forEach(row => row.style.display = 'table-row');
            }
        });
    });
    
    // Initialize with weekday schedule
    const weekdayTab = document.querySelector('.schedule-tab[data-tab="weekday"]');
    if (weekdayTab) {
        weekdayTab.click();
    }
}
    
    // Initialize animations
    function initAnimations() {
        // Add fade-in animation to sections when they come into view
        const sections = getElements('section');
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe each section
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Initialize language selector
    function initLanguageSelector() {
        const languageSelector = getElement('#language-selector');
        if (!languageSelector) return;

        // Populate language options
        const languages = Object.keys(translations);
        languages.forEach(language => {
            const option = document.createElement('option');
            option.value = language;
            option.textContent = language;
            languageSelector.appendChild(option);
        });

        // Set initial language
        languageSelector.value = currentLanguage;

        // Add event listener for language change
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            updateLanguageUI(selectedLanguage);
        });
    }
    
    // Initialize Google Maps
    function initMap() {
        // Kolhapur city coordinates
        const kolhapur = { lat: 16.7050, lng: 74.2433 };
        
        // Create map centered on Kolhapur
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: kolhapur,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    featureType: "transit.station.bus",
                    stylers: [{ visibility: "on" }]
                }
            ]
        });
    
        // Sample bus stops in Kolhapur
        const busStops = [
            { position: { lat: 16.7050, lng: 74.2433 }, title: 'Central Bus Stand' },
            { position: { lat: 16.6984, lng: 74.2300 }, title: 'Rajarampuri' },
            { position: { lat: 16.7100, lng: 74.2400 }, title: 'Tarabai Park' },
            { position: { lat: 16.6900, lng: 74.2150 }, title: 'Rankala Lake' },
            { position: { lat: 16.7150, lng: 74.2500 }, title: 'New Palace' }
        ];
    
        // Add markers for bus stops
        busStops.forEach(stop => {
            const marker = new google.maps.Marker({
                position: stop.position,
                map: map,
                title: stop.title,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    scaledSize: new google.maps.Size(32, 32)
                }
            });
    
            // Add info window for each marker
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${stop.title}</h3><p>${getTranslation('map_bus_stop')}</p>`
            });
    
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    
        // Simulate moving buses
        simulateBusMovement(map);
    }
    
    // Simulate bus movement on the map
    function simulateBusMovement(map) {
        // Bus routes (simplified)
        const busRoutes = [
            {
                id: 'KMT-101',
                path: [
                    { lat: 16.7050, lng: 74.2433 }, // Central Bus Stand
                    { lat: 16.7020, lng: 74.2350 },
                    { lat: 16.6984, lng: 74.2300 }  // Rajarampuri
                ],
                color: '#4a6cf7'
            },
            {
                id: 'KMT-102',
                path: [
                    { lat: 16.7050, lng: 74.2433 }, // Central Bus Stand
                    { lat: 16.7080, lng: 74.2450 },
                    { lat: 16.7100, lng: 74.2400 }  // Tarabai Park
                ],
                color: '#f74a6c'
            }
        ];
    
        // Draw routes and animate buses
        busRoutes.forEach(route => {
            // Draw route path
            const routePath = new google.maps.Polyline({
                path: route.path,
                geodesic: true,
                strokeColor: route.color,
                strokeOpacity: 0.7,
                strokeWeight: 3
            });
            routePath.setMap(map);
    
            // Animate bus along the route
            let step = 0;
            const numSteps = 50;
            const busMarker = new google.maps.Marker({
                position: route.path[0],
                map: map,
                title: route.id,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/bus.png',
                    scaledSize: new google.maps.Size(24, 24)
                }
            });
    
            // Animation function
            function animateBus(bus, route, currentPointIndex = 0, progress = 0) {
                const currentPoint = route.path[currentPointIndex];
                const nextPointIndex = (currentPointIndex + 1) % route.path.length;
                const nextPoint = route.path[nextPointIndex];
                
                updateBusPosition(bus, currentPoint, nextPoint, progress);
                
                progress += 0.0005; // Reduced for slower movement
                
                if (progress >= 1) {
                    progress = 0;
                    currentPointIndex = nextPointIndex;
                }
                
                requestAnimationFrame(() => animateBus(bus, route, currentPointIndex, progress));
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
                animateBus(bus, routeInfo);
            });
            
            
            // Start animation with a random delay
            setTimeout(() => animateBus(), 1000 * Math.random());
        });
    }
    
    
    // Show ticketing options
    function showTicketingOptions(routeId, from, to, departureTime) {
        const modalContent = getElement('#modal-content-container');
        if (!modalContent) return;
        
        const ticketId = generateTicketId();
        const ticketPrice = Math.floor(Math.random() * 30) + 20; // Random price between 20 and 50
        
        modalContent.innerHTML = `
            <h2>Book Your Ticket</h2>
            <div style="margin: 20px 0;">
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                    <p><strong>Route:</strong> ${routeId}</p>
                    <p><strong>From:</strong> ${from}</p>
                    <p><strong>To:</strong> ${to}</p>
                    <p><strong>Departure:</strong> ${departureTime}</p>
                    <p><strong>Ticket ID:</strong> ${ticketId}</p>
                    <p><strong>Price:</strong> ₹${ticketPrice.toFixed(2)}</p>
                </div>
                
                <h3>Select Payment Method</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
                    <label style="flex: 1; min-width: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                        <input type="radio" name="payment" value="upi" checked>
                        <span style="margin-left: 5px;">UPI</span>
                    </label>
                    <label style="flex: 1; min-width: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                        <input type="radio" name="payment" value="card">
                        <span style="margin-left: 5px;">Credit/Debit Card</span>
                    </label>
                    <label style="flex: 1; min-width: 120px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                        <input type="radio" name="payment" value="wallet">
                        <span style="margin-left: 5px;">Digital Wallet</span>
                    </label>
                </div>
                
                <div class="qr-scanner">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}" alt="QR Code">
                    <p style="margin-top: 10px;">Scan this QR code to pay</p>
                </div>
            </div>
            <button class="submit-rating" onclick="processPayment('${ticketId}', '${routeId}', '${from}', '${to}', '${departureTime}', ${ticketPrice})">Complete Payment</button>
        `;
        
        // Show modal
        const modal = getElement('#feature-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }
    
    // Show rating modal
    function showRatingModal() {
        const modalContent = getElement('#modal-content-container');
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <h2>Rate Your Experience</h2>
            <p>How would you rate your experience with KMT Tracker?</p>
            <div class="rating-container">
                <div class="star-rating">
                    <i class="far fa-star" data-rating="1"></i>
                    <i class="far fa-star" data-rating="2"></i>
                    <i class="far fa-star" data-rating="3"></i>
                    <i class="far fa-star" data-rating="4"></i>
                    <i class="far fa-star" data-rating="5"></i>
                </div>
                <div class="rating-feedback" style="margin-top: 15px;">
                    <textarea placeholder="Tell us about your experience (optional)" rows="4" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ddd;"></textarea>
                </div>
            </div>
            <button class="submit-rating">Submit Rating</button>
        `;
        
        const modal = getElement('#feature-modal');
        if (modal) {
            modal.style.display = 'block';
        }
        
        // Add star rating functionality
        const stars = getElements('.star-rating i');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.add('active');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    if (!s.classList.contains('fas')) {
                        s.classList.remove('active');
                    }
                });
            });
        });
        
        // Add submit rating functionality
        const submitButton = getElement('.submit-rating');
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                const activeStar = document.querySelector('.star-rating i.fas:last-of-type');
                let rating = 0;
                if (activeStar) {
                    rating = activeStar.getAttribute('data-rating');
                }
                
                const feedback = document.querySelector('.rating-feedback textarea').value;
                
                // Here you would normally send this data to your server
                console.log('Rating:', rating, 'Feedback:', feedback);
                
                // Show thank you message
                modalContent.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: #4a6cf7; margin-bottom: 20px;"></i>
                        <h2>Thank You!</h2>
                        <p>Your feedback has been submitted successfully.</p>
                        <button onclick="closeModal()" class="submit-rating" style="margin-top: 20px;">Close</button>
                    </div>
                `;
            });
        }
    }
    
    // Show notification preferences
    function showNotificationPreferences() {
        const modalContent = getElement('#modal-content-container');
        if (!modalContent) return;
        
        modalContent.innerHTML = `
            <h2>Notification Preferences</h2>
            <p>Customize your notification settings:</p>
            
            <div class="notification-toggle">
                <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                </label>
                <div>
                    <strong>Bus Arrival Alerts</strong>
                    <p>Get notified when your bus is approaching your stop</p>
                </div>
            </div>
            
            <div class="notification-toggle">
                <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                </label>
                <div>
                    <strong>Delay Notifications</strong>
                    <p>Receive updates when your bus is delayed</p>
                </div>
            </div>
            
            <div class="notification-toggle">
                <label class="toggle-switch">
                    <input type="checkbox">
                    <span class="toggle-slider"></span>
                </label>
                <div>
                    <strong>Route Changes</strong>
                    <p>Get alerts about temporary route changes</p>
                </div>
            </div>
            
            <div class="notification-toggle">
                <label class="toggle-switch">
                    <input type="checkbox">
                    <span class="toggle-slider"></span>
                </label>
                <div>
                    <strong>Promotional Offers</strong>
                    <p>Receive information about discounts and special offers</p>
                </div>
            </div>
            
            <button class="submit-rating">Save Preferences</button>
        `;
        
        const modal = getElement('#feature-modal');
        if (modal) {
            modal.style.display = 'block';
        }
        
        // Add save preferences functionality
        const saveButton = getElement('.submit-rating');
        if (saveButton) {
            saveButton.addEventListener('click', function() {
                // Here you would normally save these preferences to your server
                const toggles = document.querySelectorAll('.toggle-switch input');
                const preferences = Array.from(toggles).map(toggle => toggle.checked);
                console.log('Notification preferences:', preferences);
                
                // Show confirmation message
                modalContent.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: #4a6cf7; margin-bottom: 20px;"></i>
                        <h2>Preferences Saved!</h2>
                        <p>Your notification preferences have been updated successfully.</p>
                        <button onclick="closeModal()" class="submit-rating" style="margin-top: 20px;">Close</button>
                    </div>
                `;
            });
        }
    }
    // ... existing code ...

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const contactNumber = document.getElementById('contact-number').value;
            const programName = document.getElementById('program-name').value;
            const queryMessage = document.getElementById('query-message').value;
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS service
            emailjs.send(
                'service_35mr6kh', // Replace with your actual service ID
                'template_jzrpi6e', // Replace with your actual template ID
                {
                    from_name: `${firstName} ${lastName}`,
                    from_email: email,
                    contact_number: contactNumber || 'Not provided',
                    program_name: programName,
                    message: queryMessage
                }
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your interest has been recorded successfully. We'll get back to you soon.</p>
                        <button class="btn" onclick="resetContactForm()">Send Another Message</button>
                    </div>
                `;
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                alert('Failed to send message. Please try again later or email us directly at kmttracker96@gmail.com');
            });
        });
    }
});

// Function to reset contact form
function resetContactForm() {
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.innerHTML = `
        <ul class="contact-info-list">
            <li>Program Name</li>
            <li>Query/Message</li>
        </ul>

        <form class="contact-form" id="contact-form">
            <div class="form-group">
                <input type="text" id="first-name" name="first-name" placeholder="First Name" required>
            </div>

            <div class="form-group">
                <input type="text" id="last-name" name="last-name" placeholder="Last Name" required>
            </div>

            <div class="form-group">
                <input type="email" id="email" name="email" placeholder="Email Address" required>
            </div>

            <div class="form-group">
                <input type="tel" id="contact-number" name="contact-number" placeholder="Contact Number">
            </div>

            <div class="form-group full-width">
                <select id="program-name" name="program-name" required>
                    <option value="" disabled selected>Program Name</option>
                    <option value="passenger">Passenger Services</option>
                    <option value="goods">Goods Transportation</option>
                    <option value="tracking">Bus Tracking</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group full-width">
                <textarea id="query-message" name="query-message" placeholder="Query/Message" required></textarea>
            </div>

            <button type="submit" class="submit-btn">Record Your Interest</button>
        </form>
    `;
    
    // Re-attach event listener to the new form
    const newForm = document.getElementById('contact-form');
    if (newForm) {
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // The original event listener will be attached again on page load
            // This is just a temporary solution for the reset functionality
            alert('Please refresh the page to submit the form again.');
        });
    }
}
    
    // Add event listeners when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize feature buttons
        const ratingButton = getElement('#rating-button');
        if (ratingButton) {
            ratingButton.addEventListener('click', showRatingModal);
        }
        
        const notificationButton = getElement('#notification-button');
        if (notificationButton) {
            notificationButton.addEventListener('click', showNotificationPreferences);
        }

        const downloadButtons = document.querySelectorAll('.download-btn');
    
        downloadButtons.forEach(btn => {
            // Add tooltip element
            const tooltip = document.createElement('span');
            tooltip.className = 'coming-soon-tooltip';
            tooltip.textContent = 'Coming Soon!';
            btn.appendChild(tooltip);
            
            // Add click handler
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Mobile app coming soon! Stay tuned for updates.');
            });
        }); 
    });