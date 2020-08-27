/// <reference types="Cypress" />

/* https://confluence/pages/viewpage.action?pageId=105873655

4. Mapa Zasięgu 
Utworzone przez Grudzień Anna, ostatnia modyfikacja 14 sie 2020 

•Strona dostępna pod poprawnym adresem https://www.t-mobile.pl/c/mapa-zasiegu › status 200
•Na stronie poprawnie załadowała się mapa google
•Na stronie załadował się skrypt scripts-coverage-map.js
•Po wpisaniu Warszawa  w input wyszukaj lokalizacji na mapie pojawia się kursor (<area log="miw" coords="13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75" shape="poly" title="" style="cursor: pointer; touch-action: none;">)
•Na liście technologi dostępne są pozycje:
•NB-IoT
•2G
•3G
•LTE 4G
•5G

•Osadzony kontener gtm z id = ${parametr}

•w kodzie strony widoczne są wpisy:
<head>
...
<script>
function defer(method) {
if (window.jQuery) {
method();
} else {
setTimeout(function() { defer(method) }, 50);
}
}
dataLayer = [ {'page_category' : 'Home Page New'} ];
defer(function() {
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${parametr}');
});
</script>
...
</head>
<body>
...
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${parametr}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
</body> */

describe('TM coverage map', () => {

	// Strona dostępna pod poprawnym adresem https://www.t-mobile.pl/c/mapa-zasiegu › status 200
	it('map', () => {
		
		const town = 'Warszawa'
		
		// cy.viewport(1920, 1080)
		cy.visit(Cypress.env('tm_main_cover')).then((contentWindow) => {})
		
		// Na stronie poprawnie załadowała się mapa google
		
		// cy.get('div#map.mb-4')
		
		cy.get('#maps-town-localisation').type(town)
		cy.get('#maps-town-submit').click()
		// cy.get('.gmimap0')
		
		// Po wpisaniu Warszawa  w input wyszukaj lokalizacji na mapie pojawia się kursor (<area log="miw" coords="13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75" shape="poly" title="" style="cursor: pointer; touch-action: none;">)

	})
	
	// Na liście technologi dostępne są pozycje: NB-IoT,2G,3G,LTE 4G,5G
	it('technologies', () => {
		
		cy.get('.content-box--text')
			.should('be.visible')
			.children()
			.should('contain', 'NB-IoT')
			.and('contain', '2G')
			.and('contain', '3G')
			.and('contain', 'LTE 4G')
			.and('contain', '5G')
			
	})
	
})