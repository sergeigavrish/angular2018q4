import { Course } from "../interfaces/course.interface";

export class CourseEntity implements Course {
    constructor(
        public id: string,
        public name: string,
        public date: Date,
        public length: number,
        public description: string,
        public image: string,
        public topRated: boolean = false
    ) { }

    isCourse(): boolean {
        const id = typeof (this.id) === "string";
        const title = this.name.length && typeof (this.name) === "string";
        const date = this.date && this.date instanceof Date && !isNaN(this.date as any);
        const length = this.length > 0 && typeof (this.length) === "number";
        const description = typeof (this.description) === "string";
        const topRated = typeof (this.topRated) === "boolean";

        return id && title && date && length && description && topRated;
    }
}
