import LoginPage from "../page objects/loginPage";
import DashboardPage from "../page objects/dashboardPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Dashboard Page Functionality', ()=>{

    beforeEach(() => {
        loginPage.open();
        cy.fixture('loginData').then((data) =>{
            const {username, password} = data.validUser;
            loginPage.login(username, password);
        })
    });

    it('Admin / Should find correct system User', ()=>{   
        //Transferring to Admin Page
        cy.get(dashboardPage.menuItems).first().click();

        //Selecting information
        cy.get('input[class="oxd-input oxd-input--active"]').eq(1).type('Admins');
        cy.get('div[tabindex="0"]').first().click();
        cy.get('div.oxd-select-dropdown').click();
        cy.get('div[tabindex="0"]').contains('Admin').should('be.visible');
        
        cy.get('input[placeholder="Type for hints..."]').type('Radha Gupta');
        cy.wait(5000);
        cy.get('div.oxd-autocomplete-dropdown').click();
        cy.get('div[tabindex="0"]').eq(1).click();
        cy.get('div.oxd-select-dropdown').click();
        cy.get('button[type="submit"]').click();
        cy.get('div[class="oxd-table"]').should('be.visible')
        cy.get('span[class="oxd-text oxd-text--span"]').contains('(1) Record Found')
    });

    it('Admin / Should reset data using Reset Button', ()=>{
        cy.get(dashboardPage.menuItems).first().click();
        cy.get('button[type="button"]').eq(4).click();
        cy.wait(2000);
        cy.get('span[class="oxd-text oxd-text--span"]').contains('(28) Records Found')
    });

    it('Buzz/ Shouold make post correctly', ()=>{
        cy.get(dashboardPage.menuItems).eq(11).click();
        cy.get('textarea[placeholder="What\'s on your mind?"]').type('Hello world');
        cy.get('button[type="submit"]').click();
        cy.get('#oxd-toaster_1').should('be.visible')
        cy.wait(5000);
        cy.get('p[class="oxd-text oxd-text--p orangehrm-buzz-post-body-text"]').first().contains('Hello world');

    });

    it('Buzz/ Shouold delete post successfully', ()=>{
        cy.get(dashboardPage.menuItems).eq(11).click();
        cy.get('button[class="oxd-icon-button"]').eq(1).click();
        cy.get('li[class="orangehrm-buzz-post-header-config-item"]').first().click();
        cy.get('button[class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]').click();
        cy.get('#oxd-toaster_1').should('be.visible')
    });

    it.only('Buzz/ Shouold like post successfully', ()=>{
        cy.get(dashboardPage.menuItems).eq(11).click();
        cy.get(dashboardPage.heartIcon).should('be.visible');
        cy.get(dashboardPage.likeText).first().invoke('text').then((text) => {
            cy.get(dashboardPage.likeText).first().should('contain', text);
        });
        cy.get(dashboardPage.heartIcon).click();
        cy.get('p[class="oxd-text oxd-text--p orangehrm-buzz-stats-active"]').should('contain', '1 Like');
    });

});