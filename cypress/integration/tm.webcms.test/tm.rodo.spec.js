/// <reference types="Cypress" />

/* 7. firma.t-mobile.pl RODO 

Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 

• Sprawdzamy czy strona główna dostępna pod odpowiednim adresem •  https://firma.t-mobile.pl/odpowiedzialnosc/RODO› status code 200
• Sprawdzamy czy na stronie widoczne jest menu z pozycjami:
• Ochrona danych osobowych 
• Jakie dane przetwarzamy 
• Przekazywanie danych 
• Prawa osób 
• Prawa do wycofania zgody 
• Sprawdzamy czy poszczegolne pozycje prowadza do kolejnych stron
• Ochrona danych osobowych› https://firma.t-mobile.pl/odpowiedzialnosc/ochrona_danych_osobowych/ochrona_danych_osobowych
• Jakie dane przetwarzamy › https://firma.t-mobile.pl/odpowiedzialnosc/ochrona_danych_osobowych/jakie_dane_przetwarzamy 
• Przekazywanie danych › https://firma.t-mobile.pl/odpowiedzialnosc/ochrona_danych_osobowych/przekazywanie_danych
• Prawa osób › https://firma.t-mobile.pl/odpowiedzialnosc/ochrona_danych_osobowych/prawa_osob
• Prawa do wycofania zgody› https://firma.t-mobile.pl/odpowiedzialnosc/RODO/prawo_do_wycofania_zgody

 */

describe('TM RODO', () => {
 
 	beforeEach(() => {
		cy.visit(Cypress.env('tm_main_company_rodo'))
	})
	
	it('tabs', () => {
	
	cy.get('#breadcrumbs-container')
	cy.get('.tab-links > :nth-child(2) > a').should('be.visible')
	
	
	})

	it('link', () => {
		
		cy.get('#Content > :nth-child(1) > .col-l-12')
		.find('a').first().should('contain','Ochrona danych osobowych')
		.each($href => {cy.request($href[0].toString())
			})
	})
	
		it('link1', () => {
		
		cy.get('.tab-links > :nth-child(1)')
		.find('a').should('contain','Ochrona danych osobowych')
		.each($href => {cy.visit($href[0].toString())
			})
		})
		
		it('link2', () => {
		
		cy.get('.tab-links > :nth-child(2)')
		.find('a').should('contain','Jakie dane przetwarzamy')
		.each($href => {cy.visit($href[0].toString())
			})
		})	

		it('link3', () => {
		
		cy.get('.tab-links > :nth-child(3)')
		.find('a').should('contain','Przekazywanie danych')
		.each($href => {cy.visit($href[0].toString())
			})
		})

		it('link4', () => {
		
		cy.get('.tab-links > :nth-child(4)')
		.find('a').should('contain','Prawa osób')
		.each($href => {cy.visit($href[0].toString())
			})
		})

		it('link5', () => {
		
		cy.get('.tab-links > :nth-child(5)')
		.find('a').should('contain','Prawa do wycofania zgody')
		.each($href => {cy.visit($href[0].toString())
			})
		})				
	
		it('links', () => {
		
		cy.get('#Content > :nth-child(1) > .col-l-12')
		.find('a')
		.each($href => {cy.request($href[0].toString())
			})
	})
		
	})
	
