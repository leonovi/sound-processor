const defer = (fn: () => void) => setTimeout(fn, 0);

export { defer }
