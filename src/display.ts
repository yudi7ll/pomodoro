import cli from 'clui';
import clc from 'cli-color';

const line = cli.Line;
const lineBuffer = cli.LineBuffer;
const progress = cli.Progress;

const thisProgressBar = new progress(20);

export default (activeMode: boolean,
				session: number,
				time: {
				  min: number,
				  sec: number,
				  limit: number
				}) => {

  const outputBuffer = new lineBuffer({
	x: 0,
	y: 0,
	width: 'console',
	height: 'console'
  });

  const limitTimestamp = time.limit * 60;

  const currentTimestamp = (): number => {
	return limitTimestamp - ((time.min * 60) + time.sec);
  }

  const displayTime = (): string => {
	return [
	  [time.min < 10 ? '0' + time.min : time.min],
	  [time.sec < 10 ? '0' + time.sec : time.sec]
	].join('.');
  }

  // header
  new line(outputBuffer)
	.column(activeMode ?
			'Pomodoro ' + session :
			'Coffee Time ' + session,
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
	.column(displayTime(), 20, [clc.bold])
	.fill()
	.store();

  // progress bar
  new line(outputBuffer)
	.column('Progress', 10)
	.column(thisProgressBar.update(currentTimestamp(), limitTimestamp), 100)
	.fill()
	.store();

  outputBuffer.output();
}
