import { CourseEntity } from "./../app/modules/courses/models/entity/course.entity";

const CourseDates = {
    date: new Date(),
    old() {
        this.date = new Date();
        this.date.setDate(this.date.getDate() - 30);
        return this.date;
    },
    new() {
        this.date = new Date();
        this.date.setDate(this.date.getDate() - 10);
        return this.date;
    },
    upcoming() {
        this.date = new Date();
        this.date.setDate(this.date.getDate() + 20);
        return this.date;
    },
};

export const mockCoursesData = [
    // tslint:disable:max-line-length
    new CourseEntity("1", "Learn how u can use moar cowbell 1", CourseDates.new(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", true),
    new CourseEntity("2", "Learn how u can use moar cowbell 2", CourseDates.new(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("3", "Learn how u can use moar cowbell 1", CourseDates.new(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", true),
    new CourseEntity("4", "Learn how u can use moar cowbell 2", CourseDates.old(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", true),
    new CourseEntity("5", "Learn how u can use moar cowbell 1", CourseDates.old(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("6", "Learn how u can use moar cowbell 2", CourseDates.old(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("7", "Learn how u can use moar cowbell 1", CourseDates.upcoming(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("8", "Learn how u can use moar cowbell 2", CourseDates.upcoming(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("9", "Learn how u can use moar cowbell 1", CourseDates.upcoming(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("10", "Learn how u can use moar cowbell 2", CourseDates.new(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("11", "Learn how u can use moar cowbell 1", CourseDates.new(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("12", "Learn how u can use moar cowbell 2", CourseDates.old(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("13", "Learn how u can use moar cowbell 1", CourseDates.old(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    new CourseEntity("14", "Learn how u can use moar cowbell 2", CourseDates.upcoming(), Math.floor(Math.random() * (180 - 30 + 1)) + 30, "Guess what? You got a fever. And the only prescription is moar cowbell", false),
    // tslint:enable:max-line-length
];
