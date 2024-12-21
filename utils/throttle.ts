/**
 * Throttles a function so that it can only be called once every `limit` ms.
 * Subsequent calls within the time frame are ignored until the timeout expires.
 */
export function throttle<F extends (...args: any[]) => void>(func: F, limit: number): F {
    let inThrottle = false;
    
    return function (this: any, ...args: Parameters<F>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    } as F;
  }
  