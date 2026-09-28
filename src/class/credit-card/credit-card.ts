export class CreditCard {
    public debt: number = 0
    public status: 'ACTIVE' | 'BLOCKED'

    constructor(public limit: number) {
        this.status = limit <= 0 ? 'BLOCKED' : 'ACTIVE'
    }

    pay(amount: number): void {
        if (this.status === 'BLOCKED') {
            return
        }

        if (amount <= 0) {
            return
        }

        if (this.debt + amount > this.limit) {
            return
        }

        this.debt += amount
    }

    repay(amount: number): void {
        if (amount <= 0) {
            return
        }

        if (amount > this.debt) {
            return
        }

        this.debt -= amount
    }

    getAvailable(): number {
        return this.limit - this.debt
    }

    block(): void {
        this.status = 'BLOCKED'
    }
}