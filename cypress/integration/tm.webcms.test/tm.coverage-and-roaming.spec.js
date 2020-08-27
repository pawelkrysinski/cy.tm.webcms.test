/// <reference types="Cypress" />

/* 10. Zasięg i roaming 

Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 

•Sprawdzamy czy strona główna dostępna pod odpowiednim adresem •  https://www.t-mobile.pl/c/zasieg-i-roaming› status code 200 
•Sprawdzamy czy na stronie znajduje się napis 'Pomoc Techniczna'
•Sprawdzamy czy na stronie znajduje się accordion z pytaniami faq
•Sprawdzamy czy kliknięcie w strzałkę otwiera panel i pokazuje się odpowiedź
•Sprawdzamy czy pod odpowiedzią dostęna jest ankieta 'Czy ta odpowiedź była pomocna? ' (po nacisnieciu przycisku 'tak' lub 'nie' powinien pojawić się tekst 'Twoja opinia została wysłana. Dziękujemy za wsparcie.'
•Sprawdzamy czy można wysłać odpowiedź 

 */
 
describe('TM coverage & roaming', () => {
 
 	beforeEach(() => {

	cy.visit(Cypress.env('tm_main_roam'))
	
	})
	
	it('tech support', () => {
	
	cy.get('.container').find('h1').should('be.visible').should('contain','Pomoc techniczna')
			
	cy.get('#accordion0 > div:nth-child(1)').click()  
	cy.get('#collapse0 > .card-body > .survey > .survey-question-1 > .question').should('be.visible')
	cy.get('#collapse0 > .card-body > .survey > .survey-question-1 > .btns-wrapper > .yes').click()
	cy.get('#collapse0 > .card-body > .survey').find('.thank-you').should('contain','Twoja opinia została wysłana')
		
	})
	
	it('accordion', () => {
	
	cy.get('.container').find('.accordion').should('be.visible')
	
	})
	
	it('submit opinion', () => {
	
	cy.get('#accordion0 > div:nth-child(1)').click()  
	cy.get('#collapse0 > .card-body > .survey > .survey-question-1 > .question').should('be.visible')
	cy.get('#collapse0 > .card-body > .survey > .survey-question-1 > .btns-wrapper > .yes').click()
	cy.get('#collapse0 > .card-body > .survey').find('.thank-you').should('contain','Twoja opinia została wysłana')
	
	})
	
})