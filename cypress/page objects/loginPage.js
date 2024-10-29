class LoginPage{
    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';
    button = 'button[type="submit"]';
    menu = '.oxd-main-menu';
    logoutButton  = 'a[href="/web/index.php/auth/logout"]';

    open(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    login(username, password){
        cy.get(this.usernameInput).type(username);
        cy.get(this.passwordInput).type(password);
        cy.get(this.button).click();
    }
}

export default LoginPage