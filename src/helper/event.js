import EventEmitter from 'events';

class Event extends EventEmitter {
    constructor(){
        super()
    }

    fire(eventName, data) {
        this.emit(eventName, data)
    }
}

export default new Event();
