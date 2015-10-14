var socket = require('socket.io');
var usersPair = new UserPair();

module.exports = socketInit;

function socketInit (server) {
	var io = socket(server);

	io.on('connection', function(socket){

		usersPair.addUser(socket);

	  	socket.on('disconnect', function(){
	    	usersPair.removeUser(socket, true);
	  	});

	  	socket.on('move', function (data) {
	  		usersPair.userMove(socket.id, data);
	  	});
	  	socket.on('end', function (data) {
	  		usersPair.removeUser(socket, false);
	  	});
	  	socket.on('restart', function (data) {
	  		usersPair.addUser(socket);
	  	});
	  	
	});
}



function UserPair () {
	this.list = [];
}

UserPair.prototype.addUser = addUser;
UserPair.prototype.removeUser = removeUser;
UserPair.prototype.emitTurn = emitTurn;
UserPair.prototype.userMove = userMove;
UserPair.prototype.genPairs = genPairs;

function genPairs () {
	var pairs = [];
	for (var i = 0; i < this.list.length; i++) {
		pairs.push([]);
		if (this.list[i].players[0]) {
			pairs[i].push({
				id: this.list[i].players[0].id,
				type: this.list[i].players[0].type
			});
		}
		if (this.list[i].players[1]) {
			pairs[i].push({
				id: this.list[i].players[1].id,
				type: this.list[i].players[1].type
			});
		}
	}
	return pairs;
}

function addUser (socket) {
	var type, i;
	if (this.list.length == 0) {
		this.list.push({
			gameStatus: 'wait',
			players: []
		});
	}

	for (i = 0; i < this.list.length; i++) {
		if (this.list[i].players[1]) {
			this.list.push({
				gameStatus: 'wait',
				players: []
			});
			++i;
		}

		if (this.list[i].players.length) {
			type = this.list[i].players[0].type == 'x' ? 'o' : 'x';
		} else {
			type = 'x';
		}

		this.list[i].players.push({
			id: socket.id,
			type: type,
			socket: socket
		});

		socket.emit('events', {
			typeEvent: 'connected',
			value: type,
			list: this.genPairs()
		});

		if (this.list[i].players[1]) {
			this.emitTurn(i);
		}

		break;
	}
}

function userMove (id, data) {
	var i, player;
	for (i = 0; i < this.list.length; i++) {
		if (this.list[i].players[0].id == id) {
			player = this.list[i].players[1];
			break;
		}
		if (this.list[i].players[1].id == id) {
			player = this.list[i].players[0];
			break;
		}
	}

	player.socket.emit('events', {
		typeEvent: 'moved',
		value: data,
		list: this.genPairs()
	});

	this.emitTurn(i);
}

function emitTurn (pairNumber) {
	var pair = this.list[pairNumber];
	if (!pair.players[1]) return;
	var playerX = pair.players[0].type == 'x' ? pair.players[0] : pair.players[1];
	var playerO = pair.players[1].type == 'o' ? pair.players[1] : pair.players[0];
	
	if (pair.gameStatus == 'wait') {

		playerX.socket.emit('events', {
			typeEvent: 'start',
			value: 'move',
			list: this.genPairs()
		});
		playerO.socket.emit('events', {
			typeEvent: 'start',
			value: 'wait',
			list: this.genPairs()
		});
		pair.gameStatus = 'x';

		return;
	}
	if (pair.gameStatus == 'x') {

		playerO.socket.emit('events', {
			typeEvent: 'move',
			value: 'move',
			list: this.genPairs()
		});
		pair.gameStatus = 'o';

		return;
	}
	if (pair.gameStatus == 'o') {

		playerX.socket.emit('events', {
			typeEvent: 'move',
			value: 'move',
			list: this.genPairs()
		});
		pair.gameStatus = 'x';

		return;
	}
}

function removeUser (socket, report) {
	var i = 0;
	var pair;
	for (i = 0; i < this.list.length; i++) {
		pair = this.list[i];
		if (pair.players[0] && pair.players[0].id == socket.id) {
			pair.players.shift();
			break;
		}
		if (pair.players[1] && pair.players[1].id == socket.id) {
			pair.players.pop();
			break;
		}
		if (!pair.players.length) {
			this.list.splice(i, 1);
		}
	}
	if (pair) {
		pair.gameStatus = 'wait';

		if (pair.players[0] && report) {
			pair.players[0].socket.emit('events', {
				typeEvent: 'disconnect',
				list: this.genPairs()
			});
		}
	}
}