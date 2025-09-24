// Advanced Multi-language System with AI Translation
class AdvancedLanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.availableLangs = ['en', 'hi', 'ml', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'pa', 'or', 'as'];
        this.translations = {};
        this.aiTranslationEnabled = true;
        this.init();
    }
    
    async init() {
        await this.loadTranslations();
        this.setInitialLanguage();
        this.setupEventListeners();
        this.applyLanguage();
        this.setupAITranslation();
    }
    
    async loadTranslations() {
        // Core translations with agricultural terminology
        this.translations = {
            en: await this.loadLanguageFile('en'),
            hi: await this.loadLanguageFile('hi'),
            ml: await this.loadLanguageFile('ml'),
            // Additional Indian languages can be added
        };
    }
    
    async loadLanguageFile(lang) {
        // In a real implementation, this would fetch from JSON files
        const translations = {
            en: this.getEnglishTranslations(),
            hi: this.getHindiTranslations(),
            ml: this.getMalayalamTranslations()
        };
        return translations[lang] || translations.en;
    }
    
    getEnglishTranslations() {
        return {
            // App
            'app_title': 'Krishi Sahayata Pro',
            'app_tagline': 'AI-Powered Agricultural Intelligence Platform',
            
            // Auth
            'login_tab': 'Secure Login',
            'signup_tab': 'Get Started',
            'farmer_mode': 'Farmer',
            'officer_mode': 'Officer',
            'login_identifier': 'Email or Phone Number',
            'login_password': 'Password',
            'remember_me': 'Keep me signed in',
            'forgot_password': 'Need help?',
            'access_dashboard': 'Launch Dashboard',
            'or_continue': 'Or continue with',
            'google_login': 'Google Account',
            'aadhaar_login': 'Aadhaar Secure',
            
            // Signup
            'signup_name': 'Full Name',
            'signup_phone': 'Phone Number',
            'signup_email': 'Email Address',
            'select_state': 'Select State',
            'select_district': 'Select District',
            'signup_village': 'Village/Taluk',
            'crops_grown': 'Primary Crops (Select multiple)',
            'crop_rice': 'Rice',
            'crop_wheat': 'Wheat',
            'crop_vegetables': 'Vegetables',
            'crop_coconut': 'Coconut',
            'farm_size': 'Farm Size',
            'size_small': '0-2 acres',
            'size_medium': '2-10 acres',
            'size_large': '10+ acres',
            'signup_password': 'Password',
            'signup_confirm': 'Confirm Password',
            'create_account': 'Create Pro Account',
            'lang_malayalam': 'Malayalam',
            'lang_english': 'English',
            'lang_hindi': 'Hindi',
            
            // Footer
            'footer_text': 'Trusted by 50,000+ farmers across India • ISO 27001 Certified',
            
            // Dashboard
            'dashboard_title': 'AI Farming Intelligence Dashboard',
            'quick_weather': 'Weather Intelligence',
            'quick_market': 'Market Analytics',
            'quick_subsidies': 'Subsidy Hub',
            'quick_schemes': 'Govt Schemes',
            'weather_desc': 'Real-time weather insights and alerts',
            'market_desc': 'Live market prices and trends',
            'subsidies_desc': 'Subsidy eligibility and applications',
            'schemes_desc': 'Government scheme information',
            
            // AI Advisory
            'ask_ai_title': 'AI Agricultural Advisor',
            'ask_ai_subtitle': 'Get expert farming advice powered by AI',
            'crop_type': 'Crop Type',
            'select_crop': 'Select crop',
            'season': 'Season',
            'location': 'Location',
            'not_detected': 'Not detected',
            'detect_location': 'Detect',
            'describe_issue': 'Describe Your Agricultural Issue',
            'input_tips': 'Tip: Type, speak, or upload images for analysis',
            'question_placeholder': 'Describe your farming issue (e.g., pest control, soil health, irrigation)',
            'speech_text': 'Voice Input',
            'upload_image': 'Upload Image',
            'clear_inputs': 'Clear All',
            'ask_ai_button': 'Analyze with AI',
            'escalate_expert': 'Connect with Expert',
            'ai_response': 'AI Analysis Result',
            'response_ready': 'AI Ready for Analysis',
            'response_helpful': 'Was this analysis helpful?',
            'feedback_yes': 'Yes, Helpful',
            'feedback_no': 'Needs Improvement',
            'context_summary': 'Analysis Context',
            'quick_resources': 'Quick Resources',
            'pest_guide': 'Pest Management',
            'subsidy_schemes': 'Subsidy Programs',
            'contact_officer': 'Agricultural Officer',
            'recent_queries': 'Recent Analyses',
            'no_queries': 'No recent analyses',
            'escalations': 'Expert Consultations',
            'no_escalations': 'No active consultations',
            'processing': 'AI is analyzing your query...',
            
            // Agricultural Terms
            'pest_management': 'Pest Management',
            'soil_health': 'Soil Health',
            'irrigation': 'Irrigation',
            'fertilizer': 'Fertilizer',
            'harvesting': 'Harvesting',
            'organic_farming': 'Organic Farming',
            'crop_rotation': 'Crop Rotation',
            'water_management': 'Water Management'
        };
    }
    
    getHindiTranslations() {
        return {
            'app_title': 'कृषि सहायता प्रो',
            'app_tagline': 'AI-संचालित कृषि बुद्धिमत्ता प्लेटफॉर्म',
            'login_tab': 'सुरक्षित लॉगिन',
            'signup_tab': 'शुरू करें',
            'farmer_mode': 'किसान',
            'officer_mode': 'अधिकारी',
            'login_identifier': 'ईमेल या फोन नंबर',
            'login_password': 'पासवर्ड',
            'remember_me': 'मुझे साइन इन रखें',
            'forgot_password': 'सहायता चाहिए?',
            'access_dashboard': 'डैशबोर्ड लॉन्च करें',
            'or_continue': 'या जारी रखें',
            'google_login': 'गूगल अकाउंट',
            'aadhaar_login': 'आधार सुरक्षित',
            'signup_name': 'पूरा नाम',
            'signup_phone': 'फोन नंबर',
            'signup_email': 'ईमेल पता',
            'select_state': 'राज्य चुनें',
            'select_district': 'जिला चुनें',
            'signup_village': 'गाँव/तालुका',
            'crops_grown': 'मुख्य फसलें (एक से अधिक चुनें)',
            'crop_rice': 'चावल',
            'crop_wheat': 'गेहूँ',
            'crop_vegetables': 'सब्जियाँ',
            'crop_coconut': 'नारियल',
            'farm_size': 'खेत का आकार',
            'size_small': '0-2 एकड़',
            'size_medium': '2-10 एकड़',
            'size_large': '10+ एकड़',
            'signup_password': 'पासवर्ड',
            'signup_confirm': 'पासवर्ड की पुष्टि करें',
            'create_account': 'प्रो अकाउंट बनाएं',
            'footer_text': 'भारत भर के 50,000+ किसानों द्वारा विश्वसनीय • ISO 27001 प्रमाणित'
        };
    }
    
    getMalayalamTranslations() {
        return {
            'app_title': 'കൃഷി സഹായ പ്രോ',
            'app_tagline': 'AI-ശക്തമായ കൃഷി ബുദ്ധി പ്ലാറ്റ്ഫോം',
            'login_tab': 'സുരക്ഷിത ലോഗിൻ',
            'signup_tab': 'ആരംഭിക്കുക',
            'farmer_mode': 'കർഷകൻ',
            'officer_mode': 'ഉദ്യോഗസ്ഥൻ',
            'login_identifier': 'ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ നമ്പർ',
            'login_password': 'പാസ്വേഡ്',
            'remember_me': 'എന്നെ സൈൻ ഇൻ ആക്കി വയ്ക്കുക',
            'forgot_password': 'സഹായം ആവശ്യമാണോ?',
            'access_dashboard': 'ഡാഷ്ബോർഡ് ആരംഭിക്കുക',
            'or_continue': 'അല്ലെങ്കിൽ തുടരുക',
            'google_login': 'ഗൂഗിൾ അക്കൗണ്ട്',
            'aadhaar_login': 'ആധാർ സുരക്ഷിതം',
            'signup_name': 'പൂർണ്ണ നാമം',
            'signup_phone': 'ഫോൺ നമ്പർ',
            'signup_email': 'ഇമെയിൽ വിലാസം',
            'select_state': 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
            'select_district': 'ജില്ല തിരഞ്ഞെടുക്കുക',
            'signup_village': 'ഗ്രാമം/താലൂക്ക്',
            'crops_grown': 'പ്രാഥമിക പയർവർഗങ്ങൾ (ഒന്നിലധികം തിരഞ്ഞെടുക്കുക)',
            'crop_rice': 'നെല്ല്',
            'crop_wheat': 'ഗോതമ്പ്',
            'crop_vegetables': 'പച്ചക്കറികൾ',
            'crop_coconut': 'തെങ്ങ്',
            'farm_size': 'കൃഷിസ്ഥലത്തിന്റെ വലിപ്പം',
            'size_small': '0-2 ഏക്കർ',
            'size_medium': '2-10 ഏക്കർ',
            'size_large': '10+ ഏക്കർ',
            'signup_password': 'പാസ്വേഡ്',
            'signup_confirm': 'പാസ്വേഡ് സ്ഥിരീകരിക്കുക',
            'create_account': 'പ്രോ അക്കൗണ്ട് സൃഷ്ടിക്കുക',
            'footer_text': 'ഇന്ത്യയിലെ 50,000+ കർഷകർ വിശ്വസിക്കുന്നു • ISO 27001 Certified'
        };
    }
    
    setInitialLanguage() {
        const savedLang = localStorage.getItem('ks_premium_language');
        const browserLang = navigator.language.split('-')[0];
        const geoLang = this.getGeolocationLanguage();
        
        if (savedLang && this.availableLangs.includes(savedLang)) {
            this.currentLang = savedLang;
        } else if (this.availableLangs.includes(browserLang)) {
            this.currentLang = browserLang;
        } else if (geoLang) {
            this.currentLang = geoLang;
        }
    }
    
    getGeolocationLanguage() {
        // Simulate geolocation-based language detection
        // In real implementation, this would use IP geolocation
        const indiaLangMap = {
            'KL': 'ml', // Kerala
            'TN': 'ta', // Tamil Nadu
            'AP': 'te', // Andhra Pradesh
            'KA': 'kn', // Karnataka
            'MH': 'mr', // Maharashtra
            'GJ': 'gu', // Gujarat
            'PB': 'pa', // Punjab
            'WB': 'bn', // West Bengal
            'OR': 'or', // Odisha
            'AS': 'as'  // Assam
        };
        
        // Default to Hindi for Northern states, English for international
        return 'hi';
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-btn-pro')) {
                const lang = e.target.closest('.lang-btn-pro').dataset.lang;
                this.switchLanguage(lang);
            }
        });
        
        // Keyboard shortcuts for language switching
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey) {
                switch(e.key) {
                    case '1': this.switchLanguage('en'); break;
                    case '2': this.switchLanguage('hi'); break;
                    case '3': this.switchLanguage('ml'); break;
                }
            }
        });
    }
    
    async switchLanguage(lang) {
        if (this.availableLangs.includes(lang) && lang !== this.currentLang) {
            this.currentLang = lang;
            localStorage.setItem('ks_premium_language', lang);
            
            // Update UI
            this.updateLanguageSwitcher(lang);
            await this.applyLanguage();
            this.triggerLanguageChangeEvent();
            
            // Analytics
            this.logLanguageChange(lang);
        }
    }
    
    updateLanguageSwitcher(lang) {
        document.querySelectorAll('.lang-btn-pro').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }
    
    async applyLanguage() {
        // Update text content
        this.updateTextContent();
        
        // Update placeholders
        this.updatePlaceholders();
        
        // Update page metadata
        this.updatePageMetadata();
        
        // Update fonts and RTL support
        this.updateTextDirection();
        
        // AI-powered translation for dynamic content
        if (this.aiTranslationEnabled) {
            await this.translateDynamicContent();
        }
    }
    
    updateTextContent() {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.dataset.lang;
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }
    
    updatePlaceholders() {
        document.querySelectorAll('[data-placeholder]').forEach(element => {
            const key = element.dataset.placeholder;
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }
    
    updatePageMetadata() {
        document.title = this.getTranslation('app_title') || 'Krishi Sahayata Pro';
        document.documentElement.lang = this.currentLang;
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = this.getTranslation('app_tagline');
    }
    
    updateTextDirection() {
        const rtlLangs = ['ar', 'he', 'fa', 'ur'];
        const isRTL = rtlLangs.includes(this.currentLang);
        document.body.dir = isRTL ? 'rtl' : 'ltr';
        
        // Update font family based on language
        this.updateFontFamily();
    }
    
    updateFontFamily() {
        const fontMap = {
            'hi': "'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif",
            'ml': "'Noto Sans Malayalam', 'Plus Jakarta Sans', sans-serif",
            'ta': "'Noto Sans Tamil', 'Plus Jakarta Sans', sans-serif",
            'te': "'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif",
            'bn': "'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif",
            'default': "'Plus Jakarta Sans', sans-serif"
        };
        
        document.body.style.fontFamily = fontMap[this.currentLang] || fontMap.default;
    }
    
    async translateDynamicContent() {
        // AI-powered translation for user-generated content
        const dynamicElements = document.querySelectorAll('.dynamic-content, [data-translate]');
        
        for (const element of dynamicElements) {
            const originalText = element.dataset.originalText || element.textContent;
            if (originalText && this.needsTranslation(originalText)) {
                try {
                    const translatedText = await this.aiTranslate(originalText, this.currentLang);
                    element.textContent = translatedText;
                    element.dataset.originalText = originalText;
                } catch (error) {
                    console.warn('AI translation failed:', error);
                }
            }
        }
    }
    
    async aiTranslate(text, targetLang) {
        // Simulate AI translation API call
        // In real implementation, this would call a translation service
        
        if (targetLang === 'en') return text; // No translation needed
        
        const translationMap = {
            'hi': {
                'hello': 'नमस्ते',
                'thank you': 'धन्यवाद',
                'help': 'मदद'
            },
            'ml': {
                'hello': 'നമസ്കാരം',
                'thank you': 'നന്ദി',
                'help': 'സഹായം'
            }
        };
        
        // Simple word replacement for demo
        let translated = text;
        const map = translationMap[targetLang];
        if (map) {
            Object.keys(map).forEach(key => {
                translated = translated.replace(new RegExp(key, 'gi'), map[key]);
            });
        }
        
        return translated || text;
    }
    
    needsTranslation(text) {
        // Simple heuristic to check if text might need translation
        return text.length > 2 && text.length < 500 && !text.match(/^[0-9\s\-\+\.\,]+$/);
    }
    
    getTranslation(key) {
        const langData = this.translations[this.currentLang];
        return langData ? langData[key] : this.translations.en[key];
    }
    
    translate(key, params = {}) {
        let translation = this.getTranslation(key);
        
        // Replace parameters in translation
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation || key;
    }
    
    triggerLanguageChangeEvent() {
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        }));
    }
    
    logLanguageChange(lang) {
        console.log(`Language changed to: ${lang}`);
        // In production, send to analytics
    }
    
    setupAITranslation() {
        // Initialize AI translation service
        if (this.aiTranslationEnabled) {
            this.initializeTranslationAPI();
        }
    }
    
    initializeTranslationAPI() {
        // Setup for real translation API would go here
        console.log('AI Translation service initialized');
    }
    
    // Advanced method for agricultural term translation
    translateAgriculturalTerm(term, context = 'general') {
        const agriculturalDictionary = {
            'en': {
                'pesticide': { general: 'pesticide', organic: 'organic pesticide' },
                'fertilizer': { general: 'fertilizer', organic: 'organic manure' }
            },
            'hi': {
                'pesticide': { general: 'कीटनाशक', organic: 'जैविक कीटनाशक' },
                'fertilizer': { general: 'उर्वरक', organic: 'जैविक खाद' }
            },
            'ml': {
                'pesticide': { general: 'കീടനാശിനി', organic: 'ജൈവ കീടനാശിനി' },
                'fertilizer': { general: 'വളം', organic: 'ജൈവ വളം' }
            }
        };
        
        const dict = agriculturalDictionary[this.currentLang] || agriculturalDictionary.en;
        return dict[term] ? (dict[term][context] || dict[term]['general']) : term;
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    getAvailableLanguages() {
        return this.availableLangs;
    }
    
    // Method for right-to-left language support
    isRTL() {
        const rtlLangs = ['ar', 'he', 'fa', 'ur'];
        return rtlLangs.includes(this.currentLang);
    }
}

// Initialize the advanced language manager
const advancedLanguageManager = new AdvancedLanguageManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedLanguageManager;
}