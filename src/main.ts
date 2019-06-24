import Timer from './timer';
import Display from './display';
import { exec } from 'child_process';
import path from 'path';

export default class Main extends Timer {
  private activeTime: number;
  private breakTime: number;
  private sequence: number;
  private activeMode: boolean;

  constructor(activeTime: number, breakTime: number)
  {
	super(activeTime);

	this.activeTime = activeTime;
	this.breakTime = breakTime;
	this.sequence = 1;
	this.activeMode = true;
  }

  toggleActiveMode = () => {
	// toggle activeMode
	this.activeMode = !this.activeMode;
	// reset time
	this.time.sec = 0;
	this.time.min = 0;
	// set limit time to breakTime or activeTime
	this.time.limit = this.time.limit === this.activeTime ?
	  this.breakTime : this.activeTime;
	// if activeMode changed to then true sequence + 1
	if (this.activeMode) this.sequence++;
	// if current sequence >= 4 then triple the time limit
	if (this.sequence >= 4) this.time.limit *= 3;
	// send notification
	this.notifySend();
  }

  notifySend()
  {
	// notification sound
	var soundPath: any = path.resolve(__dirname); // absolute path
	soundPath = soundPath.split('/');
	//remove the last path
	soundPath = soundPath.slice(1, soundPath.length - 1); 
	soundPath = '/' + soundPath.join('/') + '/sound/notif.ogg';
	// soundPath == /currentDirectory/sound/notif.ogg
	exec('paplay ' + soundPath);

	// // send notification
	exec('notify-send "Pomodoro ' +
		 this.sequence + ', ' +
		 this.time.limit + ' Minutes"');
  }


  start()
  {
	// send notification first
	this.notifySend();

	setInterval(() => {
	  // display time
	  console.clear();
	  Display(this.activeMode, this.sequence, this.time);

	  // if time reach the limit
	  if (this.time.min >= this.time.limit)
		this.toggleActiveMode();

	  // increase time
	  this.addTimer();
	}, 1000);
  }
}
