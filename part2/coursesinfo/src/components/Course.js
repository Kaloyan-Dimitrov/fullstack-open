const Header = ({ name }) => (
  <h1>
    {name}
  </h1>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0)
  console.log(total)
  return (
    <b>total of {total} exercises</b>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
  </div>
)

export default Course