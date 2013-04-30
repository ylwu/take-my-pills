function message(from, time, message, read) {
	this.from = from; // "patient" or "doctor"
	this.time = time; // javascript datestring, format: "October 13, 1975 11:13:00"
	this.message = message; // the message in string
	this.read = read; // false of unread messages, true of read messages
}