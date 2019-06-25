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
	  min: activeTime,
	  sec: 0,
	  limit: activeTime,
	  timestamp: function(): number {
		return (this.min * 60) + this.sec;
	  }
	}
  }

  decreaseTime = () => {
	if (this.time.sec > 0)
	  return this.time.sec--;

	this.time.sec = 59;
	this.time.min--;
  }
}
