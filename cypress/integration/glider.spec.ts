/// <reference types="cypress" />

describe('glider', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Step').click();
        cy.contains('Step').click();
        cy.contains('Step').click();
        cy.contains('Step').click();
    });

    it('classic glider', () => {
        cy.contains('Classic').click();

        cy.get('#viewport').screenshot('glider - classic look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

    it('ribbon glider', () => {
        cy.contains('Ribbon').click();
        cy.get('#viewport').screenshot('glider - ribbon look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

    it('age glider', () => {
        cy.contains('Age').click();
        cy.get('#viewport').screenshot('glider - aged look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

    it('smooth glider', () => {
        cy.contains('Smooth').click();
        cy.get('#viewport').screenshot('glider - smooth look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

    it('circular glider', () => {
        cy.contains('Circular').click();
        cy.get('#viewport').screenshot('glider - circular look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

    it('molecule glider', () => {
        cy.contains('Molecule').click();
        cy.get('#viewport').screenshot('glider - molecular look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

    it('neighbour glider', () => {
        cy.contains('Neighbours').click();
        cy.get('#viewport')
            .screenshot('glider - neighbours look', { clip: { x: 410, y: 35, width: 150, height: 150 } });
    });

});

