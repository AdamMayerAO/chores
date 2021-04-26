import React from 'react';
//import './Choose.css'

export default function Choose(props){
   
    return(
        <div className = 'chore'>
            <label >
                <h4 className = 'title'>{props.chore.name}</h4>
                <button
                    style={{backgroundColor: props.chosen ? "green" : "whitesmoke"}}
                    type='checkbox'
                    className='choose-chore'
                    onClick={() => props.onClick(props.chore)}
                >
                    {props.chosen ? "Chosen" : "Choose"} this chore
                </button>        
            </label>
        </div>
    )
}