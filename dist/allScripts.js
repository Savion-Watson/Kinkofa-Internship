(() => {
  var e = {
      98: () => {
        let e, o, n;
        document.addEventListener("DOMContentLoaded", function () {
          !(function (t = !1) {
            const r = document.querySelector(".location-desc").innerHTML;
            var a;
            console.log("idealText ", r),
              (locationInfo = r.split(", ")),
              (e = locationInfo[0]),
              (o = locationInfo[1]),
              (locationInfo.length = 3) && (n = locationInfo[2]),
              (o = o += " County"),
              (a = t ? n + ", " + o + ", " + e : e + ", " + o + ", " + n),
              (document.querySelector(".seo-location-heading").innerHTML =
                "Cemeteries in " + a);
          })(!0);
        });
      },
      376: () => {
        function e(e, o) {
          e.parentElement.style.backgroundColor = `${o}`;
        }
        document.addEventListener("DOMContentLoaded", function () {
          !(function () {
            const o = document.querySelectorAll("*"),
              n = /^tag-\w+$/,
              t = Array.from(o).filter((e) => n.test(e.id));
            console.log(t),
              t.forEach((o) => {
                var n = o.innerHTML.toLowerCase().trim();
                switch ((console.log(n), n)) {
                  case "well-maintained":
                  case "active":
                    e(o, "#C0E0DA");
                    break;
                  case "fair":
                  case "inactive":
                    e(o, yellow);
                    break;
                  case "neglected":
                  case "closed":
                    e(o, "#fdb3b3");
                    break;
                  case "unknown":
                  case "disused":
                    e(o, "#d0d0d0");
                    break;
                  default:
                    e(o, "#ffffff"), console.log("Status not recognized");
                }
              });
          })();
        });
      },
    },
    o = {};
  function n(t) {
    var r = o[t];
    if (void 0 !== r) return r.exports;
    var a = (o[t] = { exports: {} });
    return e[t](a, a.exports, n), a.exports;
  }
  (n.n = (e) => {
    var o = e && e.__esModule ? () => e.default : () => e;
    return n.d(o, { a: o }), o;
  }),
    (n.d = (e, o) => {
      for (var t in o)
        n.o(o, t) &&
          !n.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: o[t] });
    }),
    (n.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o)),
    (() => {
      "use strict";
      n(376), n(98);
    })();
})();
