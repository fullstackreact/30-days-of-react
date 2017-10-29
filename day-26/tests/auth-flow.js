module.exports = {
  'get to login page': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.navbar', 1000)
      .click('a[href="/login"]')

    browser.assert.urlContains('login');
  },
  'logging in': (browser) => {
    browser
      .setValue('input[type=text]', 'admin')
      .setValue('input[type=password]', 'secret')
      .click('input[type=submit]')
      .waitForElementVisible('.navbar', 1000)
      .click('.login')
      .getText('.navbar .logout', function(comp) {
        this.assert.equal(comp.value, 'Logout')
      })

    browser.assert.urlContains(browser.launchUrl)
  },
  'logging out': (browser) => {
    browser
      // Find and click on the logout link
      .click('.logout')
      // Wait for the content to load
      // .waitForElementVisible('.content button', 1000)
      // Click on the button to logout
      // .click('div.logout')
      // We'll wait for the next content to load
      .waitForElementVisible('h1', 1000)
      // Get the text of the h1 tag
      .getText('h1', function(res) {
        this.assert.equal(res.value, 'Login')
      })
      // Make sure the Login button shows now
      .waitForElementVisible('a[href="/login"]', 1000);
  },
  'close': (browser) => browser.end()
}