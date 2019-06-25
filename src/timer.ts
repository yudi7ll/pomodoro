export default class Timer {
  public time: {
	min: number,
	sec: number,
	limit: number
  }

  constructor(activeTime: number)
  {
	this.time = {
	  min: activeTime,
	  sec: 0,
	  limit: activeTime
	}
  }

  decreaseTime = () => {
	if (this.time.sec > 0)
	  return this.time.sec--;

	this.time.sec = 59;
	this.time.min--;
  }
}
