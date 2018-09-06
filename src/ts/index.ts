import { fromEvent, from, Observable, interval } from 'rxjs';
//import { take } from 'rxjs/operators';

// start code 
class Wordbeater
{
	//declare type of item
	words:any[]
	currentWord:any
	time:number
	isPlaying:boolean
	score:number
	wordInputDom:HTMLInputElement
	wordDom: HTMLElement
	timeLeftDom: HTMLElement
	messageDom: HTMLElement
	scoreDom: HTMLElement
	constructor(word:any[])
	{
		this.wordInputDom = <HTMLInputElement>document.querySelector('#wordInput');
		this.wordDom = <HTMLElement>document.querySelector('#word');
		this.timeLeftDom = <HTMLElement>document.querySelector('#timeLeft');
		this.messageDom = <HTMLElement>document.querySelector('.message');
		this.scoreDom = <HTMLElement>document.querySelector('#score');
		this.words = word;
		this.time = 6;
		this.isPlaying = true;
		this.score = 0;
	}
	// the run method
	init():void
	{
		this.wordPrint();
		fromEvent(this.wordInputDom, 'input')
		.subscribe((e: any) => {
			this.startMatch(e.target.value);
		})
		interval(1000)
		.subscribe((x: number) => {
			this.countDown()
		});
		interval(50)
		.subscribe((x: number) => {
			this.checkStatus()
		});
	}
	//print new word and score to screen
	wordPrint():void
	{
		this.currentWord = this.words[Math.floor(Math.random() * this.words.length)]
		this.wordDom.textContent = this.currentWord;
		this.scoreDom.textContent = `${this.score}`;
	}
	// count down method
	countDown():void
	{
		if(this.time > 0)
		{
			this.time--;
			this.timeLeftPrint();
		} else if (this.time === 0) {
			this.isPlaying = false
		}
	}
	// print time to screen
	timeLeftPrint():void
	{
		this.timeLeftDom.textContent = `${this.time}`;
		this.timeLeftDom.classList.add('big');
		setTimeout(() => {
			requestAnimationFrame(() => {
				this.timeLeftDom.classList.remove('big');
			})
		}, 300)
	}
	//check method
	checkStatus():void
	{
		if(!this.isPlaying && this.time === 0)
		{
			this.messageDom.textContent = 'Game Over!!!'
			this.score = 0;
		}
	}
	// input match
	startMatch(val:any):void
	{
		if(val === this.currentWord)
		{
			this.isPlaying = true;
			this.time = 5;
			this.score = this.score+1;
			this.wordPrint();
			this.wordInputDom.value = '';
			this.messageDom.textContent = 'correct!!!!!!';
		}
	}
}
	
const wordbeater: Wordbeater = new Wordbeater(['ahmed', 'samir', 'mohamed', 'super', 'hero']);
wordbeater.init();