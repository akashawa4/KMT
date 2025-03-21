const locations = [
    'Central Bus Stand',
    'Rankala Lake',
    'Railway Station',
    'New Palace',
    'Tarabai Park',
    'Rajarampuri',
    'Bindu Chowk',
    'Shahupuri',
    'Kalamba',
    'Market Yard',
    'Shivaji University',
    'Mahadwar Road',
    'Line Bazaar',
    'Gangavesh'
];

function showSuggestions(input, suggestionsList) {
    const value = input.value.toLowerCase();
    suggestionsList.innerHTML = '';
    
    if (value.length < 2) {
        suggestionsList.style.display = 'none';
        return;
    }

    const matches = locations.filter(location => 
        location.toLowerCase().includes(value)
    );

    if (matches.length > 0) {
        matches.forEach(match => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = match;
            div.addEventListener('click', () => {
                input.value = match;
                suggestionsList.style.display = 'none';
            });
            suggestionsList.appendChild(div);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fromInput = document.getElementById('from-location');
    const toInput = document.getElementById('to-location');
    const fromSuggestions = document.getElementById('from-suggestions');
    const toSuggestions = document.getElementById('to-suggestions');

    fromInput.addEventListener('input', () => showSuggestions(fromInput, fromSuggestions));
    toInput.addEventListener('input', () => showSuggestions(toInput, toSuggestions));

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.matches('#from-location, #to-location')) {
            fromSuggestions.style.display = 'none';
            toSuggestions.style.display = 'none';
        }
    });
});