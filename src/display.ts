import cli from 'clui';
import clc from 'cli-color';

const line = cli.Line;
const lineBuffer = cli.LineBuffer;
const progress = cli.Progress;

const thisProgressBar = new progress(20);

export default (activeMode: boolean,
				sequence: number,
				time: {
				  min: number,
				  sec: number,
				  limit: number,
				  timestamp: () => number
				}) => {

  const outputBuffer = new lineBuffer({
	x: 0,
	y: 0,
	width: 'console',
	height: 'console'
  });

  // header
  new line(outputBuffer)
	.column(activeMode ?
			'Pomodoro ' + sequence :
			'Coffee Time ' + sequence,
			20, [activeMode ? clc.red : clc.green])
	.fill()
	.store();

  // endl
  new line(outputBuffer)
	.fill()
	.store();

  // status
  new line(outputBuffer)
	.column('Status', 10)
	.column(activeMode ? 'Active' : 'Break',
			20, [activeMode ? clc.red : clc.green])
	.fill()
	.store();

  // timer
  new line(outputBuffer)
	.column('Time', 10)
	.column(`${time.min < 10 ? '0' + time.min : time.min}` + '.' + 
			`${time.sec < 10 ? '0' + time.sec : time.sec}`, 20, [clc.bold])
	.fill()
	.store();

  // progress bar
  new line(outputBuffer)
	.column('Progress', 10)
	.column(thisProgressBar.update((time.limit * 60) - time.timestamp(), (time.limit * 60)), 100)
	.fill()
	.store();

  outputBuffer.output();
}
