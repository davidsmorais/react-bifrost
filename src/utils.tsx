const get = (obj, path, def) =>
  (() =>
    typeof path === 'string'
      ? path.replace(/\[(\d+)]/g, '.$1')
      : path.join('.'))()
    .split('.')
    .filter(Boolean)
    .every((step) => (obj = obj[step]) !== undefined)
    ? obj
    : def

export { get }
