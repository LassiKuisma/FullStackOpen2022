
const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}


const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part name={part.name} exercises={part.exercises} key={part.name} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course
