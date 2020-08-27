/// <reference types="Cypress" />

/* 8. Lista usług 

Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 

•Sprawdzamy czy strona główna dostępna pod odpowiednim adresem •https://www.t-mobile.pl/c/uslugi› status code 200
•Na stronie znajduje się tytuł 'Lista usług'
•Na stronie znajduje się lista kategorii:
•Smart
•Bezpieczeństwo
•Pozostałe
•Rozrywka 
•Ubezpieczenia
•Lokalizacja 
•Muzyka

 */

describe('TM service list', () => {
 
 	beforeEach(() => {

		cy.visit(Cypress.env('tm_main_service'))
	
	})
	
	it('title', () => {
	
	cy.window().then((win) => {
	console.log(win.location)
	
		cy.get('body > div.container.container__last').find('h1').should('contain','Lista usług').should('be.visible')
	
	
	})

	
	})
	
	it('categories', () => {
	
		cy
			.get('body > div.container.container__last > div:nth-child(2) > div.col-12.col-lg-2.col-xl-3 > div')
			.find('.custom-control-input')
			.should('have.length', 7)
			.should('be.visible')

	
/* 	cy.get(':nth-child(3) > .custom-control > .custom-control-label').should('contain','Smart')
	cy.get(':nth-child(4) > .custom-control > .custom-control-label').should('contain','Bezpieczeństwo')
	cy.get(':nth-child(5) > .custom-control > .custom-control-label').should('contain','Pozostałe')
	cy.get(':nth-child(6) > .custom-control > .custom-control-label').should('contain','Rozrywka')
	cy.get(':nth-child(7) > .custom-control > .custom-control-label').should('contain','Ubezpieczenia')
	cy.get(':nth-child(8) > .custom-control > .custom-control-label').should('contain','Lokalizacja')
	cy.get(':nth-child(9) > .custom-control > .custom-control-label').should('contain','Muzyka') */
	
	
	})
	
		it('labels', () => {
	
			cy.get(':nth-child(3) > .custom-control > .custom-control-label').should('contain','Smart')
			cy.get(':nth-child(4) > .custom-control > .custom-control-label').should('contain','Bezpieczeństwo')
			cy.get(':nth-child(5) > .custom-control > .custom-control-label').should('contain','Pozostałe')
			cy.get(':nth-child(6) > .custom-control > .custom-control-label').should('contain','Rozrywka')
			cy.get(':nth-child(7) > .custom-control > .custom-control-label').should('contain','Ubezpieczenia')
			cy.get(':nth-child(8) > .custom-control > .custom-control-label').should('contain','Lokalizacja')
			cy.get(':nth-child(9) > .custom-control > .custom-control-label').should('contain','Muzyka')
	
		})
	
})
