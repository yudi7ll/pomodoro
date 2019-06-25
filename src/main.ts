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
	// toggle activeMode
	this.activeMode = !this.activeMode;
	// reset time
	this.time.sec = 0;
	// set min time && limit time to breakTime or activeTime
	this.time.min = this.time.limit = this.activeMode ?
	  this.activeTime : this.breakTime;
	// if activeMode changed to then true session + 1
	if (this.activeMode) this.session++;
	// if current session >= 4 then triple the time limit
	if (this.session >= 4) this.time.min *= 3;
	// send notification
	this.notifySend();
  }

  notifySend()
  {
	// notification sound
	var soundPath: string = [
	  '/',
	  // remove the last path
	  path.resolve(__dirname).split('/').slice(0, -1).join('/'),
	  '/sound/notif.ogg'
	].join('');
	// soundPath == /currentDirectory/sound/notif.ogg
	exec('paplay ' + soundPath);

	// // send notification
	exec('notify-send "Pomodoro ' + this.session + ', ' +
		 this.time.limit + ' Minutes"');
  }


  start()
  {
	// send notification first
	this.notifySend();

	setInterval(() => {

	  // display time
	  console.clear();
	  Display(this.activeMode, this.session, this.time);

	  // if the time reach the limit
	  if (this.time.min <= 0 && this.time.sec <= 0)
		this.toggleActiveMode();

	  // decrease time
	  this.decreaseTime();
	}, 1000);
  }
}
