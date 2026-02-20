describe("Countries Explorer", () => {
  beforeEach(() => {
    cy.visit("/")
  });

  it("loads the home page and shows some countries", () => {
    cy.contains("Countries Explorer");
    cy.get("article").should("have.length.at.least", 10)
  });

  it("can search for a country", () => {
    cy.get("input").type("Sweden")
    cy.contains("Search").click()
    cy.contains("Sweden")
    cy.contains("Showing");
  });

  it("can navigate to the About page", () => {
    cy.get('a[href="/about"]').click()
    cy.url().should("include", "/about")
    cy.contains("About")
  });

  it("can go back home from About", () => {
    cy.get('a[href="/about"]').click()
    cy.get('a[href="/"]').click()
    cy.url().should("include", "/")
    cy.contains("Countries Explorer")
  });
});