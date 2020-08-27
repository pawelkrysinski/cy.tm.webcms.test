/// <reference types="Cypress" />

/* 6. firma.t-mobile.pl aktualności 

Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 

•Sprawdzamy czy strona główna dostępna pod odpowiednim adresem •  https://firma.t-mobile.pl/dla-mediow/aktualnosci› status code 200
•Sprawdzamy czy na stronie znajduje się wyróżniony najnowszy news 
•Sprawdzamy czy na stronie znajduje się lista najnowszych newsow (6 newsow per page)

 */

describe('TM news', () => {
 
 	beforeEach(() => {
		
	cy.visit(Cypress.env('tm_main_company_news'))
	
	})
	
	it('last news', () => {
	
	cy.window().then((win) => {
	console.log(win.location)
	
	cy.get('.article-header').should('be.visible')
	
	})

	
	})
	
	it('articles', () => {
	
	cy.get('#Content > div.article-list.md-shadow-2dp').find('.article').should('have.length', 6)
	
	})
	
})