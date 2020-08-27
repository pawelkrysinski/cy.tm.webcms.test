/// <reference types="Cypress" />
//Przed uruchomieniem zainstalować plugin https://github.com/Bkucera/cypress-plugin-tab

/* https://confluence/pages/viewpage.action?pageId=99352143

 Sprawdzamy czy strona główna dostępna pod odpowiednim adresem 
 https://www.t-mobile.pl/ › status code 200
 Sprawdzamy czy na stronie widoczny jest cookie bar
 W kodzie strony element: <div class="cookie-bar">...</div>
 Poprawnie załadowane pliki ze stylami
 styles-cookie-bar-tablet.css
 styles-cookie-bar-desktop.css
 styles-cookie-bar.css
 Po załadowaniu strony widoczne menu i footer
 Dostępny kafelek 'kontakt'
 Link dowiedz się więcej kieruje na stronę kontakt › <a href="https://www.t-mobile.pl/c/kontakt?rel=menukontakt" class="text-block__button button button--regular">Dowiedz się więcej</a>
 Osadzony kontener gtm z id = GTM-9Z7P
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
 })(window,document,'script','dataLayer','GTM-9Z7P');
 });
 </script>
 ...
 </head>
 <body>
 ...
 <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-9Z7P"
 height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
 </body>
*/

Cypress.Commands.add('waitForResource', (name, options = {}) => {
  cy.log(`Waiting for resource ${name}`)



  const log = false // let's not log inner commands
  const timeout = options.timeout || Cypress.config('defaultCommandTimeout')



  cy.window({ log }).then(
    // note that ".then" method has options first, callback second
    // https://on.cypress.io/then
    { log, timeout },
    (win) => {
      return new Cypress.Promise((resolve, reject) => {
        let foundResource



        // control how long we should try finding the resource
        // and if it is still not found. An explicit "reject"
        // allows us to show nice informative message
        setTimeout(() => {
          if (foundResource) {
            // nothing needs to be done, successfully found the resource
            return
          }



          clearInterval(interval)
          reject(new Error(`Timed out waiting for resource ${name}`))
        }, timeout)



        const interval = setInterval(() => {
          foundResource = win.performance
          .getEntriesByType('resource')
          .find((item) => item.name.endsWith(name))



          if (!foundResource) {
            // resource not found, will try again
            return
          }



          clearInterval(interval)
          // because cy.log changes the subject, let's resolve the returned promise
          // with log + returned actual result
          resolve(
            cy.log('? success').then(() => {
              // let's resolve with the found performance object
              // to allow tests to inspect it
              return foundResource
            })
          )
        }, 100)
      })
    }
  )
})

describe('TM main page', () => {

	// Sprawdzamy czy strona główna dostępna pod odpowiednim adresem	
	beforeEach(() => {
		
	// cy.visit('https://www.t-mobile.pl')
	cy.visit(Cypress.env('tm_main'))
	
	})

	// Sprawdzamy czy na stronie widoczny jest cookie bar
	// W kodzie strony element: <div class="cookie-bar">...</div>
  it('cookie bar', () => {

    cy.get('body > div.cookie-bar > div > a').click()
    cy.get('body > div.cookie-bar.hide')

  })

	// Poprawnie załadowane pliki ze stylami
	// styles-cookie-bar-tablet.css
	// styles-cookie-bar-desktop.css
	// styles-cookie-bar.css
  it('css loaded', () => {
      
    // cy.viewport(1080,900)
    cy.waitForResource('styles-cookie-bar-tablet.css')
    cy.waitForResource('styles-cookie-bar-desktop.css')
    cy.waitForResource('styles-cookie-bar.css')
    cy.waitForResource('GTM-9Z7P')
 
  })
 
  // Po załadowaniu strony widoczne menu
  it('menu', () => {
    // cy.viewport(1080,900)
    cy.get(':nth-child(4) > .groupLink > span').trigger('.mouseover')
    
  })

	// Po załadowaniu strony widoczne footer  
  it('footer', () => {
    cy.viewport(800,900)
    cy.get('.hamburgerMenu').trigger('.mouseover')
    cy.get('.footer-ntm')
	
  })
 
	// Dostępny kafelek 'kontakt'
  it.only('contact visible', () => {

    cy.viewport(800,900)
    cy.wait(1000);
    cy.get('.hamburgerMenu').click()
    cy.get('#ntmMainMenu > div:nth-child(4) > a').click().tab().wait(500).click({force: true})
    cy.url().should('include', '/c/kontakt') 
  })

	// Link dowiedz się więcej kieruje na stronę kontakt
  it.only('contact available', () => {

    // cy.viewport(1080,900)
    cy.get('body > div.container-fluid.page-home > div:nth-child(16) > div:nth-child(4) > div > section')
    cy.get('body > div.container-fluid.page-home > div:nth-child(16) > div:nth-child(4) > div > section > div > div.text-block.text-block--no-padding.text-block--center > a').click()
    cy.url().should('include', '/c/kontakt?rel=menukontakt') 
  })
 
	// w kodzie strony widoczne są wpisy GTM-9Z7P 
  it('script GTM-9Z7P', () => {

    // cy.viewport(1080,900)
    
	const txt = '\t   function defer(method) {\n' +
				'\t\t   if (window.jQuery) {\n' +
				'\t\t\t   method();\n' +
				'\t\t   } else {\n' + 
				'\t\t\t   setTimeout(function() { defer(method) }, 50);\n' +
				'\t\t   }\n' +
				'\t   }\n'  +
				'          dataLayer = [ {\'page_category\' : \'Home Page New\'} ];\n' + 
				'\t   defer(function() {\n' 
				'\t\t\t(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n' +
				'\t\t\tnew Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n'				
				'\t\t\tj=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n'
				'\t\t\t\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n'
				'\t\t\t})(window,document,\'script\',\'dataLayer\',\'GTM-9Z7P\');\n'
				'\t   });\n'
	'\t' 

	cy.get('head > script:nth-child(23)', {timeout:60000}).should('contain', txt)
	
  })

  // Osadzony kontener gtm z id = GTM-9Z7P
  it('GTM-9Z7P set', () => {
    // cy.viewport(1080,900)
    // cy.visit(Cypress.env('tm_main'))
	const txt = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-9Z7P"\n' + 
	'height="0" width="0" style="display:none;visibility:hidden"></iframe>'
	
	cy.get('body > noscript').first().should('contain', txt)
	
  })
  
})