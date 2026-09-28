import { CreditCard } from '../../src/class/credit-card/credit-card'

describe('CreditCard', () => {
    test('TC-P01: creates a new card with positive limit as ACTIVE with 0 debt', () => {
        const card = new CreditCard(1000)

        expect(card.status).toBe('ACTIVE')
        expect(card.debt).toBe(0)
    })

    test('TC-B01: creates a card with 0 or negative limit as BLOCKED', () => {
        const cardZero = new CreditCard(0)
        const cardNegative = new CreditCard(-100)

        expect(cardZero.status).toBe('BLOCKED')
        expect(cardNegative.status).toBe('BLOCKED')
    })

    test('TC-P02: pays an amount within the limit and increases the debt', () => {
        const card = new CreditCard(1000)

        card.pay(300)

        expect(card.debt).toBe(300)
    })

    test('TC-P03: pays exactly the full limit', () => {
        const card = new CreditCard(1000)

        card.pay(1000)

        expect(card.debt).toBe(1000)
    })

    test('TC-B02: ignores payment that exceeds available limit', () => {
        const card = new CreditCard(1000)

        card.pay(1000)
        card.pay(1)

        expect(card.debt).toBe(1000)
    })

    test('TC-B03: ignores payment with 0 or negative amount', () => {
        const card = new CreditCard(1000)

        card.pay(0)
        card.pay(-100)

        expect(card.debt).toBe(0)
    })

    test('TC-N01: ignores payment on a blocked card', () => {
        const card = new CreditCard(0)

        card.pay(100)

        expect(card.debt).toBe(0)
    })

    test('TC-P04: performs a partial repayment and decreases the debt', () => {
        const card = new CreditCard(1000)
        card.pay(500)

        card.repay(200)

        expect(card.debt).toBe(300)
    })

    test('TC-P05: performs a full repayment and brings debt to 0', () => {
        const card = new CreditCard(1000)
        card.pay(500)

        card.repay(500)

        expect(card.debt).toBe(0)
    })

    test('TC-P06: returns correct available balance before and after payment', () => {
        const card = new CreditCard(1000)

        expect(card.getAvailable()).toBe(1000)

        card.pay(300)

        expect(card.getAvailable()).toBe(700)
    })

    test('TC-P07: blocks the card when block() is called', () => {
        const card = new CreditCard(1000)

        card.block()

        expect(card.status).toBe('BLOCKED')
    })
})