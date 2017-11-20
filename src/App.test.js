import React from 'react';
//import ReactDOM from 'react-dom';
import {shallow,render} from 'enzyme';
import 'jest-enzyme';
import App from './App.js'

//import xx from './xx';
//it('test name',()=>{
//   expect(xx(arg...)).toEqual(expected answer);
//     expect ....
// })
//testing components
/*
it('renders without crashing',() =>{
    const div = document.createElement('div');
    ReactDOM.render(<App />,div)
});
*/

it('renders without crashing',()=>{
    shallow(<App />);
});
it('todo should have nothing at first',()=>{
    let app=render(<App />);
    expect(app.find('.todos').length).toEqual(0);
});