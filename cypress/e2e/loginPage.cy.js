import LoginPage from "../page objects/loginPage"

const loginPage = new LoginPage();

describe('Login Funcitonality', () => {

    it('Should login succesfully with valid credentials', () => {
        loginPage.open();
        cy.fixture('loginData').then((data) => {
            const { username, password } = data.validUser;
            loginPage.login(username, password);
        });
        cy.get(loginPage.menu).should('be.visible');
    });

    it('Should not login with invalid credentials', () => {
        loginPage.open();
        let errorAlert = 'div[class="oxd-alert oxd-alert--error"]';
        cy.fixture('loginData').then((data) => {
            const { username, password } = data.invalidUser;
            loginPage.login(username, password);
        });
        cy.get(errorAlert).should('be.visible');
    })

    it('Should give error message for empty fields', ()=>{
        let errorMessage = 'span[class= "oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]';
        loginPage.open();
        cy.get(loginPage.usernameInput).clear();
        cy.get(loginPage.passwordInput).clear();
        cy.get(loginPage.button).click();
        cy.get(errorMessage).should('be.visible')
    });

    it('Should give error message for empty username field', ()=>{
        let errorMessage = 'span[class= "oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]';
        loginPage.open();
        cy.get(loginPage.passwordInput).type('something');
        cy.get(loginPage.usernameInput).clear();
        cy.get(loginPage.button).click();
        cy.get(errorMessage).should('be.visible')
    });

    it('Should give error message for empty password field', ()=>{
        let errorMessage = 'span[class= "oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]';
        loginPage.open();
        cy.get(loginPage.usernameInput).type('something');
        cy.get(loginPage.passwordInput).clear();
        cy.get(loginPage.button).click();
        cy.get(errorMessage).should('be.visible')
    });

    it('should log out succesfully', ()=>{
        loginPage.open();
        cy.fixture('loginData').then((data) => {
            const { username, password } = data.validUser;
            loginPage.login(username, password);
        });
        cy.wait(2000);
        cy.get('p[class="oxd-userdropdown-name"]').click();
        cy.get(loginPage.logoutButton).should('be.visible');
        cy.get(loginPage.logoutButton).click();
        cy.url({ timeout: 5000 }).should('include', '/auth/login');
    });

});