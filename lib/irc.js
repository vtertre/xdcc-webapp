exports.Client = Client;
var net  = require('net');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var parseMessage = require('./parse_message');

var lineDelimiter = new RegExp('\r\n|\r|\n');

function Client(server, nick, opt) {
  var self = this;
  self.opt = {
    server: server,
    nick: nick,
    userName: 'xdcc-webapp-bot',
    realName: 'xdcc-webapp IRC client',
    port: 6667,
    debug: false,
    autoConnect: true,
    channels: ["#serial_us"]
  };

  if (typeof arguments[2] == 'object') {
    var keys = Object.keys(self.opt);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (arguments[2][k] !== undefined)
        self.opt[k] = arguments[2][k];
    }
  }

  if (self.opt.autoConnect === true) {
    self.connect();
  }

  self.addListener('raw', function (message) {
    var from, to, text;
    switch (message.command) {
      case 'rpl_welcome':
        // Set nick to whatever the server decided it really is
        // (normally this is because you chose something too long and
        // the server has shortened it
        self.nick = message.args[0];
        // Note our hostmask to use it in splitting long messages.
        // We don't send our hostmask when issuing PRIVMSGs or NOTICEs,
        // of course, but rather the servers on the other side will
        // include it in messages and will truncate what we send if
        // the string is too long. Therefore, we need to be considerate
        // neighbors and truncate our messages accordingly.
        var welcomeStringWords = message.args[1].split(/\s+/);
        self.hostMask = welcomeStringWords[welcomeStringWords.length - 1];
        self._updateMaxLineLength();
        self.emit('registered', message);
        break;
      case 'PING':
        self.send('PONG', message.args[0]);
        break;
      case 'rpl_endofmotd':
      case 'err_nomotd':
        self.emit('motd');
        break;
      case 'err_nosuchnick':
        self.emit('no-such-nick', message);
        break;
      case 'PRIVMSG':
        from = message.nick;
        to = message.args[0];
        text = message.args[1] || '';
        if (text[0] === '\u0001' && text.lastIndexOf('\u0001') > 0) {
          self._handleCTCP(from, to, text, 'privmsg', message);
          break;
        }
        self.emit('message', from, to, text, message);

        if (self.opt.debug && to == self.nick)
          util.log('GOT MESSAGE from ' + from + ': ' + text);
        break;
    }
  });

  self.addListener('motd', function() {
    self.opt.channels.forEach(function (channel) {
      self.send.apply(self, ['JOIN'].concat(channel.split(' ')));
    });
  });

  EventEmitter.call(this);
}
util.inherits(Client, EventEmitter);

Client.prototype.conn = null;
Client.prototype.chans = {};

Client.prototype.connect = function(callback) {
  if (typeof (callback) === 'function') {
    this.once('registered', callback);
  }
  var self = this;
  self.chans = {};

  // socket opts
  var connectionOpts = {
    host: self.opt.server,
    port: self.opt.port
  };

  // try to connect to the server
  self.conn = net.createConnection(connectionOpts);
  self.conn.requestedDisconnect = false;
  self.conn.setTimeout(0);
  self.conn.setEncoding('utf8');

  self.conn.addListener('connect', function() {
    self.send('NICK', self.opt.nick);
    self.nick = self.opt.nick;
    self.send('USER', self.opt.userName, 8, '*', self.opt.realName);
    self.emit('connect');
  });

  var buffer = new Buffer('');

  self.conn.addListener('data', function(chunk) {
    if (typeof (chunk) === 'string') {
      buffer += chunk;
    } else {
      buffer = Buffer.concat([buffer, chunk]);
    }

    var lines = buffer.toString().split(lineDelimiter);

    if (lines.pop()) {
      // if buffer is not ended with \r\n, there's more chunks.
      return;
    } else {
      // else, initialize the buffer.
      buffer = new Buffer('');
    }

    lines.forEach(function (line) {
      if (line.length) {
        var message = parseMessage(line);

        try {
          self.emit('raw', message);
        } catch (err) {
          if (!self.conn.requestedDisconnect) {
            throw err;
          }
        }
      }
    });
  });

  self.conn.addListener('end', function() {
    if (self.opt.debug)
      util.log('Connection got "end" event');
  });

  self.conn.addListener('close', function() {
    if (self.opt.debug)
      util.log('Connection got "close" event');
    // TODO *** can setup reconnection ?
  });

  self.conn.addListener('error', function(exception) {
    self.emit('netError', exception);
    if (self.opt.debug) {
      util.log('Network error: ' + exception);
    }
  });
};

Client.prototype.disconnect = function(message, callback) {
  if (typeof (message) === 'function') {
    callback = message;
    message = undefined;
  }
  message = message || 'exiting';
  var self = this;
  if (self.conn.readyState == 'open') {
    self.send('QUIT', message);
  }
  self.conn.requestedDisconnect = true;
  if (typeof (callback) === 'function') {
    self.conn.once('end', callback);
  }
  self.conn.end();
};

Client.prototype.send = function(command) {
  var args = Array.prototype.slice.call(arguments);

  // Note that the command arg is included in the args array as the first element

  if (args[args.length - 1].match(/\s/) || args[args.length - 1].match(/^:/) || args[args.length - 1] === '') {
    args[args.length - 1] = ':' + args[args.length - 1];
  }

  if (this.opt.debug)
    util.log('SEND: ' + args.join(' '));

  if (!this.conn.requestedDisconnect) {
    this.conn.write(args.join(' ') + '\r\n');
  }
};

Client.prototype._splitLongLines = function(words, maxLength, destination) {
  if (words.length < maxLength) {
    destination.push(words);
    return destination;
  }
  var c = words[maxLength - 1];
  var cutPos;
  if (c.match(/\s/)) {
    cutPos = maxLength - 1;
  } else {
    var offset = 1;
    while ((maxLength - offset) > 0) {
      var d = words[maxLength - offset];
      if (d.match(/\s/)) {
        cutPos = maxLength - offset;
        break;
      }
      offset++;
    }
    if (maxLength - offset <= 0) {
      cutPos = maxLength;
    }
  }
  var part = words.substring(0, cutPos);
  destination.push(part);
  return this._splitLongLines(words.substring(cutPos + 1, words.length), maxLength, destination);
};

Client.prototype.say = function(target, text) {
  this._speak('PRIVMSG', target, text);
};

Client.prototype._speak = function(kind, target, text) {
  var self = this;
  var maxLength = this.maxLineLength - target.length;
  if (typeof text !== 'undefined') {
    text.toString().split(/\r?\n/).filter(function(line) {
      return line.length > 0;
    }).forEach(function(line) {
      var linesToSend = self._splitLongLines(line, maxLength, []);
      linesToSend.forEach(function(toSend) {
        self.send(kind, target, toSend);
        if (kind == 'PRIVMSG') {
          self.emit('selfMessage', target, toSend);
        }
      });
    });
  }
};

Client.prototype._handleCTCP = function(from, to, text, type, message) {
  text = text.slice(1);
  text = text.slice(0, text.indexOf('\u0001'));
  var parts = text.split(' ');
  this.emit('ctcp-' + type, from, to, text, message);
};

// blatantly stolen from irssi's splitlong.pl. Thanks, Bjoern Krombholz!
Client.prototype._updateMaxLineLength = function() {
  // 497 = 510 - (":" + "!" + " PRIVMSG " + " :").length;
  // target is determined in _speak() and subtracted there
  this.maxLineLength = 497 - this.nick.length - this.hostMask.length;
};