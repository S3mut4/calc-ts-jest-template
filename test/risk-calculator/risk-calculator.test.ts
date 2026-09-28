import { Application } from '../../src/class/application/application'
import { RiskCalculator } from '../../src/class/risk-calculator/risk-calculator'
import { RiskClass } from '../../src/class/risk-calculator/risk-class'
import {
  createHighRiskApplication,
  createLowRiskApplication,
  createMediumRiskApplication,
} from '../helper/application.helpers'

describe('RiskCalculator LOW risk', () => {
  let calculator: RiskCalculator
  let application: Application

  beforeEach(() => {
    calculator = new RiskCalculator()
    application = createLowRiskApplication()
  })

  test('returns LOW for a small balance', () => {
    expect(calculator.calculate(application)).toBe(RiskClass.LOW)
  })

  test('returns LOW when the balance is zero', () => {
    application.balance = 0
    expect(calculator.calculate(application)).toBe(RiskClass.LOW)
  })

  test('returns LOW when the balance is exactly 10000', () => {
    application.balance = 10000
    expect(calculator.calculate(application)).toBe(RiskClass.LOW)
  })
})

describe('RiskCalculator MEDIUM risk', () => {
  let calculator: RiskCalculator
  let application: Application

  beforeEach(() => {
    calculator = new RiskCalculator()
    application = createMediumRiskApplication()
  })

  test('returns MEDIUM for a medium balance', () => {
    expect(calculator.calculate(application)).toBe(RiskClass.MEDIUM)
  })

  test('returns MEDIUM when the balance is just above 10000', () => {
    application.balance = 10001
    expect(calculator.calculate(application)).toBe(RiskClass.MEDIUM)
  })

  test('returns MEDIUM when the balance is exactly 25000', () => {
    application.balance = 25000
    expect(calculator.calculate(application)).toBe(RiskClass.MEDIUM)
  })
})

describe('RiskCalculator HIGH risk', () => {
  let calculator: RiskCalculator
  let application: Application

  beforeEach(() => {
    calculator = new RiskCalculator()
    application = createHighRiskApplication()
  })

  test('returns HIGH for a large balance', () => {
    expect(calculator.calculate(application)).toBe(RiskClass.HIGH)
  })

  test('returns HIGH when the balance is just above 25000', () => {
    application.balance = 25001
    expect(calculator.calculate(application)).toBe(RiskClass.HIGH)
  })

  test('returns HIGH when the balance is exactly 50000', () => {
    application.balance = 50000
    expect(calculator.calculate(application)).toBe(RiskClass.HIGH)
  })

  test('returns HIGH for a negative balance', () => {
    application.balance = -100
    expect(calculator.calculate(application)).toBe(RiskClass.HIGH)
  })
})