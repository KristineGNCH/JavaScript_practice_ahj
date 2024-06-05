!(function () {
  var t = { 207: function () {} },
    e = {};
  function r(n) {
    var o = e[n];
    if (void 0 !== o) return o.exports;
    var s = (e[n] = { exports: {} });
    return t[n](s, s.exports, r), s.exports;
  }
  (r.n = function (t) {
    var e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return r.d(e, { a: e }), e;
  }),
    (r.d = function (t, e) {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (function () {
      "use strict";
      var t = r(207),
        e = r.n(t);
      const n = document.getElementById("form"),
        o = document.getElementById("card_number"),
        s = document.getElementsByName("valid");
      n.addEventListener("submit", (t) => {
        t.preventDefault(), s && s.classList.remove("valid");
        const r = o.value.replace(/\s/g, ""),
          n = document.querySelector(
            `.${
              ((a = r),
              /^4/.test(a)
                ? "visa"
                : /^5[1-5]/.test(a)
                ? "mastercard"
                : /^3[47]/.test(a)
                ? "amex"
                : /^(?:2131|1800|35\d{3})\d{11}/.test(a)
                ? "jcb"
                : /^3(?:0[0-5]|[68])/.test(a)
                ? "diners_club"
                : /^2/.test(a)
                ? "mir"
                : null)
            }`
          );
        var a;
        e()(r)
          ? ((s.textContent = "This card is valid"),
            s.setAttribute("style", "color:green;"),
            n.classList.add("valid"))
          : ((s.textContent = "This card is not valid"),
            s.setAttribute("style", "color:red;"));
      });
    })();
})();
