/// <reference types="Cypress" />

/*	https://confluence/pages/viewpage.action?pageId=105873655

5. firma.t-mobile.pl 
Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 
•Sprawdzamy czy strona główna portalu firma dostępna pod odpowiednim adresem • https://firma.t-mobile.pl/ › status code 200

•Sprawdzamy  czy strona główna  portalu firma w wersji angielskiej dostępna pod odpowiednim adresem •https://firma.t-mobile.pl/en › status code 200

•Sprawdzamy czy po wejściu na strone pojawia się cookie bar
•Sprawdzamy czy na stronie głównek poprawnie osadzone jest menu i footer
•Sprawdzamy czy na stronie głównej widocnzy jest slider z najnowszymi informacjami prasowymi › <div id="newsbox" class="slick-initialized slick-slider">...</div>
•Sprawdzamy czy wybranie przycisku 'Czytaj więcej' prowadzi na poprawny adres https://firma.t-mobile.pl/dla-mediow/aktualnosci/informacja-prasowa/{rok}/{miesiac}/{nazwa}.html */

describe('TM company', () => {

	beforeEach(() => {
		
	// cy.visit('https://firma.t-mobile.pl')
	cy.visit(Cypress.env('tm_main_company'))
	
	
	})
	
	// Sprawdzamy czy strona główna portalu firma dostępna pod odpowiednim adresem • https://firma.t-mobile.pl/ › status code 200
	it('company info pl', () => {
		
		cy.get('#cookieDiv').should('be.visible').contains('Korzystamy z plików cookies')

	})
	
	// Sprawdzamy  czy strona główna  portalu firma w wersji angielskiej dostępna pod odpowiednim adresem
	it('company info en', () => {
		
		cy.visit(Cypress.env('tm_main_company_en'))
		cy.get('#cookieDiv').should('be.visible').contains('Korzystamy z plików cookies')

	})
	
	// Sprawdzamy czy po wejściu na strone pojawia się cookie bar
	it('cookie bar', () => {
		
		cy.get('#cookieDiv').should('be.visible').contains('Korzystamy z plików cookies')

	})
	
	// Sprawdzamy czy na stronie głównek poprawnie osadzone jest menu i footer
	it('menu & footer', () => {
		
		cy.get('#MainMenu')
		cy.get('#Footer')
		
	})
	
	// Sprawdzamy czy na stronie głównej widocnzy jest slider z najnowszymi informacjami prasowymi
	it('newsbox', () => {
		
		cy.get('div#newsbox.slick-initialized.slick-slider').should('be.visible')	
		
	})
	
	// Sprawdzamy czy wybranie przycisku 'Zobacz więcej' prowadzi na poprawny adres 
	it('see more', () => {
		
		const txt = 'Zobacz więcej aktualności'
		cy.get('.row > .btn').should('contain', txt).click().url().should('include', '/dla-mediow/aktualnosci/type/informacja+prasowa') 
			
	})
	
	//Sprawdzamy czy wybranie przycisku 'Czytaj więcej' prowadzi na poprawny adres
	it('read more', () => {
		
		cy.get('div.datetime').first()			
			// .should('contain','2020')
			// .toString()
		
		cy.get('.slick-current > .content > .controls > .btn').click().url().should('include', '/dla-mediow/aktualnosci/informacja-prasowa/')
	
	})

})
