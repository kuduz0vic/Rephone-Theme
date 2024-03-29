var t = {
    d: (e, r) => {
      for (var o in r)
        t.o(r, o) &&
          !t.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: r[o] });
    },
    o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
  },
  e = {};
t.d(e, {
  x$: () => ct,
  nd: () => dt,
  yF: () => ft,
  fi: () => ut,
  Be: () => lt,
  ih: () => st,
  KJ: () => mt,
  Q4: () => pt,
  WP: () => ht,
  w0: () => yt,
});
const r = [],
  o = [],
  n = [];
function i(t) {
  var e;
  (null === (e = t.options) || void 0 === e ? void 0 : e.newQueue) ||
  0 === n.length
    ? 1 === n.push([t]) && (s(!0), a())
    : n[0].push(t);
}
function a() {
  if (0 === n.length) return void s(!1);
  if (0 === n[0].length) return n.shift(), void a();
  const { requestType: t, body: e, options: o } = n[0][0];
  !(function (t, e, o, n) {
    const i = h(t);
    let a;
    "get" !== t && (a = e || {});
    const s = "get" === t ? "GET" : "POST",
      d = o.info || {},
      l = "firstComplete" in o ? [o.firstComplete] : [],
      f = { requestType: t, endpoint: i, requestBody: a, info: d },
      p = [];
    if (
      (r.forEach((e) => {
        try {
          e({ requestType: t, endpoint: i, info: d, requestBody: a }, (t) => {
            l.push(t);
          });
        } catch (t) {
          console.error(
            "Liquid Ajax Cart: Error during Ajax request subscriber callback in ajax-api"
          ),
            console.error(t);
        }
      }),
      "lastComplete" in o && l.push(o.lastComplete),
      d.cancel)
    )
      return void u(l, n, f);
    if (void 0 !== a) {
      let t;
      if (
        (a instanceof FormData || a instanceof URLSearchParams
          ? a.has("sections") && (t = a.get("sections").toString())
          : (t = a.sections),
        "string" == typeof t || t instanceof String || Array.isArray(t))
      ) {
        const e = [];
        if (
          (Array.isArray(t) ? e.push(...t) : e.push(...t.split(",")),
          e.length > 5)
        ) {
          p.push(...e.slice(5));
          const t = e.slice(0, 5).join(",");
          a instanceof FormData || a instanceof URLSearchParams
            ? a.set("sections", t)
            : (a.sections = t);
        }
      } else
        null != t &&
          console.error(
            `Liquid Ajax Cart: "sections" parameter in a Cart Ajax API request must be a string or an array. Now it is ${t}`
          );
    }
    const m = { method: s };
    "get" !== t &&
      (a instanceof FormData || a instanceof URLSearchParams
        ? ((m.body = a), (m.headers = { "x-requested-with": "XMLHttpRequest" }))
        : ((m.body = JSON.stringify(a)),
          (m.headers = { "Content-Type": "application/json" }))),
      fetch(i, m)
        .then((t) =>
          t.json().then((e) => ({ ok: t.ok, status: t.status, body: e }))
        )
        .then(
          (e) => (
            (f.responseData = e),
            ("add" !== t && 0 === p.length) || !f.responseData.ok
              ? f
              : c(p).then((t) => ((f.extraResponseData = t), f))
          )
        )
        .catch((t) => {
          console.error(
            "Liquid Ajax Cart: Error while performing cart Ajax request"
          ),
            console.error(t),
            (f.fetchError = t);
        })
        .finally(() => {
          u(l, n, f);
        });
  })(t, e, o, () => {
    n[0].shift(), a();
  });
}
function s(t) {
  o.forEach((e) => {
    try {
      e(t);
    } catch (t) {
      console.error(
        "Liquid Ajax Cart: Error during queues subscriber callback in ajax-api"
      ),
        console.error(t);
    }
  });
}
function u(t, e, r) {
  if (
    (t.forEach((t) => {
      try {
        t(r);
      } catch (t) {
        console.error(
          "Liquid Ajax Cart: Error during Ajax request result callback in ajax-api"
        ),
          console.error(t);
      }
    }),
    e)
  )
    try {
      e();
    } catch (t) {
      console.error(
        "Liquid Ajax Cart: Error during Ajax request final internal callback in ajax-api"
      ),
        console.error(t);
    }
}
function c(t = []) {
  const e = {};
  return (
    t.length > 0 && (e.sections = t.slice(0, 5).join(",")),
    fetch(h("update"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    }).then((e) =>
      e.json().then((r) => {
        const o = { ok: e.ok, status: e.status, body: r };
        return t.length < 6
          ? o
          : c(t.slice(5)).then((t) => {
              var e;
              return (
                t.ok &&
                  (null === (e = t.body) || void 0 === e
                    ? void 0
                    : e.sections) &&
                  "object" == typeof t.body.sections &&
                  ("sections" in o.body || (o.body.sections = {}),
                  (o.body.sections = Object.assign(
                    Object.assign({}, o.body.sections),
                    t.body.sections
                  ))),
                o
              );
            });
      })
    )
  );
}
function d(t = {}) {
  i({ requestType: "get", body: void 0, options: t });
}
function l(t = {}, e = {}) {
  i({ requestType: "add", body: t, options: e });
}
function f(t = {}, e = {}) {
  i({ requestType: "change", body: t, options: e });
}
function p(t = {}, e = {}) {
  i({ requestType: "update", body: t, options: e });
}
function m(t = {}, e = {}) {
  i({ requestType: "clear", body: t, options: e });
}
function y(t) {
  r.push(t);
}
function h(t) {
  var e, r, o, n, i, a, s, u, c, d;
  switch (t) {
    case "add":
      return `${
        (null ===
          (r =
            null === (e = window.Shopify) || void 0 === e
              ? void 0
              : e.routes) || void 0 === r
          ? void 0
          : r.root) || "/"
      }cart/add.js`;
    case "change":
      return `${
        (null ===
          (n =
            null === (o = window.Shopify) || void 0 === o
              ? void 0
              : o.routes) || void 0 === n
          ? void 0
          : n.root) || "/"
      }cart/change.js`;
    case "get":
      return `${
        (null ===
          (a =
            null === (i = window.Shopify) || void 0 === i
              ? void 0
              : i.routes) || void 0 === a
          ? void 0
          : a.root) || "/"
      }cart.js`;
    case "clear":
      return `${
        (null ===
          (u =
            null === (s = window.Shopify) || void 0 === s
              ? void 0
              : s.routes) || void 0 === u
          ? void 0
          : u.root) || "/"
      }cart/clear.js`;
    case "update":
      return `${
        (null ===
          (d =
            null === (c = window.Shopify) || void 0 === c
              ? void 0
              : c.routes) || void 0 === d
          ? void 0
          : d.root) || "/"
      }cart/update.js`;
    default:
      return;
  }
}
const b = [];
let g,
  q = null,
  v = { requestInProgress: !1, cartStateSet: !1 };
function A(t) {
  const { attributes: e, items: r, item_count: o } = t;
  if (null == e || "object" != typeof e) return null;
  if ("number" != typeof o && !(o instanceof Number)) return null;
  if (!Array.isArray(r)) return null;
  const n = [];
  for (let t = 0; t < r.length; t++) {
    const e = r[t];
    if ("number" != typeof e.id && !(e.id instanceof Number)) return null;
    if ("string" != typeof e.key && !(e.key instanceof String)) return null;
    if ("number" != typeof e.quantity && !(e.quantity instanceof Number))
      return null;
    if (!("properties" in e)) return null;
    n.push(
      Object.assign(Object.assign({}, e), {
        id: e.id,
        key: e.key,
        quantity: e.quantity,
        properties: e.properties,
      })
    );
  }
  return Object.assign(Object.assign({}, t), {
    attributes: e,
    items: n,
    item_count: o,
  });
}
function C(t) {
  b.push(t);
}
function S() {
  return { cart: q, status: v, previousCart: g };
}
const w = (t) => {
  b.forEach((e) => {
    try {
      e(S(), t);
    } catch (t) {
      console.error(
        "Liquid Ajax Cart: Error during a call of a cart state update subscriber"
      ),
        console.error(t);
    }
  });
};
function j(t) {
  const { binderAttribute: e } = L.computed;
  t.status.cartStateSet &&
    document.querySelectorAll(`[${e}]`).forEach((t) => {
      const r = t.getAttribute(e);
      t.textContent = (function (t) {
        const { stateBinderFormatters: e } = L,
          { binderAttribute: r } = L.computed,
          [o, ...n] = t.split("|");
        let i = x(o, S());
        return (
          n.forEach((t) => {
            const r = t.trim();
            "" !== r &&
              ("object" == typeof e && r in e
                ? (i = e[r](i))
                : r in $
                ? (i = $[r](i))
                : console.warn(
                    `Liquid Ajax Cart: the "${r}" formatter is not found`
                  ));
          }),
          "string" == typeof i ||
          i instanceof String ||
          "number" == typeof i ||
          i instanceof Number
            ? i.toString()
            : (console.error(
                `Liquid Ajax Cart: the calculated value for the ${r}="${t}" element must be string or number. But the value is`,
                i
              ),
              "")
        );
      })(r);
    });
}
function x(t, e) {
  const r = t.split("."),
    o = r.shift().trim();
  return "" !== o && o in e && r.length > 0 ? x(r.join("."), e[o]) : e[o];
}
const $ = {
    money_with_currency: (t) => {
      var e;
      const r = S();
      if ("number" != typeof t && !(t instanceof Number))
        return (
          console.error(
            "Liquid Ajax Cart: the 'money_with_currency' formatter is not applied because the value is not a number. The value is ",
            t
          ),
          t
        );
      const o = t / 100;
      return "Intl" in window &&
        (null === (e = window.Shopify) || void 0 === e ? void 0 : e.locale)
        ? Intl.NumberFormat(window.Shopify.locale, {
            style: "currency",
            currency: r.cart.currency,
          }).format(o)
        : `${o.toFixed(2)} ${r.cart.currency}`;
    },
  },
  L = {
    productFormsFilter: (t) => !0,
    messageBuilder: (t) => {
      let e = "";
      return (
        t.forEach((t) => {
          e += `<div class="js-ajax-cart-message js-ajax-cart-message--${t.type}">${t.text}</div>`;
        }),
        e
      );
    },
    stateBinderFormatters: {},
    addToCartCssClass: "",
    lineItemQuantityErrorText: "You can't add more of this item to your cart",
    requestErrorText:
      "There was an error while updating your cart. Please try again.",
    updateOnWindowFocus: !0,
    computed: {
      productFormsErrorsAttribute: "data-ajax-cart-form-error",
      sectionsAttribute: "data-ajax-cart-section",
      staticElementAttribute: "data-ajax-cart-static-element",
      binderAttribute: "data-ajax-cart-bind-state",
      requestButtonAttribute: "data-ajax-cart-request-button",
      toggleClassButtonAttribute: "data-ajax-cart-toggle-class-button",
      initialStateAttribute: "data-ajax-cart-initial-state",
      sectionScrollAreaAttribute: "data-ajax-cart-section-scroll",
      quantityInputAttribute: "data-ajax-cart-quantity-input",
      propertyInputAttribute: "data-ajax-cart-property-input",
      messagesAttribute: "data-ajax-cart-messages",
      configurationAttribute: "data-ajax-cart-configuration",
      cartStateSetBodyClass: "js-ajax-cart-set",
      requestInProgressBodyClass: "js-ajax-cart-request-in-progress",
      emptyCartBodyClass: "js-ajax-cart-empty",
      notEmptyCartBodyClass: "js-ajax-cart-not-empty",
      productFormsProcessingClass: "js-ajax-cart-form-in-progress",
    },
  };
function E(t, e) {
  t in L && "computed" !== t
    ? ((L[t] = e), "stateBinderFormatters" === t && j(S()))
    : console.error(`Liquid Ajax Cart: unknown configuration parameter "${t}"`);
}
const T = [];
var k, B, R, D, F, N, I, P;
const O = `${
    (null ===
      (B = null === (k = window.Shopify) || void 0 === k ? void 0 : k.routes) ||
    void 0 === B
      ? void 0
      : B.root) || "/"
  }cart/change`,
  U = `${
    (null ===
      (D = null === (R = window.Shopify) || void 0 === R ? void 0 : R.routes) ||
    void 0 === D
      ? void 0
      : D.root) || "/"
  }cart/add`,
  M = `${
    (null ===
      (N = null === (F = window.Shopify) || void 0 === F ? void 0 : F.routes) ||
    void 0 === N
      ? void 0
      : N.root) || "/"
  }cart/clear`,
  H = `${
    (null ===
      (P = null === (I = window.Shopify) || void 0 === I ? void 0 : I.routes) ||
    void 0 === P
      ? void 0
      : P.root) || "/"
  }cart/update`;
function _(t, e) {
  const { requestButtonAttribute: r } = L.computed;
  let o;
  const n = [O, U, M, H];
  if (!t.hasAttribute(r)) return;
  const i = t.getAttribute(r);
  if (i) {
    let t;
    try {
      if (((t = new URL(i, window.location.origin)), !n.includes(t.pathname)))
        throw `URL should be one of the following: ${O}, ${U}, ${H}, ${M}`;
      o = t;
    } catch (t) {
      console.error(
        `Liquid Ajax Cart: ${r} contains an invalid URL as a parameter.`,
        t
      );
    }
  } else if (t instanceof HTMLAnchorElement && t.hasAttribute("href")) {
    const e = new URL(t.href);
    n.includes(e.pathname)
      ? (o = e)
      : t.hasAttribute(r) &&
        console.error(
          `Liquid Ajax Cart: a link with the ${r} contains an invalid href URL.`,
          `URL should be one of the following: ${O}, ${U}, ${H}, ${M}`
        );
  }
  if (void 0 === o)
    return void console.error(
      `Liquid Ajax Cart: a ${r} element doesn't have a valid URL`
    );
  if ((e && e.preventDefault(), S().status.requestInProgress)) return;
  const a = new FormData();
  switch (
    (o.searchParams.forEach((t, e) => {
      a.append(e, t);
    }),
    o.pathname)
  ) {
    case U:
      l(a, { newQueue: !0, info: { initiator: t } });
      break;
    case O:
      f(a, { newQueue: !0, info: { initiator: t } });
      break;
    case H:
      p(a, { newQueue: !0, info: { initiator: t } });
      break;
    case M:
      m({}, { newQueue: !0, info: { initiator: t } });
  }
}
function Q(t, e) {
  let r, o;
  return (
    e.status.cartStateSet &&
      (t.length > 3
        ? ((r = e.cart.items.find((e) => e.key === t)), (o = "id"))
        : ((r = e.cart.items[Number(t) - 1]), (o = "line")),
      void 0 === r &&
        ((r = null),
        console.error(
          `Liquid Ajax Cart: line item with ${o}="${t}" not found`
        ))),
    [r, o]
  );
}
function J(t) {
  const { quantityInputAttribute: e } = L.computed;
  return (
    !!t.hasAttribute(e) &&
    ((t instanceof HTMLInputElement &&
      ("text" === t.type || "number" === t.type)) ||
      (console.error(
        `Liquid Ajax Cart: the ${e} attribute supports "input" elements only with the "text" and the "number" types`
      ),
      !1))
  );
}
function W(t) {
  const { quantityInputAttribute: e } = L.computed;
  t.status.requestInProgress
    ? document.querySelectorAll(`input[${e}]`).forEach((t) => {
        J(t) && (t.disabled = !0);
      })
    : document.querySelectorAll(`input[${e}]`).forEach((r) => {
        if (!J(r)) return;
        const o = r.getAttribute(e).trim(),
          [n] = Q(o, t);
        n ? (r.value = n.quantity.toString()) : null === n && (r.value = "0"),
          (r.disabled = !1);
      });
}
function G(t, e) {
  const { quantityInputAttribute: r } = L.computed;
  if (!J(t)) return;
  if ((e && e.preventDefault(), S().status.requestInProgress)) return;
  let o = Number(t.value.trim());
  const n = t.getAttribute(r).trim();
  if (isNaN(o))
    return void console.error(
      "Liquid Ajax Cart: input value of a data-ajax-cart-quantity-input must be an Integer number"
    );
  if ((o < 1 && (o = 0), !n))
    return void console.error(
      "Liquid Ajax Cart: attribute value of a data-ajax-cart-quantity-input must be an item key or an item index"
    );
  const i = n.length > 3 ? "id" : "line",
    a = new FormData();
  a.set(i, n),
    a.set("quantity", o.toString()),
    f(a, { newQueue: !0, info: { initiator: t } }),
    t.blur();
}
function V(t) {
  const { propertyInputAttribute: e } = L.computed,
    r = t.getAttribute(e),
    o = t.getAttribute("name");
  console.error(
    `Liquid Ajax Cart: the element [${e}="${r}"]${
      o ? `[name="${o}"]` : ""
    } has wrong attributes.`
  );
}
function K(t) {
  const { propertyInputAttribute: e } = L.computed;
  return (
    !!t.hasAttribute(e) &&
    ((t instanceof HTMLInputElement && "hidden" !== t.type) ||
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLSelectElement)
  );
}
function z(t) {
  const { propertyInputAttribute: e } = L.computed,
    r = { objectCode: void 0, propertyName: void 0, attributeValue: void 0 };
  if (!t.hasAttribute(e)) return r;
  let o = t.getAttribute(e).trim();
  if (!o) {
    const e = t.getAttribute("name").trim();
    e && (o = e);
  }
  if (!o) return V(t), r;
  if (((r.attributeValue = o), "note" === o)) return (r.objectCode = "note"), r;
  let [n, ...i] = o.trim().split("[");
  return !i ||
    1 !== i.length ||
    i[0].length < 2 ||
    i[0].indexOf("]") !== i[0].length - 1
    ? (V(t), r)
    : ((r.objectCode = n), (r.propertyName = i[0].replace("]", "")), r);
}
function X(t) {
  const { propertyInputAttribute: e } = L.computed;
  t.status.requestInProgress
    ? document.querySelectorAll(`[${e}]`).forEach((t) => {
        K(t) && (t.disabled = !0);
      })
    : document.querySelectorAll(`[${e}]`).forEach((r) => {
        if (!K(r)) return;
        const { objectCode: o, propertyName: n, attributeValue: i } = z(r);
        if (!o) return;
        if (!t.status.cartStateSet) return;
        let a,
          s = !1;
        if ("note" === o) a = t.cart.note;
        else if ("attributes" === o) a = t.cart.attributes[n];
        else {
          const [r, u] = Q(o, t);
          r && (a = r.properties[n]),
            null === r &&
              (console.error(
                `Liquid Ajax Cart: line item with ${u}="${o}" was not found when the [${e}] element with "${i}" value tried to get updated from the State`
              ),
              (s = !0));
        }
        r instanceof HTMLInputElement &&
        ("checkbox" === r.type || "radio" === r.type)
          ? r.value === a
            ? (r.checked = !0)
            : (r.checked = !1)
          : ("string" == typeof a ||
              a instanceof String ||
              "number" == typeof a ||
              a instanceof Number ||
              (Array.isArray(a) || a instanceof Object
                ? ((a = JSON.stringify(a)),
                  console.warn(
                    `Liquid Ajax Cart: the ${e} with the "${i}" value is bound to the ${n} ${
                      "attributes" === o ? "attribute" : "property"
                    } that is not string or number: ${a}`
                  ))
                : (a = "")),
            (r.value = a)),
          s || (r.disabled = !1);
      });
}
function Y(t, e) {
  const { propertyInputAttribute: r } = L.computed;
  if (!K(t)) return;
  e && e.preventDefault(), t.blur();
  const o = S();
  if (!o.status.cartStateSet) return;
  if (o.status.requestInProgress) return;
  const { objectCode: n, propertyName: i, attributeValue: a } = z(t);
  if (!n) return;
  let s = t.value;
  if (t instanceof HTMLInputElement && "checkbox" === t.type && !t.checked) {
    let t = document.querySelector(`input[type="hidden"][${r}="${a}"]`);
    t ||
      ("note" !== n && "attributes" !== n) ||
      (t = document.querySelector(`input[type="hidden"][${r}][name="${a}"]`)),
      (s = t ? t.value : "");
  }
  if ("note" === n) {
    const e = new FormData();
    e.set("note", s), p(e, { newQueue: !0, info: { initiator: t } });
  } else if ("attributes" === n) {
    const e = new FormData();
    e.set(`attributes[${i}]`, s),
      p(e, { newQueue: !0, info: { initiator: t } });
  } else {
    const [e, u] = Q(n, o);
    if (
      (null === e &&
        console.error(
          `Liquid Ajax Cart: line item with ${u}="${n}" was not found when the [${r}] element with "${a}" value tried to update the cart`
        ),
      !e)
    )
      return;
    const c = Object.assign({}, e.properties);
    c[i] = s;
    const d = new FormData();
    let l = d;
    d.set(u, n), d.set("quantity", e.quantity.toString());
    for (let t in c) {
      const r = c[t];
      "string" == typeof r || r instanceof String
        ? d.set(`properties[${t}]`, c[t])
        : (l = { [u]: n, quantity: e.quantity, properties: c });
    }
    f(l, { newQueue: !0, info: { initiator: t } });
  }
}
function Z(t, e) {
  const { toggleClassButtonAttribute: r } = L.computed;
  if (!t.hasAttribute(r)) return;
  e && e.preventDefault();
  const o = t.getAttribute(r).split("|");
  if (!o)
    return void console.error(
      "Liquid Ajax Cart: Error while toggling body class"
    );
  const n = o[0].trim();
  let i = o[1] ? o[1].trim() : "toggle";
  if (("add" !== i && "remove" !== i && (i = "toggle"), n))
    try {
      "add" === i
        ? document.body.classList.add(n)
        : "remove" === i
        ? document.body.classList.remove(n)
        : document.body.classList.toggle(n);
    } catch (e) {
      console.error("Liquid Ajax Cart: Error while toggling body class:", n),
        console.error(e);
    }
}
const tt = new WeakMap();
function et(t) {
  const e = tt.get(t);
  L.computed.productFormsProcessingClass &&
    (e > 0
      ? t.classList.add(L.computed.productFormsProcessingClass)
      : t.classList.remove(L.computed.productFormsProcessingClass));
}
const rt = (t, e) => {
    e((t) => {
      var e, r;
      const { messagesAttribute: o } = L.computed,
        { lineItemQuantityErrorText: n, messageBuilder: i } = L;
      if (t.info.cancel) return;
      const a = S();
      let s,
        u,
        c,
        d,
        l = 1,
        f = [];
      if (
        (t.requestBody instanceof FormData ||
        t.requestBody instanceof URLSearchParams
          ? (t.requestBody.has("line") &&
              (u = t.requestBody.get("line").toString()),
            t.requestBody.has("id") && (s = t.requestBody.get("id").toString()))
          : ("line" in t.requestBody && (u = String(t.requestBody.line)),
            "id" in t.requestBody && (s = String(t.requestBody.id))),
        u)
      ) {
        const t = Number(u);
        t > 0 &&
          a.status.cartStateSet &&
          ((c = t - 1),
          (s =
            null === (e = a.cart.items[c]) || void 0 === e ? void 0 : e.key));
      }
      if (
        (s &&
          (s.indexOf(":") > -1
            ? (d = document.querySelectorAll(`[${o}="${s}"]`))
            : a.status.cartStateSet &&
              (d = document.querySelectorAll(
                a.cart.items
                  .reduce(
                    (t, e) => (
                      (e.key !== s && e.id !== Number(s)) ||
                        t.push(`[${o}="${e.key}"]`),
                      t
                    ),
                    []
                  )
                  .join(",")
              )),
          d.length > 0 &&
            d.forEach((t) => {
              t.innerHTML = "";
            })),
        null === (r = t.responseData) || void 0 === r ? void 0 : r.ok)
      ) {
        if (!a.previousCart) return;
        (t.requestBody instanceof FormData ||
          t.requestBody instanceof URLSearchParams) &&
        t.requestBody.has("quantity")
          ? (l = Number(t.requestBody.get("quantity").toString()))
          : "quantity" in t.requestBody && (l = Number(t.requestBody.quantity)),
          s &&
            (f = t.responseData.body.items.reduce(
              (t, e) => ((e.key !== s && e.id != Number(s)) || t.push(e), t),
              []
            )),
          f.forEach((e) => {
            !isNaN(l) &&
              e.quantity < l &&
              a.previousCart.item_count === t.responseData.body.item_count &&
              d.forEach((r) => {
                r.getAttribute(o) === e.key &&
                  (r.innerHTML = i([
                    {
                      type: "error",
                      text: n,
                      code: "line_item_quantity_error",
                      requestState: t,
                    },
                  ]));
              });
          });
      } else {
        const e = nt(t);
        d &&
          d.length > 0 &&
          d.forEach((t) => {
            t.innerHTML = i([e]);
          });
      }
    });
  },
  ot = (t, e) => {
    var r;
    const o = null === (r = t.info) || void 0 === r ? void 0 : r.initiator;
    let n;
    o instanceof HTMLFormElement &&
      ((n = o.querySelectorAll(`[${L.computed.messagesAttribute}="form"]`)),
      n.length > 0 &&
        n.forEach((t) => {
          t.innerHTML = "";
        })),
      e((t) => {
        if (t.info.cancel) return;
        const { messageBuilder: e } = L,
          r = nt(t);
        r &&
          n &&
          n.forEach((t) => {
            t.innerHTML = e([r]);
          });
      });
  };
function nt(t) {
  var e;
  const { requestErrorText: r } = L;
  if (!(null === (e = t.responseData) || void 0 === e ? void 0 : e.ok)) {
    if ("responseData" in t) {
      if ("description" in t.responseData.body)
        return {
          type: "error",
          text: t.responseData.body.description,
          code: "shopify_error",
          requestState: t,
        };
      if ("message" in t.responseData.body)
        return {
          type: "error",
          text: t.responseData.body.message,
          code: "shopify_error",
          requestState: t,
        };
    }
    return { type: "error", text: r, code: "request_error", requestState: t };
  }
}
function it(t) {
  const {
    cartStateSetBodyClass: e,
    requestInProgressBodyClass: r,
    emptyCartBodyClass: o,
    notEmptyCartBodyClass: n,
  } = L.computed;
  e &&
    (t.status.cartStateSet
      ? document.body.classList.add(e)
      : document.body.classList.remove(e)),
    r &&
      (t.status.requestInProgress
        ? document.body.classList.add(r)
        : document.body.classList.remove(r)),
    o &&
      (t.status.cartStateSet && 0 === t.cart.item_count
        ? document.body.classList.add(o)
        : document.body.classList.remove(o)),
    n &&
      (t.status.cartStateSet && 0 === t.cart.item_count
        ? document.body.classList.remove(n)
        : document.body.classList.add(n));
}
let at;
if (!("liquidAjaxCart" in window))
  if (
    (function () {
      try {
        if (!("fetch" in window)) return !1;
        if (!("Promise" in window)) return !1;
        if (!("FormData" in window)) return !1;
        if (!("WeakMap" in window)) return !1;
        if (!("DOMParser" in window)) return !1;
        if (!("CustomEvent" in window)) return !1;
        const t = { foo: "barbar" };
        let { foo: e } = t;
        if ("barbar" !== e) return !1;
        const r = new WeakMap();
        if ((r.set(t, "foo"), (e = r.get(t)), !e)) return !1;
        const o = new FormData();
        return o.set("foo", "bar"), (e = o.get("foo").toString()), !!e;
      } catch (t) {
        return console.error(t), !1;
      }
    })()
  ) {
    !(function () {
      const t = document.querySelector(
        `[${L.computed.configurationAttribute}]`
      );
      if (t)
        try {
          const e = JSON.parse(t.textContent),
            r = ["productFormsFilter", "messageBuilder"];
          for (let t in e)
            r.includes(t)
              ? console.error(
                  `Liquid Ajax Cart: the "${t}" parameter is not supported inside the "${L.computed.configurationAttribute}" script — use the "configureCart" function for it`
                )
              : E(t, e[t]);
        } catch (t) {
          console.error(
            `Liquid Ajax Cart: can't parse configuration JSON from the "${L.computed.configurationAttribute}" script`
          ),
            console.error(t);
        }
    })(),
      document.addEventListener("submit", (t) => {
        var e, r;
        const o = t.target;
        let n;
        if (
          new URL(o.action).pathname !==
          `${
            (null ===
              (r =
                null === (e = window.Shopify) || void 0 === e
                  ? void 0
                  : e.routes) || void 0 === r
              ? void 0
              : r.root) || "/"
          }cart/add`
        )
          return;
        if ("productFormsFilter" in L && !L.productFormsFilter(o)) return;
        if ((t.preventDefault(), (n = tt.get(o)), n > 0 || (n = 0), n > 0))
          return;
        const i = new FormData(o);
        tt.set(o, n + 1),
          et(o),
          l(i, {
            lastComplete: (t) => {
              const e = tt.get(o);
              e > 0 && tt.set(o, e - 1), et(o);
            },
            newQueue: !0,
            info: { initiator: o },
          });
      }),
      y((t, e) => {
        const {
          sectionsAttribute: r,
          staticElementAttribute: o,
          sectionScrollAreaAttribute: n,
        } = L.computed;
        if (void 0 !== t.requestBody) {
          const e = [];
          if (
            (document.querySelectorAll(`[${r}]`).forEach((t) => {
              const o = t.closest('[id^="shopify-section-"]');
              if (o) {
                const t = o.id.replace("shopify-section-", "");
                -1 === e.indexOf(t) && e.push(t);
              } else
                console.error(
                  `Liquid Ajax Cart: there is a ${r} element that is not inside a Shopify section. All the ${r} elements must be inside Shopify sections.`
                );
            }),
            e.length)
          ) {
            let r,
              o = e.join(",");
            t.requestBody instanceof FormData ||
            t.requestBody instanceof URLSearchParams
              ? t.requestBody.has("sections") &&
                (r = t.requestBody.get("sections").toString())
              : (r = t.requestBody.sections),
              ((("string" == typeof r || r instanceof String) && "" !== r) ||
                (Array.isArray(r) && r.length > 0)) &&
                (o = `${r.toString()},${o}`),
              t.requestBody instanceof FormData ||
              t.requestBody instanceof URLSearchParams
                ? t.requestBody.set("sections", o)
                : (t.requestBody.sections = o);
          }
        }
        e((t) => {
          var e, r, n;
          const { sectionsAttribute: i, sectionScrollAreaAttribute: a } =
              L.computed,
            s = new DOMParser(),
            u = [];
          if (
            (null === (e = t.responseData) || void 0 === e ? void 0 : e.ok) &&
            "sections" in t.responseData.body
          ) {
            let e = t.responseData.body.sections;
            (null ===
              (n =
                null === (r = t.extraResponseData) || void 0 === r
                  ? void 0
                  : r.body) || void 0 === n
              ? void 0
              : n.sections) &&
              (e = Object.assign(
                Object.assign({}, e),
                t.extraResponseData.body.sections
              ));
            for (let r in e)
              e[r]
                ? document
                    .querySelectorAll(`#shopify-section-${r}`)
                    .forEach((n) => {
                      let c = [];
                      const d = "__noId__",
                        l = {};
                      n.querySelectorAll(` [${a}] `).forEach((t) => {
                        let e = t.getAttribute(a).toString().trim();
                        "" === e && (e = d),
                          e in l || (l[e] = []),
                          l[e].push({
                            scroll: t.scrollTop,
                            height: t.scrollHeight,
                          });
                      });
                      const f = {},
                        p = n.querySelectorAll(`[${o}]`);
                      p &&
                        p.forEach((t) => {
                          let e = t.getAttribute(o).toString().trim();
                          "" === e && (e = d),
                            e in f || (f[e] = []),
                            f[e].push(t);
                        });
                      const m = n.querySelectorAll(`[${i}]`);
                      if (m) {
                        const t = s.parseFromString(e[r], "text/html");
                        for (let e in f)
                          t.querySelectorAll(
                            ` [${o}="${e.replace(d, "")}"] `
                          ).forEach((t, r) => {
                            r + 1 <= f[e].length &&
                              (t.before(f[e][r]),
                              t.parentElement.removeChild(t));
                          });
                        const a = t.querySelectorAll(`[${i}]`);
                        if (m.length !== a.length) {
                          console.error(
                            `Liquid Ajax Cart: the received HTML for the "${r}" section has a different quantity of the "${i}" containers. The section will be updated completely.`
                          );
                          const e = t.querySelector(`#shopify-section-${r}`);
                          if (e) {
                            for (n.innerHTML = ""; e.childNodes.length; )
                              n.appendChild(e.firstChild);
                            c.push(n);
                          }
                        } else
                          m.forEach((t, e) => {
                            t.before(a[e]),
                              t.parentElement.removeChild(t),
                              c.push(a[e]);
                          });
                      }
                      for (let e in l)
                        n.querySelectorAll(
                          ` [${a}="${e.replace(d, "")}"] `
                        ).forEach((r, o) => {
                          o + 1 <= l[e].length &&
                            ("add" !== t.requestType ||
                              l[e][o].height >= r.scrollHeight) &&
                            (r.scrollTop = l[e][o].scroll);
                        });
                      c.length > 0 && u.push({ id: r, elements: c });
                    })
                : console.error(
                    `Liquid Ajax Cart: the HTML for the "${r}" section was requested but the response is ${e[r]}`
                  );
          }
          u.length > 0 &&
            T.length > 0 &&
            T.forEach((t) => {
              try {
                t(u);
              } catch (t) {
                console.error(
                  "Liquid Ajax Cart: Error during a call of a sections update subscriber"
                ),
                  console.error(t);
              }
            });
        });
      }),
      (function () {
        var t;
        (t = (t) => {
          (v.requestInProgress = t), w(!1);
        }),
          o.push(t),
          y((t, e) => {
            e((t) => {
              var e, r;
              let o;
              (null === (e = t.extraResponseData) || void 0 === e
                ? void 0
                : e.ok) && (o = A(t.extraResponseData.body)),
                !o &&
                  (null === (r = t.responseData) || void 0 === r
                    ? void 0
                    : r.ok) &&
                  ("add" === t.requestType
                    ? p()
                    : (o = A(t.responseData.body))),
                o
                  ? ((g = q), (q = o), (v.cartStateSet = !0), w(!0))
                  : null === o &&
                    console.error(
                      "Liquid Ajax Cart: expected to receive the updated cart state but the object is not recognized. The request state:",
                      t
                    );
            });
          });
        const e = document.querySelector(
          `[${L.computed.initialStateAttribute}]`
        );
        if (e)
          try {
            const t = JSON.parse(e.textContent);
            if (((q = A(t)), null === q))
              throw `JSON from ${L.computed.initialStateAttribute} script is not correct cart object`;
            (v.cartStateSet = !0), w(!0);
          } catch (t) {
            console.error(
              `Liquid Ajax Cart: can't parse cart JSON from the "${L.computed.initialStateAttribute}" script. A /cart.js request will be performed to receive the cart state`
            ),
              console.error(t),
              d();
          }
        else d();
      })(),
      C(j),
      j(S()),
      document.addEventListener(
        "click",
        function (t) {
          for (
            let e = t.target;
            e && e != document.documentElement;
            e = e.parentElement
          )
            _(e, t);
        },
        !1
      ),
      document.addEventListener(
        "change",
        function (t) {
          Y(t.target, t);
        },
        !1
      ),
      document.addEventListener(
        "keydown",
        function (t) {
          const e = t.target;
          "Enter" === t.key &&
            ((e instanceof HTMLTextAreaElement && !t.ctrlKey) || Y(e, t)),
            "Escape" === t.key &&
              (function (t) {
                if (!K(t)) return;
                if (
                  !(
                    t instanceof HTMLInputElement ||
                    t instanceof HTMLTextAreaElement
                  )
                )
                  return;
                if (
                  t instanceof HTMLInputElement &&
                  ("checkbox" === t.type || "radio" === t.type)
                )
                  return;
                const e = S();
                if (!e.status.cartStateSet) return void t.blur();
                const { objectCode: r, propertyName: o } = z(t);
                if (!r) return;
                let n;
                if ("note" === r) n = e.cart.note;
                else if ("attributes" === r) n = e.cart.attributes[o];
                else {
                  const [t] = Q(r, e);
                  t && (n = t.properties[o]);
                }
                void 0 !== n &&
                  (n || "string" == typeof n || n instanceof String || (n = ""),
                  (t.value = String(n))),
                  t.blur();
              })(e);
        },
        !1
      ),
      C(X),
      X(S()),
      document.addEventListener(
        "change",
        function (t) {
          G(t.target, t);
        },
        !1
      ),
      document.addEventListener(
        "keydown",
        function (t) {
          "Enter" === t.key && G(t.target, t),
            "Escape" === t.key &&
              (function (t) {
                const { quantityInputAttribute: e } = L.computed;
                if (!J(t)) return;
                const r = t.getAttribute(e).trim();
                let o;
                const n = S();
                if (n.status.cartStateSet) {
                  if (r.length > 3) o = n.cart.items.find((t) => t.key === r);
                  else {
                    const t = Number(r) - 1;
                    o = n.cart.items[t];
                  }
                  o && (t.value = o.quantity.toString());
                }
                t.blur();
              })(t.target);
        },
        !1
      ),
      C(W),
      W(S()),
      document.addEventListener(
        "click",
        function (t) {
          for (
            let e = t.target;
            e && e != document.documentElement;
            e = e.parentElement
          )
            Z(e, t);
        },
        !1
      ),
      C(it),
      it(S()),
      y((t, e) => {
        "add" === t.requestType &&
          e((t) => {
            var e;
            if (null === (e = t.responseData) || void 0 === e ? void 0 : e.ok) {
              const { addToCartCssClass: t } = L;
              let e = "",
                r = 0;
              if (
                ("string" == typeof t || t instanceof String
                  ? (e = t)
                  : Array.isArray(t) &&
                    2 === t.length &&
                    ("string" == typeof t[0] || t[0] instanceof String) &&
                    ("number" == typeof t[1] || t[1] instanceof Number)
                  ? ((e = t[0]),
                    t[1] > 0
                      ? (r = t[1])
                      : console.error(
                          `Liquid Ajax Cart: the addToCartCssClass[1] value must be a positive integer. Now it is ${t[1]}`
                        ))
                  : console.error(
                      'Liquid Ajax Cart: the "addToCartCssClass" configuration parameter must be a string or a [string, number] array'
                    ),
                "" !== e)
              ) {
                try {
                  document.body.classList.add(e);
                } catch (t) {
                  console.error(
                    `Liquid Ajax Cart: error while adding the "${e}" CSS class from the addToCartCssClass parameter to the body tag`
                  ),
                    console.error(t);
                }
                r > 0 &&
                  (void 0 !== at && clearTimeout(at),
                  (at = setTimeout(() => {
                    document.body.classList.remove(e);
                  }, r)));
              }
            }
          });
      }),
      y((t, e) => {
        const r = {};
        (r.add = ot),
          (r.change = rt),
          t.requestType in r && r[t.requestType](t, e);
      }),
      (window.liquidAjaxCart = {
        configureCart: E,
        cartRequestGet: d,
        cartRequestAdd: l,
        cartRequestChange: f,
        cartRequestUpdate: p,
        cartRequestClear: m,
        subscribeToCartAjaxRequests: y,
        getCartState: S,
        subscribeToCartStateUpdate: C,
        subscribeToCartSectionsUpdate: function (t) {
          T.push(t);
        },
      });
    const t = new CustomEvent("liquidAjaxCartInit");
    document.body.dispatchEvent(t),
      window.addEventListener("focus", () => {
        L.updateOnWindowFocus && p({}, {});
      });
  } else
    console.warn("Liquid Ajax Cart is not supported by this browser"),
      (document.body.className += " js-ajax-cart-not-compatible"),
      (window.liquidAjaxCart = {
        configureCart: function () {},
        cartRequestGet: function () {},
        cartRequestAdd: function () {},
        cartRequestChange: function () {},
        cartRequestUpdate: function () {},
        cartRequestClear: function () {},
        subscribeToCartAjaxRequests: function () {},
        getCartState: S,
        subscribeToCartStateUpdate: function () {},
        subscribeToCartSectionsUpdate: function () {},
      });
const st = window.liquidAjaxCart.configureCart,
  ut = window.liquidAjaxCart.cartRequestGet,
  ct = window.liquidAjaxCart.cartRequestAdd,
  dt = window.liquidAjaxCart.cartRequestChange,
  lt = window.liquidAjaxCart.cartRequestUpdate,
  ft = window.liquidAjaxCart.cartRequestClear,
  pt = window.liquidAjaxCart.subscribeToCartAjaxRequests,
  mt = window.liquidAjaxCart.getCartState,
  yt = window.liquidAjaxCart.subscribeToCartStateUpdate,
  ht = window.liquidAjaxCart.subscribeToCartSectionsUpdate;
var bt = e.x$,
  gt = e.nd,
  qt = e.yF,
  vt = e.fi,
  At = e.Be,
  Ct = e.ih,
  St = e.KJ,
  wt = e.Q4,
  jt = e.WP,
  xt = e.w0;
export {
  bt as cartRequestAdd,
  gt as cartRequestChange,
  qt as cartRequestClear,
  vt as cartRequestGet,
  At as cartRequestUpdate,
  Ct as configureCart,
  St as getCartState,
  wt as subscribeToCartAjaxRequests,
  jt as subscribeToCartSectionsUpdate,
  xt as subscribeToCartStateUpdate,
};
