type EventCallback = () => void;

class MyEventEmitter {
    private eventHandlers: { [event: string]: EventCallback[] };

    constructor() {
        this.eventHandlers = {};
    }

    registerHandler(event: string, callback: EventCallback): void {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(callback);
    }

    emitEvent(event: string): void {
        const handlers = this.eventHandlers[event];
        if (handlers) {
            handlers.forEach((callback) => callback());
        }
    }
}

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено