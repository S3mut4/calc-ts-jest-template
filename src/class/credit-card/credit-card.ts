export class CreditCard {
    public debt: number = 0
    public status: 'ACTIVE' | 'BLOCKED'

    constructor(public limit: number) {
        this.status = limit <= 0 ? 'BLOCKED' : 'ACTIVE'
    }

    pay(amount: number): void {
        if (this.status === 'BLOCKED' || amount <= 0 || this.debt + amount > this.limit) {
            return
        }

        this.debt += amount
    }

    repay(amount: number): void {
        if (amount <= 0 || amount > this.debt) {
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