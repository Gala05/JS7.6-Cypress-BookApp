
describe('bookApp test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be login', () => {  
    cy.login('bropet@mail.ru', '123')
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
  })

  it('an empty email field in login', () => { 
    cy.login(null, null)
    cy.contains("Submit").click()
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
    })
  })

  it('an empty password field in login', () => {
    cy.login('email@email.ru', null)
    cy.contains("Submit").click()
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.');
    })
  })
})

describe('bookApp books list test', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('bropet@mail.ru', '123')
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
  })

  it('add a new book and make it a favorite ', () => {      
    cy.addNewBook('Идиот', 'Роман', 'Ф. Достоевский')
    cy.contains('Идиот').should('be.visible')
    cy.contains('Идиот').contains('Add to favorite').click()
    cy.get('h4').click()
    cy.contains('Идиот').should('be.visible')
  })

  it('add new favorite book', () => {      
    cy.addNewBook_favorite('Братья Карамазовы', 'Роман', 'Ф. Достоевский')
    cy.contains('Братья Карамазовы').should('be.visible')
  })

  it('show only favorite books when the button Favorite is pressed', () => {     
    cy.addNewBook_favorite('Бесы', 'Роман', 'Ф. Достоевский')
    cy.contains('Бесы').should('be.visible')
    cy.get('h4').click()
    cy.contains('Бесы').contains('Delete from favorite').should('be.visible')
  })

  it('delete a book from favorites', () => {     
    cy.addNewBook_favorite('Униженные и оскорблённые', 'Роман', 'Ф. Достоевский')
    cy.get('h4').click()
    cy.contains('Униженные и оскорблённые').should('be.visible')
    cy.contains('Униженные и оскорблённые').contains('Delete from favorite').click()
    cy.contains('Униженные и оскорблённые').should('not.exist')
    cy.contains('Books list').click()
    cy.contains('Униженные и оскорблённые').should('be.visible')
  })
})