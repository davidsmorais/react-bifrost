import { useMemo } from 'react';
import { atom, useAtom } from 'jotai';

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

var realmStateAtom = atom({});
var realmPropsAtom = atom({});

var useBifrost = function useBifrost(_ref) {
  var _config$realms, _currentRealmState$op;

  var config = _ref.config,
      currentRealm = _ref.currentRealm;
  var realms = (_config$realms = config === null || config === void 0 ? void 0 : config.realms) != null ? _config$realms : {};

  var _useAtom = useAtom(realmStateAtom),
      realmsState = _useAtom[0],
      setRealmsState = _useAtom[1];

  var _useAtom2 = useAtom(realmPropsAtom),
      realmsProps = _useAtom2[0],
      setRealmsProps = _useAtom2[1];

  var openRealm = function openRealm(realmName) {
    var realm = realmName || currentRealm;

    if (realm) {
      var _extends2;

      setRealmsState(_extends({}, realmsState, (_extends2 = {}, _extends2[realm] = _extends({}, realmsState[realm] || {}, {
        open: true
      }), _extends2)));
    } else {
      console.error('❗Bifrost Error❗ openRealm failed 👉 currentRealm not set and realmName not passed');
    }
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

      if (props) {
        var _extends6;

        setRealmsProps(_extends({}, realmsProps, (_extends6 = {}, _extends6[name] = props, _extends6)));
      }
    });
  }

  var currentRealmState = useMemo(function () {
    return currentRealm ? realmsState[currentRealm] : realmsState;
  }, [realmsState]);
  var realmIsOpen = (_currentRealmState$op = currentRealmState === null || currentRealmState === void 0 ? void 0 : currentRealmState.open) != null ? _currentRealmState$op : false;
  var realmList = Object.keys(realms);
  var currentRealmProps = useMemo(function () {
    return currentRealm ? realmsProps[currentRealm] : realmsProps;
  }, [realmsProps]);

  var t = function t(key) {
    return window.Bifrost.translate(key, currentRealm);
  };

  var BifrostContainer = function BifrostContainer(_ref5) {
    var props = _extends({}, _ref5);

    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        position: 'absolute',
        width: '100vw',
        height: '100vh'
      }
    }, props), realms);
  };

  return {
    BifrostContainer: BifrostContainer,
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

export { Bifrost, useBifrost };
//# sourceMappingURL=index.modern.js.map
