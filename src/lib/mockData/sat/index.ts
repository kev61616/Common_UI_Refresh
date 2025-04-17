import mathCourse from './mathCourse';
import readingWritingCourse from './readingWritingCourse';

// Bundle of all SAT courses
const satCourses = [
  mathCourse,
  readingWritingCourse
];

export {
  mathCourse,
  readingWritingCourse,
  satCourses as default
};
