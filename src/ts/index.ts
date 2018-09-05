import { fromEvent, from } from 'rxjs';

//save dom element in var
const secondsDom: HTMLElement = <HTMLElement>document.querySelector('#seconds');
const wordInputDom: HTMLElement = <HTMLElement>document.querySelector('#wordInput');
const wordDom:HTMLElement = <HTMLElement>document.querySelector('#word');
const timeLeftDom: HTMLElement = <HTMLElement>document.querySelector('#timeLeft');
const scoreDom: HTMLElement = <HTMLElement>document.querySelector('#score');
const messageDom: HTMLElement = <HTMLElement>document.querySelector('.message');
//global var 
let time:number = 5;

// start code 


// function updataTime():void
// {
// 	timeDom.textContent = time - 1;
// 	timeDom.classList.add('big');
// 	setTimeout(function() {
// 		timeDom.classList.remove('big');
// 	}, 300);
// }

// setInterval(updataTime, 1000);
	
