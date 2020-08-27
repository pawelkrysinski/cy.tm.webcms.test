/// <reference types="Cypress" />

/* 9. Informacje i pomoc 

Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 

•Sprawdzamy czy strona główna dostępna pod odpowiednim adresem •  https://www.t-mobile.pl/c/informacje-i-pomoc› status code 200
•Sprawdzamy czy na stronie widoczne są linki do stron:
• Płatności i faktury 
• Usługi i pakiety 
• Mój abonament 
• Zarządzanie kontem 
• Przeniesienie numeru 
• Pomoc techniczna 
• Zasięg i roaming 
• Internet mobilny 
•Sprawdzamy czy kolejne linki kierują na istniejące adresy › status code 200

 */
 
 describe('TM help & support', () => {
 
 	beforeEach(() => {

	cy.visit(Cypress.env('tm_main_help'))
	
	})
	
	it('tabs', () => {
	
	cy.get('.bg-gray > .container').should('be.visible')
	
	cy.get(':nth-child(1) > .content-box > .content-box--text > .text-magenta').should('contain','Płatności i faktury')
	cy.get(':nth-child(2) > .content-box > .content-box--text > .text-magenta').should('contain','Usługi i pakiety')
	cy.get(':nth-child(3) > .content-box > .content-box--text > .text-magenta').should('contain','Mój abonament')
	cy.get(':nth-child(4) > .content-box > .content-box--text > .text-magenta').should('contain','Zarządzanie kontem')
	cy.get(':nth-child(5) > .content-box > .content-box--text > .text-magenta').should('contain','Przeniesienie numeru')
	cy.get(':nth-child(6) > .content-box > .content-box--text > .text-magenta').should('contain','Pomoc techniczna')
	cy.get(':nth-child(7) > .content-box > .content-box--text > .text-magenta').should('contain','Zasięg i roaming')
	cy.get(':nth-child(8) > .content-box > .content-box--text > .text-magenta').should('contain','Internet mobilny')
	
	})
	
	it('links', () => {
		cy.get('.bg-gray > .container')
		  .find('a')
		  .each($href => {cy.request($href[0].toString())
		})
	
	})
	
/* 	it('links visited', () => {
		cy.get('.bg-gray > .container')
		  .find('a')
		  .each($href => {cy.visit($href[0].toString())
		})
	
	})	 */
	
})