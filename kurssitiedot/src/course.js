import React from 'react';

const Header = ( {courseName} ) => {
    return (
        <div>
            <h2>{courseName}</h2>
        </div>
    )
}

const Content = ( {courseParts} ) => {
    //const { course } = props
    //const header = course.name
    //const content = course.parts

    const rows = () => {
        return (
            courseParts.map(part => <li style={{color:"#8B008B", listStyleType:"none"}} key= {part.id}>{part.name} {part.exercises}</li>)
        )
    }

    return (
        <div>
            <ul style={{padding:"0px", margin:"0px"}}>
                {rows()}
            </ul>
        </div>
    )
}

const Total = ( {courseParts} ) => {
    // {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    const exerciseData = courseParts.map(part => part.exercises)
    const reducer = (acc, current) => acc + current
    console.log(exerciseData)

    return (
        <div>
            <strong style={{color: "#8B008B", marginTop:"2px"}}>
                Number of exercises {exerciseData.reduce(reducer)}
            </strong>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content courseParts={course.parts}/>
            <Total courseParts={course.parts}/>
        </div>
    )
}

export default Course