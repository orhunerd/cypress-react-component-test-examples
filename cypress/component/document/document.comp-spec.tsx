/// <reference types="cypress" />
import React from 'react'
import { mount } from '@cypress/react'

// example from https://github.com/bahmutov/cypress-react-unit-test/issues/52
const DocumentTest = ({ reportHeight }) => (
  <div>
    <button
      onClick={() =>
        reportHeight(document.documentElement.clientHeight, document.body.clientHeight)
      }
    >
      Report height
    </button>
  </div>
)

describe('DocumentTest', () => {
  it('has valid dimensions', () => {
    const reportStub = cy.stub().as('report')

    mount(<DocumentTest reportHeight={reportStub} />)
    cy.get('button').click()
    cy.get('@report')
      .should('have.been.called')
      .its('firstCall.args')
      .then(([docElementHeight, docBodyHeight]) => {
        expect(docElementHeight).to.be.gt(0).and.equal(Cypress.config('viewportHeight'))

        // contains a single DIV, so probably more than 10px
        expect(docBodyHeight).to.be.gt(10)
      })
  })
})
