import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => (
		<h1>{props.course}</h1>
	)

const Part = (props) => (
		<p key={props.part + ' ' + props.id}>
		  {props.part} {props.exercises}
		</p>
	)

const Content = (props) => {

  let contentarrayfunction = () => {
    let contentarray = props.parts.map((part) => (<Part part={part.name} exercises={part.exercises} id={part.id} />))
    return contentarray
  }

	return (<div key={props.keym + ' content'}>
    {contentarrayfunction()}
  </div>)
}

const Total = (props) => {

  const func1 = (s, p) => { 
    return s + p.exercises 
  }

  let total = props.parts.reduce(func1, 0)

  return <><p>Number of exercises {total}</p></>
}

const Course = (props) => (
    <div key={'courseid ' + props.course.id}>  
      <Header course={props.course.name} />
      <Content parts={props.course.parts} keym={'courseid ' + props.course.id}/>
      <Total parts={props.course.parts} />
    </div>
  )

export default Course