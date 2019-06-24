export default class Timer {
  public time: {
	min: number,
	sec: number,
	limit: number,
	timestamp: () => number
  }

  constructor(activeTime: number)
  {
	this.time = {
	  min: 0,
	  sec: 0,
	  limit: activeTime,
	  timestamp: function(): number {
		return (this.min * 60) + this.sec;
	  }
	}
  }

  addTimer = () => {
	if (this.time.sec <= 60)
	  return this.time.sec++;

	this.time.sec = 0;
	this.time.min++;
  }
}
