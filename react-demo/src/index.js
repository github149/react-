import React from 'react';
import ReactDOM from 'react-dom';

const jsx = (<div>
    <span>我是span</span>
</div>)

console.log('React', React)
console.log('Jsx', jsx)
console.log('ReactDOM--------------', ReactDOM)
const root = document.querySelector('#root')
ReactDOM.createRoot(root).render(jsx)