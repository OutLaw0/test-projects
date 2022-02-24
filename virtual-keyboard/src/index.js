import './style/main.scss';

const userStock ={

    lang: 'JS',
    frame: "Angular"
}


const user = {
name: 'Vatal',
age: '35',
...userStock
}

console.log(user)