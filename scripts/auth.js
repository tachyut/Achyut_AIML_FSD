// Advanced Authentication System with Biometric Support
class PremiumAuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.biometricSupported = false;
        this.init();
    }
    
    async init() {
        await this.checkBiometricSupport();
        this.setupEventListeners();
        this.checkExistingSession();
        this.setupSecurityMonitoring();
    }
    
    async checkBiometricSupport() {
        if ('credentials' in navigator && 'PublicKeyCredential' in window) {
            try {
                const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
                this.biometricSupported = available;
                
                if (available) {
                    this.setupBiometricAuthentication();
                }
            } catch (error) {
                console.warn('Biometric check failed:', error);
            }
        }
    }
    
    setupEventListeners() {
        // Form submissions
        document.getElementById('login-form')?.addEventListener('submit', this.handleLogin.bind(this));
        document.getElementById('signup-form')?.addEventListener('submit', this.handleSignup.bind(this));
        
        // Social logins
        document.querySelector('.btn-social-pro.google-pro')?.addEventListener('click', this.handleGoogleLogin.bind(this));
        document.querySelector('.btn-social-pro.aadhaar-pro')?.addEventListener('click', this.handleAadhaarLogin.bind(this));
        
        // Biometric login
        this.setupBiometricButton();
        
        // Password visibility toggle
        document.querySelector('.password-toggle-pro')?.addEventListener('click', this.togglePasswordVisibility.bind(this));
        
        // Tab switching
        document.querySelectorAll('.premium-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.tab;
                this.switchAuthTab(targetTab);
            });
        });
        
        // Auth mode toggle
        document.querySelectorAll('.toggle-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchAuthMode(mode);
            });
        });
    }
    
    switchAuthTab(tab) {
        // Update active tab
        document.querySelectorAll('.premium-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        // Show corresponding form
        document.querySelectorAll('.premium-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tab}-form`);
        });
        
        // Animate transition
        this.animateTabSwitch(tab);
    }
    
    animateTabSwitch(tab) {
        const activeForm = document.querySelector('.premium-form.active');
        if (activeForm) {
            activeForm.style.animation = 'none';
            setTimeout(() => {
                activeForm.style.animation = 'slideInUp 0.6s ease';
            }, 10);
        }
    }
    
    switchAuthMode(mode) {
        document.querySelectorAll('.toggle-option').forEach(option => {
            option.classList.toggle('active', option.dataset.mode === mode);
        });
        
        // Update form based on mode (Farmer/Officer)
        this.updateFormForMode(mode);
    }
    
    updateFormForMode(mode) {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            const officerFields = signupForm.querySelectorAll('.officer-field');
            officerFields.forEach(field => {
                field.style.display = mode === 'officer' ? 'block' : 'none';
            });
            
            const farmerFields = signupForm.querySelectorAll('.farmer-field');
            farmerFields.forEach(field => {
                field.style.display = mode === 'farmer' ? 'block' : 'none';
            });
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const identifier = formData.get('identifier') || document.getElementById('login-identifier').value;
        const password = formData.get('password') || document.getElementById('login-password').value;
        
        if (!this.validateLoginInput(identifier, password)) {
            return;
        }
        
        const loginButton = e.target.querySelector('.btn-premium');
        this.setLoadingState(loginButton, true);
        
        try {
            const userData = await this.authenticateUser(identifier, password);
            await this.handleSuccessfulLogin(userData);
        } catch (error) {
            this.handleLoginError(error);
        } finally {
            this.setLoadingState(loginButton, false);
        }
    }
    
    validateLoginInput(identifier, password) {
        if (!identifier || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }
        
        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'warning');
            return false;
        }
        
        return true;
    }
    
    async authenticateUser(identifier, password) {
        // Simulate API call with advanced security
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Advanced user validation
                const users = this.getStoredUsers();
                const user = users.find(u => 
                    u.email === identifier || u.phone === identifier
                );
                
                if (user && this.verifyPassword(password, user.password)) {
                    // Security audit log
                    this.logSecurityEvent('login_success', user.id);
                    resolve(user);
                } else {
                    this.logSecurityEvent('login_failed', identifier);
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    }
    
    async handleSuccessfulLogin(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        
        // Store session
        this.createUserSession(userData);
        
        // Show success animation
        await this.playLoginSuccessAnimation();
        
        // Redirect to dashboard
        this.redirectToDashboard();
    }
    
    async handleSignup(e) {
        e.preventDefault();
        
        const formData = this.collectSignupData();
        if (!this.validateSignupData(formData)) {
            return;
        }
        
        const signupButton = e.target.querySelector('.btn-premium');
        this.setLoadingState(signupButton, true);
        
        try {
            const userData = await this.createUserAccount(formData);
            await this.handleSuccessfulSignup(userData);
        } catch (error) {
            this.handleSignupError(error);
        } finally {
            this.setLoadingState(signupButton, false);
        }
    }
    
    collectSignupData() {
        return {
            name: document.getElementById('signup-name').value,
            phone: document.getElementById('signup-phone').value,
            email: document.getElementById('signup-email').value,
            state: document.getElementById('signup-state').value,
            district: document.getElementById('signup-district').value,
            village: document.getElementById('signup-village').value,
            crops: this.getSelectedCrops(),
            language: document.getElementById('signup-language').value,
            farmSize: document.getElementById('signup-farm-size').value,
            password: document.getElementById('signup-password').value,
            confirmPassword: document.getElementById('signup-confirm').value,
            userType: document.querySelector('.toggle-option.active').dataset.mode
        };
    }
    
    validateSignupData(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!this.validatePhone(data.phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        if (!this.validateEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.state || !data.district) {
            errors.push('Please select your state and district');
        }
        
        if (data.crops.length === 0) {
            errors.push('Please select at least one crop');
        }
        
        if (data.password.length < 8) {
            errors.push('Password must be at least 8 characters');
        }
        
        if (data.password !== data.confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        if (errors.length > 0) {
            this.showNotification(errors[0], 'error');
            return false;
        }
        
        return true;
    }
    
    async createUserAccount(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = {
                    id: this.generateUserId(),
                    ...userData,
                    password: this.hashPassword(userData.password),
                    joinDate: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    accountStatus: 'active',
                    preferences: {
                        theme: 'light',
                        notifications: true,
                        language: userData.language
                    }
                };
                
                // Store user
                this.storeUser(user);
                
                // Security audit
                this.logSecurityEvent('account_created', user.id);
                
                resolve(user);
            }, 2000);
        });
    }
    
    async handleGoogleLogin() {
        this.showNotification('Initializing Google authentication...', 'info');
        
        try {
            // Simulate Google OAuth flow
            const userData = await this.authenticateWithGoogle();
            await this.handleSuccessfulLogin(userData);
        } catch (error) {
            this.showNotification('Google authentication failed', 'error');
        }
    }
    
    async handleAadhaarLogin() {
        if (!this.validateIndianContext()) {
            this.showNotification('Aadhaar authentication requires Indian context', 'warning');
            return;
        }
        
        this.showNotification('Initializing Aadhaar authentication...', 'info');
        
        // Aadhaar authentication implementation would go here
        this.showNotification('Aadhaar authentication would open here', 'info');
    }
    
    setupBiometricAuthentication() {
        const biometricButton = document.createElement('button');
        biometricButton.className = 'btn-biometric';
        biometricButton.innerHTML = '👆 Biometric Login';
        biometricButton.addEventListener('click', this.handleBiometricLogin.bind(this));
        
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.appendChild(biometricButton);
        }
    }
    
    async handleBiometricLogin() {
        try {
            const assertion = await navigator.credentials.get({
                publicKey: {
                    challenge: new Uint8Array(32),
                    allowCredentials: [],
                    userVerification: 'required'
                }
            });
            
            // Biometric authentication successful
            const userData = await this.authenticateWithBiometric(assertion);
            await this.handleSuccessfulLogin(userData);
        } catch (error) {
            this.showNotification('Biometric authentication failed', 'error');
        }
    }
    
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('login-password');
        const toggleButton = document.querySelector('.password-toggle-pro');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            toggleButton.textContent = '👁️';
        }
    }
    
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            button.querySelector('.btn-text').textContent = 'Processing...';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            const btnText = button.closest('.premium-tab').dataset.tab === 'login' ? 
                'Launch Dashboard' : 'Create Pro Account';
            button.querySelector('.btn-text').textContent = btnText;
        }
    }
    
    async playLoginSuccessAnimation() {
        const loginForm = document.querySelector('.premium-form.active');
        if (loginForm) {
            loginForm.style.animation = 'successPulse 0.6s ease';
            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }
    
    redirectToDashboard() {
        this.showNotification('Authentication successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }
    
    // Security and utility methods
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }
    
    hashPassword(password) {
        // In real implementation, use proper hashing like bcrypt
        return btoa(password); // Base64 for demo
    }
    
    verifyPassword(password, hash) {
        return btoa(password) === hash;
    }
    
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    getStoredUsers() {
        return JSON.parse(localStorage.getItem('ks_premium_users') || '[]');
    }
    
    storeUser(user) {
        const users = this.getStoredUsers();
        users.push(user);
        localStorage.setItem('ks_premium_users', JSON.stringify(users));
    }
    
    createUserSession(user) {
        const session = {
            userId: user.id,
            token: this.generateSessionToken(),
            expires: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
            ip: this.getClientIP()
        };
        
        localStorage.setItem('ks_premium_session', JSON.stringify(session));
        localStorage.setItem('ks_premium_current_user', JSON.stringify(user));
    }
    
    checkExistingSession() {
        const session = JSON.parse(localStorage.getItem('ks_premium_session') || '{}');
        
        if (session.expires > Date.now()) {
            const user = JSON.parse(localStorage.getItem('ks_premium_current_user') || '{}');
            this.currentUser = user;
            this.isAuthenticated = true;
            
            // Auto-redirect if on login page
            if (window.location.pathname.includes('index.html')) {
                this.redirectToDashboard();
            }
        }
    }
    
    setupSecurityMonitoring() {
        // Monitor for suspicious activities
        setInterval(() => {
            this.checkSecurityAnomalies();
        }, 30000);
    }
    
    logSecurityEvent(event, userId) {
        const log = {
            event,
            userId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: this.getClientIP()
        };
        
        const securityLog = JSON.parse(localStorage.getItem('ks_security_log') || '[]');
        securityLog.push(log);
        localStorage.setItem('ks_security_log', JSON.stringify(securityLog.slice(-1000))); // Keep last 1000 events
    }
    
    getClientIP() {
        // This would be implemented with a proper IP detection service
        return '127.0.0.1'; // Default for demo
    }
    
    generateSessionToken() {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
    }
    
    validateIndianContext() {
        // Check if user appears to be in India
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return timezone.includes('India') || timezone.includes('Calcutta');
    }
    
    showNotification(message, type = 'info') {
        // Advanced notification system implementation
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Actual UI notification implementation would go here
    }
}

// Initialize the premium authentication system
document.addEventListener('DOMContentLoaded', () => {
    const premiumAuthManager = new PremiumAuthManager();
    
    // Make available globally for debugging
    window.premiumAuthManager = premiumAuthManager;
});