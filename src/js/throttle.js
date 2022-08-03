export function throttle(callback, delay) {
    let isThrottled = false;
    let savedThis = null;
    let savedArgs = null;
    return function wrapper(...args) {
        if (isThrottled) {
            savedThis = this;
            savedArgs = args;
            return;
        }

        callback.apply(this, args);
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            wrapper.apply(savedThis, savedArgs);
            savedThis = null;
            savedArgs = null;
        }, delay);
    };
}
