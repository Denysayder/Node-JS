var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.eventHandlers = {};
    }
    MyEventEmitter.prototype.registerHandler = function (event, callback) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(callback);
    };
    MyEventEmitter.prototype.emitEvent = function (event) {
        var handlers = this.eventHandlers[event];
        if (handlers) {
            handlers.forEach(function (callback) { return callback(); });
        }
    };
    return MyEventEmitter;
}());
var emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', function () { return console.log('Обліковий запис користувача оновлено'); });
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено
