const Lesson = require('./Lesson');
const Student = require('./Student');
const Teacher = require('./Teacher');
const LessonStudent = require('./LessonStudent');
const LessonTeacher = require('./LessonTeacher');

Lesson.belongsToMany(Student, { through: LessonStudent, foreignKey: 'lesson_id', onDelete: 'cascade' });
Student.belongsToMany(Lesson, { through: LessonStudent, foreignKey: 'student_id' });

Lesson.belongsToMany(Teacher, { through: LessonTeacher, foreignKey: 'lesson_id', onDelete: 'cascade' });
Teacher.belongsToMany(Lesson, { through: LessonTeacher, foreignKey: 'teacher_id' });

module.exports = { Lesson, LessonStudent, LessonTeacher, Student, Teacher };
