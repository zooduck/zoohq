"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zoohq = function () {
  var actions = {};
  var store = {};
  return {
    dispatch: function dispatch(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var storeCopy = JSON.parse(JSON.stringify(store));
      store = _objectSpread({}, storeCopy, {}, data);

      try {
        actions[type](store);
        var customEvent = new CustomEvent(type, {
          detail: {
            store: store
          }
        });
        window.dispatchEvent(customEvent);
      } catch (err) {
        throw Error("\"".concat(type, "\" is not a valid action type. Use zoohq.register({ type: '").concat(type, "', callback: () => {} ) to register the action first.\n"), err);
      }
    },
    listen: function listen(type, callback) {
      window.addEventListener(type, callback);
    },
    register: function register(action) {
      var type = action.type,
          callback = action.callback;
      actions[type] = callback;
    },
    setStore: function setStore(initialStore) {
      store = _objectSpread({}, initialStore);
    },

    get actions() {
      return actions;
    },

    get store() {
      return store;
    }

  };
}();

var _default = zoohq;
exports.default = _default;

//# sourceMappingURL=zoohq.js.map