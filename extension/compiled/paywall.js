"use strict";
function _typeof(e) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return a;
  };
  var a = {},
    e = Object.prototype,
    s = e.hasOwnProperty,
    t = "function" == typeof Symbol ? Symbol : {},
    r = t.iterator || "@@iterator",
    n = t.asyncIterator || "@@asyncIterator",
    o = t.toStringTag || "@@toStringTag";
  function i(e, t, n) {
    return (
      Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      e[t]
    );
  }
  try {
    i({}, "");
  } catch (e) {
    i = function (e, t, n) {
      return (e[t] = n);
    };
  }
  function c(e, t, n, r) {
    var o,
      i,
      a,
      c,
      t = t && t.prototype instanceof h ? t : h,
      t = Object.create(t.prototype),
      r = new w(r || []);
    return (
      (t._invoke =
        ((o = e),
        (i = n),
        (a = r),
        (c = "suspendedStart"),
        function (e, t) {
          if ("executing" === c)
            throw new Error("Generator is already running");
          if ("completed" === c) {
            if ("throw" === e) throw t;
            return k();
          }
          for (a.method = e, a.arg = t; ; ) {
            var n = a.delegate;
            if (n) {
              n = (function e(t, n) {
                var r = t.iterator[n.method];
                if (void 0 === r) {
                  if (((n.delegate = null), "throw" === n.method)) {
                    if (
                      t.iterator.return &&
                      ((n.method = "return"),
                      (n.arg = void 0),
                      e(t, n),
                      "throw" === n.method)
                    )
                      return u;
                    (n.method = "throw"),
                      (n.arg = new TypeError(
                        "The iterator does not provide a 'throw' method"
                      ));
                  }
                  return u;
                }
                r = l(r, t.iterator, n.arg);
                if ("throw" === r.type)
                  return (
                    (n.method = "throw"),
                    (n.arg = r.arg),
                    (n.delegate = null),
                    u
                  );
                r = r.arg;
                return r
                  ? r.done
                    ? ((n[t.resultName] = r.value),
                      (n.next = t.nextLoc),
                      "return" !== n.method &&
                        ((n.method = "next"), (n.arg = void 0)),
                      (n.delegate = null),
                      u)
                    : r
                  : ((n.method = "throw"),
                    (n.arg = new TypeError("iterator result is not an object")),
                    (n.delegate = null),
                    u);
              })(n, a);
              if (n) {
                if (n === u) continue;
                return n;
              }
            }
            if ("next" === a.method) a.sent = a._sent = a.arg;
            else if ("throw" === a.method) {
              if ("suspendedStart" === c) throw ((c = "completed"), a.arg);
              a.dispatchException(a.arg);
            } else "return" === a.method && a.abrupt("return", a.arg);
            c = "executing";
            n = l(o, i, a);
            if ("normal" === n.type) {
              if (((c = a.done ? "completed" : "suspendedYield"), n.arg === u))
                continue;
              return { value: n.arg, done: a.done };
            }
            "throw" === n.type &&
              ((c = "completed"), (a.method = "throw"), (a.arg = n.arg));
          }
        })),
      t
    );
  }
  function l(e, t, n) {
    try {
      return { type: "normal", arg: e.call(t, n) };
    } catch (e) {
      return { type: "throw", arg: e };
    }
  }
  a.wrap = c;
  var u = {};
  function h() {}
  function p() {}
  function d() {}
  var t = {},
    y =
      (i(t, r, function () {
        return this;
      }),
      Object.getPrototypeOf),
    y = y && y(y(b([]))),
    f =
      (y && y !== e && s.call(y, r) && (t = y),
      (d.prototype = h.prototype = Object.create(t)));
  function m(e) {
    ["next", "throw", "return"].forEach(function (t) {
      i(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function g(a, c) {
    var t;
    this._invoke = function (n, r) {
      function e() {
        return new c(function (e, t) {
          !(function t(e, n, r, o) {
            var i,
              e = l(a[e], a, n);
            if ("throw" !== e.type)
              return (n = (i = e.arg).value) &&
                "object" == _typeof(n) &&
                s.call(n, "__await")
                ? c.resolve(n.__await).then(
                    function (e) {
                      t("next", e, r, o);
                    },
                    function (e) {
                      t("throw", e, r, o);
                    }
                  )
                : c.resolve(n).then(
                    function (e) {
                      (i.value = e), r(i);
                    },
                    function (e) {
                      return t("throw", e, r, o);
                    }
                  );
            o(e.arg);
          })(n, r, e, t);
        });
      }
      return (t = t ? t.then(e, e) : e());
    };
  }
  function x(e) {
    var t = { tryLoc: e[0] };
    1 in e && (t.catchLoc = e[1]),
      2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
      this.tryEntries.push(t);
  }
  function v(e) {
    var t = e.completion || {};
    (t.type = "normal"), delete t.arg, (e.completion = t);
  }
  function w(e) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      e.forEach(x, this),
      this.reset(!0);
  }
  function b(t) {
    if (t) {
      var n,
        e = t[r];
      if (e) return e.call(t);
      if ("function" == typeof t.next) return t;
      if (!isNaN(t.length))
        return (
          (n = -1),
          ((e = function e() {
            for (; ++n < t.length; )
              if (s.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
            return (e.value = void 0), (e.done = !0), e;
          }).next = e)
        );
    }
    return { next: k };
  }
  function k() {
    return { value: void 0, done: !0 };
  }
  return (
    i(f, "constructor", (p.prototype = d)),
    i(d, "constructor", p),
    (p.displayName = i(d, o, "GeneratorFunction")),
    (a.isGeneratorFunction = function (e) {
      e = "function" == typeof e && e.constructor;
      return (
        !!e && (e === p || "GeneratorFunction" === (e.displayName || e.name))
      );
    }),
    (a.mark = function (e) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(e, d)
          : ((e.__proto__ = d), i(e, o, "GeneratorFunction")),
        (e.prototype = Object.create(f)),
        e
      );
    }),
    (a.awrap = function (e) {
      return { __await: e };
    }),
    m(g.prototype),
    i(g.prototype, n, function () {
      return this;
    }),
    (a.AsyncIterator = g),
    (a.async = function (e, t, n, r, o) {
      void 0 === o && (o = Promise);
      var i = new g(c(e, t, n, r), o);
      return a.isGeneratorFunction(t)
        ? i
        : i.next().then(function (e) {
            return e.done ? e.value : i.next();
          });
    }),
    m(f),
    i(f, o, "Generator"),
    i(f, r, function () {
      return this;
    }),
    i(f, "toString", function () {
      return "[object Generator]";
    }),
    (a.keys = function (n) {
      var e,
        r = [];
      for (e in n) r.push(e);
      return (
        r.reverse(),
        function e() {
          for (; r.length; ) {
            var t = r.pop();
            if (t in n) return (e.value = t), (e.done = !1), e;
          }
          return (e.done = !0), e;
        }
      );
    }),
    (a.values = b),
    (w.prototype = {
      constructor: w,
      reset: function (e) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = void 0),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = void 0),
          this.tryEntries.forEach(v),
          !e)
        )
          for (var t in this)
            "t" === t.charAt(0) &&
              s.call(this, t) &&
              !isNaN(+t.slice(1)) &&
              (this[t] = void 0);
      },
      stop: function () {
        this.done = !0;
        var e = this.tryEntries[0].completion;
        if ("throw" === e.type) throw e.arg;
        return this.rval;
      },
      dispatchException: function (n) {
        if (this.done) throw n;
        var r = this;
        function e(e, t) {
          return (
            (i.type = "throw"),
            (i.arg = n),
            (r.next = e),
            t && ((r.method = "next"), (r.arg = void 0)),
            !!t
          );
        }
        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
          var o = this.tryEntries[t],
            i = o.completion;
          if ("root" === o.tryLoc) return e("end");
          if (o.tryLoc <= this.prev) {
            var a = s.call(o, "catchLoc"),
              c = s.call(o, "finallyLoc");
            if (a && c) {
              if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
              if (this.prev < o.finallyLoc) return e(o.finallyLoc);
            } else if (a) {
              if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
            } else {
              if (!c) throw new Error("try statement without catch or finally");
              if (this.prev < o.finallyLoc) return e(o.finallyLoc);
            }
          }
        }
      },
      abrupt: function (e, t) {
        for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
          var r = this.tryEntries[n];
          if (
            r.tryLoc <= this.prev &&
            s.call(r, "finallyLoc") &&
            this.prev < r.finallyLoc
          ) {
            var o = r;
            break;
          }
        }
        var i = (o =
          o &&
          ("break" === e || "continue" === e) &&
          o.tryLoc <= t &&
          t <= o.finallyLoc
            ? null
            : o)
          ? o.completion
          : {};
        return (
          (i.type = e),
          (i.arg = t),
          o
            ? ((this.method = "next"), (this.next = o.finallyLoc), u)
            : this.complete(i)
        );
      },
      complete: function (e, t) {
        if ("throw" === e.type) throw e.arg;
        return (
          "break" === e.type || "continue" === e.type
            ? (this.next = e.arg)
            : "return" === e.type
            ? ((this.rval = this.arg = e.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === e.type && t && (this.next = t),
          u
        );
      },
      finish: function (e) {
        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
          var n = this.tryEntries[t];
          if (n.finallyLoc === e)
            return this.complete(n.completion, n.afterLoc), v(n), u;
        }
      },
      catch: function (e) {
        for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
          var n,
            r,
            o = this.tryEntries[t];
          if (o.tryLoc === e)
            return (
              "throw" === (n = o.completion).type && ((r = n.arg), v(o)), r
            );
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, t, n) {
        return (
          (this.delegate = { iterator: b(e), resultName: t, nextLoc: n }),
          "next" === this.method && (this.arg = void 0),
          u
        );
      },
    }),
    a
  );
}
function asyncGeneratorStep(e, t, n, r, o, i, a) {
  try {
    var c = e[i](a),
      s = c.value;
  } catch (e) {
    return void n(e);
  }
  c.done ? t(s) : Promise.resolve(s).then(r, o);
}
function _asyncToGenerator(c) {
  return function () {
    var e = this,
      a = arguments;
    return new Promise(function (t, n) {
      var r = c.apply(e, a);
      function o(e) {
        asyncGeneratorStep(r, t, n, o, i, "next", e);
      }
      function i(e) {
        asyncGeneratorStep(r, t, n, o, i, "throw", e);
      }
      o(void 0);
    });
  };
}
!(function (i, u) {
  var h = "undefined",
    t = i.location.href,
    c = [],
    p = {};
  function a() {
    return (a = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t) {
        var n, r;
        return _regeneratorRuntime().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (e.next = 2),
                  fetch("".concat(h, "/api/link?domain=").concat(t))
                );
              case 2:
                return (n = e.sent), (e.next = 5), n.json();
              case 5:
                return (n = e.sent), (r = n.links), e.abrupt("return", r);
              case 8:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  function d(e, t) {
    (e.innerHTML = t),
      Array.from(e.querySelectorAll("script")).forEach(function (e) {
        var t = u.createElement("script");
        Array.from(e.attributes).forEach(function (e) {
          return t.setAttribute(e.name, e.value);
        }),
          t.appendChild(u.createTextNode(e.innerHTML)),
          e.parentNode.replaceChild(t, e);
      });
  }
  function y(e) {
    return "".concat(e.substr(0, 5), "...").concat(e.substr(-3));
  }
  function s(e, l) {
    e.forEach(function (e) {
      var t, n, r, o, i, a, c, s;
      (p[e.hash] = u.querySelector(e.hash).innerHTML),
        d(
          u.querySelector(e.hash),
          ((t = e.hash),
          (n = e.price),
          (r = e.type),
          (o = e.contract_addr),
          (i = e.token_balance),
          (a = e.writer_account),
          (c = l),
          (e = e.link),
          (t =
            "body" == t
              ? '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>✋ :requirement:</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <noscript>\n      <h3>\n        You must have JavaScript enabled in order to use this order form. Please\n        enable JavaScript and then reload this page in order to continue.\n      </h3>\n      <meta\n        http-equiv="refresh"\n        content="0;url"\n        ="https://support.google.com/adsense/answer/12654?hl=en"\n      />\n    </noscript>\n    <style>\n      body {\n        height: 100vh;\n      }\n\n      #paywall-notify {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        font-family: sans-serif;\n        background-color: #eee;\n        border-radius: 20px;\n      }\n\n      #checkout-ctr {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        margin: auto;\n        padding: 20px;\n        margin: auto;\n        border-radius: 5px;\n        background-color: #fff;\n        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),\n          0 4px 6px -4px rgb(0 0 0 / 10%);\n      }\n\n      #checkout-btn {\n        cursor: pointer;\n        display: flex;\n        gap: 10px;\n        justify-content: center;\n        align-items: center;\n        font-family: sans-serif;\n        border: none;\n        border-radius: 5px;\n        width: 100%;\n        width: auto;\n        font-weight: bold;\n        padding: 10px 15px;\n        font-size: 14px;\n        background: #dbeafe;\n        color: #000;\n        margin: auto;\n        margin-top: 12px;\n      }\n\n      .btn-checkout-tx {\n        display: flex !important;\n      }\n\n      .btn-checkout-token {\n        display: none !important;\n      }\n\n      .unlock-requirement {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        gap: 4px;\n        font-size: 12px;\n        margin: 12px 0px;\n        margin-bottom: 0px;\n        color: #999;\n        overflow-wrap: break-word;\n        text-align: center;\n      }\n\n      .app-link {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        font-size: 12px;\n        color: #777;\n        margin-top: 10px;\n        gap: 2px;\n      }\n\n      #install-mm {\n        font-size: 10px;\n        color: #333;\n        margin-top: 10px;\n      }\n\n      #status-svg {\n        display: flex;\n      }\n      a {\n        color: #60a5fa;\n      }\n    </style>\n  </head>\n\n  <body>\n    <div id="paywall-notify">\n  <div id="checkout-ctr">\n    <img\n      src="http://0xwall.app/undraw_xmas_surprise_57p1.png"\n      width="200"\n      alt="Gift box"\n    />\n    <span class="unlock-requirement">\n      <svg\n        stroke="currentColor"\n        fill="none"\n        stroke-width="2"\n        viewBox="0 0 24 24"\n        stroke-linecap="round"\n        stroke-linejoin="round"\n        height="1em"\n        width="1em"\n        xmlns="http://www.w3.org/2000/svg"\n      >\n        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>\n        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>\n      </svg>\n      :requirement:</span\n    >\n    <button id="checkout-btn" class=":btn-style:" onclick="unlockPayWall()">\n      <span id="status-svg">\n        <svg\n          stroke="currentColor"\n          fill="none"\n          stroke-width="2"\n          viewBox="0 0 24 24"\n          stroke-linecap="round"\n          stroke-linejoin="round"\n          height="1em"\n          width="1em"\n          xmlns="http://www.w3.org/2000/svg"\n        >\n          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>\n          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>\n        </svg>\n      </span>\n      <span id="checkout-price"> :price: </span>\n    </button>\n    <div id="install-mm"></div>\n    <div class="app-link">\n      <a href="https://0xwall.app">⚡ 0xwall.app</a>\n    </div>\n  </div>\n</div>\n\n    <script>\n      "use strict";\n\nfunction _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }\nfunction _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a \'throw\' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }\nif (!window.ethereum) {\n  if (!window.navigator.userAgentData.mobile) {\n    document.getElementById("install-mm").innerHTML = "Install <a href=\'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en\' target=\'_blank\'> Metamask </a>";\n  } else {\n    var domainRe = new RegExp("http(s)?://");\n    var domain = window.location.href.replace(domainRe, "");\n    domain = domain.replace("www.", "");\n    document.getElementById("install-mm").innerHTML = "Open in <a href=\'https://metamask.app.link/dapp/" + domain + "\' target=\'_blank\'> Metamask Browser </a>";\n  }\n}\nfunction unlockPayWall() {\n  return _unlockPayWall.apply(this, arguments);\n}\nfunction _unlockPayWall() {\n  _unlockPayWall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var provider, accounts, signer, tx, receipt, addTxResp, _yield$addTxResp$json, success;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!(document.getElementById("checkout-price").innerText !== "Processing")) {\n              _context.next = 24;\n              break;\n            }\n            provider = new ethers.providers.Web3Provider(window.ethereum);\n            _context.next = 4;\n            return provider.send("eth_requestAccounts", []);\n          case 4:\n            accounts = _context.sent;\n            signer = provider.getSigner();\n            _context.next = 8;\n            return signer.sendTransaction({\n              to: ":writer_account:",\n              value: ethers.utils.parseEther(":txprice:"),\n              data: ethers.utils.formatBytes32String(":domain:")\n            });\n          case 8:\n            tx = _context.sent;\n            document.getElementById("checkout-price").innerText = "Processing";\n            document.getElementById("install-mm").innerText = "Don\'t refresh the page";\n            document.getElementById("status-svg").innerHTML = \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle></svg>\';\n            _context.next = 14;\n            return tx.wait();\n          case 14:\n            receipt = _context.sent;\n            if (!receipt) {\n              _context.next = 24;\n              break;\n            }\n            _context.next = 18;\n            return fetch(":api_url:/api/reader", {\n              method: "POST",\n              body: JSON.stringify({\n                reader_account: accounts[0],\n                tx: tx.hash,\n                value: ":txprice:",\n                link: ":link:"\n              })\n            });\n          case 18:\n            addTxResp = _context.sent;\n            _context.next = 21;\n            return addTxResp.json();\n          case 21:\n            _yield$addTxResp$json = _context.sent;\n            success = _yield$addTxResp$json.success;\n            if (success) {\n              document.getElementById("checkout-price").remove();\n              document.getElementById("status-svg").innerHTML = \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>\';\n              window.location.reload();\n            } else {\n              document.getElementById("checkout-price").remove();\n              document.getElementById("status-svg").innerHTML = \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\';\n              window.location.reload();\n            }\n          case 24:\n          case "end":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _unlockPayWall.apply(this, arguments);\n}\n    </script>\n  </body>\n</html>\n'
              : '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>✋ :requirement:</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <noscript>\n      <h3>\n        You must have JavaScript enabled in order to use this order form. Please\n        enable JavaScript and then reload this page in order to continue.\n      </h3>\n      <meta\n        http-equiv="refresh"\n        content="0;url"\n        ="https://support.google.com/adsense/answer/12654?hl=en"\n      />\n    </noscript>\n    <style>\n      body {\n        height: 100vh;\n      }\n\n      #paywall-notify {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        font-family: sans-serif;\n        background-color: #eee;\n        border-radius: 20px;\n      }\n\n      #checkout-ctr {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        margin: auto;\n        padding: 20px;\n        margin: auto;\n        border-radius: 5px;\n        background-color: #fff;\n        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),\n          0 4px 6px -4px rgb(0 0 0 / 10%);\n      }\n\n      #checkout-btn {\n        cursor: pointer;\n        display: flex;\n        gap: 10px;\n        justify-content: center;\n        align-items: center;\n        font-family: sans-serif;\n        border: none;\n        border-radius: 5px;\n        width: 100%;\n        width: auto;\n        font-weight: bold;\n        padding: 10px 15px;\n        font-size: 14px;\n        background: #dbeafe;\n        color: #000;\n        margin: auto;\n        margin-top: 12px;\n      }\n\n      .btn-checkout-tx {\n        display: flex !important;\n      }\n\n      .btn-checkout-token {\n        display: none !important;\n      }\n\n      .unlock-requirement {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        gap: 4px;\n        font-size: 12px;\n        margin: 12px 0px;\n        margin-bottom: 0px;\n        color: #999;\n        overflow-wrap: break-word;\n        text-align: center;\n      }\n\n      .app-link {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        font-size: 12px;\n        color: #777;\n        margin-top: 10px;\n        gap: 2px;\n      }\n\n      #install-mm {\n        font-size: 10px;\n        color: #333;\n        margin-top: 10px;\n      }\n\n      #status-svg {\n        display: flex;\n      }\n      a {\n        color: #60a5fa;\n      }\n    </style>\n  </head>\n\n  <body>\n    <div id="paywall-notify">\n  <div id="checkout-ctr">\n    <span class="unlock-requirement">\n      <svg\n        stroke="currentColor"\n        fill="none"\n        stroke-width="2"\n        viewBox="0 0 24 24"\n        stroke-linecap="round"\n        stroke-linejoin="round"\n        height="1em"\n        width="1em"\n        xmlns="http://www.w3.org/2000/svg"\n      >\n        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>\n        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>\n      </svg>\n      :requirement:</span\n    >\n    <button id="checkout-btn" class=":btn-style:" onclick="unlockPayWall()">\n      <span id="status-svg">\n        <svg\n          stroke="currentColor"\n          fill="none"\n          stroke-width="2"\n          viewBox="0 0 24 24"\n          stroke-linecap="round"\n          stroke-linejoin="round"\n          height="1em"\n          width="1em"\n          xmlns="http://www.w3.org/2000/svg"\n        >\n          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>\n          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>\n        </svg>\n      </span>\n      <span id="checkout-price"> :price: </span>\n    </button>\n    <div class="app-link">\n      <a href="https://0xwall.app">⚡ 0xwall.app</a>\n    </div>\n    <div id="install-mm"></div>\n  </div>\n</div>\n\n    <script>\n      "use strict";\n\nfunction _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }\nfunction _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a \'throw\' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }\nif (!window.ethereum) {\n  if (!window.navigator.userAgentData.mobile) {\n    document.getElementById("install-mm").innerHTML = "Install <a href=\'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en\' target=\'_blank\'> Metamask </a>";\n  } else {\n    var domainRe = new RegExp("http(s)?://");\n    var domain = window.location.href.replace(domainRe, "");\n    domain = domain.replace("www.", "");\n    document.getElementById("install-mm").innerHTML = "Open in <a href=\'https://metamask.app.link/dapp/" + domain + "\' target=\'_blank\'> Metamask Browser </a>";\n  }\n}\nfunction unlockPayWall() {\n  return _unlockPayWall.apply(this, arguments);\n}\nfunction _unlockPayWall() {\n  _unlockPayWall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {\n    var provider, accounts, signer, tx, receipt, addTxResp, _yield$addTxResp$json, success;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!(document.getElementById("checkout-price").innerText !== "Processing")) {\n              _context.next = 24;\n              break;\n            }\n            provider = new ethers.providers.Web3Provider(window.ethereum);\n            _context.next = 4;\n            return provider.send("eth_requestAccounts", []);\n          case 4:\n            accounts = _context.sent;\n            signer = provider.getSigner();\n            _context.next = 8;\n            return signer.sendTransaction({\n              to: ":writer_account:",\n              value: ethers.utils.parseEther(":txprice:"),\n              data: ethers.utils.formatBytes32String(":domain:")\n            });\n          case 8:\n            tx = _context.sent;\n            document.getElementById("checkout-price").innerText = "Processing";\n            document.getElementById("install-mm").innerText = "Don\'t refresh the page";\n            document.getElementById("status-svg").innerHTML = \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle></svg>\';\n            _context.next = 14;\n            return tx.wait();\n          case 14:\n            receipt = _context.sent;\n            if (!receipt) {\n              _context.next = 24;\n              break;\n            }\n            _context.next = 18;\n            return fetch(":api_url:/api/reader", {\n              method: "POST",\n              body: JSON.stringify({\n                reader_account: accounts[0],\n                tx: tx.hash,\n                value: ":txprice:",\n                link: ":link:"\n              })\n            });\n          case 18:\n            addTxResp = _context.sent;\n            _context.next = 21;\n            return addTxResp.json();\n          case 21:\n            _yield$addTxResp$json = _context.sent;\n            success = _yield$addTxResp$json.success;\n            if (success) {\n              document.getElementById("checkout-price").remove();\n              document.getElementById("status-svg").innerHTML = \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>\';\n              window.location.reload();\n            } else {\n              document.getElementById("checkout-price").remove();\n              document.getElementById("status-svg").innerHTML = \'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\';\n              window.location.reload();\n            }\n          case 24:\n          case "end":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _unlockPayWall.apply(this, arguments);\n}\n    </script>\n  </body>\n</html>\n'),
          (r =
            "tx" == r
              ? ((s = "Unlock requires a transaction of "
                  .concat(n, 'Ξ to <a href="https://etherscan.io/address/')
                  .concat(a, '" target="_blank">')
                  .concat(y(a), "</a>")),
                "btn-checkout-tx")
              : ((s = "&nbsp;Unlocking this page requires "
                  .concat(i, " ")
                  .concat(
                    1 < parseInt(i) ? "tokens" : "token",
                    ' of <a href="https://etherscan.io/token/'
                  )
                  .concat(o, '" target="_blank">')
                  .concat(y(o), "</a></span>")),
                "btn-checkout-token")),
          (t = (t = (t = (t = (t = (t = (t = (t = t.replaceAll(
            ":btn-style:",
            r
          )).replaceAll(":price:", "Pay ".concat(n, "Ξ"))).replaceAll(
            ":txprice:",
            n
          )).replaceAll(":requirement:", s)).replaceAll(
            ":writer_account:",
            a
          )).replaceAll(":domain:", c)).replaceAll(":api_url:", h)).replaceAll(
            ":link:",
            encodeURI(e)
          )))
        );
    });
  }
  function l(e) {
    return e.replace("https://", "").replace("http://", "").replace("www.", "");
  }
  function f(e, t) {
    for (var n, r, o = [], i = !1, a = 0; a < t.length; a++)
      (n = e),
        (r = t[a].link),
        (n = new URL("https://".concat(l(n)))),
        (r = new URL("https://".concat(r))),
        "".concat(n.hostname).concat(n.pathname) !=
          "".concat(r.hostname).concat(r.pathname) ||
          c.includes(t[a].link) ||
          ((n = e),
          (r = t[a].link),
          (n = new URL("https://".concat(l(e)))),
          (r = new URL("https://".concat(r))),
          (n.hash != r.hash && !u.querySelector(r.hash)) ||
            ((i = !0),
            o.push({
              hash:
                ((n = t[a].link),
                (r = void 0),
                (n = new URL("https://".concat(n))),
                (r = "body"),
                (r = n.hash
                  ? Boolean(u.querySelector(null == n ? void 0 : n.hash))
                    ? n.hash
                    : "body"
                  : r)),
              link: t[a].link,
              tier_id: t[a].tier_id,
              price: t[a].price,
              type: t[a].type,
              contract_addr: t[a].contract_addr,
              token_balance: t[a].token_balance,
              writer_account: t[a].writer_account,
            })));
    return { paywall: i, elements: o };
  }
  function m() {
    return (m = _asyncToGenerator(
      _regeneratorRuntime().mark(function e(t, n) {
        var r, o;
        return _regeneratorRuntime().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (e.next = 2),
                  fetch(
                    ""
                      .concat(h, "/api/tx?reader_account=")
                      .concat(t, "&domain=")
                      .concat(n)
                  )
                );
              case 2:
                return (r = e.sent), (e.next = 5), r.json();
              case 5:
                return (r = e.sent), (o = r.tier_id), e.abrupt("return", o);
              case 8:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  function g() {
    return (g = _asyncToGenerator(
      _regeneratorRuntime().mark(function e() {
        var t;
        return _regeneratorRuntime().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (t = new ethers.providers.Web3Provider(i.ethereum)),
                  (e.next = 3),
                  t.send("eth_requestAccounts", [])
                );
              case 3:
                return (t = e.sent), e.abrupt("return", t[0]);
              case 5:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  function n() {
    return e.apply(this, arguments);
  }
  function e() {
    return (e = _asyncToGenerator(
      _regeneratorRuntime().mark(function e() {
        var t, n, r, o;
        return _regeneratorRuntime().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  console.log("check paywall"),
                  (t = i.location.hostname.replace("www.", "")),
                  (e.next = 4),
                  (function () {
                    return a.apply(this, arguments);
                  })(t)
                );
              case 4:
                if (
                  ((n = e.sent),
                  (n = f(i.location.href, n)),
                  (r = n.paywall),
                  (n = n.elements),
                  r)
                )
                  if ((s(n, t), i.ethereum))
                    return (
                      (e.next = 11),
                      (function () {
                        return g.apply(this, arguments);
                      })()
                    );
                e.next = 16;
                break;
              case 11:
                return (
                  (r = e.sent),
                  (e.next = 14),
                  (function () {
                    return m.apply(this, arguments);
                  })(r, t)
                );
              case 14:
                (o = e.sent),
                  !(function (e, t) {
                    e.forEach(function (e) {
                      t.includes(e.tier_id) &&
                        (c.push(e.link), d(u.querySelector(e.hash), p[e.hash]));
                    });
                  })(n, o);
              case 16:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  i.addEventListener("load", function (e) {
    console.log("dom has loaded completely");
  }),
    i.addEventListener(
      "hashchange",
      _asyncToGenerator(
        _regeneratorRuntime().mark(function e() {
          return _regeneratorRuntime().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return console.log("on hash changed"), (e.next = 3), n();
                case 3:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      ),
      !1
    ),
    i.addEventListener(
      "click",
      function () {
        requestAnimationFrame(
          _asyncToGenerator(
            _regeneratorRuntime().mark(function e() {
              return _regeneratorRuntime().wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (t !== i.location.href)
                        return (
                          console.log("url changed"),
                          (t = i.location.href),
                          (e.next = 5),
                          n()
                        );
                      e.next = 5;
                      break;
                    case 5:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )
        );
      },
      !0
    ),
    (u.onreadystatechange = function (e) {
      var t;
      "complete" === u.readyState &&
        (console.log("dom has been loaded"),
        ((t = u.createElement("script")).src =
          "https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"),
        u.getElementsByTagName("head")[0].appendChild(t),
        (t.onload = n()));
    });
})(window, document);
