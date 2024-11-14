export type EventListener<T = any> = (data: T) => void;

export class EventEmitter {
  private static instance: EventEmitter;
  private events: Map<string, EventListener[]> = new Map();

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }

  public on<T = any>(event: string, listener: EventListener<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    
    const listeners = this.events.get(event)!;
    listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  public once<T = any>(event: string, listener: EventListener<T>): () => void {
    const unsubscribe = this.on(event, (data: T) => {
      unsubscribe();
      listener(data);
    });
    
    return unsubscribe;
  }

  public emit<T = any>(event: string, data?: T): void {
    const listeners = this.events.get(event);
    if (!listeners) return;

    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error(`Error in event listener for "${event}":`, error);
      }
    });
  }

  public off(event: string, listener?: EventListener): void {
    if (!listener) {
      this.events.delete(event);
      return;
    }

    const listeners = this.events.get(event);
    if (!listeners) return;

    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  public removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  public listenerCount(event: string): number {
    const listeners = this.events.get(event);
    return listeners ? listeners.length : 0;
  }

  public eventNames(): string[] {
    return Array.from(this.events.keys());
  }
}

export default EventEmitter;
