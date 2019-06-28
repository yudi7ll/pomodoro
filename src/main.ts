import Timer from './timer';
import Display from './display';
import { exec } from 'child_process';
import path from 'path';

export default class Main extends Timer {
  private activeTime: number;
  private breakTime: number;
  private session: number;
  private activeMode: boolean;

  constructor(activeTime: number, breakTime: number)
  {
	super(activeTime);

	this.activeTime = activeTime;
	this.breakTime = breakTime;
	this.session = 1;
	this.activeMode = true;
  }

  toggleActiveMode = () => {
	this.activeMode = !this.activeMode;

	this.time.sec = 0;

	// set min time & limit time to breakTime or activeTime
	this.time.min = this.time.limit = this.activeMode
	  ? this.activeTime
	  : this.breakTime;

	// if activeMode changed to true then session + 1
	if (this.activeMode)
	  this.session++;

	// reset session
	if (this.session > 4 && this.activeMode)
	  this.session = 1;

	// if not activeMode && current session >= 4
	// then triple the time min
	if (!this.activeMode && this.session >= 4)
	  this.time.min = this.time.limit *= 3;

	// send notification
	this.notifySend();
  }

  notifySend = () => {
	// notification sound
	let soundPath: string = [
	  '/',
	  path.resolve(__dirname).split('/').slice(0, -1).join('/'),
	  '/sound/notif.ogg'
	].join('');

	// soundPath == /{currentDirectory}/sound/notif.ogg
	exec('paplay ' + soundPath);

	// send notification
	let status = this.activeMode ? "Pomodoro " : "Break ";
	exec(`notify-send "${status} ${this.session}, ${this.time.limit} Minutes"`);
  }


  start = () => {
	// send notification first
	this.notifySend();

	setInterval(() => {
	  console.clear();
	  Display(this.activeMode, this.session, this.time);

	  if (this.time.min <= 0 && this.time.sec <= 0)
		this.toggleActiveMode();

	  this.decreaseTime();
	}, 1000);
  }
}
