const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.name} {props.exercises}</p>
  </>
)

const Content = (props) => {
  return (
    <>
      {props.parts
        .map(part => <Part name={part.name} exercises={part.exercises} key={part.name} />)}
    </>
  )
}

const Total = (props) => (
  <>
    <p>Number of exercises {props.total}</p>
  </>
)


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3];
  let total = 0;
  parts.map(part => part.exercises).forEach(t => total += t);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  )
}

export default App;
