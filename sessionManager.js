import { browser } from "@wdio/globals";

export class SessionManager {
    static authToken = null;
    static cookies = null;
    
    /**
     * Login jednom i sačuvaj session
     */
    static async loginOnce() {
        // Proveri da li već imamo token
        if (this.authToken) {
            console.log("✅ Already logged in");
            return;
        }
        
        console.log("🔐 Performing login...");
        
        // Idi na login i uloguj se
        await browser.url('/login');
        await $('#email').setValue(process.env.admin);
        await $('#password').setValue(process.env.adminPass);
        await $('button[data-testid="loginButton"]').click();
        
        // Čekaj dashboard
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/dashboard'),
            { timeout: 10000 }
        );
        
        // Sačuvaj token i cookies
        this.authToken = await browser.execute(() => {
            return localStorage.getItem('authentication-token');
        });
        this.cookies = await browser.getCookies();
        
        console.log("✅ Login successful, session saved");
    }
    
    /**
     * Vrati sačuvanu session bez ponovnog logina
     */
    static async restoreSession() {
        // Ako nema sačuvane session, uradi login
        if (!this.authToken || !this.cookies) {
            console.log("No saved session, need to login");
            await this.loginOnce();
            return;
        }
        
        console.log("♻️ Restoring saved session...");
        
        // Postavi cookies
        await browser.setCookies(this.cookies);
        
        // Postavi token u localStorage
        await browser.execute((token) => {
            localStorage.setItem('authentication-token', token);
        }, this.authToken);
        
        // Idi direktno na dashboard (bez login stranice)
        await browser.url('/dashboard');
        
        console.log("✅ Session restored");
    }
}