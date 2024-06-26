function Sy(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const i in r)
        if (i !== 'default' && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o &&
            Object.defineProperty(
              e,
              i,
              o.get ? o : {enumerable: !0, get: () => r[i]},
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
  );
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver(i => {
    for (const o of i)
      if (o.type === 'childList')
        for (const s of o.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
  }).observe(document, {childList: !0, subtree: !0});
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
var Br =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function Vh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
function ky(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == 'function') {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, '__esModule', {value: !0}),
    Object.keys(e).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            },
      );
    }),
    n
  );
}
var zh = {exports: {}},
  Ts = {},
  Fh = {exports: {}},
  G = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ri = Symbol.for('react.element'),
  Ey = Symbol.for('react.portal'),
  Py = Symbol.for('react.fragment'),
  Ty = Symbol.for('react.strict_mode'),
  Cy = Symbol.for('react.profiler'),
  _y = Symbol.for('react.provider'),
  by = Symbol.for('react.context'),
  Oy = Symbol.for('react.forward_ref'),
  Ry = Symbol.for('react.suspense'),
  My = Symbol.for('react.memo'),
  Ay = Symbol.for('react.lazy'),
  Bc = Symbol.iterator;
function Ly(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Bc && e[Bc]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var Bh = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Uh = Object.assign,
  $h = {};
function Pr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = $h),
    (this.updater = n || Bh);
}
Pr.prototype.isReactComponent = {};
Pr.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
Pr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Hh() {}
Hh.prototype = Pr.prototype;
function fu(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = $h),
    (this.updater = n || Bh);
}
var du = (fu.prototype = new Hh());
du.constructor = fu;
Uh(du, Pr.prototype);
du.isPureReactComponent = !0;
var Uc = Array.isArray,
  Wh = Object.prototype.hasOwnProperty,
  hu = {current: null},
  Gh = {key: !0, ref: !0, __self: !0, __source: !0};
function Qh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = '' + t.key),
    t))
      Wh.call(t, r) && !Gh.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {$$typeof: Ri, type: e, key: o, ref: s, props: i, _owner: hu.current};
}
function Ny(e, t) {
  return {
    $$typeof: Ri,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function pu(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Ri;
}
function jy(e) {
  var t = {'=': '=0', ':': '=2'};
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var $c = /\/+/g;
function oa(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? jy('' + e.key)
    : t.toString(36);
}
function Po(e, t, n, r, i) {
  var o = typeof e;
  (o === 'undefined' || o === 'boolean') && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case 'string':
      case 'number':
        s = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case Ri:
          case Ey:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === '' ? '.' + oa(s, 0) : r),
      Uc(i)
        ? ((n = ''),
          e != null && (n = e.replace($c, '$&/') + '/'),
          Po(i, t, n, '', function (u) {
            return u;
          }))
        : i != null &&
          (pu(i) &&
            (i = Ny(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ''
                  : ('' + i.key).replace($c, '$&/') + '/') +
                e,
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === '' ? '.' : r + ':'), Uc(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var l = r + oa(o, a);
      s += Po(o, t, n, l, i);
    }
  else if (((l = Ly(e)), typeof l == 'function'))
    for (e = l.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (l = r + oa(o, a++)), (s += Po(o, t, n, l, i));
  else if (o === 'object')
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.',
      ))
    );
  return s;
}
function qi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Po(e, r, '', '', function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Dy(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var je = {current: null},
  To = {transition: null},
  Iy = {
    ReactCurrentDispatcher: je,
    ReactCurrentBatchConfig: To,
    ReactCurrentOwner: hu,
  };
G.Children = {
  map: qi,
  forEach: function (e, t, n) {
    qi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      qi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      qi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!pu(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.',
      );
    return e;
  },
};
G.Component = Pr;
G.Fragment = Py;
G.Profiler = Cy;
G.PureComponent = fu;
G.StrictMode = Ty;
G.Suspense = Ry;
G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Iy;
G.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.',
    );
  var r = Uh({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = hu.current)),
      t.key !== void 0 && (i = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (l in t)
      Wh.call(t, l) &&
        !Gh.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return {$$typeof: Ri, type: e.type, key: i, ref: o, props: r, _owner: s};
};
G.createContext = function (e) {
  return (
    (e = {
      $$typeof: by,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = {$$typeof: _y, _context: e}),
    (e.Consumer = e)
  );
};
G.createElement = Qh;
G.createFactory = function (e) {
  var t = Qh.bind(null, e);
  return (t.type = e), t;
};
G.createRef = function () {
  return {current: null};
};
G.forwardRef = function (e) {
  return {$$typeof: Oy, render: e};
};
G.isValidElement = pu;
G.lazy = function (e) {
  return {$$typeof: Ay, _payload: {_status: -1, _result: e}, _init: Dy};
};
G.memo = function (e, t) {
  return {$$typeof: My, type: e, compare: t === void 0 ? null : t};
};
G.startTransition = function (e) {
  var t = To.transition;
  To.transition = {};
  try {
    e();
  } finally {
    To.transition = t;
  }
};
G.unstable_act = function () {
  throw Error('act(...) is not supported in production builds of React.');
};
G.useCallback = function (e, t) {
  return je.current.useCallback(e, t);
};
G.useContext = function (e) {
  return je.current.useContext(e);
};
G.useDebugValue = function () {};
G.useDeferredValue = function (e) {
  return je.current.useDeferredValue(e);
};
G.useEffect = function (e, t) {
  return je.current.useEffect(e, t);
};
G.useId = function () {
  return je.current.useId();
};
G.useImperativeHandle = function (e, t, n) {
  return je.current.useImperativeHandle(e, t, n);
};
G.useInsertionEffect = function (e, t) {
  return je.current.useInsertionEffect(e, t);
};
G.useLayoutEffect = function (e, t) {
  return je.current.useLayoutEffect(e, t);
};
G.useMemo = function (e, t) {
  return je.current.useMemo(e, t);
};
G.useReducer = function (e, t, n) {
  return je.current.useReducer(e, t, n);
};
G.useRef = function (e) {
  return je.current.useRef(e);
};
G.useState = function (e) {
  return je.current.useState(e);
};
G.useSyncExternalStore = function (e, t, n) {
  return je.current.useSyncExternalStore(e, t, n);
};
G.useTransition = function () {
  return je.current.useTransition();
};
G.version = '18.2.0';
Fh.exports = G;
var S = Fh.exports;
const I = Vh(S),
  Vy = Sy({__proto__: null, default: I}, [S]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zy = S,
  Fy = Symbol.for('react.element'),
  By = Symbol.for('react.fragment'),
  Uy = Object.prototype.hasOwnProperty,
  $y = zy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Hy = {key: !0, ref: !0, __self: !0, __source: !0};
function Kh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  n !== void 0 && (o = '' + n),
    t.key !== void 0 && (o = '' + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) Uy.call(t, r) && !Hy.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {$$typeof: Fy, type: e, key: o, ref: s, props: i, _owner: $y.current};
}
Ts.Fragment = By;
Ts.jsx = Kh;
Ts.jsxs = Kh;
zh.exports = Ts;
var _ = zh.exports,
  Xa = {},
  qh = {exports: {}},
  qe = {},
  Yh = {exports: {}},
  Xh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(O, L) {
    var B = O.length;
    O.push(L);
    e: for (; 0 < B; ) {
      var D = (B - 1) >>> 1,
        q = O[D];
      if (0 < i(q, L)) (O[D] = L), (O[B] = q), (B = D);
      else break e;
    }
  }
  function n(O) {
    return O.length === 0 ? null : O[0];
  }
  function r(O) {
    if (O.length === 0) return null;
    var L = O[0],
      B = O.pop();
    if (B !== L) {
      O[0] = B;
      e: for (var D = 0, q = O.length, $e = q >>> 1; D < $e; ) {
        var Ce = 2 * (D + 1) - 1,
          ke = O[Ce],
          Me = Ce + 1,
          Xe = O[Me];
        if (0 > i(ke, B))
          Me < q && 0 > i(Xe, ke)
            ? ((O[D] = Xe), (O[Me] = B), (D = Me))
            : ((O[D] = ke), (O[Ce] = B), (D = Ce));
        else if (Me < q && 0 > i(Xe, B)) (O[D] = Xe), (O[Me] = B), (D = Me);
        else break e;
      }
    }
    return L;
  }
  function i(O, L) {
    var B = O.sortIndex - L.sortIndex;
    return B !== 0 ? B : O.id - L.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      a = s.now();
    e.unstable_now = function () {
      return s.now() - a;
    };
  }
  var l = [],
    u = [],
    c = 1,
    f = null,
    d = 3,
    h = !1,
    v = !1,
    y = !1,
    x = typeof setTimeout == 'function' ? setTimeout : null,
    m = typeof clearTimeout == 'function' ? clearTimeout : null,
    p = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(O) {
    for (var L = n(u); L !== null; ) {
      if (L.callback === null) r(u);
      else if (L.startTime <= O)
        r(u), (L.sortIndex = L.expirationTime), t(l, L);
      else break;
      L = n(u);
    }
  }
  function w(O) {
    if (((y = !1), g(O), !v))
      if (n(l) !== null) (v = !0), $(E);
      else {
        var L = n(u);
        L !== null && W(w, L.startTime - O);
      }
  }
  function E(O, L) {
    (v = !1), y && ((y = !1), m(k), (k = -1)), (h = !0);
    var B = d;
    try {
      for (
        g(L), f = n(l);
        f !== null && (!(f.expirationTime > L) || (O && !M()));

      ) {
        var D = f.callback;
        if (typeof D == 'function') {
          (f.callback = null), (d = f.priorityLevel);
          var q = D(f.expirationTime <= L);
          (L = e.unstable_now()),
            typeof q == 'function' ? (f.callback = q) : f === n(l) && r(l),
            g(L);
        } else r(l);
        f = n(l);
      }
      if (f !== null) var $e = !0;
      else {
        var Ce = n(u);
        Ce !== null && W(w, Ce.startTime - L), ($e = !1);
      }
      return $e;
    } finally {
      (f = null), (d = B), (h = !1);
    }
  }
  var T = !1,
    P = null,
    k = -1,
    b = 5,
    C = -1;
  function M() {
    return !(e.unstable_now() - C < b);
  }
  function V() {
    if (P !== null) {
      var O = e.unstable_now();
      C = O;
      var L = !0;
      try {
        L = P(!0, O);
      } finally {
        L ? F() : ((T = !1), (P = null));
      }
    } else T = !1;
  }
  var F;
  if (typeof p == 'function')
    F = function () {
      p(V);
    };
  else if (typeof MessageChannel < 'u') {
    var j = new MessageChannel(),
      A = j.port2;
    (j.port1.onmessage = V),
      (F = function () {
        A.postMessage(null);
      });
  } else
    F = function () {
      x(V, 0);
    };
  function $(O) {
    (P = O), T || ((T = !0), F());
  }
  function W(O, L) {
    k = x(function () {
      O(e.unstable_now());
    }, L);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (O) {
      O.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || h || ((v = !0), $(E));
    }),
    (e.unstable_forceFrameRate = function (O) {
      0 > O || 125 < O
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (b = 0 < O ? Math.floor(1e3 / O) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (O) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = d;
      }
      var B = d;
      d = L;
      try {
        return O();
      } finally {
        d = B;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (O, L) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var B = d;
      d = O;
      try {
        return L();
      } finally {
        d = B;
      }
    }),
    (e.unstable_scheduleCallback = function (O, L, B) {
      var D = e.unstable_now();
      switch (
        (typeof B == 'object' && B !== null
          ? ((B = B.delay), (B = typeof B == 'number' && 0 < B ? D + B : D))
          : (B = D),
        O)
      ) {
        case 1:
          var q = -1;
          break;
        case 2:
          q = 250;
          break;
        case 5:
          q = 1073741823;
          break;
        case 4:
          q = 1e4;
          break;
        default:
          q = 5e3;
      }
      return (
        (q = B + q),
        (O = {
          id: c++,
          callback: L,
          priorityLevel: O,
          startTime: B,
          expirationTime: q,
          sortIndex: -1,
        }),
        B > D
          ? ((O.sortIndex = B),
            t(u, O),
            n(l) === null &&
              O === n(u) &&
              (y ? (m(k), (k = -1)) : (y = !0), W(w, B - D)))
          : ((O.sortIndex = q), t(l, O), v || h || ((v = !0), $(E))),
        O
      );
    }),
    (e.unstable_shouldYield = M),
    (e.unstable_wrapCallback = function (O) {
      var L = d;
      return function () {
        var B = d;
        d = L;
        try {
          return O.apply(this, arguments);
        } finally {
          d = B;
        }
      };
    });
})(Xh);
Yh.exports = Xh;
var Wy = Yh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zh = S,
  Qe = Wy;
function R(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Jh = new Set(),
  li = {};
function In(e, t) {
  pr(e, t), pr(e + 'Capture', t);
}
function pr(e, t) {
  for (li[e] = t, e = 0; e < t.length; e++) Jh.add(t[e]);
}
var Lt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  Za = Object.prototype.hasOwnProperty,
  Gy =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Hc = {},
  Wc = {};
function Qy(e) {
  return Za.call(Wc, e)
    ? !0
    : Za.call(Hc, e)
    ? !1
    : Gy.test(e)
    ? (Wc[e] = !0)
    : ((Hc[e] = !0), !1);
}
function Ky(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function qy(e, t, n, r) {
  if (t === null || typeof t > 'u' || Ky(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function De(e, t, n, r, i, o, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s);
}
var Te = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    Te[e] = new De(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  Te[t] = new De(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  Te[e] = new De(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  Te[e] = new De(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    Te[e] = new De(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  Te[e] = new De(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  Te[e] = new De(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  Te[e] = new De(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  Te[e] = new De(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var mu = /[\-:]([a-z])/g;
function vu(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(mu, vu);
    Te[t] = new De(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(mu, vu);
    Te[t] = new De(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(mu, vu);
  Te[t] = new De(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  Te[e] = new De(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Te.xlinkHref = new De(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1,
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  Te[e] = new De(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function gu(e, t, n, r) {
  var i = Te.hasOwnProperty(t) ? Te[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (qy(t, n, i, r) && (n = null),
    r || i === null
      ? Qy(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : '') : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? '' : '' + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Vt = Zh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Yi = Symbol.for('react.element'),
  Wn = Symbol.for('react.portal'),
  Gn = Symbol.for('react.fragment'),
  yu = Symbol.for('react.strict_mode'),
  Ja = Symbol.for('react.profiler'),
  ep = Symbol.for('react.provider'),
  tp = Symbol.for('react.context'),
  wu = Symbol.for('react.forward_ref'),
  el = Symbol.for('react.suspense'),
  tl = Symbol.for('react.suspense_list'),
  xu = Symbol.for('react.memo'),
  Ht = Symbol.for('react.lazy'),
  np = Symbol.for('react.offscreen'),
  Gc = Symbol.iterator;
function Mr(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Gc && e[Gc]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var ue = Object.assign,
  sa;
function Ur(e) {
  if (sa === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      sa = (t && t[1]) || '';
    }
  return (
    `
` +
    sa +
    e
  );
}
var aa = !1;
function la(e, t) {
  if (!e || aa) return '';
  aa = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == 'string') {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          a = o.length - 1;
        1 <= s && 0 <= a && i[s] !== o[a];

      )
        a--;
      for (; 1 <= s && 0 <= a; s--, a--)
        if (i[s] !== o[a]) {
          if (s !== 1 || a !== 1)
            do
              if ((s--, a--, 0 > a || i[s] !== o[a])) {
                var l =
                  `
` + i[s].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    l.includes('<anonymous>') &&
                    (l = l.replace('<anonymous>', e.displayName)),
                  l
                );
              }
            while (1 <= s && 0 <= a);
          break;
        }
    }
  } finally {
    (aa = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : '') ? Ur(e) : '';
}
function Yy(e) {
  switch (e.tag) {
    case 5:
      return Ur(e.type);
    case 16:
      return Ur('Lazy');
    case 13:
      return Ur('Suspense');
    case 19:
      return Ur('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = la(e.type, !1)), e;
    case 11:
      return (e = la(e.type.render, !1)), e;
    case 1:
      return (e = la(e.type, !0)), e;
    default:
      return '';
  }
}
function nl(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Gn:
      return 'Fragment';
    case Wn:
      return 'Portal';
    case Ja:
      return 'Profiler';
    case yu:
      return 'StrictMode';
    case el:
      return 'Suspense';
    case tl:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case tp:
        return (e.displayName || 'Context') + '.Consumer';
      case ep:
        return (e._context.displayName || 'Context') + '.Provider';
      case wu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case xu:
        return (
          (t = e.displayName || null), t !== null ? t : nl(e.type) || 'Memo'
        );
      case Ht:
        (t = e._payload), (e = e._init);
        try {
          return nl(e(t));
        } catch {}
    }
  return null;
}
function Xy(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return nl(t);
    case 8:
      return t === yu ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function cn(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function rp(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Zy(e) {
  var t = rp(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = '' + s), o.call(this, s);
        },
      }),
      Object.defineProperty(e, t, {enumerable: n.enumerable}),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = '' + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Xi(e) {
  e._valueTracker || (e._valueTracker = Zy(e));
}
function ip(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = rp(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Fo(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function rl(e, t) {
  var n = t.checked;
  return ue({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Qc(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = cn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    });
}
function op(e, t) {
  (t = t.checked), t != null && gu(e, 'checked', t, !1);
}
function il(e, t) {
  op(e, t);
  var n = cn(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  t.hasOwnProperty('value')
    ? ol(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && ol(e, t.type, cn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Kc(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n);
}
function ol(e, t, n) {
  (t !== 'number' || Fo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var $r = Array.isArray;
function lr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t['$' + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = '' + cn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function sl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(R(91));
  return ue({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function qc(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(R(92));
      if ($r(n)) {
        if (1 < n.length) throw Error(R(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ''), (n = t);
  }
  e._wrapperState = {initialValue: cn(n)};
}
function sp(e, t) {
  var n = cn(t.value),
    r = cn(t.defaultValue);
  n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r);
}
function Yc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function ap(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function al(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? ap(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
    ? 'http://www.w3.org/1999/xhtml'
    : e;
}
var Zi,
  lp = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        Zi = Zi || document.createElement('div'),
          Zi.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Zi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function ui(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var qr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Jy = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(qr).forEach(function (e) {
  Jy.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (qr[t] = qr[e]);
  });
});
function up(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (qr.hasOwnProperty(e) && qr[e])
    ? ('' + t).trim()
    : t + 'px';
}
function cp(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        i = up(n, t[n], r);
      n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var e0 = ue(
  {menuitem: !0},
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function ll(e, t) {
  if (t) {
    if (e0[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(R(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(R(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(R(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(R(62));
  }
}
function ul(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var cl = null;
function Su(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var fl = null,
  ur = null,
  cr = null;
function Xc(e) {
  if ((e = Li(e))) {
    if (typeof fl != 'function') throw Error(R(280));
    var t = e.stateNode;
    t && ((t = Rs(t)), fl(e.stateNode, e.type, t));
  }
}
function fp(e) {
  ur ? (cr ? cr.push(e) : (cr = [e])) : (ur = e);
}
function dp() {
  if (ur) {
    var e = ur,
      t = cr;
    if (((cr = ur = null), Xc(e), t)) for (e = 0; e < t.length; e++) Xc(t[e]);
  }
}
function hp(e, t) {
  return e(t);
}
function pp() {}
var ua = !1;
function mp(e, t, n) {
  if (ua) return e(t, n);
  ua = !0;
  try {
    return hp(e, t, n);
  } finally {
    (ua = !1), (ur !== null || cr !== null) && (pp(), dp());
  }
}
function ci(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Rs(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(R(231, t, typeof n));
  return n;
}
var dl = !1;
if (Lt)
  try {
    var Ar = {};
    Object.defineProperty(Ar, 'passive', {
      get: function () {
        dl = !0;
      },
    }),
      window.addEventListener('test', Ar, Ar),
      window.removeEventListener('test', Ar, Ar);
  } catch {
    dl = !1;
  }
function t0(e, t, n, r, i, o, s, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var Yr = !1,
  Bo = null,
  Uo = !1,
  hl = null,
  n0 = {
    onError: function (e) {
      (Yr = !0), (Bo = e);
    },
  };
function r0(e, t, n, r, i, o, s, a, l) {
  (Yr = !1), (Bo = null), t0.apply(n0, arguments);
}
function i0(e, t, n, r, i, o, s, a, l) {
  if ((r0.apply(this, arguments), Yr)) {
    if (Yr) {
      var u = Bo;
      (Yr = !1), (Bo = null);
    } else throw Error(R(198));
    Uo || ((Uo = !0), (hl = u));
  }
}
function Vn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function vp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Zc(e) {
  if (Vn(e) !== e) throw Error(R(188));
}
function o0(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Vn(e)), t === null)) throw Error(R(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Zc(i), e;
        if (o === r) return Zc(i), t;
        o = o.sibling;
      }
      throw Error(R(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var s = !1, a = i.child; a; ) {
        if (a === n) {
          (s = !0), (n = i), (r = o);
          break;
        }
        if (a === r) {
          (s = !0), (r = i), (n = o);
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = o.child; a; ) {
          if (a === n) {
            (s = !0), (n = o), (r = i);
            break;
          }
          if (a === r) {
            (s = !0), (r = o), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(R(189));
      }
    }
    if (n.alternate !== r) throw Error(R(190));
  }
  if (n.tag !== 3) throw Error(R(188));
  return n.stateNode.current === n ? e : t;
}
function gp(e) {
  return (e = o0(e)), e !== null ? yp(e) : null;
}
function yp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = yp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var wp = Qe.unstable_scheduleCallback,
  Jc = Qe.unstable_cancelCallback,
  s0 = Qe.unstable_shouldYield,
  a0 = Qe.unstable_requestPaint,
  he = Qe.unstable_now,
  l0 = Qe.unstable_getCurrentPriorityLevel,
  ku = Qe.unstable_ImmediatePriority,
  xp = Qe.unstable_UserBlockingPriority,
  $o = Qe.unstable_NormalPriority,
  u0 = Qe.unstable_LowPriority,
  Sp = Qe.unstable_IdlePriority,
  Cs = null,
  xt = null;
function c0(e) {
  if (xt && typeof xt.onCommitFiberRoot == 'function')
    try {
      xt.onCommitFiberRoot(Cs, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var ft = Math.clz32 ? Math.clz32 : h0,
  f0 = Math.log,
  d0 = Math.LN2;
function h0(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((f0(e) / d0) | 0)) | 0;
}
var Ji = 64,
  eo = 4194304;
function Hr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ho(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var a = s & ~i;
    a !== 0 ? (r = Hr(a)) : ((o &= s), o !== 0 && (r = Hr(o)));
  } else (s = n & ~i), s !== 0 ? (r = Hr(s)) : o !== 0 && (r = Hr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - ft(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function p0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function m0(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - ft(o),
      a = 1 << s,
      l = i[s];
    l === -1
      ? (!(a & n) || a & r) && (i[s] = p0(a, t))
      : l <= t && (e.expiredLanes |= a),
      (o &= ~a);
  }
}
function pl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function kp() {
  var e = Ji;
  return (Ji <<= 1), !(Ji & 4194240) && (Ji = 64), e;
}
function ca(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Mi(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - ft(t)),
    (e[t] = n);
}
function v0(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - ft(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function Eu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - ft(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var X = 0;
function Ep(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Pp,
  Pu,
  Tp,
  Cp,
  _p,
  ml = !1,
  to = [],
  Zt = null,
  Jt = null,
  en = null,
  fi = new Map(),
  di = new Map(),
  Qt = [],
  g0 =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' ',
    );
function ef(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Zt = null;
      break;
    case 'dragenter':
    case 'dragleave':
      Jt = null;
      break;
    case 'mouseover':
    case 'mouseout':
      en = null;
      break;
    case 'pointerover':
    case 'pointerout':
      fi.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      di.delete(t.pointerId);
  }
}
function Lr(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Li(t)), t !== null && Pu(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function y0(e, t, n, r, i) {
  switch (t) {
    case 'focusin':
      return (Zt = Lr(Zt, e, t, n, r, i)), !0;
    case 'dragenter':
      return (Jt = Lr(Jt, e, t, n, r, i)), !0;
    case 'mouseover':
      return (en = Lr(en, e, t, n, r, i)), !0;
    case 'pointerover':
      var o = i.pointerId;
      return fi.set(o, Lr(fi.get(o) || null, e, t, n, r, i)), !0;
    case 'gotpointercapture':
      return (
        (o = i.pointerId), di.set(o, Lr(di.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function bp(e) {
  var t = Cn(e.target);
  if (t !== null) {
    var n = Vn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = vp(n)), t !== null)) {
          (e.blockedOn = t),
            _p(e.priority, function () {
              Tp(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Co(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = vl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (cl = r), n.target.dispatchEvent(r), (cl = null);
    } else return (t = Li(n)), t !== null && Pu(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function tf(e, t, n) {
  Co(e) && n.delete(t);
}
function w0() {
  (ml = !1),
    Zt !== null && Co(Zt) && (Zt = null),
    Jt !== null && Co(Jt) && (Jt = null),
    en !== null && Co(en) && (en = null),
    fi.forEach(tf),
    di.forEach(tf);
}
function Nr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ml ||
      ((ml = !0),
      Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority, w0)));
}
function hi(e) {
  function t(i) {
    return Nr(i, e);
  }
  if (0 < to.length) {
    Nr(to[0], e);
    for (var n = 1; n < to.length; n++) {
      var r = to[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Zt !== null && Nr(Zt, e),
      Jt !== null && Nr(Jt, e),
      en !== null && Nr(en, e),
      fi.forEach(t),
      di.forEach(t),
      n = 0;
    n < Qt.length;
    n++
  )
    (r = Qt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Qt.length && ((n = Qt[0]), n.blockedOn === null); )
    bp(n), n.blockedOn === null && Qt.shift();
}
var fr = Vt.ReactCurrentBatchConfig,
  Wo = !0;
function x0(e, t, n, r) {
  var i = X,
    o = fr.transition;
  fr.transition = null;
  try {
    (X = 1), Tu(e, t, n, r);
  } finally {
    (X = i), (fr.transition = o);
  }
}
function S0(e, t, n, r) {
  var i = X,
    o = fr.transition;
  fr.transition = null;
  try {
    (X = 4), Tu(e, t, n, r);
  } finally {
    (X = i), (fr.transition = o);
  }
}
function Tu(e, t, n, r) {
  if (Wo) {
    var i = vl(e, t, n, r);
    if (i === null) xa(e, t, r, Go, n), ef(e, r);
    else if (y0(i, e, t, n, r)) r.stopPropagation();
    else if ((ef(e, r), t & 4 && -1 < g0.indexOf(e))) {
      for (; i !== null; ) {
        var o = Li(i);
        if (
          (o !== null && Pp(o),
          (o = vl(e, t, n, r)),
          o === null && xa(e, t, r, Go, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else xa(e, t, r, null, n);
  }
}
var Go = null;
function vl(e, t, n, r) {
  if (((Go = null), (e = Su(r)), (e = Cn(e)), e !== null))
    if (((t = Vn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = vp(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Go = e), null;
}
function Op(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (l0()) {
        case ku:
          return 1;
        case xp:
          return 4;
        case $o:
        case u0:
          return 16;
        case Sp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var qt = null,
  Cu = null,
  _o = null;
function Rp() {
  if (_o) return _o;
  var e,
    t = Cu,
    n = t.length,
    r,
    i = 'value' in qt ? qt.value : qt.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (_o = i.slice(e, 1 < r ? 1 - r : void 0));
}
function bo(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function no() {
  return !0;
}
function nf() {
  return !1;
}
function Ye(e) {
  function t(n, r, i, o, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? no
        : nf),
      (this.isPropagationStopped = nf),
      this
    );
  }
  return (
    ue(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = no));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = no));
      },
      persist: function () {},
      isPersistent: no,
    }),
    t
  );
}
var Tr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  _u = Ye(Tr),
  Ai = ue({}, Tr, {view: 0, detail: 0}),
  k0 = Ye(Ai),
  fa,
  da,
  jr,
  _s = ue({}, Ai, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: bu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== jr &&
            (jr && e.type === 'mousemove'
              ? ((fa = e.screenX - jr.screenX), (da = e.screenY - jr.screenY))
              : (da = fa = 0),
            (jr = e)),
          fa);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : da;
    },
  }),
  rf = Ye(_s),
  E0 = ue({}, _s, {dataTransfer: 0}),
  P0 = Ye(E0),
  T0 = ue({}, Ai, {relatedTarget: 0}),
  ha = Ye(T0),
  C0 = ue({}, Tr, {animationName: 0, elapsedTime: 0, pseudoElement: 0}),
  _0 = Ye(C0),
  b0 = ue({}, Tr, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  O0 = Ye(b0),
  R0 = ue({}, Tr, {data: 0}),
  of = Ye(R0),
  M0 = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  A0 = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  L0 = {Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey'};
function N0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = L0[e]) ? !!t[e] : !1;
}
function bu() {
  return N0;
}
var j0 = ue({}, Ai, {
    key: function (e) {
      if (e.key) {
        var t = M0[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = bo(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
        ? A0[e.keyCode] || 'Unidentified'
        : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bu,
    charCode: function (e) {
      return e.type === 'keypress' ? bo(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? bo(e)
        : e.type === 'keydown' || e.type === 'keyup'
        ? e.keyCode
        : 0;
    },
  }),
  D0 = Ye(j0),
  I0 = ue({}, _s, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  sf = Ye(I0),
  V0 = ue({}, Ai, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bu,
  }),
  z0 = Ye(V0),
  F0 = ue({}, Tr, {propertyName: 0, elapsedTime: 0, pseudoElement: 0}),
  B0 = Ye(F0),
  U0 = ue({}, _s, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
        ? -e.wheelDeltaY
        : 'wheelDelta' in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  $0 = Ye(U0),
  H0 = [9, 13, 27, 32],
  Ou = Lt && 'CompositionEvent' in window,
  Xr = null;
Lt && 'documentMode' in document && (Xr = document.documentMode);
var W0 = Lt && 'TextEvent' in window && !Xr,
  Mp = Lt && (!Ou || (Xr && 8 < Xr && 11 >= Xr)),
  af = String.fromCharCode(32),
  lf = !1;
function Ap(e, t) {
  switch (e) {
    case 'keyup':
      return H0.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function Lp(e) {
  return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null;
}
var Qn = !1;
function G0(e, t) {
  switch (e) {
    case 'compositionend':
      return Lp(t);
    case 'keypress':
      return t.which !== 32 ? null : ((lf = !0), af);
    case 'textInput':
      return (e = t.data), e === af && lf ? null : e;
    default:
      return null;
  }
}
function Q0(e, t) {
  if (Qn)
    return e === 'compositionend' || (!Ou && Ap(e, t))
      ? ((e = Rp()), (_o = Cu = qt = null), (Qn = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return Mp && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var K0 = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function uf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!K0[e.type] : t === 'textarea';
}
function Np(e, t, n, r) {
  fp(r),
    (t = Qo(t, 'onChange')),
    0 < t.length &&
      ((n = new _u('onChange', 'change', null, n, r)),
      e.push({event: n, listeners: t}));
}
var Zr = null,
  pi = null;
function q0(e) {
  Wp(e, 0);
}
function bs(e) {
  var t = Yn(e);
  if (ip(t)) return e;
}
function Y0(e, t) {
  if (e === 'change') return t;
}
var jp = !1;
if (Lt) {
  var pa;
  if (Lt) {
    var ma = 'oninput' in document;
    if (!ma) {
      var cf = document.createElement('div');
      cf.setAttribute('oninput', 'return;'),
        (ma = typeof cf.oninput == 'function');
    }
    pa = ma;
  } else pa = !1;
  jp = pa && (!document.documentMode || 9 < document.documentMode);
}
function ff() {
  Zr && (Zr.detachEvent('onpropertychange', Dp), (pi = Zr = null));
}
function Dp(e) {
  if (e.propertyName === 'value' && bs(pi)) {
    var t = [];
    Np(t, pi, e, Su(e)), mp(q0, t);
  }
}
function X0(e, t, n) {
  e === 'focusin'
    ? (ff(), (Zr = t), (pi = n), Zr.attachEvent('onpropertychange', Dp))
    : e === 'focusout' && ff();
}
function Z0(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return bs(pi);
}
function J0(e, t) {
  if (e === 'click') return bs(t);
}
function ew(e, t) {
  if (e === 'input' || e === 'change') return bs(t);
}
function tw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var ht = typeof Object.is == 'function' ? Object.is : tw;
function mi(e, t) {
  if (ht(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Za.call(t, i) || !ht(e[i], t[i])) return !1;
  }
  return !0;
}
function df(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function hf(e, t) {
  var n = df(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return {node: n, offset: t - e};
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = df(n);
  }
}
function Ip(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Ip(e, t.parentNode)
      : 'contains' in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Vp() {
  for (var e = window, t = Fo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Fo(e.document);
  }
  return t;
}
function Ru(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function nw(e) {
  var t = Vp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Ip(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ru(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = hf(n, o));
        var s = hf(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({element: e, left: e.scrollLeft, top: e.scrollTop});
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var rw = Lt && 'documentMode' in document && 11 >= document.documentMode,
  Kn = null,
  gl = null,
  Jr = null,
  yl = !1;
function pf(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  yl ||
    Kn == null ||
    Kn !== Fo(r) ||
    ((r = Kn),
    'selectionStart' in r && Ru(r)
      ? (r = {start: r.selectionStart, end: r.selectionEnd})
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Jr && mi(Jr, r)) ||
      ((Jr = r),
      (r = Qo(gl, 'onSelect')),
      0 < r.length &&
        ((t = new _u('onSelect', 'select', null, t, n)),
        e.push({event: t, listeners: r}),
        (t.target = Kn))));
}
function ro(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var qn = {
    animationend: ro('Animation', 'AnimationEnd'),
    animationiteration: ro('Animation', 'AnimationIteration'),
    animationstart: ro('Animation', 'AnimationStart'),
    transitionend: ro('Transition', 'TransitionEnd'),
  },
  va = {},
  zp = {};
Lt &&
  ((zp = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete qn.animationend.animation,
    delete qn.animationiteration.animation,
    delete qn.animationstart.animation),
  'TransitionEvent' in window || delete qn.transitionend.transition);
function Os(e) {
  if (va[e]) return va[e];
  if (!qn[e]) return e;
  var t = qn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in zp) return (va[e] = t[n]);
  return e;
}
var Fp = Os('animationend'),
  Bp = Os('animationiteration'),
  Up = Os('animationstart'),
  $p = Os('transitionend'),
  Hp = new Map(),
  mf =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' ',
    );
function pn(e, t) {
  Hp.set(e, t), In(t, [e]);
}
for (var ga = 0; ga < mf.length; ga++) {
  var ya = mf[ga],
    iw = ya.toLowerCase(),
    ow = ya[0].toUpperCase() + ya.slice(1);
  pn(iw, 'on' + ow);
}
pn(Fp, 'onAnimationEnd');
pn(Bp, 'onAnimationIteration');
pn(Up, 'onAnimationStart');
pn('dblclick', 'onDoubleClick');
pn('focusin', 'onFocus');
pn('focusout', 'onBlur');
pn($p, 'onTransitionEnd');
pr('onMouseEnter', ['mouseout', 'mouseover']);
pr('onMouseLeave', ['mouseout', 'mouseover']);
pr('onPointerEnter', ['pointerout', 'pointerover']);
pr('onPointerLeave', ['pointerout', 'pointerover']);
In(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(
    ' ',
  ),
);
In(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' ',
  ),
);
In('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
In(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' '),
);
In(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
);
In(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
);
var Wr =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' ',
    ),
  sw = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Wr));
function vf(e, t, n) {
  var r = e.type || 'unknown-event';
  (e.currentTarget = n), i0(r, t, void 0, e), (e.currentTarget = null);
}
function Wp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s],
            l = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), l !== o && i.isPropagationStopped())) break e;
          vf(i, a, u), (o = l);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((a = r[s]),
            (l = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            l !== o && i.isPropagationStopped())
          )
            break e;
          vf(i, a, u), (o = l);
        }
    }
  }
  if (Uo) throw ((e = hl), (Uo = !1), (hl = null), e);
}
function J(e, t) {
  var n = t[El];
  n === void 0 && (n = t[El] = new Set());
  var r = e + '__bubble';
  n.has(r) || (Gp(t, e, 2, !1), n.add(r));
}
function wa(e, t, n) {
  var r = 0;
  t && (r |= 4), Gp(n, e, r, t);
}
var io = '_reactListening' + Math.random().toString(36).slice(2);
function vi(e) {
  if (!e[io]) {
    (e[io] = !0),
      Jh.forEach(function (n) {
        n !== 'selectionchange' && (sw.has(n) || wa(n, !1, e), wa(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[io] || ((t[io] = !0), wa('selectionchange', !1, t));
  }
}
function Gp(e, t, n, r) {
  switch (Op(t)) {
    case 1:
      var i = x0;
      break;
    case 4:
      i = S0;
      break;
    default:
      i = Tu;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !dl ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, {capture: !0, passive: i})
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, {passive: i})
      : e.addEventListener(t, n, !1);
}
function xa(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var l = s.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = s.stateNode.containerInfo),
              l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; a !== null; ) {
          if (((s = Cn(a)), s === null)) return;
          if (((l = s.tag), l === 5 || l === 6)) {
            r = o = s;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  mp(function () {
    var u = o,
      c = Su(n),
      f = [];
    e: {
      var d = Hp.get(e);
      if (d !== void 0) {
        var h = _u,
          v = e;
        switch (e) {
          case 'keypress':
            if (bo(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            h = D0;
            break;
          case 'focusin':
            (v = 'focus'), (h = ha);
            break;
          case 'focusout':
            (v = 'blur'), (h = ha);
            break;
          case 'beforeblur':
          case 'afterblur':
            h = ha;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            h = rf;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            h = P0;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            h = z0;
            break;
          case Fp:
          case Bp:
          case Up:
            h = _0;
            break;
          case $p:
            h = B0;
            break;
          case 'scroll':
            h = k0;
            break;
          case 'wheel':
            h = $0;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            h = O0;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            h = sf;
        }
        var y = (t & 4) !== 0,
          x = !y && e === 'scroll',
          m = y ? (d !== null ? d + 'Capture' : null) : d;
        y = [];
        for (var p = u, g; p !== null; ) {
          g = p;
          var w = g.stateNode;
          if (
            (g.tag === 5 &&
              w !== null &&
              ((g = w),
              m !== null && ((w = ci(p, m)), w != null && y.push(gi(p, w, g)))),
            x)
          )
            break;
          p = p.return;
        }
        0 < y.length &&
          ((d = new h(d, v, null, n, c)), f.push({event: d, listeners: y}));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === 'mouseover' || e === 'pointerover'),
          (h = e === 'mouseout' || e === 'pointerout'),
          d &&
            n !== cl &&
            (v = n.relatedTarget || n.fromElement) &&
            (Cn(v) || v[Nt]))
        )
          break e;
        if (
          (h || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
              ? d.defaultView || d.parentWindow
              : window),
          h
            ? ((v = n.relatedTarget || n.toElement),
              (h = u),
              (v = v ? Cn(v) : null),
              v !== null &&
                ((x = Vn(v)), v !== x || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((h = null), (v = u)),
          h !== v)
        ) {
          if (
            ((y = rf),
            (w = 'onMouseLeave'),
            (m = 'onMouseEnter'),
            (p = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((y = sf),
              (w = 'onPointerLeave'),
              (m = 'onPointerEnter'),
              (p = 'pointer')),
            (x = h == null ? d : Yn(h)),
            (g = v == null ? d : Yn(v)),
            (d = new y(w, p + 'leave', h, n, c)),
            (d.target = x),
            (d.relatedTarget = g),
            (w = null),
            Cn(c) === u &&
              ((y = new y(m, p + 'enter', v, n, c)),
              (y.target = g),
              (y.relatedTarget = x),
              (w = y)),
            (x = w),
            h && v)
          )
            t: {
              for (y = h, m = v, p = 0, g = y; g; g = $n(g)) p++;
              for (g = 0, w = m; w; w = $n(w)) g++;
              for (; 0 < p - g; ) (y = $n(y)), p--;
              for (; 0 < g - p; ) (m = $n(m)), g--;
              for (; p--; ) {
                if (y === m || (m !== null && y === m.alternate)) break t;
                (y = $n(y)), (m = $n(m));
              }
              y = null;
            }
          else y = null;
          h !== null && gf(f, d, h, y, !1),
            v !== null && x !== null && gf(f, x, v, y, !0);
        }
      }
      e: {
        if (
          ((d = u ? Yn(u) : window),
          (h = d.nodeName && d.nodeName.toLowerCase()),
          h === 'select' || (h === 'input' && d.type === 'file'))
        )
          var E = Y0;
        else if (uf(d))
          if (jp) E = ew;
          else {
            E = Z0;
            var T = X0;
          }
        else
          (h = d.nodeName) &&
            h.toLowerCase() === 'input' &&
            (d.type === 'checkbox' || d.type === 'radio') &&
            (E = J0);
        if (E && (E = E(e, u))) {
          Np(f, E, n, c);
          break e;
        }
        T && T(e, d, u),
          e === 'focusout' &&
            (T = d._wrapperState) &&
            T.controlled &&
            d.type === 'number' &&
            ol(d, 'number', d.value);
      }
      switch (((T = u ? Yn(u) : window), e)) {
        case 'focusin':
          (uf(T) || T.contentEditable === 'true') &&
            ((Kn = T), (gl = u), (Jr = null));
          break;
        case 'focusout':
          Jr = gl = Kn = null;
          break;
        case 'mousedown':
          yl = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (yl = !1), pf(f, n, c);
          break;
        case 'selectionchange':
          if (rw) break;
        case 'keydown':
        case 'keyup':
          pf(f, n, c);
      }
      var P;
      if (Ou)
        e: {
          switch (e) {
            case 'compositionstart':
              var k = 'onCompositionStart';
              break e;
            case 'compositionend':
              k = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              k = 'onCompositionUpdate';
              break e;
          }
          k = void 0;
        }
      else
        Qn
          ? Ap(e, n) && (k = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (k = 'onCompositionStart');
      k &&
        (Mp &&
          n.locale !== 'ko' &&
          (Qn || k !== 'onCompositionStart'
            ? k === 'onCompositionEnd' && Qn && (P = Rp())
            : ((qt = c),
              (Cu = 'value' in qt ? qt.value : qt.textContent),
              (Qn = !0))),
        (T = Qo(u, k)),
        0 < T.length &&
          ((k = new of(k, e, null, n, c)),
          f.push({event: k, listeners: T}),
          P ? (k.data = P) : ((P = Lp(n)), P !== null && (k.data = P)))),
        (P = W0 ? G0(e, n) : Q0(e, n)) &&
          ((u = Qo(u, 'onBeforeInput')),
          0 < u.length &&
            ((c = new of('onBeforeInput', 'beforeinput', null, n, c)),
            f.push({event: c, listeners: u}),
            (c.data = P)));
    }
    Wp(f, t);
  });
}
function gi(e, t, n) {
  return {instance: e, listener: t, currentTarget: n};
}
function Qo(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = ci(e, n)),
      o != null && r.unshift(gi(e, o, i)),
      (o = ci(e, t)),
      o != null && r.push(gi(e, o, i))),
      (e = e.return);
  }
  return r;
}
function $n(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function gf(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      u = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      i
        ? ((l = ci(n, o)), l != null && s.unshift(gi(n, l, a)))
        : i || ((l = ci(n, o)), l != null && s.push(gi(n, l, a)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({event: t, listeners: s});
}
var aw = /\r\n?/g,
  lw = /\u0000|\uFFFD/g;
function yf(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      aw,
      `
`,
    )
    .replace(lw, '');
}
function oo(e, t, n) {
  if (((t = yf(t)), yf(e) !== t && n)) throw Error(R(425));
}
function Ko() {}
var wl = null,
  xl = null;
function Sl(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var kl = typeof setTimeout == 'function' ? setTimeout : void 0,
  uw = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  wf = typeof Promise == 'function' ? Promise : void 0,
  cw =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof wf < 'u'
      ? function (e) {
          return wf.resolve(null).then(e).catch(fw);
        }
      : kl;
function fw(e) {
  setTimeout(function () {
    throw e;
  });
}
function Sa(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === '/$')) {
        if (r === 0) {
          e.removeChild(i), hi(t);
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = i;
  } while (n);
  hi(t);
}
function tn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function xf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Cr = Math.random().toString(36).slice(2),
  wt = '__reactFiber$' + Cr,
  yi = '__reactProps$' + Cr,
  Nt = '__reactContainer$' + Cr,
  El = '__reactEvents$' + Cr,
  dw = '__reactListeners$' + Cr,
  hw = '__reactHandles$' + Cr;
function Cn(e) {
  var t = e[wt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Nt] || n[wt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = xf(e); e !== null; ) {
          if ((n = e[wt])) return n;
          e = xf(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Li(e) {
  return (
    (e = e[wt] || e[Nt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Yn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(R(33));
}
function Rs(e) {
  return e[yi] || null;
}
var Pl = [],
  Xn = -1;
function mn(e) {
  return {current: e};
}
function ee(e) {
  0 > Xn || ((e.current = Pl[Xn]), (Pl[Xn] = null), Xn--);
}
function Z(e, t) {
  Xn++, (Pl[Xn] = e.current), (e.current = t);
}
var fn = {},
  Re = mn(fn),
  ze = mn(!1),
  An = fn;
function mr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return fn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Fe(e) {
  return (e = e.childContextTypes), e != null;
}
function qo() {
  ee(ze), ee(Re);
}
function Sf(e, t, n) {
  if (Re.current !== fn) throw Error(R(168));
  Z(Re, t), Z(ze, n);
}
function Qp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(R(108, Xy(e) || 'Unknown', i));
  return ue({}, n, r);
}
function Yo(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || fn),
    (An = Re.current),
    Z(Re, e),
    Z(ze, ze.current),
    !0
  );
}
function kf(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(R(169));
  n
    ? ((e = Qp(e, t, An)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ee(ze),
      ee(Re),
      Z(Re, e))
    : ee(ze),
    Z(ze, n);
}
var Ct = null,
  Ms = !1,
  ka = !1;
function Kp(e) {
  Ct === null ? (Ct = [e]) : Ct.push(e);
}
function pw(e) {
  (Ms = !0), Kp(e);
}
function vn() {
  if (!ka && Ct !== null) {
    ka = !0;
    var e = 0,
      t = X;
    try {
      var n = Ct;
      for (X = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ct = null), (Ms = !1);
    } catch (i) {
      throw (Ct !== null && (Ct = Ct.slice(e + 1)), wp(ku, vn), i);
    } finally {
      (X = t), (ka = !1);
    }
  }
  return null;
}
var Zn = [],
  Jn = 0,
  Xo = null,
  Zo = 0,
  et = [],
  tt = 0,
  Ln = null,
  _t = 1,
  bt = '';
function Sn(e, t) {
  (Zn[Jn++] = Zo), (Zn[Jn++] = Xo), (Xo = e), (Zo = t);
}
function qp(e, t, n) {
  (et[tt++] = _t), (et[tt++] = bt), (et[tt++] = Ln), (Ln = e);
  var r = _t;
  e = bt;
  var i = 32 - ft(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - ft(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    (o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (_t = (1 << (32 - ft(t) + i)) | (n << i) | r),
      (bt = o + e);
  } else (_t = (1 << o) | (n << i) | r), (bt = e);
}
function Mu(e) {
  e.return !== null && (Sn(e, 1), qp(e, 1, 0));
}
function Au(e) {
  for (; e === Xo; )
    (Xo = Zn[--Jn]), (Zn[Jn] = null), (Zo = Zn[--Jn]), (Zn[Jn] = null);
  for (; e === Ln; )
    (Ln = et[--tt]),
      (et[tt] = null),
      (bt = et[--tt]),
      (et[tt] = null),
      (_t = et[--tt]),
      (et[tt] = null);
}
var Ge = null,
  We = null,
  re = !1,
  ct = null;
function Yp(e, t) {
  var n = nt(5, null, null, 0);
  (n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ef(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ge = e), (We = tn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ge = e), (We = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Ln !== null ? {id: _t, overflow: bt} : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = nt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ge = e),
            (We = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Tl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Cl(e) {
  if (re) {
    var t = We;
    if (t) {
      var n = t;
      if (!Ef(e, t)) {
        if (Tl(e)) throw Error(R(418));
        t = tn(n.nextSibling);
        var r = Ge;
        t && Ef(e, t)
          ? Yp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (re = !1), (Ge = e));
      }
    } else {
      if (Tl(e)) throw Error(R(418));
      (e.flags = (e.flags & -4097) | 2), (re = !1), (Ge = e);
    }
  }
}
function Pf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ge = e;
}
function so(e) {
  if (e !== Ge) return !1;
  if (!re) return Pf(e), (re = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !Sl(e.type, e.memoizedProps))),
    t && (t = We))
  ) {
    if (Tl(e)) throw (Xp(), Error(R(418)));
    for (; t; ) Yp(e, t), (t = tn(t.nextSibling));
  }
  if ((Pf(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(R(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              We = tn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      We = null;
    }
  } else We = Ge ? tn(e.stateNode.nextSibling) : null;
  return !0;
}
function Xp() {
  for (var e = We; e; ) e = tn(e.nextSibling);
}
function vr() {
  (We = Ge = null), (re = !1);
}
function Lu(e) {
  ct === null ? (ct = [e]) : ct.push(e);
}
var mw = Vt.ReactCurrentBatchConfig;
function at(e, t) {
  if (e && e.defaultProps) {
    (t = ue({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Jo = mn(null),
  es = null,
  er = null,
  Nu = null;
function ju() {
  Nu = er = es = null;
}
function Du(e) {
  var t = Jo.current;
  ee(Jo), (e._currentValue = t);
}
function _l(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function dr(e, t) {
  (es = e),
    (Nu = er = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ve = !0), (e.firstContext = null));
}
function it(e) {
  var t = e._currentValue;
  if (Nu !== e)
    if (((e = {context: e, memoizedValue: t, next: null}), er === null)) {
      if (es === null) throw Error(R(308));
      (er = e), (es.dependencies = {lanes: 0, firstContext: e});
    } else er = er.next = e;
  return t;
}
var _n = null;
function Iu(e) {
  _n === null ? (_n = [e]) : _n.push(e);
}
function Zp(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Iu(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    jt(e, r)
  );
}
function jt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Wt = !1;
function Vu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {pending: null, interleaved: null, lanes: 0},
    effects: null,
  };
}
function Jp(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Rt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function nn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Q & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      jt(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Iu(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    jt(e, n)
  );
}
function Oo(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Eu(e, n);
  }
}
function Tf(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ts(e, t, n, r) {
  var i = e.updateQueue;
  Wt = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var l = a,
      u = l.next;
    (l.next = null), s === null ? (o = u) : (s.next = u), (s = l);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== s &&
        (a === null ? (c.firstBaseUpdate = u) : (a.next = u),
        (c.lastBaseUpdate = l)));
  }
  if (o !== null) {
    var f = i.baseState;
    (s = 0), (c = u = l = null), (a = o);
    do {
      var d = a.lane,
        h = a.eventTime;
      if ((r & d) === d) {
        c !== null &&
          (c = c.next =
            {
              eventTime: h,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var v = e,
            y = a;
          switch (((d = t), (h = n), y.tag)) {
            case 1:
              if (((v = y.payload), typeof v == 'function')) {
                f = v.call(h, f, d);
                break e;
              }
              f = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = y.payload),
                (d = typeof v == 'function' ? v.call(h, f, d) : v),
                d == null)
              )
                break e;
              f = ue({}, f, d);
              break e;
            case 2:
              Wt = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [a]) : d.push(a));
      } else
        (h = {
          eventTime: h,
          lane: d,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((u = c = h), (l = f)) : (c = c.next = h),
          (s |= d);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (d = a),
          (a = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (l = f),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (jn |= s), (e.lanes = s), (e.memoizedState = f);
  }
}
function Cf(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != 'function'))
          throw Error(R(191, i));
        i.call(r);
      }
    }
}
var em = new Zh.Component().refs;
function bl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ue({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var As = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Vn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ne(),
      i = on(e),
      o = Rt(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = nn(e, o, i)),
      t !== null && (dt(t, e, i, r), Oo(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ne(),
      i = on(e),
      o = Rt(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = nn(e, o, i)),
      t !== null && (dt(t, e, i, r), Oo(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ne(),
      r = on(e),
      i = Rt(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = nn(e, i, r)),
      t !== null && (dt(t, e, r, n), Oo(t, e, r));
  },
};
function _f(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !mi(n, r) || !mi(i, o)
      : !0
  );
}
function tm(e, t, n) {
  var r = !1,
    i = fn,
    o = t.contextType;
  return (
    typeof o == 'object' && o !== null
      ? (o = it(o))
      : ((i = Fe(t) ? An : Re.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? mr(e, i) : fn)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = As),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function bf(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && As.enqueueReplaceState(t, t.state, null);
}
function Ol(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = em), Vu(e);
  var o = t.contextType;
  typeof o == 'object' && o !== null
    ? (i.context = it(o))
    : ((o = Fe(t) ? An : Re.current), (i.context = mr(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == 'function' && (bl(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function' ||
      (typeof i.UNSAFE_componentWillMount != 'function' &&
        typeof i.componentWillMount != 'function') ||
      ((t = i.state),
      typeof i.componentWillMount == 'function' && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == 'function' &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && As.enqueueReplaceState(i, i.state, null),
      ts(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == 'function' && (e.flags |= 4194308);
}
function Dr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(R(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(R(147, e));
      var i = r,
        o = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var a = i.refs;
            a === em && (a = i.refs = {}),
              s === null ? delete a[o] : (a[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != 'string') throw Error(R(284));
    if (!n._owner) throw Error(R(290, e));
  }
  return e;
}
function ao(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      R(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e,
      ),
    ))
  );
}
function Of(e) {
  var t = e._init;
  return t(e._payload);
}
function nm(e) {
  function t(m, p) {
    if (e) {
      var g = m.deletions;
      g === null ? ((m.deletions = [p]), (m.flags |= 16)) : g.push(p);
    }
  }
  function n(m, p) {
    if (!e) return null;
    for (; p !== null; ) t(m, p), (p = p.sibling);
    return null;
  }
  function r(m, p) {
    for (m = new Map(); p !== null; )
      p.key !== null ? m.set(p.key, p) : m.set(p.index, p), (p = p.sibling);
    return m;
  }
  function i(m, p) {
    return (m = sn(m, p)), (m.index = 0), (m.sibling = null), m;
  }
  function o(m, p, g) {
    return (
      (m.index = g),
      e
        ? ((g = m.alternate),
          g !== null
            ? ((g = g.index), g < p ? ((m.flags |= 2), p) : g)
            : ((m.flags |= 2), p))
        : ((m.flags |= 1048576), p)
    );
  }
  function s(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function a(m, p, g, w) {
    return p === null || p.tag !== 6
      ? ((p = Oa(g, m.mode, w)), (p.return = m), p)
      : ((p = i(p, g)), (p.return = m), p);
  }
  function l(m, p, g, w) {
    var E = g.type;
    return E === Gn
      ? c(m, p, g.props.children, w, g.key)
      : p !== null &&
        (p.elementType === E ||
          (typeof E == 'object' &&
            E !== null &&
            E.$$typeof === Ht &&
            Of(E) === p.type))
      ? ((w = i(p, g.props)), (w.ref = Dr(m, p, g)), (w.return = m), w)
      : ((w = jo(g.type, g.key, g.props, null, m.mode, w)),
        (w.ref = Dr(m, p, g)),
        (w.return = m),
        w);
  }
  function u(m, p, g, w) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== g.containerInfo ||
      p.stateNode.implementation !== g.implementation
      ? ((p = Ra(g, m.mode, w)), (p.return = m), p)
      : ((p = i(p, g.children || [])), (p.return = m), p);
  }
  function c(m, p, g, w, E) {
    return p === null || p.tag !== 7
      ? ((p = Mn(g, m.mode, w, E)), (p.return = m), p)
      : ((p = i(p, g)), (p.return = m), p);
  }
  function f(m, p, g) {
    if ((typeof p == 'string' && p !== '') || typeof p == 'number')
      return (p = Oa('' + p, m.mode, g)), (p.return = m), p;
    if (typeof p == 'object' && p !== null) {
      switch (p.$$typeof) {
        case Yi:
          return (
            (g = jo(p.type, p.key, p.props, null, m.mode, g)),
            (g.ref = Dr(m, null, p)),
            (g.return = m),
            g
          );
        case Wn:
          return (p = Ra(p, m.mode, g)), (p.return = m), p;
        case Ht:
          var w = p._init;
          return f(m, w(p._payload), g);
      }
      if ($r(p) || Mr(p))
        return (p = Mn(p, m.mode, g, null)), (p.return = m), p;
      ao(m, p);
    }
    return null;
  }
  function d(m, p, g, w) {
    var E = p !== null ? p.key : null;
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return E !== null ? null : a(m, p, '' + g, w);
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case Yi:
          return g.key === E ? l(m, p, g, w) : null;
        case Wn:
          return g.key === E ? u(m, p, g, w) : null;
        case Ht:
          return (E = g._init), d(m, p, E(g._payload), w);
      }
      if ($r(g) || Mr(g)) return E !== null ? null : c(m, p, g, w, null);
      ao(m, g);
    }
    return null;
  }
  function h(m, p, g, w, E) {
    if ((typeof w == 'string' && w !== '') || typeof w == 'number')
      return (m = m.get(g) || null), a(p, m, '' + w, E);
    if (typeof w == 'object' && w !== null) {
      switch (w.$$typeof) {
        case Yi:
          return (m = m.get(w.key === null ? g : w.key) || null), l(p, m, w, E);
        case Wn:
          return (m = m.get(w.key === null ? g : w.key) || null), u(p, m, w, E);
        case Ht:
          var T = w._init;
          return h(m, p, g, T(w._payload), E);
      }
      if ($r(w) || Mr(w)) return (m = m.get(g) || null), c(p, m, w, E, null);
      ao(p, w);
    }
    return null;
  }
  function v(m, p, g, w) {
    for (
      var E = null, T = null, P = p, k = (p = 0), b = null;
      P !== null && k < g.length;
      k++
    ) {
      P.index > k ? ((b = P), (P = null)) : (b = P.sibling);
      var C = d(m, P, g[k], w);
      if (C === null) {
        P === null && (P = b);
        break;
      }
      e && P && C.alternate === null && t(m, P),
        (p = o(C, p, k)),
        T === null ? (E = C) : (T.sibling = C),
        (T = C),
        (P = b);
    }
    if (k === g.length) return n(m, P), re && Sn(m, k), E;
    if (P === null) {
      for (; k < g.length; k++)
        (P = f(m, g[k], w)),
          P !== null &&
            ((p = o(P, p, k)), T === null ? (E = P) : (T.sibling = P), (T = P));
      return re && Sn(m, k), E;
    }
    for (P = r(m, P); k < g.length; k++)
      (b = h(P, m, k, g[k], w)),
        b !== null &&
          (e && b.alternate !== null && P.delete(b.key === null ? k : b.key),
          (p = o(b, p, k)),
          T === null ? (E = b) : (T.sibling = b),
          (T = b));
    return (
      e &&
        P.forEach(function (M) {
          return t(m, M);
        }),
      re && Sn(m, k),
      E
    );
  }
  function y(m, p, g, w) {
    var E = Mr(g);
    if (typeof E != 'function') throw Error(R(150));
    if (((g = E.call(g)), g == null)) throw Error(R(151));
    for (
      var T = (E = null), P = p, k = (p = 0), b = null, C = g.next();
      P !== null && !C.done;
      k++, C = g.next()
    ) {
      P.index > k ? ((b = P), (P = null)) : (b = P.sibling);
      var M = d(m, P, C.value, w);
      if (M === null) {
        P === null && (P = b);
        break;
      }
      e && P && M.alternate === null && t(m, P),
        (p = o(M, p, k)),
        T === null ? (E = M) : (T.sibling = M),
        (T = M),
        (P = b);
    }
    if (C.done) return n(m, P), re && Sn(m, k), E;
    if (P === null) {
      for (; !C.done; k++, C = g.next())
        (C = f(m, C.value, w)),
          C !== null &&
            ((p = o(C, p, k)), T === null ? (E = C) : (T.sibling = C), (T = C));
      return re && Sn(m, k), E;
    }
    for (P = r(m, P); !C.done; k++, C = g.next())
      (C = h(P, m, k, C.value, w)),
        C !== null &&
          (e && C.alternate !== null && P.delete(C.key === null ? k : C.key),
          (p = o(C, p, k)),
          T === null ? (E = C) : (T.sibling = C),
          (T = C));
    return (
      e &&
        P.forEach(function (V) {
          return t(m, V);
        }),
      re && Sn(m, k),
      E
    );
  }
  function x(m, p, g, w) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === Gn &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case Yi:
          e: {
            for (var E = g.key, T = p; T !== null; ) {
              if (T.key === E) {
                if (((E = g.type), E === Gn)) {
                  if (T.tag === 7) {
                    n(m, T.sibling),
                      (p = i(T, g.props.children)),
                      (p.return = m),
                      (m = p);
                    break e;
                  }
                } else if (
                  T.elementType === E ||
                  (typeof E == 'object' &&
                    E !== null &&
                    E.$$typeof === Ht &&
                    Of(E) === T.type)
                ) {
                  n(m, T.sibling),
                    (p = i(T, g.props)),
                    (p.ref = Dr(m, T, g)),
                    (p.return = m),
                    (m = p);
                  break e;
                }
                n(m, T);
                break;
              } else t(m, T);
              T = T.sibling;
            }
            g.type === Gn
              ? ((p = Mn(g.props.children, m.mode, w, g.key)),
                (p.return = m),
                (m = p))
              : ((w = jo(g.type, g.key, g.props, null, m.mode, w)),
                (w.ref = Dr(m, p, g)),
                (w.return = m),
                (m = w));
          }
          return s(m);
        case Wn:
          e: {
            for (T = g.key; p !== null; ) {
              if (p.key === T)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === g.containerInfo &&
                  p.stateNode.implementation === g.implementation
                ) {
                  n(m, p.sibling),
                    (p = i(p, g.children || [])),
                    (p.return = m),
                    (m = p);
                  break e;
                } else {
                  n(m, p);
                  break;
                }
              else t(m, p);
              p = p.sibling;
            }
            (p = Ra(g, m.mode, w)), (p.return = m), (m = p);
          }
          return s(m);
        case Ht:
          return (T = g._init), x(m, p, T(g._payload), w);
      }
      if ($r(g)) return v(m, p, g, w);
      if (Mr(g)) return y(m, p, g, w);
      ao(m, g);
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        p !== null && p.tag === 6
          ? (n(m, p.sibling), (p = i(p, g)), (p.return = m), (m = p))
          : (n(m, p), (p = Oa(g, m.mode, w)), (p.return = m), (m = p)),
        s(m))
      : n(m, p);
  }
  return x;
}
var gr = nm(!0),
  rm = nm(!1),
  Ni = {},
  St = mn(Ni),
  wi = mn(Ni),
  xi = mn(Ni);
function bn(e) {
  if (e === Ni) throw Error(R(174));
  return e;
}
function zu(e, t) {
  switch ((Z(xi, t), Z(wi, e), Z(St, Ni), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : al(null, '');
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = al(t, e));
  }
  ee(St), Z(St, t);
}
function yr() {
  ee(St), ee(wi), ee(xi);
}
function im(e) {
  bn(xi.current);
  var t = bn(St.current),
    n = al(t, e.type);
  t !== n && (Z(wi, e), Z(St, n));
}
function Fu(e) {
  wi.current === e && (ee(St), ee(wi));
}
var se = mn(0);
function ns(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Ea = [];
function Bu() {
  for (var e = 0; e < Ea.length; e++)
    Ea[e]._workInProgressVersionPrimary = null;
  Ea.length = 0;
}
var Ro = Vt.ReactCurrentDispatcher,
  Pa = Vt.ReactCurrentBatchConfig,
  Nn = 0,
  le = null,
  ge = null,
  xe = null,
  rs = !1,
  ei = !1,
  Si = 0,
  vw = 0;
function _e() {
  throw Error(R(321));
}
function Uu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!ht(e[n], t[n])) return !1;
  return !0;
}
function $u(e, t, n, r, i, o) {
  if (
    ((Nn = o),
    (le = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ro.current = e === null || e.memoizedState === null ? xw : Sw),
    (e = n(r, i)),
    ei)
  ) {
    o = 0;
    do {
      if (((ei = !1), (Si = 0), 25 <= o)) throw Error(R(301));
      (o += 1),
        (xe = ge = null),
        (t.updateQueue = null),
        (Ro.current = kw),
        (e = n(r, i));
    } while (ei);
  }
  if (
    ((Ro.current = is),
    (t = ge !== null && ge.next !== null),
    (Nn = 0),
    (xe = ge = le = null),
    (rs = !1),
    t)
  )
    throw Error(R(300));
  return e;
}
function Hu() {
  var e = Si !== 0;
  return (Si = 0), e;
}
function vt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return xe === null ? (le.memoizedState = xe = e) : (xe = xe.next = e), xe;
}
function ot() {
  if (ge === null) {
    var e = le.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ge.next;
  var t = xe === null ? le.memoizedState : xe.next;
  if (t !== null) (xe = t), (ge = e);
  else {
    if (e === null) throw Error(R(310));
    (ge = e),
      (e = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null,
      }),
      xe === null ? (le.memoizedState = xe = e) : (xe = xe.next = e);
  }
  return xe;
}
function ki(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function Ta(e) {
  var t = ot(),
    n = t.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = e;
  var r = ge,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = o.next), (o.next = s);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var a = (s = null),
      l = null,
      u = o;
    do {
      var c = u.lane;
      if ((Nn & c) === c)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        l === null ? ((a = l = f), (s = r)) : (l = l.next = f),
          (le.lanes |= c),
          (jn |= c);
      }
      u = u.next;
    } while (u !== null && u !== o);
    l === null ? (s = r) : (l.next = a),
      ht(r, t.memoizedState) || (Ve = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (le.lanes |= o), (jn |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ca(e) {
  var t = ot(),
    n = t.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (o = e(o, s.action)), (s = s.next);
    while (s !== i);
    ht(o, t.memoizedState) || (Ve = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function om() {}
function sm(e, t) {
  var n = le,
    r = ot(),
    i = t(),
    o = !ht(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (Ve = !0)),
    (r = r.queue),
    Wu(um.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (xe !== null && xe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Ei(9, lm.bind(null, n, r, i, t), void 0, null),
      Se === null)
    )
      throw Error(R(349));
    Nn & 30 || am(n, t, i);
  }
  return i;
}
function am(e, t, n) {
  (e.flags |= 16384),
    (e = {getSnapshot: t, value: n}),
    (t = le.updateQueue),
    t === null
      ? ((t = {lastEffect: null, stores: null}),
        (le.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function lm(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), cm(t) && fm(e);
}
function um(e, t, n) {
  return n(function () {
    cm(t) && fm(e);
  });
}
function cm(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ht(e, n);
  } catch {
    return !0;
  }
}
function fm(e) {
  var t = jt(e, 1);
  t !== null && dt(t, e, 1, -1);
}
function Rf(e) {
  var t = vt();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ki,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = ww.bind(null, le, e)),
    [t.memoizedState, e]
  );
}
function Ei(e, t, n, r) {
  return (
    (e = {tag: e, create: t, destroy: n, deps: r, next: null}),
    (t = le.updateQueue),
    t === null
      ? ((t = {lastEffect: null, stores: null}),
        (le.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function dm() {
  return ot().memoizedState;
}
function Mo(e, t, n, r) {
  var i = vt();
  (le.flags |= e),
    (i.memoizedState = Ei(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ls(e, t, n, r) {
  var i = ot();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ge !== null) {
    var s = ge.memoizedState;
    if (((o = s.destroy), r !== null && Uu(r, s.deps))) {
      i.memoizedState = Ei(t, n, o, r);
      return;
    }
  }
  (le.flags |= e), (i.memoizedState = Ei(1 | t, n, o, r));
}
function Mf(e, t) {
  return Mo(8390656, 8, e, t);
}
function Wu(e, t) {
  return Ls(2048, 8, e, t);
}
function hm(e, t) {
  return Ls(4, 2, e, t);
}
function pm(e, t) {
  return Ls(4, 4, e, t);
}
function mm(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function vm(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Ls(4, 4, mm.bind(null, t, e), n)
  );
}
function Gu() {}
function gm(e, t) {
  var n = ot();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Uu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function ym(e, t) {
  var n = ot();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Uu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function wm(e, t, n) {
  return Nn & 21
    ? (ht(n, t) || ((n = kp()), (le.lanes |= n), (jn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ve = !0)), (e.memoizedState = n));
}
function gw(e, t) {
  var n = X;
  (X = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Pa.transition;
  Pa.transition = {};
  try {
    e(!1), t();
  } finally {
    (X = n), (Pa.transition = r);
  }
}
function xm() {
  return ot().memoizedState;
}
function yw(e, t, n) {
  var r = on(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Sm(e))
  )
    km(t, n);
  else if (((n = Zp(e, t, n, r)), n !== null)) {
    var i = Ne();
    dt(n, e, r, i), Em(n, t, r);
  }
}
function ww(e, t, n) {
  var r = on(e),
    i = {lane: r, action: n, hasEagerState: !1, eagerState: null, next: null};
  if (Sm(e)) km(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          a = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), ht(a, s))) {
          var l = t.interleaved;
          l === null
            ? ((i.next = i), Iu(t))
            : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = Zp(e, t, i, r)),
      n !== null && ((i = Ne()), dt(n, e, r, i), Em(n, t, r));
  }
}
function Sm(e) {
  var t = e.alternate;
  return e === le || (t !== null && t === le);
}
function km(e, t) {
  ei = rs = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Em(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Eu(e, n);
  }
}
var is = {
    readContext: it,
    useCallback: _e,
    useContext: _e,
    useEffect: _e,
    useImperativeHandle: _e,
    useInsertionEffect: _e,
    useLayoutEffect: _e,
    useMemo: _e,
    useReducer: _e,
    useRef: _e,
    useState: _e,
    useDebugValue: _e,
    useDeferredValue: _e,
    useTransition: _e,
    useMutableSource: _e,
    useSyncExternalStore: _e,
    useId: _e,
    unstable_isNewReconciler: !1,
  },
  xw = {
    readContext: it,
    useCallback: function (e, t) {
      return (vt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: it,
    useEffect: Mf,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Mo(4194308, 4, mm.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Mo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Mo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = vt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = vt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = yw.bind(null, le, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = vt();
      return (e = {current: e}), (t.memoizedState = e);
    },
    useState: Rf,
    useDebugValue: Gu,
    useDeferredValue: function (e) {
      return (vt().memoizedState = e);
    },
    useTransition: function () {
      var e = Rf(!1),
        t = e[0];
      return (e = gw.bind(null, e[1])), (vt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = le,
        i = vt();
      if (re) {
        if (n === void 0) throw Error(R(407));
        n = n();
      } else {
        if (((n = t()), Se === null)) throw Error(R(349));
        Nn & 30 || am(r, t, n);
      }
      i.memoizedState = n;
      var o = {value: n, getSnapshot: t};
      return (
        (i.queue = o),
        Mf(um.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Ei(9, lm.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = vt(),
        t = Se.identifierPrefix;
      if (re) {
        var n = bt,
          r = _t;
        (n = (r & ~(1 << (32 - ft(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Si++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':');
      } else (n = vw++), (t = ':' + t + 'r' + n.toString(32) + ':');
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Sw = {
    readContext: it,
    useCallback: gm,
    useContext: it,
    useEffect: Wu,
    useImperativeHandle: vm,
    useInsertionEffect: hm,
    useLayoutEffect: pm,
    useMemo: ym,
    useReducer: Ta,
    useRef: dm,
    useState: function () {
      return Ta(ki);
    },
    useDebugValue: Gu,
    useDeferredValue: function (e) {
      var t = ot();
      return wm(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Ta(ki)[0],
        t = ot().memoizedState;
      return [e, t];
    },
    useMutableSource: om,
    useSyncExternalStore: sm,
    useId: xm,
    unstable_isNewReconciler: !1,
  },
  kw = {
    readContext: it,
    useCallback: gm,
    useContext: it,
    useEffect: Wu,
    useImperativeHandle: vm,
    useInsertionEffect: hm,
    useLayoutEffect: pm,
    useMemo: ym,
    useReducer: Ca,
    useRef: dm,
    useState: function () {
      return Ca(ki);
    },
    useDebugValue: Gu,
    useDeferredValue: function (e) {
      var t = ot();
      return ge === null ? (t.memoizedState = e) : wm(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Ca(ki)[0],
        t = ot().memoizedState;
      return [e, t];
    },
    useMutableSource: om,
    useSyncExternalStore: sm,
    useId: xm,
    unstable_isNewReconciler: !1,
  };
function wr(e, t) {
  try {
    var n = '',
      r = t;
    do (n += Yy(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return {value: e, source: t, stack: i, digest: null};
}
function _a(e, t, n) {
  return {value: e, source: null, stack: n ?? null, digest: t ?? null};
}
function Rl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Ew = typeof WeakMap == 'function' ? WeakMap : Map;
function Pm(e, t, n) {
  (n = Rt(-1, n)), (n.tag = 3), (n.payload = {element: null});
  var r = t.value;
  return (
    (n.callback = function () {
      ss || ((ss = !0), (Fl = r)), Rl(e, t);
    }),
    n
  );
}
function Tm(e, t, n) {
  (n = Rt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Rl(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (n.callback = function () {
        Rl(e, t),
          typeof r != 'function' &&
            (rn === null ? (rn = new Set([this])) : rn.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {componentStack: s !== null ? s : ''});
      }),
    n
  );
}
function Af(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ew();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Iw.bind(null, e, t, n)), t.then(e, e));
}
function Lf(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Nf(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Rt(-1, 1)), (t.tag = 2), nn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Pw = Vt.ReactCurrentOwner,
  Ve = !1;
function Le(e, t, n, r) {
  t.child = e === null ? rm(t, null, n, r) : gr(t, e.child, n, r);
}
function jf(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    dr(t, i),
    (r = $u(e, t, n, r, o, i)),
    (n = Hu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Dt(e, t, i))
      : (re && n && Mu(t), (t.flags |= 1), Le(e, t, r, i), t.child)
  );
}
function Df(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == 'function' &&
      !ec(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Cm(e, t, o, r, i))
      : ((e = jo(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : mi), n(s, r) && e.ref === t.ref)
    )
      return Dt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = sn(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Cm(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (mi(o, r) && e.ref === t.ref)
      if (((Ve = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (Ve = !0);
      else return (t.lanes = e.lanes), Dt(e, t, i);
  }
  return Ml(e, t, n, r, i);
}
function _m(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      (t.memoizedState = {baseLanes: 0, cachePool: null, transitions: null}),
        Z(nr, He),
        (He |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Z(nr, He),
          (He |= e),
          null
        );
      (t.memoizedState = {baseLanes: 0, cachePool: null, transitions: null}),
        (r = o !== null ? o.baseLanes : n),
        Z(nr, He),
        (He |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Z(nr, He),
      (He |= r);
  return Le(e, t, i, n), t.child;
}
function bm(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ml(e, t, n, r, i) {
  var o = Fe(n) ? An : Re.current;
  return (
    (o = mr(t, o)),
    dr(t, i),
    (n = $u(e, t, n, r, o, i)),
    (r = Hu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Dt(e, t, i))
      : (re && r && Mu(t), (t.flags |= 1), Le(e, t, n, i), t.child)
  );
}
function If(e, t, n, r, i) {
  if (Fe(n)) {
    var o = !0;
    Yo(t);
  } else o = !1;
  if ((dr(t, i), t.stateNode === null))
    Ao(e, t), tm(t, n, r), Ol(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps;
    s.props = a;
    var l = s.context,
      u = n.contextType;
    typeof u == 'object' && u !== null
      ? (u = it(u))
      : ((u = Fe(n) ? An : Re.current), (u = mr(t, u)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == 'function' ||
        typeof s.getSnapshotBeforeUpdate == 'function';
    f ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((a !== r || l !== u) && bf(t, s, r, u)),
      (Wt = !1);
    var d = t.memoizedState;
    (s.state = d),
      ts(t, r, s, i),
      (l = t.memoizedState),
      a !== r || d !== l || ze.current || Wt
        ? (typeof c == 'function' && (bl(t, n, c, r), (l = t.memoizedState)),
          (a = Wt || _f(t, n, a, r, d, l, u))
            ? (f ||
                (typeof s.UNSAFE_componentWillMount != 'function' &&
                  typeof s.componentWillMount != 'function') ||
                (typeof s.componentWillMount == 'function' &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == 'function' &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (s.props = r),
          (s.state = l),
          (s.context = u),
          (r = a))
        : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Jp(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : at(t.type, a)),
      (s.props = u),
      (f = t.pendingProps),
      (d = s.context),
      (l = n.contextType),
      typeof l == 'object' && l !== null
        ? (l = it(l))
        : ((l = Fe(n) ? An : Re.current), (l = mr(t, l)));
    var h = n.getDerivedStateFromProps;
    (c =
      typeof h == 'function' ||
      typeof s.getSnapshotBeforeUpdate == 'function') ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((a !== f || d !== l) && bf(t, s, r, l)),
      (Wt = !1),
      (d = t.memoizedState),
      (s.state = d),
      ts(t, r, s, i);
    var v = t.memoizedState;
    a !== f || d !== v || ze.current || Wt
      ? (typeof h == 'function' && (bl(t, n, h, r), (v = t.memoizedState)),
        (u = Wt || _f(t, n, u, r, d, v, l) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                typeof s.componentWillUpdate != 'function') ||
              (typeof s.componentWillUpdate == 'function' &&
                s.componentWillUpdate(r, v, l),
              typeof s.UNSAFE_componentWillUpdate == 'function' &&
                s.UNSAFE_componentWillUpdate(r, v, l)),
            typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != 'function' ||
              (a === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != 'function' ||
              (a === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (s.props = r),
        (s.state = v),
        (s.context = l),
        (r = u))
      : (typeof s.componentDidUpdate != 'function' ||
          (a === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != 'function' ||
          (a === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Al(e, t, n, r, o, i);
}
function Al(e, t, n, r, i, o) {
  bm(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && kf(t, n, !1), Dt(e, t, o);
  (r = t.stateNode), (Pw.current = t);
  var a =
    s && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = gr(t, e.child, null, o)), (t.child = gr(t, null, a, o)))
      : Le(e, t, a, o),
    (t.memoizedState = r.state),
    i && kf(t, n, !0),
    t.child
  );
}
function Om(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Sf(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Sf(e, t.context, !1),
    zu(e, t.containerInfo);
}
function Vf(e, t, n, r, i) {
  return vr(), Lu(i), (t.flags |= 256), Le(e, t, n, r), t.child;
}
var Ll = {dehydrated: null, treeContext: null, retryLane: 0};
function Nl(e) {
  return {baseLanes: e, cachePool: null, transitions: null};
}
function Rm(e, t, n) {
  var r = t.pendingProps,
    i = se.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    a;
  if (
    ((a = s) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    Z(se, i & 1),
    e === null)
  )
    return (
      Cl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = {mode: 'hidden', children: s}),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = Ds(s, r, 0, null)),
              (e = Mn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Nl(n)),
              (t.memoizedState = Ll),
              e)
            : Qu(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return Tw(e, t, s, r, a, i, n);
  if (o) {
    (o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
    var l = {mode: 'hidden', children: r.children};
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (t.deletions = null))
        : ((r = sn(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (o = sn(a, o)) : ((o = Mn(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Nl(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ll),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = sn(o, {mode: 'visible', children: r.children})),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Qu(e, t) {
  return (
    (t = Ds({mode: 'visible', children: t}, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function lo(e, t, n, r) {
  return (
    r !== null && Lu(r),
    gr(t, e.child, null, n),
    (e = Qu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Tw(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = _a(Error(R(422)))), lo(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = Ds({mode: 'visible', children: r.children}, i, 0, null)),
        (o = Mn(o, i, s, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && gr(t, e.child, null, s),
        (t.child.memoizedState = Nl(s)),
        (t.memoizedState = Ll),
        o);
  if (!(t.mode & 1)) return lo(e, t, s, null);
  if (i.data === '$!') {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (o = Error(R(419))), (r = _a(o, r, void 0)), lo(e, t, s, r);
  }
  if (((a = (s & e.childLanes) !== 0), Ve || a)) {
    if (((r = Se), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), jt(e, i), dt(r, e, i, -1));
    }
    return Ju(), (r = _a(Error(R(421)))), lo(e, t, s, r);
  }
  return i.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Vw.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (We = tn(i.nextSibling)),
      (Ge = t),
      (re = !0),
      (ct = null),
      e !== null &&
        ((et[tt++] = _t),
        (et[tt++] = bt),
        (et[tt++] = Ln),
        (_t = e.id),
        (bt = e.overflow),
        (Ln = t)),
      (t = Qu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function zf(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), _l(e.return, t, n);
}
function ba(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function Mm(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((Le(e, t, r.children, n), (r = se.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && zf(e, n, t);
        else if (e.tag === 19) zf(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Z(se, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case 'forwards':
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ns(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          ba(t, !1, i, n, o);
        break;
      case 'backwards':
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ns(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        ba(t, !0, n, null, o);
        break;
      case 'together':
        ba(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ao(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Dt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (jn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(R(153));
  if (t.child !== null) {
    for (
      e = t.child, n = sn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = sn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Cw(e, t, n) {
  switch (t.tag) {
    case 3:
      Om(t), vr();
      break;
    case 5:
      im(t);
      break;
    case 1:
      Fe(t.type) && Yo(t);
      break;
    case 4:
      zu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Z(Jo, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Z(se, se.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Rm(e, t, n)
          : (Z(se, se.current & 1),
            (e = Dt(e, t, n)),
            e !== null ? e.sibling : null);
      Z(se, se.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Mm(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Z(se, se.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), _m(e, t, n);
  }
  return Dt(e, t, n);
}
var Am, jl, Lm, Nm;
Am = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
jl = function () {};
Lm = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), bn(St.current);
    var o = null;
    switch (n) {
      case 'input':
        (i = rl(e, i)), (r = rl(e, r)), (o = []);
        break;
      case 'select':
        (i = ue({}, i, {value: void 0})),
          (r = ue({}, r, {value: void 0})),
          (o = []);
        break;
      case 'textarea':
        (i = sl(e, i)), (r = sl(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = Ko);
    }
    ll(n, r);
    var s;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === 'style') {
          var a = i[u];
          for (s in a) a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (li.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((a = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && l !== a && (l != null || a != null))
      )
        if (u === 'style')
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) ||
                (l && l.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ''));
            for (s in l)
              l.hasOwnProperty(s) &&
                a[s] !== l[s] &&
                (n || (n = {}), (n[s] = l[s]));
          } else n || (o || (o = []), o.push(u, n)), (n = l);
        else
          u === 'dangerouslySetInnerHTML'
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (o = o || []).push(u, l))
            : u === 'children'
            ? (typeof l != 'string' && typeof l != 'number') ||
              (o = o || []).push(u, '' + l)
            : u !== 'suppressContentEditableWarning' &&
              u !== 'suppressHydrationWarning' &&
              (li.hasOwnProperty(u)
                ? (l != null && u === 'onScroll' && J('scroll', e),
                  o || a === l || (o = []))
                : (o = o || []).push(u, l));
    }
    n && (o = o || []).push('style', n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Nm = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ir(e, t) {
  if (!re)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function be(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function _w(e, t, n) {
  var r = t.pendingProps;
  switch ((Au(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return be(t), null;
    case 1:
      return Fe(t.type) && qo(), be(t), null;
    case 3:
      return (
        (r = t.stateNode),
        yr(),
        ee(ze),
        ee(Re),
        Bu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (so(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), ct !== null && ($l(ct), (ct = null)))),
        jl(e, t),
        be(t),
        null
      );
    case 5:
      Fu(t);
      var i = bn(xi.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Lm(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(R(166));
          return be(t), null;
        }
        if (((e = bn(St.current)), so(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[wt] = t), (r[yi] = o), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              J('cancel', r), J('close', r);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              J('load', r);
              break;
            case 'video':
            case 'audio':
              for (i = 0; i < Wr.length; i++) J(Wr[i], r);
              break;
            case 'source':
              J('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              J('error', r), J('load', r);
              break;
            case 'details':
              J('toggle', r);
              break;
            case 'input':
              Qc(r, o), J('invalid', r);
              break;
            case 'select':
              (r._wrapperState = {wasMultiple: !!o.multiple}), J('invalid', r);
              break;
            case 'textarea':
              qc(r, o), J('invalid', r);
          }
          ll(n, o), (i = null);
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var a = o[s];
              s === 'children'
                ? typeof a == 'string'
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      oo(r.textContent, a, e),
                    (i = ['children', a]))
                  : typeof a == 'number' &&
                    r.textContent !== '' + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      oo(r.textContent, a, e),
                    (i = ['children', '' + a]))
                : li.hasOwnProperty(s) &&
                  a != null &&
                  s === 'onScroll' &&
                  J('scroll', r);
            }
          switch (n) {
            case 'input':
              Xi(r), Kc(r, o, !0);
              break;
            case 'textarea':
              Xi(r), Yc(r);
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof o.onClick == 'function' && (r.onclick = Ko);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = ap(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = s.createElement('div')),
                  (e.innerHTML = '<script></script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                ? (e = s.createElement(n, {is: r.is}))
                : ((e = s.createElement(n)),
                  n === 'select' &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[wt] = t),
            (e[yi] = r),
            Am(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = ul(n, r)), n)) {
              case 'dialog':
                J('cancel', e), J('close', e), (i = r);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                J('load', e), (i = r);
                break;
              case 'video':
              case 'audio':
                for (i = 0; i < Wr.length; i++) J(Wr[i], e);
                i = r;
                break;
              case 'source':
                J('error', e), (i = r);
                break;
              case 'img':
              case 'image':
              case 'link':
                J('error', e), J('load', e), (i = r);
                break;
              case 'details':
                J('toggle', e), (i = r);
                break;
              case 'input':
                Qc(e, r), (i = rl(e, r)), J('invalid', e);
                break;
              case 'option':
                i = r;
                break;
              case 'select':
                (e._wrapperState = {wasMultiple: !!r.multiple}),
                  (i = ue({}, r, {value: void 0})),
                  J('invalid', e);
                break;
              case 'textarea':
                qc(e, r), (i = sl(e, r)), J('invalid', e);
                break;
              default:
                i = r;
            }
            ll(n, i), (a = i);
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var l = a[o];
                o === 'style'
                  ? cp(e, l)
                  : o === 'dangerouslySetInnerHTML'
                  ? ((l = l ? l.__html : void 0), l != null && lp(e, l))
                  : o === 'children'
                  ? typeof l == 'string'
                    ? (n !== 'textarea' || l !== '') && ui(e, l)
                    : typeof l == 'number' && ui(e, '' + l)
                  : o !== 'suppressContentEditableWarning' &&
                    o !== 'suppressHydrationWarning' &&
                    o !== 'autoFocus' &&
                    (li.hasOwnProperty(o)
                      ? l != null && o === 'onScroll' && J('scroll', e)
                      : l != null && gu(e, o, l, s));
              }
            switch (n) {
              case 'input':
                Xi(e), Kc(e, r, !1);
                break;
              case 'textarea':
                Xi(e), Yc(e);
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + cn(r.value));
                break;
              case 'select':
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? lr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      lr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == 'function' && (e.onclick = Ko);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return be(t), null;
    case 6:
      if (e && t.stateNode != null) Nm(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(R(166));
        if (((n = bn(xi.current)), bn(St.current), so(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[wt] = t),
            (o = r.nodeValue !== n) && ((e = Ge), e !== null))
          )
            switch (e.tag) {
              case 3:
                oo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  oo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[wt] = t),
            (t.stateNode = r);
      }
      return be(t), null;
    case 13:
      if (
        (ee(se),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (re && We !== null && t.mode & 1 && !(t.flags & 128))
          Xp(), vr(), (t.flags |= 98560), (o = !1);
        else if (((o = so(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(R(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(R(317));
            o[wt] = t;
          } else
            vr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          be(t), (o = !1);
        } else ct !== null && ($l(ct), (ct = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || se.current & 1 ? ye === 0 && (ye = 3) : Ju())),
          t.updateQueue !== null && (t.flags |= 4),
          be(t),
          null);
    case 4:
      return (
        yr(), jl(e, t), e === null && vi(t.stateNode.containerInfo), be(t), null
      );
    case 10:
      return Du(t.type._context), be(t), null;
    case 17:
      return Fe(t.type) && qo(), be(t), null;
    case 19:
      if ((ee(se), (o = t.memoizedState), o === null)) return be(t), null;
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) Ir(o, !1);
        else {
          if (ye !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = ns(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Ir(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {lanes: e.lanes, firstContext: e.firstContext})),
                    (n = n.sibling);
                return Z(se, (se.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            he() > xr &&
            ((t.flags |= 128), (r = !0), Ir(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ns(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Ir(o, !0),
              o.tail === null && o.tailMode === 'hidden' && !s.alternate && !re)
            )
              return be(t), null;
          } else
            2 * he() - o.renderingStartTime > xr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Ir(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = he()),
          (t.sibling = null),
          (n = se.current),
          Z(se, r ? (n & 1) | 2 : n & 1),
          t)
        : (be(t), null);
    case 22:
    case 23:
      return (
        Zu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? He & 1073741824 && (be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : be(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(R(156, t.tag));
}
function bw(e, t) {
  switch ((Au(t), t.tag)) {
    case 1:
      return (
        Fe(t.type) && qo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        yr(),
        ee(ze),
        ee(Re),
        Bu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Fu(t), null;
    case 13:
      if (
        (ee(se), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(R(340));
        vr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return ee(se), null;
    case 4:
      return yr(), null;
    case 10:
      return Du(t.type._context), null;
    case 22:
    case 23:
      return Zu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var uo = !1,
  Oe = !1,
  Ow = typeof WeakSet == 'function' ? WeakSet : Set,
  N = null;
function tr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        fe(e, t, r);
      }
    else n.current = null;
}
function Dl(e, t, n) {
  try {
    n();
  } catch (r) {
    fe(e, t, r);
  }
}
var Ff = !1;
function Rw(e, t) {
  if (((wl = Wo), (e = Vp()), Ru(e))) {
    if ('selectionStart' in e)
      var n = {start: e.selectionStart, end: e.selectionEnd};
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            a = -1,
            l = -1,
            u = 0,
            c = 0,
            f = e,
            d = null;
          t: for (;;) {
            for (
              var h;
              f !== n || (i !== 0 && f.nodeType !== 3) || (a = s + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (l = s + r),
                f.nodeType === 3 && (s += f.nodeValue.length),
                (h = f.firstChild) !== null;

            )
              (d = f), (f = h);
            for (;;) {
              if (f === e) break t;
              if (
                (d === n && ++u === i && (a = s),
                d === o && ++c === r && (l = s),
                (h = f.nextSibling) !== null)
              )
                break;
              (f = d), (d = f.parentNode);
            }
            f = h;
          }
          n = a === -1 || l === -1 ? null : {start: a, end: l};
        } else n = null;
      }
    n = n || {start: 0, end: 0};
  } else n = null;
  for (xl = {focusedElem: e, selectionRange: n}, Wo = !1, N = t; N !== null; )
    if (((t = N), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (N = e);
    else
      for (; N !== null; ) {
        t = N;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var y = v.memoizedProps,
                    x = v.memoizedState,
                    m = t.stateNode,
                    p = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : at(t.type, y),
                      x,
                    );
                  m.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = '')
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(R(163));
            }
        } catch (w) {
          fe(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (N = e);
          break;
        }
        N = t.return;
      }
  return (v = Ff), (Ff = !1), v;
}
function ti(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && Dl(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Ns(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Il(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function jm(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), jm(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[wt], delete t[yi], delete t[El], delete t[dw], delete t[hw])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Dm(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Bf(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Dm(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Vl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ko));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Vl(e, t, n), e = e.sibling; e !== null; ) Vl(e, t, n), (e = e.sibling);
}
function zl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (zl(e, t, n), e = e.sibling; e !== null; ) zl(e, t, n), (e = e.sibling);
}
var Ee = null,
  lt = !1;
function Ft(e, t, n) {
  for (n = n.child; n !== null; ) Im(e, t, n), (n = n.sibling);
}
function Im(e, t, n) {
  if (xt && typeof xt.onCommitFiberUnmount == 'function')
    try {
      xt.onCommitFiberUnmount(Cs, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Oe || tr(n, t);
    case 6:
      var r = Ee,
        i = lt;
      (Ee = null),
        Ft(e, t, n),
        (Ee = r),
        (lt = i),
        Ee !== null &&
          (lt
            ? ((e = Ee),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ee.removeChild(n.stateNode));
      break;
    case 18:
      Ee !== null &&
        (lt
          ? ((e = Ee),
            (n = n.stateNode),
            e.nodeType === 8
              ? Sa(e.parentNode, n)
              : e.nodeType === 1 && Sa(e, n),
            hi(e))
          : Sa(Ee, n.stateNode));
      break;
    case 4:
      (r = Ee),
        (i = lt),
        (Ee = n.stateNode.containerInfo),
        (lt = !0),
        Ft(e, t, n),
        (Ee = r),
        (lt = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Oe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          (o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && Dl(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      Ft(e, t, n);
      break;
    case 1:
      if (
        !Oe &&
        (tr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          fe(n, t, a);
        }
      Ft(e, t, n);
      break;
    case 21:
      Ft(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Oe = (r = Oe) || n.memoizedState !== null), Ft(e, t, n), (Oe = r))
        : Ft(e, t, n);
      break;
    default:
      Ft(e, t, n);
  }
}
function Uf(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ow()),
      t.forEach(function (r) {
        var i = zw.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function st(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          a = s;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (Ee = a.stateNode), (lt = !1);
              break e;
            case 3:
              (Ee = a.stateNode.containerInfo), (lt = !0);
              break e;
            case 4:
              (Ee = a.stateNode.containerInfo), (lt = !0);
              break e;
          }
          a = a.return;
        }
        if (Ee === null) throw Error(R(160));
        Im(o, s, i), (Ee = null), (lt = !1);
        var l = i.alternate;
        l !== null && (l.return = null), (i.return = null);
      } catch (u) {
        fe(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Vm(t, e), (t = t.sibling);
}
function Vm(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((st(t, e), mt(e), r & 4)) {
        try {
          ti(3, e, e.return), Ns(3, e);
        } catch (y) {
          fe(e, e.return, y);
        }
        try {
          ti(5, e, e.return);
        } catch (y) {
          fe(e, e.return, y);
        }
      }
      break;
    case 1:
      st(t, e), mt(e), r & 512 && n !== null && tr(n, n.return);
      break;
    case 5:
      if (
        (st(t, e),
        mt(e),
        r & 512 && n !== null && tr(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          ui(i, '');
        } catch (y) {
          fe(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          a = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            a === 'input' && o.type === 'radio' && o.name != null && op(i, o),
              ul(a, s);
            var u = ul(a, o);
            for (s = 0; s < l.length; s += 2) {
              var c = l[s],
                f = l[s + 1];
              c === 'style'
                ? cp(i, f)
                : c === 'dangerouslySetInnerHTML'
                ? lp(i, f)
                : c === 'children'
                ? ui(i, f)
                : gu(i, c, f, u);
            }
            switch (a) {
              case 'input':
                il(i, o);
                break;
              case 'textarea':
                sp(i, o);
                break;
              case 'select':
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var h = o.value;
                h != null
                  ? lr(i, !!o.multiple, h, !1)
                  : d !== !!o.multiple &&
                    (o.defaultValue != null
                      ? lr(i, !!o.multiple, o.defaultValue, !0)
                      : lr(i, !!o.multiple, o.multiple ? [] : '', !1));
            }
            i[yi] = o;
          } catch (y) {
            fe(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((st(t, e), mt(e), r & 4)) {
        if (e.stateNode === null) throw Error(R(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (y) {
          fe(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (st(t, e), mt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          hi(t.containerInfo);
        } catch (y) {
          fe(e, e.return, y);
        }
      break;
    case 4:
      st(t, e), mt(e);
      break;
    case 13:
      st(t, e),
        mt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Yu = he())),
        r & 4 && Uf(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Oe = (u = Oe) || c), st(t, e), (Oe = u)) : st(t, e),
        mt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (N = e, c = e.child; c !== null; ) {
            for (f = N = c; N !== null; ) {
              switch (((d = N), (h = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ti(4, d, d.return);
                  break;
                case 1:
                  tr(d, d.return);
                  var v = d.stateNode;
                  if (typeof v.componentWillUnmount == 'function') {
                    (r = d), (n = d.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (y) {
                      fe(r, n, y);
                    }
                  }
                  break;
                case 5:
                  tr(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    Hf(f);
                    continue;
                  }
              }
              h !== null ? ((h.return = d), (N = h)) : Hf(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (i = f.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == 'function'
                        ? o.setProperty('display', 'none', 'important')
                        : (o.display = 'none'))
                    : ((a = f.stateNode),
                      (l = f.memoizedProps.style),
                      (s =
                        l != null && l.hasOwnProperty('display')
                          ? l.display
                          : null),
                      (a.style.display = up('display', s)));
              } catch (y) {
                fe(e, e.return, y);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = u ? '' : f.memoizedProps;
              } catch (y) {
                fe(e, e.return, y);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      st(t, e), mt(e), r & 4 && Uf(e);
      break;
    case 21:
      break;
    default:
      st(t, e), mt(e);
  }
}
function mt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Dm(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(R(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (ui(i, ''), (r.flags &= -33));
          var o = Bf(e);
          zl(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = Bf(e);
          Vl(e, a, s);
          break;
        default:
          throw Error(R(161));
      }
    } catch (l) {
      fe(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Mw(e, t, n) {
  (N = e), zm(e);
}
function zm(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var i = N,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || uo;
      if (!s) {
        var a = i.alternate,
          l = (a !== null && a.memoizedState !== null) || Oe;
        a = uo;
        var u = Oe;
        if (((uo = s), (Oe = l) && !u))
          for (N = i; N !== null; )
            (s = N),
              (l = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? Wf(i)
                : l !== null
                ? ((l.return = s), (N = l))
                : Wf(i);
        for (; o !== null; ) (N = o), zm(o), (o = o.sibling);
        (N = i), (uo = a), (Oe = u);
      }
      $f(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (N = o)) : $f(e);
  }
}
function $f(e) {
  for (; N !== null; ) {
    var t = N;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Oe || Ns(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Oe)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : at(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var o = t.updateQueue;
              o !== null && Cf(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Cf(t, s, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var l = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    l.autoFocus && n.focus();
                    break;
                  case 'img':
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && hi(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(R(163));
          }
        Oe || (t.flags & 512 && Il(t));
      } catch (d) {
        fe(t, t.return, d);
      }
    }
    if (t === e) {
      N = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (N = n);
      break;
    }
    N = t.return;
  }
}
function Hf(e) {
  for (; N !== null; ) {
    var t = N;
    if (t === e) {
      N = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (N = n);
      break;
    }
    N = t.return;
  }
}
function Wf(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ns(4, t);
          } catch (l) {
            fe(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              fe(t, i, l);
            }
          }
          var o = t.return;
          try {
            Il(t);
          } catch (l) {
            fe(t, o, l);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Il(t);
          } catch (l) {
            fe(t, s, l);
          }
      }
    } catch (l) {
      fe(t, t.return, l);
    }
    if (t === e) {
      N = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (N = a);
      break;
    }
    N = t.return;
  }
}
var Aw = Math.ceil,
  os = Vt.ReactCurrentDispatcher,
  Ku = Vt.ReactCurrentOwner,
  rt = Vt.ReactCurrentBatchConfig,
  Q = 0,
  Se = null,
  me = null,
  Pe = 0,
  He = 0,
  nr = mn(0),
  ye = 0,
  Pi = null,
  jn = 0,
  js = 0,
  qu = 0,
  ni = null,
  Ie = null,
  Yu = 0,
  xr = 1 / 0,
  Tt = null,
  ss = !1,
  Fl = null,
  rn = null,
  co = !1,
  Yt = null,
  as = 0,
  ri = 0,
  Bl = null,
  Lo = -1,
  No = 0;
function Ne() {
  return Q & 6 ? he() : Lo !== -1 ? Lo : (Lo = he());
}
function on(e) {
  return e.mode & 1
    ? Q & 2 && Pe !== 0
      ? Pe & -Pe
      : mw.transition !== null
      ? (No === 0 && (No = kp()), No)
      : ((e = X),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Op(e.type))),
        e)
    : 1;
}
function dt(e, t, n, r) {
  if (50 < ri) throw ((ri = 0), (Bl = null), Error(R(185)));
  Mi(e, n, r),
    (!(Q & 2) || e !== Se) &&
      (e === Se && (!(Q & 2) && (js |= n), ye === 4 && Kt(e, Pe)),
      Be(e, r),
      n === 1 && Q === 0 && !(t.mode & 1) && ((xr = he() + 500), Ms && vn()));
}
function Be(e, t) {
  var n = e.callbackNode;
  m0(e, t);
  var r = Ho(e, e === Se ? Pe : 0);
  if (r === 0)
    n !== null && Jc(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Jc(n), t === 1))
      e.tag === 0 ? pw(Gf.bind(null, e)) : Kp(Gf.bind(null, e)),
        cw(function () {
          !(Q & 6) && vn();
        }),
        (n = null);
    else {
      switch (Ep(r)) {
        case 1:
          n = ku;
          break;
        case 4:
          n = xp;
          break;
        case 16:
          n = $o;
          break;
        case 536870912:
          n = Sp;
          break;
        default:
          n = $o;
      }
      n = Qm(n, Fm.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Fm(e, t) {
  if (((Lo = -1), (No = 0), Q & 6)) throw Error(R(327));
  var n = e.callbackNode;
  if (hr() && e.callbackNode !== n) return null;
  var r = Ho(e, e === Se ? Pe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ls(e, r);
  else {
    t = r;
    var i = Q;
    Q |= 2;
    var o = Um();
    (Se !== e || Pe !== t) && ((Tt = null), (xr = he() + 500), Rn(e, t));
    do
      try {
        jw();
        break;
      } catch (a) {
        Bm(e, a);
      }
    while (1);
    ju(),
      (os.current = o),
      (Q = i),
      me !== null ? (t = 0) : ((Se = null), (Pe = 0), (t = ye));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = pl(e)), i !== 0 && ((r = i), (t = Ul(e, i)))), t === 1)
    )
      throw ((n = Pi), Rn(e, 0), Kt(e, r), Be(e, he()), n);
    if (t === 6) Kt(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Lw(i) &&
          ((t = ls(e, r)),
          t === 2 && ((o = pl(e)), o !== 0 && ((r = o), (t = Ul(e, o)))),
          t === 1))
      )
        throw ((n = Pi), Rn(e, 0), Kt(e, r), Be(e, he()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(R(345));
        case 2:
          kn(e, Ie, Tt);
          break;
        case 3:
          if (
            (Kt(e, r), (r & 130023424) === r && ((t = Yu + 500 - he()), 10 < t))
          ) {
            if (Ho(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Ne(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = kl(kn.bind(null, e, Ie, Tt), t);
            break;
          }
          kn(e, Ie, Tt);
          break;
        case 4:
          if ((Kt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - ft(r);
            (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
          }
          if (
            ((r = i),
            (r = he() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Aw(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = kl(kn.bind(null, e, Ie, Tt), r);
            break;
          }
          kn(e, Ie, Tt);
          break;
        case 5:
          kn(e, Ie, Tt);
          break;
        default:
          throw Error(R(329));
      }
    }
  }
  return Be(e, he()), e.callbackNode === n ? Fm.bind(null, e) : null;
}
function Ul(e, t) {
  var n = ni;
  return (
    e.current.memoizedState.isDehydrated && (Rn(e, t).flags |= 256),
    (e = ls(e, t)),
    e !== 2 && ((t = Ie), (Ie = n), t !== null && $l(t)),
    e
  );
}
function $l(e) {
  Ie === null ? (Ie = e) : Ie.push.apply(Ie, e);
}
function Lw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!ht(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Kt(e, t) {
  for (
    t &= ~qu,
      t &= ~js,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - ft(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Gf(e) {
  if (Q & 6) throw Error(R(327));
  hr();
  var t = Ho(e, 0);
  if (!(t & 1)) return Be(e, he()), null;
  var n = ls(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = pl(e);
    r !== 0 && ((t = r), (n = Ul(e, r)));
  }
  if (n === 1) throw ((n = Pi), Rn(e, 0), Kt(e, t), Be(e, he()), n);
  if (n === 6) throw Error(R(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    kn(e, Ie, Tt),
    Be(e, he()),
    null
  );
}
function Xu(e, t) {
  var n = Q;
  Q |= 1;
  try {
    return e(t);
  } finally {
    (Q = n), Q === 0 && ((xr = he() + 500), Ms && vn());
  }
}
function Dn(e) {
  Yt !== null && Yt.tag === 0 && !(Q & 6) && hr();
  var t = Q;
  Q |= 1;
  var n = rt.transition,
    r = X;
  try {
    if (((rt.transition = null), (X = 1), e)) return e();
  } finally {
    (X = r), (rt.transition = n), (Q = t), !(Q & 6) && vn();
  }
}
function Zu() {
  (He = nr.current), ee(nr);
}
function Rn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), uw(n)), me !== null))
    for (n = me.return; n !== null; ) {
      var r = n;
      switch ((Au(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && qo();
          break;
        case 3:
          yr(), ee(ze), ee(Re), Bu();
          break;
        case 5:
          Fu(r);
          break;
        case 4:
          yr();
          break;
        case 13:
          ee(se);
          break;
        case 19:
          ee(se);
          break;
        case 10:
          Du(r.type._context);
          break;
        case 22:
        case 23:
          Zu();
      }
      n = n.return;
    }
  if (
    ((Se = e),
    (me = e = sn(e.current, null)),
    (Pe = He = t),
    (ye = 0),
    (Pi = null),
    (qu = js = jn = 0),
    (Ie = ni = null),
    _n !== null)
  ) {
    for (t = 0; t < _n.length; t++)
      if (((n = _n[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          (o.next = i), (r.next = s);
        }
        n.pending = r;
      }
    _n = null;
  }
  return e;
}
function Bm(e, t) {
  do {
    var n = me;
    try {
      if ((ju(), (Ro.current = is), rs)) {
        for (var r = le.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        rs = !1;
      }
      if (
        ((Nn = 0),
        (xe = ge = le = null),
        (ei = !1),
        (Si = 0),
        (Ku.current = null),
        n === null || n.return === null)
      ) {
        (ye = 1), (Pi = t), (me = null);
        break;
      }
      e: {
        var o = e,
          s = n.return,
          a = n,
          l = t;
        if (
          ((t = Pe),
          (a.flags |= 32768),
          l !== null && typeof l == 'object' && typeof l.then == 'function')
        ) {
          var u = l,
            c = a,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d
              ? ((c.updateQueue = d.updateQueue),
                (c.memoizedState = d.memoizedState),
                (c.lanes = d.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var h = Lf(s);
          if (h !== null) {
            (h.flags &= -257),
              Nf(h, s, a, o, t),
              h.mode & 1 && Af(o, u, t),
              (t = h),
              (l = u);
            var v = t.updateQueue;
            if (v === null) {
              var y = new Set();
              y.add(l), (t.updateQueue = y);
            } else v.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Af(o, u, t), Ju();
              break e;
            }
            l = Error(R(426));
          }
        } else if (re && a.mode & 1) {
          var x = Lf(s);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Nf(x, s, a, o, t),
              Lu(wr(l, a));
            break e;
          }
        }
        (o = l = wr(l, a)),
          ye !== 4 && (ye = 2),
          ni === null ? (ni = [o]) : ni.push(o),
          (o = s);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var m = Pm(o, l, t);
              Tf(o, m);
              break e;
            case 1:
              a = l;
              var p = o.type,
                g = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof p.getDerivedStateFromError == 'function' ||
                  (g !== null &&
                    typeof g.componentDidCatch == 'function' &&
                    (rn === null || !rn.has(g))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var w = Tm(o, a, t);
                Tf(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Hm(n);
    } catch (E) {
      (t = E), me === n && n !== null && (me = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Um() {
  var e = os.current;
  return (os.current = is), e === null ? is : e;
}
function Ju() {
  (ye === 0 || ye === 3 || ye === 2) && (ye = 4),
    Se === null || (!(jn & 268435455) && !(js & 268435455)) || Kt(Se, Pe);
}
function ls(e, t) {
  var n = Q;
  Q |= 2;
  var r = Um();
  (Se !== e || Pe !== t) && ((Tt = null), Rn(e, t));
  do
    try {
      Nw();
      break;
    } catch (i) {
      Bm(e, i);
    }
  while (1);
  if ((ju(), (Q = n), (os.current = r), me !== null)) throw Error(R(261));
  return (Se = null), (Pe = 0), ye;
}
function Nw() {
  for (; me !== null; ) $m(me);
}
function jw() {
  for (; me !== null && !s0(); ) $m(me);
}
function $m(e) {
  var t = Gm(e.alternate, e, He);
  (e.memoizedProps = e.pendingProps),
    t === null ? Hm(e) : (me = t),
    (Ku.current = null);
}
function Hm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = bw(n, t)), n !== null)) {
        (n.flags &= 32767), (me = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ye = 6), (me = null);
        return;
      }
    } else if (((n = _w(n, t, He)), n !== null)) {
      me = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      me = t;
      return;
    }
    me = t = e;
  } while (t !== null);
  ye === 0 && (ye = 5);
}
function kn(e, t, n) {
  var r = X,
    i = rt.transition;
  try {
    (rt.transition = null), (X = 1), Dw(e, t, n, r);
  } finally {
    (rt.transition = i), (X = r);
  }
  return null;
}
function Dw(e, t, n, r) {
  do hr();
  while (Yt !== null);
  if (Q & 6) throw Error(R(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(R(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (v0(e, o),
    e === Se && ((me = Se = null), (Pe = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      co ||
      ((co = !0),
      Qm($o, function () {
        return hr(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = rt.transition), (rt.transition = null);
    var s = X;
    X = 1;
    var a = Q;
    (Q |= 4),
      (Ku.current = null),
      Rw(e, n),
      Vm(n, e),
      nw(xl),
      (Wo = !!wl),
      (xl = wl = null),
      (e.current = n),
      Mw(n),
      a0(),
      (Q = a),
      (X = s),
      (rt.transition = o);
  } else e.current = n;
  if (
    (co && ((co = !1), (Yt = e), (as = i)),
    (o = e.pendingLanes),
    o === 0 && (rn = null),
    c0(n.stateNode),
    Be(e, he()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, {componentStack: i.stack, digest: i.digest});
  if (ss) throw ((ss = !1), (e = Fl), (Fl = null), e);
  return (
    as & 1 && e.tag !== 0 && hr(),
    (o = e.pendingLanes),
    o & 1 ? (e === Bl ? ri++ : ((ri = 0), (Bl = e))) : (ri = 0),
    vn(),
    null
  );
}
function hr() {
  if (Yt !== null) {
    var e = Ep(as),
      t = rt.transition,
      n = X;
    try {
      if (((rt.transition = null), (X = 16 > e ? 16 : e), Yt === null))
        var r = !1;
      else {
        if (((e = Yt), (Yt = null), (as = 0), Q & 6)) throw Error(R(331));
        var i = Q;
        for (Q |= 4, N = e.current; N !== null; ) {
          var o = N,
            s = o.child;
          if (N.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (N = u; N !== null; ) {
                  var c = N;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ti(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (N = f);
                  else
                    for (; N !== null; ) {
                      c = N;
                      var d = c.sibling,
                        h = c.return;
                      if ((jm(c), c === u)) {
                        N = null;
                        break;
                      }
                      if (d !== null) {
                        (d.return = h), (N = d);
                        break;
                      }
                      N = h;
                    }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var y = v.child;
                if (y !== null) {
                  v.child = null;
                  do {
                    var x = y.sibling;
                    (y.sibling = null), (y = x);
                  } while (y !== null);
                }
              }
              N = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) (s.return = o), (N = s);
          else
            e: for (; N !== null; ) {
              if (((o = N), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ti(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                (m.return = o.return), (N = m);
                break e;
              }
              N = o.return;
            }
        }
        var p = e.current;
        for (N = p; N !== null; ) {
          s = N;
          var g = s.child;
          if (s.subtreeFlags & 2064 && g !== null) (g.return = s), (N = g);
          else
            e: for (s = p; N !== null; ) {
              if (((a = N), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ns(9, a);
                  }
                } catch (E) {
                  fe(a, a.return, E);
                }
              if (a === s) {
                N = null;
                break e;
              }
              var w = a.sibling;
              if (w !== null) {
                (w.return = a.return), (N = w);
                break e;
              }
              N = a.return;
            }
        }
        if (
          ((Q = i), vn(), xt && typeof xt.onPostCommitFiberRoot == 'function')
        )
          try {
            xt.onPostCommitFiberRoot(Cs, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (X = n), (rt.transition = t);
    }
  }
  return !1;
}
function Qf(e, t, n) {
  (t = wr(n, t)),
    (t = Pm(e, t, 1)),
    (e = nn(e, t, 1)),
    (t = Ne()),
    e !== null && (Mi(e, 1, t), Be(e, t));
}
function fe(e, t, n) {
  if (e.tag === 3) Qf(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Qf(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (rn === null || !rn.has(r)))
        ) {
          (e = wr(n, e)),
            (e = Tm(t, e, 1)),
            (t = nn(t, e, 1)),
            (e = Ne()),
            t !== null && (Mi(t, 1, e), Be(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Iw(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ne()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Se === e &&
      (Pe & n) === n &&
      (ye === 4 || (ye === 3 && (Pe & 130023424) === Pe && 500 > he() - Yu)
        ? Rn(e, 0)
        : (qu |= n)),
    Be(e, t);
}
function Wm(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = eo), (eo <<= 1), !(eo & 130023424) && (eo = 4194304))
      : (t = 1));
  var n = Ne();
  (e = jt(e, t)), e !== null && (Mi(e, t, n), Be(e, n));
}
function Vw(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Wm(e, n);
}
function zw(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(R(314));
  }
  r !== null && r.delete(t), Wm(e, n);
}
var Gm;
Gm = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ze.current) Ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ve = !1), Cw(e, t, n);
      Ve = !!(e.flags & 131072);
    }
  else (Ve = !1), re && t.flags & 1048576 && qp(t, Zo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Ao(e, t), (e = t.pendingProps);
      var i = mr(t, Re.current);
      dr(t, n), (i = $u(null, t, r, e, i, n));
      var o = Hu();
      return (
        (t.flags |= 1),
        typeof i == 'object' &&
        i !== null &&
        typeof i.render == 'function' &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Fe(r) ? ((o = !0), Yo(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Vu(t),
            (i.updater = As),
            (t.stateNode = i),
            (i._reactInternals = t),
            Ol(t, r, e, n),
            (t = Al(null, t, r, !0, o, n)))
          : ((t.tag = 0), re && o && Mu(t), Le(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ao(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Bw(r)),
          (e = at(r, e)),
          i)
        ) {
          case 0:
            t = Ml(null, t, r, e, n);
            break e;
          case 1:
            t = If(null, t, r, e, n);
            break e;
          case 11:
            t = jf(null, t, r, e, n);
            break e;
          case 14:
            t = Df(null, t, r, at(r.type, e), n);
            break e;
        }
        throw Error(R(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        Ml(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        If(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Om(t), e === null)) throw Error(R(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Jp(e, t),
          ts(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = wr(Error(R(423)), t)), (t = Vf(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = wr(Error(R(424)), t)), (t = Vf(e, t, r, n, i));
            break e;
          } else
            for (
              We = tn(t.stateNode.containerInfo.firstChild),
                Ge = t,
                re = !0,
                ct = null,
                n = rm(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((vr(), r === i)) {
            t = Dt(e, t, n);
            break e;
          }
          Le(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        im(t),
        e === null && Cl(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        Sl(r, i) ? (s = null) : o !== null && Sl(r, o) && (t.flags |= 32),
        bm(e, t),
        Le(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && Cl(t), null;
    case 13:
      return Rm(e, t, n);
    case 4:
      return (
        zu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = gr(t, null, r, n)) : Le(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        jf(e, t, r, i, n)
      );
    case 7:
      return Le(e, t, t.pendingProps, n), t.child;
    case 8:
      return Le(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Le(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          Z(Jo, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (ht(o.value, s)) {
            if (o.children === i.children && !ze.current) {
              t = Dt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                s = o.child;
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (o.tag === 1) {
                      (l = Rt(-1, n & -n)), (l.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (l.next = l)
                          : ((l.next = c.next), (c.next = l)),
                          (u.pending = l);
                      }
                    }
                    (o.lanes |= n),
                      (l = o.alternate),
                      l !== null && (l.lanes |= n),
                      _l(o.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(R(341));
                (s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  _l(s, n, t),
                  (s = o.sibling);
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    (o.return = s.return), (s = o);
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        Le(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        dr(t, n),
        (i = it(i)),
        (r = r(i)),
        (t.flags |= 1),
        Le(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = at(r, t.pendingProps)),
        (i = at(r.type, i)),
        Df(e, t, r, i, n)
      );
    case 15:
      return Cm(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : at(r, i)),
        Ao(e, t),
        (t.tag = 1),
        Fe(r) ? ((e = !0), Yo(t)) : (e = !1),
        dr(t, n),
        tm(t, r, i),
        Ol(t, r, i, n),
        Al(null, t, r, !0, e, n)
      );
    case 19:
      return Mm(e, t, n);
    case 22:
      return _m(e, t, n);
  }
  throw Error(R(156, t.tag));
};
function Qm(e, t) {
  return wp(e, t);
}
function Fw(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function nt(e, t, n, r) {
  return new Fw(e, t, n, r);
}
function ec(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Bw(e) {
  if (typeof e == 'function') return ec(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === wu)) return 11;
    if (e === xu) return 14;
  }
  return 2;
}
function sn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = nt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : {lanes: t.lanes, firstContext: t.firstContext}),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function jo(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == 'function')) ec(e) && (s = 1);
  else if (typeof e == 'string') s = 5;
  else
    e: switch (e) {
      case Gn:
        return Mn(n.children, i, o, t);
      case yu:
        (s = 8), (i |= 8);
        break;
      case Ja:
        return (
          (e = nt(12, n, t, i | 2)), (e.elementType = Ja), (e.lanes = o), e
        );
      case el:
        return (e = nt(13, n, t, i)), (e.elementType = el), (e.lanes = o), e;
      case tl:
        return (e = nt(19, n, t, i)), (e.elementType = tl), (e.lanes = o), e;
      case np:
        return Ds(n, i, o, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case ep:
              s = 10;
              break e;
            case tp:
              s = 9;
              break e;
            case wu:
              s = 11;
              break e;
            case xu:
              s = 14;
              break e;
            case Ht:
              (s = 16), (r = null);
              break e;
          }
        throw Error(R(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = nt(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Mn(e, t, n, r) {
  return (e = nt(7, e, r, t)), (e.lanes = n), e;
}
function Ds(e, t, n, r) {
  return (
    (e = nt(22, e, r, t)),
    (e.elementType = np),
    (e.lanes = n),
    (e.stateNode = {isHidden: !1}),
    e
  );
}
function Oa(e, t, n) {
  return (e = nt(6, e, null, t)), (e.lanes = n), e;
}
function Ra(e, t, n) {
  return (
    (t = nt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Uw(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ca(0)),
    (this.expirationTimes = ca(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ca(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function tc(e, t, n, r, i, o, s, a, l) {
  return (
    (e = new Uw(e, t, n, a, l)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = nt(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Vu(o),
    e
  );
}
function $w(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Wn,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Km(e) {
  if (!e) return fn;
  e = e._reactInternals;
  e: {
    if (Vn(e) !== e || e.tag !== 1) throw Error(R(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Fe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(R(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Fe(n)) return Qp(e, n, t);
  }
  return t;
}
function qm(e, t, n, r, i, o, s, a, l) {
  return (
    (e = tc(n, r, !0, e, i, o, s, a, l)),
    (e.context = Km(null)),
    (n = e.current),
    (r = Ne()),
    (i = on(n)),
    (o = Rt(r, i)),
    (o.callback = t ?? null),
    nn(n, o, i),
    (e.current.lanes = i),
    Mi(e, i, r),
    Be(e, r),
    e
  );
}
function Is(e, t, n, r) {
  var i = t.current,
    o = Ne(),
    s = on(i);
  return (
    (n = Km(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Rt(o, s)),
    (t.payload = {element: e}),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = nn(i, t, s)),
    e !== null && (dt(e, i, s, o), Oo(e, i, s)),
    s
  );
}
function us(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Kf(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function nc(e, t) {
  Kf(e, t), (e = e.alternate) && Kf(e, t);
}
function Hw() {
  return null;
}
var Ym =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function rc(e) {
  this._internalRoot = e;
}
Vs.prototype.render = rc.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(R(409));
  Is(e, t, null, null);
};
Vs.prototype.unmount = rc.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Dn(function () {
      Is(null, e, null, null);
    }),
      (t[Nt] = null);
  }
};
function Vs(e) {
  this._internalRoot = e;
}
Vs.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Cp();
    e = {blockedOn: null, target: e, priority: t};
    for (var n = 0; n < Qt.length && t !== 0 && t < Qt[n].priority; n++);
    Qt.splice(n, 0, e), n === 0 && bp(e);
  }
};
function ic(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function zs(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function qf() {}
function Ww(e, t, n, r, i) {
  if (i) {
    if (typeof r == 'function') {
      var o = r;
      r = function () {
        var u = us(s);
        o.call(u);
      };
    }
    var s = qm(t, r, e, 0, null, !1, !1, '', qf);
    return (
      (e._reactRootContainer = s),
      (e[Nt] = s.current),
      vi(e.nodeType === 8 ? e.parentNode : e),
      Dn(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == 'function') {
    var a = r;
    r = function () {
      var u = us(l);
      a.call(u);
    };
  }
  var l = tc(e, 0, !1, null, null, !1, !1, '', qf);
  return (
    (e._reactRootContainer = l),
    (e[Nt] = l.current),
    vi(e.nodeType === 8 ? e.parentNode : e),
    Dn(function () {
      Is(t, l, n, r);
    }),
    l
  );
}
function Fs(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == 'function') {
      var a = i;
      i = function () {
        var l = us(s);
        a.call(l);
      };
    }
    Is(t, s, e, i);
  } else s = Ww(n, t, e, i, r);
  return us(s);
}
Pp = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Hr(t.pendingLanes);
        n !== 0 &&
          (Eu(t, n | 1), Be(t, he()), !(Q & 6) && ((xr = he() + 500), vn()));
      }
      break;
    case 13:
      Dn(function () {
        var r = jt(e, 1);
        if (r !== null) {
          var i = Ne();
          dt(r, e, 1, i);
        }
      }),
        nc(e, 1);
  }
};
Pu = function (e) {
  if (e.tag === 13) {
    var t = jt(e, 134217728);
    if (t !== null) {
      var n = Ne();
      dt(t, e, 134217728, n);
    }
    nc(e, 134217728);
  }
};
Tp = function (e) {
  if (e.tag === 13) {
    var t = on(e),
      n = jt(e, t);
    if (n !== null) {
      var r = Ne();
      dt(n, e, t, r);
    }
    nc(e, t);
  }
};
Cp = function () {
  return X;
};
_p = function (e, t) {
  var n = X;
  try {
    return (X = e), t();
  } finally {
    X = n;
  }
};
fl = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((il(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Rs(r);
            if (!i) throw Error(R(90));
            ip(r), il(r, i);
          }
        }
      }
      break;
    case 'textarea':
      sp(e, n);
      break;
    case 'select':
      (t = n.value), t != null && lr(e, !!n.multiple, t, !1);
  }
};
hp = Xu;
pp = Dn;
var Gw = {usingClientEntryPoint: !1, Events: [Li, Yn, Rs, fp, dp, Xu]},
  Vr = {
    findFiberByHostInstance: Cn,
    bundleType: 0,
    version: '18.2.0',
    rendererPackageName: 'react-dom',
  },
  Qw = {
    bundleType: Vr.bundleType,
    version: Vr.version,
    rendererPackageName: Vr.rendererPackageName,
    rendererConfig: Vr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Vt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = gp(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Vr.findFiberByHostInstance || Hw,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var fo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!fo.isDisabled && fo.supportsFiber)
    try {
      (Cs = fo.inject(Qw)), (xt = fo);
    } catch {}
}
qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gw;
qe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ic(t)) throw Error(R(200));
  return $w(e, t, null, n);
};
qe.createRoot = function (e, t) {
  if (!ic(e)) throw Error(R(299));
  var n = !1,
    r = '',
    i = Ym;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = tc(e, 1, !1, null, null, n, !1, r, i)),
    (e[Nt] = t.current),
    vi(e.nodeType === 8 ? e.parentNode : e),
    new rc(t)
  );
};
qe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(R(188))
      : ((e = Object.keys(e).join(',')), Error(R(268, e)));
  return (e = gp(t)), (e = e === null ? null : e.stateNode), e;
};
qe.flushSync = function (e) {
  return Dn(e);
};
qe.hydrate = function (e, t, n) {
  if (!zs(t)) throw Error(R(200));
  return Fs(null, e, t, !0, n);
};
qe.hydrateRoot = function (e, t, n) {
  if (!ic(e)) throw Error(R(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = '',
    s = Ym;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = qm(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[Nt] = t.current),
    vi(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Vs(t);
};
qe.render = function (e, t, n) {
  if (!zs(t)) throw Error(R(200));
  return Fs(null, e, t, !1, n);
};
qe.unmountComponentAtNode = function (e) {
  if (!zs(e)) throw Error(R(40));
  return e._reactRootContainer
    ? (Dn(function () {
        Fs(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Nt] = null);
        });
      }),
      !0)
    : !1;
};
qe.unstable_batchedUpdates = Xu;
qe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!zs(n)) throw Error(R(200));
  if (e == null || e._reactInternals === void 0) throw Error(R(38));
  return Fs(e, t, n, !1, r);
};
qe.version = '18.2.0-next-9e3b772b8-20220608';
function Xm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xm);
    } catch (e) {
      console.error(e);
    }
}
Xm(), (qh.exports = qe);
var Zm = qh.exports,
  Yf = Zm;
(Xa.createRoot = Yf.createRoot), (Xa.hydrateRoot = Yf.hydrateRoot);
const Jm = S.createContext({
    transformPagePoint: e => e,
    isStatic: !1,
    reducedMotion: 'never',
  }),
  Bs = S.createContext({}),
  oc = S.createContext(null),
  Us = typeof document < 'u',
  Kw = Us ? S.useLayoutEffect : S.useEffect,
  ev = S.createContext({strict: !1});
function qw(e, t, n, r) {
  const {visualElement: i} = S.useContext(Bs),
    o = S.useContext(ev),
    s = S.useContext(oc),
    a = S.useContext(Jm).reducedMotion,
    l = S.useRef();
  (r = r || o.renderer),
    !l.current &&
      r &&
      (l.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceContext: s,
        blockInitialAnimation: s ? s.initial === !1 : !1,
        reducedMotionConfig: a,
      }));
  const u = l.current;
  S.useInsertionEffect(() => {
    u && u.update(n, s);
  });
  const c = S.useRef(!!window.HandoffAppearAnimations);
  return (
    Kw(() => {
      u &&
        (u.render(),
        c.current && u.animationState && u.animationState.animateChanges());
    }),
    S.useEffect(() => {
      u &&
        (u.updateFeatures(),
        !c.current && u.animationState && u.animationState.animateChanges(),
        (window.HandoffAppearAnimations = void 0),
        (c.current = !1));
    }),
    u
  );
}
function rr(e) {
  return (
    typeof e == 'object' && Object.prototype.hasOwnProperty.call(e, 'current')
  );
}
function Yw(e, t, n) {
  return S.useCallback(
    r => {
      r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == 'function' ? n(r) : rr(n) && (n.current = r));
    },
    [t],
  );
}
function Ti(e) {
  return typeof e == 'string' || Array.isArray(e);
}
function $s(e) {
  return typeof e == 'object' && typeof e.start == 'function';
}
const sc = [
    'animate',
    'whileInView',
    'whileFocus',
    'whileHover',
    'whileTap',
    'whileDrag',
    'exit',
  ],
  ac = ['initial', ...sc];
function Hs(e) {
  return $s(e.animate) || ac.some(t => Ti(e[t]));
}
function tv(e) {
  return !!(Hs(e) || e.variants);
}
function Xw(e, t) {
  if (Hs(e)) {
    const {initial: n, animate: r} = e;
    return {
      initial: n === !1 || Ti(n) ? n : void 0,
      animate: Ti(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function Zw(e) {
  const {initial: t, animate: n} = Xw(e, S.useContext(Bs));
  return S.useMemo(() => ({initial: t, animate: n}), [Xf(t), Xf(n)]);
}
function Xf(e) {
  return Array.isArray(e) ? e.join(' ') : e;
}
const Zf = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  Ci = {};
for (const e in Zf) Ci[e] = {isEnabled: t => Zf[e].some(n => !!t[n])};
function Jw(e) {
  for (const t in e) Ci[t] = {...Ci[t], ...e[t]};
}
const nv = S.createContext({}),
  rv = S.createContext({}),
  e1 = Symbol.for('motionComponentSymbol');
function t1({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  e && Jw(e);
  function o(a, l) {
    let u;
    const c = {...S.useContext(Jm), ...a, layoutId: n1(a)},
      {isStatic: f} = c,
      d = Zw(a),
      h = r(a, f);
    if (!f && Us) {
      d.visualElement = qw(i, h, c, t);
      const v = S.useContext(rv),
        y = S.useContext(ev).strict;
      d.visualElement && (u = d.visualElement.loadFeatures(c, y, e, v));
    }
    return S.createElement(
      Bs.Provider,
      {value: d},
      u && d.visualElement
        ? S.createElement(u, {visualElement: d.visualElement, ...c})
        : null,
      n(i, a, Yw(h, d.visualElement, l), h, f, d.visualElement),
    );
  }
  const s = S.forwardRef(o);
  return (s[e1] = i), s;
}
function n1({layoutId: e}) {
  const t = S.useContext(nv).id;
  return t && e !== void 0 ? t + '-' + e : e;
}
function r1(e) {
  function t(r, i = {}) {
    return t1(e(r, i));
  }
  if (typeof Proxy > 'u') return t;
  const n = new Map();
  return new Proxy(t, {get: (r, i) => (n.has(i) || n.set(i, t(i)), n.get(i))});
}
const i1 = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
];
function lc(e) {
  return typeof e != 'string' || e.includes('-')
    ? !1
    : !!(i1.indexOf(e) > -1 || /[A-Z]/.test(e));
}
const cs = {};
function o1(e) {
  Object.assign(cs, e);
}
const ji = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  zn = new Set(ji);
function iv(e, {layout: t, layoutId: n}) {
  return (
    zn.has(e) ||
    e.startsWith('origin') ||
    ((t || n !== void 0) && (!!cs[e] || e === 'opacity'))
  );
}
const Ue = e => !!(e && e.getVelocity),
  s1 = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    transformPerspective: 'perspective',
  },
  a1 = ji.length;
function l1(
  e,
  {enableHardwareAcceleration: t = !0, allowTransformNone: n = !0},
  r,
  i,
) {
  let o = '';
  for (let s = 0; s < a1; s++) {
    const a = ji[s];
    if (e[a] !== void 0) {
      const l = s1[a] || a;
      o += `${l}(${e[a]}) `;
    }
  }
  return (
    t && !e.z && (o += 'translateZ(0)'),
    (o = o.trim()),
    i ? (o = i(e, r ? '' : o)) : n && r && (o = 'none'),
    o
  );
}
const ov = e => t => typeof t == 'string' && t.startsWith(e),
  sv = ov('--'),
  Hl = ov('var(--'),
  u1 =
    /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,
  c1 = (e, t) => (t && typeof e == 'number' ? t.transform(e) : e),
  dn = (e, t, n) => Math.min(Math.max(n, e), t),
  Fn = {test: e => typeof e == 'number', parse: parseFloat, transform: e => e},
  ii = {...Fn, transform: e => dn(0, 1, e)},
  ho = {...Fn, default: 1},
  oi = e => Math.round(e * 1e5) / 1e5,
  Ws = /(-)?([\d]*\.?[\d])+/g,
  av =
    /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
  f1 =
    /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function Di(e) {
  return typeof e == 'string';
}
const Ii = e => ({
    test: t => Di(t) && t.endsWith(e) && t.split(' ').length === 1,
    parse: parseFloat,
    transform: t => `${t}${e}`,
  }),
  $t = Ii('deg'),
  kt = Ii('%'),
  U = Ii('px'),
  d1 = Ii('vh'),
  h1 = Ii('vw'),
  Jf = {
    ...kt,
    parse: e => kt.parse(e) / 100,
    transform: e => kt.transform(e * 100),
  },
  ed = {...Fn, transform: Math.round},
  lv = {
    borderWidth: U,
    borderTopWidth: U,
    borderRightWidth: U,
    borderBottomWidth: U,
    borderLeftWidth: U,
    borderRadius: U,
    radius: U,
    borderTopLeftRadius: U,
    borderTopRightRadius: U,
    borderBottomRightRadius: U,
    borderBottomLeftRadius: U,
    width: U,
    maxWidth: U,
    height: U,
    maxHeight: U,
    size: U,
    top: U,
    right: U,
    bottom: U,
    left: U,
    padding: U,
    paddingTop: U,
    paddingRight: U,
    paddingBottom: U,
    paddingLeft: U,
    margin: U,
    marginTop: U,
    marginRight: U,
    marginBottom: U,
    marginLeft: U,
    rotate: $t,
    rotateX: $t,
    rotateY: $t,
    rotateZ: $t,
    scale: ho,
    scaleX: ho,
    scaleY: ho,
    scaleZ: ho,
    skew: $t,
    skewX: $t,
    skewY: $t,
    distance: U,
    translateX: U,
    translateY: U,
    translateZ: U,
    x: U,
    y: U,
    z: U,
    perspective: U,
    transformPerspective: U,
    opacity: ii,
    originX: Jf,
    originY: Jf,
    originZ: U,
    zIndex: ed,
    fillOpacity: ii,
    strokeOpacity: ii,
    numOctaves: ed,
  };
function uc(e, t, n, r) {
  const {style: i, vars: o, transform: s, transformOrigin: a} = e;
  let l = !1,
    u = !1,
    c = !0;
  for (const f in t) {
    const d = t[f];
    if (sv(f)) {
      o[f] = d;
      continue;
    }
    const h = lv[f],
      v = c1(d, h);
    if (zn.has(f)) {
      if (((l = !0), (s[f] = v), !c)) continue;
      d !== (h.default || 0) && (c = !1);
    } else f.startsWith('origin') ? ((u = !0), (a[f] = v)) : (i[f] = v);
  }
  if (
    (t.transform ||
      (l || r
        ? (i.transform = l1(e.transform, n, c, r))
        : i.transform && (i.transform = 'none')),
    u)
  ) {
    const {originX: f = '50%', originY: d = '50%', originZ: h = 0} = a;
    i.transformOrigin = `${f} ${d} ${h}`;
  }
}
const cc = () => ({style: {}, transform: {}, transformOrigin: {}, vars: {}});
function uv(e, t, n) {
  for (const r in t) !Ue(t[r]) && !iv(r, n) && (e[r] = t[r]);
}
function p1({transformTemplate: e}, t, n) {
  return S.useMemo(() => {
    const r = cc();
    return (
      uc(r, t, {enableHardwareAcceleration: !n}, e),
      Object.assign({}, r.vars, r.style)
    );
  }, [t]);
}
function m1(e, t, n) {
  const r = e.style || {},
    i = {};
  return (
    uv(i, r, e),
    Object.assign(i, p1(e, t, n)),
    e.transformValues ? e.transformValues(i) : i
  );
}
function v1(e, t, n) {
  const r = {},
    i = m1(e, t, n);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = 'none'),
      (i.touchAction =
        e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (r.tabIndex = 0),
    (r.style = i),
    r
  );
}
const g1 = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'transformValues',
  'custom',
  'inherit',
  'onLayoutAnimationStart',
  'onLayoutAnimationComplete',
  'onLayoutMeasure',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'ignoreStrict',
  'viewport',
]);
function fs(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && e !== 'draggable') ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    g1.has(e)
  );
}
let cv = e => !fs(e);
function y1(e) {
  e && (cv = t => (t.startsWith('on') ? !fs(t) : e(t)));
}
try {
  y1(require('@emotion/is-prop-valid').default);
} catch {}
function w1(e, t, n) {
  const r = {};
  for (const i in e)
    (i === 'values' && typeof e.values == 'object') ||
      ((cv(i) ||
        (n === !0 && fs(i)) ||
        (!t && !fs(i)) ||
        (e.draggable && i.startsWith('onDrag'))) &&
        (r[i] = e[i]));
  return r;
}
function td(e, t, n) {
  return typeof e == 'string' ? e : U.transform(t + n * e);
}
function x1(e, t, n) {
  const r = td(t, e.x, e.width),
    i = td(n, e.y, e.height);
  return `${r} ${i}`;
}
const S1 = {offset: 'stroke-dashoffset', array: 'stroke-dasharray'},
  k1 = {offset: 'strokeDashoffset', array: 'strokeDasharray'};
function E1(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? S1 : k1;
  e[o.offset] = U.transform(-r);
  const s = U.transform(t),
    a = U.transform(n);
  e[o.array] = `${s} ${a}`;
}
function fc(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: o,
    pathLength: s,
    pathSpacing: a = 1,
    pathOffset: l = 0,
    ...u
  },
  c,
  f,
  d,
) {
  if ((uc(e, u, c, d), f)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const {attrs: h, style: v, dimensions: y} = e;
  h.transform && (y && (v.transform = h.transform), delete h.transform),
    y &&
      (i !== void 0 || o !== void 0 || v.transform) &&
      (v.transformOrigin = x1(
        y,
        i !== void 0 ? i : 0.5,
        o !== void 0 ? o : 0.5,
      )),
    t !== void 0 && (h.x = t),
    n !== void 0 && (h.y = n),
    r !== void 0 && (h.scale = r),
    s !== void 0 && E1(h, s, a, l, !1);
}
const fv = () => ({...cc(), attrs: {}}),
  dc = e => typeof e == 'string' && e.toLowerCase() === 'svg';
function P1(e, t, n, r) {
  const i = S.useMemo(() => {
    const o = fv();
    return (
      fc(o, t, {enableHardwareAcceleration: !1}, dc(r), e.transformTemplate),
      {...o.attrs, style: {...o.style}}
    );
  }, [t]);
  if (e.style) {
    const o = {};
    uv(o, e.style, e), (i.style = {...o, ...i.style});
  }
  return i;
}
function T1(e = !1) {
  return (n, r, i, {latestValues: o}, s) => {
    const l = (lc(n) ? P1 : v1)(r, o, s, n),
      c = {...w1(r, typeof n == 'string', e), ...l, ref: i},
      {children: f} = r,
      d = S.useMemo(() => (Ue(f) ? f.get() : f), [f]);
    return S.createElement(n, {...c, children: d});
  };
}
const hc = e => e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
function dv(e, {style: t, vars: n}, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const o in n) e.style.setProperty(o, n[o]);
}
const hv = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
]);
function pv(e, t, n, r) {
  dv(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(hv.has(i) ? i : hc(i), t.attrs[i]);
}
function pc(e, t) {
  const {style: n} = e,
    r = {};
  for (const i in n)
    (Ue(n[i]) || (t.style && Ue(t.style[i])) || iv(i, e)) && (r[i] = n[i]);
  return r;
}
function mv(e, t) {
  const n = pc(e, t);
  for (const r in e)
    if (Ue(e[r]) || Ue(t[r])) {
      const i =
        ji.indexOf(r) !== -1
          ? 'attr' + r.charAt(0).toUpperCase() + r.substring(1)
          : r;
      n[i] = e[r];
    }
  return n;
}
function mc(e, t, n, r = {}, i = {}) {
  return (
    typeof t == 'function' && (t = t(n !== void 0 ? n : e.custom, r, i)),
    typeof t == 'string' && (t = e.variants && e.variants[t]),
    typeof t == 'function' && (t = t(n !== void 0 ? n : e.custom, r, i)),
    t
  );
}
function C1(e) {
  const t = S.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const ds = e => Array.isArray(e),
  _1 = e => !!(e && typeof e == 'object' && e.mix && e.toValue),
  b1 = e => (ds(e) ? e[e.length - 1] || 0 : e);
function Do(e) {
  const t = Ue(e) ? e.get() : e;
  return _1(t) ? t.toValue() : t;
}
function O1(
  {scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n},
  r,
  i,
  o,
) {
  const s = {latestValues: R1(r, i, o, e), renderState: t()};
  return n && (s.mount = a => n(r, a, s)), s;
}
const vv = e => (t, n) => {
  const r = S.useContext(Bs),
    i = S.useContext(oc),
    o = () => O1(e, t, r, i);
  return n ? o() : C1(o);
};
function R1(e, t, n, r) {
  const i = {},
    o = r(e, {});
  for (const d in o) i[d] = Do(o[d]);
  let {initial: s, animate: a} = e;
  const l = Hs(e),
    u = tv(e);
  t &&
    u &&
    !l &&
    e.inherit !== !1 &&
    (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || s === !1;
  const f = c ? a : s;
  return (
    f &&
      typeof f != 'boolean' &&
      !$s(f) &&
      (Array.isArray(f) ? f : [f]).forEach(h => {
        const v = mc(e, h);
        if (!v) return;
        const {transitionEnd: y, transition: x, ...m} = v;
        for (const p in m) {
          let g = m[p];
          if (Array.isArray(g)) {
            const w = c ? g.length - 1 : 0;
            g = g[w];
          }
          g !== null && (i[p] = g);
        }
        for (const p in y) i[p] = y[p];
      }),
    i
  );
}
const de = e => e;
class nd {
  constructor() {
    (this.order = []), (this.scheduled = new Set());
  }
  add(t) {
    if (!this.scheduled.has(t))
      return this.scheduled.add(t), this.order.push(t), !0;
  }
  remove(t) {
    const n = this.order.indexOf(t);
    n !== -1 && (this.order.splice(n, 1), this.scheduled.delete(t));
  }
  clear() {
    (this.order.length = 0), this.scheduled.clear();
  }
}
function M1(e) {
  let t = new nd(),
    n = new nd(),
    r = 0,
    i = !1,
    o = !1;
  const s = new WeakSet(),
    a = {
      schedule: (l, u = !1, c = !1) => {
        const f = c && i,
          d = f ? t : n;
        return u && s.add(l), d.add(l) && f && i && (r = t.order.length), l;
      },
      cancel: l => {
        n.remove(l), s.delete(l);
      },
      process: l => {
        if (i) {
          o = !0;
          return;
        }
        if (((i = !0), ([t, n] = [n, t]), n.clear(), (r = t.order.length), r))
          for (let u = 0; u < r; u++) {
            const c = t.order[u];
            c(l), s.has(c) && (a.schedule(c), e());
          }
        (i = !1), o && ((o = !1), a.process(l));
      },
    };
  return a;
}
const po = ['prepare', 'read', 'update', 'preRender', 'render', 'postRender'],
  A1 = 40;
function L1(e, t) {
  let n = !1,
    r = !0;
  const i = {delta: 0, timestamp: 0, isProcessing: !1},
    o = po.reduce((f, d) => ((f[d] = M1(() => (n = !0))), f), {}),
    s = f => o[f].process(i),
    a = () => {
      const f = performance.now();
      (n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(f - i.timestamp, A1), 1)),
        (i.timestamp = f),
        (i.isProcessing = !0),
        po.forEach(s),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(a));
    },
    l = () => {
      (n = !0), (r = !0), i.isProcessing || e(a);
    };
  return {
    schedule: po.reduce((f, d) => {
      const h = o[d];
      return (f[d] = (v, y = !1, x = !1) => (n || l(), h.schedule(v, y, x))), f;
    }, {}),
    cancel: f => po.forEach(d => o[d].cancel(f)),
    state: i,
    steps: o,
  };
}
const {
    schedule: te,
    cancel: It,
    state: we,
    steps: Ma,
  } = L1(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : de, !0),
  N1 = {
    useVisualState: vv({
      scrapeMotionValuesFromProps: mv,
      createRenderState: fv,
      onMount: (e, t, {renderState: n, latestValues: r}) => {
        te.read(() => {
          try {
            n.dimensions =
              typeof t.getBBox == 'function'
                ? t.getBBox()
                : t.getBoundingClientRect();
          } catch {
            n.dimensions = {x: 0, y: 0, width: 0, height: 0};
          }
        }),
          te.render(() => {
            fc(
              n,
              r,
              {enableHardwareAcceleration: !1},
              dc(t.tagName),
              e.transformTemplate,
            ),
              pv(t, n);
          });
      },
    }),
  },
  j1 = {
    useVisualState: vv({
      scrapeMotionValuesFromProps: pc,
      createRenderState: cc,
    }),
  };
function D1(e, {forwardMotionProps: t = !1}, n, r) {
  return {
    ...(lc(e) ? N1 : j1),
    preloadedFeatures: n,
    useRender: T1(t),
    createVisualElement: r,
    Component: e,
  };
}
function Ot(e, t, n, r = {passive: !0}) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const gv = e =>
  e.pointerType === 'mouse'
    ? typeof e.button != 'number' || e.button <= 0
    : e.isPrimary !== !1;
function Gs(e, t = 'page') {
  return {point: {x: e[t + 'X'], y: e[t + 'Y']}};
}
const I1 = e => t => gv(t) && e(t, Gs(t));
function Mt(e, t, n, r) {
  return Ot(e, t, I1(n), r);
}
const V1 = (e, t) => n => t(e(n)),
  an = (...e) => e.reduce(V1);
function yv(e) {
  let t = null;
  return () => {
    const n = () => {
      t = null;
    };
    return t === null ? ((t = e), n) : !1;
  };
}
const rd = yv('dragHorizontal'),
  id = yv('dragVertical');
function wv(e) {
  let t = !1;
  if (e === 'y') t = id();
  else if (e === 'x') t = rd();
  else {
    const n = rd(),
      r = id();
    n && r
      ? (t = () => {
          n(), r();
        })
      : (n && n(), r && r());
  }
  return t;
}
function xv() {
  const e = wv(!0);
  return e ? (e(), !1) : !0;
}
class gn {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
function od(e, t) {
  const n = 'pointer' + (t ? 'enter' : 'leave'),
    r = 'onHover' + (t ? 'Start' : 'End'),
    i = (o, s) => {
      if (o.type === 'touch' || xv()) return;
      const a = e.getProps();
      e.animationState &&
        a.whileHover &&
        e.animationState.setActive('whileHover', t),
        a[r] && te.update(() => a[r](o, s));
    };
  return Mt(e.current, n, i, {passive: !e.getProps()[r]});
}
class z1 extends gn {
  mount() {
    this.unmount = an(od(this.node, !0), od(this.node, !1));
  }
  unmount() {}
}
class F1 extends gn {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(':focus-visible');
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = an(
      Ot(this.node.current, 'focus', () => this.onFocus()),
      Ot(this.node.current, 'blur', () => this.onBlur()),
    );
  }
  unmount() {}
}
const Sv = (e, t) => (t ? (e === t ? !0 : Sv(e, t.parentElement)) : !1);
function Aa(e, t) {
  if (!t) return;
  const n = new PointerEvent('pointer' + e);
  t(n, Gs(n));
}
class B1 extends gn {
  constructor() {
    super(...arguments),
      (this.removeStartListeners = de),
      (this.removeEndListeners = de),
      (this.removeAccessibleListeners = de),
      (this.startPointerPress = (t, n) => {
        if ((this.removeEndListeners(), this.isPressing)) return;
        const r = this.node.getProps(),
          o = Mt(
            window,
            'pointerup',
            (a, l) => {
              if (!this.checkPressEnd()) return;
              const {onTap: u, onTapCancel: c} = this.node.getProps();
              te.update(() => {
                Sv(this.node.current, a.target) ? u && u(a, l) : c && c(a, l);
              });
            },
            {passive: !(r.onTap || r.onPointerUp)},
          ),
          s = Mt(window, 'pointercancel', (a, l) => this.cancelPress(a, l), {
            passive: !(r.onTapCancel || r.onPointerCancel),
          });
        (this.removeEndListeners = an(o, s)), this.startPress(t, n);
      }),
      (this.startAccessiblePress = () => {
        const t = o => {
            if (o.key !== 'Enter' || this.isPressing) return;
            const s = a => {
              a.key !== 'Enter' ||
                !this.checkPressEnd() ||
                Aa('up', (l, u) => {
                  const {onTap: c} = this.node.getProps();
                  c && te.update(() => c(l, u));
                });
            };
            this.removeEndListeners(),
              (this.removeEndListeners = Ot(this.node.current, 'keyup', s)),
              Aa('down', (a, l) => {
                this.startPress(a, l);
              });
          },
          n = Ot(this.node.current, 'keydown', t),
          r = () => {
            this.isPressing && Aa('cancel', (o, s) => this.cancelPress(o, s));
          },
          i = Ot(this.node.current, 'blur', r);
        this.removeAccessibleListeners = an(n, i);
      });
  }
  startPress(t, n) {
    this.isPressing = !0;
    const {onTapStart: r, whileTap: i} = this.node.getProps();
    i &&
      this.node.animationState &&
      this.node.animationState.setActive('whileTap', !0),
      r && te.update(() => r(t, n));
  }
  checkPressEnd() {
    return (
      this.removeEndListeners(),
      (this.isPressing = !1),
      this.node.getProps().whileTap &&
        this.node.animationState &&
        this.node.animationState.setActive('whileTap', !1),
      !xv()
    );
  }
  cancelPress(t, n) {
    if (!this.checkPressEnd()) return;
    const {onTapCancel: r} = this.node.getProps();
    r && te.update(() => r(t, n));
  }
  mount() {
    const t = this.node.getProps(),
      n = Mt(this.node.current, 'pointerdown', this.startPointerPress, {
        passive: !(t.onTapStart || t.onPointerStart),
      }),
      r = Ot(this.node.current, 'focus', this.startAccessiblePress);
    this.removeStartListeners = an(n, r);
  }
  unmount() {
    this.removeStartListeners(),
      this.removeEndListeners(),
      this.removeAccessibleListeners();
  }
}
const Wl = new WeakMap(),
  La = new WeakMap(),
  U1 = e => {
    const t = Wl.get(e.target);
    t && t(e);
  },
  $1 = e => {
    e.forEach(U1);
  };
function H1({root: e, ...t}) {
  const n = e || document;
  La.has(n) || La.set(n, {});
  const r = La.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver($1, {root: e, ...t})), r[i];
}
function W1(e, t, n) {
  const r = H1(t);
  return (
    Wl.set(e, n),
    r.observe(e),
    () => {
      Wl.delete(e), r.unobserve(e);
    }
  );
}
const G1 = {some: 0, all: 1};
class Q1 extends gn {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const {viewport: t = {}} = this.node.getProps(),
      {root: n, margin: r, amount: i = 'some', once: o} = t,
      s = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == 'number' ? i : G1[i],
      },
      a = l => {
        const {isIntersecting: u} = l;
        if (
          this.isInView === u ||
          ((this.isInView = u), o && !u && this.hasEnteredView)
        )
          return;
        u && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive('whileInView', u);
        const {onViewportEnter: c, onViewportLeave: f} = this.node.getProps(),
          d = u ? c : f;
        d && d(l);
      };
    return W1(this.node.current, s, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > 'u') return;
    const {props: t, prevProps: n} = this.node;
    ['amount', 'margin', 'root'].some(K1(t, n)) && this.startObserver();
  }
  unmount() {}
}
function K1({viewport: e = {}}, {viewport: t = {}} = {}) {
  return n => e[n] !== t[n];
}
const q1 = {
  inView: {Feature: Q1},
  tap: {Feature: B1},
  focus: {Feature: F1},
  hover: {Feature: z1},
};
function kv(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function Y1(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.get())), t;
}
function X1(e) {
  const t = {};
  return e.values.forEach((n, r) => (t[r] = n.getVelocity())), t;
}
function Qs(e, t, n) {
  const r = e.getProps();
  return mc(r, t, n !== void 0 ? n : r.custom, Y1(e), X1(e));
}
const Z1 = 'framerAppearId',
  J1 = 'data-' + hc(Z1);
let ex = de,
  vc = de;
const ln = e => e * 1e3,
  At = e => e / 1e3,
  tx = {current: !1},
  Ev = e => Array.isArray(e) && typeof e[0] == 'number';
function Pv(e) {
  return !!(
    !e ||
    (typeof e == 'string' && Tv[e]) ||
    Ev(e) ||
    (Array.isArray(e) && e.every(Pv))
  );
}
const Gr = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Tv = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: Gr([0, 0.65, 0.55, 1]),
    circOut: Gr([0.55, 0, 1, 0.45]),
    backIn: Gr([0.31, 0.01, 0.66, -0.59]),
    backOut: Gr([0.33, 1.53, 0.69, 0.99]),
  };
function Cv(e) {
  if (e) return Ev(e) ? Gr(e) : Array.isArray(e) ? e.map(Cv) : Tv[e];
}
function nx(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i,
    repeat: o = 0,
    repeatType: s = 'loop',
    ease: a,
    times: l,
  } = {},
) {
  const u = {[t]: n};
  l && (u.offset = l);
  const c = Cv(a);
  return (
    Array.isArray(c) && (u.easing = c),
    e.animate(u, {
      delay: r,
      duration: i,
      easing: Array.isArray(c) ? 'linear' : c,
      fill: 'both',
      iterations: o + 1,
      direction: s === 'reverse' ? 'alternate' : 'normal',
    })
  );
}
function rx(e, {repeat: t, repeatType: n = 'loop'}) {
  const r = t && n !== 'loop' && t % 2 === 1 ? 0 : e.length - 1;
  return e[r];
}
const _v = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  ix = 1e-7,
  ox = 12;
function sx(e, t, n, r, i) {
  let o,
    s,
    a = 0;
  do (s = t + (n - t) / 2), (o = _v(s, r, i) - e), o > 0 ? (n = s) : (t = s);
  while (Math.abs(o) > ix && ++a < ox);
  return s;
}
function Vi(e, t, n, r) {
  if (e === t && n === r) return de;
  const i = o => sx(o, 0, 1, e, n);
  return o => (o === 0 || o === 1 ? o : _v(i(o), t, r));
}
const ax = Vi(0.42, 0, 1, 1),
  lx = Vi(0, 0, 0.58, 1),
  bv = Vi(0.42, 0, 0.58, 1),
  ux = e => Array.isArray(e) && typeof e[0] != 'number',
  Ov = e => t => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  Rv = e => t => 1 - e(1 - t),
  Mv = e => 1 - Math.sin(Math.acos(e)),
  gc = Rv(Mv),
  cx = Ov(gc),
  Av = Vi(0.33, 1.53, 0.69, 0.99),
  yc = Rv(Av),
  fx = Ov(yc),
  dx = e =>
    (e *= 2) < 1 ? 0.5 * yc(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  hx = {
    linear: de,
    easeIn: ax,
    easeInOut: bv,
    easeOut: lx,
    circIn: Mv,
    circInOut: cx,
    circOut: gc,
    backIn: yc,
    backInOut: fx,
    backOut: Av,
    anticipate: dx,
  },
  sd = e => {
    if (Array.isArray(e)) {
      vc(e.length === 4);
      const [t, n, r, i] = e;
      return Vi(t, n, r, i);
    } else if (typeof e == 'string') return hx[e];
    return e;
  },
  wc = (e, t) => n =>
    !!(
      (Di(n) && f1.test(n) && n.startsWith(e)) ||
      (t && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Lv = (e, t, n) => r => {
    if (!Di(r)) return r;
    const [i, o, s, a] = r.match(Ws);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(s),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  px = e => dn(0, 255, e),
  Na = {...Fn, transform: e => Math.round(px(e))},
  On = {
    test: wc('rgb', 'red'),
    parse: Lv('red', 'green', 'blue'),
    transform: ({red: e, green: t, blue: n, alpha: r = 1}) =>
      'rgba(' +
      Na.transform(e) +
      ', ' +
      Na.transform(t) +
      ', ' +
      Na.transform(n) +
      ', ' +
      oi(ii.transform(r)) +
      ')',
  };
function mx(e) {
  let t = '',
    n = '',
    r = '',
    i = '';
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const Gl = {test: wc('#'), parse: mx, transform: On.transform},
  ir = {
    test: wc('hsl', 'hue'),
    parse: Lv('hue', 'saturation', 'lightness'),
    transform: ({hue: e, saturation: t, lightness: n, alpha: r = 1}) =>
      'hsla(' +
      Math.round(e) +
      ', ' +
      kt.transform(oi(t)) +
      ', ' +
      kt.transform(oi(n)) +
      ', ' +
      oi(ii.transform(r)) +
      ')',
  },
  Ae = {
    test: e => On.test(e) || Gl.test(e) || ir.test(e),
    parse: e =>
      On.test(e) ? On.parse(e) : ir.test(e) ? ir.parse(e) : Gl.parse(e),
    transform: e =>
      Di(e) ? e : e.hasOwnProperty('red') ? On.transform(e) : ir.transform(e),
  },
  ae = (e, t, n) => -n * e + n * t + e;
function ja(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function vx({hue: e, saturation: t, lightness: n, alpha: r}) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    o = 0,
    s = 0;
  if (!t) i = o = s = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a;
    (i = ja(l, a, e + 1 / 3)), (o = ja(l, a, e)), (s = ja(l, a, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r,
  };
}
const Da = (e, t, n) => {
    const r = e * e;
    return Math.sqrt(Math.max(0, n * (t * t - r) + r));
  },
  gx = [Gl, On, ir],
  yx = e => gx.find(t => t.test(e));
function ad(e) {
  const t = yx(e);
  let n = t.parse(e);
  return t === ir && (n = vx(n)), n;
}
const Nv = (e, t) => {
  const n = ad(e),
    r = ad(t),
    i = {...n};
  return o => (
    (i.red = Da(n.red, r.red, o)),
    (i.green = Da(n.green, r.green, o)),
    (i.blue = Da(n.blue, r.blue, o)),
    (i.alpha = ae(n.alpha, r.alpha, o)),
    On.transform(i)
  );
};
function wx(e) {
  var t, n;
  return (
    isNaN(e) &&
    Di(e) &&
    (((t = e.match(Ws)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(av)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const jv = {regex: u1, countKey: 'Vars', token: '${v}', parse: de},
  Dv = {regex: av, countKey: 'Colors', token: '${c}', parse: Ae.parse},
  Iv = {regex: Ws, countKey: 'Numbers', token: '${n}', parse: Fn.parse};
function Ia(e, {regex: t, countKey: n, token: r, parse: i}) {
  const o = e.tokenised.match(t);
  o &&
    ((e['num' + n] = o.length),
    (e.tokenised = e.tokenised.replace(t, r)),
    e.values.push(...o.map(i)));
}
function hs(e) {
  const t = e.toString(),
    n = {
      value: t,
      tokenised: t,
      values: [],
      numVars: 0,
      numColors: 0,
      numNumbers: 0,
    };
  return n.value.includes('var(--') && Ia(n, jv), Ia(n, Dv), Ia(n, Iv), n;
}
function Vv(e) {
  return hs(e).values;
}
function zv(e) {
  const {values: t, numColors: n, numVars: r, tokenised: i} = hs(e),
    o = t.length;
  return s => {
    let a = i;
    for (let l = 0; l < o; l++)
      l < r
        ? (a = a.replace(jv.token, s[l]))
        : l < r + n
        ? (a = a.replace(Dv.token, Ae.transform(s[l])))
        : (a = a.replace(Iv.token, oi(s[l])));
    return a;
  };
}
const xx = e => (typeof e == 'number' ? 0 : e);
function Sx(e) {
  const t = Vv(e);
  return zv(e)(t.map(xx));
}
const hn = {test: wx, parse: Vv, createTransformer: zv, getAnimatableNone: Sx},
  Fv = (e, t) => n => `${n > 0 ? t : e}`;
function Bv(e, t) {
  return typeof e == 'number'
    ? n => ae(e, t, n)
    : Ae.test(e)
    ? Nv(e, t)
    : e.startsWith('var(')
    ? Fv(e, t)
    : $v(e, t);
}
const Uv = (e, t) => {
    const n = [...e],
      r = n.length,
      i = e.map((o, s) => Bv(o, t[s]));
    return o => {
      for (let s = 0; s < r; s++) n[s] = i[s](o);
      return n;
    };
  },
  kx = (e, t) => {
    const n = {...e, ...t},
      r = {};
    for (const i in n)
      e[i] !== void 0 && t[i] !== void 0 && (r[i] = Bv(e[i], t[i]));
    return i => {
      for (const o in r) n[o] = r[o](i);
      return n;
    };
  },
  $v = (e, t) => {
    const n = hn.createTransformer(t),
      r = hs(e),
      i = hs(t);
    return r.numVars === i.numVars &&
      r.numColors === i.numColors &&
      r.numNumbers >= i.numNumbers
      ? an(Uv(r.values, i.values), n)
      : Fv(e, t);
  },
  _i = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  ld = (e, t) => n => ae(e, t, n);
function Ex(e) {
  return typeof e == 'number'
    ? ld
    : typeof e == 'string'
    ? Ae.test(e)
      ? Nv
      : $v
    : Array.isArray(e)
    ? Uv
    : typeof e == 'object'
    ? kx
    : ld;
}
function Px(e, t, n) {
  const r = [],
    i = n || Ex(e[0]),
    o = e.length - 1;
  for (let s = 0; s < o; s++) {
    let a = i(e[s], e[s + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[s] || de : t;
      a = an(l, a);
    }
    r.push(a);
  }
  return r;
}
function Hv(e, t, {clamp: n = !0, ease: r, mixer: i} = {}) {
  const o = e.length;
  if ((vc(o === t.length), o === 1)) return () => t[0];
  e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const s = Px(t, r, i),
    a = s.length,
    l = u => {
      let c = 0;
      if (a > 1) for (; c < e.length - 2 && !(u < e[c + 1]); c++);
      const f = _i(e[c], e[c + 1], u);
      return s[c](f);
    };
  return n ? u => l(dn(e[0], e[o - 1], u)) : l;
}
function Tx(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = _i(0, t, r);
    e.push(ae(n, 1, i));
  }
}
function Cx(e) {
  const t = [0];
  return Tx(t, e.length - 1), t;
}
function _x(e, t) {
  return e.map(n => n * t);
}
function bx(e, t) {
  return e.map(() => t || bv).splice(0, e.length - 1);
}
function ps({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: r = 'easeInOut',
}) {
  const i = ux(r) ? r.map(sd) : sd(r),
    o = {done: !1, value: t[0]},
    s = _x(n && n.length === t.length ? n : Cx(t), e),
    a = Hv(s, t, {ease: Array.isArray(i) ? i : bx(t, i)});
  return {
    calculatedDuration: e,
    next: l => ((o.value = a(l)), (o.done = l >= e), o),
  };
}
function Wv(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Ox = 5;
function Gv(e, t, n) {
  const r = Math.max(t - Ox, 0);
  return Wv(n - e(r), t - r);
}
const Va = 0.001,
  Rx = 0.01,
  ud = 10,
  Mx = 0.05,
  Ax = 1;
function Lx({
  duration: e = 800,
  bounce: t = 0.25,
  velocity: n = 0,
  mass: r = 1,
}) {
  let i, o;
  ex(e <= ln(ud));
  let s = 1 - t;
  (s = dn(Mx, Ax, s)),
    (e = dn(Rx, ud, At(e))),
    s < 1
      ? ((i = u => {
          const c = u * s,
            f = c * e,
            d = c - n,
            h = Ql(u, s),
            v = Math.exp(-f);
          return Va - (d / h) * v;
        }),
        (o = u => {
          const f = u * s * e,
            d = f * n + n,
            h = Math.pow(s, 2) * Math.pow(u, 2) * e,
            v = Math.exp(-f),
            y = Ql(Math.pow(u, 2), s);
          return ((-i(u) + Va > 0 ? -1 : 1) * ((d - h) * v)) / y;
        }))
      : ((i = u => {
          const c = Math.exp(-u * e),
            f = (u - n) * e + 1;
          return -Va + c * f;
        }),
        (o = u => {
          const c = Math.exp(-u * e),
            f = (n - u) * (e * e);
          return c * f;
        }));
  const a = 5 / e,
    l = jx(i, o, a);
  if (((e = ln(e)), isNaN(l)))
    return {stiffness: 100, damping: 10, duration: e};
  {
    const u = Math.pow(l, 2) * r;
    return {stiffness: u, damping: s * 2 * Math.sqrt(r * u), duration: e};
  }
}
const Nx = 12;
function jx(e, t, n) {
  let r = n;
  for (let i = 1; i < Nx; i++) r = r - e(r) / t(r);
  return r;
}
function Ql(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Dx = ['duration', 'bounce'],
  Ix = ['stiffness', 'damping', 'mass'];
function cd(e, t) {
  return t.some(n => e[n] !== void 0);
}
function Vx(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!cd(e, Ix) && cd(e, Dx)) {
    const n = Lx(e);
    (t = {...t, ...n, velocity: 0, mass: 1}), (t.isResolvedFromDuration = !0);
  }
  return t;
}
function Qv({keyframes: e, restDelta: t, restSpeed: n, ...r}) {
  const i = e[0],
    o = e[e.length - 1],
    s = {done: !1, value: i},
    {
      stiffness: a,
      damping: l,
      mass: u,
      velocity: c,
      duration: f,
      isResolvedFromDuration: d,
    } = Vx(r),
    h = c ? -At(c) : 0,
    v = l / (2 * Math.sqrt(a * u)),
    y = o - i,
    x = At(Math.sqrt(a / u)),
    m = Math.abs(y) < 5;
  n || (n = m ? 0.01 : 2), t || (t = m ? 0.005 : 0.5);
  let p;
  if (v < 1) {
    const g = Ql(x, v);
    p = w => {
      const E = Math.exp(-v * x * w);
      return (
        o - E * (((h + v * x * y) / g) * Math.sin(g * w) + y * Math.cos(g * w))
      );
    };
  } else if (v === 1) p = g => o - Math.exp(-x * g) * (y + (h + x * y) * g);
  else {
    const g = x * Math.sqrt(v * v - 1);
    p = w => {
      const E = Math.exp(-v * x * w),
        T = Math.min(g * w, 300);
      return (
        o - (E * ((h + v * x * y) * Math.sinh(T) + g * y * Math.cosh(T))) / g
      );
    };
  }
  return {
    calculatedDuration: (d && f) || null,
    next: g => {
      const w = p(g);
      if (d) s.done = g >= f;
      else {
        let E = h;
        g !== 0 && (v < 1 ? (E = Gv(p, g, w)) : (E = 0));
        const T = Math.abs(E) <= n,
          P = Math.abs(o - w) <= t;
        s.done = T && P;
      }
      return (s.value = s.done ? o : w), s;
    },
  };
}
function fd({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: s,
  min: a,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const f = e[0],
    d = {done: !1, value: f},
    h = k => (a !== void 0 && k < a) || (l !== void 0 && k > l),
    v = k =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - k) < Math.abs(l - k)
        ? a
        : l;
  let y = n * t;
  const x = f + y,
    m = s === void 0 ? x : s(x);
  m !== x && (y = m - f);
  const p = k => -y * Math.exp(-k / r),
    g = k => m + p(k),
    w = k => {
      const b = p(k),
        C = g(k);
      (d.done = Math.abs(b) <= u), (d.value = d.done ? m : C);
    };
  let E, T;
  const P = k => {
    h(d.value) &&
      ((E = k),
      (T = Qv({
        keyframes: [d.value, v(d.value)],
        velocity: Gv(g, k, d.value),
        damping: i,
        stiffness: o,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    P(0),
    {
      calculatedDuration: null,
      next: k => {
        let b = !1;
        return (
          !T && E === void 0 && ((b = !0), w(k), P(k)),
          E !== void 0 && k > E ? T.next(k - E) : (!b && w(k), d)
        );
      },
    }
  );
}
const zx = e => {
    const t = ({timestamp: n}) => e(n);
    return {
      start: () => te.update(t, !0),
      stop: () => It(t),
      now: () => (we.isProcessing ? we.timestamp : performance.now()),
    };
  },
  dd = 2e4;
function hd(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < dd; ) (t += n), (r = e.next(t));
  return t >= dd ? 1 / 0 : t;
}
const Fx = {decay: fd, inertia: fd, tween: ps, keyframes: ps, spring: Qv};
function ms({
  autoplay: e = !0,
  delay: t = 0,
  driver: n = zx,
  keyframes: r,
  type: i = 'keyframes',
  repeat: o = 0,
  repeatDelay: s = 0,
  repeatType: a = 'loop',
  onPlay: l,
  onStop: u,
  onComplete: c,
  onUpdate: f,
  ...d
}) {
  let h = 1,
    v = !1,
    y,
    x;
  const m = () => {
    x = new Promise(D => {
      y = D;
    });
  };
  m();
  let p;
  const g = Fx[i] || ps;
  let w;
  g !== ps &&
    typeof r[0] != 'number' &&
    ((w = Hv([0, 100], r, {clamp: !1})), (r = [0, 100]));
  const E = g({...d, keyframes: r});
  let T;
  a === 'mirror' &&
    (T = g({...d, keyframes: [...r].reverse(), velocity: -(d.velocity || 0)}));
  let P = 'idle',
    k = null,
    b = null,
    C = null;
  E.calculatedDuration === null && o && (E.calculatedDuration = hd(E));
  const {calculatedDuration: M} = E;
  let V = 1 / 0,
    F = 1 / 0;
  M !== null && ((V = M + s), (F = V * (o + 1) - s));
  let j = 0;
  const A = D => {
      if (b === null) return;
      h > 0 && (b = Math.min(b, D)),
        h < 0 && (b = Math.min(D - F / h, b)),
        k !== null ? (j = k) : (j = Math.round(D - b) * h);
      const q = j - t * (h >= 0 ? 1 : -1),
        $e = h >= 0 ? q < 0 : q > F;
      (j = Math.max(q, 0)), P === 'finished' && k === null && (j = F);
      let Ce = j,
        ke = E;
      if (o) {
        const zt = j / V;
        let Un = Math.floor(zt),
          H = zt % 1;
        !H && zt >= 1 && (H = 1), H === 1 && Un--, (Un = Math.min(Un, o + 1));
        const z = !!(Un % 2);
        z &&
          (a === 'reverse'
            ? ((H = 1 - H), s && (H -= s / V))
            : a === 'mirror' && (ke = T));
        let K = dn(0, 1, H);
        j > F && (K = a === 'reverse' && z ? 1 : 0), (Ce = K * V);
      }
      const Me = $e ? {done: !1, value: r[0]} : ke.next(Ce);
      w && (Me.value = w(Me.value));
      let {done: Xe} = Me;
      !$e && M !== null && (Xe = h >= 0 ? j >= F : j <= 0);
      const ia = k === null && (P === 'finished' || (P === 'running' && Xe));
      return f && f(Me.value), ia && O(), Me;
    },
    $ = () => {
      p && p.stop(), (p = void 0);
    },
    W = () => {
      (P = 'idle'), $(), y(), m(), (b = C = null);
    },
    O = () => {
      (P = 'finished'), c && c(), $(), y();
    },
    L = () => {
      if (v) return;
      p || (p = n(A));
      const D = p.now();
      l && l(),
        k !== null ? (b = D - k) : (!b || P === 'finished') && (b = D),
        P === 'finished' && m(),
        (C = b),
        (k = null),
        (P = 'running'),
        p.start();
    };
  e && L();
  const B = {
    then(D, q) {
      return x.then(D, q);
    },
    get time() {
      return At(j);
    },
    set time(D) {
      (D = ln(D)),
        (j = D),
        k !== null || !p || h === 0 ? (k = D) : (b = p.now() - D / h);
    },
    get duration() {
      const D = E.calculatedDuration === null ? hd(E) : E.calculatedDuration;
      return At(D);
    },
    get speed() {
      return h;
    },
    set speed(D) {
      D === h || !p || ((h = D), (B.time = At(j)));
    },
    get state() {
      return P;
    },
    play: L,
    pause: () => {
      (P = 'paused'), (k = j);
    },
    stop: () => {
      (v = !0), P !== 'idle' && ((P = 'idle'), u && u(), W());
    },
    cancel: () => {
      C !== null && A(C), W();
    },
    complete: () => {
      P = 'finished';
    },
    sample: D => ((b = 0), A(D)),
  };
  return B;
}
function Bx(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Ux = Bx(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
  $x = new Set([
    'opacity',
    'clipPath',
    'filter',
    'transform',
    'backgroundColor',
  ]),
  mo = 10,
  Hx = 2e4,
  Wx = (e, t) => t.type === 'spring' || e === 'backgroundColor' || !Pv(t.ease);
function Gx(e, t, {onUpdate: n, onComplete: r, ...i}) {
  if (
    !(
      Ux() &&
      $x.has(t) &&
      !i.repeatDelay &&
      i.repeatType !== 'mirror' &&
      i.damping !== 0 &&
      i.type !== 'inertia'
    )
  )
    return !1;
  let s = !1,
    a,
    l;
  const u = () => {
    l = new Promise(p => {
      a = p;
    });
  };
  u();
  let {keyframes: c, duration: f = 300, ease: d, times: h} = i;
  if (Wx(t, i)) {
    const p = ms({...i, repeat: 0, delay: 0});
    let g = {done: !1, value: c[0]};
    const w = [];
    let E = 0;
    for (; !g.done && E < Hx; ) (g = p.sample(E)), w.push(g.value), (E += mo);
    (h = void 0), (c = w), (f = E - mo), (d = 'linear');
  }
  const v = nx(e.owner.current, t, c, {...i, duration: f, ease: d, times: h});
  i.syncStart &&
    (v.startTime = we.isProcessing
      ? we.timestamp
      : document.timeline
      ? document.timeline.currentTime
      : performance.now());
  const y = () => v.cancel(),
    x = () => {
      te.update(y), a(), u();
    };
  return (
    (v.onfinish = () => {
      e.set(rx(c, i)), r && r(), x();
    }),
    {
      then(p, g) {
        return l.then(p, g);
      },
      attachTimeline(p) {
        return (v.timeline = p), (v.onfinish = null), de;
      },
      get time() {
        return At(v.currentTime || 0);
      },
      set time(p) {
        v.currentTime = ln(p);
      },
      get speed() {
        return v.playbackRate;
      },
      set speed(p) {
        v.playbackRate = p;
      },
      get duration() {
        return At(f);
      },
      play: () => {
        s || (v.play(), It(y));
      },
      pause: () => v.pause(),
      stop: () => {
        if (((s = !0), v.playState === 'idle')) return;
        const {currentTime: p} = v;
        if (p) {
          const g = ms({...i, autoplay: !1});
          e.setWithVelocity(g.sample(p - mo).value, g.sample(p).value, mo);
        }
        x();
      },
      complete: () => v.finish(),
      cancel: x,
    }
  );
}
function Qx({keyframes: e, delay: t, onUpdate: n, onComplete: r}) {
  const i = () => (
    n && n(e[e.length - 1]),
    r && r(),
    {
      time: 0,
      speed: 1,
      duration: 0,
      play: de,
      pause: de,
      stop: de,
      then: o => (o(), Promise.resolve()),
      cancel: de,
      complete: de,
    }
  );
  return t
    ? ms({keyframes: [0, 1], duration: 0, delay: t, onComplete: i})
    : i();
}
const Kx = {type: 'spring', stiffness: 500, damping: 25, restSpeed: 10},
  qx = e => ({
    type: 'spring',
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Yx = {type: 'keyframes', duration: 0.8},
  Xx = {type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3},
  Zx = (e, {keyframes: t}) =>
    t.length > 2
      ? Yx
      : zn.has(e)
      ? e.startsWith('scale')
        ? qx(t[1])
        : Kx
      : Xx,
  Kl = (e, t) =>
    e === 'zIndex'
      ? !1
      : !!(
          typeof t == 'number' ||
          Array.isArray(t) ||
          (typeof t == 'string' &&
            (hn.test(t) || t === '0') &&
            !t.startsWith('url('))
        ),
  Jx = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function eS(e) {
  const [t, n] = e.slice(0, -1).split('(');
  if (t === 'drop-shadow') return e;
  const [r] = n.match(Ws) || [];
  if (!r) return e;
  const i = n.replace(r, '');
  let o = Jx.has(t) ? 1 : 0;
  return r !== n && (o *= 100), t + '(' + o + i + ')';
}
const tS = /([a-z-]*)\(.*?\)/g,
  ql = {
    ...hn,
    getAnimatableNone: e => {
      const t = e.match(tS);
      return t ? t.map(eS).join(' ') : e;
    },
  },
  nS = {
    ...lv,
    color: Ae,
    backgroundColor: Ae,
    outlineColor: Ae,
    fill: Ae,
    stroke: Ae,
    borderColor: Ae,
    borderTopColor: Ae,
    borderRightColor: Ae,
    borderBottomColor: Ae,
    borderLeftColor: Ae,
    filter: ql,
    WebkitFilter: ql,
  },
  xc = e => nS[e];
function Kv(e, t) {
  let n = xc(e);
  return (
    n !== ql && (n = hn), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
const qv = e => /^0[^.\s]+$/.test(e);
function rS(e) {
  if (typeof e == 'number') return e === 0;
  if (e !== null) return e === 'none' || e === '0' || qv(e);
}
function iS(e, t, n, r) {
  const i = Kl(t, n);
  let o;
  Array.isArray(n) ? (o = [...n]) : (o = [null, n]);
  const s = r.from !== void 0 ? r.from : e.get();
  let a;
  const l = [];
  for (let u = 0; u < o.length; u++)
    o[u] === null && (o[u] = u === 0 ? s : o[u - 1]),
      rS(o[u]) && l.push(u),
      typeof o[u] == 'string' && o[u] !== 'none' && o[u] !== '0' && (a = o[u]);
  if (i && l.length && a)
    for (let u = 0; u < l.length; u++) {
      const c = l[u];
      o[c] = Kv(t, a);
    }
  return o;
}
function oS({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: s,
  repeatDelay: a,
  from: l,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
function Yv(e, t) {
  return e[t] || e.default || e;
}
const Sc =
  (e, t, n, r = {}) =>
  i => {
    const o = Yv(r, e) || {},
      s = o.delay || r.delay || 0;
    let {elapsed: a = 0} = r;
    a = a - ln(s);
    const l = iS(t, e, n, o),
      u = l[0],
      c = l[l.length - 1],
      f = Kl(e, u),
      d = Kl(e, c);
    let h = {
      keyframes: l,
      velocity: t.getVelocity(),
      ease: 'easeOut',
      ...o,
      delay: -a,
      onUpdate: v => {
        t.set(v), o.onUpdate && o.onUpdate(v);
      },
      onComplete: () => {
        i(), o.onComplete && o.onComplete();
      },
    };
    if (
      (oS(o) || (h = {...h, ...Zx(e, h)}),
      h.duration && (h.duration = ln(h.duration)),
      h.repeatDelay && (h.repeatDelay = ln(h.repeatDelay)),
      !f || !d || tx.current || o.type === !1)
    )
      return Qx(h);
    if (
      t.owner &&
      t.owner.current instanceof HTMLElement &&
      !t.owner.getProps().onUpdate
    ) {
      const v = Gx(t, e, h);
      if (v) return v;
    }
    return ms(h);
  };
function vs(e) {
  return !!(Ue(e) && e.add);
}
const Xv = e => /^\-?\d*\.?\d+$/.test(e);
function kc(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ec(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Pc {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return kc(this.subscriptions, t), () => Ec(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let o = 0; o < i; o++) {
          const s = this.subscriptions[o];
          s && s(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const sS = e => !isNaN(parseFloat(e));
class aS {
  constructor(t, n = {}) {
    (this.version = '10.16.4'),
      (this.timeDelta = 0),
      (this.lastUpdated = 0),
      (this.canTrackVelocity = !1),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        (this.prev = this.current), (this.current = r);
        const {delta: o, timestamp: s} = we;
        this.lastUpdated !== s &&
          ((this.timeDelta = o),
          (this.lastUpdated = s),
          te.postRender(this.scheduleVelocityCheck)),
          this.prev !== this.current &&
            this.events.change &&
            this.events.change.notify(this.current),
          this.events.velocityChange &&
            this.events.velocityChange.notify(this.getVelocity()),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.scheduleVelocityCheck = () => te.postRender(this.velocityCheck)),
      (this.velocityCheck = ({timestamp: r}) => {
        r !== this.lastUpdated &&
          ((this.prev = this.current),
          this.events.velocityChange &&
            this.events.velocityChange.notify(this.getVelocity()));
      }),
      (this.hasAnimated = !1),
      (this.prev = this.current = t),
      (this.canTrackVelocity = sS(this.current)),
      (this.owner = n.owner);
  }
  onChange(t) {
    return this.on('change', t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Pc());
    const r = this.events[t].add(n);
    return t === 'change'
      ? () => {
          r(),
            te.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    (this.passiveEffect = t), (this.stopPassiveEffect = n);
  }
  set(t, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n), (this.prev = t), (this.timeDelta = r);
  }
  jump(t) {
    this.updateAndNotify(t),
      (this.prev = t),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity
      ? Wv(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
      : 0;
  }
  start(t) {
    return (
      this.stop(),
      new Promise(n => {
        (this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Sr(e, t) {
  return new aS(e, t);
}
const Zv = e => t => t.test(e),
  lS = {test: e => e === 'auto', parse: e => e},
  Jv = [Fn, U, kt, $t, h1, d1, lS],
  zr = e => Jv.find(Zv(e)),
  uS = [...Jv, Ae, hn],
  cS = e => uS.find(Zv(e));
function fS(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Sr(n));
}
function dS(e, t) {
  const n = Qs(e, t);
  let {
    transitionEnd: r = {},
    transition: i = {},
    ...o
  } = n ? e.makeTargetAnimatable(n, !1) : {};
  o = {...o, ...r};
  for (const s in o) {
    const a = b1(o[s]);
    fS(e, s, a);
  }
}
function hS(e, t, n) {
  var r, i;
  const o = Object.keys(t).filter(a => !e.hasValue(a)),
    s = o.length;
  if (s)
    for (let a = 0; a < s; a++) {
      const l = o[a],
        u = t[l];
      let c = null;
      Array.isArray(u) && (c = u[0]),
        c === null &&
          (c =
            (i = (r = n[l]) !== null && r !== void 0 ? r : e.readValue(l)) !==
              null && i !== void 0
              ? i
              : t[l]),
        c != null &&
          (typeof c == 'string' && (Xv(c) || qv(c))
            ? (c = parseFloat(c))
            : !cS(c) && hn.test(u) && (c = Kv(l, u)),
          e.addValue(l, Sr(c, {owner: e})),
          n[l] === void 0 && (n[l] = c),
          c !== null && e.setBaseTarget(l, c));
    }
}
function pS(e, t) {
  return t ? (t[e] || t.default || t).from : void 0;
}
function mS(e, t, n) {
  const r = {};
  for (const i in e) {
    const o = pS(i, t);
    if (o !== void 0) r[i] = o;
    else {
      const s = n.getValue(i);
      s && (r[i] = s.get());
    }
  }
  return r;
}
function vS({protectedKeys: e, needsAnimating: t}, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
function eg(e, t, {delay: n = 0, transitionOverride: r, type: i} = {}) {
  let {
    transition: o = e.getDefaultTransition(),
    transitionEnd: s,
    ...a
  } = e.makeTargetAnimatable(t);
  const l = e.getValue('willChange');
  r && (o = r);
  const u = [],
    c = i && e.animationState && e.animationState.getState()[i];
  for (const f in a) {
    const d = e.getValue(f),
      h = a[f];
    if (!d || h === void 0 || (c && vS(c, f))) continue;
    const v = {delay: n, elapsed: 0, ...o};
    if (window.HandoffAppearAnimations && !d.hasAnimated) {
      const x = e.getProps()[J1];
      x &&
        ((v.elapsed = window.HandoffAppearAnimations(x, f, d, te)),
        (v.syncStart = !0));
    }
    d.start(Sc(f, d, h, e.shouldReduceMotion && zn.has(f) ? {type: !1} : v));
    const y = d.animation;
    vs(l) && (l.add(f), y.then(() => l.remove(f))), u.push(y);
  }
  return (
    s &&
      Promise.all(u).then(() => {
        s && dS(e, s);
      }),
    u
  );
}
function Yl(e, t, n = {}) {
  const r = Qs(e, t, n.custom);
  let {transition: i = e.getDefaultTransition() || {}} = r || {};
  n.transitionOverride && (i = n.transitionOverride);
  const o = r ? () => Promise.all(eg(e, r, n)) : () => Promise.resolve(),
    s =
      e.variantChildren && e.variantChildren.size
        ? (l = 0) => {
            const {
              delayChildren: u = 0,
              staggerChildren: c,
              staggerDirection: f,
            } = i;
            return gS(e, t, u + l, c, f, n);
          }
        : () => Promise.resolve(),
    {when: a} = i;
  if (a) {
    const [l, u] = a === 'beforeChildren' ? [o, s] : [s, o];
    return l().then(() => u());
  } else return Promise.all([o(), s(n.delay)]);
}
function gS(e, t, n = 0, r = 0, i = 1, o) {
  const s = [],
    a = (e.variantChildren.size - 1) * r,
    l = i === 1 ? (u = 0) => u * r : (u = 0) => a - u * r;
  return (
    Array.from(e.variantChildren)
      .sort(yS)
      .forEach((u, c) => {
        u.notify('AnimationStart', t),
          s.push(
            Yl(u, t, {...o, delay: n + l(c)}).then(() =>
              u.notify('AnimationComplete', t),
            ),
          );
      }),
    Promise.all(s)
  );
}
function yS(e, t) {
  return e.sortNodePosition(t);
}
function wS(e, t, n = {}) {
  e.notify('AnimationStart', t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map(o => Yl(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == 'string') r = Yl(e, t, n);
  else {
    const i = typeof t == 'function' ? Qs(e, t, n.custom) : t;
    r = Promise.all(eg(e, i, n));
  }
  return r.then(() => e.notify('AnimationComplete', t));
}
const xS = [...sc].reverse(),
  SS = sc.length;
function kS(e) {
  return t => Promise.all(t.map(({animation: n, options: r}) => wS(e, n, r)));
}
function ES(e) {
  let t = kS(e);
  const n = TS();
  let r = !0;
  const i = (l, u) => {
    const c = Qs(e, u);
    if (c) {
      const {transition: f, transitionEnd: d, ...h} = c;
      l = {...l, ...h, ...d};
    }
    return l;
  };
  function o(l) {
    t = l(e);
  }
  function s(l, u) {
    const c = e.getProps(),
      f = e.getVariantContext(!0) || {},
      d = [],
      h = new Set();
    let v = {},
      y = 1 / 0;
    for (let m = 0; m < SS; m++) {
      const p = xS[m],
        g = n[p],
        w = c[p] !== void 0 ? c[p] : f[p],
        E = Ti(w),
        T = p === u ? g.isActive : null;
      T === !1 && (y = m);
      let P = w === f[p] && w !== c[p] && E;
      if (
        (P && r && e.manuallyAnimateOnMount && (P = !1),
        (g.protectedKeys = {...v}),
        (!g.isActive && T === null) ||
          (!w && !g.prevProp) ||
          $s(w) ||
          typeof w == 'boolean')
      )
        continue;
      const k = PS(g.prevProp, w);
      let b = k || (p === u && g.isActive && !P && E) || (m > y && E);
      const C = Array.isArray(w) ? w : [w];
      let M = C.reduce(i, {});
      T === !1 && (M = {});
      const {prevResolvedValues: V = {}} = g,
        F = {...V, ...M},
        j = A => {
          (b = !0), h.delete(A), (g.needsAnimating[A] = !0);
        };
      for (const A in F) {
        const $ = M[A],
          W = V[A];
        v.hasOwnProperty(A) ||
          ($ !== W
            ? ds($) && ds(W)
              ? !kv($, W) || k
                ? j(A)
                : (g.protectedKeys[A] = !0)
              : $ !== void 0
              ? j(A)
              : h.add(A)
            : $ !== void 0 && h.has(A)
            ? j(A)
            : (g.protectedKeys[A] = !0));
      }
      (g.prevProp = w),
        (g.prevResolvedValues = M),
        g.isActive && (v = {...v, ...M}),
        r && e.blockInitialAnimation && (b = !1),
        b &&
          !P &&
          d.push(...C.map(A => ({animation: A, options: {type: p, ...l}})));
    }
    if (h.size) {
      const m = {};
      h.forEach(p => {
        const g = e.getBaseTarget(p);
        g !== void 0 && (m[p] = g);
      }),
        d.push({animation: m});
    }
    let x = !!d.length;
    return (
      r && c.initial === !1 && !e.manuallyAnimateOnMount && (x = !1),
      (r = !1),
      x ? t(d) : Promise.resolve()
    );
  }
  function a(l, u, c) {
    var f;
    if (n[l].isActive === u) return Promise.resolve();
    (f = e.variantChildren) === null ||
      f === void 0 ||
      f.forEach(h => {
        var v;
        return (v = h.animationState) === null || v === void 0
          ? void 0
          : v.setActive(l, u);
      }),
      (n[l].isActive = u);
    const d = s(c, l);
    for (const h in n) n[h].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: s,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
  };
}
function PS(e, t) {
  return typeof t == 'string' ? t !== e : Array.isArray(t) ? !kv(t, e) : !1;
}
function wn(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function TS() {
  return {
    animate: wn(!0),
    whileInView: wn(),
    whileHover: wn(),
    whileTap: wn(),
    whileDrag: wn(),
    whileFocus: wn(),
    exit: wn(),
  };
}
class CS extends gn {
  constructor(t) {
    super(t), t.animationState || (t.animationState = ES(t));
  }
  updateAnimationControlsSubscription() {
    const {animate: t} = this.node.getProps();
    this.unmount(), $s(t) && (this.unmount = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const {animate: t} = this.node.getProps(),
      {animate: n} = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {}
}
let _S = 0;
class bS extends gn {
  constructor() {
    super(...arguments), (this.id = _S++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const {
        isPresent: t,
        onExitComplete: n,
        custom: r,
      } = this.node.presenceContext,
      {isPresent: i} = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === i) return;
    const o = this.node.animationState.setActive('exit', !t, {
      custom: r ?? this.node.getProps().custom,
    });
    n && !t && o.then(() => n(this.id));
  }
  mount() {
    const {register: t} = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const OS = {animation: {Feature: CS}, exit: {Feature: bS}},
  pd = (e, t) => Math.abs(e - t);
function RS(e, t) {
  const n = pd(e.x, t.x),
    r = pd(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class tg {
  constructor(t, n, {transformPagePoint: r} = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const u = Fa(this.lastMoveEventInfo, this.history),
          c = this.startEvent !== null,
          f = RS(u.offset, {x: 0, y: 0}) >= 3;
        if (!c && !f) return;
        const {point: d} = u,
          {timestamp: h} = we;
        this.history.push({...d, timestamp: h});
        const {onStart: v, onMove: y} = this.handlers;
        c ||
          (v && v(this.lastMoveEvent, u),
          (this.startEvent = this.lastMoveEvent)),
          y && y(this.lastMoveEvent, u);
      }),
      (this.handlePointerMove = (u, c) => {
        (this.lastMoveEvent = u),
          (this.lastMoveEventInfo = za(c, this.transformPagePoint)),
          te.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (u, c) => {
        if ((this.end(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return;
        const {onEnd: f, onSessionEnd: d} = this.handlers,
          h = Fa(
            u.type === 'pointercancel'
              ? this.lastMoveEventInfo
              : za(c, this.transformPagePoint),
            this.history,
          );
        this.startEvent && f && f(u, h), d && d(u, h);
      }),
      !gv(t))
    )
      return;
    (this.handlers = n), (this.transformPagePoint = r);
    const i = Gs(t),
      o = za(i, this.transformPagePoint),
      {point: s} = o,
      {timestamp: a} = we;
    this.history = [{...s, timestamp: a}];
    const {onSessionStart: l} = n;
    l && l(t, Fa(o, this.history)),
      (this.removeListeners = an(
        Mt(window, 'pointermove', this.handlePointerMove),
        Mt(window, 'pointerup', this.handlePointerUp),
        Mt(window, 'pointercancel', this.handlePointerUp),
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), It(this.updatePoint);
  }
}
function za(e, t) {
  return t ? {point: t(e.point)} : e;
}
function md(e, t) {
  return {x: e.x - t.x, y: e.y - t.y};
}
function Fa({point: e}, t) {
  return {
    point: e,
    delta: md(e, ng(t)),
    offset: md(e, MS(t)),
    velocity: AS(t, 0.1),
  };
}
function MS(e) {
  return e[0];
}
function ng(e) {
  return e[e.length - 1];
}
function AS(e, t) {
  if (e.length < 2) return {x: 0, y: 0};
  let n = e.length - 1,
    r = null;
  const i = ng(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > ln(t))); ) n--;
  if (!r) return {x: 0, y: 0};
  const o = At(i.timestamp - r.timestamp);
  if (o === 0) return {x: 0, y: 0};
  const s = {x: (i.x - r.x) / o, y: (i.y - r.y) / o};
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
function Ke(e) {
  return e.max - e.min;
}
function Xl(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function vd(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = ae(t.min, t.max, e.origin)),
    (e.scale = Ke(n) / Ke(t)),
    (Xl(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
    (e.translate = ae(n.min, n.max, e.origin) - e.originPoint),
    (Xl(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function si(e, t, n, r) {
  vd(e.x, t.x, n.x, r ? r.originX : void 0),
    vd(e.y, t.y, n.y, r ? r.originY : void 0);
}
function gd(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + Ke(t));
}
function LS(e, t, n) {
  gd(e.x, t.x, n.x), gd(e.y, t.y, n.y);
}
function yd(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + Ke(t));
}
function ai(e, t, n) {
  yd(e.x, t.x, n.x), yd(e.y, t.y, n.y);
}
function NS(e, {min: t, max: n}, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? ae(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? ae(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function wd(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function jS(e, {top: t, left: n, bottom: r, right: i}) {
  return {x: wd(e.x, n, i), y: wd(e.y, t, r)};
}
function xd(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), {min: n, max: r};
}
function DS(e, t) {
  return {x: xd(e.x, t.x), y: xd(e.y, t.y)};
}
function IS(e, t) {
  let n = 0.5;
  const r = Ke(e),
    i = Ke(t);
  return (
    i > r
      ? (n = _i(t.min, t.max - r, e.min))
      : r > i && (n = _i(e.min, e.max - i, t.min)),
    dn(0, 1, n)
  );
}
function VS(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const Zl = 0.35;
function zS(e = Zl) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Zl),
    {x: Sd(e, 'left', 'right'), y: Sd(e, 'top', 'bottom')}
  );
}
function Sd(e, t, n) {
  return {min: kd(e, t), max: kd(e, n)};
}
function kd(e, t) {
  return typeof e == 'number' ? e : e[t] || 0;
}
const Ed = () => ({translate: 0, scale: 1, origin: 0, originPoint: 0}),
  or = () => ({x: Ed(), y: Ed()}),
  Pd = () => ({min: 0, max: 0}),
  pe = () => ({x: Pd(), y: Pd()});
function gt(e) {
  return [e('x'), e('y')];
}
function rg({top: e, left: t, right: n, bottom: r}) {
  return {x: {min: t, max: n}, y: {min: e, max: r}};
}
function FS({x: e, y: t}) {
  return {top: t.min, right: e.max, bottom: t.max, left: e.min};
}
function BS(e, t) {
  if (!t) return e;
  const n = t({x: e.left, y: e.top}),
    r = t({x: e.right, y: e.bottom});
  return {top: n.y, left: n.x, bottom: r.y, right: r.x};
}
function Ba(e) {
  return e === void 0 || e === 1;
}
function Jl({scale: e, scaleX: t, scaleY: n}) {
  return !Ba(e) || !Ba(t) || !Ba(n);
}
function En(e) {
  return Jl(e) || ig(e) || e.z || e.rotate || e.rotateX || e.rotateY;
}
function ig(e) {
  return Td(e.x) || Td(e.y);
}
function Td(e) {
  return e && e !== '0%';
}
function gs(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function Cd(e, t, n, r, i) {
  return i !== void 0 && (e = gs(e, i, r)), gs(e, n, r) + t;
}
function eu(e, t = 0, n = 1, r, i) {
  (e.min = Cd(e.min, t, n, r, i)), (e.max = Cd(e.max, t, n, r, i));
}
function og(e, {x: t, y: n}) {
  eu(e.x, t.translate, t.scale, t.originPoint),
    eu(e.y, n.translate, n.scale, n.originPoint);
}
function US(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let o, s;
  for (let a = 0; a < i; a++) {
    (o = n[a]), (s = o.projectionDelta);
    const l = o.instance;
    (l && l.style && l.style.display === 'contents') ||
      (r &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        sr(e, {x: -o.scroll.offset.x, y: -o.scroll.offset.y}),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), og(e, s)),
      r && En(o.latestValues) && sr(e, o.latestValues));
  }
  (t.x = _d(t.x)), (t.y = _d(t.y));
}
function _d(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999
    ? e
    : 1;
}
function Gt(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function bd(e, t, [n, r, i]) {
  const o = t[i] !== void 0 ? t[i] : 0.5,
    s = ae(e.min, e.max, o);
  eu(e, t[n], t[r], s, t.scale);
}
const $S = ['x', 'scaleX', 'originX'],
  HS = ['y', 'scaleY', 'originY'];
function sr(e, t) {
  bd(e.x, t, $S), bd(e.y, t, HS);
}
function sg(e, t) {
  return rg(BS(e.getBoundingClientRect(), t));
}
function WS(e, t, n) {
  const r = sg(e, n),
    {scroll: i} = t;
  return i && (Gt(r.x, i.offset.x), Gt(r.y, i.offset.y)), r;
}
const GS = new WeakMap();
class QS {
  constructor(t) {
    (this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = {x: 0, y: 0}),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = pe()),
      (this.visualElement = t);
  }
  start(t, {snapToCursor: n = !1} = {}) {
    const {presenceContext: r} = this.visualElement;
    if (r && r.isPresent === !1) return;
    const i = l => {
        this.stopAnimation(), n && this.snapToCursor(Gs(l, 'page').point);
      },
      o = (l, u) => {
        const {drag: c, dragPropagation: f, onDragStart: d} = this.getProps();
        if (
          c &&
          !f &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = wv(c)),
          !this.openGlobalLock)
        )
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          gt(v => {
            let y = this.getAxisMotionValue(v).get() || 0;
            if (kt.test(y)) {
              const {projection: x} = this.visualElement;
              if (x && x.layout) {
                const m = x.layout.layoutBox[v];
                m && (y = Ke(m) * (parseFloat(y) / 100));
              }
            }
            this.originPoint[v] = y;
          }),
          d && te.update(() => d(l, u), !1, !0);
        const {animationState: h} = this.visualElement;
        h && h.setActive('whileDrag', !0);
      },
      s = (l, u) => {
        const {
          dragPropagation: c,
          dragDirectionLock: f,
          onDirectionLock: d,
          onDrag: h,
        } = this.getProps();
        if (!c && !this.openGlobalLock) return;
        const {offset: v} = u;
        if (f && this.currentDirection === null) {
          (this.currentDirection = KS(v)),
            this.currentDirection !== null && d && d(this.currentDirection);
          return;
        }
        this.updateAxis('x', u.point, v),
          this.updateAxis('y', u.point, v),
          this.visualElement.render(),
          h && h(l, u);
      },
      a = (l, u) => this.stop(l, u);
    this.panSession = new tg(
      t,
      {onSessionStart: i, onStart: o, onMove: s, onSessionEnd: a},
      {transformPagePoint: this.visualElement.getTransformPagePoint()},
    );
  }
  stop(t, n) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const {velocity: i} = n;
    this.startAnimation(i);
    const {onDragEnd: o} = this.getProps();
    o && te.update(() => o(t, n));
  }
  cancel() {
    this.isDragging = !1;
    const {projection: t, animationState: n} = this.visualElement;
    t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const {dragPropagation: r} = this.getProps();
    !r &&
      this.openGlobalLock &&
      (this.openGlobalLock(), (this.openGlobalLock = null)),
      n && n.setActive('whileDrag', !1);
  }
  updateAxis(t, n, r) {
    const {drag: i} = this.getProps();
    if (!r || !vo(t, i, this.currentDirection)) return;
    const o = this.getAxisMotionValue(t);
    let s = this.originPoint[t] + r[t];
    this.constraints &&
      this.constraints[t] &&
      (s = NS(s, this.constraints[t], this.elastic[t])),
      o.set(s);
  }
  resolveConstraints() {
    const {dragConstraints: t, dragElastic: n} = this.getProps(),
      {layout: r} = this.visualElement.projection || {},
      i = this.constraints;
    t && rr(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && r
      ? (this.constraints = jS(r.layoutBox, t))
      : (this.constraints = !1),
      (this.elastic = zS(n)),
      i !== this.constraints &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        gt(o => {
          this.getAxisMotionValue(o) &&
            (this.constraints[o] = VS(r.layoutBox[o], this.constraints[o]));
        });
  }
  resolveRefConstraints() {
    const {dragConstraints: t, onMeasureDragConstraints: n} = this.getProps();
    if (!t || !rr(t)) return !1;
    const r = t.current,
      {projection: i} = this.visualElement;
    if (!i || !i.layout) return !1;
    const o = WS(r, i.root, this.visualElement.getTransformPagePoint());
    let s = DS(i.layout.layoutBox, o);
    if (n) {
      const a = n(FS(s));
      (this.hasMutatedConstraints = !!a), a && (s = rg(a));
    }
    return s;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: s,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      u = gt(c => {
        if (!vo(c, n, this.currentDirection)) return;
        let f = (l && l[c]) || {};
        s && (f = {min: 0, max: 0});
        const d = i ? 200 : 1e6,
          h = i ? 40 : 1e7,
          v = {
            type: 'inertia',
            velocity: r ? t[c] : 0,
            bounceStiffness: d,
            bounceDamping: h,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...f,
          };
        return this.startAxisValueAnimation(c, v);
      });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return r.start(Sc(t, r, 0, n));
  }
  stopAnimation() {
    gt(t => this.getAxisMotionValue(t).stop());
  }
  getAxisMotionValue(t) {
    const n = '_drag' + t.toUpperCase(),
      r = this.visualElement.getProps(),
      i = r[n];
    return (
      i ||
      this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    gt(n => {
      const {drag: r} = this.getProps();
      if (!vo(n, r, this.currentDirection)) return;
      const {projection: i} = this.visualElement,
        o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const {min: s, max: a} = i.layout.layoutBox[n];
        o.set(t[n] - ae(s, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const {drag: t, dragConstraints: n} = this.getProps(),
      {projection: r} = this.visualElement;
    if (!rr(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = {x: 0, y: 0};
    gt(s => {
      const a = this.getAxisMotionValue(s);
      if (a) {
        const l = a.get();
        i[s] = IS({min: l, max: l}, this.constraints[s]);
      }
    });
    const {transformTemplate: o} = this.visualElement.getProps();
    (this.visualElement.current.style.transform = o ? o({}, '') : 'none'),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      gt(s => {
        if (!vo(s, t, null)) return;
        const a = this.getAxisMotionValue(s),
          {min: l, max: u} = this.constraints[s];
        a.set(ae(l, u, i[s]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    GS.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Mt(t, 'pointerdown', l => {
        const {drag: u, dragListener: c = !0} = this.getProps();
        u && c && this.start(l);
      }),
      r = () => {
        const {dragConstraints: l} = this.getProps();
        rr(l) && (this.constraints = this.resolveRefConstraints());
      },
      {projection: i} = this.visualElement,
      o = i.addEventListener('measure', r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), r();
    const s = Ot(window, 'resize', () => this.scalePositionWithinConstraints()),
      a = i.addEventListener('didUpdate', ({delta: l, hasLayoutChanged: u}) => {
        this.isDragging &&
          u &&
          (gt(c => {
            const f = this.getAxisMotionValue(c);
            f &&
              ((this.originPoint[c] += l[c].translate),
              f.set(f.get() + l[c].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      s(), n(), o(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: s = Zl,
        dragMomentum: a = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: s,
      dragMomentum: a,
    };
  }
}
function vo(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function KS(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = 'y') : Math.abs(e.x) > t && (n = 'x'), n;
}
class qS extends gn {
  constructor(t) {
    super(t),
      (this.removeGroupControls = de),
      (this.removeListeners = de),
      (this.controls = new QS(t));
  }
  mount() {
    const {dragControls: t} = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || de);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Od = e => (t, n) => {
  e && te.update(() => e(t, n));
};
class YS extends gn {
  constructor() {
    super(...arguments), (this.removePointerDownListener = de);
  }
  onPointerDown(t) {
    this.session = new tg(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: r,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: Od(t),
      onStart: Od(n),
      onMove: r,
      onEnd: (o, s) => {
        delete this.session, i && te.update(() => i(o, s));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Mt(this.node.current, 'pointerdown', t =>
      this.onPointerDown(t),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
function XS() {
  const e = S.useContext(oc);
  if (e === null) return [!0, null];
  const {isPresent: t, onExitComplete: n, register: r} = e,
    i = S.useId();
  return S.useEffect(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0];
}
const Io = {hasAnimatedSinceResize: !0, hasEverUpdated: !1};
function Rd(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const Fr = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == 'string')
        if (U.test(e)) e = parseFloat(e);
        else return e;
      const n = Rd(e, t.target.x),
        r = Rd(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  ZS = {
    correct: (e, {treeScale: t, projectionDelta: n}) => {
      const r = e,
        i = hn.parse(e);
      if (i.length > 5) return r;
      const o = hn.createTransformer(e),
        s = typeof i[0] != 'number' ? 1 : 0,
        a = n.x.scale * t.x,
        l = n.y.scale * t.y;
      (i[0 + s] /= a), (i[1 + s] /= l);
      const u = ae(a, l, 0.5);
      return (
        typeof i[2 + s] == 'number' && (i[2 + s] /= u),
        typeof i[3 + s] == 'number' && (i[3 + s] /= u),
        o(i)
      );
    },
  };
class JS extends I.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      {projection: o} = t;
    o1(ek),
      o &&
        (n.group && n.group.add(o),
        r && r.register && i && r.register(o),
        o.root.didUpdate(),
        o.addEventListener('animationComplete', () => {
          this.safeToRemove();
        }),
        o.setOptions({
          ...o.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Io.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: r,
        drag: i,
        isPresent: o,
      } = this.props,
      s = r.projection;
    return (
      s &&
        ((s.isPresent = o),
        i || t.layoutDependency !== n || n === void 0
          ? s.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== o &&
          (o
            ? s.promote()
            : s.relegate() ||
              te.postRender(() => {
                const a = s.getStack();
                (!a || !a.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const {projection: t} = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      queueMicrotask(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {visualElement: t, layoutGroup: n, switchLayoutGroup: r} = this.props,
      {projection: i} = t;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const {safeToRemove: t} = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function ag(e) {
  const [t, n] = XS(),
    r = S.useContext(nv);
  return I.createElement(JS, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: S.useContext(rv),
    isPresent: t,
    safeToRemove: n,
  });
}
const ek = {
    borderRadius: {
      ...Fr,
      applyTo: [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
      ],
    },
    borderTopLeftRadius: Fr,
    borderTopRightRadius: Fr,
    borderBottomLeftRadius: Fr,
    borderBottomRightRadius: Fr,
    boxShadow: ZS,
  },
  lg = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  tk = lg.length,
  Md = e => (typeof e == 'string' ? parseFloat(e) : e),
  Ad = e => typeof e == 'number' || U.test(e);
function nk(e, t, n, r, i, o) {
  i
    ? ((e.opacity = ae(0, n.opacity !== void 0 ? n.opacity : 1, rk(r))),
      (e.opacityExit = ae(t.opacity !== void 0 ? t.opacity : 1, 0, ik(r))))
    : o &&
      (e.opacity = ae(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r,
      ));
  for (let s = 0; s < tk; s++) {
    const a = `border${lg[s]}Radius`;
    let l = Ld(t, a),
      u = Ld(n, a);
    if (l === void 0 && u === void 0) continue;
    l || (l = 0),
      u || (u = 0),
      l === 0 || u === 0 || Ad(l) === Ad(u)
        ? ((e[a] = Math.max(ae(Md(l), Md(u), r), 0)),
          (kt.test(u) || kt.test(l)) && (e[a] += '%'))
        : (e[a] = u);
  }
  (t.rotate || n.rotate) && (e.rotate = ae(t.rotate || 0, n.rotate || 0, r));
}
function Ld(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const rk = ug(0, 0.5, gc),
  ik = ug(0.5, 0.95, de);
function ug(e, t, n) {
  return r => (r < e ? 0 : r > t ? 1 : n(_i(e, t, r)));
}
function Nd(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function Ze(e, t) {
  Nd(e.x, t.x), Nd(e.y, t.y);
}
function jd(e, t, n, r, i) {
  return (
    (e -= t), (e = gs(e, 1 / n, r)), i !== void 0 && (e = gs(e, 1 / i, r)), e
  );
}
function ok(e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
  if (
    (kt.test(t) &&
      ((t = parseFloat(t)), (t = ae(s.min, s.max, t / 100) - s.min)),
    typeof t != 'number')
  )
    return;
  let a = ae(o.min, o.max, r);
  e === o && (a -= t),
    (e.min = jd(e.min, t, n, a, i)),
    (e.max = jd(e.max, t, n, a, i));
}
function Dd(e, t, [n, r, i], o, s) {
  ok(e, t[n], t[r], t[i], t.scale, o, s);
}
const sk = ['x', 'scaleX', 'originX'],
  ak = ['y', 'scaleY', 'originY'];
function Id(e, t, n, r) {
  Dd(e.x, t, sk, n ? n.x : void 0, r ? r.x : void 0),
    Dd(e.y, t, ak, n ? n.y : void 0, r ? r.y : void 0);
}
function Vd(e) {
  return e.translate === 0 && e.scale === 1;
}
function cg(e) {
  return Vd(e.x) && Vd(e.y);
}
function lk(e, t) {
  return (
    e.x.min === t.x.min &&
    e.x.max === t.x.max &&
    e.y.min === t.y.min &&
    e.y.max === t.y.max
  );
}
function fg(e, t) {
  return (
    Math.round(e.x.min) === Math.round(t.x.min) &&
    Math.round(e.x.max) === Math.round(t.x.max) &&
    Math.round(e.y.min) === Math.round(t.y.min) &&
    Math.round(e.y.max) === Math.round(t.y.max)
  );
}
function zd(e) {
  return Ke(e.x) / Ke(e.y);
}
class uk {
  constructor() {
    this.members = [];
  }
  add(t) {
    kc(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (Ec(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex(i => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((t.snapshot = r.snapshot),
          (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const {crossfade: i} = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach(t => {
      const {options: n, resumingFrom: r} = t;
      n.onExitComplete && n.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach(t => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Fd(e, t, n) {
  let r = '';
  const i = e.x.translate / t.x,
    o = e.y.translate / t.y;
  if (
    ((i || o) && (r = `translate3d(${i}px, ${o}px, 0) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const {rotate: l, rotateX: u, rotateY: c} = n;
    l && (r += `rotate(${l}deg) `),
      u && (r += `rotateX(${u}deg) `),
      c && (r += `rotateY(${c}deg) `);
  }
  const s = e.x.scale * t.x,
    a = e.y.scale * t.y;
  return (s !== 1 || a !== 1) && (r += `scale(${s}, ${a})`), r || 'none';
}
const ck = (e, t) => e.depth - t.depth;
class fk {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    kc(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    Ec(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(ck),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
function dk(e, t) {
  const n = performance.now(),
    r = ({timestamp: i}) => {
      const o = i - n;
      o >= t && (It(r), e(o - t));
    };
  return te.read(r, !0), () => It(r);
}
function hk(e) {
  window.MotionDebug && window.MotionDebug.record(e);
}
function pk(e) {
  return e instanceof SVGElement && e.tagName !== 'svg';
}
function mk(e, t, n) {
  const r = Ue(e) ? e : Sr(e);
  return r.start(Sc('', r, t, n)), r.animation;
}
const Bd = ['', 'X', 'Y', 'Z'],
  Ud = 1e3;
let vk = 0;
const Pn = {
  type: 'projectionFrame',
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0,
};
function dg({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(s = {}, a = t == null ? void 0 : t()) {
      (this.id = vk++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = {x: 1, y: 1}),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (Pn.totalNodes =
            Pn.resolvedTargetDeltas =
            Pn.recalculatedProjection =
              0),
            this.nodes.forEach(wk),
            this.nodes.forEach(Pk),
            this.nodes.forEach(Tk),
            this.nodes.forEach(xk),
            hk(Pn);
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0);
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new fk());
    }
    addEventListener(s, a) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new Pc()),
        this.eventHandlers.get(s).add(a)
      );
    }
    notifyListeners(s, ...a) {
      const l = this.eventHandlers.get(s);
      l && l.notify(...a);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    mount(s, a = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = pk(s)), (this.instance = s);
      const {layoutId: l, layout: u, visualElement: c} = this.options;
      if (
        (c && !c.current && c.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        a && (u || l) && (this.isLayoutDirty = !0),
        e)
      ) {
        let f;
        const d = () => (this.root.updateBlockedByResize = !1);
        e(s, () => {
          (this.root.updateBlockedByResize = !0),
            f && f(),
            (f = dk(d, 250)),
            Io.hasAnimatedSinceResize &&
              ((Io.hasAnimatedSinceResize = !1), this.nodes.forEach(Hd));
        });
      }
      l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          c &&
          (l || u) &&
          this.addEventListener(
            'didUpdate',
            ({
              delta: f,
              hasLayoutChanged: d,
              hasRelativeTargetChanged: h,
              layout: v,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const y =
                  this.options.transition || c.getDefaultTransition() || Rk,
                {onLayoutAnimationStart: x, onLayoutAnimationComplete: m} =
                  c.getProps(),
                p = !this.targetLayout || !fg(this.targetLayout, v) || h,
                g = !d && h;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                g ||
                (d && (p || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, g);
                const w = {...Yv(y, 'layout'), onPlay: x, onComplete: m};
                (c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((w.delay = 0), (w.type = !1)),
                  this.startAnimation(w);
              } else
                d || Hd(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = v;
            },
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const s = this.getStack();
      s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        It(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(Ck),
        this.animationId++);
    }
    getTransformTemplate() {
      const {visualElement: s} = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        (f.shouldResetTransform = !0),
          f.updateScroll('snapshot'),
          f.options.layoutRoot && f.willUpdate(!1);
      }
      const {layoutId: a, layout: l} = this.options;
      if (a === void 0 && !l) return;
      const u = this.getTransformTemplate();
      (this.prevTransformTemplateValue = u ? u(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners('willUpdate');
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach($d);
        return;
      }
      this.isUpdating || this.nodes.forEach(kk),
        (this.isUpdating = !1),
        this.nodes.forEach(Ek),
        this.nodes.forEach(gk),
        this.nodes.forEach(yk),
        this.clearAllSnapshots();
      const a = performance.now();
      (we.delta = dn(0, 1e3 / 60, a - we.timestamp)),
        (we.timestamp = a),
        (we.isProcessing = !0),
        Ma.update.process(we),
        Ma.preRender.process(we),
        Ma.render.process(we),
        (we.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), queueMicrotask(() => this.update()));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Sk), this.sharedNodes.forEach(_k);
    }
    scheduleUpdateProjection() {
      te.preRender(this.updateProjection, !1, !0);
    }
    scheduleCheckAfterUnmount() {
      te.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const s = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = pe()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox);
      const {visualElement: a} = this.options;
      a &&
        a.notify(
          'LayoutMeasure',
          this.layout.layoutBox,
          s ? s.layoutBox : void 0,
        );
    }
    updateScroll(s = 'measure') {
      let a = !!(this.options.layoutScroll && this.instance);
      this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === s &&
        (a = !1),
        a &&
          (this.scroll = {
            animationId: this.root.animationId,
            phase: s,
            isRoot: r(this.instance),
            offset: n(this.instance),
          });
    }
    resetTransform() {
      if (!i) return;
      const s = this.isLayoutDirty || this.shouldResetTransform,
        a = this.projectionDelta && !cg(this.projectionDelta),
        l = this.getTransformTemplate(),
        u = l ? l(this.latestValues, '') : void 0,
        c = u !== this.prevTransformTemplateValue;
      s &&
        (a || En(this.latestValues) || c) &&
        (i(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(s = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return (
        s && (l = this.removeTransform(l)),
        Mk(l),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const {visualElement: s} = this.options;
      if (!s) return pe();
      const a = s.measureViewportBox(),
        {scroll: l} = this.root;
      return l && (Gt(a.x, l.offset.x), Gt(a.y, l.offset.y)), a;
    }
    removeElementScroll(s) {
      const a = pe();
      Ze(a, s);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l],
          {scroll: c, options: f} = u;
        if (u !== this.root && c && f.layoutScroll) {
          if (c.isRoot) {
            Ze(a, s);
            const {scroll: d} = this.root;
            d && (Gt(a.x, -d.offset.x), Gt(a.y, -d.offset.y));
          }
          Gt(a.x, c.offset.x), Gt(a.y, c.offset.y);
        }
      }
      return a;
    }
    applyTransform(s, a = !1) {
      const l = pe();
      Ze(l, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          sr(l, {x: -c.scroll.offset.x, y: -c.scroll.offset.y}),
          En(c.latestValues) && sr(l, c.latestValues);
      }
      return En(this.latestValues) && sr(l, this.latestValues), l;
    }
    removeTransform(s) {
      const a = pe();
      Ze(a, s);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !En(u.latestValues)) continue;
        Jl(u.latestValues) && u.updateSnapshot();
        const c = pe(),
          f = u.measurePageBox();
        Ze(c, f),
          Id(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return En(this.latestValues) && Id(a, this.latestValues), a;
    }
    setTargetDelta(s) {
      (this.targetDelta = s),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== we.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var a;
      const l = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = l.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== l;
      if (
        !(
          s ||
          (u && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((a = this.parent) === null || a === void 0) &&
            a.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget
        )
      )
        return;
      const {layout: f, layoutId: d} = this.options;
      if (!(!this.layout || !(f || d))) {
        if (
          ((this.resolvedRelativeTargetAt = we.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const h = this.getClosestProjectingParent();
          h && h.layout && this.animationProgress !== 1
            ? ((this.relativeParent = h),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = pe()),
              (this.relativeTargetOrigin = pe()),
              ai(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                h.layout.layoutBox,
              ),
              Ze(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = pe()), (this.targetWithTransforms = pe())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                LS(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                ))
              : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : Ze(this.target, this.layout.layoutBox),
                og(this.target, this.targetDelta))
              : Ze(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const h = this.getClosestProjectingParent();
            h &&
            !!h.resumingFrom == !!this.resumingFrom &&
            !h.options.layoutScroll &&
            h.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = h),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = pe()),
                (this.relativeTargetOrigin = pe()),
                ai(this.relativeTargetOrigin, this.target, h.target),
                Ze(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          Pn.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Jl(this.parent.latestValues) ||
          ig(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var s;
      const a = this.getLead(),
        l = !!this.resumingFrom || this !== a;
      let u = !0;
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) &&
            s.isProjectionDirty)) &&
          (u = !1),
        l &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (u = !1),
        this.resolvedRelativeTargetAt === we.timestamp && (u = !1),
        u)
      )
        return;
      const {layout: c, layoutId: f} = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || f))
      )
        return;
      Ze(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x,
        h = this.treeScale.y;
      US(this.layoutCorrected, this.treeScale, this.path, l),
        a.layout &&
          !a.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          (a.target = a.layout.layoutBox);
      const {target: v} = a;
      if (!v) {
        this.projectionTransform &&
          ((this.projectionDelta = or()),
          (this.projectionTransform = 'none'),
          this.scheduleRender());
        return;
      }
      this.projectionDelta ||
        ((this.projectionDelta = or()),
        (this.projectionDeltaWithTransform = or()));
      const y = this.projectionTransform;
      si(this.projectionDelta, this.layoutCorrected, v, this.latestValues),
        (this.projectionTransform = Fd(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== y ||
          this.treeScale.x !== d ||
          this.treeScale.y !== h) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', v)),
        Pn.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      if ((this.options.scheduleRender && this.options.scheduleRender(), s)) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    setAnimationOrigin(s, a = !1) {
      const l = this.snapshot,
        u = l ? l.latestValues : {},
        c = {...this.latestValues},
        f = or();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a);
      const d = pe(),
        h = l ? l.source : void 0,
        v = this.layout ? this.layout.source : void 0,
        y = h !== v,
        x = this.getStack(),
        m = !x || x.members.length <= 1,
        p = !!(y && !m && this.options.crossfade === !0 && !this.path.some(Ok));
      this.animationProgress = 0;
      let g;
      (this.mixTargetDelta = w => {
        const E = w / 1e3;
        Wd(f.x, s.x, E),
          Wd(f.y, s.y, E),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (ai(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            bk(this.relativeTarget, this.relativeTargetOrigin, d, E),
            g && lk(this.relativeTarget, g) && (this.isProjectionDirty = !1),
            g || (g = pe()),
            Ze(g, this.relativeTarget)),
          y &&
            ((this.animationValues = c), nk(c, u, this.latestValues, E, p, m)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = E);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(s) {
      this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (It(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = te.update(() => {
          (Io.hasAnimatedSinceResize = !0),
            (this.currentAnimation = mk(0, Ud, {
              ...s,
              onUpdate: a => {
                this.mixTargetDelta(a), s.onUpdate && s.onUpdate(a);
              },
              onComplete: () => {
                s.onComplete && s.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const s = this.getStack();
      s && s.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners('animationComplete');
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Ud),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let {targetWithTransforms: a, target: l, layout: u, latestValues: c} = s;
      if (!(!a || !l || !u)) {
        if (
          this !== s &&
          this.layout &&
          u &&
          hg(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          l = this.target || pe();
          const f = Ke(this.layout.layoutBox.x);
          (l.x.min = s.target.x.min), (l.x.max = l.x.min + f);
          const d = Ke(this.layout.layoutBox.y);
          (l.y.min = s.target.y.min), (l.y.max = l.y.min + d);
        }
        Ze(a, l),
          sr(a, c),
          si(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(s, a) {
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new uk()),
        this.sharedNodes.get(s).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity
            ? u.shouldPreserveFollowOpacity(a)
            : void 0,
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const {layoutId: a} = this.options;
      return a
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var s;
      const {layoutId: a} = this.options;
      return a
        ? (s = this.getStack()) === null || s === void 0
          ? void 0
          : s.prevLead
        : void 0;
    }
    getStack() {
      const {layoutId: s} = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({needsReset: s, transition: a, preserveFollowOpacity: l} = {}) {
      const u = this.getStack();
      u && u.promote(this, l),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({transition: a});
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetRotation() {
      const {visualElement: s} = this.options;
      if (!s) return;
      let a = !1;
      const {latestValues: l} = s;
      if (((l.rotate || l.rotateX || l.rotateY || l.rotateZ) && (a = !0), !a))
        return;
      const u = {};
      for (let c = 0; c < Bd.length; c++) {
        const f = 'rotate' + Bd[c];
        l[f] && ((u[f] = l[f]), s.setStaticValue(f, 0));
      }
      s.render();
      for (const c in u) s.setStaticValue(c, u[c]);
      s.scheduleRender();
    }
    getProjectionStyles(s = {}) {
      var a, l;
      const u = {};
      if (!this.instance || this.isSVG) return u;
      if (this.isVisible) u.visibility = '';
      else return {visibility: 'hidden'};
      const c = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ''),
          (u.pointerEvents = Do(s.pointerEvents) || ''),
          (u.transform = c ? c(this.latestValues, '') : 'none'),
          u
        );
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const y = {};
        return (
          this.options.layoutId &&
            ((y.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (y.pointerEvents = Do(s.pointerEvents) || '')),
          this.hasProjected &&
            !En(this.latestValues) &&
            ((y.transform = c ? c({}, '') : 'none'), (this.hasProjected = !1)),
          y
        );
      }
      const d = f.animationValues || f.latestValues;
      this.applyTransformsToTarget(),
        (u.transform = Fd(
          this.projectionDeltaWithTransform,
          this.treeScale,
          d,
        )),
        c && (u.transform = c(d, u.transform));
      const {x: h, y: v} = this.projectionDelta;
      (u.transformOrigin = `${h.origin * 100}% ${v.origin * 100}% 0`),
        f.animationValues
          ? (u.opacity =
              f === this
                ? (l =
                    (a = d.opacity) !== null && a !== void 0
                      ? a
                      : this.latestValues.opacity) !== null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : d.opacityExit)
          : (u.opacity =
              f === this
                ? d.opacity !== void 0
                  ? d.opacity
                  : ''
                : d.opacityExit !== void 0
                ? d.opacityExit
                : 0);
      for (const y in cs) {
        if (d[y] === void 0) continue;
        const {correct: x, applyTo: m} = cs[y],
          p = u.transform === 'none' ? d[y] : x(d[y], f);
        if (m) {
          const g = m.length;
          for (let w = 0; w < g; w++) u[m[w]] = p;
        } else u[y] = p;
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents = f === this ? Do(s.pointerEvents) || '' : 'none'),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach(s => {
        var a;
        return (a = s.currentAnimation) === null || a === void 0
          ? void 0
          : a.stop();
      }),
        this.root.nodes.forEach($d),
        this.root.sharedNodes.clear();
    }
  };
}
function gk(e) {
  e.updateLayout();
}
function yk(e) {
  var t;
  const n =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners('didUpdate')) {
    const {layoutBox: r, measuredBox: i} = e.layout,
      {animationType: o} = e.options,
      s = n.source !== e.layout.source;
    o === 'size'
      ? gt(f => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            h = Ke(d);
          (d.min = r[f].min), (d.max = d.min + h);
        })
      : hg(o, n.layoutBox, r) &&
        gt(f => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            h = Ke(r[f]);
          (d.max = d.min + h),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + h));
        });
    const a = or();
    si(a, r, n.layoutBox);
    const l = or();
    s ? si(l, e.applyTransform(i, !0), n.measuredBox) : si(l, r, n.layoutBox);
    const u = !cg(a);
    let c = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const {snapshot: d, layout: h} = f;
        if (d && h) {
          const v = pe();
          ai(v, n.layoutBox, d.layoutBox);
          const y = pe();
          ai(y, r, h.layoutBox),
            fg(v, y) || (c = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = y),
              (e.relativeTargetOrigin = v),
              (e.relativeParent = f));
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: r,
      snapshot: n,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: c,
    });
  } else if (e.isLead()) {
    const {onExitComplete: r} = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function wk(e) {
  Pn.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function xk(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Sk(e) {
  e.clearSnapshot();
}
function $d(e) {
  e.clearMeasurements();
}
function kk(e) {
  e.isLayoutDirty = !1;
}
function Ek(e) {
  const {visualElement: t} = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'),
    e.resetTransform();
}
function Hd(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function Pk(e) {
  e.resolveTargetDelta();
}
function Tk(e) {
  e.calcProjection();
}
function Ck(e) {
  e.resetRotation();
}
function _k(e) {
  e.removeLeadSnapshot();
}
function Wd(e, t, n) {
  (e.translate = ae(t.translate, 0, n)),
    (e.scale = ae(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function Gd(e, t, n, r) {
  (e.min = ae(t.min, n.min, r)), (e.max = ae(t.max, n.max, r));
}
function bk(e, t, n, r) {
  Gd(e.x, t.x, n.x, r), Gd(e.y, t.y, n.y, r);
}
function Ok(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Rk = {duration: 0.45, ease: [0.4, 0, 0.1, 1]},
  Qd = e =>
    typeof navigator < 'u' && navigator.userAgent.toLowerCase().includes(e),
  Kd = Qd('applewebkit/') && !Qd('chrome/') ? Math.round : de;
function qd(e) {
  (e.min = Kd(e.min)), (e.max = Kd(e.max));
}
function Mk(e) {
  qd(e.x), qd(e.y);
}
function hg(e, t, n) {
  return (
    e === 'position' || (e === 'preserve-aspect' && !Xl(zd(t), zd(n), 0.2))
  );
}
const Ak = dg({
    attachResizeListener: (e, t) => Ot(e, 'resize', t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Ua = {current: void 0},
  pg = dg({
    measureScroll: e => ({x: e.scrollLeft, y: e.scrollTop}),
    defaultParent: () => {
      if (!Ua.current) {
        const e = new Ak({});
        e.mount(window), e.setOptions({layoutScroll: !0}), (Ua.current = e);
      }
      return Ua.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : 'none';
    },
    checkIsScrollRoot: e => window.getComputedStyle(e).position === 'fixed',
  }),
  Lk = {
    pan: {Feature: YS},
    drag: {Feature: qS, ProjectionNode: pg, MeasureLayout: ag},
  },
  Nk = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function jk(e) {
  const t = Nk.exec(e);
  if (!t) return [,];
  const [, n, r] = t;
  return [n, r];
}
function tu(e, t, n = 1) {
  const [r, i] = jk(e);
  if (!r) return;
  const o = window.getComputedStyle(t).getPropertyValue(r);
  if (o) {
    const s = o.trim();
    return Xv(s) ? parseFloat(s) : s;
  } else return Hl(i) ? tu(i, t, n + 1) : i;
}
function Dk(e, {...t}, n) {
  const r = e.current;
  if (!(r instanceof Element)) return {target: t, transitionEnd: n};
  n && (n = {...n}),
    e.values.forEach(i => {
      const o = i.get();
      if (!Hl(o)) return;
      const s = tu(o, r);
      s && i.set(s);
    });
  for (const i in t) {
    const o = t[i];
    if (!Hl(o)) continue;
    const s = tu(o, r);
    s && ((t[i] = s), n || (n = {}), n[i] === void 0 && (n[i] = o));
  }
  return {target: t, transitionEnd: n};
}
const Ik = new Set([
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    'x',
    'y',
    'translateX',
    'translateY',
  ]),
  mg = e => Ik.has(e),
  Vk = e => Object.keys(e).some(mg),
  Yd = e => e === Fn || e === U,
  Xd = (e, t) => parseFloat(e.split(', ')[t]),
  Zd =
    (e, t) =>
    (n, {transform: r}) => {
      if (r === 'none' || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/);
      if (i) return Xd(i[1], t);
      {
        const o = r.match(/^matrix\((.+)\)$/);
        return o ? Xd(o[1], e) : 0;
      }
    },
  zk = new Set(['x', 'y', 'z']),
  Fk = ji.filter(e => !zk.has(e));
function Bk(e) {
  const t = [];
  return (
    Fk.forEach(n => {
      const r = e.getValue(n);
      r !== void 0 &&
        (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0));
    }),
    t.length && e.render(),
    t
  );
}
const kr = {
  width: ({x: e}, {paddingLeft: t = '0', paddingRight: n = '0'}) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({y: e}, {paddingTop: t = '0', paddingBottom: n = '0'}) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, {top: t}) => parseFloat(t),
  left: (e, {left: t}) => parseFloat(t),
  bottom: ({y: e}, {top: t}) => parseFloat(t) + (e.max - e.min),
  right: ({x: e}, {left: t}) => parseFloat(t) + (e.max - e.min),
  x: Zd(4, 13),
  y: Zd(5, 14),
};
kr.translateX = kr.x;
kr.translateY = kr.y;
const Uk = (e, t, n) => {
    const r = t.measureViewportBox(),
      i = t.current,
      o = getComputedStyle(i),
      {display: s} = o,
      a = {};
    s === 'none' && t.setStaticValue('display', e.display || 'block'),
      n.forEach(u => {
        a[u] = kr[u](r, o);
      }),
      t.render();
    const l = t.measureViewportBox();
    return (
      n.forEach(u => {
        const c = t.getValue(u);
        c && c.jump(a[u]), (e[u] = kr[u](l, o));
      }),
      e
    );
  },
  $k = (e, t, n = {}, r = {}) => {
    (t = {...t}), (r = {...r});
    const i = Object.keys(t).filter(mg);
    let o = [],
      s = !1;
    const a = [];
    if (
      (i.forEach(l => {
        const u = e.getValue(l);
        if (!e.hasValue(l)) return;
        let c = n[l],
          f = zr(c);
        const d = t[l];
        let h;
        if (ds(d)) {
          const v = d.length,
            y = d[0] === null ? 1 : 0;
          (c = d[y]), (f = zr(c));
          for (let x = y; x < v && d[x] !== null; x++)
            h ? vc(zr(d[x]) === h) : (h = zr(d[x]));
        } else h = zr(d);
        if (f !== h)
          if (Yd(f) && Yd(h)) {
            const v = u.get();
            typeof v == 'string' && u.set(parseFloat(v)),
              typeof d == 'string'
                ? (t[l] = parseFloat(d))
                : Array.isArray(d) && h === U && (t[l] = d.map(parseFloat));
          } else
            f != null &&
            f.transform &&
            h != null &&
            h.transform &&
            (c === 0 || d === 0)
              ? c === 0
                ? u.set(h.transform(c))
                : (t[l] = f.transform(d))
              : (s || ((o = Bk(e)), (s = !0)),
                a.push(l),
                (r[l] = r[l] !== void 0 ? r[l] : t[l]),
                u.jump(d));
      }),
      a.length)
    ) {
      const l = a.indexOf('height') >= 0 ? window.pageYOffset : null,
        u = Uk(t, e, a);
      return (
        o.length &&
          o.forEach(([c, f]) => {
            e.getValue(c).set(f);
          }),
        e.render(),
        Us && l !== null && window.scrollTo({top: l}),
        {target: u, transitionEnd: r}
      );
    } else return {target: t, transitionEnd: r};
  };
function Hk(e, t, n, r) {
  return Vk(t) ? $k(e, t, n, r) : {target: t, transitionEnd: r};
}
const Wk = (e, t, n, r) => {
    const i = Dk(e, t, r);
    return (t = i.target), (r = i.transitionEnd), Hk(e, t, n, r);
  },
  nu = {current: null},
  vg = {current: !1};
function Gk() {
  if (((vg.current = !0), !!Us))
    if (window.matchMedia) {
      const e = window.matchMedia('(prefers-reduced-motion)'),
        t = () => (nu.current = e.matches);
      e.addListener(t), t();
    } else nu.current = !1;
}
function Qk(e, t, n) {
  const {willChange: r} = t;
  for (const i in t) {
    const o = t[i],
      s = n[i];
    if (Ue(o)) e.addValue(i, o), vs(r) && r.add(i);
    else if (Ue(s)) e.addValue(i, Sr(o, {owner: e})), vs(r) && r.remove(i);
    else if (s !== o)
      if (e.hasValue(i)) {
        const a = e.getValue(i);
        !a.hasAnimated && a.set(o);
      } else {
        const a = e.getStaticValue(i);
        e.addValue(i, Sr(a !== void 0 ? a : o, {owner: e}));
      }
  }
  for (const i in n) t[i] === void 0 && e.removeValue(i);
  return t;
}
const Jd = new WeakMap(),
  gg = Object.keys(Ci),
  Kk = gg.length,
  eh = [
    'AnimationStart',
    'AnimationComplete',
    'Update',
    'BeforeLayoutMeasure',
    'LayoutMeasure',
    'LayoutAnimationStart',
    'LayoutAnimationComplete',
  ],
  qk = ac.length;
class Yk {
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: r,
      reducedMotionConfig: i,
      visualState: o,
    },
    s = {},
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.scheduleRender = () => te.render(this.render, !1, !0));
    const {latestValues: a, renderState: l} = o;
    (this.latestValues = a),
      (this.baseTarget = {...a}),
      (this.initialValues = n.initial ? {...a} : {}),
      (this.renderState = l),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = s),
      (this.isControllingVariants = Hs(n)),
      (this.isVariantNode = tv(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const {willChange: u, ...c} = this.scrapeMotionValuesFromProps(n, {});
    for (const f in c) {
      const d = c[f];
      a[f] !== void 0 && Ue(d) && (d.set(a[f], !1), vs(u) && u.add(f));
    }
  }
  scrapeMotionValuesFromProps(t, n) {
    return {};
  }
  mount(t) {
    (this.current = t),
      Jd.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      vg.current || Gk(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === 'never'
          ? !1
          : this.reducedMotionConfig === 'always'
          ? !0
          : nu.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    Jd.delete(this.current),
      this.projection && this.projection.unmount(),
      It(this.notifyUpdate),
      It(this.render),
      this.valueSubscriptions.forEach(t => t()),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) this.features[t].unmount();
    this.current = null;
  }
  bindToMotionValue(t, n) {
    const r = zn.has(t),
      i = n.on('change', s => {
        (this.latestValues[t] = s),
          this.props.onUpdate && te.update(this.notifyUpdate, !1, !0),
          r && this.projection && (this.projection.isTransformDirty = !0);
      }),
      o = n.on('renderRequest', this.scheduleRender);
    this.valueSubscriptions.set(t, () => {
      i(), o();
    });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  loadFeatures({children: t, ...n}, r, i, o) {
    let s, a;
    for (let l = 0; l < Kk; l++) {
      const u = gg[l],
        {isEnabled: c, Feature: f, ProjectionNode: d, MeasureLayout: h} = Ci[u];
      d && (s = d),
        c(n) &&
          (!this.features[u] && f && (this.features[u] = new f(this)),
          h && (a = h));
    }
    if (!this.projection && s) {
      this.projection = new s(
        this.latestValues,
        this.parent && this.parent.projection,
      );
      const {
        layoutId: l,
        layout: u,
        drag: c,
        dragConstraints: f,
        layoutScroll: d,
        layoutRoot: h,
      } = n;
      this.projection.setOptions({
        layoutId: l,
        layout: u,
        alwaysMeasureLayout: !!c || (f && rr(f)),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        animationType: typeof u == 'string' ? u : 'both',
        initialPromotionConfig: o,
        layoutScroll: d,
        layoutRoot: h,
      });
    }
    return a;
  }
  updateFeatures() {
    for (const t in this.features) {
      const n = this.features[t];
      n.isMounted ? n.update() : (n.mount(), (n.isMounted = !0));
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : pe();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  makeTargetAnimatable(t, n = !0) {
    return this.makeTargetAnimatableFromInstance(t, this.props, n);
  }
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let r = 0; r < eh.length; r++) {
      const i = eh[r];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const o = t['on' + i];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    (this.prevMotionValues = Qk(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  getVariantContext(t = !1) {
    if (t) return this.parent ? this.parent.getVariantContext() : void 0;
    if (!this.isControllingVariants) {
      const r = this.parent ? this.parent.getVariantContext() || {} : {};
      return (
        this.props.initial !== void 0 && (r.initial = this.props.initial), r
      );
    }
    const n = {};
    for (let r = 0; r < qk; r++) {
      const i = ac[r],
        o = this.props[i];
      (Ti(o) || o === !1) && (n[i] = o);
    }
    return n;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    n !== this.values.get(t) &&
      (this.removeValue(t), this.bindToMotionValue(t, n)),
      this.values.set(t, n),
      (this.latestValues[t] = n.get());
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = Sr(n, {owner: this})), this.addValue(t, r)),
      r
    );
  }
  readValue(t) {
    var n;
    return this.latestValues[t] !== void 0 || !this.current
      ? this.latestValues[t]
      : (n = this.getBaseTargetFromProps(this.props, t)) !== null &&
        n !== void 0
      ? n
      : this.readValueFromInstance(this.current, t, this.options);
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var n;
    const {initial: r} = this.props,
      i =
        typeof r == 'string' || typeof r == 'object'
          ? (n = mc(this.props, r)) === null || n === void 0
            ? void 0
            : n[t]
          : void 0;
    if (r && i !== void 0) return i;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !Ue(o)
      ? o
      : this.initialValues[t] !== void 0 && i === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Pc()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class yg extends Yk {
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, {vars: n, style: r}) {
    delete n[t], delete r[t];
  }
  makeTargetAnimatableFromInstance(
    {transition: t, transitionEnd: n, ...r},
    {transformValues: i},
    o,
  ) {
    let s = mS(r, t || {}, this);
    if ((i && (n && (n = i(n)), r && (r = i(r)), s && (s = i(s))), o)) {
      hS(this, r, s);
      const a = Wk(this, r, s, n);
      (n = a.transitionEnd), (r = a.target);
    }
    return {transition: t, transitionEnd: n, ...r};
  }
}
function Xk(e) {
  return window.getComputedStyle(e);
}
class Zk extends yg {
  readValueFromInstance(t, n) {
    if (zn.has(n)) {
      const r = xc(n);
      return (r && r.default) || 0;
    } else {
      const r = Xk(t),
        i = (sv(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == 'string' ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, {transformPagePoint: n}) {
    return sg(t, n);
  }
  build(t, n, r, i) {
    uc(t, n, r, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n) {
    return pc(t, n);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const {children: t} = this.props;
    Ue(t) &&
      (this.childSubscription = t.on('change', n => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
  renderInstance(t, n, r, i) {
    dv(t, n, r, i);
  }
}
class Jk extends yg {
  constructor() {
    super(...arguments), (this.isSVGTag = !1);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (zn.has(n)) {
      const r = xc(n);
      return (r && r.default) || 0;
    }
    return (n = hv.has(n) ? n : hc(n)), t.getAttribute(n);
  }
  measureInstanceViewportBox() {
    return pe();
  }
  scrapeMotionValuesFromProps(t, n) {
    return mv(t, n);
  }
  build(t, n, r, i) {
    fc(t, n, r, this.isSVGTag, i.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    pv(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = dc(t.tagName)), super.mount(t);
  }
}
const eE = (e, t) =>
    lc(e)
      ? new Jk(t, {enableHardwareAcceleration: !1})
      : new Zk(t, {enableHardwareAcceleration: !0}),
  tE = {layout: {ProjectionNode: pg, MeasureLayout: ag}},
  nE = {...OS, ...q1, ...Lk, ...tE},
  Je = r1((e, t) => D1(e, t, nE, eE));
var ce = {},
  Tc = {},
  zi = {},
  Fi = {},
  wg = 'Expected a function',
  th = 0 / 0,
  rE = '[object Symbol]',
  iE = /^\s+|\s+$/g,
  oE = /^[-+]0x[0-9a-f]+$/i,
  sE = /^0b[01]+$/i,
  aE = /^0o[0-7]+$/i,
  lE = parseInt,
  uE = typeof Br == 'object' && Br && Br.Object === Object && Br,
  cE = typeof self == 'object' && self && self.Object === Object && self,
  fE = uE || cE || Function('return this')(),
  dE = Object.prototype,
  hE = dE.toString,
  pE = Math.max,
  mE = Math.min,
  $a = function () {
    return fE.Date.now();
  };
function vE(e, t, n) {
  var r,
    i,
    o,
    s,
    a,
    l,
    u = 0,
    c = !1,
    f = !1,
    d = !0;
  if (typeof e != 'function') throw new TypeError(wg);
  (t = nh(t) || 0),
    ys(n) &&
      ((c = !!n.leading),
      (f = 'maxWait' in n),
      (o = f ? pE(nh(n.maxWait) || 0, t) : o),
      (d = 'trailing' in n ? !!n.trailing : d));
  function h(T) {
    var P = r,
      k = i;
    return (r = i = void 0), (u = T), (s = e.apply(k, P)), s;
  }
  function v(T) {
    return (u = T), (a = setTimeout(m, t)), c ? h(T) : s;
  }
  function y(T) {
    var P = T - l,
      k = T - u,
      b = t - P;
    return f ? mE(b, o - k) : b;
  }
  function x(T) {
    var P = T - l,
      k = T - u;
    return l === void 0 || P >= t || P < 0 || (f && k >= o);
  }
  function m() {
    var T = $a();
    if (x(T)) return p(T);
    a = setTimeout(m, y(T));
  }
  function p(T) {
    return (a = void 0), d && r ? h(T) : ((r = i = void 0), s);
  }
  function g() {
    a !== void 0 && clearTimeout(a), (u = 0), (r = l = i = a = void 0);
  }
  function w() {
    return a === void 0 ? s : p($a());
  }
  function E() {
    var T = $a(),
      P = x(T);
    if (((r = arguments), (i = this), (l = T), P)) {
      if (a === void 0) return v(l);
      if (f) return (a = setTimeout(m, t)), h(l);
    }
    return a === void 0 && (a = setTimeout(m, t)), s;
  }
  return (E.cancel = g), (E.flush = w), E;
}
function gE(e, t, n) {
  var r = !0,
    i = !0;
  if (typeof e != 'function') throw new TypeError(wg);
  return (
    ys(n) &&
      ((r = 'leading' in n ? !!n.leading : r),
      (i = 'trailing' in n ? !!n.trailing : i)),
    vE(e, t, {leading: r, maxWait: t, trailing: i})
  );
}
function ys(e) {
  var t = typeof e;
  return !!e && (t == 'object' || t == 'function');
}
function yE(e) {
  return !!e && typeof e == 'object';
}
function wE(e) {
  return typeof e == 'symbol' || (yE(e) && hE.call(e) == rE);
}
function nh(e) {
  if (typeof e == 'number') return e;
  if (wE(e)) return th;
  if (ys(e)) {
    var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
    e = ys(t) ? t + '' : t;
  }
  if (typeof e != 'string') return e === 0 ? e : +e;
  e = e.replace(iE, '');
  var n = sE.test(e);
  return n || aE.test(e) ? lE(e.slice(2), n ? 2 : 8) : oE.test(e) ? th : +e;
}
var xE = gE,
  Bi = {};
Object.defineProperty(Bi, '__esModule', {value: !0});
Bi.addPassiveEventListener = function (t, n, r) {
  var i = r.name;
  i || ((i = n), console.warn('Listener must be a named function.')),
    Vo.has(n) || Vo.set(n, new Set());
  var o = Vo.get(n);
  if (!o.has(i)) {
    var s = (function () {
      var a = !1;
      try {
        var l = Object.defineProperty({}, 'passive', {
          get: function () {
            a = !0;
          },
        });
        window.addEventListener('test', null, l);
      } catch {}
      return a;
    })();
    t.addEventListener(n, r, s ? {passive: !0} : !1), o.add(i);
  }
};
Bi.removePassiveEventListener = function (t, n, r) {
  t.removeEventListener(n, r), Vo.get(n).delete(r.name || n);
};
var Vo = new Map();
Object.defineProperty(Fi, '__esModule', {value: !0});
var SE = xE,
  kE = PE(SE),
  EE = Bi;
function PE(e) {
  return e && e.__esModule ? e : {default: e};
}
var TE = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 66;
    return (0, kE.default)(t, n);
  },
  ie = {
    spyCallbacks: [],
    spySetState: [],
    scrollSpyContainers: [],
    mount: function (t, n) {
      if (t) {
        var r = TE(function (i) {
          ie.scrollHandler(t);
        }, n);
        ie.scrollSpyContainers.push(t),
          (0, EE.addPassiveEventListener)(t, 'scroll', r);
      }
    },
    isMounted: function (t) {
      return ie.scrollSpyContainers.indexOf(t) !== -1;
    },
    currentPositionX: function (t) {
      if (t === document) {
        var n = window.pageYOffset !== void 0,
          r = (document.compatMode || '') === 'CSS1Compat';
        return n
          ? window.pageXOffset
          : r
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft;
      } else return t.scrollLeft;
    },
    currentPositionY: function (t) {
      if (t === document) {
        var n = window.pageXOffset !== void 0,
          r = (document.compatMode || '') === 'CSS1Compat';
        return n
          ? window.pageYOffset
          : r
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      } else return t.scrollTop;
    },
    scrollHandler: function (t) {
      var n =
        ie.scrollSpyContainers[ie.scrollSpyContainers.indexOf(t)]
          .spyCallbacks || [];
      n.forEach(function (r) {
        return r(ie.currentPositionX(t), ie.currentPositionY(t));
      });
    },
    addStateHandler: function (t) {
      ie.spySetState.push(t);
    },
    addSpyHandler: function (t, n) {
      var r = ie.scrollSpyContainers[ie.scrollSpyContainers.indexOf(n)];
      r.spyCallbacks || (r.spyCallbacks = []),
        r.spyCallbacks.push(t),
        t(ie.currentPositionX(n), ie.currentPositionY(n));
    },
    updateStates: function () {
      ie.spySetState.forEach(function (t) {
        return t();
      });
    },
    unmount: function (t, n) {
      ie.scrollSpyContainers.forEach(function (r) {
        return (
          r.spyCallbacks &&
          r.spyCallbacks.length &&
          r.spyCallbacks.indexOf(n) > -1 &&
          r.spyCallbacks.splice(r.spyCallbacks.indexOf(n), 1)
        );
      }),
        ie.spySetState &&
          ie.spySetState.length &&
          ie.spySetState.indexOf(t) > -1 &&
          ie.spySetState.splice(ie.spySetState.indexOf(t), 1),
        document.removeEventListener('scroll', ie.scrollHandler);
    },
    update: function () {
      return ie.scrollSpyContainers.forEach(function (t) {
        return ie.scrollHandler(t);
      });
    },
  };
Fi.default = ie;
var _r = {},
  Ui = {};
Object.defineProperty(Ui, '__esModule', {value: !0});
var CE = function (t, n) {
    var r = t.indexOf('#') === 0 ? t.substring(1) : t,
      i = r ? '#' + r : '',
      o = window && window.location,
      s = i ? o.pathname + o.search + i : o.pathname + o.search;
    n
      ? history.pushState(history.state, '', s)
      : history.replaceState(history.state, '', s);
  },
  _E = function () {
    return window.location.hash.replace(/^#/, '');
  },
  bE = function (t) {
    return function (n) {
      return t.contains
        ? t != n && t.contains(n)
        : !!(t.compareDocumentPosition(n) & 16);
    };
  },
  OE = function (t) {
    return getComputedStyle(t).position !== 'static';
  },
  Ha = function (t, n) {
    for (var r = t.offsetTop, i = t.offsetParent; i && !n(i); )
      (r += i.offsetTop), (i = i.offsetParent);
    return {offsetTop: r, offsetParent: i};
  },
  RE = function (t, n, r) {
    if (r)
      return t === document
        ? n.getBoundingClientRect().left +
            (window.scrollX || window.pageXOffset)
        : getComputedStyle(t).position !== 'static'
        ? n.offsetLeft
        : n.offsetLeft - t.offsetLeft;
    if (t === document)
      return (
        n.getBoundingClientRect().top + (window.scrollY || window.pageYOffset)
      );
    if (OE(t)) {
      if (n.offsetParent !== t) {
        var i = function (c) {
            return c === t || c === document;
          },
          o = Ha(n, i),
          s = o.offsetTop,
          a = o.offsetParent;
        if (a !== t)
          throw new Error(
            'Seems containerElement is not an ancestor of the Element',
          );
        return s;
      }
      return n.offsetTop;
    }
    if (n.offsetParent === t.offsetParent) return n.offsetTop - t.offsetTop;
    var l = function (c) {
      return c === document;
    };
    return Ha(n, l).offsetTop - Ha(t, l).offsetTop;
  };
Ui.default = {
  updateHash: CE,
  getHash: _E,
  filterElementInContainer: bE,
  scrollOffset: RE,
};
var Ks = {},
  Cc = {};
Object.defineProperty(Cc, '__esModule', {value: !0});
Cc.default = {
  defaultEasing: function (t) {
    return t < 0.5 ? Math.pow(t * 2, 2) / 2 : 1 - Math.pow((1 - t) * 2, 2) / 2;
  },
  linear: function (t) {
    return t;
  },
  easeInQuad: function (t) {
    return t * t;
  },
  easeOutQuad: function (t) {
    return t * (2 - t);
  },
  easeInOutQuad: function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic: function (t) {
    return t * t * t;
  },
  easeOutCubic: function (t) {
    return --t * t * t + 1;
  },
  easeInOutCubic: function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart: function (t) {
    return t * t * t * t;
  },
  easeOutQuart: function (t) {
    return 1 - --t * t * t * t;
  },
  easeInOutQuart: function (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  easeInQuint: function (t) {
    return t * t * t * t * t;
  },
  easeOutQuint: function (t) {
    return 1 + --t * t * t * t * t;
  },
  easeInOutQuint: function (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  },
};
var _c = {};
Object.defineProperty(_c, '__esModule', {value: !0});
var ME = Bi,
  AE = ['mousedown', 'mousewheel', 'touchmove', 'keydown'];
_c.default = {
  subscribe: function (t) {
    return (
      typeof document < 'u' &&
      AE.forEach(function (n) {
        return (0, ME.addPassiveEventListener)(document, n, t);
      })
    );
  },
};
var $i = {};
Object.defineProperty($i, '__esModule', {value: !0});
var ru = {
  registered: {},
  scrollEvent: {
    register: function (t, n) {
      ru.registered[t] = n;
    },
    remove: function (t) {
      ru.registered[t] = null;
    },
  },
};
$i.default = ru;
Object.defineProperty(Ks, '__esModule', {value: !0});
var LE =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  NE = Ui;
qs(NE);
var jE = Cc,
  rh = qs(jE),
  DE = _c,
  IE = qs(DE),
  VE = $i,
  yt = qs(VE);
function qs(e) {
  return e && e.__esModule ? e : {default: e};
}
var xg = function (t) {
    return rh.default[t.smooth] || rh.default.defaultEasing;
  },
  zE = function (t) {
    return typeof t == 'function'
      ? t
      : function () {
          return t;
        };
  },
  FE = function () {
    if (typeof window < 'u')
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  },
  iu = (function () {
    return (
      FE() ||
      function (e, t, n) {
        window.setTimeout(e, n || 1e3 / 60, new Date().getTime());
      }
    );
  })(),
  Sg = function () {
    return {
      currentPosition: 0,
      startPosition: 0,
      targetPosition: 0,
      progress: 0,
      duration: 0,
      cancel: !1,
      target: null,
      containerElement: null,
      to: null,
      start: null,
      delta: null,
      percent: null,
      delayTimeout: null,
    };
  },
  kg = function (t) {
    var n = t.data.containerElement;
    if (n && n !== document && n !== document.body) return n.scrollLeft;
    var r = window.pageXOffset !== void 0,
      i = (document.compatMode || '') === 'CSS1Compat';
    return r
      ? window.pageXOffset
      : i
      ? document.documentElement.scrollLeft
      : document.body.scrollLeft;
  },
  Eg = function (t) {
    var n = t.data.containerElement;
    if (n && n !== document && n !== document.body) return n.scrollTop;
    var r = window.pageXOffset !== void 0,
      i = (document.compatMode || '') === 'CSS1Compat';
    return r
      ? window.pageYOffset
      : i
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
  },
  BE = function (t) {
    var n = t.data.containerElement;
    if (n && n !== document && n !== document.body)
      return n.scrollWidth - n.offsetWidth;
    var r = document.body,
      i = document.documentElement;
    return Math.max(
      r.scrollWidth,
      r.offsetWidth,
      i.clientWidth,
      i.scrollWidth,
      i.offsetWidth,
    );
  },
  UE = function (t) {
    var n = t.data.containerElement;
    if (n && n !== document && n !== document.body)
      return n.scrollHeight - n.offsetHeight;
    var r = document.body,
      i = document.documentElement;
    return Math.max(
      r.scrollHeight,
      r.offsetHeight,
      i.clientHeight,
      i.scrollHeight,
      i.offsetHeight,
    );
  },
  $E = function e(t, n, r) {
    var i = n.data;
    if (!n.ignoreCancelEvents && i.cancel) {
      yt.default.registered.end &&
        yt.default.registered.end(i.to, i.target, i.currentPositionY);
      return;
    }
    if (
      ((i.delta = Math.round(i.targetPosition - i.startPosition)),
      i.start === null && (i.start = r),
      (i.progress = r - i.start),
      (i.percent = i.progress >= i.duration ? 1 : t(i.progress / i.duration)),
      (i.currentPosition = i.startPosition + Math.ceil(i.delta * i.percent)),
      i.containerElement &&
      i.containerElement !== document &&
      i.containerElement !== document.body
        ? n.horizontal
          ? (i.containerElement.scrollLeft = i.currentPosition)
          : (i.containerElement.scrollTop = i.currentPosition)
        : n.horizontal
        ? window.scrollTo(i.currentPosition, 0)
        : window.scrollTo(0, i.currentPosition),
      i.percent < 1)
    ) {
      var o = e.bind(null, t, n);
      iu.call(window, o);
      return;
    }
    yt.default.registered.end &&
      yt.default.registered.end(i.to, i.target, i.currentPosition);
  },
  bc = function (t) {
    t.data.containerElement = t
      ? t.containerId
        ? document.getElementById(t.containerId)
        : t.container && t.container.nodeType
        ? t.container
        : document
      : null;
  },
  Hi = function (t, n, r, i) {
    (n.data = n.data || Sg()), window.clearTimeout(n.data.delayTimeout);
    var o = function () {
      n.data.cancel = !0;
    };
    if (
      (IE.default.subscribe(o),
      bc(n),
      (n.data.start = null),
      (n.data.cancel = !1),
      (n.data.startPosition = n.horizontal ? kg(n) : Eg(n)),
      (n.data.targetPosition = n.absolute ? t : t + n.data.startPosition),
      n.data.startPosition === n.data.targetPosition)
    ) {
      yt.default.registered.end &&
        yt.default.registered.end(
          n.data.to,
          n.data.target,
          n.data.currentPosition,
        );
      return;
    }
    (n.data.delta = Math.round(n.data.targetPosition - n.data.startPosition)),
      (n.data.duration = zE(n.duration)(n.data.delta)),
      (n.data.duration = isNaN(parseFloat(n.data.duration))
        ? 1e3
        : parseFloat(n.data.duration)),
      (n.data.to = r),
      (n.data.target = i);
    var s = xg(n),
      a = $E.bind(null, s, n);
    if (n && n.delay > 0) {
      n.data.delayTimeout = window.setTimeout(function () {
        yt.default.registered.begin &&
          yt.default.registered.begin(n.data.to, n.data.target),
          iu.call(window, a);
      }, n.delay);
      return;
    }
    yt.default.registered.begin &&
      yt.default.registered.begin(n.data.to, n.data.target),
      iu.call(window, a);
  },
  Ys = function (t) {
    return (t = LE({}, t)), (t.data = t.data || Sg()), (t.absolute = !0), t;
  },
  HE = function (t) {
    Hi(0, Ys(t));
  },
  WE = function (t, n) {
    Hi(t, Ys(n));
  },
  GE = function (t) {
    (t = Ys(t)), bc(t), Hi(t.horizontal ? BE(t) : UE(t), t);
  },
  QE = function (t, n) {
    (n = Ys(n)), bc(n);
    var r = n.horizontal ? kg(n) : Eg(n);
    Hi(t + r, n);
  };
Ks.default = {
  animateTopScroll: Hi,
  getAnimationType: xg,
  scrollToTop: HE,
  scrollToBottom: GE,
  scrollTo: WE,
  scrollMore: QE,
};
Object.defineProperty(_r, '__esModule', {value: !0});
var KE =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  qE = Ui,
  YE = Oc(qE),
  XE = Ks,
  ZE = Oc(XE),
  JE = $i,
  go = Oc(JE);
function Oc(e) {
  return e && e.__esModule ? e : {default: e};
}
var yo = {},
  ih = void 0;
_r.default = {
  unmount: function () {
    yo = {};
  },
  register: function (t, n) {
    yo[t] = n;
  },
  unregister: function (t) {
    delete yo[t];
  },
  get: function (t) {
    return (
      yo[t] ||
      document.getElementById(t) ||
      document.getElementsByName(t)[0] ||
      document.getElementsByClassName(t)[0]
    );
  },
  setActiveLink: function (t) {
    return (ih = t);
  },
  getActiveLink: function () {
    return ih;
  },
  scrollTo: function (t, n) {
    var r = this.get(t);
    if (!r) {
      console.warn('target Element not found');
      return;
    }
    n = KE({}, n, {absolute: !1});
    var i = n.containerId,
      o = n.container,
      s = void 0;
    i
      ? (s = document.getElementById(i))
      : o && o.nodeType
      ? (s = o)
      : (s = document),
      (n.absolute = !0);
    var a = n.horizontal,
      l = YE.default.scrollOffset(s, r, a) + (n.offset || 0);
    if (!n.smooth) {
      go.default.registered.begin && go.default.registered.begin(t, r),
        s === document
          ? n.horizontal
            ? window.scrollTo(l, 0)
            : window.scrollTo(0, l)
          : (s.scrollTop = l),
        go.default.registered.end && go.default.registered.end(t, r);
      return;
    }
    ZE.default.animateTopScroll(l, n, t, r);
  },
};
var Pg = {exports: {}},
  eP = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED',
  tP = eP,
  nP = tP;
function Tg() {}
function Cg() {}
Cg.resetWarningCache = Tg;
var rP = function () {
  function e(r, i, o, s, a, l) {
    if (l !== nP) {
      var u = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
      );
      throw ((u.name = 'Invariant Violation'), u);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Cg,
    resetWarningCache: Tg,
  };
  return (n.PropTypes = n), n;
};
Pg.exports = rP();
var Wi = Pg.exports,
  Xs = {};
Object.defineProperty(Xs, '__esModule', {value: !0});
var iP = Ui,
  Wa = oP(iP);
function oP(e) {
  return e && e.__esModule ? e : {default: e};
}
var sP = {
  mountFlag: !1,
  initialized: !1,
  scroller: null,
  containers: {},
  mount: function (t) {
    (this.scroller = t),
      (this.handleHashChange = this.handleHashChange.bind(this)),
      window.addEventListener('hashchange', this.handleHashChange),
      this.initStateFromHash(),
      (this.mountFlag = !0);
  },
  mapContainer: function (t, n) {
    this.containers[t] = n;
  },
  isMounted: function () {
    return this.mountFlag;
  },
  isInitialized: function () {
    return this.initialized;
  },
  initStateFromHash: function () {
    var t = this,
      n = this.getHash();
    n
      ? window.setTimeout(function () {
          t.scrollTo(n, !0), (t.initialized = !0);
        }, 10)
      : (this.initialized = !0);
  },
  scrollTo: function (t, n) {
    var r = this.scroller,
      i = r.get(t);
    if (i && (n || t !== r.getActiveLink())) {
      var o = this.containers[t] || document;
      r.scrollTo(t, {container: o});
    }
  },
  getHash: function () {
    return Wa.default.getHash();
  },
  changeHash: function (t, n) {
    this.isInitialized() &&
      Wa.default.getHash() !== t &&
      Wa.default.updateHash(t, n);
  },
  handleHashChange: function () {
    this.scrollTo(this.getHash());
  },
  unmount: function () {
    (this.scroller = null),
      (this.containers = null),
      window.removeEventListener('hashchange', this.handleHashChange);
  },
};
Xs.default = sP;
Object.defineProperty(zi, '__esModule', {value: !0});
var wo =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  aP = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  lP = S,
  oh = Gi(lP),
  uP = Fi,
  xo = Gi(uP),
  cP = _r,
  fP = Gi(cP),
  dP = Wi,
  ne = Gi(dP),
  hP = Xs,
  Bt = Gi(hP);
function Gi(e) {
  return e && e.__esModule ? e : {default: e};
}
function pP(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function mP(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return t && (typeof t == 'object' || typeof t == 'function') ? t : e;
}
function vP(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof t,
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, enumerable: !1, writable: !0, configurable: !0},
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var sh = {
  to: ne.default.string.isRequired,
  containerId: ne.default.string,
  container: ne.default.object,
  activeClass: ne.default.string,
  activeStyle: ne.default.object,
  spy: ne.default.bool,
  horizontal: ne.default.bool,
  smooth: ne.default.oneOfType([ne.default.bool, ne.default.string]),
  offset: ne.default.number,
  delay: ne.default.number,
  isDynamic: ne.default.bool,
  onClick: ne.default.func,
  duration: ne.default.oneOfType([ne.default.number, ne.default.func]),
  absolute: ne.default.bool,
  onSetActive: ne.default.func,
  onSetInactive: ne.default.func,
  ignoreCancelEvents: ne.default.bool,
  hashSpy: ne.default.bool,
  saveHashHistory: ne.default.bool,
  spyThrottle: ne.default.number,
};
zi.default = function (e, t) {
  var n = t || fP.default,
    r = (function (o) {
      vP(s, o);
      function s(a) {
        pP(this, s);
        var l = mP(
          this,
          (s.__proto__ || Object.getPrototypeOf(s)).call(this, a),
        );
        return i.call(l), (l.state = {active: !1}), l;
      }
      return (
        aP(s, [
          {
            key: 'getScrollSpyContainer',
            value: function () {
              var l = this.props.containerId,
                u = this.props.container;
              return l && !u
                ? document.getElementById(l)
                : u && u.nodeType
                ? u
                : document;
            },
          },
          {
            key: 'componentDidMount',
            value: function () {
              if (this.props.spy || this.props.hashSpy) {
                var l = this.getScrollSpyContainer();
                xo.default.isMounted(l) ||
                  xo.default.mount(l, this.props.spyThrottle),
                  this.props.hashSpy &&
                    (Bt.default.isMounted() || Bt.default.mount(n),
                    Bt.default.mapContainer(this.props.to, l)),
                  xo.default.addSpyHandler(this.spyHandler, l),
                  this.setState({container: l});
              }
            },
          },
          {
            key: 'componentWillUnmount',
            value: function () {
              xo.default.unmount(this.stateHandler, this.spyHandler);
            },
          },
          {
            key: 'render',
            value: function () {
              var l = '';
              this.state && this.state.active
                ? (l = (
                    (this.props.className || '') +
                    ' ' +
                    (this.props.activeClass || 'active')
                  ).trim())
                : (l = this.props.className);
              var u = {};
              this.state && this.state.active
                ? (u = wo({}, this.props.style, this.props.activeStyle))
                : (u = wo({}, this.props.style));
              var c = wo({}, this.props);
              for (var f in sh) c.hasOwnProperty(f) && delete c[f];
              return (
                (c.className = l),
                (c.style = u),
                (c.onClick = this.handleClick),
                oh.default.createElement(e, c)
              );
            },
          },
        ]),
        s
      );
    })(oh.default.PureComponent),
    i = function () {
      var s = this;
      (this.scrollTo = function (a, l) {
        n.scrollTo(a, wo({}, s.state, l));
      }),
        (this.handleClick = function (a) {
          s.props.onClick && s.props.onClick(a),
            a.stopPropagation && a.stopPropagation(),
            a.preventDefault && a.preventDefault(),
            s.scrollTo(s.props.to, s.props);
        }),
        (this.spyHandler = function (a, l) {
          var u = s.getScrollSpyContainer();
          if (!(Bt.default.isMounted() && !Bt.default.isInitialized())) {
            var c = s.props.horizontal,
              f = s.props.to,
              d = null,
              h = void 0,
              v = void 0;
            if (c) {
              var y = 0,
                x = 0,
                m = 0;
              if (u.getBoundingClientRect) {
                var p = u.getBoundingClientRect();
                m = p.left;
              }
              if (!d || s.props.isDynamic) {
                if (((d = n.get(f)), !d)) return;
                var g = d.getBoundingClientRect();
                (y = g.left - m + a), (x = y + g.width);
              }
              var w = a - s.props.offset;
              (h = w >= Math.floor(y) && w < Math.floor(x)),
                (v = w < Math.floor(y) || w >= Math.floor(x));
            } else {
              var E = 0,
                T = 0,
                P = 0;
              if (u.getBoundingClientRect) {
                var k = u.getBoundingClientRect();
                P = k.top;
              }
              if (!d || s.props.isDynamic) {
                if (((d = n.get(f)), !d)) return;
                var b = d.getBoundingClientRect();
                (E = b.top - P + l), (T = E + b.height);
              }
              var C = l - s.props.offset;
              (h = C >= Math.floor(E) && C < Math.floor(T)),
                (v = C < Math.floor(E) || C >= Math.floor(T));
            }
            var M = n.getActiveLink();
            if (v) {
              if (
                (f === M && n.setActiveLink(void 0),
                s.props.hashSpy && Bt.default.getHash() === f)
              ) {
                var V = s.props.saveHashHistory,
                  F = V === void 0 ? !1 : V;
                Bt.default.changeHash('', F);
              }
              s.props.spy &&
                s.state.active &&
                (s.setState({active: !1}),
                s.props.onSetInactive && s.props.onSetInactive(f, d));
            }
            if (h && (M !== f || s.state.active === !1)) {
              n.setActiveLink(f);
              var j = s.props.saveHashHistory,
                A = j === void 0 ? !1 : j;
              s.props.hashSpy && Bt.default.changeHash(f, A),
                s.props.spy &&
                  (s.setState({active: !0}),
                  s.props.onSetActive && s.props.onSetActive(f, d));
            }
          }
        });
    };
  return (r.propTypes = sh), (r.defaultProps = {offset: 0}), r;
};
Object.defineProperty(Tc, '__esModule', {value: !0});
var gP = S,
  ah = _g(gP),
  yP = zi,
  wP = _g(yP);
function _g(e) {
  return e && e.__esModule ? e : {default: e};
}
function xP(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function lh(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return t && (typeof t == 'object' || typeof t == 'function') ? t : e;
}
function SP(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof t,
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, enumerable: !1, writable: !0, configurable: !0},
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var kP = (function (e) {
  SP(t, e);
  function t() {
    var n, r, i, o;
    xP(this, t);
    for (var s = arguments.length, a = Array(s), l = 0; l < s; l++)
      a[l] = arguments[l];
    return (
      (o =
        ((r =
          ((i = lh(
            this,
            (n = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
              n,
              [this].concat(a),
            ),
          )),
          i)),
        (i.render = function () {
          return ah.default.createElement('a', i.props, i.props.children);
        }),
        r)),
      lh(i, o)
    );
  }
  return t;
})(ah.default.Component);
Tc.default = (0, wP.default)(kP);
var Rc = {};
Object.defineProperty(Rc, '__esModule', {value: !0});
var EP = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  PP = S,
  uh = bg(PP),
  TP = zi,
  CP = bg(TP);
function bg(e) {
  return e && e.__esModule ? e : {default: e};
}
function _P(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function bP(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return t && (typeof t == 'object' || typeof t == 'function') ? t : e;
}
function OP(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof t,
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, enumerable: !1, writable: !0, configurable: !0},
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var RP = (function (e) {
  OP(t, e);
  function t() {
    return (
      _P(this, t),
      bP(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    );
  }
  return (
    EP(t, [
      {
        key: 'render',
        value: function () {
          return uh.default.createElement(
            'button',
            this.props,
            this.props.children,
          );
        },
      },
    ]),
    t
  );
})(uh.default.Component);
Rc.default = (0, CP.default)(RP);
var Mc = {},
  Zs = {};
Object.defineProperty(Zs, '__esModule', {value: !0});
var MP =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  AP = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  LP = S,
  ch = Js(LP),
  NP = Zm;
Js(NP);
var jP = _r,
  fh = Js(jP),
  DP = Wi,
  dh = Js(DP);
function Js(e) {
  return e && e.__esModule ? e : {default: e};
}
function IP(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function VP(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return t && (typeof t == 'object' || typeof t == 'function') ? t : e;
}
function zP(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof t,
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, enumerable: !1, writable: !0, configurable: !0},
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
Zs.default = function (e) {
  var t = (function (n) {
    zP(r, n);
    function r(i) {
      IP(this, r);
      var o = VP(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, i));
      return (o.childBindings = {domNode: null}), o;
    }
    return (
      AP(r, [
        {
          key: 'componentDidMount',
          value: function () {
            if (typeof window > 'u') return !1;
            this.registerElems(this.props.name);
          },
        },
        {
          key: 'componentDidUpdate',
          value: function (o) {
            this.props.name !== o.name && this.registerElems(this.props.name);
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            if (typeof window > 'u') return !1;
            fh.default.unregister(this.props.name);
          },
        },
        {
          key: 'registerElems',
          value: function (o) {
            fh.default.register(o, this.childBindings.domNode);
          },
        },
        {
          key: 'render',
          value: function () {
            return ch.default.createElement(
              e,
              MP({}, this.props, {parentBindings: this.childBindings}),
            );
          },
        },
      ]),
      r
    );
  })(ch.default.Component);
  return (t.propTypes = {name: dh.default.string, id: dh.default.string}), t;
};
Object.defineProperty(Mc, '__esModule', {value: !0});
var hh =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  FP = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  BP = S,
  ph = Ac(BP),
  UP = Zs,
  $P = Ac(UP),
  HP = Wi,
  mh = Ac(HP);
function Ac(e) {
  return e && e.__esModule ? e : {default: e};
}
function WP(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function GP(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return t && (typeof t == 'object' || typeof t == 'function') ? t : e;
}
function QP(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof t,
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, enumerable: !1, writable: !0, configurable: !0},
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var Og = (function (e) {
  QP(t, e);
  function t() {
    return (
      WP(this, t),
      GP(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    );
  }
  return (
    FP(t, [
      {
        key: 'render',
        value: function () {
          var r = this,
            i = hh({}, this.props);
          return (
            delete i.name,
            i.parentBindings && delete i.parentBindings,
            ph.default.createElement(
              'div',
              hh({}, i, {
                ref: function (s) {
                  r.props.parentBindings.domNode = s;
                },
              }),
              this.props.children,
            )
          );
        },
      },
    ]),
    t
  );
})(ph.default.Component);
Og.propTypes = {name: mh.default.string, id: mh.default.string};
Mc.default = (0, $P.default)(Og);
var Ga =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  vh = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })();
function gh(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function yh(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return t && (typeof t == 'object' || typeof t == 'function') ? t : e;
}
function wh(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof t,
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, enumerable: !1, writable: !0, configurable: !0},
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var So = S,
  xn = Fi,
  Qa = _r,
  oe = Wi,
  Ut = Xs,
  xh = {
    to: oe.string.isRequired,
    containerId: oe.string,
    container: oe.object,
    activeClass: oe.string,
    spy: oe.bool,
    smooth: oe.oneOfType([oe.bool, oe.string]),
    offset: oe.number,
    delay: oe.number,
    isDynamic: oe.bool,
    onClick: oe.func,
    duration: oe.oneOfType([oe.number, oe.func]),
    absolute: oe.bool,
    onSetActive: oe.func,
    onSetInactive: oe.func,
    ignoreCancelEvents: oe.bool,
    hashSpy: oe.bool,
    spyThrottle: oe.number,
  },
  KP = {
    Scroll: function (t, n) {
      console.warn('Helpers.Scroll is deprecated since v1.7.0');
      var r = n || Qa,
        i = (function (s) {
          wh(a, s);
          function a(l) {
            gh(this, a);
            var u = yh(
              this,
              (a.__proto__ || Object.getPrototypeOf(a)).call(this, l),
            );
            return o.call(u), (u.state = {active: !1}), u;
          }
          return (
            vh(a, [
              {
                key: 'getScrollSpyContainer',
                value: function () {
                  var u = this.props.containerId,
                    c = this.props.container;
                  return u
                    ? document.getElementById(u)
                    : c && c.nodeType
                    ? c
                    : document;
                },
              },
              {
                key: 'componentDidMount',
                value: function () {
                  if (this.props.spy || this.props.hashSpy) {
                    var u = this.getScrollSpyContainer();
                    xn.isMounted(u) || xn.mount(u, this.props.spyThrottle),
                      this.props.hashSpy &&
                        (Ut.isMounted() || Ut.mount(r),
                        Ut.mapContainer(this.props.to, u)),
                      this.props.spy && xn.addStateHandler(this.stateHandler),
                      xn.addSpyHandler(this.spyHandler, u),
                      this.setState({container: u});
                  }
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  xn.unmount(this.stateHandler, this.spyHandler);
                },
              },
              {
                key: 'render',
                value: function () {
                  var u = '';
                  this.state && this.state.active
                    ? (u = (
                        (this.props.className || '') +
                        ' ' +
                        (this.props.activeClass || 'active')
                      ).trim())
                    : (u = this.props.className);
                  var c = Ga({}, this.props);
                  for (var f in xh) c.hasOwnProperty(f) && delete c[f];
                  return (
                    (c.className = u),
                    (c.onClick = this.handleClick),
                    So.createElement(t, c)
                  );
                },
              },
            ]),
            a
          );
        })(So.Component),
        o = function () {
          var a = this;
          (this.scrollTo = function (l, u) {
            r.scrollTo(l, Ga({}, a.state, u));
          }),
            (this.handleClick = function (l) {
              a.props.onClick && a.props.onClick(l),
                l.stopPropagation && l.stopPropagation(),
                l.preventDefault && l.preventDefault(),
                a.scrollTo(a.props.to, a.props);
            }),
            (this.stateHandler = function () {
              r.getActiveLink() !== a.props.to &&
                (a.state !== null &&
                  a.state.active &&
                  a.props.onSetInactive &&
                  a.props.onSetInactive(),
                a.setState({active: !1}));
            }),
            (this.spyHandler = function (l) {
              var u = a.getScrollSpyContainer();
              if (!(Ut.isMounted() && !Ut.isInitialized())) {
                var c = a.props.to,
                  f = null,
                  d = 0,
                  h = 0,
                  v = 0;
                if (u.getBoundingClientRect) {
                  var y = u.getBoundingClientRect();
                  v = y.top;
                }
                if (!f || a.props.isDynamic) {
                  if (((f = r.get(c)), !f)) return;
                  var x = f.getBoundingClientRect();
                  (d = x.top - v + l), (h = d + x.height);
                }
                var m = l - a.props.offset,
                  p = m >= Math.floor(d) && m < Math.floor(h),
                  g = m < Math.floor(d) || m >= Math.floor(h),
                  w = r.getActiveLink();
                if (g)
                  return (
                    c === w && r.setActiveLink(void 0),
                    a.props.hashSpy && Ut.getHash() === c && Ut.changeHash(),
                    a.props.spy &&
                      a.state.active &&
                      (a.setState({active: !1}),
                      a.props.onSetInactive && a.props.onSetInactive()),
                    xn.updateStates()
                  );
                if (p && w !== c)
                  return (
                    r.setActiveLink(c),
                    a.props.hashSpy && Ut.changeHash(c),
                    a.props.spy &&
                      (a.setState({active: !0}),
                      a.props.onSetActive && a.props.onSetActive(c)),
                    xn.updateStates()
                  );
              }
            });
        };
      return (i.propTypes = xh), (i.defaultProps = {offset: 0}), i;
    },
    Element: function (t) {
      console.warn('Helpers.Element is deprecated since v1.7.0');
      var n = (function (r) {
        wh(i, r);
        function i(o) {
          gh(this, i);
          var s = yh(
            this,
            (i.__proto__ || Object.getPrototypeOf(i)).call(this, o),
          );
          return (s.childBindings = {domNode: null}), s;
        }
        return (
          vh(i, [
            {
              key: 'componentDidMount',
              value: function () {
                if (typeof window > 'u') return !1;
                this.registerElems(this.props.name);
              },
            },
            {
              key: 'componentDidUpdate',
              value: function (s) {
                this.props.name !== s.name &&
                  this.registerElems(this.props.name);
              },
            },
            {
              key: 'componentWillUnmount',
              value: function () {
                if (typeof window > 'u') return !1;
                Qa.unregister(this.props.name);
              },
            },
            {
              key: 'registerElems',
              value: function (s) {
                Qa.register(s, this.childBindings.domNode);
              },
            },
            {
              key: 'render',
              value: function () {
                return So.createElement(
                  t,
                  Ga({}, this.props, {parentBindings: this.childBindings}),
                );
              },
            },
          ]),
          i
        );
      })(So.Component);
      return (n.propTypes = {name: oe.string, id: oe.string}), n;
    },
  },
  qP = KP;
Object.defineProperty(ce, '__esModule', {value: !0});
ce.Helpers =
  ce.ScrollElement =
  ce.ScrollLink =
  ce.animateScroll =
  ce.scrollSpy =
  ce.Events =
  ce.scroller =
  ce.Element =
  ce.Button =
  Tn =
  ce.Link =
    void 0;
var YP = Tc,
  Rg = Pt(YP),
  XP = Rc,
  Mg = Pt(XP),
  ZP = Mc,
  Ag = Pt(ZP),
  JP = _r,
  Lg = Pt(JP),
  eT = $i,
  Ng = Pt(eT),
  tT = Fi,
  jg = Pt(tT),
  nT = Ks,
  Dg = Pt(nT),
  rT = zi,
  Ig = Pt(rT),
  iT = Zs,
  Vg = Pt(iT),
  oT = qP,
  zg = Pt(oT);
function Pt(e) {
  return e && e.__esModule ? e : {default: e};
}
var Tn = (ce.Link = Rg.default);
ce.Button = Mg.default;
ce.Element = Ag.default;
ce.scroller = Lg.default;
ce.Events = Ng.default;
ce.scrollSpy = jg.default;
ce.animateScroll = Dg.default;
ce.ScrollLink = Ig.default;
ce.ScrollElement = Vg.default;
ce.Helpers = zg.default;
ce.default = {
  Link: Rg.default,
  Button: Mg.default,
  Element: Ag.default,
  scroller: Lg.default,
  Events: Ng.default,
  scrollSpy: jg.default,
  animateScroll: Dg.default,
  ScrollLink: Ig.default,
  ScrollElement: Vg.default,
  Helpers: zg.default,
};
function Ka({icon: e, title: t, description: n, delay: r}) {
  const i = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {duration: 0.5, delay: r, ease: 'easeInOut'},
    },
    hover: {y: -15, transition: {duration: 0, ease: 'linear'}},
    hidden: {opacity: 1, scale: 0, y: 25},
  };
  return _.jsxs(Je.div, {
    initial: 'hidden',
    whileInView: 'visible',
    variants: i,
    whileHover: 'hover',
    className:
      ' bg-white shadow-lg rounded-xl border-4 hover:border-b-dark transition-all duration-300 w-full xl:w-1/3 p-6 mt-12',
    children: [
      _.jsx('div', {
        className: 'mx-auto flex justify-center',
        children: _.jsx('i', {
          className: 'bx bx-lg text-dark-600 text-center  ' + e,
        }),
      }),
      _.jsx('p', {
        className: 'text-neutral-800 text-center text-xl my-5 font-bold',
        children: t,
      }),
      _.jsx('p', {
        className: 'text-neutral-700 text-center leading-loose',
        children: n,
      }),
    ],
  });
}
function Sh({title: e, subtitle: t, link: n, imagePath: r, textColor: i}) {
  return _.jsxs(Je.div, {
    initial: {opacity: 0, y: 75},
    whileInView: {opacity: 1, y: 0, transition: {duration: 0.75, delay: 0.25}},
    className:
      'sm:w-96 h-auto rounded-xl justify-center mx-auto mt-8 relative group z-20 overflow-hidden',
    children: [
      _.jsx('img', {src: r, className: 'rounded-xl -z-20'}),
      _.jsx('div', {
        className:
          'w-full h-full bg-accent-700/30 absolute bottom-0 -right-full group-hover:right-0 rounded-xl transition-all duration-500 z-10',
      }),
      _.jsx('p', {
        className:
          'absolute top-5 w-96 text-center font-bold text-2xl left-1/2 -translate-x-1/2 z-30 -translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ' +
          i,
        children: e,
      }),
      _.jsx('a', {
        href: n,
        className:
          'absolute bottom-1/2 w-12 h-12 translate-y-1/2 font-bold text-xl bg-light left-1/2 -translate-x-1/2  z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full justify-center',
        children: _.jsx('i', {
          className:
            'bx bx-md text-dark bx-link-alt justify-center mx-1.5 my-1.5',
        }),
      }),
      _.jsx('p', {
        className:
          'absolute bottom-3 text-xl text-center w-96 left-1/2 -translate-x-1/2 z-30 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ' +
          i,
        children: t,
      }),
    ],
  });
}
function ko({title: e, subtitle: t}) {
  return _.jsxs(Je.div, {
    initial: {opacity: 0, y: 100},
    whileInView: {opacity: 1, y: 0, transition: {duration: 0.75}},
    children: [
      _.jsx('p', {
        className: 'text-neutral-400 text-center text-2xl my-2 font-bold',
        children: e,
      }),
      _.jsx('p', {
        className: 'text-neutral-700 text-center text-4xl my-2 font-bold',
        children: t,
      }),
      _.jsx('hr', {
        className: 'bg-accent w-24 h-1 my-5 justify-center mx-auto',
      }),
    ],
  });
}
function qa({
  name: e,
  role: t,
  image: n,
  github: r,
  insta: i,
  linkedin: o,
  delay: s,
}) {
  return _.jsxs(Je.div, {
    initial: {opacity: 0, y: 75},
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {duration: 1, delay: s, ease: 'easeInOut'},
    },
    children: [
      _.jsxs('div', {
        className:
          'w-4/5 sm:w-3/5 lg:w-full h-auto aspect-square rounded-xl justify-center mx-auto relative group z-20 overflow-hidden',
        children: [
          _.jsx('img', {src: n, className: 'rounded-xl -z-20'}),
          _.jsx('div', {
            className:
              'w-full h-24 bg-accent-700/80 absolute -bottom-full group-hover:bottom-0 rounded-xl transition-all duration-500 z-10',
          }),
          _.jsx('p', {
            className:
              'absolute  bottom-10 font-bold text-xl xl:text-2xl w-full text-center text-neutral-800 left-1/2 -translate-x-1/2 z-30 translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500',
            children: e,
          }),
          _.jsx('p', {
            className:
              'absolute bottom-5 text-lg w-full xl:text-xl px-2 text-neutral-800 left-1/2 text-center -translate-x-1/2 z-30 translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500',
            children: t,
          }),
        ],
      }),
      _.jsxs('div', {
        className: 'w-full mx-auto justify-center flex gap-8',
        children: [
          _.jsx('a', {
            href: r,
            className:
              'h-12 font-bold text-xl  z-30  transition-all duration-500 rounded-full justify-center',
            children: _.jsx('i', {
              className: 'bx bx-md text-dark bxl-github justify-center my-1.5',
            }),
          }),
          o &&
            _.jsx('a', {
              href: o,
              className:
                ' h-12 font-bold text-xl  z-30  transition-all duration-500 rounded-full justify-center',
              children: _.jsx('i', {
                className:
                  'bx bx-md text-dark bxl-linkedin justify-center  my-1.5',
              }),
            }),
          _.jsx('a', {
            href: i,
            className:
              ' h-12 font-bold text-xl  z-30  transition-all duration-500 rounded-full justify-center',
            children: _.jsx('i', {
              className:
                'bx bx-md text-dark bxl-instagram justify-center  my-1.5',
            }),
          }),
        ],
      }),
    ],
  });
}
var Fg = (function () {
    if (typeof Map < 'u') return Map;
    function e(t, n) {
      var r = -1;
      return (
        t.some(function (i, o) {
          return i[0] === n ? ((r = o), !0) : !1;
        }),
        r
      );
    }
    return (function () {
      function t() {
        this.__entries__ = [];
      }
      return (
        Object.defineProperty(t.prototype, 'size', {
          get: function () {
            return this.__entries__.length;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.get = function (n) {
          var r = e(this.__entries__, n),
            i = this.__entries__[r];
          return i && i[1];
        }),
        (t.prototype.set = function (n, r) {
          var i = e(this.__entries__, n);
          ~i ? (this.__entries__[i][1] = r) : this.__entries__.push([n, r]);
        }),
        (t.prototype.delete = function (n) {
          var r = this.__entries__,
            i = e(r, n);
          ~i && r.splice(i, 1);
        }),
        (t.prototype.has = function (n) {
          return !!~e(this.__entries__, n);
        }),
        (t.prototype.clear = function () {
          this.__entries__.splice(0);
        }),
        (t.prototype.forEach = function (n, r) {
          r === void 0 && (r = null);
          for (var i = 0, o = this.__entries__; i < o.length; i++) {
            var s = o[i];
            n.call(r, s[1], s[0]);
          }
        }),
        t
      );
    })();
  })(),
  ou =
    typeof window < 'u' &&
    typeof document < 'u' &&
    window.document === document,
  ws = (function () {
    return typeof global < 'u' && global.Math === Math
      ? global
      : typeof self < 'u' && self.Math === Math
      ? self
      : typeof window < 'u' && window.Math === Math
      ? window
      : Function('return this')();
  })(),
  sT = (function () {
    return typeof requestAnimationFrame == 'function'
      ? requestAnimationFrame.bind(ws)
      : function (e) {
          return setTimeout(function () {
            return e(Date.now());
          }, 1e3 / 60);
        };
  })(),
  aT = 2;
function lT(e, t) {
  var n = !1,
    r = !1,
    i = 0;
  function o() {
    n && ((n = !1), e()), r && a();
  }
  function s() {
    sT(o);
  }
  function a() {
    var l = Date.now();
    if (n) {
      if (l - i < aT) return;
      r = !0;
    } else (n = !0), (r = !1), setTimeout(s, t);
    i = l;
  }
  return a;
}
var uT = 20,
  cT = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'],
  fT = typeof MutationObserver < 'u',
  dT = (function () {
    function e() {
      (this.connected_ = !1),
        (this.mutationEventsAdded_ = !1),
        (this.mutationsObserver_ = null),
        (this.observers_ = []),
        (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
        (this.refresh = lT(this.refresh.bind(this), uT));
    }
    return (
      (e.prototype.addObserver = function (t) {
        ~this.observers_.indexOf(t) || this.observers_.push(t),
          this.connected_ || this.connect_();
      }),
      (e.prototype.removeObserver = function (t) {
        var n = this.observers_,
          r = n.indexOf(t);
        ~r && n.splice(r, 1),
          !n.length && this.connected_ && this.disconnect_();
      }),
      (e.prototype.refresh = function () {
        var t = this.updateObservers_();
        t && this.refresh();
      }),
      (e.prototype.updateObservers_ = function () {
        var t = this.observers_.filter(function (n) {
          return n.gatherActive(), n.hasActive();
        });
        return (
          t.forEach(function (n) {
            return n.broadcastActive();
          }),
          t.length > 0
        );
      }),
      (e.prototype.connect_ = function () {
        !ou ||
          this.connected_ ||
          (document.addEventListener('transitionend', this.onTransitionEnd_),
          window.addEventListener('resize', this.refresh),
          fT
            ? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
              this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0,
              }))
            : (document.addEventListener('DOMSubtreeModified', this.refresh),
              (this.mutationEventsAdded_ = !0)),
          (this.connected_ = !0));
      }),
      (e.prototype.disconnect_ = function () {
        !ou ||
          !this.connected_ ||
          (document.removeEventListener('transitionend', this.onTransitionEnd_),
          window.removeEventListener('resize', this.refresh),
          this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
          this.mutationEventsAdded_ &&
            document.removeEventListener('DOMSubtreeModified', this.refresh),
          (this.mutationsObserver_ = null),
          (this.mutationEventsAdded_ = !1),
          (this.connected_ = !1));
      }),
      (e.prototype.onTransitionEnd_ = function (t) {
        var n = t.propertyName,
          r = n === void 0 ? '' : n,
          i = cT.some(function (o) {
            return !!~r.indexOf(o);
          });
        i && this.refresh();
      }),
      (e.getInstance = function () {
        return this.instance_ || (this.instance_ = new e()), this.instance_;
      }),
      (e.instance_ = null),
      e
    );
  })(),
  Bg = function (e, t) {
    for (var n = 0, r = Object.keys(t); n < r.length; n++) {
      var i = r[n];
      Object.defineProperty(e, i, {
        value: t[i],
        enumerable: !1,
        writable: !1,
        configurable: !0,
      });
    }
    return e;
  },
  Er = function (e) {
    var t = e && e.ownerDocument && e.ownerDocument.defaultView;
    return t || ws;
  },
  Ug = ea(0, 0, 0, 0);
function xs(e) {
  return parseFloat(e) || 0;
}
function kh(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  return t.reduce(function (r, i) {
    var o = e['border-' + i + '-width'];
    return r + xs(o);
  }, 0);
}
function hT(e) {
  for (
    var t = ['top', 'right', 'bottom', 'left'], n = {}, r = 0, i = t;
    r < i.length;
    r++
  ) {
    var o = i[r],
      s = e['padding-' + o];
    n[o] = xs(s);
  }
  return n;
}
function pT(e) {
  var t = e.getBBox();
  return ea(0, 0, t.width, t.height);
}
function mT(e) {
  var t = e.clientWidth,
    n = e.clientHeight;
  if (!t && !n) return Ug;
  var r = Er(e).getComputedStyle(e),
    i = hT(r),
    o = i.left + i.right,
    s = i.top + i.bottom,
    a = xs(r.width),
    l = xs(r.height);
  if (
    (r.boxSizing === 'border-box' &&
      (Math.round(a + o) !== t && (a -= kh(r, 'left', 'right') + o),
      Math.round(l + s) !== n && (l -= kh(r, 'top', 'bottom') + s)),
    !gT(e))
  ) {
    var u = Math.round(a + o) - t,
      c = Math.round(l + s) - n;
    Math.abs(u) !== 1 && (a -= u), Math.abs(c) !== 1 && (l -= c);
  }
  return ea(i.left, i.top, a, l);
}
var vT = (function () {
  return typeof SVGGraphicsElement < 'u'
    ? function (e) {
        return e instanceof Er(e).SVGGraphicsElement;
      }
    : function (e) {
        return e instanceof Er(e).SVGElement && typeof e.getBBox == 'function';
      };
})();
function gT(e) {
  return e === Er(e).document.documentElement;
}
function yT(e) {
  return ou ? (vT(e) ? pT(e) : mT(e)) : Ug;
}
function wT(e) {
  var t = e.x,
    n = e.y,
    r = e.width,
    i = e.height,
    o = typeof DOMRectReadOnly < 'u' ? DOMRectReadOnly : Object,
    s = Object.create(o.prototype);
  return (
    Bg(s, {
      x: t,
      y: n,
      width: r,
      height: i,
      top: n,
      right: t + r,
      bottom: i + n,
      left: t,
    }),
    s
  );
}
function ea(e, t, n, r) {
  return {x: e, y: t, width: n, height: r};
}
var xT = (function () {
    function e(t) {
      (this.broadcastWidth = 0),
        (this.broadcastHeight = 0),
        (this.contentRect_ = ea(0, 0, 0, 0)),
        (this.target = t);
    }
    return (
      (e.prototype.isActive = function () {
        var t = yT(this.target);
        return (
          (this.contentRect_ = t),
          t.width !== this.broadcastWidth || t.height !== this.broadcastHeight
        );
      }),
      (e.prototype.broadcastRect = function () {
        var t = this.contentRect_;
        return (
          (this.broadcastWidth = t.width), (this.broadcastHeight = t.height), t
        );
      }),
      e
    );
  })(),
  ST = (function () {
    function e(t, n) {
      var r = wT(n);
      Bg(this, {target: t, contentRect: r});
    }
    return e;
  })(),
  kT = (function () {
    function e(t, n, r) {
      if (
        ((this.activeObservations_ = []),
        (this.observations_ = new Fg()),
        typeof t != 'function')
      )
        throw new TypeError(
          'The callback provided as parameter 1 is not a function.',
        );
      (this.callback_ = t), (this.controller_ = n), (this.callbackCtx_ = r);
    }
    return (
      (e.prototype.observe = function (t) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.');
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof Er(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var n = this.observations_;
          n.has(t) ||
            (n.set(t, new xT(t)),
            this.controller_.addObserver(this),
            this.controller_.refresh());
        }
      }),
      (e.prototype.unobserve = function (t) {
        if (!arguments.length)
          throw new TypeError('1 argument required, but only 0 present.');
        if (!(typeof Element > 'u' || !(Element instanceof Object))) {
          if (!(t instanceof Er(t).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var n = this.observations_;
          n.has(t) &&
            (n.delete(t), n.size || this.controller_.removeObserver(this));
        }
      }),
      (e.prototype.disconnect = function () {
        this.clearActive(),
          this.observations_.clear(),
          this.controller_.removeObserver(this);
      }),
      (e.prototype.gatherActive = function () {
        var t = this;
        this.clearActive(),
          this.observations_.forEach(function (n) {
            n.isActive() && t.activeObservations_.push(n);
          });
      }),
      (e.prototype.broadcastActive = function () {
        if (this.hasActive()) {
          var t = this.callbackCtx_,
            n = this.activeObservations_.map(function (r) {
              return new ST(r.target, r.broadcastRect());
            });
          this.callback_.call(t, n, t), this.clearActive();
        }
      }),
      (e.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
      }),
      (e.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
      }),
      e
    );
  })(),
  $g = typeof WeakMap < 'u' ? new WeakMap() : new Fg(),
  Hg = (function () {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError('Cannot call a class as a function.');
      if (!arguments.length)
        throw new TypeError('1 argument required, but only 0 present.');
      var n = dT.getInstance(),
        r = new kT(t, n, this);
      $g.set(this, r);
    }
    return e;
  })();
['observe', 'unobserve', 'disconnect'].forEach(function (e) {
  Hg.prototype[e] = function () {
    var t;
    return (t = $g.get(this))[e].apply(t, arguments);
  };
});
var Wg = (function () {
    return typeof ws.ResizeObserver < 'u' ? ws.ResizeObserver : Hg;
  })(),
  ut = {
    Linear: {
      None: function (e) {
        return e;
      },
    },
    Quadratic: {
      In: function (e) {
        return e * e;
      },
      Out: function (e) {
        return e * (2 - e);
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
      },
    },
    Cubic: {
      In: function (e) {
        return e * e * e;
      },
      Out: function (e) {
        return --e * e * e + 1;
      },
      InOut: function (e) {
        return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
      },
    },
    Quartic: {
      In: function (e) {
        return e * e * e * e;
      },
      Out: function (e) {
        return 1 - --e * e * e * e;
      },
      InOut: function (e) {
        return (e *= 2) < 1
          ? 0.5 * e * e * e * e
          : -0.5 * ((e -= 2) * e * e * e - 2);
      },
    },
    Quintic: {
      In: function (e) {
        return e * e * e * e * e;
      },
      Out: function (e) {
        return --e * e * e * e * e + 1;
      },
      InOut: function (e) {
        return (e *= 2) < 1
          ? 0.5 * e * e * e * e * e
          : 0.5 * ((e -= 2) * e * e * e * e + 2);
      },
    },
    Sinusoidal: {
      In: function (e) {
        return 1 - Math.cos((e * Math.PI) / 2);
      },
      Out: function (e) {
        return Math.sin((e * Math.PI) / 2);
      },
      InOut: function (e) {
        return 0.5 * (1 - Math.cos(Math.PI * e));
      },
    },
    Exponential: {
      In: function (e) {
        return e === 0 ? 0 : Math.pow(1024, e - 1);
      },
      Out: function (e) {
        return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
      },
      InOut: function (e) {
        return e === 0
          ? 0
          : e === 1
          ? 1
          : (e *= 2) < 1
          ? 0.5 * Math.pow(1024, e - 1)
          : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
      },
    },
    Circular: {
      In: function (e) {
        return 1 - Math.sqrt(1 - e * e);
      },
      Out: function (e) {
        return Math.sqrt(1 - --e * e);
      },
      InOut: function (e) {
        return (e *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - e * e) - 1)
          : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      },
    },
    Elastic: {
      In: function (e) {
        return e === 0
          ? 0
          : e === 1
          ? 1
          : -Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI);
      },
      Out: function (e) {
        return e === 0
          ? 0
          : e === 1
          ? 1
          : Math.pow(2, -10 * e) * Math.sin((e - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function (e) {
        return e === 0
          ? 0
          : e === 1
          ? 1
          : ((e *= 2),
            e < 1
              ? -0.5 *
                Math.pow(2, 10 * (e - 1)) *
                Math.sin((e - 1.1) * 5 * Math.PI)
              : 0.5 *
                  Math.pow(2, -10 * (e - 1)) *
                  Math.sin((e - 1.1) * 5 * Math.PI) +
                1);
      },
    },
    Back: {
      In: function (e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t);
      },
      Out: function (e) {
        var t = 1.70158;
        return --e * e * ((t + 1) * e + t) + 1;
      },
      InOut: function (e) {
        var t = 2.5949095;
        return (e *= 2) < 1
          ? 0.5 * (e * e * ((t + 1) * e - t))
          : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
      },
    },
    Bounce: {
      In: function (e) {
        return 1 - ut.Bounce.Out(1 - e);
      },
      Out: function (e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      },
      InOut: function (e) {
        return e < 0.5
          ? ut.Bounce.In(e * 2) * 0.5
          : ut.Bounce.Out(e * 2 - 1) * 0.5 + 0.5;
      },
    },
  },
  Qr;
typeof self > 'u' && typeof process < 'u' && process.hrtime
  ? (Qr = function () {
      var e = process.hrtime();
      return e[0] * 1e3 + e[1] / 1e6;
    })
  : typeof self < 'u' &&
    self.performance !== void 0 &&
    self.performance.now !== void 0
  ? (Qr = self.performance.now.bind(self.performance))
  : Date.now !== void 0
  ? (Qr = Date.now)
  : (Qr = function () {
      return new Date().getTime();
    });
var Hn = Qr,
  Lc = (function () {
    function e() {
      (this._tweens = {}), (this._tweensAddedDuringUpdate = {});
    }
    return (
      (e.prototype.getAll = function () {
        var t = this;
        return Object.keys(this._tweens).map(function (n) {
          return t._tweens[n];
        });
      }),
      (e.prototype.removeAll = function () {
        this._tweens = {};
      }),
      (e.prototype.add = function (t) {
        (this._tweens[t.getId()] = t),
          (this._tweensAddedDuringUpdate[t.getId()] = t);
      }),
      (e.prototype.remove = function (t) {
        delete this._tweens[t.getId()],
          delete this._tweensAddedDuringUpdate[t.getId()];
      }),
      (e.prototype.update = function (t, n) {
        t === void 0 && (t = Hn()), n === void 0 && (n = !1);
        var r = Object.keys(this._tweens);
        if (r.length === 0) return !1;
        for (; r.length > 0; ) {
          this._tweensAddedDuringUpdate = {};
          for (var i = 0; i < r.length; i++) {
            var o = this._tweens[r[i]],
              s = !n;
            o && o.update(t, s) === !1 && !n && delete this._tweens[r[i]];
          }
          r = Object.keys(this._tweensAddedDuringUpdate);
        }
        return !0;
      }),
      e
    );
  })(),
  Kr = {
    Linear: function (e, t) {
      var n = e.length - 1,
        r = n * t,
        i = Math.floor(r),
        o = Kr.Utils.Linear;
      return t < 0
        ? o(e[0], e[1], r)
        : t > 1
        ? o(e[n], e[n - 1], n - r)
        : o(e[i], e[i + 1 > n ? n : i + 1], r - i);
    },
    Bezier: function (e, t) {
      for (
        var n = 0,
          r = e.length - 1,
          i = Math.pow,
          o = Kr.Utils.Bernstein,
          s = 0;
        s <= r;
        s++
      )
        n += i(1 - t, r - s) * i(t, s) * e[s] * o(r, s);
      return n;
    },
    CatmullRom: function (e, t) {
      var n = e.length - 1,
        r = n * t,
        i = Math.floor(r),
        o = Kr.Utils.CatmullRom;
      return e[0] === e[n]
        ? (t < 0 && (i = Math.floor((r = n * (1 + t)))),
          o(e[(i - 1 + n) % n], e[i], e[(i + 1) % n], e[(i + 2) % n], r - i))
        : t < 0
        ? e[0] - (o(e[0], e[0], e[1], e[1], -r) - e[0])
        : t > 1
        ? e[n] - (o(e[n], e[n], e[n - 1], e[n - 1], r - n) - e[n])
        : o(
            e[i ? i - 1 : 0],
            e[i],
            e[n < i + 1 ? n : i + 1],
            e[n < i + 2 ? n : i + 2],
            r - i,
          );
    },
    Utils: {
      Linear: function (e, t, n) {
        return (t - e) * n + e;
      },
      Bernstein: function (e, t) {
        var n = Kr.Utils.Factorial;
        return n(e) / n(t) / n(e - t);
      },
      Factorial: (function () {
        var e = [1];
        return function (t) {
          var n = 1;
          if (e[t]) return e[t];
          for (var r = t; r > 1; r--) n *= r;
          return (e[t] = n), n;
        };
      })(),
      CatmullRom: function (e, t, n, r, i) {
        var o = (n - e) * 0.5,
          s = (r - t) * 0.5,
          a = i * i,
          l = i * a;
        return (
          (2 * t - 2 * n + o + s) * l +
          (-3 * t + 3 * n - 2 * o - s) * a +
          o * i +
          t
        );
      },
    },
  },
  ET = (function () {
    function e() {}
    return (
      (e.nextId = function () {
        return e._nextId++;
      }),
      (e._nextId = 0),
      e
    );
  })(),
  Gg = new Lc(),
  Qg = (function () {
    function e(t, n) {
      n === void 0 && (n = Gg),
        (this._object = t),
        (this._group = n),
        (this._isPaused = !1),
        (this._pauseStart = 0),
        (this._valuesStart = {}),
        (this._valuesEnd = {}),
        (this._valuesStartRepeat = {}),
        (this._duration = 1e3),
        (this._initialRepeat = 0),
        (this._repeat = 0),
        (this._yoyo = !1),
        (this._isPlaying = !1),
        (this._reversed = !1),
        (this._delayTime = 0),
        (this._startTime = 0),
        (this._easingFunction = ut.Linear.None),
        (this._interpolationFunction = Kr.Linear),
        (this._chainedTweens = []),
        (this._onStartCallbackFired = !1),
        (this._id = ET.nextId()),
        (this._isChainStopped = !1),
        (this._goToEnd = !1);
    }
    return (
      (e.prototype.getId = function () {
        return this._id;
      }),
      (e.prototype.isPlaying = function () {
        return this._isPlaying;
      }),
      (e.prototype.isPaused = function () {
        return this._isPaused;
      }),
      (e.prototype.to = function (t, n) {
        return (
          (this._valuesEnd = Object.create(t)),
          n !== void 0 && (this._duration = n),
          this
        );
      }),
      (e.prototype.duration = function (t) {
        return (this._duration = t), this;
      }),
      (e.prototype.start = function (t) {
        if (this._isPlaying) return this;
        if (
          (this._group && this._group.add(this),
          (this._repeat = this._initialRepeat),
          this._reversed)
        ) {
          this._reversed = !1;
          for (var n in this._valuesStartRepeat)
            this._swapEndStartRepeatValues(n),
              (this._valuesStart[n] = this._valuesStartRepeat[n]);
        }
        return (
          (this._isPlaying = !0),
          (this._isPaused = !1),
          (this._onStartCallbackFired = !1),
          (this._isChainStopped = !1),
          (this._startTime =
            t !== void 0
              ? typeof t == 'string'
                ? Hn() + parseFloat(t)
                : t
              : Hn()),
          (this._startTime += this._delayTime),
          this._setupProperties(
            this._object,
            this._valuesStart,
            this._valuesEnd,
            this._valuesStartRepeat,
          ),
          this
        );
      }),
      (e.prototype._setupProperties = function (t, n, r, i) {
        for (var o in r) {
          var s = t[o],
            a = Array.isArray(s),
            l = a ? 'array' : typeof s,
            u = !a && Array.isArray(r[o]);
          if (!(l === 'undefined' || l === 'function')) {
            if (u) {
              var c = r[o];
              if (c.length === 0) continue;
              (c = c.map(this._handleRelativeValue.bind(this, s))),
                (r[o] = [s].concat(c));
            }
            if ((l === 'object' || a) && s && !u) {
              n[o] = a ? [] : {};
              for (var f in s) n[o][f] = s[f];
              (i[o] = a ? [] : {}), this._setupProperties(s, n[o], r[o], i[o]);
            } else
              typeof n[o] > 'u' && (n[o] = s),
                a || (n[o] *= 1),
                u ? (i[o] = r[o].slice().reverse()) : (i[o] = n[o] || 0);
          }
        }
      }),
      (e.prototype.stop = function () {
        return (
          this._isChainStopped ||
            ((this._isChainStopped = !0), this.stopChainedTweens()),
          this._isPlaying
            ? (this._group && this._group.remove(this),
              (this._isPlaying = !1),
              (this._isPaused = !1),
              this._onStopCallback && this._onStopCallback(this._object),
              this)
            : this
        );
      }),
      (e.prototype.end = function () {
        return (this._goToEnd = !0), this.update(1 / 0), this;
      }),
      (e.prototype.pause = function (t) {
        return (
          t === void 0 && (t = Hn()),
          this._isPaused || !this._isPlaying
            ? this
            : ((this._isPaused = !0),
              (this._pauseStart = t),
              this._group && this._group.remove(this),
              this)
        );
      }),
      (e.prototype.resume = function (t) {
        return (
          t === void 0 && (t = Hn()),
          !this._isPaused || !this._isPlaying
            ? this
            : ((this._isPaused = !1),
              (this._startTime += t - this._pauseStart),
              (this._pauseStart = 0),
              this._group && this._group.add(this),
              this)
        );
      }),
      (e.prototype.stopChainedTweens = function () {
        for (var t = 0, n = this._chainedTweens.length; t < n; t++)
          this._chainedTweens[t].stop();
        return this;
      }),
      (e.prototype.group = function (t) {
        return (this._group = t), this;
      }),
      (e.prototype.delay = function (t) {
        return (this._delayTime = t), this;
      }),
      (e.prototype.repeat = function (t) {
        return (this._initialRepeat = t), (this._repeat = t), this;
      }),
      (e.prototype.repeatDelay = function (t) {
        return (this._repeatDelayTime = t), this;
      }),
      (e.prototype.yoyo = function (t) {
        return (this._yoyo = t), this;
      }),
      (e.prototype.easing = function (t) {
        return (this._easingFunction = t), this;
      }),
      (e.prototype.interpolation = function (t) {
        return (this._interpolationFunction = t), this;
      }),
      (e.prototype.chain = function () {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return (this._chainedTweens = t), this;
      }),
      (e.prototype.onStart = function (t) {
        return (this._onStartCallback = t), this;
      }),
      (e.prototype.onUpdate = function (t) {
        return (this._onUpdateCallback = t), this;
      }),
      (e.prototype.onRepeat = function (t) {
        return (this._onRepeatCallback = t), this;
      }),
      (e.prototype.onComplete = function (t) {
        return (this._onCompleteCallback = t), this;
      }),
      (e.prototype.onStop = function (t) {
        return (this._onStopCallback = t), this;
      }),
      (e.prototype.update = function (t, n) {
        if (
          (t === void 0 && (t = Hn()), n === void 0 && (n = !0), this._isPaused)
        )
          return !0;
        var r,
          i,
          o = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
          if (t > o) return !1;
          n && this.start(t);
        }
        if (((this._goToEnd = !1), t < this._startTime)) return !0;
        this._onStartCallbackFired === !1 &&
          (this._onStartCallback && this._onStartCallback(this._object),
          (this._onStartCallbackFired = !0)),
          (i = (t - this._startTime) / this._duration),
          (i = this._duration === 0 || i > 1 ? 1 : i);
        var s = this._easingFunction(i);
        if (
          (this._updateProperties(
            this._object,
            this._valuesStart,
            this._valuesEnd,
            s,
          ),
          this._onUpdateCallback && this._onUpdateCallback(this._object, i),
          i === 1)
        )
          if (this._repeat > 0) {
            isFinite(this._repeat) && this._repeat--;
            for (r in this._valuesStartRepeat)
              !this._yoyo &&
                typeof this._valuesEnd[r] == 'string' &&
                (this._valuesStartRepeat[r] =
                  this._valuesStartRepeat[r] + parseFloat(this._valuesEnd[r])),
                this._yoyo && this._swapEndStartRepeatValues(r),
                (this._valuesStart[r] = this._valuesStartRepeat[r]);
            return (
              this._yoyo && (this._reversed = !this._reversed),
              this._repeatDelayTime !== void 0
                ? (this._startTime = t + this._repeatDelayTime)
                : (this._startTime = t + this._delayTime),
              this._onRepeatCallback && this._onRepeatCallback(this._object),
              !0
            );
          } else {
            this._onCompleteCallback && this._onCompleteCallback(this._object);
            for (var a = 0, l = this._chainedTweens.length; a < l; a++)
              this._chainedTweens[a].start(this._startTime + this._duration);
            return (this._isPlaying = !1), !1;
          }
        return !0;
      }),
      (e.prototype._updateProperties = function (t, n, r, i) {
        for (var o in r)
          if (n[o] !== void 0) {
            var s = n[o] || 0,
              a = r[o],
              l = Array.isArray(t[o]),
              u = Array.isArray(a),
              c = !l && u;
            c
              ? (t[o] = this._interpolationFunction(a, i))
              : typeof a == 'object' && a
              ? this._updateProperties(t[o], s, a, i)
              : ((a = this._handleRelativeValue(s, a)),
                typeof a == 'number' && (t[o] = s + (a - s) * i));
          }
      }),
      (e.prototype._handleRelativeValue = function (t, n) {
        return typeof n != 'string'
          ? n
          : n.charAt(0) === '+' || n.charAt(0) === '-'
          ? t + parseFloat(n)
          : parseFloat(n);
      }),
      (e.prototype._swapEndStartRepeatValues = function (t) {
        var n = this._valuesStartRepeat[t],
          r = this._valuesEnd[t];
        typeof r == 'string'
          ? (this._valuesStartRepeat[t] =
              this._valuesStartRepeat[t] + parseFloat(r))
          : (this._valuesStartRepeat[t] = this._valuesEnd[t]),
          (this._valuesEnd[t] = n);
      }),
      e
    );
  })(),
  Et = Gg;
Et.getAll.bind(Et);
Et.removeAll.bind(Et);
Et.add.bind(Et);
Et.remove.bind(Et);
Et.update.bind(Et);
function bi() {
  return (
    (bi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    bi.apply(this, arguments)
  );
}
var Kg = function (t, n) {
    return n && n < I.Children.count(t) ? n : 0;
  },
  PT = function (t, n) {
    if (typeof window < 'u' && Array.isArray(n))
      return n.find(function (r) {
        return r.breakpoint <= t;
      });
  },
  Eh = {
    linear: ut.Linear.None,
    ease: ut.Quadratic.InOut,
    'ease-in': ut.Quadratic.In,
    'ease-out': ut.Quadratic.Out,
    cubic: ut.Cubic.InOut,
    'cubic-in': ut.Cubic.In,
    'cubic-out': ut.Cubic.Out,
  },
  qg = function (t) {
    return t ? Eh[t] : Eh.linear;
  },
  Yg = function (t, n, r) {
    var i = t.prevArrow,
      o = t.infinite,
      s = n <= 0 && !o,
      a = {
        'data-type': 'prev',
        'aria-label': 'Previous Slide',
        disabled: s,
        onClick: r,
      };
    if (i)
      return I.cloneElement(
        i,
        bi(
          {
            className:
              (i.props.className || '') + ' nav ' + (s ? 'disabled' : ''),
          },
          a,
        ),
      );
    var l = 'nav default-nav ' + (s ? 'disabled' : '');
    return I.createElement(
      'button',
      Object.assign({type: 'button', className: l}, a),
      I.createElement(
        'svg',
        {width: '24', height: '24', viewBox: '0 0 24 24'},
        I.createElement('path', {
          d: 'M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z',
        }),
      ),
    );
  },
  Xg = function (t, n, r) {
    var i = t.nextArrow,
      o = t.infinite,
      s = t.children,
      a = 1;
    'slidesToScroll' in t && (a = t.slidesToScroll || 1);
    var l = n >= I.Children.count(s) - a && !o,
      u = {
        'data-type': 'next',
        'aria-label': 'Next Slide',
        disabled: l,
        onClick: r,
      };
    if (i)
      return I.cloneElement(
        i,
        bi(
          {
            className:
              (i.props.className || '') + ' nav ' + (l ? 'disabled' : ''),
          },
          u,
        ),
      );
    var c = 'nav default-nav ' + (l ? 'disabled' : '');
    return I.createElement(
      'button',
      Object.assign({type: 'button', className: c}, u),
      I.createElement(
        'svg',
        {width: '24', height: '24', viewBox: '0 0 24 24'},
        I.createElement('path', {
          d: 'M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z',
        }),
      ),
    );
  },
  TT = function (t, n, r) {
    return I.createElement(
      'li',
      {key: n},
      I.createElement(
        'button',
        Object.assign(
          {
            type: 'button',
            className: 'each-slideshow-indicator ' + (t ? 'active' : ''),
          },
          r,
        ),
      ),
    );
  },
  CT = function (t, n, r, i) {
    return I.cloneElement(
      i,
      bi({className: i.props.className + ' ' + (t ? 'active' : ''), key: n}, r),
    );
  },
  Zg = function (t, n, r, i) {
    var o = t.children,
      s = t.indicators,
      a = 1;
    i
      ? (a = i == null ? void 0 : i.settings.slidesToScroll)
      : 'slidesToScroll' in t && (a = t.slidesToScroll || 1);
    var l = Math.ceil(I.Children.count(o) / a);
    return I.createElement(
      'ul',
      {className: 'indicators'},
      Array.from({length: l}, function (u, c) {
        var f = {
            'data-key': c,
            'aria-label': 'Go to slide ' + (c + 1),
            onClick: r,
          },
          d = Math.floor((n + a - 1) / a) === c;
        return typeof s == 'function' ? CT(d, c, f, s(c)) : TT(d, c, f);
      }),
    );
  },
  ta = {
    duration: 5e3,
    transitionDuration: 1e3,
    defaultIndex: 0,
    infinite: !0,
    autoplay: !0,
    indicators: !1,
    arrows: !0,
    pauseOnHover: !0,
    easing: 'linear',
    canSwipe: !0,
    cssClass: '',
    responsive: [],
  },
  Nc = I.forwardRef(function (e, t) {
    var n = S.useState(Kg(e.children, e.defaultIndex)),
      r = n[0],
      i = n[1],
      o = S.useRef(null),
      s = S.useRef(null),
      a = S.useRef(new Lc()),
      l = S.useRef(),
      u = S.useRef(),
      c = S.useMemo(
        function () {
          return I.Children.count(e.children);
        },
        [e.children],
      ),
      f = S.useCallback(
        function () {
          if (s.current && o.current) {
            var k = o.current.clientWidth,
              b = k * c;
            s.current.style.width = b + 'px';
            for (var C = 0; C < s.current.children.length; C++) {
              var M = s.current.children[C];
              M &&
                ((M.style.width = k + 'px'),
                (M.style.left = C * -k + 'px'),
                (M.style.display = 'block'));
            }
          }
        },
        [o, s, c],
      ),
      d = S.useCallback(
        function () {
          o.current &&
            ((u.current = new Wg(function (k) {
              k && f();
            })),
            u.current.observe(o.current));
        },
        [o, f],
      ),
      h = S.useCallback(
        function () {
          var k = e.autoplay,
            b = e.children,
            C = e.duration,
            M = e.infinite;
          k &&
            I.Children.count(b) > 1 &&
            (M || r < I.Children.count(b) - 1) &&
            (l.current = setTimeout(m, C));
        },
        [e, r],
      );
    S.useEffect(
      function () {
        return (
          d(),
          function () {
            a.current.removeAll(), clearTimeout(l.current), v();
          }
        );
      },
      [d, a],
    ),
      S.useEffect(
        function () {
          clearTimeout(l.current), h();
        },
        [r, e.autoplay, h],
      ),
      S.useEffect(
        function () {
          f();
        },
        [c, f],
      ),
      S.useImperativeHandle(t, function () {
        return {
          goNext: function () {
            m();
          },
          goBack: function () {
            p();
          },
          goTo: function (b, C) {
            C != null && C.skipTransition ? i(b) : T(b);
          },
        };
      });
    var v = function () {
        u.current && o.current && u.current.unobserve(o.current);
      },
      y = function () {
        e.pauseOnHover && clearTimeout(l.current);
      },
      x = function () {
        var b = e.pauseOnHover,
          C = e.autoplay,
          M = e.duration;
        b &&
          C &&
          (l.current = setTimeout(function () {
            return m();
          }, M));
      },
      m = function () {
        var b = e.children,
          C = e.infinite;
        (!C && r === I.Children.count(b) - 1) ||
          E((r + 1) % I.Children.count(b));
      },
      p = function () {
        var b = e.children,
          C = e.infinite;
        (!C && r === 0) || E(r === 0 ? I.Children.count(b) - 1 : r - 1);
      },
      g = function (b) {
        var C = b.currentTarget;
        C.dataset.type === 'prev' ? p() : m();
      },
      w = function k() {
        requestAnimationFrame(k), a.current.update();
      },
      E = function (b) {
        var C = a.current.getAll();
        if (!C.length) {
          var M;
          ((M = s.current) != null && M.children[b]) || (b = 0),
            clearTimeout(l.current);
          var V = {opacity: 0, scale: 1};
          w();
          var F = new Qg(V, a.current)
            .to({opacity: 1, scale: e.scale}, e.transitionDuration)
            .onUpdate(function (j) {
              s.current &&
                ((s.current.children[b].style.opacity = j.opacity),
                (s.current.children[r].style.opacity = 1 - j.opacity),
                (s.current.children[r].style.transform =
                  'scale(' + j.scale + ')'));
            });
          F.easing(qg(e.easing)),
            F.onStart(function () {
              typeof e.onStartChange == 'function' && e.onStartChange(r, b);
            }),
            F.onComplete(function () {
              s.current &&
                (i(b), (s.current.children[r].style.transform = 'scale(1)')),
                typeof e.onChange == 'function' && e.onChange(r, b);
            }),
            F.start();
        }
      },
      T = function (b) {
        b !== r && E(b);
      },
      P = function (b) {
        var C = b.currentTarget;
        C.dataset.key &&
          parseInt(C.dataset.key) !== r &&
          T(parseInt(C.dataset.key));
      };
    return I.createElement(
      'div',
      {dir: 'ltr', 'aria-roledescription': 'carousel'},
      I.createElement(
        'div',
        {
          className: 'react-slideshow-container ' + (e.cssClass || ''),
          onMouseEnter: y,
          onMouseOver: y,
          onMouseLeave: x,
        },
        e.arrows && Yg(e, r, g),
        I.createElement(
          'div',
          {className: 'react-slideshow-fadezoom-wrapper ' + e.cssClass, ref: o},
          I.createElement(
            'div',
            {className: 'react-slideshow-fadezoom-images-wrap', ref: s},
            (
              I.Children.map(e.children, function (k) {
                return k;
              }) || []
            ).map(function (k, b) {
              return I.createElement(
                'div',
                {
                  style: {
                    opacity: b === r ? '1' : '0',
                    zIndex: b === r ? '1' : '0',
                  },
                  'data-index': b,
                  key: b,
                  'aria-roledescription': 'slide',
                  'aria-hidden': b === r ? 'false' : 'true',
                },
                k,
              );
            }),
          ),
        ),
        e.arrows && Xg(e, r, g),
      ),
      e.indicators && Zg(e, r, P),
    );
  });
Nc.defaultProps = ta;
var _T = I.forwardRef(function (e, t) {
  return I.createElement(Nc, Object.assign({}, e, {scale: 1, ref: t}));
});
_T.defaultProps = ta;
var bT = I.forwardRef(function (e, t) {
  return I.createElement(Nc, Object.assign({}, e, {ref: t}));
});
bT.defaultProps = ta;
var Jg = I.forwardRef(function (e, t) {
  var n = S.useState(Kg(e.children, e.defaultIndex)),
    r = n[0],
    i = n[1],
    o = S.useState(0),
    s = o[0],
    a = o[1],
    l = S.useRef(null),
    u = S.useRef(null),
    c = S.useRef(new Lc()),
    f = S.useMemo(
      function () {
        return PT(s, e.responsive);
      },
      [s, e.responsive],
    ),
    d = S.useMemo(
      function () {
        return f ? f.settings.slidesToScroll : e.slidesToScroll || 1;
      },
      [f, e.slidesToScroll],
    ),
    h = S.useMemo(
      function () {
        return f ? f.settings.slidesToShow : e.slidesToShow || 1;
      },
      [f, e.slidesToShow],
    ),
    v = S.useMemo(
      function () {
        return I.Children.count(e.children);
      },
      [e.children],
    ),
    y = S.useMemo(
      function () {
        return s / h;
      },
      [s, h],
    ),
    x = S.useRef(),
    m = S.useRef(),
    p,
    g = !1,
    w = 0,
    E = e.vertical ? 'translateY' : 'translateX',
    T = e.vertical ? 'clientY' : 'clientX',
    P = e.vertical ? 'pageY' : 'pageX',
    k = S.useCallback(
      function () {
        if (u.current) {
          var H = s * u.current.children.length,
            z = e.vertical ? 'height' : 'width';
          (u.current.style[z] = H + 'px'),
            e.vertical && l.current && (l.current.style[z] = s + 'px');
          for (var K = 0; K < u.current.children.length; K++) {
            var pt = u.current.children[K];
            pt &&
              (e.vertical || (pt.style[z] = y + 'px'),
              (pt.style.display = 'block'));
          }
        }
      },
      [s, y],
    ),
    b = S.useCallback(
      function () {
        l.current &&
          ((m.current = new Wg(function (H) {
            H && $e();
          })),
          m.current.observe(l.current));
      },
      [l],
    ),
    C = S.useCallback(
      function () {
        var H = e.autoplay,
          z = e.infinite,
          K = e.duration;
        H && (z || r < v - 1) && (x.current = setTimeout(j, K));
      },
      [e, v, r],
    );
  S.useEffect(
    function () {
      k();
    },
    [s, k],
  ),
    S.useEffect(
      function () {
        return (
          b(),
          function () {
            c.current.removeAll(), clearTimeout(x.current), M();
          }
        );
      },
      [l, b, c],
    ),
    S.useEffect(
      function () {
        clearTimeout(x.current), C();
      },
      [r, s, e.autoplay, C],
    ),
    S.useImperativeHandle(t, function () {
      return {
        goNext: function () {
          j();
        },
        goBack: function () {
          A();
        },
        goTo: function (z, K) {
          K != null && K.skipTransition ? i(z) : W(z);
        },
      };
    });
  var M = function () {
      m && l.current && m.current.unobserve(l.current);
    },
    V = function () {
      e.pauseOnHover && clearTimeout(x.current);
    },
    F = function (z) {
      if (e.canSwipe && g) {
        var K;
        if (
          (window.TouchEvent && z.nativeEvent instanceof TouchEvent
            ? (K = z.nativeEvent.touches[0][P])
            : (K = z.nativeEvent[T]),
          K && p)
        ) {
          var pt = y * (r + zt()),
            Rr = K - p;
          if (
            (!e.infinite && r === v - d && Rr < 0) ||
            (!e.infinite && r === 0 && Rr > 0)
          )
            return;
          (w = Rr),
            (pt -= w),
            (u.current.style.transform = E + '(-' + pt + 'px)');
        }
      }
    },
    j = function () {
      if (!(!e.infinite && r === v - d)) {
        var z = O(r + d);
        Xe(z);
      }
    },
    A = function () {
      if (!(!e.infinite && r === 0)) {
        var z = r - d;
        z % d && (z = Math.ceil(z / d) * d), Xe(z);
      }
    },
    $ = function (z) {
      var K = z.currentTarget;
      if (K.dataset.key) {
        var pt = parseInt(K.dataset.key);
        W(pt * d);
      }
    },
    W = function (z) {
      Xe(O(z));
    },
    O = function (z) {
      return z < v && z + d > v && (v - d) % d ? v - d : z;
    },
    L = function () {
      g
        ? ke()
        : e.pauseOnHover &&
          e.autoplay &&
          (x.current = setTimeout(j, e.duration));
    },
    B = function (z) {
      var K = z.currentTarget.dataset;
      K.type === 'next' ? j() : A();
    },
    D = function () {
      return I.Children.toArray(e.children)
        .slice(-h)
        .map(function (z, K) {
          return I.createElement(
            'div',
            {
              'data-index': K - h,
              'aria-roledescription': 'slide',
              'aria-hidden': 'true',
              key: K - h,
            },
            z,
          );
        });
    },
    q = function () {
      if (!(!e.infinite && h === d))
        return I.Children.toArray(e.children)
          .slice(0, h)
          .map(function (z, K) {
            return I.createElement(
              'div',
              {
                'data-index': v + K,
                'aria-roledescription': 'slide',
                'aria-hidden': 'true',
                key: v + K,
              },
              z,
            );
          });
    },
    $e = function () {
      var z = e.vertical ? 'clientHeight' : 'clientWidth';
      e.vertical
        ? u.current && a(u.current.children[0][z])
        : l.current && a(l.current[z]);
    },
    Ce = function (z) {
      e.canSwipe &&
        (window.TouchEvent && z.nativeEvent instanceof TouchEvent
          ? (p = z.nativeEvent.touches[0][P])
          : (p = z.nativeEvent[T]),
        clearTimeout(x.current),
        (g = !0));
    },
    ke = function () {
      e.canSwipe &&
        ((g = !1),
        Math.abs(w) / s > 0.2
          ? w < 0
            ? j()
            : A()
          : Math.abs(w) > 0 && Xe(r, 300));
    },
    Me = function H() {
      requestAnimationFrame(H), c.current.update();
    },
    Xe = function (z, K) {
      var pt = K || e.transitionDuration,
        Rr = r,
        gy = c.current.getAll();
      if (l.current) {
        var yy = e.vertical ? 'clientHeight' : 'clientWidth',
          Fc = l.current[yy] / h;
        if (!gy.length) {
          clearTimeout(x.current);
          var wy = {margin: -Fc * (Rr + zt()) + w},
            Ki = new Qg(wy, c.current)
              .to({margin: -Fc * (z + zt())}, pt)
              .onUpdate(function (xy) {
                u.current &&
                  (u.current.style.transform = E + '(' + xy.margin + 'px)');
              });
          Ki.easing(qg(e.easing)), Me();
          var yn = z;
          yn < 0 ? (yn = v - d) : yn >= v && (yn = 0),
            Ki.onStart(function () {
              typeof e.onStartChange == 'function' && e.onStartChange(r, yn);
            }),
            Ki.onComplete(function () {
              (w = 0),
                typeof e.onChange == 'function' && e.onChange(r, yn),
                i(yn);
            }),
            Ki.start();
        }
      }
    },
    ia = function (z) {
      return z < r + h && z >= r;
    },
    zt = function () {
      return e.infinite ? h : 0;
    },
    Un = {transform: E + '(-' + (r + zt()) * y + 'px)'};
  return I.createElement(
    'div',
    {dir: 'ltr', 'aria-roledescription': 'carousel'},
    I.createElement(
      'div',
      {
        className: 'react-slideshow-container',
        onMouseEnter: V,
        onMouseOver: V,
        onMouseLeave: L,
        onMouseDown: Ce,
        onMouseUp: ke,
        onMouseMove: F,
        onTouchStart: Ce,
        onTouchEnd: ke,
        onTouchCancel: ke,
        onTouchMove: F,
      },
      e.arrows && Yg(e, r, B),
      I.createElement(
        'div',
        {
          className: 'react-slideshow-wrapper slide ' + (e.cssClass || ''),
          ref: l,
        },
        I.createElement(
          'div',
          {
            className:
              'images-wrap ' + (e.vertical ? 'vertical' : 'horizontal'),
            style: Un,
            ref: u,
          },
          e.infinite && D(),
          (
            I.Children.map(e.children, function (H) {
              return H;
            }) || []
          ).map(function (H, z) {
            var K = ia(z);
            return I.createElement(
              'div',
              {
                'data-index': z,
                key: z,
                className: K ? 'active' : '',
                'aria-roledescription': 'slide',
                'aria-hidden': K ? 'false' : 'true',
              },
              H,
            );
          }),
          q(),
        ),
      ),
      e.arrows && Xg(e, r, B),
    ),
    !!e.indicators && Zg(e, r, $, f),
  );
});
Jg.defaultProps = ta;
var OT =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var n = typeof Symbol == 'function' && e[Symbol.iterator];
      if (!n) return e;
      var r = n.call(e),
        i,
        o = [],
        s;
      try {
        for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; )
          o.push(i.value);
      } catch (a) {
        s = {error: a};
      } finally {
        try {
          i && !i.done && (n = r.return) && n.call(r);
        } finally {
          if (s) throw s.error;
        }
      }
      return o;
    },
  RT = function (e) {
    var t = e.split(/ ?; ?/);
    return t.reduce(function (n, r) {
      var i = OT(r.split(/ ?: ?/), 2),
        o = i[0],
        s = i[1];
      return (
        o &&
          s &&
          (n[
            o.replace(/-(\w)/g, function (a, l) {
              return l.toUpperCase();
            })
          ] = Number.isNaN(Number(s)) ? s : Number(s)),
        n
      );
    }, {});
  };
function MT(e) {
  e === void 0 && (e = 6);
  for (
    var t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      n = '',
      r = e;
    r > 0;
    --r
  )
    n += t[Math.round(Math.random() * (t.length - 1))];
  return n;
}
var AT = [
    'br',
    'col',
    'colgroup',
    'dl',
    'hr',
    'iframe',
    'img',
    'input',
    'link',
    'menuitem',
    'meta',
    'ol',
    'param',
    'select',
    'table',
    'tbody',
    'tfoot',
    'thead',
    'tr',
    'ul',
    'wbr',
  ],
  Ph = {
    'accept-charset': 'acceptCharset',
    acceptcharset: 'acceptCharset',
    accesskey: 'accessKey',
    allowfullscreen: 'allowFullScreen',
    autocapitalize: 'autoCapitalize',
    autocomplete: 'autoComplete',
    autocorrect: 'autoCorrect',
    autofocus: 'autoFocus',
    autoplay: 'autoPlay',
    autosave: 'autoSave',
    cellpadding: 'cellPadding',
    cellspacing: 'cellSpacing',
    charset: 'charSet',
    class: 'className',
    classid: 'classID',
    classname: 'className',
    colspan: 'colSpan',
    contenteditable: 'contentEditable',
    contextmenu: 'contextMenu',
    controlslist: 'controlsList',
    crossorigin: 'crossOrigin',
    dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
    datetime: 'dateTime',
    defaultchecked: 'defaultChecked',
    defaultvalue: 'defaultValue',
    enctype: 'encType',
    for: 'htmlFor',
    formmethod: 'formMethod',
    formaction: 'formAction',
    formenctype: 'formEncType',
    formnovalidate: 'formNoValidate',
    formtarget: 'formTarget',
    frameborder: 'frameBorder',
    hreflang: 'hrefLang',
    htmlfor: 'htmlFor',
    httpequiv: 'httpEquiv',
    'http-equiv': 'httpEquiv',
    icon: 'icon',
    innerhtml: 'innerHTML',
    inputmode: 'inputMode',
    itemid: 'itemID',
    itemprop: 'itemProp',
    itemref: 'itemRef',
    itemscope: 'itemScope',
    itemtype: 'itemType',
    keyparams: 'keyParams',
    keytype: 'keyType',
    marginwidth: 'marginWidth',
    marginheight: 'marginHeight',
    maxlength: 'maxLength',
    mediagroup: 'mediaGroup',
    minlength: 'minLength',
    nomodule: 'noModule',
    novalidate: 'noValidate',
    playsinline: 'playsInline',
    radiogroup: 'radioGroup',
    readonly: 'readOnly',
    referrerpolicy: 'referrerPolicy',
    rowspan: 'rowSpan',
    spellcheck: 'spellCheck',
    srcdoc: 'srcDoc',
    srclang: 'srcLang',
    srcset: 'srcSet',
    tabindex: 'tabIndex',
    typemustmatch: 'typeMustMatch',
    usemap: 'useMap',
    accentheight: 'accentHeight',
    'accent-height': 'accentHeight',
    alignmentbaseline: 'alignmentBaseline',
    'alignment-baseline': 'alignmentBaseline',
    allowreorder: 'allowReorder',
    arabicform: 'arabicForm',
    'arabic-form': 'arabicForm',
    attributename: 'attributeName',
    attributetype: 'attributeType',
    autoreverse: 'autoReverse',
    basefrequency: 'baseFrequency',
    baselineshift: 'baselineShift',
    'baseline-shift': 'baselineShift',
    baseprofile: 'baseProfile',
    calcmode: 'calcMode',
    capheight: 'capHeight',
    'cap-height': 'capHeight',
    clippath: 'clipPath',
    'clip-path': 'clipPath',
    clippathunits: 'clipPathUnits',
    cliprule: 'clipRule',
    'clip-rule': 'clipRule',
    colorinterpolation: 'colorInterpolation',
    'color-interpolation': 'colorInterpolation',
    colorinterpolationfilters: 'colorInterpolationFilters',
    'color-interpolation-filters': 'colorInterpolationFilters',
    colorprofile: 'colorProfile',
    'color-profile': 'colorProfile',
    colorrendering: 'colorRendering',
    'color-rendering': 'colorRendering',
    contentscripttype: 'contentScriptType',
    contentstyletype: 'contentStyleType',
    diffuseconstant: 'diffuseConstant',
    dominantbaseline: 'dominantBaseline',
    'dominant-baseline': 'dominantBaseline',
    edgemode: 'edgeMode',
    enablebackground: 'enableBackground',
    'enable-background': 'enableBackground',
    externalresourcesrequired: 'externalResourcesRequired',
    fillopacity: 'fillOpacity',
    'fill-opacity': 'fillOpacity',
    fillrule: 'fillRule',
    'fill-rule': 'fillRule',
    filterres: 'filterRes',
    filterunits: 'filterUnits',
    floodopacity: 'floodOpacity',
    'flood-opacity': 'floodOpacity',
    floodcolor: 'floodColor',
    'flood-color': 'floodColor',
    fontfamily: 'fontFamily',
    'font-family': 'fontFamily',
    fontsize: 'fontSize',
    'font-size': 'fontSize',
    fontsizeadjust: 'fontSizeAdjust',
    'font-size-adjust': 'fontSizeAdjust',
    fontstretch: 'fontStretch',
    'font-stretch': 'fontStretch',
    fontstyle: 'fontStyle',
    'font-style': 'fontStyle',
    fontvariant: 'fontVariant',
    'font-variant': 'fontVariant',
    fontweight: 'fontWeight',
    'font-weight': 'fontWeight',
    glyphname: 'glyphName',
    'glyph-name': 'glyphName',
    glyphorientationhorizontal: 'glyphOrientationHorizontal',
    'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
    glyphorientationvertical: 'glyphOrientationVertical',
    'glyph-orientation-vertical': 'glyphOrientationVertical',
    glyphref: 'glyphRef',
    gradienttransform: 'gradientTransform',
    gradientunits: 'gradientUnits',
    horizadvx: 'horizAdvX',
    'horiz-adv-x': 'horizAdvX',
    horizoriginx: 'horizOriginX',
    'horiz-origin-x': 'horizOriginX',
    imagerendering: 'imageRendering',
    'image-rendering': 'imageRendering',
    kernelmatrix: 'kernelMatrix',
    kernelunitlength: 'kernelUnitLength',
    keypoints: 'keyPoints',
    keysplines: 'keySplines',
    keytimes: 'keyTimes',
    lengthadjust: 'lengthAdjust',
    letterspacing: 'letterSpacing',
    'letter-spacing': 'letterSpacing',
    lightingcolor: 'lightingColor',
    'lighting-color': 'lightingColor',
    limitingconeangle: 'limitingConeAngle',
    markerend: 'markerEnd',
    'marker-end': 'markerEnd',
    markerheight: 'markerHeight',
    markermid: 'markerMid',
    'marker-mid': 'markerMid',
    markerstart: 'markerStart',
    'marker-start': 'markerStart',
    markerunits: 'markerUnits',
    markerwidth: 'markerWidth',
    maskcontentunits: 'maskContentUnits',
    maskunits: 'maskUnits',
    numoctaves: 'numOctaves',
    overlineposition: 'overlinePosition',
    'overline-position': 'overlinePosition',
    overlinethickness: 'overlineThickness',
    'overline-thickness': 'overlineThickness',
    paintorder: 'paintOrder',
    'paint-order': 'paintOrder',
    'panose-1': 'panose1',
    pathlength: 'pathLength',
    patterncontentunits: 'patternContentUnits',
    patterntransform: 'patternTransform',
    patternunits: 'patternUnits',
    pointerevents: 'pointerEvents',
    'pointer-events': 'pointerEvents',
    pointsatx: 'pointsAtX',
    pointsaty: 'pointsAtY',
    pointsatz: 'pointsAtZ',
    preservealpha: 'preserveAlpha',
    preserveaspectratio: 'preserveAspectRatio',
    primitiveunits: 'primitiveUnits',
    refx: 'refX',
    refy: 'refY',
    renderingintent: 'renderingIntent',
    'rendering-intent': 'renderingIntent',
    repeatcount: 'repeatCount',
    repeatdur: 'repeatDur',
    requiredextensions: 'requiredExtensions',
    requiredfeatures: 'requiredFeatures',
    shaperendering: 'shapeRendering',
    'shape-rendering': 'shapeRendering',
    specularconstant: 'specularConstant',
    specularexponent: 'specularExponent',
    spreadmethod: 'spreadMethod',
    startoffset: 'startOffset',
    stddeviation: 'stdDeviation',
    stitchtiles: 'stitchTiles',
    stopcolor: 'stopColor',
    'stop-color': 'stopColor',
    stopopacity: 'stopOpacity',
    'stop-opacity': 'stopOpacity',
    strikethroughposition: 'strikethroughPosition',
    'strikethrough-position': 'strikethroughPosition',
    strikethroughthickness: 'strikethroughThickness',
    'strikethrough-thickness': 'strikethroughThickness',
    strokedasharray: 'strokeDasharray',
    'stroke-dasharray': 'strokeDasharray',
    strokedashoffset: 'strokeDashoffset',
    'stroke-dashoffset': 'strokeDashoffset',
    strokelinecap: 'strokeLinecap',
    'stroke-linecap': 'strokeLinecap',
    strokelinejoin: 'strokeLinejoin',
    'stroke-linejoin': 'strokeLinejoin',
    strokemiterlimit: 'strokeMiterlimit',
    'stroke-miterlimit': 'strokeMiterlimit',
    strokewidth: 'strokeWidth',
    'stroke-width': 'strokeWidth',
    strokeopacity: 'strokeOpacity',
    'stroke-opacity': 'strokeOpacity',
    suppresscontenteditablewarning: 'suppressContentEditableWarning',
    suppresshydrationwarning: 'suppressHydrationWarning',
    surfacescale: 'surfaceScale',
    systemlanguage: 'systemLanguage',
    tablevalues: 'tableValues',
    targetx: 'targetX',
    targety: 'targetY',
    textanchor: 'textAnchor',
    'text-anchor': 'textAnchor',
    textdecoration: 'textDecoration',
    'text-decoration': 'textDecoration',
    textlength: 'textLength',
    textrendering: 'textRendering',
    'text-rendering': 'textRendering',
    underlineposition: 'underlinePosition',
    'underline-position': 'underlinePosition',
    underlinethickness: 'underlineThickness',
    'underline-thickness': 'underlineThickness',
    unicodebidi: 'unicodeBidi',
    'unicode-bidi': 'unicodeBidi',
    unicoderange: 'unicodeRange',
    'unicode-range': 'unicodeRange',
    unitsperem: 'unitsPerEm',
    'units-per-em': 'unitsPerEm',
    unselectable: 'unselectable',
    valphabetic: 'vAlphabetic',
    'v-alphabetic': 'vAlphabetic',
    vectoreffect: 'vectorEffect',
    'vector-effect': 'vectorEffect',
    vertadvy: 'vertAdvY',
    'vert-adv-y': 'vertAdvY',
    vertoriginx: 'vertOriginX',
    'vert-origin-x': 'vertOriginX',
    vertoriginy: 'vertOriginY',
    'vert-origin-y': 'vertOriginY',
    vhanging: 'vHanging',
    'v-hanging': 'vHanging',
    videographic: 'vIdeographic',
    'v-ideographic': 'vIdeographic',
    viewbox: 'viewBox',
    viewtarget: 'viewTarget',
    vmathematical: 'vMathematical',
    'v-mathematical': 'vMathematical',
    wordspacing: 'wordSpacing',
    'word-spacing': 'wordSpacing',
    writingmode: 'writingMode',
    'writing-mode': 'writingMode',
    xchannelselector: 'xChannelSelector',
    xheight: 'xHeight',
    'x-height': 'xHeight',
    xlinkactuate: 'xlinkActuate',
    'xlink:actuate': 'xlinkActuate',
    xlinkarcrole: 'xlinkArcrole',
    'xlink:arcrole': 'xlinkArcrole',
    xlinkhref: 'xlinkHref',
    'xlink:href': 'xlinkHref',
    xlinkrole: 'xlinkRole',
    'xlink:role': 'xlinkRole',
    xlinkshow: 'xlinkShow',
    'xlink:show': 'xlinkShow',
    xlinktitle: 'xlinkTitle',
    'xlink:title': 'xlinkTitle',
    xlinktype: 'xlinkType',
    'xlink:type': 'xlinkType',
    xmlbase: 'xmlBase',
    'xml:base': 'xmlBase',
    xmllang: 'xmlLang',
    'xml:lang': 'xmlLang',
    'xml:space': 'xmlSpace',
    xmlnsxlink: 'xmlnsXlink',
    'xmlns:xlink': 'xmlnsXlink',
    xmlspace: 'xmlSpace',
    ychannelselector: 'yChannelSelector',
    zoomandpan: 'zoomAndPan',
    onblur: 'onBlur',
    onchange: 'onChange',
    onclick: 'onClick',
    oncontextmenu: 'onContextMenu',
    ondoubleclick: 'onDoubleClick',
    ondrag: 'onDrag',
    ondragend: 'onDragEnd',
    ondragenter: 'onDragEnter',
    ondragexit: 'onDragExit',
    ondragleave: 'onDragLeave',
    ondragover: 'onDragOver',
    ondragstart: 'onDragStart',
    ondrop: 'onDrop',
    onerror: 'onError',
    onfocus: 'onFocus',
    oninput: 'onInput',
    oninvalid: 'onInvalid',
    onkeydown: 'onKeyDown',
    onkeypress: 'onKeyPress',
    onkeyup: 'onKeyUp',
    onload: 'onLoad',
    onmousedown: 'onMouseDown',
    onmouseenter: 'onMouseEnter',
    onmouseleave: 'onMouseLeave',
    onmousemove: 'onMouseMove',
    onmouseout: 'onMouseOut',
    onmouseover: 'onMouseOver',
    onmouseup: 'onMouseUp',
    onscroll: 'onScroll',
    onsubmit: 'onSubmit',
    ontouchcancel: 'onTouchCancel',
    ontouchend: 'onTouchEnd',
    ontouchmove: 'onTouchMove',
    ontouchstart: 'onTouchStart',
    onwheel: 'onWheel',
  },
  Ss =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Ss =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            }
            return e;
          }),
        Ss.apply(this, arguments)
      );
    },
  ey =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var n = typeof Symbol == 'function' && e[Symbol.iterator];
      if (!n) return e;
      var r = n.call(e),
        i,
        o = [],
        s;
      try {
        for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; )
          o.push(i.value);
      } catch (a) {
        s = {error: a};
      } finally {
        try {
          i && !i.done && (n = r.return) && n.call(r);
        } finally {
          if (s) throw s.error;
        }
      }
      return o;
    },
  ty =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t, n) {
      if (n || arguments.length === 2)
        for (var r = 0, i = t.length, o; r < i; r++)
          (o || !(r in t)) &&
            (o || (o = Array.prototype.slice.call(t, 0, r)), (o[r] = t[r]));
      return e.concat(o || Array.prototype.slice.call(t));
    };
function LT(e, t) {
  var n = {key: t};
  if (e instanceof Element) {
    var r = e.getAttribute('class');
    r && (n.className = r),
      ty([], ey(e.attributes), !1).forEach(function (i) {
        switch (i.name) {
          case 'class':
            break;
          case 'style':
            n[i.name] = RT(i.value);
            break;
          case 'allowfullscreen':
          case 'allowpaymentrequest':
          case 'async':
          case 'autofocus':
          case 'autoplay':
          case 'checked':
          case 'controls':
          case 'default':
          case 'defer':
          case 'disabled':
          case 'formnovalidate':
          case 'hidden':
          case 'ismap':
          case 'itemscope':
          case 'loop':
          case 'multiple':
          case 'muted':
          case 'nomodule':
          case 'novalidate':
          case 'open':
          case 'readonly':
          case 'required':
          case 'reversed':
          case 'selected':
          case 'typemustmatch':
            n[Ph[i.name] || i.name] = !0;
            break;
          default:
            n[Ph[i.name] || i.name] = i.value;
        }
      });
  }
  return n;
}
function NT(e, t, n) {
  var r = ty([], ey(e), !1)
    .map(function (i, o) {
      return jc(i, Ss(Ss({}, n), {index: o, level: t + 1}));
    })
    .filter(Boolean);
  return r.length ? r : null;
}
function jT(e) {
  return /[a-z]+[A-Z]+[a-z]+/.test(e) ? e : e.toLowerCase();
}
function jc(e, t) {
  var n;
  if ((t === void 0 && (t = {}), !e || !(e instanceof Node))) return null;
  var r = t.actions,
    i = r === void 0 ? [] : r,
    o = t.index,
    s = o === void 0 ? 0 : o,
    a = t.level,
    l = a === void 0 ? 0 : a,
    u = t.randomKey,
    c = e,
    f = ''.concat(l, '-').concat(s),
    d = [];
  if (
    (u && l === 0 && (f = ''.concat(MT(), '-').concat(f)),
    Array.isArray(i) &&
      i.forEach(function (y) {
        y.condition(c, f, l) &&
          (typeof y.pre == 'function' &&
            ((c = y.pre(c, f, l)), c instanceof Node || (c = e)),
          typeof y.post == 'function' && d.push(y.post(c, f, l)));
      }),
    d.length)
  )
    return d;
  switch (c.nodeType) {
    case 1:
      return S.createElement(jT(c.nodeName), LT(c, f), NT(c.childNodes, l, t));
    case 3: {
      var h =
        ((n = c.nodeValue) === null || n === void 0 ? void 0 : n.toString()) ||
        '';
      if (/^\s+$/.test(h) && !/[\u00A0\u202F]/.test(h)) return null;
      if (!c.parentNode) return h;
      var v = c.parentNode.nodeName.toLowerCase();
      return AT.includes(v)
        ? (/\S/.test(h) &&
            console.warn(
              "A textNode is not allowed inside '"
                .concat(v, `'. Your text "`)
                .concat(h, '" will be ignored'),
            ),
          null)
        : h;
    }
    case 8:
      return null;
    default:
      return null;
  }
}
function DT(e, t) {
  if ((t === void 0 && (t = {}), !e || typeof e != 'string')) return null;
  var n = t.nodeOnly,
    r = n === void 0 ? !1 : n,
    i = t.selector,
    o = i === void 0 ? 'body > *' : i,
    s = t.type,
    a = s === void 0 ? 'text/html' : s;
  try {
    var l = new DOMParser(),
      u = l.parseFromString(e, a),
      c = u.querySelector(o);
    if (!(c instanceof Node)) throw new TypeError('Error parsing input');
    return r ? c : jc(c, t);
  } catch {}
  return null;
}
function ny(e, t) {
  return (
    t === void 0 && (t = {}),
    typeof e == 'string' ? DT(e, t) : e instanceof Node ? jc(e, t) : null
  );
}
var IT = Object.defineProperty,
  VT = (e, t, n) =>
    t in e
      ? IT(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n})
      : (e[t] = n),
  Eo = (e, t, n) => (VT(e, typeof t != 'symbol' ? t + '' : t, n), n),
  Th = 'react-inlinesvg',
  Ch = 10,
  Y = {
    IDLE: 'idle',
    LOADING: 'loading',
    LOADED: 'loaded',
    FAILED: 'failed',
    READY: 'ready',
    UNSUPPORTED: 'unsupported',
  };
function zo() {
  return !!(
    typeof window < 'u' &&
    window.document &&
    window.document.createElement
  );
}
function zT() {
  return BT() && typeof window < 'u' && window !== null;
}
async function ry(e, t) {
  const n = await fetch(e, t),
    r = n.headers.get('content-type'),
    [i] = (r ?? '').split(/ ?; ?/);
  if (n.status > 299) throw new Error('Not found');
  if (!['image/svg+xml', 'text/plain'].some(o => i.includes(o)))
    throw new Error(`Content type isn't valid: ${i}`);
  return n.text();
}
function FT(e = 1) {
  return new Promise(t => {
    setTimeout(t, e * 1e3);
  });
}
function BT() {
  if (!document) return !1;
  const e = document.createElement('div');
  e.innerHTML = '<svg />';
  const t = e.firstChild;
  return !!t && t.namespaceURI === 'http://www.w3.org/2000/svg';
}
function UT(e) {
  return e[Math.floor(Math.random() * e.length)];
}
function $T(e) {
  const t = 'abcdefghijklmnopqrstuvwxyz',
    n = '1234567890',
    r = `${t}${t.toUpperCase()}${n}`;
  let i = '';
  for (let o = 0; o < e; o++) i += UT(r);
  return i;
}
function HT(e, ...t) {
  const n = {};
  for (const r in e)
    ({}).hasOwnProperty.call(e, r) && (t.includes(r) || (n[r] = e[r]));
  return n;
}
var WT = class {
  constructor() {
    Eo(this, 'cacheApi'),
      Eo(this, 'cacheStore'),
      Eo(this, 'subscribers', []),
      Eo(this, 'isReady', !1),
      (this.cacheStore = new Map());
    let e = Th,
      t = !1;
    zo() &&
      ((e = window.REACT_INLINESVG_CACHE_NAME ?? Th),
      (t = !!window.REACT_INLINESVG_PERSISTENT_CACHE && 'caches' in window)),
      t
        ? caches
            .open(e)
            .then(n => {
              (this.cacheApi = n),
                (this.isReady = !0),
                this.subscribers.forEach(r => r());
            })
            .catch(n => {
              (this.isReady = !0),
                console.error(`Failed to open cache: ${n.message}`);
            })
        : (this.isReady = !0);
  }
  onReady(e) {
    this.isReady ? e() : this.subscribers.push(e);
  }
  async get(e, t) {
    var n;
    return (
      await (this.cacheApi
        ? this.fetchAndAddToPersistentCache(e, t)
        : this.fetchAndAddToInternalCache(e, t)),
      ((n = this.cacheStore.get(e)) == null ? void 0 : n.content) ?? ''
    );
  }
  set(e, t) {
    this.cacheStore.set(e, t);
  }
  isCached(e) {
    var t;
    return (
      ((t = this.cacheStore.get(e)) == null ? void 0 : t.status) === Y.LOADED
    );
  }
  async fetchAndAddToInternalCache(e, t) {
    const n = this.cacheStore.get(e);
    if ((n == null ? void 0 : n.status) === Y.LOADING) {
      await this.handleLoading(e, async () => {
        this.cacheStore.set(e, {content: '', status: Y.IDLE}),
          await this.fetchAndAddToInternalCache(e, t);
      });
      return;
    }
    if (!(n != null && n.content)) {
      this.cacheStore.set(e, {content: '', status: Y.LOADING});
      try {
        const r = await ry(e, t);
        this.cacheStore.set(e, {content: r, status: Y.LOADED});
      } catch (r) {
        throw (this.cacheStore.set(e, {content: '', status: Y.FAILED}), r);
      }
    }
  }
  async fetchAndAddToPersistentCache(e, t) {
    var i, o, s;
    const n = this.cacheStore.get(e);
    if ((n == null ? void 0 : n.status) === Y.LOADED) return;
    if ((n == null ? void 0 : n.status) === Y.LOADING) {
      await this.handleLoading(e, async () => {
        this.cacheStore.set(e, {content: '', status: Y.IDLE}),
          await this.fetchAndAddToPersistentCache(e, t);
      });
      return;
    }
    this.cacheStore.set(e, {content: '', status: Y.LOADING});
    const r = await ((i = this.cacheApi) == null ? void 0 : i.match(e));
    if (r) {
      const a = await r.text();
      this.cacheStore.set(e, {content: a, status: Y.LOADED});
      return;
    }
    try {
      await ((o = this.cacheApi) == null ? void 0 : o.add(new Request(e, t)));
      const a = await ((s = this.cacheApi) == null ? void 0 : s.match(e)),
        l = (await (a == null ? void 0 : a.text())) ?? '';
      this.cacheStore.set(e, {content: l, status: Y.LOADED});
    } catch (a) {
      throw (this.cacheStore.set(e, {content: '', status: Y.FAILED}), a);
    }
  }
  async handleLoading(e, t) {
    var r;
    let n = 0;
    for (
      ;
      ((r = this.cacheStore.get(e)) == null ? void 0 : r.status) ===
        Y.LOADING && n < Ch;

    )
      await FT(0.1), (n += 1);
    n >= Ch && (await t());
  }
  keys() {
    return [...this.cacheStore.keys()];
  }
  data() {
    return [...this.cacheStore.entries()].map(([e, t]) => ({[e]: t}));
  }
  async delete(e) {
    this.cacheApi && (await this.cacheApi.delete(e)), this.cacheStore.delete(e);
  }
  async clear() {
    if (this.cacheApi) {
      const e = await this.cacheApi.keys();
      for (const t of e) await this.cacheApi.delete(t);
    }
    this.cacheStore.clear();
  }
};
function _h(e) {
  const t = S.useRef();
  return (
    S.useEffect(() => {
      t.current = e;
    }),
    t.current
  );
}
function GT(e) {
  const {
    baseURL: t,
    content: n,
    description: r,
    handleError: i,
    hash: o,
    preProcessor: s,
    title: a,
    uniquifyIDs: l = !1,
  } = e;
  try {
    const u = QT(n, s),
      c = ny(u, {nodeOnly: !0});
    if (!c || !(c instanceof SVGSVGElement))
      throw new Error('Could not convert the src to a DOM Node');
    const f = iy(c, {baseURL: t, hash: o, uniquifyIDs: l});
    if (r) {
      const d = f.querySelector('desc');
      d != null && d.parentNode && d.parentNode.removeChild(d);
      const h = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
      (h.innerHTML = r), f.prepend(h);
    }
    if (typeof a < 'u') {
      const d = f.querySelector('title');
      if ((d != null && d.parentNode && d.parentNode.removeChild(d), a)) {
        const h = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'title',
        );
        (h.innerHTML = a), f.prepend(h);
      }
    }
    return f;
  } catch (u) {
    return i(u);
  }
}
function QT(e, t) {
  return t ? t(e) : e;
}
function iy(e, t) {
  const {baseURL: n = '', hash: r, uniquifyIDs: i} = t,
    o = ['id', 'href', 'xlink:href', 'xlink:role', 'xlink:arcrole'],
    s = ['href', 'xlink:href'],
    a = (l, u) => s.includes(l) && (u ? !u.includes('#') : !1);
  return (
    i &&
      [...e.children].forEach(l => {
        var u;
        if ((u = l.attributes) != null && u.length) {
          const c = Object.values(l.attributes).map(f => {
            const d = f,
              h = /url\((.*?)\)/.exec(f.value);
            return (
              h != null &&
                h[1] &&
                (d.value = f.value.replace(h[0], `url(${n}${h[1]}__${r})`)),
              d
            );
          });
          o.forEach(f => {
            const d = c.find(h => h.name === f);
            d && !a(f, d.value) && (d.value = `${d.value}__${r}`);
          });
        }
        return l.children.length ? iy(l, t) : l;
      }),
    e
  );
}
var ar;
function KT(e) {
  const {
      cacheRequests: t = !0,
      children: n = null,
      description: r,
      fetchOptions: i,
      innerRef: o,
      loader: s = null,
      onError: a,
      onLoad: l,
      src: u,
      title: c,
      uniqueHash: f,
    } = e,
    [d, h] = S.useReducer((j, A) => ({...j, ...A}), {
      content: '',
      element: null,
      isCached: t && ar.isCached(e.src),
      status: Y.IDLE,
    }),
    {content: v, element: y, isCached: x, status: m} = d,
    p = _h(e),
    g = _h(d),
    w = S.useRef(f ?? $T(8)),
    E = S.useRef(!1),
    T = S.useRef(!1),
    P = S.useCallback(
      j => {
        E.current &&
          (h({
            status:
              j.message === 'Browser does not support SVG'
                ? Y.UNSUPPORTED
                : Y.FAILED,
          }),
          a == null || a(j));
      },
      [a],
    ),
    k = S.useCallback((j, A = !1) => {
      E.current && h({content: j, isCached: A, status: Y.LOADED});
    }, []),
    b = S.useCallback(async () => {
      const j = await ry(u, i);
      k(j);
    }, [i, k, u]),
    C = S.useCallback(() => {
      try {
        const j = GT({...e, handleError: P, hash: w.current, content: v}),
          A = ny(j);
        if (!A || !S.isValidElement(A))
          throw new Error('Could not convert the src to a React element');
        h({element: A, status: Y.READY});
      } catch (j) {
        P(new Error(j.message));
      }
    }, [v, P, e]),
    M = S.useCallback(async () => {
      const j = /^data:image\/svg[^,]*?(;base64)?,(.*)/u.exec(u);
      let A;
      if (
        (j
          ? (A = j[1] ? window.atob(j[2]) : decodeURIComponent(j[2]))
          : u.includes('<svg') && (A = u),
        A)
      ) {
        k(A);
        return;
      }
      try {
        if (t) {
          const $ = await ar.get(u, i);
          k($, !0);
        } else await b();
      } catch ($) {
        P($);
      }
    }, [t, b, i, P, k, u]),
    V = S.useCallback(async () => {
      E.current &&
        h({content: '', element: null, isCached: !1, status: Y.LOADING});
    }, []);
  S.useEffect(() => {
    if (((E.current = !0), !zo() || T.current)) return () => {};
    try {
      if (m === Y.IDLE) {
        if (!zT()) throw new Error('Browser does not support SVG');
        if (!u) throw new Error('Missing src');
        V();
      }
    } catch (j) {
      P(j);
    }
    return (
      (T.current = !0),
      () => {
        E.current = !1;
      }
    );
  }, []),
    S.useEffect(() => {
      if (zo() && p)
        if (p.src !== u) {
          if (!u) {
            P(new Error('Missing src'));
            return;
          }
          V();
        } else (p.title !== c || p.description !== r) && C();
    }, [r, C, P, V, p, u, c]),
    S.useEffect(() => {
      g &&
        (g.status !== Y.LOADING && m === Y.LOADING && M(),
        g.status !== Y.LOADED && m === Y.LOADED && C(),
        g.status !== Y.READY && m === Y.READY && (l == null || l(u, x)));
    }, [M, C, x, l, g, u, m]);
  const F = HT(
    e,
    'baseURL',
    'cacheRequests',
    'children',
    'description',
    'fetchOptions',
    'innerRef',
    'loader',
    'onError',
    'onLoad',
    'preProcessor',
    'src',
    'title',
    'uniqueHash',
    'uniquifyIDs',
  );
  return zo()
    ? y
      ? S.cloneElement(y, {ref: o, ...F})
      : [Y.UNSUPPORTED, Y.FAILED].includes(m)
      ? n
      : s
    : s;
}
function qT(e) {
  ar || (ar = new WT());
  const {loader: t} = e,
    n = S.useRef(!1),
    [r, i] = S.useState(ar.isReady);
  return (
    S.useEffect(() => {
      n.current ||
        (ar.onReady(() => {
          i(!0);
        }),
        (n.current = !0));
    }, []),
    r ? _.jsx(KT, {...e}) : t
  );
}
var oy = {exports: {}};
(function (e, t) {
  (function (n, r) {
    e.exports = r(S, Wi);
  })(typeof self < 'u' ? self : Br, function (n, r) {
    return (function (i) {
      var o = {};
      function s(a) {
        if (o[a]) return o[a].exports;
        var l = (o[a] = {i: a, l: !1, exports: {}});
        return i[a].call(l.exports, l, l.exports, s), (l.l = !0), l.exports;
      }
      return (
        (s.m = i),
        (s.c = o),
        (s.d = function (a, l, u) {
          s.o(a, l) || Object.defineProperty(a, l, {enumerable: !0, get: u});
        }),
        (s.r = function (a) {
          typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(a, Symbol.toStringTag, {value: 'Module'}),
            Object.defineProperty(a, '__esModule', {value: !0});
        }),
        (s.t = function (a, l) {
          if (
            (1 & l && (a = s(a)),
            8 & l || (4 & l && typeof a == 'object' && a && a.__esModule))
          )
            return a;
          var u = Object.create(null);
          if (
            (s.r(u),
            Object.defineProperty(u, 'default', {enumerable: !0, value: a}),
            2 & l && typeof a != 'string')
          )
            for (var c in a)
              s.d(
                u,
                c,
                function (f) {
                  return a[f];
                }.bind(null, c),
              );
          return u;
        }),
        (s.n = function (a) {
          var l =
            a && a.__esModule
              ? function () {
                  return a.default;
                }
              : function () {
                  return a;
                };
          return s.d(l, 'a', l), l;
        }),
        (s.o = function (a, l) {
          return Object.prototype.hasOwnProperty.call(a, l);
        }),
        (s.p = ''),
        s((s.s = 3))
      );
    })([
      function (i, o) {
        i.exports = n;
      },
      function (i, o) {
        i.exports = r;
      },
      function (i, o) {
        if (
          ((o = i.exports =
            function (a) {
              a || (a = {}),
                typeof a == 'string' && (a = {cookie: a}),
                a.cookie === void 0 && (a.cookie = '');
              var l = {
                get: function (u) {
                  for (
                    var c = a.cookie.split(/;\s*/), f = 0;
                    f < c.length;
                    f++
                  ) {
                    var d = c[f].split('=');
                    if (unescape(d[0]) === u) return unescape(d[1]);
                  }
                },
                set: function (u, c, f) {
                  f || (f = {});
                  var d = escape(u) + '=' + escape(c);
                  return (
                    f.expires && (d += '; expires=' + f.expires),
                    f.path && (d += '; path=' + escape(f.path)),
                    (a.cookie = d)
                  );
                },
              };
              return l;
            }),
          typeof document < 'u')
        ) {
          var s = o(document);
          (o.get = s.get), (o.set = s.set);
        }
      },
      function (i, o, s) {
        s.r(o);
        var a = s(0),
          l = s.n(a),
          u = s(1),
          c = s.n(u);
        s(4);
        function f(T) {
          return (f =
            typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
              ? function (P) {
                  return typeof P;
                }
              : function (P) {
                  return P &&
                    typeof Symbol == 'function' &&
                    P.constructor === Symbol &&
                    P !== Symbol.prototype
                    ? 'symbol'
                    : typeof P;
                })(T);
        }
        function d(T, P) {
          for (var k = 0; k < P.length; k++) {
            var b = P[k];
            (b.enumerable = b.enumerable || !1),
              (b.configurable = !0),
              'value' in b && (b.writable = !0),
              Object.defineProperty(T, b.key, b);
          }
        }
        function h(T) {
          return (h = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (P) {
                return P.__proto__ || Object.getPrototypeOf(P);
              })(T);
        }
        function v(T, P) {
          return (v =
            Object.setPrototypeOf ||
            function (k, b) {
              return (k.__proto__ = b), k;
            })(T, P);
        }
        function y(T) {
          if (T === void 0)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            );
          return T;
        }
        function x(T, P, k) {
          return (
            P in T
              ? Object.defineProperty(T, P, {
                  value: k,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (T[P] = k),
            T
          );
        }
        var m,
          p,
          g = typeof window < 'u',
          w = function (T) {
            var P = new Date();
            return P.setDate(P.getDate() + T), P.toUTCString();
          },
          E = (function (T) {
            function P(C) {
              var M, V, F;
              return (
                (function (j, A) {
                  if (!(j instanceof A))
                    throw new TypeError('Cannot call a class as a function');
                })(this, P),
                (V = this),
                (F = h(P).call(this, C)),
                x(
                  y(
                    y(
                      (M =
                        !F || (f(F) !== 'object' && typeof F != 'function')
                          ? y(V)
                          : F),
                    ),
                  ),
                  'hide',
                  function () {
                    g &&
                      window.document
                        .querySelector('html')
                        .classList.remove('smartbanner-show');
                  },
                ),
                x(y(y(M)), 'show', function () {
                  g &&
                    window.document
                      .querySelector('html')
                      .classList.add('smartbanner-show');
                }),
                x(y(y(M)), 'close', function () {
                  M.hide(),
                    p.set('smartbanner-closed', 'true', {
                      path: '/',
                      expires: w(M.props.daysHidden),
                    }),
                    M.props.onClose &&
                      typeof M.props.onClose == 'function' &&
                      M.props.onClose();
                }),
                x(y(y(M)), 'install', function () {
                  M.hide(),
                    p.set('smartbanner-installed', 'true', {
                      path: '/',
                      expires: w(M.props.daysReminder),
                    }),
                    M.props.onInstall &&
                      typeof M.props.onInstall == 'function' &&
                      M.props.onInstall();
                }),
                (m = s(5)),
                (p = s(2)),
                (M.state = {type: '', appId: '', settings: {}}),
                M
              );
            }
            var k, b;
            return (
              (function (C, M) {
                if (typeof M != 'function' && M !== null)
                  throw new TypeError(
                    'Super expression must either be null or a function',
                  );
                (C.prototype = Object.create(M && M.prototype, {
                  constructor: {value: C, writable: !0, configurable: !0},
                })),
                  M && v(C, M);
              })(P, a.Component),
              (k = P),
              (b = [
                {
                  key: 'UNSAFE_componentWillMount',
                  value: function () {
                    this.setType(this.props.force);
                  },
                },
                {
                  key: 'UNSAFE_componentWillReceiveProps',
                  value: function (C) {
                    C.force !== this.props.force && this.setType(C.force),
                      C.position === 'top'
                        ? (window.document
                            .querySelector('html')
                            .classList.add('smartbanner-margin-top'),
                          window.document
                            .querySelector('html')
                            .classList.remove('smartbanner-margin-bottom'))
                        : C.position === 'bottom' &&
                          (window.document
                            .querySelector('html')
                            .classList.add('smartbanner-margin-bottom'),
                          window.document
                            .querySelector('html')
                            .classList.remove('smartbanner-margin-top'));
                  },
                },
                {
                  key: 'componentWillUnmount',
                  value: function () {
                    var C = window.document.querySelector('html');
                    C.classList.remove('smartbanner-show'),
                      C.classList.remove('smartbanner-margin-top'),
                      C.classList.remove('smartbanner-margin-bottom');
                  },
                },
                {
                  key: 'setType',
                  value: function (C) {
                    var M,
                      V = this;
                    if (g) {
                      var F = m(window.navigator.userAgent);
                      C
                        ? (M = C)
                        : F.os.name === 'Windows Phone' ||
                          F.os.name === 'Windows Mobile'
                        ? (M = 'windows')
                        : F.os.name === 'iOS' &&
                          (this.props.ignoreIosVersion ||
                            parseInt(F.os.version, 10) < 6 ||
                            F.browser.name !== 'Mobile Safari')
                        ? (M = 'ios')
                        : F.device.vender === 'Amazon' ||
                          F.browser.name === 'Silk'
                        ? (M = 'kindle')
                        : F.os.name === 'Android' && (M = 'android');
                    }
                    this.setState({type: M}, function () {
                      M && V.setSettingsByType();
                    });
                  },
                },
                {
                  key: 'setSettingsByType',
                  value: function () {
                    var C = this,
                      M = {
                        ios: {
                          appMeta: function () {
                            return C.props.appMeta.ios;
                          },
                          iconRels: [
                            'apple-touch-icon-precomposed',
                            'apple-touch-icon',
                          ],
                          getStoreLink: function () {
                            return 'https://itunes.apple.com/'.concat(
                              C.props.appStoreLanguage,
                              '/app/id',
                            );
                          },
                        },
                        android: {
                          appMeta: function () {
                            return C.props.appMeta.android;
                          },
                          iconRels: [
                            'android-touch-icon',
                            'apple-touch-icon-precomposed',
                            'apple-touch-icon',
                          ],
                          getStoreLink: function () {
                            return 'http://play.google.com/store/apps/details?id=';
                          },
                        },
                        windows: {
                          appMeta: function () {
                            return C.props.appMeta.windows;
                          },
                          iconRels: [
                            'windows-touch-icon',
                            'apple-touch-icon-precomposed',
                            'apple-touch-icon',
                          ],
                          getStoreLink: function () {
                            return 'http://www.windowsphone.com/s?appid=';
                          },
                        },
                        kindle: {
                          appMeta: function () {
                            return C.props.appMeta.kindle;
                          },
                          iconRels: [
                            'windows-touch-icon',
                            'apple-touch-icon-precomposed',
                            'apple-touch-icon',
                          ],
                          getStoreLink: function () {
                            return 'amzn://apps/android?asin=';
                          },
                        },
                      };
                    this.setState(
                      function (V) {
                        return {settings: M[V.type]};
                      },
                      function () {
                        C.state.type && C.parseAppId();
                      },
                    );
                  },
                },
                {
                  key: 'parseAppId',
                  value: function () {
                    if (!g) return '';
                    var C = window.document.querySelector(
                      'meta[name="'.concat(this.state.settings.appMeta(), '"]'),
                    );
                    if (!C) return '';
                    var M = '';
                    if (this.state.type === 'windows')
                      M = C.getAttribute('content');
                    else {
                      var V = /app-id=([^\s,]+)/.exec(
                        C.getAttribute('content'),
                      );
                      M = V && V[1] ? V[1] : M;
                    }
                    return this.setState({appId: M}), M;
                  },
                },
                {
                  key: 'retrieveInfo',
                  value: function () {
                    var C,
                      M =
                        ''.concat(this.props.url[this.state.type]) ||
                        this.state.settings.getStoreLink() + this.state.appId,
                      V = `
      `
                        .concat(this.props.price[this.state.type], ' - ')
                        .concat(this.props.storeText[this.state.type]);
                    if (g)
                      for (
                        var F = 0, j = this.state.settings.iconRels.length;
                        F < j;
                        F++
                      ) {
                        var A = window.document.querySelector(
                          'link[rel="'.concat(
                            this.state.settings.iconRels[F],
                            '"]',
                          ),
                        );
                        if (A) {
                          C = A.getAttribute('href');
                          break;
                        }
                      }
                    return {icon: C, link: M, inStore: V};
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    if (
                      !g ||
                      !this.state.type ||
                      window.navigator.standalone ||
                      p.get('smartbanner-closed') ||
                      p.get('smartbanner-installed') ||
                      !this.state.appId
                    )
                      return l.a.createElement('div', null);
                    this.show();
                    var C = this.retrieveInfo(),
                      M = C.icon,
                      V = C.link,
                      F = C.inStore,
                      j = 'smartbanner smartbanner-'
                        .concat(this.state.type, ' smartbanner-')
                        .concat(this.props.position),
                      A = {backgroundImage: 'url('.concat(M, ')')};
                    return l.a.createElement(
                      'div',
                      {className: j},
                      l.a.createElement(
                        'div',
                        {className: 'smartbanner-container'},
                        l.a.createElement(
                          'button',
                          {
                            type: 'button',
                            className: 'smartbanner-close',
                            'aria-label': 'close',
                            onClick: this.close,
                          },
                          '×',
                        ),
                        l.a.createElement('span', {
                          className: 'smartbanner-icon',
                          style: A,
                        }),
                        l.a.createElement(
                          'div',
                          {className: 'smartbanner-info'},
                          l.a.createElement(
                            'div',
                            {className: 'smartbanner-title'},
                            this.props.title,
                          ),
                          l.a.createElement(
                            'div',
                            {className: 'smartbanner-author'},
                            this.props.author,
                          ),
                          l.a.createElement(
                            'div',
                            {className: 'smartbanner-description'},
                            F,
                          ),
                        ),
                        l.a.createElement(
                          'div',
                          {className: 'smartbanner-wrapper'},
                          l.a.createElement(
                            'a',
                            {
                              href: V,
                              onClick: this.install,
                              className: 'smartbanner-button',
                            },
                            l.a.createElement(
                              'span',
                              {className: 'smartbanner-button-text'},
                              this.props.button,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                },
              ]) && d(k.prototype, b),
              P
            );
          })();
        x(E, 'propTypes', {
          daysHidden: c.a.number,
          daysReminder: c.a.number,
          appStoreLanguage: c.a.string,
          button: c.a.node,
          storeText: c.a.objectOf(c.a.string),
          price: c.a.objectOf(c.a.string),
          force: c.a.string,
          title: c.a.string,
          author: c.a.string,
          position: c.a.string,
          url: c.a.objectOf(c.a.string),
          ignoreIosVersion: c.a.bool,
          appMeta: c.a.shape({
            android: c.a.string,
            ios: c.a.string,
            windows: c.a.string,
            kindle: c.a.string,
          }),
          onClose: c.a.func,
          onInstall: c.a.func,
        }),
          x(E, 'defaultProps', {
            daysHidden: 15,
            daysReminder: 90,
            appStoreLanguage:
              (g &&
                (
                  window.navigator.language || window.navigator.userLanguage
                ).slice(-2)) ||
              'us',
            button: 'View',
            storeText: {
              ios: 'On the App Store',
              android: 'In Google Play',
              windows: 'In Windows Store',
              kindle: 'In the Amazon Appstore',
            },
            price: {
              ios: 'Free',
              android: 'Free',
              windows: 'Free',
              kindle: 'Free',
            },
            force: '',
            title: '',
            author: '',
            position: 'top',
            url: {ios: '', android: '', windows: '', kindle: ''},
            appMeta: {
              ios: 'apple-itunes-app',
              android: 'google-play-app',
              windows: 'msApplication-ID',
              kindle: 'kindle-fire-app',
            },
          }),
          (o.default = E);
      },
      function (i, o, s) {},
      function (i, o, s) {
        var a;
        (function (l, u) {
          var c = 'function',
            f = 'undefined',
            d = 'object',
            h = 'model',
            v = 'name',
            y = 'type',
            x = 'vendor',
            m = 'version',
            p = 'architecture',
            g = 'console',
            w = 'mobile',
            E = 'tablet',
            T = 'smarttv',
            P = 'wearable',
            k = {
              extend: function (A, $) {
                var W = {};
                for (var O in A)
                  $[O] && $[O].length % 2 == 0
                    ? (W[O] = $[O].concat(A[O]))
                    : (W[O] = A[O]);
                return W;
              },
              has: function (A, $) {
                return (
                  typeof A == 'string' &&
                  $.toLowerCase().indexOf(A.toLowerCase()) !== -1
                );
              },
              lowerize: function (A) {
                return A.toLowerCase();
              },
              major: function (A) {
                return typeof A == 'string'
                  ? A.replace(/[^\d\.]/g, '').split('.')[0]
                  : u;
              },
              trim: function (A) {
                return A.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
              },
            },
            b = {
              rgx: function () {
                for (
                  var A, $, W, O, L, B, D, q = 0, $e = arguments;
                  q < $e.length && !B;

                ) {
                  var Ce = $e[q],
                    ke = $e[q + 1];
                  if (typeof A === f)
                    for (O in ((A = {}), ke))
                      ke.hasOwnProperty(O) &&
                        (typeof (L = ke[O]) === d ? (A[L[0]] = u) : (A[L] = u));
                  for ($ = W = 0; $ < Ce.length && !B; )
                    if ((B = Ce[$++].exec(this.getUA())))
                      for (O = 0; O < ke.length; O++)
                        (D = B[++W]),
                          typeof (L = ke[O]) === d && 0 < L.length
                            ? L.length == 2
                              ? typeof L[1] == c
                                ? (A[L[0]] = L[1].call(this, D))
                                : (A[L[0]] = L[1])
                              : L.length == 3
                              ? typeof L[1] !== c || (L[1].exec && L[1].test)
                                ? (A[L[0]] = D ? D.replace(L[1], L[2]) : u)
                                : (A[L[0]] = D ? L[1].call(this, D, L[2]) : u)
                              : L.length == 4 &&
                                (A[L[0]] = D
                                  ? L[3].call(this, D.replace(L[1], L[2]))
                                  : u)
                            : (A[L] = D || u);
                  q += 2;
                }
                return A;
              },
              str: function (A, $) {
                for (var W in $)
                  if (typeof $[W] === d && 0 < $[W].length) {
                    for (var O = 0; O < $[W].length; O++)
                      if (k.has($[W][O], A)) return W === '?' ? u : W;
                  } else if (k.has($[W], A)) return W === '?' ? u : W;
                return A;
              },
            },
            C = {
              browser: {
                oldsafari: {
                  version: {
                    '1.0': '/8',
                    1.2: '/1',
                    1.3: '/3',
                    '2.0': '/412',
                    '2.0.2': '/416',
                    '2.0.3': '/417',
                    '2.0.4': '/419',
                    '?': '/',
                  },
                },
              },
              device: {
                amazon: {model: {'Fire Phone': ['SD', 'KF']}},
                sprint: {
                  model: {'Evo Shift 4G': '7373KT'},
                  vendor: {HTC: 'APA', Sprint: 'Sprint'},
                },
              },
              os: {
                windows: {
                  version: {
                    ME: '4.90',
                    'NT 3.11': 'NT3.51',
                    'NT 4.0': 'NT4.0',
                    2e3: 'NT 5.0',
                    XP: ['NT 5.1', 'NT 5.2'],
                    Vista: 'NT 6.0',
                    7: 'NT 6.1',
                    8: 'NT 6.2',
                    8.1: 'NT 6.3',
                    10: ['NT 6.4', 'NT 10.0'],
                    RT: 'ARM',
                  },
                },
              },
            },
            M = {
              browser: [
                [
                  /(opera\smini)\/([\w\.-]+)/i,
                  /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
                  /(opera).+version\/([\w\.]+)/i,
                  /(opera)[\/\s]+([\w\.]+)/i,
                ],
                [v, m],
                [/(opios)[\/\s]+([\w\.]+)/i],
                [[v, 'Opera Mini'], m],
                [/\s(opr)\/([\w\.]+)/i],
                [[v, 'Opera'], m],
                [
                  /(kindle)\/([\w\.]+)/i,
                  /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
                  /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                  /(?:ms|\()(ie)\s([\w\.]+)/i,
                  /(rekonq)\/([\w\.]+)*/i,
                  /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i,
                ],
                [v, m],
                [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                [[v, 'IE'], m],
                [/(edge)\/((\d+)?[\w\.]+)/i],
                [v, m],
                [/(yabrowser)\/([\w\.]+)/i],
                [[v, 'Yandex'], m],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [[v, /_/g, ' '], m],
                [/(micromessenger)\/([\w\.]+)/i],
                [[v, 'WeChat'], m],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                [m, [v, 'MIUI Browser']],
                [/\swv\).+(chrome)\/([\w\.]+)/i],
                [[v, /(.+)/, '$1 WebView'], m],
                [
                  /android.+samsungbrowser\/([\w\.]+)/i,
                  /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i,
                ],
                [m, [v, 'Android Browser']],
                [
                  /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
                  /(qqbrowser)[\/\s]?([\w\.]+)/i,
                ],
                [v, m],
                [
                  /(uc\s?browser)[\/\s]?([\w\.]+)/i,
                  /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,
                  /juc.+(ucweb)[\/\s]?([\w\.]+)/i,
                ],
                [[v, 'UCBrowser'], m],
                [/(dolfin)\/([\w\.]+)/i],
                [[v, 'Dolphin'], m],
                [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                [[v, 'Chrome'], m],
                [/;fbav\/([\w\.]+);/i],
                [m, [v, 'Facebook']],
                [/fxios\/([\w\.-]+)/i],
                [m, [v, 'Firefox']],
                [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                [m, [v, 'Mobile Safari']],
                [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                [m, v],
                [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [v, [m, b.str, C.browser.oldsafari.version]],
                [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                [v, m],
                [/(navigator|netscape)\/([\w\.-]+)/i],
                [[v, 'Netscape'], m],
                [
                  /(swiftfox)/i,
                  /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                  /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
                  /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
                  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                  /(links)\s\(([\w\.]+)/i,
                  /(gobrowser)\/?([\w\.]+)*/i,
                  /(ice\s?browser)\/v?([\w\._]+)/i,
                  /(mosaic)[\/\s]([\w\.]+)/i,
                ],
                [v, m],
              ],
              cpu: [
                [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                [[p, 'amd64']],
                [/(ia32(?=;))/i],
                [[p, k.lowerize]],
                [/((?:i[346]|x)86)[;\)]/i],
                [[p, 'ia32']],
                [/windows\s(ce|mobile);\sppc;/i],
                [[p, 'arm']],
                [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                [[p, /ower/, '', k.lowerize]],
                [/(sun4\w)[;\)]/i],
                [[p, 'sparc']],
                [
                  /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
                ],
                [[p, k.lowerize]],
              ],
              device: [
                [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                [h, x, [y, E]],
                [/applecoremedia\/[\w\.]+ \((ipad)/],
                [h, [x, 'Apple'], [y, E]],
                [/(apple\s{0,1}tv)/i],
                [
                  [h, 'Apple TV'],
                  [x, 'Apple'],
                ],
                [
                  /(archos)\s(gamepad2?)/i,
                  /(hp).+(touchpad)/i,
                  /(hp).+(tablet)/i,
                  /(kindle)\/([\w\.]+)/i,
                  /\s(nook)[\w\s]+build\/(\w+)/i,
                  /(dell)\s(strea[kpr\s\d]*[\dko])/i,
                ],
                [x, h, [y, E]],
                [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
                [h, [x, 'Amazon'], [y, E]],
                [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
                [
                  [h, b.str, C.device.amazon.model],
                  [x, 'Amazon'],
                  [y, w],
                ],
                [/\((ip[honed|\s\w*]+);.+(apple)/i],
                [h, x, [y, w]],
                [/\((ip[honed|\s\w*]+);/i],
                [h, [x, 'Apple'], [y, w]],
                [
                  /(blackberry)[\s-]?(\w+)/i,
                  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
                  /(hp)\s([\w\s]+\w)/i,
                  /(asus)-?(\w+)/i,
                ],
                [x, h, [y, w]],
                [/\(bb10;\s(\w+)/i],
                [h, [x, 'BlackBerry'], [y, w]],
                [
                  /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i,
                ],
                [h, [x, 'Asus'], [y, E]],
                [
                  /(sony)\s(tablet\s[ps])\sbuild\//i,
                  /(sony)?(?:sgp.+)\sbuild\//i,
                ],
                [
                  [x, 'Sony'],
                  [h, 'Xperia Tablet'],
                  [y, E],
                ],
                [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
                [
                  [x, 'Sony'],
                  [h, 'Xperia Phone'],
                  [y, w],
                ],
                [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                [x, h, [y, g]],
                [/android.+;\s(shield)\sbuild/i],
                [h, [x, 'Nvidia'], [y, g]],
                [/(playstation\s[34portablevi]+)/i],
                [h, [x, 'Sony'], [y, g]],
                [/(sprint\s(\w+))/i],
                [
                  [x, b.str, C.device.sprint.vendor],
                  [h, b.str, C.device.sprint.model],
                  [y, w],
                ],
                [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                [x, h, [y, E]],
                [
                  /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,
                  /(zte)-(\w+)*/i,
                  /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i,
                ],
                [x, [h, /_/g, ' '], [y, w]],
                [/(nexus\s9)/i],
                [h, [x, 'HTC'], [y, E]],
                [/(nexus\s6p)/i],
                [h, [x, 'Huawei'], [y, w]],
                [/(microsoft);\s(lumia[\s\w]+)/i],
                [x, h, [y, w]],
                [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                [h, [x, 'Microsoft'], [y, g]],
                [/(kin\.[onetw]{3})/i],
                [
                  [h, /\./g, ' '],
                  [x, 'Microsoft'],
                  [y, w],
                ],
                [
                  /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
                  /mot[\s-]?(\w+)*/i,
                  /(XT\d{3,4}) build\//i,
                  /(nexus\s6)/i,
                ],
                [h, [x, 'Motorola'], [y, w]],
                [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                [h, [x, 'Motorola'], [y, E]],
                [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                [
                  [x, k.trim],
                  [h, k.trim],
                  [y, T],
                ],
                [/hbbtv.+maple;(\d+)/i],
                [
                  [h, /^/, 'SmartTV'],
                  [x, 'Samsung'],
                  [y, T],
                ],
                [/\(dtv[\);].+(aquos)/i],
                [h, [x, 'Sharp'], [y, T]],
                [
                  /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
                  /((SM-T\w+))/i,
                ],
                [[x, 'Samsung'], h, [y, E]],
                [/smart-tv.+(samsung)/i],
                [x, [y, T], h],
                [
                  /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
                  /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
                  /sec-((sgh\w+))/i,
                ],
                [[x, 'Samsung'], h, [y, w]],
                [/sie-(\w+)*/i],
                [h, [x, 'Siemens'], [y, w]],
                [
                  /(maemo|nokia).*(n900|lumia\s\d+)/i,
                  /(nokia)[\s_-]?([\w-]+)*/i,
                ],
                [[x, 'Nokia'], h, [y, w]],
                [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                [h, [x, 'Acer'], [y, E]],
                [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                [[x, 'LG'], h, [y, E]],
                [/(lg) netcast\.tv/i],
                [x, h, [y, T]],
                [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
                [h, [x, 'LG'], [y, w]],
                [/android.+(ideatab[a-z0-9\-\s]+)/i],
                [h, [x, 'Lenovo'], [y, E]],
                [/linux;.+((jolla));/i],
                [x, h, [y, w]],
                [/((pebble))app\/[\d\.]+\s/i],
                [x, h, [y, P]],
                [/android.+;\s(glass)\s\d/i],
                [h, [x, 'Google'], [y, P]],
                [
                  /android.+(\w+)\s+build\/hm\1/i,
                  /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
                  /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i,
                ],
                [
                  [h, /_/g, ' '],
                  [x, 'Xiaomi'],
                  [y, w],
                ],
                [/android.+a000(1)\s+build/i],
                [h, [x, 'OnePlus'], [y, w]],
                [/\s(tablet)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                [[y, k.lowerize], x, h],
              ],
              engine: [
                [/windows.+\sedge\/([\w\.]+)/i],
                [m, [v, 'EdgeHTML']],
                [
                  /(presto)\/([\w\.]+)/i,
                  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,
                  /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                  /(icab)[\/\s]([23]\.[\d\.]+)/i,
                ],
                [v, m],
                [/rv\:([\w\.]+).*(gecko)/i],
                [m, v],
              ],
              os: [
                [/microsoft\s(windows)\s(vista|xp)/i],
                [v, m],
                [
                  /(windows)\snt\s6\.2;\s(arm)/i,
                  /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,
                  /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
                ],
                [v, [m, b.str, C.os.windows.version]],
                [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                [
                  [v, 'Windows'],
                  [m, b.str, C.os.windows.version],
                ],
                [/\((bb)(10);/i],
                [[v, 'BlackBerry'], m],
                [
                  /(blackberry)\w*\/?([\w\.]+)*/i,
                  /(tizen)[\/\s]([\w\.]+)/i,
                  /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
                  /linux;.+(sailfish);/i,
                ],
                [v, m],
                [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
                [[v, 'Symbian'], m],
                [/\((series40);/i],
                [v],
                [/mozilla.+\(mobile;.+gecko.+firefox/i],
                [[v, 'Firefox OS'], m],
                [
                  /(nintendo|playstation)\s([wids34portablevu]+)/i,
                  /(mint)[\/\s\(]?(\w+)*/i,
                  /(mageia|vectorlinux)[;\s]/i,
                  /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
                  /(hurd|linux)\s?([\w\.]+)*/i,
                  /(gnu)\s?([\w\.]+)*/i,
                ],
                [v, m],
                [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                [[v, 'Chromium OS'], m],
                [/(sunos)\s?([\w\.]+\d)*/i],
                [[v, 'Solaris'], m],
                [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
                [v, m],
                [/(haiku)\s(\w+)/i],
                [v, m],
                [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],
                [
                  [v, 'iOS'],
                  [m, /_/g, '.'],
                ],
                [
                  /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
                  /(macintosh|mac(?=_powerpc)\s)/i,
                ],
                [
                  [v, 'Mac OS'],
                  [m, /_/g, '.'],
                ],
                [
                  /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,
                  /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,
                  /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                  /(unix)\s?([\w\.]+)*/i,
                ],
                [v, m],
              ],
            },
            V = function (A, $) {
              if (!(this instanceof V)) return new V(A, $).getResult();
              var W =
                  A ||
                  (l && l.navigator && l.navigator.userAgent
                    ? l.navigator.userAgent
                    : ''),
                O = $ ? k.extend(M, $) : M;
              return (
                (this.getBrowser = function () {
                  var L = b.rgx.apply(this, O.browser);
                  return (L.major = k.major(L.version)), L;
                }),
                (this.getCPU = function () {
                  return b.rgx.apply(this, O.cpu);
                }),
                (this.getDevice = function () {
                  return b.rgx.apply(this, O.device);
                }),
                (this.getEngine = function () {
                  return b.rgx.apply(this, O.engine);
                }),
                (this.getOS = function () {
                  return b.rgx.apply(this, O.os);
                }),
                (this.getResult = function () {
                  return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU(),
                  };
                }),
                (this.getUA = function () {
                  return W;
                }),
                (this.setUA = function (L) {
                  return (W = L), this;
                }),
                this
              );
            };
          (V.VERSION = '0.7.12'),
            (V.BROWSER = {NAME: v, MAJOR: 'major', VERSION: m}),
            (V.CPU = {ARCHITECTURE: p}),
            (V.DEVICE = {
              MODEL: h,
              VENDOR: x,
              TYPE: y,
              CONSOLE: g,
              MOBILE: w,
              SMARTTV: T,
              TABLET: E,
              WEARABLE: P,
              EMBEDDED: 'embedded',
            }),
            (V.ENGINE = {NAME: v, VERSION: m}),
            (V.OS = {NAME: v, VERSION: m}),
            typeof o !== f
              ? (typeof i !== f && i.exports && (o = i.exports = V),
                (o.UAParser = V))
              : s(6)
              ? (a = function () {
                  return V;
                }.call(o, s, o, i)) === u || (i.exports = a)
              : (l.UAParser = V);
          var F = l.jQuery || l.Zepto;
          if (typeof F !== f) {
            var j = new V();
            (F.ua = j.getResult()),
              (F.ua.get = function () {
                return j.getUA();
              }),
              (F.ua.set = function (A) {
                j.setUA(A);
                var $ = j.getResult();
                for (var W in $) F.ua[W] = $[W];
              });
          }
        })(typeof window == 'object' ? window : this);
      },
      function (i, o) {
        (function (s) {
          i.exports = s;
        }).call(this, {});
      },
    ]);
  });
})(oy);
var YT = oy.exports;
const sy = Vh(YT);
var su = {exports: {}};
const XT = '/assets/Google-Play-b200c85e.svg';
const Dc = ({
    theme: e = 'light',
    height: t = 50,
    width: n = 180,
    border: r,
    logo: i,
    storeName: o,
    title: s,
    url: a,
    className: l,
  }) =>
    I.createElement(
      'div',
      {
        onClick: () => a && window.open(a, '_blank'),
        style: {height: t, width: n, borderRadius: r},
        className: `button-container button-container-${e} ${l}`,
      },
      I.createElement('img', {src: i, alt: o}),
      I.createElement(
        'div',
        {className: 'button-text-container'},
        I.createElement('span', {className: 'button-title'}, s),
        I.createElement('span', {className: 'button-store-name'}, o),
      ),
    ),
  ZT = ({
    theme: e = 'light',
    height: t,
    title: n = 'GET IT ON',
    width: r,
    className: i,
    url: o,
  }) =>
    I.createElement(Dc, {
      theme: e,
      height: t,
      width: r,
      url: o,
      storeName: 'Google Play',
      logo: XT,
      className: i,
      title: n,
    }),
  JT = '/assets/Huawei-443ceaea.svg',
  eC = ({
    theme: e = 'light',
    height: t,
    title: n = 'EXPLORE IT ON',
    width: r,
    className: i,
    url: o,
  }) =>
    I.createElement(Dc, {
      theme: e,
      height: t,
      width: r,
      url: o,
      storeName: 'AppGallery',
      logo: JT,
      className: i,
      title: n,
    }),
  tC = '/assets/Apple-8fe050f5.svg',
  nC = '/assets/Apple-light-79f268ea.svg',
  rC = ({
    theme: e = 'light',
    height: t,
    title: n = 'Download on the',
    width: r,
    className: i,
    url: o,
  }) =>
    I.createElement(Dc, {
      theme: e,
      height: t,
      width: r,
      url: o,
      storeName: 'App Store',
      logo: e === 'dark' ? nC : tC,
      className: i,
      title: n,
    });
const iC = ({children: e, gap: t, direction: n = 'row'}) =>
    I.createElement(
      'div',
      {className: 'buttons-container', style: {gap: t, flexDirection: n}},
      e,
    ),
  oC = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        AppGalleryButton: eC,
        AppStoreButton: rC,
        ButtonsContainer: iC,
        GooglePlayButton: ZT,
      },
      Symbol.toStringTag,
      {value: 'Module'},
    ),
  ),
  bh = ky(oC);
(function (e, t) {
  (e.exports = bh), (t.default = bh);
})(su, su.exports);
var Oh = su.exports;
function sC() {
  const e = {
      visible: {opacity: 1, scale: 1, transition: {duration: 1}},
      hidden: {opacity: 0, scale: 0},
    },
    t = [
      {title: 'Arduino', link: 'https://cdn.svgporn.com/logos/arduino.svg'},
      {
        title: 'TailwindCSS',
        link: 'https://cdn.svgporn.com/logos/tailwindcss.svg',
      },
      {title: 'Git', link: 'https://cdn.svgporn.com/logos/git.svg'},
      {title: 'Twilio', link: 'https://cdn.svgporn.com/logos/twilio.svg'},
      {title: 'ExpressJS', link: 'https://cdn.svgporn.com/logos/express.svg'},
      {title: 'React', link: 'https://cdn.svgporn.com/logos/react.svg'},
      {title: 'Socket.io', link: 'https://cdn.svgporn.com/logos/socket.io.svg'},
      {
        title: 'VS Code',
        link: 'https://cdn.svgporn.com/logos/visual-studio-code.svg',
      },
      {title: 'XCode', link: 'https://cdn.svgporn.com/logos/xcode.svg'},
    ];
  return _.jsxs('div', {
    id: 'home',
    className: 'text-black',
    children: [
      _.jsx(sy, {title: 'Niveles De Niveles', daysHidden: 0, daysReminder: 0}),
      _.jsxs('div', {
        className:
          ' bg-light-600 mx-auto my-auto justify-center flex-col lg:flex lg:flex-row-reverse h-screen py-32 px-2 lg:p-52',
        children: [
          _.jsx('div', {
            className:
              'justify-center lg:justify-start my-auto mx-auto lg:mr-auto ',
            children: _.jsx('img', {
              src: '/img/logo.png',
              className: 'h-48 sm:h-80 z-10 animate animate-slowBounce mx-auto',
            }),
          }),
          _.jsxs('div', {
            className:
              'justify-center mt-12 lg:my-auto align-middle mr-0 w-full text-center lg:text-start lg:w-6/12 mx-auto',
            children: [
              _.jsx('p', {
                className: 'text-5xl text-dark font-bold',
                children: 'Niveles De Niveles',
              }),
              _.jsx('p', {
                className: 'text-2xl text-neutral-600 my-4 mb-8',
                children:
                  'Llevando la seguridad de los Colombianos a otro nivel!',
              }),
              _.jsx(Tn, {
                className:
                  'text-lg bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded',
                to: 'about',
                spy: !0,
                smooth: !0,
                duration: 500,
                children: 'Conóce nuestro proyecto',
              }),
            ],
          }),
        ],
      }),
      _.jsxs('div', {
        className: 'w-full bg-white',
        children: [
          _.jsxs('div', {
            id: 'about',
            className:
              'flex-col bg-white lg:flex lg:flex-row w-9/12 mx-auto py-16 h-fit justify-between ',
            children: [
              _.jsx(Je.img, {
                src: '/img/about-img.svg',
                className:
                  ' h-[400px] mx-auto lg:mt-0 lg:mr-12 lg:w-1/2 my-auto align-middle',
                variants: e,
                initial: 'hidden',
                whileInView: 'visible',
              }),
              _.jsxs('div', {
                className: 'w-full lg:w-1/2',
                children: [
                  _.jsxs('div', {
                    children: [
                      _.jsx(Je.p, {
                        initial: {opacity: 0, y: 75},
                        whileInView: {
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.75},
                        },
                        className:
                          'font-bold text-dark text-4xl mt-8 text-center lg:text-start',
                        children: 'La prevención y la información es la clave',
                      }),
                      _.jsx(Je.p, {
                        initial: {opacity: 0, y: 75},
                        whileInView: {
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.75, delay: 0.25},
                        },
                        className: 'text-neutral-600 my-5',
                        children:
                          'Niveles de Niveles es una plataforma que utiliza la prevención y la información como la herramienta más importante para combatir desastres naturales. Creamos un ambiente seguro donde los usuarios tienen la opción de reportar, ser alertados y estar informados sobre los niveles de riesgo de desastres naturales a su alrededor.',
                      }),
                    ],
                  }),
                  _.jsxs('div', {
                    className: 'flex flex-row h-full',
                    children: [
                      _.jsxs(Je.div, {
                        initial: {opacity: 0, y: 75},
                        whileInView: {
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.75, delay: 0.5},
                        },
                        className: 'w-1/2 h-full',
                        children: [
                          _.jsx('i', {
                            className: 'bx bx-lg bx-receipt text-dark-600',
                          }),
                          _.jsx('p', {
                            className: 'text-xl font-bold text-dark-600',
                            children: 'Nuestros Sensores',
                          }),
                          _.jsx('p', {
                            className: 'text-neutral-600',
                            children:
                              'Utilizamos sensores para medir el nivel del agua y el movimiento de la tierra y así determinar el riesgo de desbordamientos y deslizamientos.',
                          }),
                        ],
                      }),
                      _.jsxs(Je.div, {
                        initial: {opacity: 0, y: 75},
                        whileInView: {
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.75, delay: 0.75},
                        },
                        className: 'w-1/2 h-full',
                        children: [
                          _.jsx('i', {
                            className: 'bx bx-lg bx-cube-alt text-dark-600',
                          }),
                          _.jsx('p', {
                            className: 'text-xl font-bold text-dark-600',
                            children: 'Crowdsourcing',
                          }),
                          _.jsx('p', {
                            className: 'text-neutral-600',
                            children:
                              'Utilizamos un modelo de colaboración abierta (crowdsourcing) para obtener los reportes de desastres de la misma población.',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _.jsx('div', {
            id: 'disasters',
            className: 'w-full bg-accent-900/70 pb-12',
            children: _.jsxs('div', {
              className:
                'w-10/12 lg:9/12 2xl:w-8/12 mx-auto justify-center py-10',
              children: [
                _.jsx(ko, {
                  title: 'Desastres Naturales',
                  subtitle: 'Los desastres que prevenimos son',
                }),
                _.jsxs('div', {
                  className:
                    'flex-col lg:flex-row lg:flex  lg:gap-8 lg:gap-y-8',
                  children: [
                    _.jsx(Ka, {
                      icon: 'bx-water',
                      title: 'Desbordamientos',
                      description: `El desbordamiento de ríos, arroyos y otros cuerpos de agua causan inundaciones en
                diferentes municipios del Atlántico. Tener un mecanismo que alerte sobre estos les daría a las
                comunidades cercanas tiempo para recoger sus pertenencias más importantes y evitar daños mayores en sus
                viviendas. Para medir estos, utilizamos sensores ultrasónicos para medir el nivel del agua.`,
                      delay: 0,
                    }),
                    _.jsx(Ka, {
                      icon: 'bxs-hot',
                      title: 'Incendios Forestales',
                      description:
                        'En el Caribe colombiano se han reportado 150 incendios forestales este año y su causa principal son las altas temperaturas y las escasas lluvias. Una vez que estos llegan a un punto que su magnitud es tan grande que puede llevar días para detenerlo, por lo que si logramos reportar estos en el menor tiempo posible, será más fácil evitar la destrucción de la fauna a su alrededor.',
                      delay: window.screen.width > 1024 ? 0.25 : 0,
                    }),
                    _.jsx(Ka, {
                      icon: 'bx-landscape',
                      title: 'Deslizamientos',
                      description:
                        'Entre 1920 y 2020, se registraron más de 11.800 deslizamientos de tierra, pero solamente en 2022 se dieron 813. Esto es una prueba de cómo el cambio climático está afectando al país. Hay muchas personas que no saben que están en una zona de riesgo por lo que el tener una alerta sobre el movimiento de la tierra puede ayudar a las comunidades a evitar catástrofes. Utilizamos acelerómetros para medir el movimiento de la tierra.',
                      delay: window.screen.width > 1024 ? 0.5 : 0,
                    }),
                  ],
                }),
              ],
            }),
          }),
          _.jsxs('div', {
            id: 'resources',
            className: 'w-full bg-white pb-12',
            children: [
              _.jsxs('div', {
                className: 'w-10/12 lg:7/12 mx-auto justify-center py-10',
                children: [
                  _.jsx(ko, {
                    title: 'Recursos',
                    subtitle: '¿Te interesa? Mira un poco de nuestros avances',
                  }),
                  _.jsx(Je.div, {
                    initial: {opacity: 0, y: 75},
                    whileInView: {
                      opacity: 1,
                      y: 0,
                      transition: {duration: 0.75, delay: 0.25},
                    },
                    children: _.jsx('iframe', {
                      className: 'mx-auto w-full max-w-2xl h-full aspect-video',
                      src: 'https://www.youtube.com/embed/a1bNz8M6Sew?si=hCeSToOI6zhFPqWr',
                      title: 'YouTube video player',
                      allow:
                        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    }),
                  }),
                  _.jsxs('div', {
                    className:
                      ' flex-row md:flex jutify-center mx-auto w-full gap-3 my-8',
                    children: [
                      _.jsx(Sh, {
                        title: 'GitHub',
                        subtitle: 'Nuestro Repositorio',
                        link: 'https://github.com/NotARoomba/NivelesDeNiveles',
                        imagePath: '/img/portfolio/hub.png',
                        textColor: 'text-light',
                      }),
                      _.jsx(Sh, {
                        title: 'Política de Privacidad',
                        subtitle: '',
                        link: 'https://nivelesdeniveles.org/policy_es.pdf',
                        imagePath: '/img/portfolio/blog.png',
                        textColor: 'text-dark',
                      }),
                    ],
                  }),
                  _.jsxs('div', {
                    className:
                      'flex flex-wrap justify-center w-full mx-auto gap-8',
                    children: [
                      _.jsx(Je.div, {
                        className: 'mx-auto',
                        initial: {opacity: 0, y: 75},
                        whileInView: {
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.75, delay: 0.25},
                        },
                        children: _.jsx(Oh.AppStoreButton, {
                          url: 'https://apple.co/3SKLZIm',
                          theme: 'dark',
                          title: 'Descárgalo en',
                          height: 60,
                          width: 200,
                          className: 'justify-center mx-auto mt-8',
                        }),
                      }),
                      _.jsx(Je.div, {
                        className: 'mx-auto',
                        initial: {opacity: 0, y: 75},
                        whileInView: {
                          opacity: 1,
                          y: 0,
                          transition: {duration: 0.75, delay: 0.25},
                        },
                        children: _.jsx(Oh.GooglePlayButton, {
                          url: 'https://play.google.com/store/apps/details?id=com.notaroomba.nivelesdeniveles',
                          theme: 'dark',
                          height: 60,
                          width: 200,
                          title: 'Descárgalo en',
                          className: 'justify-center mx-auto mt-8 ',
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              _.jsxs('div', {
                id: 'us',
                className: ' w-full md:w-9/12 mx-auto justify-center py-10',
                children: [
                  _.jsx(ko, {
                    title: 'Equipo',
                    subtitle: 'Cónoce al equipo Hacks Costeños',
                  }),
                  _.jsxs('div', {
                    className: 'lg:flex lg:flex-row gap-8',
                    children: [
                      _.jsx(qa, {
                        name: 'Nathan Alspaugh',
                        role: 'Programación y Hardware',
                        image: '/img/team/nathan.jpg',
                        github: 'https://github.com/NotARoomba',
                        insta: 'https://www.instagram.com/notaroomba',
                        delay: window.screen.width > 1024 ? 0.25 : 0,
                      }),
                      _.jsx(qa, {
                        name: 'Ashlee Yin',
                        role: 'Diseño y Planeación',
                        image: '/img/team/ash.jpg',
                        github: 'https://github.com/awangran',
                        insta: 'https://www.instagram.com/ashlee_yin',
                        linkedin:
                          'https://co.linkedin.com/in/ashlee-yin-romero-63204223a',
                        delay: 0,
                      }),
                      _.jsx(qa, {
                        name: 'Felipe Ochoa',
                        role: 'Edición y Diseño',
                        image: '/img/team/pipe.jpg',
                        github: 'https://github.com/felipeochoat',
                        insta: 'https://www.instagram.com/felipeochoat',
                        delay: window.screen.width > 1024 ? 0.25 : 0,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _.jsx('div', {
            className: 'w-full bg-accent-900/70',
            children: _.jsxs('div', {
              className: 'w-11/12 md:w-7/12 mx-auto justify-center py-10',
              children: [
                _.jsx(ko, {
                  title: 'Herramientas',
                  subtitle: 'Tecnologías que utilizamos',
                }),
                _.jsx(Jg, {
                  autoplay: !0,
                  slidesToShow: 1,
                  children: t.map((n, r) =>
                    _.jsxs(
                      'div',
                      {
                        className:
                          'my-auto mx-auto h-full justify-center align-middle',
                        children: [
                          _.jsx(qT, {
                            className:
                              'mx-auto my-auto align-middle justify-center',
                            src: n.link,
                            width: 300,
                            height: 100,
                            title: n.title,
                          }),
                          r > 3 &&
                            _.jsx('p', {
                              className: 'text-center font-bold text-3xl mt-3',
                              children: n.title,
                            }),
                        ],
                      },
                      r,
                    ),
                  ),
                }),
              ],
            }),
          }),
          _.jsx('div', {
            className: 'w-full bg-white pb-12 px-8',
            children: _.jsx('div', {
              className: 'md:w-7/12 mx-auto justify-center py-10',
              children: _.jsxs('div', {
                className: 'flex flex-row',
                children: [
                  _.jsxs('div', {
                    className: 'justify-center mx-auto',
                    children: [
                      _.jsx('p', {
                        className: 'mb-2 text-4xl',
                        children: 'Niveles De Niveles',
                      }),
                      _.jsx('p', {
                        className: ' text-lightText',
                        children: 'Barranquilla, Colombia',
                      }),
                      _.jsx('p', {
                        className: ' text-lightText',
                        children: 'Hacks Costeños',
                      }),
                      _.jsx('br', {}),
                      _.jsx('a', {
                        href: 'mailto:nivelesdniveles@gmail.com',
                        className: 'my-9 underline text-lightText',
                        children: 'nivelesdniveles@gmail.com',
                      }),
                      _.jsx('br', {}),
                      _.jsx('a', {
                        href: 'https://github.com/NotARoomba/NivelesDeNiveles',
                        className: 'my-9 underline text-lightText',
                        children: 'GitHub',
                      }),
                      _.jsx('br', {}),
                      _.jsx('a', {
                        href: 'https://nivelesdeniveles.org/policy_es.pdf',
                        className: 'my-9 underline text-lightText',
                        children: 'Política de Privacidad',
                      }),
                    ],
                  }),
                  _.jsxs('div', {
                    className: 'justify-left mx-auto',
                    children: [
                      _.jsx('p', {className: 'text-2xl', children: 'Enlaces'}),
                      _.jsx(Tn, {
                        className: ' cursor-pointer underline',
                        activeClass: 'active',
                        to: 'home',
                        href: '#home',
                        spy: !0,
                        smooth: !0,
                        duration: 500,
                        children: 'Inicio',
                      }),
                      _.jsx('br', {}),
                      _.jsx(Tn, {
                        className: ' cursor-pointer underline',
                        activeClass: 'active',
                        to: 'about',
                        href: '#about',
                        spy: !0,
                        smooth: !0,
                        duration: 500,
                        children: 'Nuestra Misión',
                      }),
                      _.jsx('br', {}),
                      _.jsx(Tn, {
                        className: ' cursor-pointer underline',
                        activeClass: 'active',
                        to: 'disasters',
                        href: '#disasters',
                        offset: -60,
                        spy: !0,
                        smooth: !0,
                        duration: 500,
                        children: 'Desastres',
                      }),
                      _.jsx('br', {}),
                      _.jsx(Tn, {
                        className: ' cursor-pointer underline',
                        activeClass: 'active',
                        to: 'resources',
                        href: '#resources',
                        offset: -60,
                        spy: !0,
                        smooth: !0,
                        duration: 500,
                        children: 'Recursos',
                      }),
                      _.jsx('br', {}),
                      _.jsx(Tn, {
                        className: ' cursor-pointer underline',
                        activeClass: 'active',
                        to: 'us',
                        href: '#us',
                        offset: -60,
                        spy: !0,
                        smooth: !0,
                        duration: 500,
                        children: 'Nosotros',
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
/**
 * @remix-run/router v1.11.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Oi() {
  return (
    (Oi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Oi.apply(this, arguments)
  );
}
var Xt;
(function (e) {
  (e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE');
})(Xt || (Xt = {}));
const Rh = 'popstate';
function aC(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let {pathname: o, search: s, hash: a} = r.location;
    return au(
      '',
      {pathname: o, search: s, hash: a},
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || 'default',
    );
  }
  function n(r, i) {
    return typeof i == 'string' ? i : ks(i);
  }
  return uC(t, n, null, e);
}
function ve(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t);
}
function Ic(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function lC() {
  return Math.random().toString(36).substr(2, 8);
}
function Mh(e, t) {
  return {usr: e.state, key: e.key, idx: t};
}
function au(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Oi(
      {pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: ''},
      typeof t == 'string' ? br(t) : t,
      {state: n, key: (t && t.key) || r || lC()},
    )
  );
}
function ks(e) {
  let {pathname: t = '/', search: n = '', hash: r = ''} = e;
  return (
    n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n),
    r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r),
    t
  );
}
function br(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf('?');
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function uC(e, t, n, r) {
  r === void 0 && (r = {});
  let {window: i = document.defaultView, v5Compat: o = !1} = r,
    s = i.history,
    a = Xt.Pop,
    l = null,
    u = c();
  u == null && ((u = 0), s.replaceState(Oi({}, s.state, {idx: u}), ''));
  function c() {
    return (s.state || {idx: null}).idx;
  }
  function f() {
    a = Xt.Pop;
    let x = c(),
      m = x == null ? null : x - u;
    (u = x), l && l({action: a, location: y.location, delta: m});
  }
  function d(x, m) {
    a = Xt.Push;
    let p = au(y.location, x, m);
    n && n(p, x), (u = c() + 1);
    let g = Mh(p, u),
      w = y.createHref(p);
    try {
      s.pushState(g, '', w);
    } catch (E) {
      if (E instanceof DOMException && E.name === 'DataCloneError') throw E;
      i.location.assign(w);
    }
    o && l && l({action: a, location: y.location, delta: 1});
  }
  function h(x, m) {
    a = Xt.Replace;
    let p = au(y.location, x, m);
    n && n(p, x), (u = c());
    let g = Mh(p, u),
      w = y.createHref(p);
    s.replaceState(g, '', w),
      o && l && l({action: a, location: y.location, delta: 0});
  }
  function v(x) {
    let m = i.location.origin !== 'null' ? i.location.origin : i.location.href,
      p = typeof x == 'string' ? x : ks(x);
    return (
      ve(
        m,
        'No window.location.(origin|href) available to create URL for href: ' +
          p,
      ),
      new URL(p, m)
    );
  }
  let y = {
    get action() {
      return a;
    },
    get location() {
      return e(i, s);
    },
    listen(x) {
      if (l) throw new Error('A history only accepts one active listener');
      return (
        i.addEventListener(Rh, f),
        (l = x),
        () => {
          i.removeEventListener(Rh, f), (l = null);
        }
      );
    },
    createHref(x) {
      return t(i, x);
    },
    createURL: v,
    encodeLocation(x) {
      let m = v(x);
      return {pathname: m.pathname, search: m.search, hash: m.hash};
    },
    push: d,
    replace: h,
    go(x) {
      return s.go(x);
    },
  };
  return y;
}
var Ah;
(function (e) {
  (e.data = 'data'),
    (e.deferred = 'deferred'),
    (e.redirect = 'redirect'),
    (e.error = 'error');
})(Ah || (Ah = {}));
function cC(e, t, n) {
  n === void 0 && (n = '/');
  let r = typeof t == 'string' ? br(t) : t,
    i = Vc(r.pathname || '/', n);
  if (i == null) return null;
  let o = ay(e);
  fC(o);
  let s = null;
  for (let a = 0; s == null && a < o.length; ++a) s = xC(o[a], EC(i));
  return s;
}
function ay(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = '');
  let i = (o, s, a) => {
    let l = {
      relativePath: a === void 0 ? o.path || '' : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o,
    };
    l.relativePath.startsWith('/') &&
      (ve(
        l.relativePath.startsWith(r),
        'Absolute route path "' +
          l.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.',
      ),
      (l.relativePath = l.relativePath.slice(r.length)));
    let u = un([r, l.relativePath]),
      c = n.concat(l);
    o.children &&
      o.children.length > 0 &&
      (ve(
        o.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + u + '".'),
      ),
      ay(o.children, t, c, u)),
      !(o.path == null && !o.index) &&
        t.push({path: u, score: yC(u, o.index), routesMeta: c});
  };
  return (
    e.forEach((o, s) => {
      var a;
      if (o.path === '' || !((a = o.path) != null && a.includes('?'))) i(o, s);
      else for (let l of ly(o.path)) i(o, s, l);
    }),
    t
  );
}
function ly(e) {
  let t = e.split('/');
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith('?'),
    o = n.replace(/\?$/, '');
  if (r.length === 0) return i ? [o, ''] : [o];
  let s = ly(r.join('/')),
    a = [];
  return (
    a.push(...s.map(l => (l === '' ? o : [o, l].join('/')))),
    i && a.push(...s),
    a.map(l => (e.startsWith('/') && l === '' ? '/' : l))
  );
}
function fC(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : wC(
          t.routesMeta.map(r => r.childrenIndex),
          n.routesMeta.map(r => r.childrenIndex),
        ),
  );
}
const dC = /^:\w+$/,
  hC = 3,
  pC = 2,
  mC = 1,
  vC = 10,
  gC = -2,
  Lh = e => e === '*';
function yC(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (
    n.some(Lh) && (r += gC),
    t && (r += pC),
    n
      .filter(i => !Lh(i))
      .reduce((i, o) => i + (dC.test(o) ? hC : o === '' ? mC : vC), r)
  );
}
function wC(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function xC(e, t) {
  let {routesMeta: n} = e,
    r = {},
    i = '/',
    o = [];
  for (let s = 0; s < n.length; ++s) {
    let a = n[s],
      l = s === n.length - 1,
      u = i === '/' ? t : t.slice(i.length) || '/',
      c = SC({path: a.relativePath, caseSensitive: a.caseSensitive, end: l}, u);
    if (!c) return null;
    Object.assign(r, c.params);
    let f = a.route;
    o.push({
      params: r,
      pathname: un([i, c.pathname]),
      pathnameBase: _C(un([i, c.pathnameBase])),
      route: f,
    }),
      c.pathnameBase !== '/' && (i = un([i, c.pathnameBase]));
  }
  return o;
}
function SC(e, t) {
  typeof e == 'string' && (e = {path: e, caseSensitive: !1, end: !0});
  let [n, r] = kC(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    s = o.replace(/(.)\/+$/, '$1'),
    a = i.slice(1);
  return {
    params: r.reduce((u, c, f) => {
      let {paramName: d, isOptional: h} = c;
      if (d === '*') {
        let y = a[f] || '';
        s = o.slice(0, o.length - y.length).replace(/(.)\/+$/, '$1');
      }
      const v = a[f];
      return h && !v ? (u[d] = void 0) : (u[d] = PC(v || '', d)), u;
    }, {}),
    pathname: o,
    pathnameBase: s,
    pattern: e,
  };
}
function kC(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Ic(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".'),
    );
  let r = [],
    i =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:(\w+)(\?)?/g,
          (s, a, l) => (
            r.push({paramName: a, isOptional: l != null}),
            l ? '/?([^\\/]+)?' : '/([^\\/]+)'
          ),
        );
  return (
    e.endsWith('*')
      ? (r.push({paramName: '*'}),
        (i += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
      ? (i += '\\/*$')
      : e !== '' && e !== '/' && (i += '(?:(?=\\/|$))'),
    [new RegExp(i, t ? void 0 : 'i'), r]
  );
}
function EC(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      Ic(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').'),
      ),
      e
    );
  }
}
function PC(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      Ic(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (' due to a bad percent encoding (' + n + ').'),
      ),
      e
    );
  }
}
function Vc(e, t) {
  if (t === '/') return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== '/' ? null : e.slice(n) || '/';
}
function TC(e, t) {
  t === void 0 && (t = '/');
  let {
    pathname: n,
    search: r = '',
    hash: i = '',
  } = typeof e == 'string' ? br(e) : e;
  return {
    pathname: n ? (n.startsWith('/') ? n : CC(n, t)) : t,
    search: bC(r),
    hash: OC(i),
  };
}
function CC(e, t) {
  let n = t.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach(i => {
      i === '..' ? n.length > 1 && n.pop() : i !== '.' && n.push(i);
    }),
    n.length > 1 ? n.join('/') : '/'
  );
}
function Ya(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' +
      t +
      '` field [' +
      JSON.stringify(r) +
      '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function uy(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function cy(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == 'string'
    ? (i = br(e))
    : ((i = Oi({}, e)),
      ve(
        !i.pathname || !i.pathname.includes('?'),
        Ya('?', 'pathname', 'search', i),
      ),
      ve(
        !i.pathname || !i.pathname.includes('#'),
        Ya('#', 'pathname', 'hash', i),
      ),
      ve(!i.search || !i.search.includes('#'), Ya('#', 'search', 'hash', i)));
  let o = e === '' || i.pathname === '',
    s = o ? '/' : i.pathname,
    a;
  if (r || s == null) a = n;
  else {
    let f = t.length - 1;
    if (s.startsWith('..')) {
      let d = s.split('/');
      for (; d[0] === '..'; ) d.shift(), (f -= 1);
      i.pathname = d.join('/');
    }
    a = f >= 0 ? t[f] : '/';
  }
  let l = TC(i, a),
    u = s && s !== '/' && s.endsWith('/'),
    c = (o || s === '.') && n.endsWith('/');
  return !l.pathname.endsWith('/') && (u || c) && (l.pathname += '/'), l;
}
const un = e => e.join('/').replace(/\/\/+/g, '/'),
  _C = e => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  bC = e => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  OC = e => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function RC(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  );
}
const fy = ['post', 'put', 'patch', 'delete'];
new Set(fy);
const MC = ['get', ...fy];
new Set(MC);
/**
 * React Router v6.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Es() {
  return (
    (Es = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Es.apply(this, arguments)
  );
}
const zc = S.createContext(null),
  AC = S.createContext(null),
  Or = S.createContext(null),
  na = S.createContext(null),
  Bn = S.createContext({outlet: null, matches: [], isDataRoute: !1}),
  dy = S.createContext(null);
function LC(e, t) {
  let {relative: n} = t === void 0 ? {} : t;
  Qi() || ve(!1);
  let {basename: r, navigator: i} = S.useContext(Or),
    {hash: o, pathname: s, search: a} = py(e, {relative: n}),
    l = s;
  return (
    r !== '/' && (l = s === '/' ? r : un([r, s])),
    i.createHref({pathname: l, search: a, hash: o})
  );
}
function Qi() {
  return S.useContext(na) != null;
}
function ra() {
  return Qi() || ve(!1), S.useContext(na).location;
}
function hy(e) {
  S.useContext(Or).static || S.useLayoutEffect(e);
}
function NC() {
  let {isDataRoute: e} = S.useContext(Bn);
  return e ? QC() : jC();
}
function jC() {
  Qi() || ve(!1);
  let e = S.useContext(zc),
    {basename: t, navigator: n} = S.useContext(Or),
    {matches: r} = S.useContext(Bn),
    {pathname: i} = ra(),
    o = JSON.stringify(uy(r).map(l => l.pathnameBase)),
    s = S.useRef(!1);
  return (
    hy(() => {
      s.current = !0;
    }),
    S.useCallback(
      function (l, u) {
        if ((u === void 0 && (u = {}), !s.current)) return;
        if (typeof l == 'number') {
          n.go(l);
          return;
        }
        let c = cy(l, JSON.parse(o), i, u.relative === 'path');
        e == null &&
          t !== '/' &&
          (c.pathname = c.pathname === '/' ? t : un([t, c.pathname])),
          (u.replace ? n.replace : n.push)(c, u.state, u);
      },
      [t, n, o, i, e],
    )
  );
}
function py(e, t) {
  let {relative: n} = t === void 0 ? {} : t,
    {matches: r} = S.useContext(Bn),
    {pathname: i} = ra(),
    o = JSON.stringify(uy(r).map(s => s.pathnameBase));
  return S.useMemo(() => cy(e, JSON.parse(o), i, n === 'path'), [e, o, i, n]);
}
function DC(e, t) {
  return IC(e, t);
}
function IC(e, t, n) {
  Qi() || ve(!1);
  let {navigator: r} = S.useContext(Or),
    {matches: i} = S.useContext(Bn),
    o = i[i.length - 1],
    s = o ? o.params : {};
  o && o.pathname;
  let a = o ? o.pathnameBase : '/';
  o && o.route;
  let l = ra(),
    u;
  if (t) {
    var c;
    let y = typeof t == 'string' ? br(t) : t;
    a === '/' || ((c = y.pathname) != null && c.startsWith(a)) || ve(!1),
      (u = y);
  } else u = l;
  let f = u.pathname || '/',
    d = a === '/' ? f : f.slice(a.length) || '/',
    h = cC(e, {pathname: d}),
    v = UC(
      h &&
        h.map(y =>
          Object.assign({}, y, {
            params: Object.assign({}, s, y.params),
            pathname: un([
              a,
              r.encodeLocation
                ? r.encodeLocation(y.pathname).pathname
                : y.pathname,
            ]),
            pathnameBase:
              y.pathnameBase === '/'
                ? a
                : un([
                    a,
                    r.encodeLocation
                      ? r.encodeLocation(y.pathnameBase).pathname
                      : y.pathnameBase,
                  ]),
          }),
        ),
      i,
      n,
    );
  return t && v
    ? S.createElement(
        na.Provider,
        {
          value: {
            location: Es(
              {
                pathname: '/',
                search: '',
                hash: '',
                state: null,
                key: 'default',
              },
              u,
            ),
            navigationType: Xt.Pop,
          },
        },
        v,
      )
    : v;
}
function VC() {
  let e = GC(),
    t = RC(e)
      ? e.status + ' ' + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = {padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)'},
    o = null;
  return S.createElement(
    S.Fragment,
    null,
    S.createElement('h2', null, 'Unexpected Application Error!'),
    S.createElement('h3', {style: {fontStyle: 'italic'}}, t),
    n ? S.createElement('pre', {style: i}, n) : null,
    o,
  );
}
const zC = S.createElement(VC, null);
class FC extends S.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return {error: t};
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? {error: t.error, location: t.location, revalidation: t.revalidation}
      : {
          error: t.error || n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      'React Router caught the following error during render',
      t,
      n,
    );
  }
  render() {
    return this.state.error
      ? S.createElement(
          Bn.Provider,
          {value: this.props.routeContext},
          S.createElement(dy.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function BC(e) {
  let {routeContext: t, match: n, children: r} = e,
    i = S.useContext(zc);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    S.createElement(Bn.Provider, {value: t}, r)
  );
}
function UC(e, t, n) {
  var r;
  if ((t === void 0 && (t = []), n === void 0 && (n = null), e == null)) {
    var i;
    if ((i = n) != null && i.errors) e = n.matches;
    else return null;
  }
  let o = e,
    s = (r = n) == null ? void 0 : r.errors;
  if (s != null) {
    let a = o.findIndex(
      l => l.route.id && (s == null ? void 0 : s[l.route.id]),
    );
    a >= 0 || ve(!1), (o = o.slice(0, Math.min(o.length, a + 1)));
  }
  return o.reduceRight((a, l, u) => {
    let c = l.route.id ? (s == null ? void 0 : s[l.route.id]) : null,
      f = null;
    n && (f = l.route.errorElement || zC);
    let d = t.concat(o.slice(0, u + 1)),
      h = () => {
        let v;
        return (
          c
            ? (v = f)
            : l.route.Component
            ? (v = S.createElement(l.route.Component, null))
            : l.route.element
            ? (v = l.route.element)
            : (v = a),
          S.createElement(BC, {
            match: l,
            routeContext: {outlet: a, matches: d, isDataRoute: n != null},
            children: v,
          })
        );
      };
    return n && (l.route.ErrorBoundary || l.route.errorElement || u === 0)
      ? S.createElement(FC, {
          location: n.location,
          revalidation: n.revalidation,
          component: f,
          error: c,
          children: h(),
          routeContext: {outlet: null, matches: d, isDataRoute: !0},
        })
      : h();
  }, null);
}
var my = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    );
  })(my || {}),
  Ps = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(Ps || {});
function $C(e) {
  let t = S.useContext(zc);
  return t || ve(!1), t;
}
function HC(e) {
  let t = S.useContext(AC);
  return t || ve(!1), t;
}
function WC(e) {
  let t = S.useContext(Bn);
  return t || ve(!1), t;
}
function vy(e) {
  let t = WC(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || ve(!1), n.route.id;
}
function GC() {
  var e;
  let t = S.useContext(dy),
    n = HC(Ps.UseRouteError),
    r = vy(Ps.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function QC() {
  let {router: e} = $C(my.UseNavigateStable),
    t = vy(Ps.UseNavigateStable),
    n = S.useRef(!1);
  return (
    hy(() => {
      n.current = !0;
    }),
    S.useCallback(
      function (i, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof i == 'number'
              ? e.navigate(i)
              : e.navigate(i, Es({fromRouteId: t}, o)));
      },
      [e, t],
    )
  );
}
function lu(e) {
  ve(!1);
}
function KC(e) {
  let {
    basename: t = '/',
    children: n = null,
    location: r,
    navigationType: i = Xt.Pop,
    navigator: o,
    static: s = !1,
  } = e;
  Qi() && ve(!1);
  let a = t.replace(/^\/*/, '/'),
    l = S.useMemo(() => ({basename: a, navigator: o, static: s}), [a, o, s]);
  typeof r == 'string' && (r = br(r));
  let {
      pathname: u = '/',
      search: c = '',
      hash: f = '',
      state: d = null,
      key: h = 'default',
    } = r,
    v = S.useMemo(() => {
      let y = Vc(u, a);
      return y == null
        ? null
        : {
            location: {pathname: y, search: c, hash: f, state: d, key: h},
            navigationType: i,
          };
    }, [a, u, c, f, d, h, i]);
  return v == null
    ? null
    : S.createElement(
        Or.Provider,
        {value: l},
        S.createElement(na.Provider, {children: n, value: v}),
      );
}
function qC(e) {
  let {children: t, location: n} = e;
  return DC(uu(t), n);
}
new Promise(() => {});
function uu(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    S.Children.forEach(e, (r, i) => {
      if (!S.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === S.Fragment) {
        n.push.apply(n, uu(r.props.children, o));
        return;
      }
      r.type !== lu && ve(!1), !r.props.index || !r.props.children || ve(!1);
      let s = {
        id: r.props.id || o.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (s.children = uu(r.props.children, o)), n.push(s);
    }),
    n
  );
}
/**
 * React Router DOM v6.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function cu() {
  return (
    (cu = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    cu.apply(this, arguments)
  );
}
function YC(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function XC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function ZC(e, t) {
  return e.button === 0 && (!t || t === '_self') && !XC(e);
}
const JC = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'unstable_viewTransition',
  ],
  e_ = 'startTransition',
  Nh = Vy[e_];
function t_(e) {
  let {basename: t, children: n, future: r, window: i} = e,
    o = S.useRef();
  o.current == null && (o.current = aC({window: i, v5Compat: !0}));
  let s = o.current,
    [a, l] = S.useState({action: s.action, location: s.location}),
    {v7_startTransition: u} = r || {},
    c = S.useCallback(
      f => {
        u && Nh ? Nh(() => l(f)) : l(f);
      },
      [l, u],
    );
  return (
    S.useLayoutEffect(() => s.listen(c), [s, c]),
    S.createElement(KC, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: s,
    })
  );
}
const n_ =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  r_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  i_ = S.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: s,
        state: a,
        target: l,
        to: u,
        preventScrollReset: c,
        unstable_viewTransition: f,
      } = t,
      d = YC(t, JC),
      {basename: h} = S.useContext(Or),
      v,
      y = !1;
    if (typeof u == 'string' && r_.test(u) && ((v = u), n_))
      try {
        let g = new URL(window.location.href),
          w = u.startsWith('//') ? new URL(g.protocol + u) : new URL(u),
          E = Vc(w.pathname, h);
        w.origin === g.origin && E != null
          ? (u = E + w.search + w.hash)
          : (y = !0);
      } catch {}
    let x = LC(u, {relative: i}),
      m = o_(u, {
        replace: s,
        state: a,
        target: l,
        preventScrollReset: c,
        relative: i,
        unstable_viewTransition: f,
      });
    function p(g) {
      r && r(g), g.defaultPrevented || m(g);
    }
    return S.createElement(
      'a',
      cu({}, d, {href: v || x, onClick: y || o ? r : p, ref: n, target: l}),
    );
  });
var jh;
(function (e) {
  (e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState');
})(jh || (jh = {}));
var Dh;
(function (e) {
  (e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration');
})(Dh || (Dh = {}));
function o_(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: s,
      unstable_viewTransition: a,
    } = t === void 0 ? {} : t,
    l = NC(),
    u = ra(),
    c = py(e, {relative: s});
  return S.useCallback(
    f => {
      if (ZC(f, n)) {
        f.preventDefault();
        let d = r !== void 0 ? r : ks(u) === ks(c);
        l(e, {
          replace: d,
          state: i,
          preventScrollReset: o,
          relative: s,
          unstable_viewTransition: a,
        });
      }
    },
    [u, l, c, r, i, n, e, o, s, a],
  );
}
function Ih() {
  return _.jsxs('div', {
    className:
      'flex  flex-col h-[100vh] w-screen overflow-y-hidden bg-light gap-12 my-auto ',
    children: [
      _.jsx(sy, {title: 'Niveles De Niveles', daysHidden: 0, daysReminder: 0}),
      _.jsx('p', {
        className:
          'text-center w-full text-9xl text-dark font-bold my-auto mb-0 font-sans',
        children: '404',
      }),
      _.jsx(i_, {
        to: '/',
        className:
          'text-lg justify-center font-semibold mx-auto my-auto mt-12 bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded',
        children: 'Inicio',
      }),
    ],
  });
}
Xa.createRoot(document.getElementById('root')).render(
  _.jsx(I.StrictMode, {
    children: _.jsx(t_, {
      children: _.jsxs(qC, {
        children: [
          _.jsx(lu, {
            path: '/',
            element: _.jsx(sC, {}),
            errorElement: _.jsx(Ih, {}),
          }),
          _.jsx(lu, {path: '*', element: _.jsx(Ih, {})}),
        ],
      }),
    }),
  }),
);
