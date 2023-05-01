export class Rules 
{
    private minimum_office_attendance: number
    private minimum_percentage_of_workers_in_the_office: number

    getMOA = () => this.minimum_office_attendance
    getMPW = () => this.minimum_percentage_of_workers_in_the_office

    changeMOA = (new_number: number) => {
        if (0 <= new_number && new_number <= 5) {
            this.minimum_office_attendance = new_number
        } else {
            throw new Error("The minimum office attendence cannot be smaller than 0 or greater than 5.")
        }
    }

    changeMPW = (new_number: number) => {
        if (0 <= new_number && new_number <= 100) {
            this.minimum_percentage_of_workers_in_the_office = new_number
        } else {
            throw new Error("The minimum percentage of workers in the office cannot be smaller than 0 or greater than 100, it must be a valid percentace.")
        }
    }

    satisfies = (rules: Rules) => this.getMOA() >= rules.getMOA() && this.getMPW() >= rules.getMPW()

    constructor(moa: number, mpw: number) {
        this.changeMOA(moa)
        this.changeMPW(mpw)
    }
}