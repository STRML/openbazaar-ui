module.exports = [
	'$timeout',
	function ($timeout) {
		var status = {
			running: false,
			tasks: [],
			text: ''
		};

		function humanList() {
			return status.tasks.length > 1 ? 
				status.tasks.slice(0,-1).join(',') + ' and '  + status.tasks.slice(-1) :
				status.tasks[0];
		}

		this.start = function (task) {
			status.tasks.push(task);
			status.text = humanList();
			status.running = true;
		};

		this.end = function (task) {
			status.tasks.splice(status.tasks.indexOf(task), 1);
			status.text = humanList();
			if (!tasks.length) {
				status.running = false;
			}
		};

		this.endAll = function () {
			status.tasks = [];
			status.text = '';
			status.running = false;
		};

		this.get = function () {
			return status;
		};
	}
];