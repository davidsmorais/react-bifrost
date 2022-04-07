function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var react__default = _interopDefault(react);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

var get = function get(obj, path, def) {
  return function () {
    return typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.');
  }().split('.').filter(Boolean).every(function (step) {
    return (obj = obj[step]) !== undefined;
  }) ? obj : def;
};

var Bifrost = /*#__PURE__*/function () {
  function Bifrost(config) {
    this.config = config;
    var locales = config.locales;
    this.locales = Object.keys(locales);
    this.bus = document.createElement('bifrost-bridge');
    this.setLocale(this.locales[0]);
  }

  var _proto = Bifrost.prototype;

  _proto.setLocale = function setLocale(locale) {
    if (this.config.locales[locale]) {
      this.locale = locale;
    } else {
      console.error('❗Bifrost Error❗ Locale not found 👉', locale);
      console.info('⚠️ Available locales 👉', this.locales);
    }
  };

  _proto.openRealm = function openRealm(name, _ref) {
    var state = _ref.state,
        props = _ref.props;
    this.dispatchEvent('bifrost-open', {
      detail: {
        name: name,
        state: state,
        props: props
      }
    });
  };

  _proto.updateRealm = function updateRealm(name, _ref2) {
    var props = _ref2.props;
    this.dispatchEvent('bifrost-update', {
      detail: {
        name: name,
        props: props
      }
    });
  };

  _proto.closeRealm = function closeRealm(name) {
    this.dispatchEvent('bifrost-close', {
      detail: {
        name: name
      }
    });
  };

  _proto.addEventListener = function addEventListener(event, callback) {
    this.bus.addEventListener(event, callback);
  };

  _proto.removeEventListener = function removeEventListener(event, callback) {
    this.bus.removeEventListener(event, callback);
  };

  _proto.dispatchEvent = function dispatchEvent(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.bus.dispatchEvent(_construct(CustomEvent, [event].concat(args)));
  };

  _proto.translate = function translate(key, scene) {
    if (scene) {
      return this.config.locales[this.locale][scene][key];
    } else {
      return get(this.config.locales[this.locale], key, key);
    }
  };

  return Bifrost;
}();

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var jotai = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var SUSPENSE_PROMISE = Symbol();
var isSuspensePromise = function isSuspensePromise(promise) {
  return !!promise[SUSPENSE_PROMISE];
};
var isSuspensePromiseAlreadyCancelled = function isSuspensePromiseAlreadyCancelled(suspensePromise) {
  return !suspensePromise[SUSPENSE_PROMISE].c;
};
var cancelSuspensePromise = function cancelSuspensePromise(suspensePromise) {
  var _suspensePromise$SUSP, _suspensePromise$SUSP2;

  (_suspensePromise$SUSP = (_suspensePromise$SUSP2 = suspensePromise[SUSPENSE_PROMISE]).c) == null ? void 0 : _suspensePromise$SUSP.call(_suspensePromise$SUSP2);
};
var isEqualSuspensePromise = function isEqualSuspensePromise(oldSuspensePromise, newSuspensePromise) {
  var oldOriginalPromise = oldSuspensePromise[SUSPENSE_PROMISE].o;
  var newOriginalPromise = newSuspensePromise[SUSPENSE_PROMISE].o;
  return oldOriginalPromise === newOriginalPromise || oldSuspensePromise === newOriginalPromise || isSuspensePromise(oldOriginalPromise) && isEqualSuspensePromise(oldOriginalPromise, newSuspensePromise);
};
var createSuspensePromise = function createSuspensePromise(promise) {
  var objectToAttach = {
    o: promise,
    c: null
  };
  var suspensePromise = new Promise(function (resolve) {
    objectToAttach.c = function () {
      objectToAttach.c = null;
      resolve();
    };

    promise.then(objectToAttach.c, objectToAttach.c);
  });
  suspensePromise[SUSPENSE_PROMISE] = objectToAttach;
  return suspensePromise;
};

var hasInitialValue = function hasInitialValue(atom) {
  return 'init' in atom;
};

var READ_ATOM = 'r';
var WRITE_ATOM = 'w';
var COMMIT_ATOM = 'c';
var SUBSCRIBE_ATOM = 's';
var RESTORE_ATOMS = 'h';
var DEV_SUBSCRIBE_STATE = 'n';
var DEV_GET_MOUNTED_ATOMS = 'l';
var DEV_GET_ATOM_STATE = 'a';
var DEV_GET_MOUNTED = 'm';
var createStore = function createStore(initialValues) {
  var _ref4;

  var committedAtomStateMap = new WeakMap();
  var mountedMap = new WeakMap();
  var pendingMap = new Map();
  var stateListeners;
  var mountedAtoms;

  if (process.env.NODE_ENV !== "production") {
    stateListeners = new Set();
    mountedAtoms = new Set();
  }

  if (initialValues) {
    for (var _iterator = _createForOfIteratorHelperLoose(initialValues), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          atom = _step$value[0],
          value = _step$value[1];
      var atomState = {
        v: value,
        r: 0,
        d: new Map()
      };

      if (process.env.NODE_ENV !== "production") {
        Object.freeze(atomState);

        if (!hasInitialValue(atom)) {
          console.warn('Found initial value for derived atom which can cause unexpected behavior', atom);
        }
      }

      committedAtomStateMap.set(atom, atomState);
    }
  }

  var suspensePromiseCacheMap = new WeakMap();

  var addSuspensePromiseToCache = function addSuspensePromiseToCache(version, atom, suspensePromise) {
    var cache = suspensePromiseCacheMap.get(atom);

    if (!cache) {
      cache = new Map();
      suspensePromiseCacheMap.set(atom, cache);
    }

    suspensePromise.then(function () {
      if (cache.get(version) === suspensePromise) {
        cache.delete(version);

        if (!cache.size) {
          suspensePromiseCacheMap.delete(atom);
        }
      }
    });
    cache.set(version, suspensePromise);
  };

  var cancelAllSuspensePromiseInCache = function cancelAllSuspensePromiseInCache(atom) {
    var versionSet = new Set();
    var cache = suspensePromiseCacheMap.get(atom);

    if (cache) {
      suspensePromiseCacheMap.delete(atom);
      cache.forEach(function (suspensePromise, version) {
        cancelSuspensePromise(suspensePromise);
        versionSet.add(version);
      });
    }

    return versionSet;
  };

  var versionedAtomStateMapMap = new WeakMap();

  var getVersionedAtomStateMap = function getVersionedAtomStateMap(version) {
    var versionedAtomStateMap = versionedAtomStateMapMap.get(version);

    if (!versionedAtomStateMap) {
      versionedAtomStateMap = new Map();
      versionedAtomStateMapMap.set(version, versionedAtomStateMap);
    }

    return versionedAtomStateMap;
  };

  var getAtomState = function getAtomState(version, atom) {
    if (version) {
      var versionedAtomStateMap = getVersionedAtomStateMap(version);

      var _atomState = versionedAtomStateMap.get(atom);

      if (!_atomState) {
        _atomState = getAtomState(version.p, atom);

        if (_atomState) {
          if ('p' in _atomState) {
            _atomState.p.then(function () {
              return versionedAtomStateMap.delete(atom);
            });
          }

          versionedAtomStateMap.set(atom, _atomState);
        }
      }

      return _atomState;
    }

    return committedAtomStateMap.get(atom);
  };

  var setAtomState = function setAtomState(version, atom, atomState) {
    if (process.env.NODE_ENV !== "production") {
      Object.freeze(atomState);
    }

    if (version) {
      var versionedAtomStateMap = getVersionedAtomStateMap(version);
      versionedAtomStateMap.set(atom, atomState);
    } else {
      var prevAtomState = committedAtomStateMap.get(atom);
      committedAtomStateMap.set(atom, atomState);

      if (!pendingMap.has(atom)) {
        pendingMap.set(atom, prevAtomState);
      }
    }
  };

  var createReadDependencies = function createReadDependencies(version, prevReadDependencies, dependencies) {
    if (prevReadDependencies === void 0) {
      prevReadDependencies = new Map();
    }

    if (!dependencies) {
      return prevReadDependencies;
    }

    var readDependencies = new Map();
    var changed = false;
    dependencies.forEach(function (atom) {
      var _getAtomState;

      var revision = ((_getAtomState = getAtomState(version, atom)) == null ? void 0 : _getAtomState.r) || 0;
      readDependencies.set(atom, revision);

      if (prevReadDependencies.get(atom) !== revision) {
        changed = true;
      }
    });

    if (prevReadDependencies.size === readDependencies.size && !changed) {
      return prevReadDependencies;
    }

    return readDependencies;
  };

  var setAtomValue = function setAtomValue(version, atom, value, dependencies, suspensePromise) {
    var atomState = getAtomState(version, atom);

    if (atomState) {
      if (suspensePromise && (!('p' in atomState) || !isEqualSuspensePromise(atomState.p, suspensePromise))) {
        return atomState;
      }

      if ('p' in atomState) {
        cancelSuspensePromise(atomState.p);
      }
    }

    var nextAtomState = {
      v: value,
      r: (atomState == null ? void 0 : atomState.r) || 0,
      d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
    };

    if (!atomState || !('v' in atomState) || !Object.is(atomState.v, value)) {
      ++nextAtomState.r;

      if (nextAtomState.d.has(atom)) {
        nextAtomState.d = new Map(nextAtomState.d).set(atom, nextAtomState.r);
      }
    } else if (nextAtomState.d !== atomState.d && (nextAtomState.d.size !== atomState.d.size || !Array.from(nextAtomState.d.keys()).every(function (a) {
      return atomState.d.has(a);
    }))) {
      Promise.resolve().then(function () {
        flushPending(version);
      });
    }

    setAtomState(version, atom, nextAtomState);
    return nextAtomState;
  };

  var setAtomReadError = function setAtomReadError(version, atom, error, dependencies, suspensePromise) {
    var atomState = getAtomState(version, atom);

    if (atomState) {
      if (suspensePromise && (!('p' in atomState) || !isEqualSuspensePromise(atomState.p, suspensePromise))) {
        return atomState;
      }

      if ('p' in atomState) {
        cancelSuspensePromise(atomState.p);
      }
    }

    var nextAtomState = {
      e: error,
      r: (atomState == null ? void 0 : atomState.r) || 0,
      d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
    };
    setAtomState(version, atom, nextAtomState);
    return nextAtomState;
  };

  var setAtomSuspensePromise = function setAtomSuspensePromise(version, atom, suspensePromise, dependencies) {
    var atomState = getAtomState(version, atom);

    if (atomState && 'p' in atomState) {
      if (isEqualSuspensePromise(atomState.p, suspensePromise)) {
        return atomState;
      }

      cancelSuspensePromise(atomState.p);
    }

    addSuspensePromiseToCache(version, atom, suspensePromise);
    var nextAtomState = {
      p: suspensePromise,
      r: (atomState == null ? void 0 : atomState.r) || 0,
      d: createReadDependencies(version, atomState == null ? void 0 : atomState.d, dependencies)
    };
    setAtomState(version, atom, nextAtomState);
    return nextAtomState;
  };

  var setAtomPromiseOrValue = function setAtomPromiseOrValue(version, atom, promiseOrValue, dependencies) {
    if (promiseOrValue instanceof Promise) {
      var suspensePromise = createSuspensePromise(promiseOrValue.then(function (value) {
        setAtomValue(version, atom, value, dependencies, suspensePromise);
        flushPending(version);
      }).catch(function (e) {
        if (e instanceof Promise) {
          if (isSuspensePromise(e)) {
            return e.then(function () {
              readAtomState(version, atom, true);
            });
          }

          return e;
        }

        setAtomReadError(version, atom, e, dependencies, suspensePromise);
        flushPending(version);
      }));
      return setAtomSuspensePromise(version, atom, suspensePromise, dependencies);
    }

    return setAtomValue(version, atom, promiseOrValue, dependencies);
  };

  var setAtomInvalidated = function setAtomInvalidated(version, atom) {
    var atomState = getAtomState(version, atom);

    if (atomState) {
      var nextAtomState = _extends({}, atomState, {
        i: atomState.r
      });

      setAtomState(version, atom, nextAtomState);
    } else if (process.env.NODE_ENV !== "production") {
      console.warn('[Bug] could not invalidate non existing atom', atom);
    }
  };

  var readAtomState = function readAtomState(version, atom, force) {
    if (!force) {
      var _atomState2 = getAtomState(version, atom);

      if (_atomState2) {
        if (_atomState2.r !== _atomState2.i && 'p' in _atomState2 && !isSuspensePromiseAlreadyCancelled(_atomState2.p)) {
          return _atomState2;
        }

        _atomState2.d.forEach(function (_, a) {
          if (a !== atom) {
            if (!mountedMap.has(a)) {
              readAtomState(version, a);
            } else {
              var aState = getAtomState(version, a);

              if (aState && aState.r === aState.i) {
                readAtomState(version, a);
              }
            }
          }
        });

        if (Array.from(_atomState2.d).every(function (_ref) {
          var a = _ref[0],
              r = _ref[1];
          var aState = getAtomState(version, a);
          return aState && 'v' in aState && aState.r === r;
        })) {
          return _atomState2;
        }
      }
    }

    var dependencies = new Set();

    try {
      var promiseOrValue = atom.read(function (a) {
        dependencies.add(a);
        var aState = a === atom ? getAtomState(version, a) : readAtomState(version, a);

        if (aState) {
          if ('e' in aState) {
            throw aState.e;
          }

          if ('p' in aState) {
            throw aState.p;
          }

          return aState.v;
        }

        if (hasInitialValue(a)) {
          return a.init;
        }

        throw new Error('no atom init');
      });
      return setAtomPromiseOrValue(version, atom, promiseOrValue, dependencies);
    } catch (errorOrPromise) {
      if (errorOrPromise instanceof Promise) {
        var suspensePromise = createSuspensePromise(errorOrPromise);
        return setAtomSuspensePromise(version, atom, suspensePromise, dependencies);
      }

      return setAtomReadError(version, atom, errorOrPromise, dependencies);
    }
  };

  var readAtom = function readAtom(readingAtom, version) {
    var atomState = readAtomState(version, readingAtom);
    return atomState;
  };

  var addAtom = function addAtom(addingAtom) {
    var mounted = mountedMap.get(addingAtom);

    if (!mounted) {
      mounted = mountAtom(addingAtom);
    }

    return mounted;
  };

  var canUnmountAtom = function canUnmountAtom(atom, mounted) {
    return !mounted.l.size && (!mounted.t.size || mounted.t.size === 1 && mounted.t.has(atom));
  };

  var delAtom = function delAtom(deletingAtom) {
    var mounted = mountedMap.get(deletingAtom);

    if (mounted && canUnmountAtom(deletingAtom, mounted)) {
      unmountAtom(deletingAtom);
    }
  };

  var invalidateDependents = function invalidateDependents(version, atom) {
    var mounted = mountedMap.get(atom);
    mounted == null ? void 0 : mounted.t.forEach(function (dependent) {
      if (dependent !== atom) {
        setAtomInvalidated(version, dependent);
        invalidateDependents(version, dependent);
      }
    });
  };

  var writeAtomState = function writeAtomState(version, atom, update) {
    var isSync = true;

    var writeGetter = function writeGetter(a, options) {
      var aState = readAtomState(version, a);

      if ('e' in aState) {
        throw aState.e;
      }

      if ('p' in aState) {
        if (options != null && options.unstable_promise) {
          return aState.p.then(function () {
            return writeGetter(a, options);
          });
        }

        if (process.env.NODE_ENV !== "production") {
          console.info('Reading pending atom state in write operation. We throw a promise for now.', a);
        }

        throw aState.p;
      }

      if ('v' in aState) {
        return aState.v;
      }

      if (process.env.NODE_ENV !== "production") {
        console.warn('[Bug] no value found while reading atom in write operation. This is probably a bug.', a);
      }

      throw new Error('no value found');
    };

    var setter = function setter(a, v) {
      var promiseOrVoid;

      if (a === atom) {
        if (!hasInitialValue(a)) {
          throw new Error('atom not writable');
        }

        var versionSet = cancelAllSuspensePromiseInCache(a);
        versionSet.forEach(function (cancelledVersion) {
          if (cancelledVersion !== version) {
            setAtomPromiseOrValue(cancelledVersion, a, v);
          }
        });
        setAtomPromiseOrValue(version, a, v);
        invalidateDependents(version, a);
      } else {
        promiseOrVoid = writeAtomState(version, a, v);
      }

      if (!isSync) {
        flushPending(version);
      }

      return promiseOrVoid;
    };

    var promiseOrVoid = atom.write(writeGetter, setter, update);
    isSync = false;
    version = undefined;
    return promiseOrVoid;
  };

  var writeAtom = function writeAtom(writingAtom, update, version) {
    var promiseOrVoid = writeAtomState(version, writingAtom, update);
    flushPending(version);
    return promiseOrVoid;
  };

  var isActuallyWritableAtom = function isActuallyWritableAtom(atom) {
    return !!atom.write;
  };

  var mountAtom = function mountAtom(atom, initialDependent) {
    var mounted = {
      t: new Set(initialDependent && [initialDependent]),
      l: new Set()
    };
    mountedMap.set(atom, mounted);

    if (process.env.NODE_ENV !== "production") {
      mountedAtoms.add(atom);
    }

    var atomState = readAtomState(undefined, atom);
    atomState.d.forEach(function (_, a) {
      var aMounted = mountedMap.get(a);

      if (aMounted) {
        aMounted.t.add(atom);
      } else {
        if (a !== atom) {
          mountAtom(a, atom);
        }
      }
    });

    if (isActuallyWritableAtom(atom) && atom.onMount) {
      var setAtom = function setAtom(update) {
        return writeAtom(atom, update);
      };

      var onUnmount = atom.onMount(setAtom);

      if (onUnmount) {
        mounted.u = onUnmount;
      }
    }

    return mounted;
  };

  var unmountAtom = function unmountAtom(atom) {
    var _mountedMap$get;

    var onUnmount = (_mountedMap$get = mountedMap.get(atom)) == null ? void 0 : _mountedMap$get.u;

    if (onUnmount) {
      onUnmount();
    }

    mountedMap.delete(atom);

    if (process.env.NODE_ENV !== "production") {
      mountedAtoms.delete(atom);
    }

    var atomState = getAtomState(undefined, atom);

    if (atomState) {
      atomState.d.forEach(function (_, a) {
        if (a !== atom) {
          var mounted = mountedMap.get(a);

          if (mounted) {
            mounted.t.delete(atom);

            if (canUnmountAtom(a, mounted)) {
              unmountAtom(a);
            }
          }
        }
      });
    } else if (process.env.NODE_ENV !== "production") {
      console.warn('[Bug] could not find atom state to unmount', atom);
    }
  };

  var mountDependencies = function mountDependencies(atom, atomState, prevReadDependencies) {
    var dependencies = new Set(atomState.d.keys());
    prevReadDependencies == null ? void 0 : prevReadDependencies.forEach(function (_, a) {
      if (dependencies.has(a)) {
        dependencies.delete(a);
        return;
      }

      var mounted = mountedMap.get(a);

      if (mounted) {
        mounted.t.delete(atom);

        if (canUnmountAtom(a, mounted)) {
          unmountAtom(a);
        }
      }
    });
    dependencies.forEach(function (a) {
      var mounted = mountedMap.get(a);

      if (mounted) {
        mounted.t.add(atom);
      } else if (mountedMap.has(atom)) {
        mountAtom(a, atom);
      }
    });
  };

  var flushPending = function flushPending(version) {
    if (version) {
      var versionedAtomStateMap = getVersionedAtomStateMap(version);
      versionedAtomStateMap.forEach(function (atomState, atom) {
        if (atomState !== committedAtomStateMap.get(atom)) {
          var mounted = mountedMap.get(atom);
          mounted == null ? void 0 : mounted.l.forEach(function (listener) {
            return listener(version);
          });
        }
      });
      return;
    }

    while (pendingMap.size) {
      var pending = Array.from(pendingMap);
      pendingMap.clear();
      pending.forEach(function (_ref2) {
        var atom = _ref2[0],
            prevAtomState = _ref2[1];
        var atomState = getAtomState(undefined, atom);

        if (atomState && atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
          mountDependencies(atom, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
        }

        var mounted = mountedMap.get(atom);
        mounted == null ? void 0 : mounted.l.forEach(function (listener) {
          return listener();
        });
      });
    }

    if (process.env.NODE_ENV !== "production") {
      stateListeners.forEach(function (l) {
        return l();
      });
    }
  };

  var commitVersionedAtomStateMap = function commitVersionedAtomStateMap(version) {
    var versionedAtomStateMap = getVersionedAtomStateMap(version);
    versionedAtomStateMap.forEach(function (atomState, atom) {
      var prevAtomState = committedAtomStateMap.get(atom);

      if (atomState.r > ((prevAtomState == null ? void 0 : prevAtomState.r) || 0) || 'v' in atomState && atomState.r === (prevAtomState == null ? void 0 : prevAtomState.r) && atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
        committedAtomStateMap.set(atom, atomState);

        if (atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
          mountDependencies(atom, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
        }
      }
    });
  };

  var commitAtom = function commitAtom(_atom, version) {
    if (version) {
      commitVersionedAtomStateMap(version);
    }

    flushPending(undefined);
  };

  var subscribeAtom = function subscribeAtom(atom, callback) {
    var mounted = addAtom(atom);
    var listeners = mounted.l;
    listeners.add(callback);
    return function () {
      listeners.delete(callback);
      delAtom(atom);
    };
  };

  var restoreAtoms = function restoreAtoms(values, version) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(values), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          _atom2 = _step2$value[0],
          _value = _step2$value[1];

      if (hasInitialValue(_atom2)) {
        setAtomPromiseOrValue(version, _atom2, _value);
        invalidateDependents(version, _atom2);
      }
    }

    flushPending(version);
  };

  if (process.env.NODE_ENV !== "production") {
    var _ref3;

    return _ref3 = {}, _ref3[READ_ATOM] = readAtom, _ref3[WRITE_ATOM] = writeAtom, _ref3[COMMIT_ATOM] = commitAtom, _ref3[SUBSCRIBE_ATOM] = subscribeAtom, _ref3[RESTORE_ATOMS] = restoreAtoms, _ref3[DEV_SUBSCRIBE_STATE] = function (l) {
      stateListeners.add(l);
      return function () {
        stateListeners.delete(l);
      };
    }, _ref3[DEV_GET_MOUNTED_ATOMS] = function () {
      return mountedAtoms.values();
    }, _ref3[DEV_GET_ATOM_STATE] = function (a) {
      return committedAtomStateMap.get(a);
    }, _ref3[DEV_GET_MOUNTED] = function (a) {
      return mountedMap.get(a);
    }, _ref3;
  }

  return _ref4 = {}, _ref4[READ_ATOM] = readAtom, _ref4[WRITE_ATOM] = writeAtom, _ref4[COMMIT_ATOM] = commitAtom, _ref4[SUBSCRIBE_ATOM] = subscribeAtom, _ref4[RESTORE_ATOMS] = restoreAtoms, _ref4;
};
var createStoreForExport = function createStoreForExport(initialValues) {
  var store = createStore(initialValues);

  var get = function get(atom) {
    var atomState = store[READ_ATOM](atom);

    if ('e' in atomState) {
      throw atomState.e;
    }

    if ('p' in atomState) {
      return undefined;
    }

    return atomState.v;
  };

  var asyncGet = function asyncGet(atom) {
    return new Promise(function (resolve, reject) {
      var atomState = store[READ_ATOM](atom);

      if ('e' in atomState) {
        reject(atomState.e);
      } else if ('p' in atomState) {
        resolve(atomState.p.then(function () {
          return asyncGet(atom);
        }));
      } else {
        resolve(atomState.v);
      }
    });
  };

  var set = function set(atom, update) {
    return store[WRITE_ATOM](atom, update);
  };

  var sub = function sub(atom, callback) {
    return store[SUBSCRIBE_ATOM](atom, callback);
  };

  return {
    get: get,
    asyncGet: asyncGet,
    set: set,
    sub: sub,
    SECRET_INTERNAL_store: store
  };
};

var createScopeContainer = function createScopeContainer(initialValues, unstable_createStore) {
  var store = unstable_createStore ? unstable_createStore(initialValues).SECRET_INTERNAL_store : createStore(initialValues);
  return {
    s: store
  };
};
var ScopeContextMap = new Map();
var getScopeContext = function getScopeContext(scope) {
  if (!ScopeContextMap.has(scope)) {
    ScopeContextMap.set(scope, react__default.createContext(createScopeContainer()));
  }

  return ScopeContextMap.get(scope);
};

var atomToPrintable = function atomToPrintable(atom) {
  return atom.debugLabel || atom.toString();
};

var stateToPrintable = function stateToPrintable(_ref) {
  var store = _ref[0],
      atoms = _ref[1];
  return Object.fromEntries(atoms.flatMap(function (atom) {
    var _store$DEV_GET_MOUNTE, _store$DEV_GET_ATOM_S;

    var mounted = (_store$DEV_GET_MOUNTE = store[DEV_GET_MOUNTED]) == null ? void 0 : _store$DEV_GET_MOUNTE.call(store, atom);

    if (!mounted) {
      return [];
    }

    var dependents = mounted.t;
    var atomState = ((_store$DEV_GET_ATOM_S = store[DEV_GET_ATOM_STATE]) == null ? void 0 : _store$DEV_GET_ATOM_S.call(store, atom)) || {};
    return [[atomToPrintable(atom), _extends({}, 'e' in atomState && {
      error: atomState.e
    }, 'p' in atomState && {
      promise: atomState.p
    }, 'v' in atomState && {
      value: atomState.v
    }, {
      dependents: Array.from(dependents).map(atomToPrintable)
    })]];
  }));
};

var useDebugState = function useDebugState(scopeContainer) {
  var store = scopeContainer.s;

  var _useState = react__default.useState([]),
      atoms = _useState[0],
      setAtoms = _useState[1];

  react__default.useEffect(function () {
    var _store$DEV_SUBSCRIBE_;

    var callback = function callback() {
      var _store$DEV_GET_MOUNTE2;

      setAtoms(Array.from(((_store$DEV_GET_MOUNTE2 = store[DEV_GET_MOUNTED_ATOMS]) == null ? void 0 : _store$DEV_GET_MOUNTE2.call(store)) || []));
    };

    var unsubscribe = (_store$DEV_SUBSCRIBE_ = store[DEV_SUBSCRIBE_STATE]) == null ? void 0 : _store$DEV_SUBSCRIBE_.call(store, callback);
    callback();
    return unsubscribe;
  }, [store]);
  react__default.useDebugValue([store, atoms], stateToPrintable);
};

var Provider = function Provider(_ref) {
  var children = _ref.children,
      initialValues = _ref.initialValues,
      scope = _ref.scope,
      unstable_createStore = _ref.unstable_createStore,
      unstable_enableVersionedWrite = _ref.unstable_enableVersionedWrite;

  var _useState = react__default.useState(),
      version = _useState[0],
      setVersion = _useState[1];

  react__default.useEffect(function () {
    if (version) {
      scopeContainerRef.current.s[COMMIT_ATOM](null, version);
      delete version.p;
    }
  }, [version]);
  var scopeContainerRef = react__default.useRef();

  if (!scopeContainerRef.current) {
    scopeContainerRef.current = createScopeContainer(initialValues, unstable_createStore);

    if (unstable_enableVersionedWrite) {
      scopeContainerRef.current.w = function (write) {
        setVersion(function (parentVersion) {
          var nextVersion = parentVersion ? {
            p: parentVersion
          } : {};
          write(nextVersion);
          return nextVersion;
        });
      };
    }
  }

  if (process.env.NODE_ENV !== "production" && !unstable_enableVersionedWrite) {
    useDebugState(scopeContainerRef.current);
  }

  var ScopeContainerContext = getScopeContext(scope);
  return react__default.createElement(ScopeContainerContext.Provider, {
    value: scopeContainerRef.current
  }, children);
};

var keyCount = 0;
function atom(read, write) {
  var key = "atom" + ++keyCount;
  var config = {
    toString: function toString() {
      return key;
    }
  };

  if (typeof read === 'function') {
    config.read = read;
  } else {
    config.init = read;

    config.read = function (get) {
      return get(config);
    };

    config.write = function (get, set, update) {
      return set(config, typeof update === 'function' ? update(get(config)) : update);
    };
  }

  if (write) {
    config.write = write;
  }

  return config;
}

function useAtomValue(atom, scope) {
  var ScopeContext = getScopeContext(scope);

  var _useContext = react__default.useContext(ScopeContext),
      store = _useContext.s;

  var getAtomValue = react__default.useCallback(function (version) {
    var atomState = store[READ_ATOM](atom, version);

    if ('e' in atomState) {
      throw atomState.e;
    }

    if ('p' in atomState) {
      throw atomState.p;
    }

    if ('v' in atomState) {
      return atomState.v;
    }

    throw new Error('no atom value');
  }, [store, atom]);

  var _useReducer = react__default.useReducer(react__default.useCallback(function (prev, nextVersion) {
    var nextValue = getAtomValue(nextVersion);

    if (Object.is(prev[1], nextValue) && prev[2] === atom) {
      return prev;
    }

    return [nextVersion, nextValue, atom];
  }, [getAtomValue, atom]), undefined, function () {
    var initialVersion = undefined;
    var initialValue = getAtomValue(initialVersion);
    return [initialVersion, initialValue, atom];
  }),
      _useReducer$ = _useReducer[0],
      version = _useReducer$[0],
      value = _useReducer$[1],
      atomFromUseReducer = _useReducer$[2],
      rerenderIfChanged = _useReducer[1];

  if (atomFromUseReducer !== atom) {
    rerenderIfChanged(undefined);
  }

  react__default.useEffect(function () {
    var unsubscribe = store[SUBSCRIBE_ATOM](atom, rerenderIfChanged);
    rerenderIfChanged(undefined);
    return unsubscribe;
  }, [store, atom]);
  react__default.useEffect(function () {
    store[COMMIT_ATOM](atom, version);
  });
  react__default.useDebugValue(value);
  return value;
}

function useSetAtom(atom, scope) {
  var ScopeContext = getScopeContext(scope);

  var _useContext = react__default.useContext(ScopeContext),
      store = _useContext.s,
      versionedWrite = _useContext.w;

  var setAtom = react__default.useCallback(function (update) {
    if (process.env.NODE_ENV !== "production" && !('write' in atom)) {
      throw new Error('not writable atom');
    }

    var write = function write(version) {
      return store[WRITE_ATOM](atom, update, version);
    };

    return versionedWrite ? versionedWrite(write) : write();
  }, [store, versionedWrite, atom]);
  return setAtom;
}

function useAtom(atom, scope) {
  if ('scope' in atom) {
    console.warn('atom.scope is deprecated. Please do useAtom(atom, scope) instead.');
    scope = atom.scope;
  }

  return [useAtomValue(atom, scope), useSetAtom(atom, scope)];
}

exports.Provider = Provider;
exports.SECRET_INTERNAL_getScopeContext = getScopeContext;
exports.atom = atom;
exports.unstable_createStore = createStoreForExport;
exports.useAtom = useAtom;
exports.useAtomValue = useAtomValue;
exports.useSetAtom = useSetAtom;
});

unwrapExports(jotai);
var jotai_3 = jotai.atom;
var jotai_5 = jotai.useAtom;

var realmStateAtom = jotai_3({});
var realmPropsAtom = jotai_3({});

var useBifrost = function useBifrost(_ref) {
  var _config$realms, _currentRealmState$op;

  var config = _ref.config,
      currentRealm = _ref.currentRealm;
  var realms = (_config$realms = config === null || config === void 0 ? void 0 : config.realms) != null ? _config$realms : {};

  var _useAtom = jotai_5(realmStateAtom),
      realmsState = _useAtom[0],
      setRealmsState = _useAtom[1];

  var _useAtom2 = jotai_5(realmPropsAtom),
      realmsProps = _useAtom2[0],
      setRealmsProps = _useAtom2[1];

  var openRealm = function openRealm(realmName) {
    var realm = realmName || currentRealm;

    if (realm) {
      var _extends2;

      setRealmsState(_extends({}, realmsState, (_extends2 = {}, _extends2[realm] = _extends({}, realmsState[realm] || {}, {
        open: true
      }), _extends2)));
    }

    console.error('❗Bifrost Error❗ openRealm failed 👉 currentRealm not set and realmName not passed');
  };

  var closeRealm = function closeRealm(realmName) {
    var realm = realmName || currentRealm;

    if (realm) {
      var _extends3;

      setRealmsState(_extends({}, realmsState, (_extends3 = {}, _extends3[realm] = _extends({}, realmsState[realm] || {}, {
        open: false
      }), _extends3)));
    } else {
      console.error('❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed');
    }
  };

  if (!window.Bifrost && config) {
    window.Bifrost = new Bifrost(config);
    window.Bifrost.bus.addEventListener('bifrost-open', function (_ref2) {
      var detail = _ref2.detail;
      var name = detail.name,
          state = detail.state,
          props = detail.props;

      if (state) {
        var _extends4;

        setRealmsState(_extends({}, realmsState, (_extends4 = {}, _extends4[name] = state, _extends4)));
      }

      if (props) {
        var _extends5;

        console.log('Has props', props, name);
        setRealmsProps(_extends({}, realmsProps, (_extends5 = {}, _extends5[name] = props, _extends5)));
      }

      openRealm(name);
    });
    window.Bifrost.bus.addEventListener('bifrost-close', function (_ref3) {
      var detail = _ref3.detail;
      var name = detail.name;
      closeRealm(name);
    });
    window.Bifrost.bus.addEventListener('bifrost-update', function (_ref4) {
      var detail = _ref4.detail;
      var name = detail.name,
          props = detail.props;
      console.log('Updating realm', name, props);

      if (props) {
        var _extends6;

        setRealmsProps(_extends({}, realmsProps, (_extends6 = {}, _extends6[name] = props, _extends6)));
      }
    });
  }

  var currentRealmState = react.useMemo(function () {
    return currentRealm ? realmsState[currentRealm] : realmsState;
  }, [realmsState]);
  var realmIsOpen = (_currentRealmState$op = currentRealmState === null || currentRealmState === void 0 ? void 0 : currentRealmState.open) != null ? _currentRealmState$op : false;
  var realmList = Object.keys(realms);
  var currentRealmProps = react.useMemo(function () {
    return currentRealm ? realmsProps[currentRealm] : realmsProps;
  }, [realmsProps]);

  var t = function t(key) {
    return window.Bifrost.translate(key, currentRealm);
  };

  return {
    realmList: realmList,
    openRealm: openRealm,
    closeRealm: closeRealm,
    state: currentRealm ? currentRealmState : realmsState,
    props: currentRealm ? currentRealmProps : realmsProps,
    setRealmsProps: setRealmsProps,
    setRealmsState: setRealmsState,
    realmIsOpen: realmIsOpen,
    t: t
  };
};

exports.Bifrost = Bifrost;
exports.useBifrost = useBifrost;
//# sourceMappingURL=index.js.map
