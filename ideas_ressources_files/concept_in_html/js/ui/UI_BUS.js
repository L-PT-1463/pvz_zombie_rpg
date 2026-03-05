export default class UIBus {
  constructor() {
    this.listeners = new Map(); // eventName -> Set<fn>
  }

  on(eventName, fn) {
    if (typeof fn !== "function") return () => {};
    if (!this.listeners.has(eventName)) this.listeners.set(eventName, new Set());
    this.listeners.get(eventName).add(fn);

    // Return unsubscribe function
    return () => this.off(eventName, fn);
  }

  off(eventName, fn) {
    const set = this.listeners.get(eventName);
    if (!set) return;
    set.delete(fn);
    if (set.size === 0) this.listeners.delete(eventName);
  }

  emit(eventName, payload) {
    const set = this.listeners.get(eventName);
    if (!set) return;
    // Copy to avoid issues if listeners unsubscribe during emit
    [...set].forEach((fn) => {
      try { fn(payload); } catch (e) { console.error(e); }
    });
  }

  clear() {
    this.listeners.clear();
  }
}