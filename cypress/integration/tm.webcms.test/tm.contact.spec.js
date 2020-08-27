/// <reference types="Cypress" />

/* https://confluence/display/DIGIT/2.+Strona+Kontakt

Sprawdzamy czy strona główna dostępna pod odpowiednim adresem 
https://www.t-mobile.pl/c/kontakt › status code 200
Sprawdzamy czy dostępny jest przycisk 'Rozpocznij chat'
Sprawdzamy czy  nacisnięcie przycisku otwiera okno chat-a i czy chat i
Sprawdzamy czy dostępna jest 'formatka zamów rozmowę'
Sprawdzamy czy w formatce 'zamów rozmowę' mozna zostawić lead
Sprawdz czy widoczna są sekcje
Skontaktuj się z nami przez WhatsApp
Skontaktuj się z nami przez Facebook Messenger
Osadzony kontener gtm z id = ${parametr}

w kodzie strony widoczne są wpisy:

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
</body>*/

describe('TM contact', () => {
	
	//Nr telefonu dla lead'a
	const msisdn = '602602602'
	const container = 'GTM-9Z7P'

		//Sprawdzamy czy strona główna dostępna pod odpowiednim adresem 
		//https://www.t-mobile.pl/c/kontakt › status code 200
	beforeEach(() => {
		
	cy.visit(Cypress.env('tm_main_contact'))
	
	})
	
	//Sprawdzamy czy dostępny jest przycisk 'Rozpocznij chat'
	// Sprawdzamy czy  nacisnięcie przycisku otwiera okno chat-a i czy chat i
	it('chat', () => {

    cy.get('body > div.cookie-bar > div > a').click()
    cy.get('#openChatButton').click('top')
	
	})
	
	// Sprawdzamy czy dostępna jest 'formatka zamów rozmowę'
	it('ask for call', () => {
		
		cy.get('#contact_contactForm')
		
	})
	
	// Sprawdzamy czy w formatce 'zamów rozmowę' mozna zostawić lead
	it('lead', () => {
		
		cy.get('#telefon').click().type(msisdn)
		cy.get('#temat').select('294').should('have.value', '294')
		cy.get('#submit').click()
	})
	
	// Sprawdzamy czy widoczna jest sekcja Skontaktuj się z nami przez WhatsApp
	it('WhatsApp', () => {
	
	cy.get('#contact_social > .container > :nth-child(2) > .col-12')
	cy.contains('Skontaktuj się z nami przez WhatsApp')
			
	})
	
	// Sprawdzamy czy widoczna jest sekcja Skontaktuj się z nami przez Facebook Messenger
	it('Messenger', () => {
	
	cy.get('#contact_social > .container > :nth-child(3) > .col-12')
	cy.contains('Skontaktuj się z nami przez Facebook Messenger')
			
	})
	
	// Osadzony kontener gtm z id = ${parametr}
	it('container', () => {
       
		const txt = '\t   function defer(method) {\n' +
				'\t\t   if (window.jQuery) {\n' +
				'\t\t\t   method();\n' +
				'\t\t   } else {\n' + 
				'\t\t\t   setTimeout(function() { defer(method) }, 50);\n' +
				'\t\t   }\n' +
				'\t   }\n'  +
				'          dataLayer = [ {\'page_category\' : \'Customer_support\'} ];\n' + 
				'\t   defer(function() {\n' 
				'\t\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n' +
				'\t\t\tnew Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n' +				
				'\t\t\tj=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n' +
				'\t\t\t\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n' +
				'\t\t\t})(window,document,\'script\',\'dataLayer\',\'GTM-9Z7P\');\n' +
				'\t   });\n' +
	'\t' 

	cy.get('head > script:nth-child(21)', {timeout:60000}).should('contain', txt)
	
	})

	
	it('GTM-9Z7P set', () => {
		
	const txt = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-9Z7P"\n' + 
	'height="0" width="0" style="display:none;visibility:hidden"></iframe>'
	
	cy.get('body > noscript').first().should('contain', txt)
	
	})
  
})