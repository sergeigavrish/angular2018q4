import { Course } from "../interfaces/course.interface";

export class CourseEntity implements Course {
    constructor(
        public id: string,
        public title: string,
        public creationDate: Date,
        public duration: number,
        public description: string,
        public image: string,
        public topRated: boolean = false
    ) { }

    isCourse(): boolean {
        const id = typeof (this.id) === "string";
        const title = this.title.length && typeof (this.title) === "string";
        const creationDate = this.creationDate && this.creationDate instanceof Date && !isNaN(this.creationDate as any);
        const duration = this.duration > 0 && typeof (this.duration) === "number";
        const description = typeof (this.description) === "string";
        const topRated = typeof (this.topRated) === "boolean";

        return id && title && creationDate && duration && description && topRated;
    }
}
