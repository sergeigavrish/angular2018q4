import { Course } from "../interfaces/course.interface";

export class CourseEntity implements Course {
    constructor(
        public id: string,
        public title: string,
        public creationDate: Date,
        public duration: number,
        public description: string,
        public topRated: boolean,
        public image: string
    ) { }

    isCourse(): boolean {
        const id = typeof (this.id) === "string";
        const title = this.title.length && typeof (this.title) === "string";
        const creationDate = this.creationDate && this.creationDate instanceof Date;
        const duration = this.duration > 0 && typeof (this.duration) === "number";
        const description = typeof (this.description) === "string";
        const topRated = typeof (this.topRated) === "boolean";

        return id && title && creationDate && duration && description && topRated;
    }
}
