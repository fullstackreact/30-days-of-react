module.exports = {
  "get to login page": browser => {
    browser
      // Load the page at the launch URL
      .url(browser.launchUrl)
      // wait for page to load
      .waitForElementVisible(".navbar", 1000)
      // click on the login link
      .click('a[href="/login"]');

    browser.assert.urlContains("login");
  },
  "logging in": browser => {
    browser
      // set the input email to a valid username / password
      .setValue("input[type=text]", "admin")
      .setValue("input[type=password]", "secret")
      // submit the form
      .click("input[type=submit]")
      // wait for the page to load
      .waitForElementVisible(".navbar", 1000)
      // Get the text of the h1 tag
      .getText(".home h1", function(comp) {
        this.assert.equal(comp.value, "Welcome home!");
      });

    browser.assert.urlContains(browser.launchUrl);
  },
  "logging out": browser => {
    browser
      // Find and click on the logout link
      .click(".logout")
      // We'll wait for the next content to load
      .waitForElementVisible("h1", 1000)
      // Get the text of the h1 tag
      .getText("h1", function(res) {
        this.assert.equal(res.value, "You need to know the secret");
      })
      // Make sure the Login button shows now
      .waitForElementVisible('a[href="/login"]', 1000);
  },
  close: browser => browser.end()
};
