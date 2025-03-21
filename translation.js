/**
 * KMT Tracker Translation System
 * Supports English, Marathi, and Hindi languages
 */

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageSystem();


    if (typeof initializeLanguageSystem === 'function') {
        initializeLanguageSystem();
    } else {
        console.error('initializeLanguageSystem is not defined.  Make sure translation.js is loaded correctly.');
    }

    const languageButtons = document.querySelectorAll('.language-btn');

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;

            // Set the language
            if (typeof setLanguage === 'function') {
                setLanguage(lang);
            } else {
                console.error('setLanguage is not defined.  Make sure translation.js is loaded correctly.');
                return;
            }


            // Update button states
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            //Update UI Language again (Double Check to make sure everything works)
            if (typeof updateUILanguage === 'function') {
                updateUILanguage();
            } else {
                console.error('updateUILanguage is not defined.  Make sure translation.js is loaded correctly.');
                return;
            }

        });
    });
});
/**
 * KMT Tracker Translation System
 * Supports English, Marathi, and Hindi languages
 */

// Language configuration - only define if not already defined
if (typeof window.LANGUAGES === 'undefined') {
    window.LANGUAGES = {
        en: { name: 'English', code: 'en' },
        mr: { name: 'मराठी', code: 'mr' },
        hi: { name: 'हिंदी', code: 'hi' }
    };
}

// Make translations available globally
window.translations = {
    en: {
        // Navigation
        "nav_home": "Home",
        "nav_search": "Search Routes",
        "nav_tracking": "Live Tracking",
        "nav_schedule": "Schedule",
        "nav_contact": "Contact",
        "nav_problem": "Problem",
        "nav_solutions": "Solutions",
        "nav_features": "Features",
        "nav_goods": "Goods Transport",

        // Hero Section
        "hero_title": "KMT Tracker",
        "hero_subtitle": "Revolutionizing Kolhapur's Public Transportation System",
        "hero_cta": "Plan Your Journey",

        // Search Section
        "search_title": "Find Your Route",
        "search_from": "From",
        "search_to": "To",
        "search_button": "Find Routes",
        "search_btn": "Search",

        // Problem Section
        "problem_title": "Problem Statement",
        "problem_desc": "Intercity bus transportation service by Kolhapur Municipal Transportation (KMT) is meant to be seamless and reliable, yet commuters face daily frustration due to inefficiencies in the system:",
        "problem_unpredictable_title": "Unpredictable Schedules",
        "problem_unpredictable_desc": "Buses often run behind schedule with no real-time updates available to commuters, leading to long wait times and missed connections.",
        "problem_confusing_title": "Confusing Routes",
        "problem_confusing_desc": "Lack of clear route information and maps makes it difficult for new users and tourists to navigate the system effectively.",
        "problem_manual_title": "Manual Ticketing",
        "problem_manual_desc": "Cash-only, paper-based ticketing system is inefficient, prone to errors, and creates unnecessary delays during boarding.",

        // Solutions Section
        "solutions_title": "Our Solutions",
        "solution1_title": "Interactive Route System",
        "solution1_desc": "Real-time digital maps and stop information integrated into a mobile application.",
        "solution2_title": "Online Booking",
        "solution2_desc": "Secure, user-friendly online ticket booking system via mobile app and website.",
        "solution3_title": "Real-Time Tracking",
        "solution3_desc": "Live GPS tracking and instant service updates for all buses.",

        // Features Section
        "features_title": "Key Features",

        // Goods Transport Section
        "goods_title": "Goods Transportation",
        "goods_desc": "Expanding KMT services to include goods transportation, offering local businesses a reliable and cost-effective delivery solution.",

        // Tracking Section
        "tracking_title": "Live Bus Tracking",
        "tracking_description": "Track KMT buses in real-time across Kolhapur",
        "select_route": "Select Route",
        "select_bus": "Select Bus",

        // Schedule Section
        "schedule_title": "Bus Schedule",
        "schedule_route": "Route",
        "schedule_departure": "Departure",
        "schedule_arrival": "Arrival",
        "schedule_frequency": "Frequency",
        "schedule_status": "Status",

        // Contact Section
        "contact_title": "Contact Us",
        "contact_address_title": "Address",
        "contact_address": "KMT Head Office, Central Bus Stand Complex, Kolhapur, Maharashtra 416001",
        "contact_phone_title": "Phone",
        "contact_phone": "+91 231 265 4321",
        "contact_email_title": "Email",
        "contact_email": "info@kmttracker.com",
        "contact_hours_title": "Working Hours",
        "contact_hours": "Monday - Sunday: 24/7\nCustomer Support: 6:00 AM - 10:00 PM",
        "contact_name": "Name",
        "contact_email_field": "Email",
        "contact_subject": "Subject",
        "contact_message": "Message",
        "contact_submit": "Send Message",

        // Footer
        "footer_about": "The official bus tracking system for Kolhapur Municipal Transport, making public transportation more accessible and convenient.",
        "footer_quick_links": "Quick Links",
        "footer_services": "Services",
        "footer_bus_pass": "Bus Pass",
        "footer_lost_found": "Lost & Found",
        "footer_complaints": "Complaints",
        "footer_newsletter": "Updates",
        "footer_newsletter_desc": "Subscribe to receive service updates and announcements",
        "footer_email_placeholder": "Enter your email",
        "footer_copyright": "© 2023 KMT Tracker. All rights reserved.",
        "footer_privacy": "Privacy Policy",
        "footer_terms": "Terms of Service"
    },

    mr: {
        // Navigation
        "nav_home": "मुख्यपृष्ठ",
        "nav_search": "मार्ग शोधा",
        "nav_tracking": "लाइव्ह ट्रॅकिंग",
        "nav_schedule": "वेळापत्रक",
        "nav_contact": "संपर्क",
        "nav_problem": "समस्या",
        "nav_solutions": "उपाय",
        "nav_features": "वैशिष्ट्ये",
        "nav_goods": "माल वाहतूक",

        // Hero Section
        "hero_title": "केएमटी ट्रॅकर",
        "hero_subtitle": "कोल्हापूरच्या सार्वजनिक वाहतूक प्रणालीत क्रांती घडवत आहे",
        "hero_cta": "आपला प्रवास योजना करा",

        // Search Section
        "search_title": "बस मार्ग शोधा",
        "search_from": "पासून",
        "search_to": "पर्यंत",
        "search_button": "मार्ग शोधा",
        "search_btn": "शोधा",

        // Problem Section
        "problem_title": "समस्या विधान",
        "problem_desc": "कोल्हापूर म्युनिसिपल ट्रान्सपोर्टेशन (KMT) द्वारे आंतरशहरी बस वाहतूक सेवा सुरळीत आणि विश्वासार्ह असणे अपेक्षित आहे, तरीही प्रवासी प्रणालीतील अकार्यक्षमतेमुळे दररोज निराशा सामोरे जातात:",
        "problem_unpredictable_title": "अनपेक्षित वेळापत्रक",
        "problem_unpredictable_desc": "बस नेहमीच वेळापत्रकापेक्षा मागे धावतात आणि प्रवाशांना रिअल-टाइम अपडेट्स उपलब्ध नसतात, ज्यामुळे दीर्घ प्रतीक्षा वेळ आणि चुकलेले कनेक्शन होतात.",
        "problem_confusing_title": "गोंधळात टाकणारे मार्ग",
        "problem_confusing_desc": "स्पष्ट मार्ग माहिती आणि नकाशांच्या अभावामुळे नवीन वापरकर्ते आणि पर्यटकांना प्रणाली प्रभावीपणे नेव्हिगेट करणे कठीण होते.",
        "problem_manual_title": "मॅन्युअल तिकीट",
        "problem_manual_desc": "केवळ रोख, कागदावर आधारित तिकीट प्रणाली अकार्यक्षम आहे, त्रुटींना प्रवण आहे आणह बोर्डिंग दरम्यान अनावश्यक विलंब निर्माण करते.",
        
        // Solutions Section
        "solutions_title": "हमारे समाधान",
        "solution1_title": "इंटरएक्टिव रूट सिस्टम",
        "solution1_desc": "मोबाइल एप्लिकेशन में एकीकृत रीयल-टाइम डिजिटल मानचित्र और स्टॉप जानकारी।",
        "solution2_title": "ऑनलाइन बुकिंग",
        "solution2_desc": "मोबाइल ऐप और वेबसाइट के माध्यम से सुरक्षित, उपयोगकर्ता के अनुकूल ऑनलाइन टिकट बुकिंग प्रणाली।",
        "solution3_title": "रिअल-टाइम ट्रैकिंग",
        "solution3_desc": "सभी बसों के लिए लाइव जीपीएस ट्रैकिंग और तत्काल सेवा अपडेट।",

        // Features Section
        "features_title": "मुख्य विशेषताएं",

        // Goods Transport Section
        "goods_title": "माल वाहतूक",
        "goods_desc": "केएमटी सेवांचा माल वाहतुकीमध्ये विस्तार, स्थानिक व्यवसायांना एक विश्वसनीय आणि किफायतशीर वितरण समाधान देत आहे.",

        // Tracking Section
        "tracking_title": "लाइव्ह बस ट्रैकिंग",
        "tracking_description": "कोल्हापूरमध्ये केएमटी बसला रिअल-टाइममध्ये ट्रॅक करा",
        "select_route": "मार्ग निवडा",
        "select_bus": "बस निवडा",

        // Schedule Section
        "schedule_title": "बस समय-सारणी",
        "schedule_route": "मार्ग",
        "schedule_departure": "प्रस्थान",
        "schedule_arrival": "आगमन",
        "schedule_frequency": "आवृत्ति",
        "schedule_status": "स्थिति",

        // Contact Section
        "contact_title": "संपर्क करें",
        "contact_address_title": "पता",
        "contact_address": "केएमटी मुख्य कार्यालय, सध्यवर्ती बस स्टानक परिसर, कोल्हापूर, महाराष्ट्र ४१६००१",
        "contact_phone_title": "फोन",
        "contact_phone": "+९१ २३१ २६५ ४३२१",
        "contact_email_title": "ईमेल",
        "contact_email": "info@kmttracker.com",
        "contact_hours_title": "कार्यालयीन वेळ",
        "contact_hours": "सोमवार - रविवार: २४/७\nग्राहक सेवा: सकाळी ६:०० - रात्री १०:००",
        "contact_name": "नाव",
        "contact_email_field": "ईमेल",
        "contact_subject": "विषय",
        "contact_message": "संदेश",
        "contact_submit": "संदेश भेजें",

        // Footer
        "footer_about": "कोल्हापूर महानगर परिवहनची अधिकृत बस ट्रॅकिंग प्रणाली, सार्वजनिक वाहतूक अधिक सुलभ और सुविधाजनक बनाती है।",
        "footer_quick_links": "त्वरित लिंक",
        "footer_services": "सेवाएं",
        "footer_bus_pass": "बस पास",
        "footer_lost_found": "खोई-पाई",
        "footer_complaints": "शिकायतें",
        "footer_newsletter": "अपडेट",
        "footer_newsletter_desc": "सेवा अपडेट और घोषणाएं प्राप्त करने के लिए सदस्यता लें",
        "footer_email_placeholder": "अपना ईमेल दर्ज करें",
        "footer_copyright": "© २०२३ केएमटी ट्रैकर। सर्वाधिकार सुरक्षित।",
        "footer_privacy": "गोपनीयता नीति",
        "footer_terms": "सेवा शर्तें"
    },

    hi: {
        // Navigation
        "nav_home": "होम",
        "nav_search": "मार्ग खोजें",
        "nav_tracking": "लाइव ट्रैकिंग",
        "nav_schedule": "समय-सारणी",
        "nav_contact": "संपर्क",
        "nav_problem": "समस्या",
        "nav_solutions": "समाधान",
        "nav_features": "विशेषताएँ",
        "nav_goods": "माल परिवहन",

        // Hero Section
        "hero_title": "केएमटी ट्रैकिंग",
        "hero_subtitle": "कोल्हापुर की सार्वजनिक परिवहन प्रणाली में क्रांति लाना",
        "hero_cta": "अपनी यात्रा की योजना बनाएं",

        // Search Section
        "search_title": "बस मार्ग खोजें",
        "search_from": "से",
        "search_to": "तक",
        "search_button": "मार्ग खोजें",
        "search_btn": "खोजें",

        // Problem Section
        "problem_title": "समस्या विवरण",
        "problem_desc": "कोल्हापुर नगर परिवहन (KMT) द्वारा अंतर-शहरी बस परिवहन सेवा निर्बाध और विश्वसनीय होनी चाहिए, फिर भी यात्री प्रणाली में अक्षमताओं के कारण दैनिक निराशा का सामना करते हैं:",
        "problem_unpredictable_title": "अप्रत्याशित समय-सारणी",
        "problem_unpredictable_desc": "बसें अक्सर समय-सारणी से पीछे चलती हैं और यात्रियों को वास्तविक समय के अपडेट उपलब्ध नहीं होते हैं, जिससे लंबे इंतजार का समय और छूटे हुए कनेक्शन होते हैं।",
        "problem_confusing_title": "भ्रमित मार्ग",
        "problem_confusing_desc": "स्पष्ट मार्ग जानकारी और मानचित्रों की कमी के कारण नए उपयोगकर्तांना और पर्यटकों के लिए प्रणाली को प्रभावी ढंग से नेविगेट करना मुश्किल हो जाता है।",
        "problem_manual_title": "मैनुअल टिकटिंग",
        "problem_manual_desc": "केवल नकद, कागज-आधारित टिकटिंग प्रणाली अक्षम है, त्रुटियों के लिए प्रवण है, और बोर्डिंग के दौरान अनावश्यक देरी पैदा करती है।",
        
        // Solutions Section
        "solutions_title": "आमचे उपाय",
        "solution1_title": "संवादात्मक मार्ग प्रणाली",
        "solution1_desc": "मोबाईल ॲप्लिकेशनमध्ये एकत्रित केलेले रिअल-टाइम डिजिटल नकाशे आणि थांबा माहिती.",
        "solution2_title": "ऑनलाइन बुकिंग",
        "solution2_desc": "मोबाईल ॲप आणि वेबसाइटद्वारे सुरक्षित, वापरकर्ता-अनुकूल ऑनलाइन तिकीट बुकिंग प्रणाली.",
        "solution3_title": "रिअल-टाइम ट्रॅकिंग",
        "solution3_desc": "सर्व बससाठी लाइव्ह जीपीएस ट्रॅकिंग आणि त्वरित सेवा अद्यतने.",

        // Features Section
        "features_title": "मुख्य विशेषताएं",

        // Goods Transport Section
        "goods_title": "माल वाहतूक",
        "goods_desc": "केएमटी सेवांचा माल वाहतुकीमध्ये विस्तार, स्थानिक व्यवसायांना एक विश्वसनीय आणि किफायतशीर वितरण समाधान देत आहे.",

        // Tracking Section
        "tracking_title": "लाइव्ह बस ट्रॅकिंग",
        "tracking_description": "कोल्हापुर मध्ये केएमटी बसला रिअल-टाइममध्ये ट्रॅक करा",
        "select_route": "मार्ग निवडा",
        "select_bus": "बस निवडा",

        // Schedule Section
        "schedule_title": "बस वेळापत्रक",
        "schedule_route": "मार्ग",
        "schedule_departure": "सुटण्याची वेळ",
        "schedule_arrival": "पोहोचण्याची वेळ",
        "schedule_frequency": "वारंवारता",
        "schedule_status": "स्थिती",

        // Contact Section
        "contact_title": "संपर्क करा",
        "contact_address_title": "पत्ता",
        "contact_address": "केएमटी मुख्य कार्यालय, सध्यवर्ती बस स्टानक परिसर, कोल्हापुर, महाराष्ट्र ४१६००१",
        "contact_phone_title": "फोन",
        "contact_phone": "+९१ २३१ २६५ ४३२१",
        "contact_email_title": "ईमेल",
        "contact_email": "info@kmttracker.com",
        "contact_hours_title": "कार्यालयीन वेळ",
        "contact_hours": "सोमवार - रविवार: २४/७\nग्राहक सेवा: सकाळी ६:०० - रात्री १०:००",
        "contact_name": "नाव",
        "contact_email_field": "ईमेल",
        "contact_subject": "विषय",
        "contact_message": "संदेश",
        "contact_submit": "संदेश पाठवा",

        // Footer
        "footer_about": "कोल्हापुर महानगर परिवहनची अधिकृत बस ट्रॅकिंग प्रणाली, सार्वजनिक वाहतूक अधिक सुलभ और सुविधाजनक बनाती है।",
        "footer_quick_links": "त्वरित लिंक",
        "footer_services": "सेवाएं",
        "footer_bus_pass": "बस पास",
        "footer_lost_found": "खोई-पाई",
        "footer_complaints": "शिकायतें",
        "footer_newsletter": "अपडेट",
        "footer_newsletter_desc": "सेवा अपडेट और घोषणाएं प्राप्त करने के लिए सदस्यता लें",
        "footer_email_placeholder": "अपना ईमेल दर्ज करें",
        "footer_copyright": "© २०२३ केएमटी ट्रैकर। सर्वाधिकार सुरक्षित।",
        "footer_privacy": "गोपनीयता नीति",
        "footer_terms": "सेवा शर्तें"
    }
};


let currentLanguage = 'en'; // Initialize currentLanguage

// Initialize the language system
function initializeLanguageSystem() {
    const savedLang = localStorage.getItem('preferred_language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = 'en';

    let initialLang = savedLang ||
        (window.LANGUAGES[browserLang] ? browserLang : defaultLang);

    setLanguage(initialLang);
    updateUILanguage();
}

function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not supported, falling back to English`);
        lang = 'en';
    }
    currentLanguage = lang;
    localStorage.setItem('preferred_language', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', 'ltr');
    updateUILanguage();
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang }
    }));
    return true;
}

function translate(key, params = {}) {
    let text = translations[currentLanguage]?.[key] ||
        translations.en[key] ||
        key;
    return text.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] !== undefined ? params[param] : match;
    });
}

function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const params = element.dataset.i18nParams ?
            JSON.parse(element.dataset.i18nParams) : {};
        element.textContent = translate(key, params);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = translate(key);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        element.alt = translate(key);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = translate(key);
    });

    document.querySelectorAll('meta[data-i18n-content]').forEach(element => {
        const key = element.getAttribute('data-i18n-content');
        element.content = translate(key);
    });

    document.querySelectorAll('button[data-i18n-value]').forEach(element => {
        const key = element.getAttribute('data-i18n-value');
        element.value = translate(key);
    });
}

function getCurrentLanguage() {
    return currentLanguage;
}

function isLanguageSupported(lang) {
    return !!translations[lang];
}

function getSupportedLanguages() {
    return LANGUAGES;
}

window.translate = translate;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.isLanguageSupported = isLanguageSupported;
window.getSupportedLanguages = getSupportedLanguages;
window.updateUILanguage = updateUILanguage;
