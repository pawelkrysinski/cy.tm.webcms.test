/// <reference types="Cypress" />

/*  https://confluence/display/DIGIT/3.+Mapa+Serwisu

	Sprawdzamy czy strona główna dostępna pod odpowiednim adresem 
    https://www.t-mobile.pl/c/mapa-serwisu › status code 200
    Sprawdzamy czy widoczne są 2 sekcje dla Ciebie i dla Firm
    Sprawdzamy czy każdy link w obu sekcjach kieruje na istniejącą stronę (status 200) */
	
	describe('TM service map', () => {

	// Sprawdzamy czy strona główna dostępna pod odpowiednim adresem https://www.t-mobile.pl/c/mapa-serwisu › status code 200	
	beforeEach(() => {
	
	cy.visit(Cypress.env('tm_main_service_map'))
	
	})
	
	// Sprawdzamy czy widoczne są 2 sekcje dla Ciebie i dla Firm
	it('services', () => {
		cy.get('.container__last > :nth-child(2) > :nth-child(1) > :nth-child(1)')
		.contains('Dla Ciebie')	
		cy.get('.container__last > :nth-child(2) > :nth-child(1) > :nth-child(2)')
		.contains('Dla Firm')
	
	})
	
	// Sprawdzamy czy każdy link w obu sekcjach kieruje na istniejącą stronę (status 200)
	it('links', () => {
		cy.get('body > div.container.container__last > div:nth-child(2) > div > div:nth-child(1) > div')
		.find('.site-map__link')
		.each($href => {cy.request($href[0].toString())
			})
		cy.get('body > div.container.container__last > div:nth-child(2) > div > div:nth-child(2) > div')
		.find('.site-map__link')
		.each($href => {cy.request($href[0].toString())
			})
		})

	})