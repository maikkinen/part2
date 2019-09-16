import React from 'react';
import ReactDOM from 'react-dom';
import Course from './course';

const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

    // Hype hype söpöö olla täällä Sindren kaa 12.9.19 kello 13 tai jotain <3
    
    return (
        <div>
            <h1>Web app development curriculum</h1>
            {
                courses.map(oneCourse => 
                     <Course key={oneCourse.name} course={oneCourse} />
                )
            }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();