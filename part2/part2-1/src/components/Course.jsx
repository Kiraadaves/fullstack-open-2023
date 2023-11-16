



const Total = ({ course }) => {
  const initialValue = 0;
  const total = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  );
  return (
    <div>
      <h3>total of {total} exercises</h3>
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ parts }) => {
  return (
    <p>
      {parts.name} {parts.exercises}
    </p>
  );
};


const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((parts) => (
        <Part key={parts.id} parts={parts} />
      ))}
    </div>
  );
};


const Course = ({ courses }) => {
    console.log(courses);
    return (
      <div>
        {Object.keys(courses).map((key) => (
            <div key={courses[key].id}>
            <Header course={courses[key]} />
            <Content course={courses[key]} />
            <Total course={courses[key]} />
          </div>
        ))}
      </div>
    );
};

export default Course;