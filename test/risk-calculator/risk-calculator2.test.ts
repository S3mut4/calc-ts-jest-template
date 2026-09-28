import { Application } from '../../src/class/application/application'
import { RiskCalculator } from '../../src/class/risk-calculator/risk-calculator'
import { RiskClass } from '../../src/class/risk-calculator/risk-class'
import {
    createHighRiskApplication,
    createLowRiskApplication,
    createMediumRiskApplication,
} from '../helper/application.helpers'

describe('RiskCalculator', () => {
    const calculator = new RiskCalculator()
    let application: Application

    // 1. Suite for LOW risk (balances <= 10,000)
    describe('LOW risk', () => {
        beforeEach(() => {
            application = createLowRiskApplication()
        })

        test.each([
            { balance: undefined, scenario: 'small balance (default)' },
            { balance: 0, scenario: 'zero balance' },
            { balance: 10000, scenario: 'exact boundary 10,000' },
        ])('returns LOW when balance is $balance ($scenario)', ({ balance }) => {
            if (balance !== undefined) {
                application.balance = balance
            }
            expect(calculator.calculate(application)).toBe(RiskClass.LOW)
        })
    })

    // 2. Suite for MEDIUM risk (balances > 10,000 and <= 25,000)
    describe('MEDIUM risk', () => {
        beforeEach(() => {
            application = createMediumRiskApplication()
        })

        test.each([
            { balance: undefined, scenario: 'medium balance (default)' },
            { balance: 10001, scenario: 'just above 10,000' },
            { balance: 25000, scenario: 'exact boundary 25,000' },
        ])('returns MEDIUM when balance is $balance ($scenario)', ({ balance }) => {
            if (balance !== undefined) {
                application.balance = balance
            }
            expect(calculator.calculate(application)).toBe(RiskClass.MEDIUM)
        })
    })

    // 3. Suite for HIGH risk (balances < 0 or > 25,000)
    describe('HIGH risk', () => {
        beforeEach(() => {
            application = createHighRiskApplication()
        })

        test.each([
            { balance: undefined, scenario: 'large balance (default)' },
            { balance: 25001, scenario: 'just above 25,000' },
            { balance: 50000, scenario: 'large balance (50,000)' },
            { balance: -100, scenario: 'negative balance' },
        ])('returns HIGH when balance is $balance ($scenario)', ({ balance }) => {
            if (balance !== undefined) {
                application.balance = balance
            }
            expect(calculator.calculate(application)).toBe(RiskClass.HIGH)
        })
    })
})