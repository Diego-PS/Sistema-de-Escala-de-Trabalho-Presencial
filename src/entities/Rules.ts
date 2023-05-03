export interface IRules
{
    moa: number // minimum office attendance
    mpw: number // minimum percentage of workers in the office
}

export class Rules
{
    private moa: number
    private mpw: number

    getMOA = () => this.moa
    getMPW = () => this.mpw

    setMOA = (new_number: number) => {
        if (0 <= new_number && new_number <= 5) {
            this.moa = new_number
        } else {
            throw new Error("The minimum office attendence cannot be smaller than 0 or greater than 5.")
        }
    }

    setMPW = (new_number: number) => {
        if (0 <= new_number && new_number <= 100) {
            this.mpw = new_number
        } else {
            throw new Error("The minimum percentage of workers in the office cannot be smaller than 0 or greater than 100, it must be a valid percentace.")
        }
    }

    satisfies = (rules: Rules) => this.getMOA() >= rules.getMOA() && this.getMPW() >= rules.getMPW()

    constructor(moa: number, mpw: number) {
        this.setMOA(moa)
        this.setMPW(mpw)
    }
}