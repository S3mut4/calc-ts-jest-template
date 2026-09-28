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

    test.each([
        // Default base cases using helper functions
        { application: createLowRiskApplication(), expected: RiskClass.LOW, scenario: 'small balance (default)' },
        { application: createMediumRiskApplication(), expected: RiskClass.MEDIUM, scenario: 'medium balance (default)' },
        { application: createHighRiskApplication(), expected: RiskClass.HIGH, scenario: 'large balance (default)' },

        // Boundary cases using lightweight mock objects with type casting
        { application: { balance: -100 } as Application, expected: RiskClass.HIGH, scenario: 'negative balance' },
        { application: { balance: 0 } as Application, expected: RiskClass.LOW, scenario: 'zero balance' },
        { application: { balance: 10000 } as Application, expected: RiskClass.LOW, scenario: 'exact boundary 10,000' },
        { application: { balance: 10001 } as Application, expected: RiskClass.MEDIUM, scenario: 'just above 10,000' },
        { application: { balance: 25000 } as Application, expected: RiskClass.MEDIUM, scenario: 'exact boundary 25,000' },
        { application: { balance: 25001 } as Application, expected: RiskClass.HIGH, scenario: 'just above 25,000' },
        { application: { balance: 50000 } as Application, expected: RiskClass.HIGH, scenario: 'large balance (50,000)' },
    ])('returns $expected when testing $scenario', ({ application, expected }) => {
        expect(calculator.calculate(application)).toBe(expected)
    })
})