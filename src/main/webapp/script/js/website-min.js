(function(b, m) {
	function d(a) {
		var b = Ma[a] = {};
		return h.each(a.split(da), function(a, E) {
			b[E] = !0
		}), b
	}

	function a(a, b, e) {
		if (e === m && 1 === a.nodeType)
			if (e = "data-" + b.replace(pb, "-$1").toLowerCase(), e = a.getAttribute(e), "string" == typeof e) {
				try {
					e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null : +e + "" === e ? +e : qb.test(e) ? h.parseJSON(e) : e
				} catch (c) {}
				h.data(a, b, e)
			} else e = m;
		return e
	}

	function c(a) {
		for (var b in a)
			if (!("data" === b && h.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
		return !0
	}

	function g() {
		return !1
	}

	function f() {
		return !0
	}

	function e(a) {
		return !a || !a.parentNode || 11 === a.parentNode.nodeType
	}

	function k(a, b) {
		do a = a[b]; while (a && 1 !== a.nodeType);
		return a
	}

	function l(a, b, e) {
		b = b || 0;
		if (h.isFunction(b)) return h.grep(a, function(a, E) {
			return !!b.call(a, E, a) === e
		});
		if (b.nodeType) return h.grep(a, function(a, E) {
			return a === b === e
		});
		if ("string" == typeof b) {
			var c = h.grep(a, function(a) {
				return 1 === a.nodeType
			});
			if (rb.test(b)) return h.filter(b, c, !e);
			b = h.filter(b, c)
		}
		return h.grep(a, function(a, E) {
			return 0 <= h.inArray(a, b) === e
		})
	}

	function r(a) {
		var b = Na.split("|");
		a = a.createDocumentFragment();
		if (a.createElement)
			for (; b.length;) a.createElement(b.pop());
		return a
	}

	function p(a, b) {
		if (1 === b.nodeType && h.hasData(a)) {
			var e, c, f;
			c = h._data(a);
			var d = h._data(b, c),
				k = c.events;
			if (k)
				for (e in delete d.handle, d.events = {}, k) {
					c = 0;
					for (f = k[e].length; c < f; c++) h.event.add(b, e, k[e][c])
				}
			d.data && (d.data = h.extend({}, d.data))
		}
	}

	function n(a, b) {
		var e;
		1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), e = b.nodeName.toLowerCase(), "object" === e ? (b.parentNode &&
			(b.outerHTML = a.outerHTML), h.support.html5Clone && a.innerHTML && !h.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === e && Oa.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === e ? b.selected = a.defaultSelected : "input" === e || "textarea" === e ? b.defaultValue = a.defaultValue : "script" === e && b.text !== a.text && (b.text = a.text), b.removeAttribute(h.expando))
	}

	function u(a) {
		return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ?
			a.querySelectorAll("*") : []
	}

	function q(a) {
		Oa.test(a.type) && (a.defaultChecked = a.checked)
	}

	function v(a, b) {
		if (b in a) return b;
		for (var e = b.charAt(0).toUpperCase() + b.slice(1), c = b, d = Pa.length; d--;)
			if (b = Pa[d] + e, b in a) return b;
		return c
	}

	function A(a, b) {
		return a = b || a, "none" === h.css(a, "display") || !h.contains(a.ownerDocument, a)
	}

	function C(a, b) {
		for (var e, c, d = [], f = 0, k = a.length; f < k; f++) e = a[f], e.style && (d[f] = h._data(e, "olddisplay"), b ? (!d[f] && "none" === e.style.display && (e.style.display = ""), "" === e.style.display && A(e) &&
			(d[f] = h._data(e, "olddisplay", y(e.nodeName)))) : (c = O(e, "display"), !d[f] && "none" !== c && h._data(e, "olddisplay", c)));
		for (f = 0; f < k; f++)
			if (e = a[f], e.style && (!b || "none" === e.style.display || "" === e.style.display)) e.style.display = b ? d[f] || "" : "none";
		return a
	}

	function x(a, b, e) {
		return (a = sb.exec(b)) ? Math.max(0, a[1] - (e || 0)) + (a[2] || "px") : b
	}

	function z(a, b, e, c) {
		b = e === (c ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
		for (var f = 0; 4 > b; b += 2) "margin" === e && (f += h.css(a, e + X[b], !0)), c ? ("content" === e && (f -= parseFloat(O(a, "padding" + X[b])) ||
			0), "margin" !== e && (f -= parseFloat(O(a, "border" + X[b] + "Width")) || 0)) : (f += parseFloat(O(a, "padding" + X[b])) || 0, "padding" !== e && (f += parseFloat(O(a, "border" + X[b] + "Width")) || 0));
		return f
	}

	function D(a, b, e) {
		var c = "width" === b ? a.offsetWidth : a.offsetHeight,
			f = !0,
			d = h.support.boxSizing && "border-box" === h.css(a, "boxSizing");
		if (0 >= c || null == c) {
			c = O(a, b);
			if (0 > c || null == c) c = a.style[b];
			if (sa.test(c)) return c;
			f = d && (h.support.boxSizingReliable || c === a.style[b]);
			c = parseFloat(c) || 0
		}
		return c + z(a, b, e || (d ? "border" : "content"), f) + "px"
	}

	function y(a) {
		if (Ca[a]) return Ca[a];
		var b = h("\x3c" + a + "\x3e").appendTo(w.body),
			e = b.css("display");
		b.remove();
		if ("none" === e || "" === e) {
			Y = w.body.appendChild(Y || h.extend(w.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			}));
			if (!ha || !Y.createElement) ha = (Y.contentWindow || Y.contentDocument).document, ha.write("\x3c!doctype html\x3e\x3chtml\x3e\x3cbody\x3e"), ha.close();
			b = ha.body.appendChild(ha.createElement(a));
			e = O(b, "display");
			w.body.removeChild(Y)
		}
		return Ca[a] = e, e
	}

	function B(a, b, e, c) {
		var f;
		if (h.isArray(b)) h.each(b,
			function(b, f) {
				e || tb.test(a) ? c(a, f) : B(a + "[" + ("object" == typeof f ? b : "") + "]", f, e, c)
			});
		else if (!e && "object" === h.type(b))
			for (f in b) B(a + "[" + f + "]", b[f], e, c);
		else c(a, b)
	}

	function F(a) {
		return function(b, e) {
			"string" != typeof b && (e = b, b = "*");
			var c, f, d = b.toLowerCase().split(da),
				k = 0,
				g = d.length;
			if (h.isFunction(e))
				for (; k < g; k++) c = d[k], (f = /^\+/.test(c)) && (c = c.substr(1) || "*"), c = a[c] = a[c] || [], c[f ? "unshift" : "push"](e)
		}
	}

	function G(a, b, e, c, f, d) {
		f = f || b.dataTypes[0];
		d = d || {};
		d[f] = !0;
		var k;
		f = a[f];
		for (var g = 0, h = f ? f.length : 0,
				l = a === Da; g < h && (l || !k); g++) k = f[g](b, e, c), "string" == typeof k && (!l || d[k] ? k = m : (b.dataTypes.unshift(k), k = G(a, b, e, c, k, d)));
		return (l || !k) && !d["*"] && (k = G(a, b, e, c, "*", d)), k
	}

	function L(a, b) {
		var e, c, f = h.ajaxSettings.flatOptions || {};
		for (e in b) b[e] !== m && ((f[e] ? a : c || (c = {}))[e] = b[e]);
		c && h.extend(!0, a, c)
	}

	function J() {
		try {
			return new b.XMLHttpRequest
		} catch (a) {}
	}

	function Z() {
		return setTimeout(function() {
			ia = m
		}, 0), ia = h.now()
	}

	function ta(a, b) {
		h.each(b, function(b, e) {
			for (var c = (oa[b] || []).concat(oa["*"]), f = 0, d = c.length; f <
				d && !c[f].call(a, b, e); f++);
		})
	}

	function la(a, b, e) {
		var c = 0,
			f = ua.length,
			d = h.Deferred().always(function() {
				delete k.elem
			}),
			k = function() {
				for (var b = ia || Z(), b = Math.max(0, g.startTime + g.duration - b), e = 1 - (b / g.duration || 0), c = 0, f = g.tweens.length; c < f; c++) g.tweens[c].run(e);
				return d.notifyWith(a, [g, e, b]), 1 > e && f ? b : (d.resolveWith(a, [g]), !1)
			}, g = d.promise({
				elem: a,
				props: h.extend({}, b),
				opts: h.extend(!0, {
					specialEasing: {}
				}, e),
				originalProperties: b,
				originalOptions: e,
				startTime: ia || Z(),
				duration: e.duration,
				tweens: [],
				createTween: function(b,
					e, c) {
					b = h.Tween(a, g.opts, b, e, g.opts.specialEasing[b] || g.opts.easing);
					return g.tweens.push(b), b
				},
				stop: function(b) {
					for (var e = 0, c = b ? g.tweens.length : 0; e < c; e++) g.tweens[e].run(1);
					return b ? d.resolveWith(a, [g, b]) : d.rejectWith(a, [g, b]), this
				}
			});
		e = g.props;
		for (aa(e, g.opts.specialEasing); c < f; c++)
			if (b = ua[c].call(g, a, e, g.opts)) return b;
		return ta(g, e), h.isFunction(g.opts.start) && g.opts.start.call(a, g), h.fx.timer(h.extend(k, {
			anim: g,
			queue: g.opts.queue,
			elem: a
		})), g.progress(g.opts.progress).done(g.opts.done, g.opts.complete).fail(g.opts.fail).always(g.opts.always)
	}

	function aa(a, b) {
		var e, c, f, d, k;
		for (e in a)
			if (c = h.camelCase(e), f = b[c], d = a[e], h.isArray(d) && (f = d[1], d = a[e] = d[0]), e !== c && (a[c] = d, delete a[e]), (k = h.cssHooks[c]) && "expand" in k)
				for (e in d = k.expand(d), delete a[c], d) e in a || (a[e] = d[e], b[e] = f);
			else b[c] = f
	}

	function M(a, b, e, c, f) {
		return new M.prototype.init(a, b, e, c, f)
	}

	function V(a, b) {
		var e, c = {
				height: a
			}, f = 0;
		for (b = b ? 1 : 0; 4 > f; f += 2 - b) e = X[f], c["margin" + e] = c["padding" + e] = a;
		return b && (c.opacity = c.width = a), c
	}

	function ba(a) {
		return h.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView ||
			a.parentWindow : !1
	}
	var pa, H, w = b.document,
		N = b.location,
		K = b.navigator,
		wa = b.jQuery,
		qa = b.$,
		ea = Array.prototype.push,
		Q = Array.prototype.slice,
		fa = Array.prototype.indexOf,
		ub = Object.prototype.toString,
		Ea = Object.prototype.hasOwnProperty,
		Fa = String.prototype.trim,
		h = function(a, b) {
			return new h.fn.init(a, b, pa)
		}, xa = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
		vb = /\S/,
		da = /\s+/,
		wb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		xb = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		Qa = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		yb = /^[\],:{}\s]*$/,
		zb =
			/(?:^|:|,)(?:\s*\[)+/g,
		Ab = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		Bb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
		Cb = /^-ms-/,
		Db = /-([\da-z])/gi,
		Eb = function(a, b) {
			return (b + "").toUpperCase()
		}, ya = function() {
			w.addEventListener ? (w.removeEventListener("DOMContentLoaded", ya, !1), h.ready()) : "complete" === w.readyState && (w.detachEvent("onreadystatechange", ya), h.ready())
		}, Ra = {};
	h.fn = h.prototype = {
		constructor: h,
		init: function(a, b, e) {
			var c, f;
			if (!a) return this;
			if (a.nodeType) return this.context = this[0] =
				a, this.length = 1, this;
			if ("string" == typeof a) {
				"\x3c" === a.charAt(0) && "\x3e" === a.charAt(a.length - 1) && 3 <= a.length ? c = [null, a, null] : c = xb.exec(a);
				if (c && (c[1] || !b)) {
					if (c[1]) return b = b instanceof h ? b[0] : b, f = b && b.nodeType ? b.ownerDocument || b : w, a = h.parseHTML(c[1], f, !0), Qa.test(c[1]) && h.isPlainObject(b) && this.attr.call(a, b, !0), h.merge(this, a);
					if ((b = w.getElementById(c[2])) && b.parentNode) {
						if (b.id !== c[2]) return e.find(a);
						this.length = 1;
						this[0] = b
					}
					return this.context = w, this.selector = a, this
				}
				return !b || b.jquery ? (b || e).find(a) :
					this.constructor(b).find(a)
			}
			return h.isFunction(a) ? e.ready(a) : (a.selector !== m && (this.selector = a.selector, this.context = a.context), h.makeArray(a, this))
		},
		selector: "",
		jquery: "1.8.3",
		length: 0,
		size: function() {
			return this.length
		},
		toArray: function() {
			return Q.call(this)
		},
		get: function(a) {
			return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
		},
		pushStack: function(a, b, e) {
			a = h.merge(this.constructor(), a);
			return a.prevObject = this, a.context = this.context, "find" === b ? a.selector = this.selector + (this.selector ? " " :
				"") + e : b && (a.selector = this.selector + "." + b + "(" + e + ")"), a
		},
		each: function(a, b) {
			return h.each(this, a, b)
		},
		ready: function(a) {
			return h.ready.promise().done(a), this
		},
		eq: function(a) {
			return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		slice: function() {
			return this.pushStack(Q.apply(this, arguments), "slice", Q.call(arguments).join(","))
		},
		map: function(a) {
			return this.pushStack(h.map(this, function(b, e) {
				return a.call(b, e, b)
			}))
		},
		end: function() {
			return this.prevObject ||
				this.constructor(null)
		},
		push: ea,
		sort: [].sort,
		splice: [].splice
	};
	h.fn.init.prototype = h.fn;
	h.extend = h.fn.extend = function() {
		var a, b, e, c, f, d, k = arguments[0] || {}, g = 1,
			l = arguments.length,
			n = !1;
		"boolean" == typeof k && (n = k, k = arguments[1] || {}, g = 2);
		"object" != typeof k && !h.isFunction(k) && (k = {});
		for (l === g && (k = this, --g); g < l; g++)
			if (null != (a = arguments[g]))
				for (b in a) e = k[b], c = a[b], k !== c && (n && c && (h.isPlainObject(c) || (f = h.isArray(c))) ? (f ? (f = !1, d = e && h.isArray(e) ? e : []) : d = e && h.isPlainObject(e) ? e : {}, k[b] = h.extend(n, d, c)) : c !==
					m && (k[b] = c));
		return k
	};
	h.extend({
		noConflict: function(a) {
			return b.$ === h && (b.$ = qa), a && b.jQuery === h && (b.jQuery = wa), h
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(a) {
			a ? h.readyWait++ : h.ready(!0)
		},
		ready: function(a) {
			if (!(!0 === a ? --h.readyWait : h.isReady)) {
				if (!w.body) return setTimeout(h.ready, 1);
				h.isReady = !0;
				!0 !== a && 0 < --h.readyWait || (H.resolveWith(w, [h]), h.fn.trigger && h(w).trigger("ready").off("ready"))
			}
		},
		isFunction: function(a) {
			return "function" === h.type(a)
		},
		isArray: Array.isArray || function(a) {
			return "array" ===
				h.type(a)
		},
		isWindow: function(a) {
			return null != a && a == a.window
		},
		isNumeric: function(a) {
			return !isNaN(parseFloat(a)) && isFinite(a)
		},
		type: function(a) {
			return null == a ? String(a) : Ra[ub.call(a)] || "object"
		},
		isPlainObject: function(a) {
			if (!a || "object" !== h.type(a) || a.nodeType || h.isWindow(a)) return !1;
			try {
				if (a.constructor && !Ea.call(a, "constructor") && !Ea.call(a.constructor.prototype, "isPrototypeOf")) return !1
			} catch (b) {
				return !1
			}
			for (var e in a);
			return e === m || Ea.call(a, e)
		},
		isEmptyObject: function(a) {
			for (var b in a) return !1;
			return !0
		},
		error: function(a) {
			throw Error(a);
		},
		parseHTML: function(a, b, e) {
			var c;
			return !a || "string" != typeof a ? null : ("boolean" == typeof b && (e = b, b = 0), b = b || w, (c = Qa.exec(a)) ? [b.createElement(c[1])] : (c = h.buildFragment([a], b, e ? null : []), h.merge([], (c.cacheable ? h.clone(c.fragment) : c.fragment).childNodes)))
		},
		parseJSON: function(a) {
			if (!a || "string" != typeof a) return null;
			a = h.trim(a);
			if (b.JSON && b.JSON.parse) return b.JSON.parse(a);
			if (yb.test(a.replace(Ab, "@").replace(Bb, "]").replace(zb, ""))) return (new Function("return " +
				a))();
			h.error("Invalid JSON: " + a)
		},
		parseXML: function(a) {
			var e, c;
			if (!a || "string" != typeof a) return null;
			try {
				b.DOMParser ? (c = new DOMParser, e = c.parseFromString(a, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(a))
			} catch (f) {
				e = m
			}
			return (!e || !e.documentElement || e.getElementsByTagName("parsererror").length) && h.error("Invalid XML: " + a), e
		},
		noop: function() {},
		globalEval: function(a) {
			a && vb.test(a) && (b.execScript || function(a) {
				b.eval.call(b, a)
			})(a)
		},
		camelCase: function(a) {
			return a.replace(Cb,
				"ms-").replace(Db, Eb)
		},
		nodeName: function(a, b) {
			return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
		},
		each: function(a, b, e) {
			var c, f = 0,
				d = a.length,
				k = d === m || h.isFunction(a);
			if (e)
				if (k)
					for (c in a) {
						if (!1 === b.apply(a[c], e)) break
					} else
						for (; f < d && !1 !== b.apply(a[f++], e););
				else
			if (k)
				for (c in a) {
					if (!1 === b.call(a[c], c, a[c])) break
				} else
					for (; f < d && !1 !== b.call(a[f], f, a[f++]););
			return a
		},
		trim: Fa && !Fa.call("\ufeff\u00a0") ? function(a) {
			return null == a ? "" : Fa.call(a)
		} : function(a) {
			return null == a ? "" : (a + "").replace(wb,
				"")
		},
		makeArray: function(a, b) {
			var e, c = b || [];
			return null != a && (e = h.type(a), null == a.length || "string" === e || "function" === e || "regexp" === e || h.isWindow(a) ? ea.call(c, a) : h.merge(c, a)), c
		},
		inArray: function(a, b, e) {
			var c;
			if (b) {
				if (fa) return fa.call(b, a, e);
				c = b.length;
				for (e = e ? 0 > e ? Math.max(0, c + e) : e : 0; e < c; e++)
					if (e in b && b[e] === a) return e
			}
			return -1
		},
		merge: function(a, b) {
			var e = b.length,
				c = a.length,
				f = 0;
			if ("number" == typeof e)
				for (; f < e; f++) a[c++] = b[f];
			else
				for (; b[f] !== m;) a[c++] = b[f++];
			return a.length = c, a
		},
		grep: function(a, b, e) {
			var c,
				f = [],
				d = 0,
				k = a.length;
			for (e = !! e; d < k; d++) c = !! b(a[d], d), e !== c && f.push(a[d]);
			return f
		},
		map: function(a, b, e) {
			var c, f, d = [],
				k = 0,
				g = a.length;
			if (a instanceof h || g !== m && "number" == typeof g && (0 < g && a[0] && a[g - 1] || 0 === g || h.isArray(a)))
				for (; k < g; k++) c = b(a[k], k, e), null != c && (d[d.length] = c);
			else
				for (f in a) c = b(a[f], f, e), null != c && (d[d.length] = c);
			return d.concat.apply([], d)
		},
		guid: 1,
		proxy: function(a, b) {
			var e, c, f;
			return "string" == typeof b && (e = a[b], b = a, a = e), h.isFunction(a) ? (c = Q.call(arguments, 2), f = function() {
				return a.apply(b,
					c.concat(Q.call(arguments)))
			}, f.guid = a.guid = a.guid || h.guid++, f) : m
		},
		access: function(a, b, e, c, f, d, k) {
			var g, l = null == e,
				n = 0,
				p = a.length;
			if (e && "object" == typeof e) {
				for (n in e) h.access(a, b, n, e[n], 1, d, c);
				f = 1
			} else if (c !== m) {
				g = k === m && h.isFunction(c);
				l && (g ? (g = b, b = function(a, b, e) {
					return g.call(h(a), e)
				}) : (b.call(a, c), b = null));
				if (b)
					for (; n < p; n++) b(a[n], e, g ? c.call(a[n], n, b(a[n], e)) : c, k);
				f = 1
			}
			return f ? a : l ? b.call(a) : p ? b(a[0], e) : d
		},
		now: function() {
			return (new Date).getTime()
		}
	});
	h.ready.promise = function(a) {
		if (!H)
			if (H = h.Deferred(),
				"complete" === w.readyState) setTimeout(h.ready, 1);
			else
		if (w.addEventListener) w.addEventListener("DOMContentLoaded", ya, !1), b.addEventListener("load", h.ready, !1);
		else {
			w.attachEvent("onreadystatechange", ya);
			b.attachEvent("onload", h.ready);
			var e = !1;
			try {
				e = null == b.frameElement && w.documentElement
			} catch (c) {}
			e && e.doScroll && function Ba() {
				if (!h.isReady) {
					try {
						e.doScroll("left")
					} catch (a) {
						return setTimeout(Ba, 50)
					}
					h.ready()
				}
			}()
		}
		return H.promise(a)
	};
	h.each("Boolean Number String Function Array Date RegExp Object".split(" "),
		function(a, b) {
			Ra["[object " + b + "]"] = b.toLowerCase()
		});
	pa = h(w);
	var Ma = {};
	h.Callbacks = function(a) {
		a = "string" == typeof a ? Ma[a] || d(a) : h.extend({}, a);
		var b, e, c, f, k, g, l = [],
			n = !a.once && [],
			p = function(d) {
				b = a.memory && d;
				e = !0;
				g = f || 0;
				f = 0;
				k = l.length;
				for (c = !0; l && g < k; g++)
					if (!1 === l[g].apply(d[0], d[1]) && a.stopOnFalse) {
						b = !1;
						break
					}
				c = !1;
				l && (n ? n.length && p(n.shift()) : b ? l = [] : r.disable())
			}, r = {
				add: function() {
					if (l) {
						var e = l.length;
						(function Fb(b) {
							h.each(b, function(b, e) {
								var c = h.type(e);
								"function" === c ? (!a.unique || !r.has(e)) && l.push(e) :
									e && e.length && "string" !== c && Fb(e)
							})
						})(arguments);
						c ? k = l.length : b && (f = e, p(b))
					}
					return this
				},
				remove: function() {
					return l && h.each(arguments, function(a, b) {
						for (var e; - 1 < (e = h.inArray(b, l, e));) l.splice(e, 1), c && (e <= k && k--, e <= g && g--)
					}), this
				},
				has: function(a) {
					return -1 < h.inArray(a, l)
				},
				empty: function() {
					return l = [], this
				},
				disable: function() {
					return l = n = b = m, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return n = m, b || r.disable(), this
				},
				locked: function() {
					return !n
				},
				fireWith: function(a, b) {
					return b = b || [], b = [a, b.slice ?
						b.slice() : b
					], l && (!e || n) && (c ? n.push(b) : p(b)), this
				},
				fire: function() {
					return r.fireWith(this, arguments), this
				},
				fired: function() {
					return !!e
				}
			};
		return r
	};
	h.extend({
		Deferred: function(a) {
			var b = [
				["resolve", "done", h.Callbacks("once memory"), "resolved"],
				["reject", "fail", h.Callbacks("once memory"), "rejected"],
				["notify", "progress", h.Callbacks("memory")]
			],
				e = "pending",
				c = {
					state: function() {
						return e
					},
					always: function() {
						return f.done(arguments).fail(arguments), this
					},
					then: function() {
						var a = arguments;
						return h.Deferred(function(e) {
							h.each(b,
								function(b, c) {
									var d = c[0],
										E = a[b];
									f[c[1]](h.isFunction(E) ? function() {
										var a = E.apply(this, arguments);
										a && h.isFunction(a.promise) ? a.promise().done(e.resolve).fail(e.reject).progress(e.notify) : e[d + "With"](this === f ? e : this, [a])
									} : e[d])
								});
							a = null
						}).promise()
					},
					promise: function(a) {
						return null != a ? h.extend(a, c) : c
					}
				}, f = {};
			return c.pipe = c.then, h.each(b, function(a, d) {
				var E = d[2],
					k = d[3];
				c[d[1]] = E.add;
				k && E.add(function() {
					e = k
				}, b[a ^ 1][2].disable, b[2][2].lock);
				f[d[0]] = E.fire;
				f[d[0] + "With"] = E.fireWith
			}), c.promise(f), a && a.call(f,
				f), f
		},
		when: function(a) {
			var b = 0,
				e = Q.call(arguments),
				c = e.length,
				f = 1 !== c || a && h.isFunction(a.promise) ? c : 0,
				d = 1 === f ? a : h.Deferred(),
				k = function(a, b, e) {
					return function(c) {
						b[a] = this;
						e[a] = 1 < arguments.length ? Q.call(arguments) : c;
						e === g ? d.notifyWith(b, e) : --f || d.resolveWith(b, e)
					}
				}, g, l, n;
			if (1 < c) {
				g = Array(c);
				l = Array(c);
				for (n = Array(c); b < c; b++) e[b] && h.isFunction(e[b].promise) ? e[b].promise().done(k(b, n, e)).fail(d.reject).progress(k(b, l, g)) : --f
			}
			return f || d.resolveWith(n, e), d.promise()
		}
	});
	h.support = function() {
		var a, e, c,
			f, d, k, g, l, n = w.createElement("div");
		n.setAttribute("className", "t");
		n.innerHTML = "  \x3clink/\x3e\x3ctable\x3e\x3c/table\x3e\x3ca href\x3d'/a'\x3ea\x3c/a\x3e\x3cinput type\x3d'checkbox'/\x3e";
		e = n.getElementsByTagName("*");
		c = n.getElementsByTagName("a")[0];
		if (!e || !c || !e.length) return {};
		f = w.createElement("select");
		d = f.appendChild(w.createElement("option"));
		e = n.getElementsByTagName("input")[0];
		c.style.cssText = "top:1px;float:left;opacity:.5";
		a = {
			leadingWhitespace: 3 === n.firstChild.nodeType,
			tbody: !n.getElementsByTagName("tbody").length,
			htmlSerialize: !! n.getElementsByTagName("link").length,
			style: /top/.test(c.getAttribute("style")),
			hrefNormalized: "/a" === c.getAttribute("href"),
			opacity: /^0.5/.test(c.style.opacity),
			cssFloat: !! c.style.cssFloat,
			checkOn: "on" === e.value,
			optSelected: d.selected,
			getSetAttribute: "t" !== n.className,
			enctype: !! w.createElement("form").enctype,
			html5Clone: "\x3c:nav\x3e\x3c/:nav\x3e" !== w.createElement("nav").cloneNode(!0).outerHTML,
			boxModel: "CSS1Compat" === w.compatMode,
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			boxSizingReliable: !0,
			pixelPosition: !1
		};
		e.checked = !0;
		a.noCloneChecked = e.cloneNode(!0).checked;
		f.disabled = !0;
		a.optDisabled = !d.disabled;
		try {
			delete n.test
		} catch (p) {
			a.deleteExpando = !1
		}!n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", l = function() {
			a.noCloneEvent = !1
		}), n.cloneNode(!0).fireEvent("onclick"), n.detachEvent("onclick", l));
		e = w.createElement("input");
		e.value = "t";
		e.setAttribute("type",
			"radio");
		a.radioValue = "t" === e.value;
		e.setAttribute("checked", "checked");
		e.setAttribute("name", "t");
		n.appendChild(e);
		c = w.createDocumentFragment();
		c.appendChild(n.lastChild);
		a.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
		a.appendChecked = e.checked;
		c.removeChild(e);
		c.appendChild(n);
		if (n.attachEvent)
			for (k in {
				submit: !0,
				change: !0,
				focusin: !0
			}) e = "on" + k, (g = e in n) || (n.setAttribute(e, "return;"), g = "function" == typeof n[e]), a[k + "Bubbles"] = g;
		return h(function() {
			var e, c, f, d, k = w.getElementsByTagName("body")[0];
			k && (e = w.createElement("div"), e.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", k.insertBefore(e, k.firstChild), c = w.createElement("div"), e.appendChild(c), c.innerHTML = "\x3ctable\x3e\x3ctr\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd\x3et\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e", f = c.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", g = 0 === f[0].offsetHeight, f[0].style.display = "", f[1].style.display = "none", a.reliableHiddenOffsets = g && 0 ===
				f[0].offsetHeight, c.innerHTML = "", c.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", a.boxSizing = 4 === c.offsetWidth, a.doesNotIncludeMarginInBodyOffset = 1 !== k.offsetTop, b.getComputedStyle && (a.pixelPosition = "1%" !== (b.getComputedStyle(c, null) || {}).top, a.boxSizingReliable = "4px" === (b.getComputedStyle(c, null) || {
						width: "4px"
					}).width, d = w.createElement("div"), d.style.cssText = c.style.cssText =
					"padding:0;margin:0;border:0;display:block;overflow:hidden;", d.style.marginRight = d.style.width = "0", c.style.width = "1px", c.appendChild(d), a.reliableMarginRight = !parseFloat((b.getComputedStyle(d, null) || {}).marginRight)), "undefined" != typeof c.style.zoom && (c.innerHTML = "", c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", a.inlineBlockNeedsLayout = 3 === c.offsetWidth, c.style.display = "block", c.style.overflow = "visible", c.innerHTML = "\x3cdiv\x3e\x3c/div\x3e",
					c.firstChild.style.width = "5px", a.shrinkWrapBlocks = 3 !== c.offsetWidth, e.style.zoom = 1), k.removeChild(e))
		}), c.removeChild(n), e = c = f = d = e = c = n = null, a
	}();
	var qb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		pb = /([A-Z])/g;
	h.extend({
		cache: {},
		deletedIds: [],
		uuid: 0,
		expando: "jQuery" + (h.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function(a) {
			return a = a.nodeType ? h.cache[a[h.expando]] : a[h.expando], !! a && !c(a)
		},
		data: function(a, b, e, c) {
			if (h.acceptData(a)) {
				var f,
					d, k = h.expando,
					g = "string" == typeof b,
					l = a.nodeType,
					n = l ? h.cache : a,
					p = l ? a[k] : a[k] && k;
				if (p && n[p] && (c || n[p].data) || !(g && e === m)) {
					p || (l ? a[k] = p = h.deletedIds.pop() || h.guid++ : p = k);
					n[p] || (n[p] = {}, l || (n[p].toJSON = h.noop));
					if ("object" == typeof b || "function" == typeof b) c ? n[p] = h.extend(n[p], b) : n[p].data = h.extend(n[p].data, b);
					return f = n[p], c || (f.data || (f.data = {}), f = f.data), e !== m && (f[h.camelCase(b)] = e), g ? (d = f[b], null == d && (d = f[h.camelCase(b)])) : d = f, d
				}
			}
		},
		removeData: function(a, b, e) {
			if (h.acceptData(a)) {
				var f, d, k, g = a.nodeType,
					l = g ? h.cache : a,
					n = g ? a[h.expando] : h.expando;
				if (l[n]) {
					if (b && (f = e ? l[n] : l[n].data)) {
						h.isArray(b) || (b in f ? b = [b] : (b = h.camelCase(b), b in f ? b = [b] : b = b.split(" ")));
						d = 0;
						for (k = b.length; d < k; d++) delete f[b[d]];
						if (!(e ? c : h.isEmptyObject)(f)) return
					}
					if (!e && (delete l[n].data, !c(l[n]))) return;
					g ? h.cleanData([a], !0) : h.support.deleteExpando || l != l.window ? delete l[n] : l[n] = null
				}
			}
		},
		_data: function(a, b, e) {
			return h.data(a, b, e, !0)
		},
		acceptData: function(a) {
			var b = a.nodeName && h.noData[a.nodeName.toLowerCase()];
			return !b || !0 !== b && a.getAttribute("classid") ===
				b
		}
	});
	h.fn.extend({
		data: function(b, e) {
			var c, f, d, k, g, l = this[0],
				n = 0,
				p = null;
			if (b === m) {
				if (this.length && (p = h.data(l), 1 === l.nodeType && !h._data(l, "parsedAttrs"))) {
					d = l.attributes;
					for (g = d.length; n < g; n++) k = d[n].name, k.indexOf("data-") || (k = h.camelCase(k.substring(5)), a(l, k, p[k]));
					h._data(l, "parsedAttrs", !0)
				}
				return p
			}
			return "object" == typeof b ? this.each(function() {
				h.data(this, b)
			}) : (c = b.split(".", 2), c[1] = c[1] ? "." + c[1] : "", f = c[1] + "!", h.access(this, function(e) {
				if (e === m) return p = this.triggerHandler("getData" + f, [c[0]]),
				p === m && l && (p = h.data(l, b), p = a(l, b, p)), p === m && c[1] ? this.data(c[0]) : p;
				c[1] = e;
				this.each(function() {
					var a = h(this);
					a.triggerHandler("setData" + f, c);
					h.data(this, b, e);
					a.triggerHandler("changeData" + f, c)
				})
			}, null, e, 1 < arguments.length, null, !1))
		},
		removeData: function(a) {
			return this.each(function() {
				h.removeData(this, a)
			})
		}
	});
	h.extend({
		queue: function(a, b, e) {
			var c;
			if (a) return b = (b || "fx") + "queue", c = h._data(a, b), e && (!c || h.isArray(e) ? c = h._data(a, b, h.makeArray(e)) : c.push(e)), c || []
		},
		dequeue: function(a, b) {
			b = b || "fx";
			var e =
				h.queue(a, b),
				c = e.length,
				f = e.shift(),
				d = h._queueHooks(a, b),
				k = function() {
					h.dequeue(a, b)
				};
			"inprogress" === f && (f = e.shift(), c--);
			f && ("fx" === b && e.unshift("inprogress"), delete d.stop, f.call(a, k, d));
			!c && d && d.empty.fire()
		},
		_queueHooks: function(a, b) {
			var e = b + "queueHooks";
			return h._data(a, e) || h._data(a, e, {
				empty: h.Callbacks("once memory").add(function() {
					h.removeData(a, b + "queue", !0);
					h.removeData(a, e, !0)
				})
			})
		}
	});
	h.fn.extend({
		queue: function(a, b) {
			var e = 2;
			return "string" != typeof a && (b = a, a = "fx", e--), arguments.length < e ?
				h.queue(this[0], a) : b === m ? this : this.each(function() {
					var e = h.queue(this, a, b);
					h._queueHooks(this, a);
					"fx" === a && "inprogress" !== e[0] && h.dequeue(this, a)
				})
		},
		dequeue: function(a) {
			return this.each(function() {
				h.dequeue(this, a)
			})
		},
		delay: function(a, b) {
			return a = h.fx ? h.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, e) {
				var c = setTimeout(b, a);
				e.stop = function() {
					clearTimeout(c)
				}
			})
		},
		clearQueue: function(a) {
			return this.queue(a || "fx", [])
		},
		promise: function(a, b) {
			var e, c = 1,
				f = h.Deferred(),
				d = this,
				k = this.length,
				g = function() {
					--c ||
						f.resolveWith(d, [d])
				};
			"string" != typeof a && (b = a, a = m);
			for (a = a || "fx"; k--;)(e = h._data(d[k], a + "queueHooks")) && e.empty && (c++, e.empty.add(g));
			return g(), f.promise(b)
		}
	});
	var ca, Sa, Ta, Ua = /[\t\r\n]/g,
		Gb = /\r/g,
		Hb = /^(?:button|input)$/i,
		Ib = /^(?:button|input|object|select|textarea)$/i,
		Jb = /^a(?:rea|)$/i,
		Va = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		Wa = h.support.getSetAttribute;
	h.fn.extend({
		attr: function(a, b) {
			return h.access(this,
				h.attr, a, b, 1 < arguments.length)
		},
		removeAttr: function(a) {
			return this.each(function() {
				h.removeAttr(this, a)
			})
		},
		prop: function(a, b) {
			return h.access(this, h.prop, a, b, 1 < arguments.length)
		},
		removeProp: function(a) {
			return a = h.propFix[a] || a, this.each(function() {
				try {
					this[a] = m, delete this[a]
				} catch (b) {}
			})
		},
		addClass: function(a) {
			var b, e, c, f, d, k, g;
			if (h.isFunction(a)) return this.each(function(b) {
				h(this).addClass(a.call(this, b, this.className))
			});
			if (a && "string" == typeof a) {
				b = a.split(da);
				e = 0;
				for (c = this.length; e < c; e++)
					if (f =
						this[e], 1 === f.nodeType)
						if (!f.className && 1 === b.length) f.className = a;
						else {
							d = " " + f.className + " ";
							k = 0;
							for (g = b.length; k < g; k++) 0 > d.indexOf(" " + b[k] + " ") && (d += b[k] + " ");
							f.className = h.trim(d)
						}
			}
			return this
		},
		removeClass: function(a) {
			var b, e, c, f, d, k, g;
			if (h.isFunction(a)) return this.each(function(b) {
				h(this).removeClass(a.call(this, b, this.className))
			});
			if (a && "string" == typeof a || a === m) {
				b = (a || "").split(da);
				k = 0;
				for (g = this.length; k < g; k++)
					if (c = this[k], 1 === c.nodeType && c.className) {
						e = (" " + c.className + " ").replace(Ua,
							" ");
						f = 0;
						for (d = b.length; f < d; f++)
							for (; 0 <= e.indexOf(" " + b[f] + " ");) e = e.replace(" " + b[f] + " ", " ");
						c.className = a ? h.trim(e) : ""
					}
			}
			return this
		},
		toggleClass: function(a, b) {
			var e = typeof a,
				c = "boolean" == typeof b;
			return h.isFunction(a) ? this.each(function(e) {
				h(this).toggleClass(a.call(this, e, this.className, b), b)
			}) : this.each(function() {
				if ("string" === e)
					for (var f, d = 0, k = h(this), g = b, l = a.split(da); f = l[d++];) g = c ? g : !k.hasClass(f), k[g ? "addClass" : "removeClass"](f);
				else if ("undefined" === e || "boolean" === e) this.className && h._data(this,
					"__className__", this.className), this.className = this.className || !1 === a ? "" : h._data(this, "__className__") || ""
			})
		},
		hasClass: function(a) {
			a = " " + a + " ";
			for (var b = 0, e = this.length; b < e; b++)
				if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Ua, " ").indexOf(a)) return !0;
			return !1
		},
		val: function(a) {
			var b, e, c, f = this[0];
			if (arguments.length) return c = h.isFunction(a), this.each(function(e) {
				var f, d = h(this);
				if (1 === this.nodeType && (c ? f = a.call(this, e, d.val()) : f = a, null == f ? f = "" : "number" == typeof f ? f += "" : h.isArray(f) &&
					(f = h.map(f, function(a) {
						return null == a ? "" : a + ""
					})), b = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()], !b || !("set" in b) || b.set(this, f, "value") === m)) this.value = f
			});
			if (f) return b = h.valHooks[f.type] || h.valHooks[f.nodeName.toLowerCase()], b && "get" in b && (e = b.get(f, "value")) !== m ? e : (e = f.value, "string" == typeof e ? e.replace(Gb, "") : null == e ? "" : e)
		}
	});
	h.extend({
		valHooks: {
			option: {
				get: function(a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			},
			select: {
				get: function(a) {
					for (var b, e = a.options,
							c = a.selectedIndex, f = (a = "select-one" === a.type || 0 > c) ? null : [], d = a ? c + 1 : e.length, k = 0 > c ? d : a ? c : 0; k < d; k++)
						if (b = e[k], (b.selected || k === c) && (h.support.optDisabled ? !b.disabled : null === b.getAttribute("disabled")) && (!b.parentNode.disabled || !h.nodeName(b.parentNode, "optgroup"))) {
							b = h(b).val();
							if (a) return b;
							f.push(b)
						}
					return f
				},
				set: function(a, b) {
					var e = h.makeArray(b);
					return h(a).find("option").each(function() {
						this.selected = 0 <= h.inArray(h(this).val(), e)
					}), e.length || (a.selectedIndex = -1), e
				}
			}
		},
		attrFn: {},
		attr: function(a,
			b, e, c) {
			var f, d, k = a.nodeType;
			if (a && !(3 === k || 8 === k || 2 === k)) {
				if (c && h.isFunction(h.fn[b])) return h(a)[b](e);
				if ("undefined" == typeof a.getAttribute) return h.prop(a, b, e);
				(c = 1 !== k || !h.isXMLDoc(a)) && (b = b.toLowerCase(), d = h.attrHooks[b] || (Va.test(b) ? Sa : ca));
				if (e !== m) {
					if (null === e) {
						h.removeAttr(a, b);
						return
					}
					return d && "set" in d && c && (f = d.set(a, e, b)) !== m ? f : (a.setAttribute(b, e + ""), e)
				}
				return d && "get" in d && c && null !== (f = d.get(a, b)) ? f : (f = a.getAttribute(b), null === f ? m : f)
			}
		},
		removeAttr: function(a, b) {
			var e, c, f, d, k = 0;
			if (b &&
				1 === a.nodeType)
				for (c = b.split(da); k < c.length; k++)(f = c[k]) && (e = h.propFix[f] || f, d = Va.test(f), d || h.attr(a, f, ""), a.removeAttribute(Wa ? f : e), d && e in a && (a[e] = !1))
		},
		attrHooks: {
			type: {
				set: function(a, b) {
					if (Hb.test(a.nodeName) && a.parentNode) h.error("type property can't be changed");
					else if (!h.support.radioValue && "radio" === b && h.nodeName(a, "input")) {
						var e = a.value;
						return a.setAttribute("type", b), e && (a.value = e), b
					}
				}
			},
			value: {
				get: function(a, b) {
					return ca && h.nodeName(a, "button") ? ca.get(a, b) : b in a ? a.value : null
				},
				set: function(a,
					b, e) {
					if (ca && h.nodeName(a, "button")) return ca.set(a, b, e);
					a.value = b
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function(a, b, e) {
			var c, f, d, k = a.nodeType;
			if (a && !(3 === k || 8 === k || 2 === k)) return d = 1 !== k || !h.isXMLDoc(a), d && (b = h.propFix[b] || b, f = h.propHooks[b]), e !== m ? f && "set" in
				f && (c = f.set(a, e, b)) !== m ? c : a[b] = e : f && "get" in f && null !== (c = f.get(a, b)) ? c : a[b]
		},
		propHooks: {
			tabIndex: {
				get: function(a) {
					var b = a.getAttributeNode("tabindex");
					return b && b.specified ? parseInt(b.value, 10) : Ib.test(a.nodeName) || Jb.test(a.nodeName) && a.href ? 0 : m
				}
			}
		}
	});
	Sa = {
		get: function(a, b) {
			var e, c = h.prop(a, b);
			return !0 === c || "boolean" != typeof c && (e = a.getAttributeNode(b)) && !1 !== e.nodeValue ? b.toLowerCase() : m
		},
		set: function(a, b, e) {
			var c;
			return !1 === b ? h.removeAttr(a, e) : (c = h.propFix[e] || e, c in a && (a[c] = !0), a.setAttribute(e,
				e.toLowerCase())), e
		}
	};
	Wa || (Ta = {
		name: !0,
		id: !0,
		coords: !0
	}, ca = h.valHooks.button = {
		get: function(a, b) {
			var e;
			return e = a.getAttributeNode(b), e && (Ta[b] ? "" !== e.value : e.specified) ? e.value : m
		},
		set: function(a, b, e) {
			var c = a.getAttributeNode(e);
			return c || (c = w.createAttribute(e), a.setAttributeNode(c)), c.value = b + ""
		}
	}, h.each(["width", "height"], function(a, b) {
		h.attrHooks[b] = h.extend(h.attrHooks[b], {
			set: function(a, e) {
				if ("" === e) return a.setAttribute(b, "auto"), e
			}
		})
	}), h.attrHooks.contenteditable = {
		get: ca.get,
		set: function(a,
			b, e) {
			"" === b && (b = "false");
			ca.set(a, b, e)
		}
	});
	h.support.hrefNormalized || h.each(["href", "src", "width", "height"], function(a, b) {
		h.attrHooks[b] = h.extend(h.attrHooks[b], {
			get: function(a) {
				a = a.getAttribute(b, 2);
				return null === a ? m : a
			}
		})
	});
	h.support.style || (h.attrHooks.style = {
		get: function(a) {
			return a.style.cssText.toLowerCase() || m
		},
		set: function(a, b) {
			return a.style.cssText = b + ""
		}
	});
	h.support.optSelected || (h.propHooks.selected = h.extend(h.propHooks.selected, {
		get: function(a) {
			a = a.parentNode;
			return a && (a.selectedIndex,
				a.parentNode && a.parentNode.selectedIndex), null
		}
	}));
	h.support.enctype || (h.propFix.enctype = "encoding");
	h.support.checkOn || h.each(["radio", "checkbox"], function() {
		h.valHooks[this] = {
			get: function(a) {
				return null === a.getAttribute("value") ? "on" : a.value
			}
		}
	});
	h.each(["radio", "checkbox"], function() {
		h.valHooks[this] = h.extend(h.valHooks[this], {
			set: function(a, b) {
				if (h.isArray(b)) return a.checked = 0 <= h.inArray(h(a).val(), b)
			}
		})
	});
	var Ga = /^(?:textarea|input|select)$/i,
		Xa = /^([^\.]*|)(?:\.(.+)|)$/,
		Kb = /(?:^|\s)hover(\.\S+|)\b/,
		Lb = /^key/,
		Mb = /^(?:mouse|contextmenu)|click/,
		Ya = /^(?:focusinfocus|focusoutblur)$/,
		Za = function(a) {
			return h.event.special.hover ? a : a.replace(Kb, "mouseenter$1 mouseleave$1")
		};
	h.event = {
		add: function(a, b, e, c, f) {
			var d, k, g, l, n, p, r, q, u;
			if (!(3 === a.nodeType || 8 === a.nodeType || !b || !e || !(d = h._data(a)))) {
				e.handler && (r = e, e = r.handler, f = r.selector);
				e.guid || (e.guid = h.guid++);
				(g = d.events) || (d.events = g = {});
				(k = d.handle) || (d.handle = k = function(a) {
					return "undefined" == typeof h || a && h.event.triggered === a.type ? m : h.event.dispatch.apply(k.elem,
						arguments)
				}, k.elem = a);
				b = h.trim(Za(b)).split(" ");
				for (d = 0; d < b.length; d++) {
					l = Xa.exec(b[d]) || [];
					n = l[1];
					p = (l[2] || "").split(".").sort();
					u = h.event.special[n] || {};
					n = (f ? u.delegateType : u.bindType) || n;
					u = h.event.special[n] || {};
					l = h.extend({
						type: n,
						origType: l[1],
						data: c,
						handler: e,
						guid: e.guid,
						selector: f,
						needsContext: f && h.expr.match.needsContext.test(f),
						namespace: p.join(".")
					}, r);
					q = g[n];
					if (!q && (q = g[n] = [], q.delegateCount = 0, !u.setup || !1 === u.setup.call(a, c, p, k))) a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent &&
						a.attachEvent("on" + n, k);
					u.add && (u.add.call(a, l), l.handler.guid || (l.handler.guid = e.guid));
					f ? q.splice(q.delegateCount++, 0, l) : q.push(l);
					h.event.global[n] = !0
				}
				a = null
			}
		},
		global: {},
		remove: function(a, b, e, c, f) {
			var d, k, g, l, n, p, r, q, u, v, m = h.hasData(a) && h._data(a);
			if (m && (r = m.events)) {
				b = h.trim(Za(b || "")).split(" ");
				for (d = 0; d < b.length; d++)
					if (k = Xa.exec(b[d]) || [], g = l = k[1], k = k[2], g) {
						q = h.event.special[g] || {};
						g = (c ? q.delegateType : q.bindType) || g;
						u = r[g] || [];
						n = u.length;
						k = k ? RegExp("(^|\\.)" + k.split(".").sort().join("\\.(?:.*\\.|)") +
							"(\\.|$)") : null;
						for (p = 0; p < u.length; p++) v = u[p], (f || l === v.origType) && (!e || e.guid === v.guid) && (!k || k.test(v.namespace)) && (!c || c === v.selector || "**" === c && v.selector) && (u.splice(p--, 1), v.selector && u.delegateCount--, q.remove && q.remove.call(a, v));
						0 === u.length && n !== u.length && ((!q.teardown || !1 === q.teardown.call(a, k, m.handle)) && h.removeEvent(a, g, m.handle), delete r[g])
					} else
						for (g in r) h.event.remove(a, g + b[d], e, c, !0);
				h.isEmptyObject(r) && (delete m.handle, h.removeData(a, "events", !0))
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function(a, e, c, f) {
			if (!c || 3 !== c.nodeType && 8 !== c.nodeType) {
				var d, k, g, l, n, p, r, q = a.type || a;
				l = [];
				if (!Ya.test(q + h.event.triggered) && (0 <= q.indexOf("!") && (q = q.slice(0, -1), d = !0), 0 <= q.indexOf(".") && (l = q.split("."), q = l.shift(), l.sort()), c && !h.event.customEvent[q] || h.event.global[q]))
					if (a = "object" == typeof a ? a[h.expando] ? a : new h.Event(q, a) : new h.Event(q), a.type = q, a.isTrigger = !0, a.exclusive = d, a.namespace = l.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + l.join("\\.(?:.*\\.|)") + "(\\.|$)") :
						null, l = 0 > q.indexOf(":") ? "on" + q : "", c) {
						if (a.result = m, a.target || (a.target = c), e = null != e ? h.makeArray(e) : [], e.unshift(a), n = h.event.special[q] || {}, !(n.trigger && !1 === n.trigger.apply(c, e))) {
							r = [
								[c, n.bindType || q]
							];
							if (!f && !n.noBubble && !h.isWindow(c)) {
								k = n.delegateType || q;
								d = Ya.test(k + q) ? c : c.parentNode;
								for (g = c; d; d = d.parentNode) r.push([d, k]), g = d;
								g === (c.ownerDocument || w) && r.push([g.defaultView || g.parentWindow || b, k])
							}
							for (k = 0; k < r.length && !a.isPropagationStopped(); k++) d = r[k][0], a.type = r[k][1], (p = (h._data(d, "events") || {})[a.type] && h._data(d, "handle")) && p.apply(d, e), (p = l && d[l]) && h.acceptData(d) && p.apply && !1 === p.apply(d, e) && a.preventDefault();
							return a.type = q, !f && !a.isDefaultPrevented() && (!n._default || !1 === n._default.apply(c.ownerDocument, e)) && ("click" !== q || !h.nodeName(c, "a")) && h.acceptData(c) && l && c[q] && ("focus" !== q && "blur" !== q || 0 !== a.target.offsetWidth) && !h.isWindow(c) && (g = c[l], g && (c[l] = null), h.event.triggered = q, c[q](), h.event.triggered = m, g && (c[l] = g)), a.result
						}
					} else
						for (k in c = h.cache, c) c[k].events && c[k].events[q] &&
							h.event.trigger(a, e, c[k].handle.elem, !0)
			}
		},
		dispatch: function(a) {
			a = h.event.fix(a || b.event);
			var e, c, f, d, k, g, l = (h._data(this, "events") || {})[a.type] || [],
				n = l.delegateCount,
				p = Q.call(arguments),
				q = !a.exclusive && !a.namespace,
				r = h.event.special[a.type] || {}, u = [];
			p[0] = a;
			a.delegateTarget = this;
			if (!(r.preDispatch && !1 === r.preDispatch.call(this, a))) {
				if (n && (!a.button || "click" !== a.type))
					for (c = a.target; c != this; c = c.parentNode || this)
						if (!0 !== c.disabled || "click" !== a.type) {
							d = {};
							k = [];
							for (e = 0; e < n; e++) f = l[e], g = f.selector, d[g] ===
								m && (d[g] = f.needsContext ? 0 <= h(g, this).index(c) : h.find(g, this, null, [c]).length), d[g] && k.push(f);
							k.length && u.push({
								elem: c,
								matches: k
							})
						}
				l.length > n && u.push({
					elem: this,
					matches: l.slice(n)
				});
				for (e = 0; e < u.length && !a.isPropagationStopped(); e++) {
					d = u[e];
					a.currentTarget = d.elem;
					for (c = 0; c < d.matches.length && !a.isImmediatePropagationStopped(); c++)
						if (f = d.matches[c], q || !a.namespace && !f.namespace || a.namespace_re && a.namespace_re.test(f.namespace)) a.data = f.data, a.handleObj = f, f = ((h.event.special[f.origType] || {}).handle ||
							f.handler).apply(d.elem, p), f !== m && (a.result = f, !1 === f && (a.preventDefault(), a.stopPropagation()))
				}
				return r.postDispatch && r.postDispatch.call(this, a), a.result
			}
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: ["char", "charCode", "key", "keyCode"],
			filter: function(a, b) {
				return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(a, b) {
				var e, c, f, d = b.button,
					k = b.fromElement;
				return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || w, c = e.documentElement, f = e.body, a.pageX = b.clientX + (c && c.scrollLeft || f && f.scrollLeft || 0) - (c && c.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (c && c.scrollTop || f && f.scrollTop || 0) - (c && c.clientTop || f && f.clientTop || 0)), !a.relatedTarget && k && (a.relatedTarget = k === a.target ? b.toElement : k), !a.which && d !== m && (a.which = d & 1 ? 1 : d & 2 ? 3 : d & 4 ? 2 : 0), a
			}
		},
		fix: function(a) {
			if (a[h.expando]) return a;
			var b,
				e, c = a,
				f = h.event.fixHooks[a.type] || {}, d = f.props ? this.props.concat(f.props) : this.props;
			a = h.Event(c);
			for (b = d.length; b;) e = d[--b], a[e] = c[e];
			return a.target || (a.target = c.srcElement || w), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !! a.metaKey, f.filter ? f.filter(a, c) : a
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function(a, b, e) {
					h.isWindow(this) && (this.onbeforeunload = e)
				},
				teardown: function(a, b) {
					this.onbeforeunload === b && (this.onbeforeunload =
						null)
				}
			}
		},
		simulate: function(a, b, e, c) {
			a = h.extend(new h.Event, e, {
				type: a,
				isSimulated: !0,
				originalEvent: {}
			});
			c ? h.event.trigger(a, null, b) : h.event.dispatch.call(b, a);
			a.isDefaultPrevented() && e.preventDefault()
		}
	};
	h.event.handle = h.event.dispatch;
	h.removeEvent = w.removeEventListener ? function(a, b, e) {
		a.removeEventListener && a.removeEventListener(b, e, !1)
	} : function(a, b, e) {
		b = "on" + b;
		a.detachEvent && ("undefined" == typeof a[b] && (a[b] = null), a.detachEvent(b, e))
	};
	h.Event = function(a, b) {
		if (!(this instanceof h.Event)) return new h.Event(a,
			b);
		a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? f : g) : this.type = a;
		b && h.extend(this, b);
		this.timeStamp = a && a.timeStamp || h.now();
		this[h.expando] = !0
	};
	h.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = f;
			var a = this.originalEvent;
			a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
		},
		stopPropagation: function() {
			this.isPropagationStopped = f;
			var a = this.originalEvent;
			a && (a.stopPropagation &&
				a.stopPropagation(), a.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = f;
			this.stopPropagation()
		},
		isDefaultPrevented: g,
		isPropagationStopped: g,
		isImmediatePropagationStopped: g
	};
	h.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(a, b) {
		h.event.special[a] = {
			delegateType: b,
			bindType: b,
			handle: function(a) {
				var e, c = a.relatedTarget,
					f = a.handleObj;
				if (!c || c !== this && !h.contains(this, c)) a.type = f.origType, e = f.handler.apply(this, arguments), a.type = b;
				return e
			}
		}
	});
	h.support.submitBubbles ||
		(h.event.special.submit = {
		setup: function() {
			if (h.nodeName(this, "form")) return !1;
			h.event.add(this, "click._submit keypress._submit", function(a) {
				a = a.target;
				(a = h.nodeName(a, "input") || h.nodeName(a, "button") ? a.form : m) && !h._data(a, "_submit_attached") && (h.event.add(a, "submit._submit", function(a) {
					a._submit_bubble = !0
				}), h._data(a, "_submit_attached", !0))
			})
		},
		postDispatch: function(a) {
			a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && h.event.simulate("submit", this.parentNode, a, !0))
		},
		teardown: function() {
			if (h.nodeName(this,
				"form")) return !1;
			h.event.remove(this, "._submit")
		}
	});
	h.support.changeBubbles || (h.event.special.change = {
		setup: function() {
			if (Ga.test(this.nodeName)) {
				if ("checkbox" === this.type || "radio" === this.type) h.event.add(this, "propertychange._change", function(a) {
					"checked" === a.originalEvent.propertyName && (this._just_changed = !0)
				}), h.event.add(this, "click._change", function(a) {
					this._just_changed && !a.isTrigger && (this._just_changed = !1);
					h.event.simulate("change", this, a, !0)
				});
				return !1
			}
			h.event.add(this, "beforeactivate._change",
				function(a) {
					a = a.target;
					Ga.test(a.nodeName) && !h._data(a, "_change_attached") && (h.event.add(a, "change._change", function(a) {
						this.parentNode && !a.isSimulated && !a.isTrigger && h.event.simulate("change", this.parentNode, a, !0)
					}), h._data(a, "_change_attached", !0))
				})
		},
		handle: function(a) {
			var b = a.target;
			if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
		},
		teardown: function() {
			return h.event.remove(this, "._change"), !Ga.test(this.nodeName)
		}
	});
	h.support.focusinBubbles || h.each({
		focus: "focusin",
		blur: "focusout"
	}, function(a, b) {
		var e = 0,
			c = function(a) {
				h.event.simulate(b, a.target, h.event.fix(a), !0)
			};
		h.event.special[b] = {
			setup: function() {
				0 === e++ && w.addEventListener(a, c, !0)
			},
			teardown: function() {
				0 === --e && w.removeEventListener(a, c, !0)
			}
		}
	});
	h.fn.extend({
		on: function(a, b, e, c, f) {
			var d, k;
			if ("object" == typeof a) {
				"string" != typeof b && (e = e || b, b = m);
				for (k in a) this.on(k, b, e, a[k], f);
				return this
			}
			null == e && null == c ? (c = b, e = b = m) : null == c && ("string" == typeof b ? (c = e, e = m) :
				(c = e, e = b, b = m));
			if (!1 === c) c = g;
			else if (!c) return this;
			return 1 === f && (d = c, c = function(a) {
				return h().off(a), d.apply(this, arguments)
			}, c.guid = d.guid || (d.guid = h.guid++)), this.each(function() {
				h.event.add(this, a, c, e, b)
			})
		},
		one: function(a, b, e, c) {
			return this.on(a, b, e, c, 1)
		},
		off: function(a, b, e) {
			var c, f;
			if (a && a.preventDefault && a.handleObj) return c = a.handleObj, h(a.delegateTarget).off(c.namespace ? c.origType + "." + c.namespace : c.origType, c.selector, c.handler), this;
			if ("object" == typeof a) {
				for (f in a) this.off(f, b, a[f]);
				return this
			}
			if (!1 ===
				b || "function" == typeof b) e = b, b = m;
			return !1 === e && (e = g), this.each(function() {
				h.event.remove(this, a, e, b)
			})
		},
		bind: function(a, b, e) {
			return this.on(a, null, b, e)
		},
		unbind: function(a, b) {
			return this.off(a, null, b)
		},
		live: function(a, b, e) {
			return h(this.context).on(a, this.selector, b, e), this
		},
		die: function(a, b) {
			return h(this.context).off(a, this.selector || "**", b), this
		},
		delegate: function(a, b, e, c) {
			return this.on(b, a, e, c)
		},
		undelegate: function(a, b, e) {
			return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", e)
		},
		trigger: function(a,
			b) {
			return this.each(function() {
				h.event.trigger(a, b, this)
			})
		},
		triggerHandler: function(a, b) {
			if (this[0]) return h.event.trigger(a, b, this[0], !0)
		},
		toggle: function(a) {
			var b = arguments,
				e = a.guid || h.guid++,
				c = 0,
				f = function(e) {
					var f = (h._data(this, "lastToggle" + a.guid) || 0) % c;
					return h._data(this, "lastToggle" + a.guid, f + 1), e.preventDefault(), b[f].apply(this, arguments) || !1
				};
			for (f.guid = e; c < b.length;) b[c++].guid = e;
			return this.click(f)
		},
		hover: function(a, b) {
			return this.mouseenter(a).mouseleave(b || a)
		}
	});
	h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
		function(a, b) {
			h.fn[b] = function(a, e) {
				return null == e && (e = a, a = null), 0 < arguments.length ? this.on(b, null, a, e) : this.trigger(b)
			};
			Lb.test(b) && (h.event.fixHooks[b] = h.event.keyHooks);
			Mb.test(b) && (h.event.fixHooks[b] = h.event.mouseHooks)
		});
	(function(a, b) {
		function e(a, b, c, f) {
			c = c || [];
			b = b || H;
			var d, k, g, h, l = b.nodeType;
			if (!a || "string" != typeof a) return c;
			if (1 !== l && 9 !== l) return [];
			g = z(b);
			if (!g && !f && (d = da.exec(a)))
				if (h = d[1])
					if (9 === l) {
						k = b.getElementById(h);
						if (!k || !k.parentNode) return c;
						if (k.id === h) return c.push(k), c
					} else {
						if (b.ownerDocument &&
							(k = b.ownerDocument.getElementById(h)) && D(b, k) && k.id === h) return c.push(k), c
					} else {
						if (d[2]) return ma.apply(c, na.call(b.getElementsByTagName(a), 0)), c;
						if ((h = d[3]) && fa && b.getElementsByClassName) return ma.apply(c, na.call(b.getElementsByClassName(h), 0)), c
					}
			return v(a.replace(Z, "$1"), b, c, f, g)
		}

		function c(a) {
			return function(b) {
				return "input" === b.nodeName.toLowerCase() && b.type === a
			}
		}

		function f(a) {
			return function(b) {
				var e = b.nodeName.toLowerCase();
				return ("input" === e || "button" === e) && b.type === a
			}
		}

		function d(a) {
			return $(function(b) {
				return b = +b, $(function(e, c) {
					for (var f, d = a([], e.length, b), k = d.length; k--;) e[f = d[k]] && (e[f] = !(c[f] = e[f]))
				})
			})
		}

		function k(a, b, e) {
			if (a === b) return e;
			for (a = a.nextSibling; a;) {
				if (a === b) return -1;
				a = a.nextSibling
			}
			return 1
		}

		function g(a, b) {
			var c, f, d, k, h, l, n;
			if (h = aa[J][a + " "]) return b ? 0 : h.slice(0);
			h = a;
			l = [];
			for (n = x.preFilter; h;) {
				if (!c || (f = la.exec(h))) f && (h = h.slice(f[0].length) || h), l.push(d = []);
				c = !1;
				if (f = ba.exec(h)) d.push(c = new K(f.shift())), h = h.slice(c.length), c.type = f[0].replace(Z, " ");
				for (k in x.filter)(f = Y[k].exec(h)) &&
					(!n[k] || (f = n[k](f))) && (d.push(c = new K(f.shift())), h = h.slice(c.length), c.type = k, c.matches = f);
				if (!c) break
			}
			return b ? h.length : h ? e.error(a) : aa(a, l).slice(0)
		}

		function l(a, b, e) {
			var c = b.dir,
				f = e && "parentNode" === b.dir,
				d = Q++;
			return b.first ? function(b, e, d) {
				for (; b = b[c];)
					if (f || 1 === b.nodeType) return a(b, e, d)
			} : function(b, e, k) {
				if (k)
					for (; b = b[c];) {
						if ((f || 1 === b.nodeType) && a(b, e, k)) return b
					} else
						for (var g, h = L + " " + d + " ", l = h + A; b = b[c];)
							if (f || 1 === b.nodeType) {
								if ((g = b[J]) === l) return b.sizset;
								if ("string" == typeof g && 0 === g.indexOf(h)) {
									if (b.sizset) return b
								} else {
									b[J] =
										l;
									if (a(b, e, k)) return b.sizset = !0, b;
									b.sizset = !1
								}
							}
			}
		}

		function n(a) {
			return 1 < a.length ? function(b, e, c) {
				for (var f = a.length; f--;)
					if (!a[f](b, e, c)) return !1;
				return !0
			} : a[0]
		}

		function p(a, b, e, c, f) {
			for (var d, k = [], g = 0, h = a.length, l = null != b; g < h; g++)
				if (d = a[g])
					if (!e || e(d, c, f)) k.push(d), l && b.push(g);
			return k
		}

		function q(a, b, c, f, d, k) {
			return f && !f[J] && (f = q(f)), d && !d[J] && (d = q(d, k)), $(function(k, g, h, l) {
				var n, E, q = [],
					r = [],
					u = g.length,
					I;
				if (!(I = k)) {
					I = b || "*";
					for (var v = h.nodeType ? [h] : h, m = [], A = 0, ra = v.length; A < ra; A++) e(I, v[A], m);
					I = m
				}
				I = a && (k || !b) ? p(I, q, a, h, l) : I;
				v = c ? d || (k ? a : u || f) ? [] : g : I;
				c && c(I, v, h, l);
				if (f) {
					n = p(v, r);
					f(n, [], h, l);
					for (h = n.length; h--;)
						if (E = n[h]) v[r[h]] = !(I[r[h]] = E)
				}
				if (k) {
					if (d || a) {
						if (d) {
							n = [];
							for (h = v.length; h--;)(E = v[h]) && n.push(I[h] = E);
							d(null, v = [], n, l)
						}
						for (h = v.length; h--;)(E = v[h]) && -1 < (n = d ? O.call(k, E) : q[h]) && (k[n] = !(g[n] = E))
					}
				} else v = p(v === g ? v.splice(u, v.length) : v), d ? d(null, g, v, l) : ma.apply(g, v)
			})
		}

		function r(a) {
			var b, e, c, f = a.length,
				d = x.relative[a[0].type];
			e = d || x.relative[" "];
			for (var k = d ? 1 : 0, g = l(function(a) {
					return a ===
						b
				}, e, !0), h = l(function(a) {
					return -1 < O.call(b, a)
				}, e, !0), p = [
					function(a, e, c) {
						return !d && (c || e !== G) || ((b = e).nodeType ? g(a, e, c) : h(a, e, c))
					}
				]; k < f; k++)
				if (e = x.relative[a[k].type]) p = [l(n(p), e)];
				else {
					e = x.filter[a[k].type].apply(null, a[k].matches);
					if (e[J]) {
						for (c = ++k; c < f && !x.relative[a[c].type]; c++);
						return q(1 < k && n(p), 1 < k && a.slice(0, k - 1).join("").replace(Z, "$1"), e, k < c && r(a.slice(k, c)), c < f && r(a = a.slice(c)), c < f && a.join(""))
					}
					p.push(e)
				}
			return n(p)
		}

		function u(a, b) {
			var c = 0 < b.length,
				f = 0 < a.length,
				d = function(k, g, h, l, n) {
					var E,
						r, q = [],
						u = 0,
						v = "0",
						I = k && [],
						m = null != n,
						ra = G,
						Ba = k || f && x.find.TAG("*", n && g.parentNode || g),
						P = L += null == ra ? 1 : Math.E;
					for (m && (G = g !== H && g, A = d.el); null != (n = Ba[v]); v++) {
						if (f && n) {
							for (E = 0; r = a[E]; E++)
								if (r(n, g, h)) {
									l.push(n);
									break
								}
							m && (L = P, A = ++d.el)
						}
						c && ((n = !r && n) && u--, k && I.push(n))
					}
					u += v;
					if (c && v !== u) {
						for (E = 0; r = b[E]; E++) r(I, q, g, h);
						if (k) {
							if (0 < u)
								for (; v--;)!I[v] && !q[v] && (q[v] = Nb.call(l));
							q = p(q)
						}
						ma.apply(l, q);
						m && !k && 0 < q.length && 1 < u + b.length && e.uniqueSort(l)
					}
					return m && (L = P, G = ra), I
				};
			return d.el = 0, c ? $(d) : d
		}

		function v(a, b, e, c,
			f) {
			var d, k, h, l, n = g(a);
			if (!c && 1 === n.length) {
				k = n[0] = n[0].slice(0);
				if (2 < k.length && "ID" === (h = k[0]).type && 9 === b.nodeType && !f && x.relative[k[1].type]) {
					b = x.find.ID(h.matches[0].replace(T, ""), b, f)[0];
					if (!b) return e;
					a = a.slice(k.shift().length)
				}
				for (d = Y.POS.test(a) ? -1 : k.length - 1; 0 <= d; d--) {
					h = k[d];
					if (x.relative[l = h.type]) break;
					if (l = x.find[l])
						if (c = l(h.matches[0].replace(T, ""), X.test(k[0].type) && b.parentNode || b, f)) {
							k.splice(d, 1);
							a = c.length && k.join("");
							if (!a) return ma.apply(e, na.call(c, 0)), e;
							break
						}
				}
			}
			return y(a, n)(c,
				b, f, e, X.test(a)), e
		}

		function m() {}
		var A, C, x, w, z, D, y, B, F, G, M = !0,
			J = ("sizcache" + Math.random()).replace(".", ""),
			K = String,
			H = a.document,
			W = H.documentElement,
			L = 0,
			Q = 0,
			Nb = [].pop,
			ma = [].push,
			na = [].slice,
			O = [].indexOf || function(a) {
				for (var b = 0, e = this.length; b < e; b++)
					if (this[b] === a) return b;
				return -1
			}, $ = function(a, b) {
				return a[J] = null == b || b, a
			}, N = function() {
				var a = {}, b = [];
				return $(function(e, c) {
					return b.push(e) > x.cacheLength && delete a[b.shift()], a[e + " "] = c
				}, a)
			}, S = N(),
			aa = N(),
			$a = N(),
			N = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?\x3d)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
				"(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
			V = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + N + ")|[^:]|\\\\.)*|.*))\\)|)",
			Z = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
			la = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
			ba = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
			ca = RegExp(V),
			da = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
			X = /[\x20\t\r\n\f]*[+~]/,
			ea = /h\d/i,
			ga = /input|select|textarea|button/i,
			T = /\\(?!\\)/g,
			Y = {
				ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
				CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
				NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
				TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
				ATTR: RegExp("^" + N),
				PSEUDO: RegExp("^" + V),
				POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
				CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
					"i"),
				needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[\x3e+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?\x3d[^-]|$)", "i")
			}, ja = function(a) {
				var b = H.createElement("div");
				try {
					return a(b)
				} catch (e) {
					return !1
				} finally {}
			}, N = ja(function(a) {
				return a.appendChild(H.createComment("")), !a.getElementsByTagName("*").length
			}),
			ha = ja(function(a) {
				return a.innerHTML = "\x3ca href\x3d'#'\x3e\x3c/a\x3e", a.firstChild && "undefined" !== typeof a.firstChild.getAttribute && "#" ===
					a.firstChild.getAttribute("href")
			}),
			ia = ja(function(a) {
				a.innerHTML = "\x3cselect\x3e\x3c/select\x3e";
				a = typeof a.lastChild.getAttribute("multiple");
				return "boolean" !== a && "string" !== a
			}),
			fa = ja(function(a) {
				return a.innerHTML = "\x3cdiv class\x3d'hidden e'\x3e\x3c/div\x3e\x3cdiv class\x3d'hidden'\x3e\x3c/div\x3e", !a.getElementsByClassName || !a.getElementsByClassName("e").length ? !1 : (a.lastChild.className = "e", 2 === a.getElementsByClassName("e").length)
			}),
			ka = ja(function(a) {
				a.id = J + 0;
				a.innerHTML = "\x3ca name\x3d'" + J +
					"'\x3e\x3c/a\x3e\x3cdiv name\x3d'" + J + "'\x3e\x3c/div\x3e";
				W.insertBefore(a, W.firstChild);
				var b = H.getElementsByName && H.getElementsByName(J).length === 2 + H.getElementsByName(J + 0).length;
				return C = !H.getElementById(J), W.removeChild(a), b
			});
		try {
			na.call(W.childNodes, 0)[0].nodeType
		} catch (ta) {
			na = function(a) {
				for (var b, e = []; b = this[a]; a++) e.push(b);
				return e
			}
		}
		e.matches = function(a, b) {
			return e(a, null, null, b)
		};
		e.matchesSelector = function(a, b) {
			return 0 < e(b, null, null, [a]).length
		};
		w = e.getText = function(a) {
			var b, e = "",
				c = 0;
			if (b = a.nodeType)
				if (1 === b || 9 === b || 11 === b) {
					if ("string" == typeof a.textContent) return a.textContent;
					for (a = a.firstChild; a; a = a.nextSibling) e += w(a)
				} else {
					if (3 === b || 4 === b) return a.nodeValue
				} else
					for (; b = a[c]; c++) e += w(b);
			return e
		};
		z = e.isXML = function(a) {
			return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
		};
		D = e.contains = W.contains ? function(a, b) {
			var e = 9 === a.nodeType ? a.documentElement : a,
				c = b && b.parentNode;
			return a === c || !(!c || !(1 === c.nodeType && e.contains && e.contains(c)))
		} : W.compareDocumentPosition ?
			function(a, b) {
				return b && !! (a.compareDocumentPosition(b) & 16)
		} : function(a, b) {
			for (; b = b.parentNode;)
				if (b === a) return !0;
			return !1
		};
		e.attr = function(a, b) {
			var e, c = z(a);
			return c || (b = b.toLowerCase()), (e = x.attrHandle[b]) ? e(a) : c || ia ? a.getAttribute(b) : (e = a.getAttributeNode(b), e ? "boolean" == typeof a[b] ? a[b] ? b : null : e.specified ? e.value : null : null)
		};
		x = e.selectors = {
			cacheLength: 50,
			createPseudo: $,
			match: Y,
			attrHandle: ha ? {} : {
				href: function(a) {
					return a.getAttribute("href", 2)
				},
				type: function(a) {
					return a.getAttribute("type")
				}
			},
			find: {
				ID: C ? function(a, b, e) {
					if ("undefined" !== typeof b.getElementById && !e) return (a = b.getElementById(a)) && a.parentNode ? [a] : []
				} : function(a, e, c) {
					if ("undefined" !== typeof e.getElementById && !c) return (e = e.getElementById(a)) ? e.id === a || "undefined" !== typeof e.getAttributeNode && e.getAttributeNode("id").value === a ? [e] : b : []
				},
				TAG: N ? function(a, b) {
					if ("undefined" !== typeof b.getElementsByTagName) return b.getElementsByTagName(a)
				} : function(a, b) {
					var e = b.getElementsByTagName(a);
					if ("*" === a) {
						for (var c, f = [], d = 0; c = e[d]; d++) 1 ===
							c.nodeType && f.push(c);
						return f
					}
					return e
				},
				NAME: ka && function(a, b) {
					if ("undefined" !== typeof b.getElementsByName) return b.getElementsByName(name)
				},
				CLASS: fa && function(a, b, e) {
					if ("undefined" !== typeof b.getElementsByClassName && !e) return b.getElementsByClassName(a)
				}
			},
			relative: {
				"\x3e": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(a) {
					return a[1] = a[1].replace(T, ""), a[3] = (a[4] || a[5] || "").replace(T, ""), "~\x3d" === a[2] &&
						(a[3] = " " + a[3] + " "), a.slice(0, 4)
				},
				CHILD: function(a) {
					return a[1] = a[1].toLowerCase(), "nth" === a[1] ? (a[2] || e.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && e.error(a[0]), a
				},
				PSEUDO: function(a) {
					var b, e;
					if (Y.CHILD.test(a[0])) return null;
					if (a[3]) a[2] = a[3];
					else if (b = a[4]) ca.test(b) && (e = g(b, !0)) && (e = b.indexOf(")", b.length - e) - b.length) && (b = b.slice(0, e), a[0] = a[0].slice(0, e)), a[2] = b;
					return a.slice(0, 3)
				}
			},
			filter: {
				ID: C ? function(a) {
					return a = a.replace(T,
						""),
					function(b) {
						return b.getAttribute("id") === a
					}
				} : function(a) {
					return a = a.replace(T, ""),
					function(b) {
						return (b = "undefined" !== typeof b.getAttributeNode && b.getAttributeNode("id")) && b.value === a
					}
				},
				TAG: function(a) {
					return "*" === a ? function() {
						return !0
					} : (a = a.replace(T, "").toLowerCase(), function(b) {
						return b.nodeName && b.nodeName.toLowerCase() === a
					})
				},
				CLASS: function(a) {
					var b = S[J][a + " "];
					return b || (b = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && S(a, function(a) {
						return b.test(a.className || "undefined" !==
							typeof a.getAttribute && a.getAttribute("class") || "")
					})
				},
				ATTR: function(a, b, c) {
					return function(f, d) {
						var k = e.attr(f, a);
						return null == k ? "!\x3d" === b : b ? (k += "", "\x3d" === b ? k === c : "!\x3d" === b ? k !== c : "^\x3d" === b ? c && 0 === k.indexOf(c) : "*\x3d" === b ? c && -1 < k.indexOf(c) : "$\x3d" === b ? c && k.substr(k.length - c.length) === c : "~\x3d" === b ? -1 < (" " + k + " ").indexOf(c) : "|\x3d" === b ? k === c || k.substr(0, c.length + 1) === c + "-" : !1) : !0
					}
				},
				CHILD: function(a, b, e, c) {
					return "nth" === a ? function(a) {
						var b, f;
						b = a.parentNode;
						if (1 === e && 0 === c) return !0;
						if (b) {
							f =
								0;
							for (b = b.firstChild; b && !(1 === b.nodeType && (f++, a === b)); b = b.nextSibling);
						}
						return f -= c, f === e || 0 === f % e && 0 <= f / e
					} : function(b) {
						var e = b;
						switch (a) {
							case "only":
							case "first":
								for (; e = e.previousSibling;)
									if (1 === e.nodeType) return !1;
								if ("first" === a) return !0;
								e = b;
							case "last":
								for (; e = e.nextSibling;)
									if (1 === e.nodeType) return !1;
								return !0
						}
					}
				},
				PSEUDO: function(a, b) {
					var c, f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || e.error("unsupported pseudo: " + a);
					return f[J] ? f(b) : 1 < f.length ? (c = [a, a, "", b], x.setFilters.hasOwnProperty(a.toLowerCase()) ?
						$(function(a, e) {
							for (var c, d = f(a, b), k = d.length; k--;) c = O.call(a, d[k]), a[c] = !(e[c] = d[k])
						}) : function(a) {
							return f(a, 0, c)
						}) : f
				}
			},
			pseudos: {
				not: $(function(a) {
					var b = [],
						e = [],
						c = y(a.replace(Z, "$1"));
					return c[J] ? $(function(a, b, e, f) {
						f = c(a, null, f, []);
						for (var d = a.length; d--;)
							if (e = f[d]) a[d] = !(b[d] = e)
					}) : function(a, f, d) {
						return b[0] = a, c(b, null, d, e), !e.pop()
					}
				}),
				has: $(function(a) {
					return function(b) {
						return 0 < e(a, b).length
					}
				}),
				contains: $(function(a) {
					return function(b) {
						return -1 < (b.textContent || b.innerText || w(b)).indexOf(a)
					}
				}),
				enabled: function(a) {
					return !1 === a.disabled
				},
				disabled: function(a) {
					return !0 === a.disabled
				},
				checked: function(a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && !! a.checked || "option" === b && !! a.selected
				},
				selected: function(a) {
					return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
				},
				parent: function(a) {
					return !x.pseudos.empty(a)
				},
				empty: function(a) {
					var b;
					for (a = a.firstChild; a;) {
						if ("@" < a.nodeName || 3 === (b = a.nodeType) || 4 === b) return !1;
						a = a.nextSibling
					}
					return !0
				},
				header: function(a) {
					return ea.test(a.nodeName)
				},
				text: function(a) {
					var b, e;
					return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (e = a.getAttribute("type")) || e.toLowerCase() === b)
				},
				radio: c("radio"),
				checkbox: c("checkbox"),
				file: c("file"),
				password: c("password"),
				image: c("image"),
				submit: f("submit"),
				reset: f("reset"),
				button: function(a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && "button" === a.type || "button" === b
				},
				input: function(a) {
					return ga.test(a.nodeName)
				},
				focus: function(a) {
					var b = a.ownerDocument;
					return a === b.activeElement && (!b.hasFocus ||
						b.hasFocus()) && !(!a.type && !a.href && !~a.tabIndex)
				},
				active: function(a) {
					return a === a.ownerDocument.activeElement
				},
				first: d(function() {
					return [0]
				}),
				last: d(function(a, b) {
					return [b - 1]
				}),
				eq: d(function(a, b, e) {
					return [0 > e ? e + b : e]
				}),
				even: d(function(a, b) {
					for (var e = 0; e < b; e += 2) a.push(e);
					return a
				}),
				odd: d(function(a, b) {
					for (var e = 1; e < b; e += 2) a.push(e);
					return a
				}),
				lt: d(function(a, b, e) {
					for (b = 0 > e ? e + b : e; 0 <= --b;) a.push(b);
					return a
				}),
				gt: d(function(a, b, e) {
					for (e = 0 > e ? e + b : e; ++e < b;) a.push(e);
					return a
				})
			}
		};
		B = W.compareDocumentPosition ?
			function(a, b) {
				return a === b ? (F = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
		} : function(a, b) {
			if (a === b) return F = !0, 0;
			if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
			var e, c, f = [],
				d = [];
			e = a.parentNode;
			c = b.parentNode;
			var g = e;
			if (e === c) return k(a, b);
			if (!e) return -1;
			if (!c) return 1;
			for (; g;) f.unshift(g), g = g.parentNode;
			for (g = c; g;) d.unshift(g), g = g.parentNode;
			e = f.length;
			c = d.length;
			for (g = 0; g < e && g < c; g++)
				if (f[g] !== d[g]) return k(f[g],
					d[g]);
			return g === e ? k(a, d[g], -1) : k(f[g], b, 1)
		};
		[0, 0].sort(B);
		M = !F;
		e.uniqueSort = function(a) {
			var b, e = [],
				c = 1,
				f = 0;
			F = M;
			a.sort(B);
			if (F) {
				for (; b = a[c]; c++) b === a[c - 1] && (f = e.push(c));
				for (; f--;) a.splice(e[f], 1)
			}
			return a
		};
		e.error = function(a) {
			throw Error("Syntax error, unrecognized expression: " + a);
		};
		y = e.compile = function(a, b) {
			var e, c = [],
				f = [],
				d = $a[J][a + " "];
			if (!d) {
				b || (b = g(a));
				for (e = b.length; e--;) d = r(b[e]), d[J] ? c.push(d) : f.push(d);
				d = $a(a, u(f, c))
			}
			return d
		};
		H.querySelectorAll && function() {
			var a, b = v,
				c = /'|\\/g,
				f = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
				d = [":focus"],
				k = [":active"],
				h = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector || W.oMatchesSelector || W.msMatchesSelector;
			ja(function(a) {
				a.innerHTML = "\x3cselect\x3e\x3coption selected\x3d''\x3e\x3c/option\x3e\x3c/select\x3e";
				a.querySelectorAll("[selected]").length || d.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
				a.querySelectorAll(":checked").length || d.push(":checked")
			});
			ja(function(a) {
				a.innerHTML = "\x3cp test\x3d''\x3e\x3c/p\x3e";
				a.querySelectorAll("[test^\x3d'']").length &&
					d.push("[*^$]\x3d[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
				a.innerHTML = "\x3cinput type\x3d'hidden'/\x3e";
				a.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled")
			});
			d = RegExp(d.join("|"));
			v = function(a, e, f, k, h) {
				if (!k && !h && !d.test(a)) {
					var l, n, p = !0,
						E = J;
					n = e;
					l = 9 === e.nodeType && a;
					if (1 === e.nodeType && "object" !== e.nodeName.toLowerCase()) {
						l = g(a);
						(p = e.getAttribute("id")) ? E = p.replace(c, "\\$\x26") : e.setAttribute("id", E);
						E = "[id\x3d'" + E + "'] ";
						for (n = l.length; n--;) l[n] = E + l[n].join("");
						n = X.test(a) && e.parentNode ||
							e;
						l = l.join(",")
					}
					if (l) try {
						return ma.apply(f, na.call(n.querySelectorAll(l), 0)), f
					} catch (q) {} finally {
						p || e.removeAttribute("id")
					}
				}
				return b(a, e, f, k, h)
			};
			h && (ja(function(b) {
				a = h.call(b, "div");
				try {
					h.call(b, "[test!\x3d'']:sizzle"), k.push("!\x3d", V)
				} catch (e) {}
			}), k = RegExp(k.join("|")), e.matchesSelector = function(b, c) {
				c = c.replace(f, "\x3d'$1']");
				if (!z(b) && !k.test(c) && !d.test(c)) try {
					var g = h.call(b, c);
					if (g || a || b.document && 11 !== b.document.nodeType) return g
				} catch (l) {}
				return 0 < e(c, null, null, [b]).length
			})
		}();
		x.pseudos.nth =
			x.pseudos.eq;
		x.filters = m.prototype = x.pseudos;
		x.setFilters = new m;
		e.attr = h.attr;
		h.find = e;
		h.expr = e.selectors;
		h.expr[":"] = h.expr.pseudos;
		h.unique = e.uniqueSort;
		h.text = e.getText;
		h.isXMLDoc = e.isXML;
		h.contains = e.contains
	})(b);
	var Ob = /Until$/,
		Pb = /^(?:parents|prev(?:Until|All))/,
		rb = /^.[^:#\[\.,]*$/,
		ab = h.expr.match.needsContext,
		Qb = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	h.fn.extend({
		find: function(a) {
			var b, e, c, f, d, k, g = this;
			if ("string" != typeof a) return h(a).filter(function() {
				b = 0;
				for (e = g.length; b < e; b++)
					if (h.contains(g[b],
						this)) return !0
			});
			k = this.pushStack("", "find", a);
			b = 0;
			for (e = this.length; b < e; b++)
				if (c = k.length, h.find(a, this[b], k), 0 < b)
					for (f = c; f < k.length; f++)
						for (d = 0; d < c; d++)
							if (k[d] === k[f]) {
								k.splice(f--, 1);
								break
							}
			return k
		},
		has: function(a) {
			var b, e = h(a, this),
				c = e.length;
			return this.filter(function() {
				for (b = 0; b < c; b++)
					if (h.contains(this, e[b])) return !0
			})
		},
		not: function(a) {
			return this.pushStack(l(this, a, !1), "not", a)
		},
		filter: function(a) {
			return this.pushStack(l(this, a, !0), "filter", a)
		},
		is: function(a) {
			return !!a && ("string" == typeof a ?
				ab.test(a) ? 0 <= h(a, this.context).index(this[0]) : 0 < h.filter(a, this).length : 0 < this.filter(a).length)
		},
		closest: function(a, b) {
			for (var e, c = 0, f = this.length, d = [], k = ab.test(a) || "string" != typeof a ? h(a, b || this.context) : 0; c < f; c++)
				for (e = this[c]; e && e.ownerDocument && e !== b && 11 !== e.nodeType;) {
					if (k ? -1 < k.index(e) : h.find.matchesSelector(e, a)) {
						d.push(e);
						break
					}
					e = e.parentNode
				}
			return d = 1 < d.length ? h.unique(d) : d, this.pushStack(d, "closest", a)
		},
		index: function(a) {
			return a ? "string" == typeof a ? h.inArray(this[0], h(a)) : h.inArray(a.jquery ?
				a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
		},
		add: function(a, b) {
			var c = "string" == typeof a ? h(a, b) : h.makeArray(a && a.nodeType ? [a] : a),
				f = h.merge(this.get(), c);
			return this.pushStack(e(c[0]) || e(f[0]) ? f : h.unique(f))
		},
		addBack: function(a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}
	});
	h.fn.andSelf = h.fn.addBack;
	h.each({
		parent: function(a) {
			return (a = a.parentNode) && 11 !== a.nodeType ? a : null
		},
		parents: function(a) {
			return h.dir(a, "parentNode")
		},
		parentsUntil: function(a, b, e) {
			return h.dir(a,
				"parentNode", e)
		},
		next: function(a) {
			return k(a, "nextSibling")
		},
		prev: function(a) {
			return k(a, "previousSibling")
		},
		nextAll: function(a) {
			return h.dir(a, "nextSibling")
		},
		prevAll: function(a) {
			return h.dir(a, "previousSibling")
		},
		nextUntil: function(a, b, e) {
			return h.dir(a, "nextSibling", e)
		},
		prevUntil: function(a, b, e) {
			return h.dir(a, "previousSibling", e)
		},
		siblings: function(a) {
			return h.sibling((a.parentNode || {}).firstChild, a)
		},
		children: function(a) {
			return h.sibling(a.firstChild)
		},
		contents: function(a) {
			return h.nodeName(a,
				"iframe") ? a.contentDocument || a.contentWindow.document : h.merge([], a.childNodes)
		}
	}, function(a, b) {
		h.fn[a] = function(e, c) {
			var f = h.map(this, b, e);
			return Ob.test(a) || (c = e), c && "string" == typeof c && (f = h.filter(c, f)), f = 1 < this.length && !Qb[a] ? h.unique(f) : f, 1 < this.length && Pb.test(a) && (f = f.reverse()), this.pushStack(f, a, Q.call(arguments).join(","))
		}
	});
	h.extend({
		filter: function(a, b, e) {
			return e && (a = ":not(" + a + ")"), 1 === b.length ? h.find.matchesSelector(b[0], a) ? [b[0]] : [] : h.find.matches(a, b)
		},
		dir: function(a, b, e) {
			var c = [];
			for (a = a[b]; a && 9 !== a.nodeType && (e === m || 1 !== a.nodeType || !h(a).is(e));) 1 === a.nodeType && c.push(a), a = a[b];
			return c
		},
		sibling: function(a, b) {
			for (var e = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && e.push(a);
			return e
		}
	});
	var Na = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Rb = / jQuery\d+="(?:null|\d+)"/g,
		Ha = /^\s+/,
		bb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		cb = /<([\w:]+)/,
		Sb = /<tbody/i,
		Tb = /<|&#?\w+;/,
		Ub = /<(?:script|style|link)/i,
		Vb = /<(?:script|object|embed|option|style)/i,
		Ia = RegExp("\x3c(?:" + Na + ")[\\s/\x3e]", "i"),
		Oa = /^(?:checkbox|radio)$/,
		db = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Wb = /\/(java|ecma)script/i,
		Xb = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
		S = {
			option: [1, "\x3cselect multiple\x3d'multiple'\x3e", "\x3c/select\x3e"],
			legend: [1, "\x3cfieldset\x3e", "\x3c/fieldset\x3e"],
			thead: [1, "\x3ctable\x3e", "\x3c/table\x3e"],
			tr: [2, "\x3ctable\x3e\x3ctbody\x3e", "\x3c/tbody\x3e\x3c/table\x3e"],
			td: [3, "\x3ctable\x3e\x3ctbody\x3e\x3ctr\x3e", "\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e"],
			col: [2, "\x3ctable\x3e\x3ctbody\x3e\x3c/tbody\x3e\x3ccolgroup\x3e", "\x3c/colgroup\x3e\x3c/table\x3e"],
			area: [1, "\x3cmap\x3e", "\x3c/map\x3e"],
			_default: [0, "", ""]
		}, eb = r(w),
		Ja = eb.appendChild(w.createElement("div"));
	S.optgroup = S.option;
	S.tbody = S.tfoot = S.colgroup = S.caption = S.thead;
	S.th = S.td;
	h.support.htmlSerialize || (S._default = [1, "X\x3cdiv\x3e", "\x3c/div\x3e"]);
	h.fn.extend({
		text: function(a) {
			return h.access(this, function(a) {
				return a ===
					m ? h.text(this) : this.empty().append((this[0] && this[0].ownerDocument || w).createTextNode(a))
			}, null, a, arguments.length)
		},
		wrapAll: function(a) {
			if (h.isFunction(a)) return this.each(function(b) {
				h(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = h(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]);
				b.map(function() {
					for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		},
		wrapInner: function(a) {
			return h.isFunction(a) ? this.each(function(b) {
				h(this).wrapInner(a.call(this,
					b))
			}) : this.each(function() {
				var b = h(this),
					e = b.contents();
				e.length ? e.wrapAll(a) : b.append(a)
			})
		},
		wrap: function(a) {
			var b = h.isFunction(a);
			return this.each(function(e) {
				h(this).wrapAll(b ? a.call(this, e) : a)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				h.nodeName(this, "body") || h(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function() {
			return this.domManip(arguments, !0, function(a) {
				(1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
			})
		},
		prepend: function() {
			return this.domManip(arguments, !0, function(a) {
				(1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
			})
		},
		before: function() {
			if (!e(this[0])) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this)
			});
			if (arguments.length) {
				var a = h.clean(arguments);
				return this.pushStack(h.merge(a, this), "before", this.selector)
			}
		},
		after: function() {
			if (!e(this[0])) return this.domManip(arguments, !1, function(a) {
				this.parentNode.insertBefore(a, this.nextSibling)
			});
			if (arguments.length) {
				var a = h.clean(arguments);
				return this.pushStack(h.merge(this,
					a), "after", this.selector)
			}
		},
		remove: function(a, b) {
			for (var e, c = 0; null != (e = this[c]); c++)
				if (!a || h.filter(a, [e]).length)!b && 1 === e.nodeType && (h.cleanData(e.getElementsByTagName("*")), h.cleanData([e])), e.parentNode && e.parentNode.removeChild(e);
			return this
		},
		empty: function() {
			for (var a, b = 0; null != (a = this[b]); b++)
				for (1 === a.nodeType && h.cleanData(a.getElementsByTagName("*")); a.firstChild;) a.removeChild(a.firstChild);
			return this
		},
		clone: function(a, b) {
			return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
				return h.clone(this,
					a, b)
			})
		},
		html: function(a) {
			return h.access(this, function(a) {
					var b = this[0] || {}, e = 0,
						c = this.length;
					if (a === m) return 1 === b.nodeType ? b.innerHTML.replace(Rb, "") : m;
					if ("string" == typeof a && !Ub.test(a) && (h.support.htmlSerialize || !Ia.test(a)) && (h.support.leadingWhitespace || !Ha.test(a)) && !S[(cb.exec(a) || ["", ""])[1].toLowerCase()]) {
						a = a.replace(bb, "\x3c$1\x3e\x3c/$2\x3e");
						try {
							for (; e < c; e++) b = this[e] || {}, 1 === b.nodeType && (h.cleanData(b.getElementsByTagName("*")), b.innerHTML = a);
							b = 0
						} catch (f) {}
					}
					b && this.empty().append(a)
				},
				null, a, arguments.length)
		},
		replaceWith: function(a) {
			return e(this[0]) ? this.length ? this.pushStack(h(h.isFunction(a) ? a() : a), "replaceWith", a) : this : h.isFunction(a) ? this.each(function(b) {
				var e = h(this),
					c = e.html();
				e.replaceWith(a.call(this, b, c))
			}) : ("string" != typeof a && (a = h(a).detach()), this.each(function() {
				var b = this.nextSibling,
					e = this.parentNode;
				h(this).remove();
				b ? h(b).before(a) : h(e).append(a)
			}))
		},
		detach: function(a) {
			return this.remove(a, !0)
		},
		domManip: function(a, b, e) {
			a = [].concat.apply([], a);
			var c, f, d, k = 0,
				g = a[0],
				l = [],
				n = this.length;
			if (!h.support.checkClone && 1 < n && "string" == typeof g && db.test(g)) return this.each(function() {
				h(this).domManip(a, b, e)
			});
			if (h.isFunction(g)) return this.each(function(c) {
				var f = h(this);
				a[0] = g.call(this, c, b ? f.html() : m);
				f.domManip(a, b, e)
			});
			if (this[0]) {
				c = h.buildFragment(a, this, l);
				d = c.fragment;
				f = d.firstChild;
				1 === d.childNodes.length && (d = f);
				if (f) {
					b = b && h.nodeName(f, "tr");
					for (c = c.cacheable || n - 1; k < n; k++) e.call(b && h.nodeName(this[k], "table") ? this[k].getElementsByTagName("tbody")[0] || this[k].appendChild(this[k].ownerDocument.createElement("tbody")) :
						this[k], k === c ? d : h.clone(d, !0, !0))
				}
				d = f = null;
				l.length && h.each(l, function(a, b) {
					b.src ? h.ajax ? h.ajax({
						url: b.src,
						type: "GET",
						dataType: "script",
						async: !1,
						global: !1,
						"throws": !0
					}) : h.error("no ajax") : h.globalEval((b.text || b.textContent || b.innerHTML || "").replace(Xb, ""));
					b.parentNode && b.parentNode.removeChild(b)
				})
			}
			return this
		}
	});
	h.buildFragment = function(a, b, e) {
		var c, f, d, k = a[0];
		return b = b || w, b = !b.nodeType && b[0] || b, b = b.ownerDocument || b, 1 === a.length && "string" == typeof k && 512 > k.length && b === w && "\x3c" === k.charAt(0) && !Vb.test(k) && (h.support.checkClone || !db.test(k)) && (h.support.html5Clone || !Ia.test(k)) && (f = !0, c = h.fragments[k], d = c !== m), c || (c = b.createDocumentFragment(), h.clean(a, b, c, e), f && (h.fragments[k] = d && c)), {
			fragment: c,
			cacheable: f
		}
	};
	h.fragments = {};
	h.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(a, b) {
		h.fn[a] = function(e) {
			var c, f = 0,
				d = [];
			e = h(e);
			var k = e.length;
			c = 1 === this.length && this[0].parentNode;
			if ((null == c || c && 11 === c.nodeType && 1 === c.childNodes.length) &&
				1 === k) return e[b](this[0]), this;
			for (; f < k; f++) c = (0 < f ? this.clone(!0) : this).get(), h(e[f])[b](c), d = d.concat(c);
			return this.pushStack(d, a, e.selector)
		}
	});
	h.extend({
		clone: function(a, b, e) {
			var c, f, d, k;
			h.support.html5Clone || h.isXMLDoc(a) || !Ia.test("\x3c" + a.nodeName + "\x3e") ? k = a.cloneNode(!0) : (Ja.innerHTML = a.outerHTML, Ja.removeChild(k = Ja.firstChild));
			if ((!h.support.noCloneEvent || !h.support.noCloneChecked) && (1 === a.nodeType || 11 === a.nodeType) && !h.isXMLDoc(a)) {
				n(a, k);
				c = u(a);
				f = u(k);
				for (d = 0; c[d]; ++d) f[d] && n(c[d], f[d])
			}
			if (b &&
				(p(a, k), e)) {
				c = u(a);
				f = u(k);
				for (d = 0; c[d]; ++d) p(c[d], f[d])
			}
			return k
		},
		clean: function(a, b, e, c) {
			var f, d, k, g, l, n, p, u = b === w && eb,
				v = [];
			if (!b || "undefined" == typeof b.createDocumentFragment) b = w;
			for (f = 0; null != (k = a[f]); f++)
				if ("number" == typeof k && (k += ""), k) {
					if ("string" == typeof k)
						if (Tb.test(k)) {
							u = u || r(b);
							n = b.createElement("div");
							u.appendChild(n);
							k = k.replace(bb, "\x3c$1\x3e\x3c/$2\x3e");
							d = (cb.exec(k) || ["", ""])[1].toLowerCase();
							g = S[d] || S._default;
							l = g[0];
							for (n.innerHTML = g[1] + k + g[2]; l--;) n = n.lastChild;
							if (!h.support.tbody) {
								l =
									Sb.test(k);
								g = "table" === d && !l ? n.firstChild && n.firstChild.childNodes : "\x3ctable\x3e" === g[1] && !l ? n.childNodes : [];
								for (d = g.length - 1; 0 <= d; --d) h.nodeName(g[d], "tbody") && !g[d].childNodes.length && g[d].parentNode.removeChild(g[d])
							}!h.support.leadingWhitespace && Ha.test(k) && n.insertBefore(b.createTextNode(Ha.exec(k)[0]), n.firstChild);
							k = n.childNodes;
							n.parentNode.removeChild(n)
						} else k = b.createTextNode(k);
					k.nodeType ? v.push(k) : h.merge(v, k)
				}
			n && (k = n = u = null);
			if (!h.support.appendChecked)
				for (f = 0; null != (k = v[f]); f++) h.nodeName(k,
					"input") ? q(k) : "undefined" != typeof k.getElementsByTagName && h.grep(k.getElementsByTagName("input"), q);
			if (e) {
				a = function(a) {
					if (!a.type || Wb.test(a.type)) return c ? c.push(a.parentNode ? a.parentNode.removeChild(a) : a) : e.appendChild(a)
				};
				for (f = 0; null != (k = v[f]); f++)
					if (!h.nodeName(k, "script") || !a(k)) e.appendChild(k), "undefined" != typeof k.getElementsByTagName && (p = h.grep(h.merge([], k.getElementsByTagName("script")), a), v.splice.apply(v, [f + 1, 0].concat(p)), f += p.length)
			}
			return v
		},
		cleanData: function(a, b) {
			for (var e, c,
					f, d, k = 0, g = h.expando, l = h.cache, n = h.support.deleteExpando, p = h.event.special; null != (f = a[k]); k++)
				if (b || h.acceptData(f))
					if (e = (c = f[g]) && l[c]) {
						if (e.events)
							for (d in e.events) p[d] ? h.event.remove(f, d) : h.removeEvent(f, d, e.handle);
						l[c] && (delete l[c], n ? delete f[g] : f.removeAttribute ? f.removeAttribute(g) : f[g] = null, h.deletedIds.push(c))
					}
		}
	});
	(function() {
		var a, b;
		h.uaMatch = function(a) {
			a = a.toLowerCase();
			a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) ||
				/(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
			return {
				browser: a[1] || "",
				version: a[2] || "0"
			}
		};
		a = h.uaMatch(K.userAgent);
		b = {};
		a.browser && (b[a.browser] = !0, b.version = a.version);
		b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);
		h.browser = b;
		h.sub = function() {
			function a(b, e) {
				return new a.fn.init(b, e)
			}
			h.extend(!0, a, this);
			a.superclass = this;
			a.fn = a.prototype = this();
			a.fn.constructor = a;
			a.sub = this.sub;
			a.fn.init = function(e, c) {
				return c && c instanceof h && !(c instanceof a) &&
					(c = a(c)), h.fn.init.call(this, e, c, b)
			};
			a.fn.init.prototype = a.fn;
			var b = a(w);
			return a
		}
	})();
	var O, Y, ha, Ka = /alpha\([^)]*\)/i,
		Yb = /opacity=([^)]*)/,
		Zb = /^(top|right|bottom|left)$/,
		$b = /^(none|table(?!-c[ea]).+)/,
		fb = /^margin/,
		sb = RegExp("^(" + xa + ")(.*)$", "i"),
		sa = RegExp("^(" + xa + ")(?!px)[a-z%]+$", "i"),
		ac = RegExp("^([-+])\x3d(" + xa + ")", "i"),
		Ca = {
			BODY: "block"
		}, bc = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		}, gb = {
			letterSpacing: 0,
			fontWeight: 400
		}, X = ["Top", "Right", "Bottom", "Left"],
		Pa = ["Webkit", "O", "Moz", "ms"],
		cc = h.fn.toggle;
	h.fn.extend({
		css: function(a, b) {
			return h.access(this, function(a, b, e) {
				return e !== m ? h.style(a, b, e) : h.css(a, b)
			}, a, b, 1 < arguments.length)
		},
		show: function() {
			return C(this, !0)
		},
		hide: function() {
			return C(this)
		},
		toggle: function(a, b) {
			var e = "boolean" == typeof a;
			return h.isFunction(a) && h.isFunction(b) ? cc.apply(this, arguments) : this.each(function() {
				(e ? a : A(this)) ? h(this).show() : h(this).hide()
			})
		}
	});
	h.extend({
		cssHooks: {
			opacity: {
				get: function(a, b) {
					if (b) {
						var e = O(a, "opacity");
						return "" === e ? "1" : e
					}
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": h.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(a, b, e, c) {
			if (a && !(3 === a.nodeType || 8 === a.nodeType || !a.style)) {
				var f, d, k, g = h.camelCase(b),
					l = a.style;
				b = h.cssProps[g] || (h.cssProps[g] = v(l, g));
				k = h.cssHooks[b] || h.cssHooks[g];
				if (e === m) return k && "get" in k && (f = k.get(a, !1, c)) !== m ? f : l[b];
				d = typeof e;
				"string" === d && (f = ac.exec(e)) && (e = (f[1] + 1) * f[2] + parseFloat(h.css(a, b)), d = "number");
				if (!(null == e || "number" ===
					d && isNaN(e)))
					if ("number" === d && !h.cssNumber[g] && (e += "px"), !k || !("set" in k) || (e = k.set(a, e, c)) !== m) try {
						l[b] = e
					} catch (n) {}
			}
		},
		css: function(a, b, e, c) {
			var f, d, k, g = h.camelCase(b);
			return b = h.cssProps[g] || (h.cssProps[g] = v(a.style, g)), k = h.cssHooks[b] || h.cssHooks[g], k && "get" in k && (f = k.get(a, !0, c)), f === m && (f = O(a, b)), "normal" === f && b in gb && (f = gb[b]), e || c !== m ? (d = parseFloat(f), e || h.isNumeric(d) ? d || 0 : f) : f
		},
		swap: function(a, b, e) {
			var c, f = {};
			for (c in b) f[c] = a.style[c], a.style[c] = b[c];
			e = e.call(a);
			for (c in b) a.style[c] = f[c];
			return e
		}
	});
	b.getComputedStyle ? O = function(a, e) {
		var c, f, d, k, g = b.getComputedStyle(a, null),
			l = a.style;
		return g && (c = g.getPropertyValue(e) || g[e], "" === c && !h.contains(a.ownerDocument, a) && (c = h.style(a, e)), sa.test(c) && fb.test(e) && (f = l.width, d = l.minWidth, k = l.maxWidth, l.minWidth = l.maxWidth = l.width = c, c = g.width, l.width = f, l.minWidth = d, l.maxWidth = k)), c
	} : w.documentElement.currentStyle && (O = function(a, b) {
		var e, c, f = a.currentStyle && a.currentStyle[b],
			d = a.style;
		return null == f && d && d[b] && (f = d[b]), sa.test(f) && !Zb.test(b) &&
			(e = d.left, c = a.runtimeStyle && a.runtimeStyle.left, c && (a.runtimeStyle.left = a.currentStyle.left), d.left = "fontSize" === b ? "1em" : f, f = d.pixelLeft + "px", d.left = e, c && (a.runtimeStyle.left = c)), "" === f ? "auto" : f
	});
	h.each(["height", "width"], function(a, b) {
		h.cssHooks[b] = {
			get: function(a, e, c) {
				if (e) return 0 === a.offsetWidth && $b.test(O(a, "display")) ? h.swap(a, bc, function() {
					return D(a, b, c)
				}) : D(a, b, c)
			},
			set: function(a, e, c) {
				return x(a, e, c ? z(a, b, c, h.support.boxSizing && "border-box" === h.css(a, "boxSizing")) : 0)
			}
		}
	});
	h.support.opacity ||
		(h.cssHooks.opacity = {
		get: function(a, b) {
			return Yb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
		},
		set: function(a, b) {
			var e = a.style,
				c = a.currentStyle,
				f = h.isNumeric(b) ? "alpha(opacity\x3d" + 100 * b + ")" : "",
				d = c && c.filter || e.filter || "";
			e.zoom = 1;
			if (1 <= b && ("" === h.trim(d.replace(Ka, "")) && e.removeAttribute) && (e.removeAttribute("filter"), c && !c.filter)) return;
			e.filter = Ka.test(d) ? d.replace(Ka, f) : d + " " + f
		}
	});
	h(function() {
		h.support.reliableMarginRight || (h.cssHooks.marginRight = {
			get: function(a, b) {
				return h.swap(a, {
					display: "inline-block"
				}, function() {
					if (b) return O(a, "marginRight")
				})
			}
		});
		!h.support.pixelPosition && h.fn.position && h.each(["top", "left"], function(a, b) {
			h.cssHooks[b] = {
				get: function(a, e) {
					if (e) {
						var c = O(a, b);
						return sa.test(c) ? h(a).position()[b] + "px" : c
					}
				}
			}
		})
	});
	h.expr && h.expr.filters && (h.expr.filters.hidden = function(a) {
			return 0 === a.offsetWidth && 0 === a.offsetHeight || !h.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || O(a, "display"))
		}, h.expr.filters.visible =
		function(a) {
			return !h.expr.filters.hidden(a)
		});
	h.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(a, b) {
		h.cssHooks[a + b] = {
			expand: function(e) {
				var c = "string" == typeof e ? e.split(" ") : [e],
					f = {};
				for (e = 0; 4 > e; e++) f[a + X[e] + b] = c[e] || c[e - 2] || c[0];
				return f
			}
		};
		fb.test(a) || (h.cssHooks[a + b].set = x)
	});
	var dc = /%20/g,
		tb = /\[\]$/,
		hb = /\r?\n/g,
		ec = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		fc = /^(?:select|textarea)/i;
	h.fn.extend({
		serialize: function() {
			return h.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				return this.elements ? h.makeArray(this.elements) : this
			}).filter(function() {
				return this.name && !this.disabled && (this.checked || fc.test(this.nodeName) || ec.test(this.type))
			}).map(function(a, b) {
				var e = h(this).val();
				return null == e ? null : h.isArray(e) ? h.map(e, function(a, e) {
					return {
						name: b.name,
						value: a.replace(hb, "\r\n")
					}
				}) : {
					name: b.name,
					value: e.replace(hb, "\r\n")
				}
			}).get()
		}
	});
	h.param = function(a, b) {
		var e, c = [],
			f = function(a, b) {
				b = h.isFunction(b) ? b() : null == b ? "" : b;
				c[c.length] =
					encodeURIComponent(a) + "\x3d" + encodeURIComponent(b)
			};
		b === m && (b = h.ajaxSettings && h.ajaxSettings.traditional);
		if (h.isArray(a) || a.jquery && !h.isPlainObject(a)) h.each(a, function() {
			f(this.name, this.value)
		});
		else
			for (e in a) B(e, a[e], b, f);
		return c.join("\x26").replace(dc, "+")
	};
	var ga, T, gc = /#.*$/,
		hc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
		ic = /^(?:GET|HEAD)$/,
		jc = /^\/\//,
		ib = /\?/,
		kc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		lc = /([?&])_=[^&]*/,
		jb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		kb = h.fn.load,
		Da = {}, lb = {}, mb = ["*/"] + ["*"];
	try {
		T = N.href
	} catch (sc) {
		T = w.createElement("a"), T.href = "", T = T.href
	}
	ga = jb.exec(T.toLowerCase()) || [];
	h.fn.load = function(a, b, e) {
		if ("string" != typeof a && kb) return kb.apply(this, arguments);
		if (!this.length) return this;
		var c, f, d, k = this,
			g = a.indexOf(" ");
		return 0 <= g && (c = a.slice(g, a.length), a = a.slice(0, g)), h.isFunction(b) ? (e = b, b = m) : b && "object" == typeof b && (f = "POST"), h.ajax({
			url: a,
			type: f,
			dataType: "html",
			data: b,
			complete: function(a, b) {
				e && k.each(e, d || [a.responseText, b, a])
			}
		}).done(function(a) {
			d =
				arguments;
			k.html(c ? h("\x3cdiv\x3e").append(a.replace(kc, "")).find(c) : a)
		}), this
	};
	h.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
		h.fn[b] = function(a) {
			return this.on(b, a)
		}
	});
	h.each(["get", "post"], function(a, b) {
		h[b] = function(a, e, c, f) {
			return h.isFunction(e) && (f = f || c, c = e, e = m), h.ajax({
				type: b,
				url: a,
				data: e,
				success: c,
				dataType: f
			})
		}
	});
	h.extend({
		getScript: function(a, b) {
			return h.get(a, m, b, "script")
		},
		getJSON: function(a, b, e) {
			return h.get(a, b, e, "json")
		},
		ajaxSetup: function(a,
			b) {
			return b ? L(a, h.ajaxSettings) : (b = a, a = h.ajaxSettings), L(a, b), a
		},
		ajaxSettings: {
			url: T,
			isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(ga[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": mb
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": b.String,
				"text html": !0,
				"text json": h.parseJSON,
				"text xml": h.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: F(Da),
		ajaxTransport: F(lb),
		ajax: function(a, b) {
			function e(a, b, d, l) {
				var p, E, I, C, w, U = b;
				if (2 !== z) {
					z = 2;
					g && clearTimeout(g);
					k = m;
					f = l || "";
					y.readyState = 0 < a ? 4 : 0;
					if (d) {
						C = q;
						l = y;
						var D, P, F, B, J = C.contents,
							G = C.dataTypes,
							H = C.responseFields;
						for (P in H) P in d && (l[H[P]] = d[P]);
						for (;
							"*" === G[0];) G.shift(), D === m && (D = C.mimeType || l.getResponseHeader("content-type"));
						if (D)
							for (P in J)
								if (J[P] &&
									J[P].test(D)) {
									G.unshift(P);
									break
								}
						if (G[0] in d) F = G[0];
						else {
							for (P in d) {
								if (!G[0] || C.converters[P + " " + G[0]]) {
									F = P;
									break
								}
								B || (B = P)
							}
							F = F || B
						}
						d = F ? (F !== G[0] && G.unshift(F), d[F]) : void 0;
						C = d
					}
					if (200 <= a && 300 > a || 304 === a)
						if (q.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (h.lastModified[c] = w), w = y.getResponseHeader("Etag"), w && (h.etag[c] = w)), 304 === a) U = "notmodified", p = !0;
						else {
							var R;
							a: {
								p = q;
								E = C;
								var va, U = p.dataTypes.slice();
								d = U[0];
								D = {};
								P = 0;
								p.dataFilter && (E = p.dataFilter(E, p.dataType));
								if (U[1])
									for (R in p.converters) D[R.toLowerCase()] =
										p.converters[R];
								for (; I = U[++P];)
									if ("*" !== I) {
										if ("*" !== d && d !== I) {
											R = D[d + " " + I] || D["* " + I];
											if (!R)
												for (va in D)
													if (w = va.split(" "), w[1] === I && (R = D[d + " " + w[0]] || D["* " + w[0]])) {
														!0 === R ? R = D[va] : !0 !== D[va] && (I = w[0], U.splice(P--, 0, I));
														break
													}
											if (!0 !== R)
												if (R && p["throws"]) E = R(E);
												else try {
													E = R(E)
												} catch (M) {
													R = {
														state: "parsererror",
														error: R ? M : "No conversion from " + d + " to " + I
													};
													break a
												}
										}
										d = I
									}
								R = {
									state: "success",
									data: E
								}
							}
							p = R;
							U = p.state;
							E = p.data;
							I = p.error;
							p = !I
						} else
					if (I = U, !U || a) U = "error", 0 > a && (a = 0);
					y.status = a;
					y.statusText = (b || U) +
						"";
					p ? v.resolveWith(r, [E, U, y]) : v.rejectWith(r, [y, U, I]);
					y.statusCode(x);
					x = m;
					n && u.trigger("ajax" + (p ? "Success" : "Error"), [y, q, p ? E : I]);
					A.fireWith(r, [y, U]);
					n && (u.trigger("ajaxComplete", [y, q]), --h.active || h.event.trigger("ajaxStop"))
				}
			}
			"object" == typeof a && (b = a, a = m);
			b = b || {};
			var c, f, d, k, g, l, n, p, q = h.ajaxSetup({}, b),
				r = q.context || q,
				u = r !== q && (r.nodeType || r instanceof h) ? h(r) : h.event,
				v = h.Deferred(),
				A = h.Callbacks("once memory"),
				x = q.statusCode || {}, C = {}, w = {}, z = 0,
				D = "canceled",
				y = {
					readyState: 0,
					setRequestHeader: function(a,
						b) {
						if (!z) {
							var e = a.toLowerCase();
							a = w[e] = w[e] || a;
							C[a] = b
						}
						return this
					},
					getAllResponseHeaders: function() {
						return 2 === z ? f : null
					},
					getResponseHeader: function(a) {
						var b;
						if (2 === z) {
							if (!d)
								for (d = {}; b = hc.exec(f);) d[b[1].toLowerCase()] = b[2];
							b = d[a.toLowerCase()]
						}
						return b === m ? null : b
					},
					overrideMimeType: function(a) {
						return z || (q.mimeType = a), this
					},
					abort: function(a) {
						return a = a || D, k && k.abort(a), e(0, a), this
					}
				};
			v.promise(y);
			y.success = y.done;
			y.error = y.fail;
			y.complete = A.add;
			y.statusCode = function(a) {
				if (a) {
					var b;
					if (2 > z)
						for (b in a) x[b] =
							[x[b], a[b]];
					else b = a[y.status], y.always(b)
				}
				return this
			};
			q.url = ((a || q.url) + "").replace(gc, "").replace(jc, ga[1] + "//");
			q.dataTypes = h.trim(q.dataType || "*").toLowerCase().split(da);
			null == q.crossDomain && (l = jb.exec(q.url.toLowerCase()), q.crossDomain = !(!l || l[1] === ga[1] && l[2] === ga[2] && (l[3] || ("http:" === l[1] ? 80 : 443)) == (ga[3] || ("http:" === ga[1] ? 80 : 443))));
			q.data && q.processData && "string" != typeof q.data && (q.data = h.param(q.data, q.traditional));
			G(Da, q, b, y);
			if (2 === z) return y;
			n = q.global;
			q.type = q.type.toUpperCase();
			q.hasContent = !ic.test(q.type);
			n && 0 === h.active++ && h.event.trigger("ajaxStart");
			if (!q.hasContent && (q.data && (q.url += (ib.test(q.url) ? "\x26" : "?") + q.data, delete q.data), c = q.url, !1 === q.cache)) {
				l = h.now();
				var F = q.url.replace(lc, "$1_\x3d" + l);
				q.url = F + (F === q.url ? (ib.test(q.url) ? "\x26" : "?") + "_\x3d" + l : "")
			}(q.data && q.hasContent && !1 !== q.contentType || b.contentType) && y.setRequestHeader("Content-Type", q.contentType);
			q.ifModified && (c = c || q.url, h.lastModified[c] && y.setRequestHeader("If-Modified-Since", h.lastModified[c]),
				h.etag[c] && y.setRequestHeader("If-None-Match", h.etag[c]));
			y.setRequestHeader("Accept", q.dataTypes[0] && q.accepts[q.dataTypes[0]] ? q.accepts[q.dataTypes[0]] + ("*" !== q.dataTypes[0] ? ", " + mb + "; q\x3d0.01" : "") : q.accepts["*"]);
			for (p in q.headers) y.setRequestHeader(p, q.headers[p]);
			if (!q.beforeSend || !1 !== q.beforeSend.call(r, y, q) && 2 !== z) {
				D = "abort";
				for (p in {
					success: 1,
					error: 1,
					complete: 1
				}) y[p](q[p]);
				if (k = G(lb, q, b, y)) {
					y.readyState = 1;
					n && u.trigger("ajaxSend", [y, q]);
					q.async && 0 < q.timeout && (g = setTimeout(function() {
							y.abort("timeout")
						},
						q.timeout));
					try {
						z = 1, k.send(C, e)
					} catch (B) {
						if (!(2 > z)) throw B;
						e(-1, B)
					}
				} else e(-1, "No Transport");
				return y
			}
			return y.abort()
		},
		active: 0,
		lastModified: {},
		etag: {}
	});
	var nb = [],
		mc = /\?/,
		za = /(=)\?(?=&|$)|\?\?/,
		nc = h.now();
	h.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var a = nb.pop() || h.expando + "_" + nc++;
			return this[a] = !0, a
		}
	});
	h.ajaxPrefilter("json jsonp", function(a, e, c) {
		var f, d, k, g = a.data,
			l = a.url,
			n = !1 !== a.jsonp,
			p = n && za.test(l),
			q = n && !p && "string" == typeof g && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") &&
				za.test(g);
		if ("jsonp" === a.dataTypes[0] || p || q) return f = a.jsonpCallback = h.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, d = b[f], p ? a.url = l.replace(za, "$1" + f) : q ? a.data = g.replace(za, "$1" + f) : n && (a.url += (mc.test(l) ? "\x26" : "?") + a.jsonp + "\x3d" + f), a.converters["script json"] = function() {
			return k || h.error(f + " was not called"), k[0]
		}, a.dataTypes[0] = "json", b[f] = function() {
			k = arguments
		}, c.always(function() {
			b[f] = d;
			a[f] && (a.jsonpCallback = e.jsonpCallback, nb.push(f));
			k && h.isFunction(d) && d(k[0]);
			k = d = m
		}),
			"script"
	});
	h.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function(a) {
				return h.globalEval(a), a
			}
		}
	});
	h.ajaxPrefilter("script", function(a) {
		a.cache === m && (a.cache = !1);
		a.crossDomain && (a.type = "GET", a.global = !1)
	});
	h.ajaxTransport("script", function(a) {
		if (a.crossDomain) {
			var b, e = w.head || w.getElementsByTagName("head")[0] || w.documentElement;
			return {
				send: function(c, f) {
					b =
						w.createElement("script");
					b.async = "async";
					a.scriptCharset && (b.charset = a.scriptCharset);
					b.src = a.url;
					b.onload = b.onreadystatechange = function(a, c) {
						if (c || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, e && b.parentNode && e.removeChild(b), b = m, c || f(200, "success")
					};
					e.insertBefore(b, e.firstChild)
				},
				abort: function() {
					b && b.onload(0, 1)
				}
			}
		}
	});
	var ka, La = b.ActiveXObject ? function() {
			for (var a in ka) ka[a](0, 1)
		} : !1,
		oc = 0;
	h.ajaxSettings.xhr = b.ActiveXObject ? function() {
		var a;
		if (!(a = !this.isLocal &&
			J())) a: {
			try {
				a = new b.ActiveXObject("Microsoft.XMLHTTP");
				break a
			} catch (e) {}
			a = void 0
		}
		return a
	} : J;
	(function(a) {
		h.extend(h.support, {
			ajax: !! a,
			cors: !! a && "withCredentials" in a
		})
	})(h.ajaxSettings.xhr());
	h.support.ajax && h.ajaxTransport(function(a) {
		if (!a.crossDomain || h.support.cors) {
			var e;
			return {
				send: function(c, f) {
					var d, k, g = a.xhr();
					a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async);
					if (a.xhrFields)
						for (k in a.xhrFields) g[k] = a.xhrFields[k];
					a.mimeType && g.overrideMimeType &&
						g.overrideMimeType(a.mimeType);
					!a.crossDomain && !c["X-Requested-With"] && (c["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (k in c) g.setRequestHeader(k, c[k])
					} catch (l) {}
					g.send(a.hasContent && a.data || null);
					e = function(b, c) {
						var k, l, n, p, q;
						try {
							if (e && (c || 4 === g.readyState))
								if (e = m, d && (g.onreadystatechange = h.noop, La && delete ka[d]), c) 4 !== g.readyState && g.abort();
								else {
									k = g.status;
									n = g.getAllResponseHeaders();
									p = {};
									(q = g.responseXML) && q.documentElement && (p.xml = q);
									try {
										p.text = g.responseText
									} catch (r) {}
									try {
										l = g.statusText
									} catch (u) {
										l =
											""
									}!k && a.isLocal && !a.crossDomain ? k = p.text ? 200 : 404 : 1223 === k && (k = 204)
								}
						} catch (v) {
							c || f(-1, v)
						}
						p && f(k, l, p, n)
					};
					a.async ? 4 === g.readyState ? setTimeout(e, 0) : (d = ++oc, La && (ka || (ka = {}, h(b).unload(La)), ka[d] = e), g.onreadystatechange = e) : e()
				},
				abort: function() {
					e && e(0, 1)
				}
			}
		}
	});
	var ia, Aa, pc = /^(?:toggle|show|hide)$/,
		qc = RegExp("^(?:([-+])\x3d|)(" + xa + ")([a-z%]*)$", "i"),
		rc = /queueHooks$/,
		ua = [
			function(a, b, e) {
				var c, f, d, k, g, l, n = this,
					p = a.style,
					q = {}, r = [],
					u = a.nodeType && A(a);
				e.queue || (g = h._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued =
					0, l = g.empty.fire, g.empty.fire = function() {
						g.unqueued || l()
					}), g.unqueued++, n.always(function() {
					n.always(function() {
						g.unqueued--;
						h.queue(a, "fx").length || g.empty.fire()
					})
				}));
				1 === a.nodeType && ("height" in b || "width" in b) && (e.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === h.css(a, "display") && "none" === h.css(a, "float") && (!h.support.inlineBlockNeedsLayout || "inline" === y(a.nodeName) ? p.display = "inline-block" : p.zoom = 1));
				e.overflow && (p.overflow = "hidden", h.support.shrinkWrapBlocks || n.done(function() {
					p.overflow =
						e.overflow[0];
					p.overflowX = e.overflow[1];
					p.overflowY = e.overflow[2]
				}));
				for (c in b) d = b[c], pc.exec(d) && (delete b[c], f = f || "toggle" === d, d !== (u ? "hide" : "show") && r.push(c));
				if (b = r.length) {
					d = h._data(a, "fxshow") || h._data(a, "fxshow", {});
					"hidden" in d && (u = d.hidden);
					f && (d.hidden = !u);
					u ? h(a).show() : n.done(function() {
						h(a).hide()
					});
					n.done(function() {
						var b;
						h.removeData(a, "fxshow", !0);
						for (b in q) h.style(a, b, q[b])
					});
					for (c = 0; c < b; c++) f = r[c], k = n.createTween(f, u ? d[f] : 0), q[f] = d[f] || h.style(a, f), f in d || (d[f] = k.start, u && (k.end =
						k.start, k.start = "width" === f || "height" === f ? 1 : 0))
				}
			}
		],
		oa = {
			"*": [
				function(a, b) {
					var e, c, f = this.createTween(a, b),
						d = qc.exec(b),
						k = f.cur(),
						g = +k || 0,
						l = 1,
						n = 20;
					if (d) {
						e = +d[2];
						c = d[3] || (h.cssNumber[a] ? "" : "px");
						if ("px" !== c && g) {
							g = h.css(f.elem, a, !0) || e || 1;
							do l = l || ".5", g /= l, h.style(f.elem, a, g + c); while (l !== (l = f.cur() / k) && 1 !== l && --n)
						}
						f.unit = c;
						f.start = g;
						f.end = d[1] ? g + (d[1] + 1) * e : e
					}
					return f
				}
			]
		};
	h.Animation = h.extend(la, {
		tweener: function(a, b) {
			h.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
			for (var e, c = 0, f = a.length; c < f; c++) e = a[c],
			oa[e] = oa[e] || [], oa[e].unshift(b)
		},
		prefilter: function(a, b) {
			b ? ua.unshift(a) : ua.push(a)
		}
	});
	h.Tween = M;
	M.prototype = {
		constructor: M,
		init: function(a, b, e, c, f, d) {
			this.elem = a;
			this.prop = e;
			this.easing = f || "swing";
			this.options = b;
			this.start = this.now = this.cur();
			this.end = c;
			this.unit = d || (h.cssNumber[e] ? "" : "px")
		},
		cur: function() {
			var a = M.propHooks[this.prop];
			return a && a.get ? a.get(this) : M.propHooks._default.get(this)
		},
		run: function(a) {
			var b, e = M.propHooks[this.prop];
			return this.options.duration ? this.pos = b = h.easing[this.easing](a,
				this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), e && e.set ? e.set(this) : M.propHooks._default.set(this), this
		}
	};
	M.prototype.init.prototype = M.prototype;
	M.propHooks = {
		_default: {
			get: function(a) {
				var b;
				return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = h.css(a.elem, a.prop, !1, ""), !b || "auto" === b ? 0 : b) : a.elem[a.prop]
			},
			set: function(a) {
				h.fx.step[a.prop] ? h.fx.step[a.prop](a) :
					a.elem.style && (null != a.elem.style[h.cssProps[a.prop]] || h.cssHooks[a.prop]) ? h.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
			}
		}
	};
	M.propHooks.scrollTop = M.propHooks.scrollLeft = {
		set: function(a) {
			a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
		}
	};
	h.each(["toggle", "show", "hide"], function(a, b) {
		var e = h.fn[b];
		h.fn[b] = function(c, f, d) {
			return null == c || "boolean" == typeof c || !a && h.isFunction(c) && h.isFunction(f) ? e.apply(this, arguments) : this.animate(V(b, !0), c, f, d)
		}
	});
	h.fn.extend({
		fadeTo: function(a,
			b, e, c) {
			return this.filter(A).css("opacity", 0).show().end().animate({
				opacity: b
			}, a, e, c)
		},
		animate: function(a, b, e, c) {
			var f = h.isEmptyObject(a),
				d = h.speed(b, e, c);
			b = function() {
				var b = la(this, h.extend({}, a), d);
				f && b.stop(!0)
			};
			return f || !1 === d.queue ? this.each(b) : this.queue(d.queue, b)
		},
		stop: function(a, b, e) {
			var c = function(a) {
				var b = a.stop;
				delete a.stop;
				b(e)
			};
			return "string" != typeof a && (e = b, b = a, a = m), b && !1 !== a && this.queue(a || "fx", []), this.each(function() {
				var b = !0,
					f = null != a && a + "queueHooks",
					d = h.timers,
					k = h._data(this);
				if (f) k[f] && k[f].stop && c(k[f]);
				else
					for (f in k) k[f] && k[f].stop && rc.test(f) && c(k[f]);
				for (f = d.length; f--;) d[f].elem === this && (null == a || d[f].queue === a) && (d[f].anim.stop(e), b = !1, d.splice(f, 1));
				(b || !e) && h.dequeue(this, a)
			})
		}
	});
	h.each({
		slideDown: V("show"),
		slideUp: V("hide"),
		slideToggle: V("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(a, b) {
		h.fn[a] = function(a, e, c) {
			return this.animate(b, a, e, c)
		}
	});
	h.speed = function(a, b, e) {
		var c = a && "object" == typeof a ? h.extend({},
			a) : {
			complete: e || !e && b || h.isFunction(a) && a,
			duration: a,
			easing: e && b || b && !h.isFunction(b) && b
		};
		c.duration = h.fx.off ? 0 : "number" == typeof c.duration ? c.duration : c.duration in h.fx.speeds ? h.fx.speeds[c.duration] : h.fx.speeds._default;
		if (null == c.queue || !0 === c.queue) c.queue = "fx";
		return c.old = c.complete, c.complete = function() {
			h.isFunction(c.old) && c.old.call(this);
			c.queue && h.dequeue(this, c.queue)
		}, c
	};
	h.easing = {
		linear: function(a) {
			return a
		},
		swing: function(a) {
			return 0.5 - Math.cos(a * Math.PI) / 2
		}
	};
	h.timers = [];
	h.fx = M.prototype.init;
	h.fx.tick = function() {
		var a, b = h.timers,
			e = 0;
		for (ia = h.now(); e < b.length; e++) a = b[e], !a() && b[e] === a && b.splice(e--, 1);
		b.length || h.fx.stop();
		ia = m
	};
	h.fx.timer = function(a) {
		a() && h.timers.push(a) && !Aa && (Aa = setInterval(h.fx.tick, h.fx.interval))
	};
	h.fx.interval = 13;
	h.fx.stop = function() {
		clearInterval(Aa);
		Aa = null
	};
	h.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	h.fx.step = {};
	h.expr && h.expr.filters && (h.expr.filters.animated = function(a) {
		return h.grep(h.timers, function(b) {
			return a === b.elem
		}).length
	});
	var ob = /^(?:body|html)$/i;
	h.fn.offset = function(a) {
		if (arguments.length) return a === m ? this : this.each(function(b) {
			h.offset.setOffset(this, a, b)
		});
		var b, e, c, f, d, k, g, l = {
				top: 0,
				left: 0
			}, n = this[0],
			p = n && n.ownerDocument;
		if (p) return (e = p.body) === n ? h.offset.bodyOffset(n) : (b = p.documentElement, h.contains(b, n) ? ("undefined" != typeof n.getBoundingClientRect && (l = n.getBoundingClientRect()), c = ba(p), f = b.clientTop || e.clientTop || 0, d = b.clientLeft || e.clientLeft || 0, k = c.pageYOffset || b.scrollTop, g = c.pageXOffset || b.scrollLeft, {
			top: l.top + k - f,
			left: l.left + g - d
		}) : l)
	};
	h.offset = {
		bodyOffset: function(a) {
			var b = a.offsetTop,
				e = a.offsetLeft;
			return h.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(h.css(a, "marginTop")) || 0, e += parseFloat(h.css(a, "marginLeft")) || 0), {
				top: b,
				left: e
			}
		},
		setOffset: function(a, b, e) {
			var c = h.css(a, "position");
			"static" === c && (a.style.position = "relative");
			var f = h(a),
				d = f.offset(),
				k = h.css(a, "top"),
				g = h.css(a, "left"),
				l = {}, n = {}, p, q;
			("absolute" === c || "fixed" === c) && -1 < h.inArray("auto", [k, g]) ? (n = f.position(), p = n.top, q = n.left) : (p = parseFloat(k) ||
					0, q = parseFloat(g) || 0);
			h.isFunction(b) && (b = b.call(a, e, d));
			null != b.top && (l.top = b.top - d.top + p);
			null != b.left && (l.left = b.left - d.left + q);
			"using" in b ? b.using.call(a, l) : f.css(l)
		}
	};
	h.fn.extend({
		position: function() {
			if (this[0]) {
				var a = this[0],
					b = this.offsetParent(),
					e = this.offset(),
					c = ob.test(b[0].nodeName) ? {
						top: 0,
						left: 0
					} : b.offset();
				return e.top -= parseFloat(h.css(a, "marginTop")) || 0, e.left -= parseFloat(h.css(a, "marginLeft")) || 0, c.top += parseFloat(h.css(b[0], "borderTopWidth")) || 0, c.left += parseFloat(h.css(b[0], "borderLeftWidth")) ||
					0, {
						top: e.top - c.top,
						left: e.left - c.left
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var a = this.offsetParent || w.body; a && !ob.test(a.nodeName) && "static" === h.css(a, "position");) a = a.offsetParent;
				return a || w.body
			})
		}
	});
	h.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(a, b) {
		var e = /Y/.test(b);
		h.fn[a] = function(c) {
			return h.access(this, function(a, c, f) {
				var d = ba(a);
				if (f === m) return d ? b in d ? d[b] : d.document.documentElement[c] : a[c];
				d ? d.scrollTo(e ? h(d).scrollLeft() : f, e ? f : h(d).scrollTop()) :
					a[c] = f
			}, a, c, arguments.length, null)
		}
	});
	h.each({
		Height: "height",
		Width: "width"
	}, function(a, b) {
		h.each({
			padding: "inner" + a,
			content: b,
			"": "outer" + a
		}, function(e, c) {
			h.fn[c] = function(c, f) {
				var d = arguments.length && (e || "boolean" != typeof c),
					k = e || (!0 === c || !0 === f ? "margin" : "border");
				return h.access(this, function(b, e, c) {
					var f;
					return h.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : c === m ?
						h.css(b, e, c, k) : h.style(b, e, c, k)
				}, b, d ? c : m, d, null)
			}
		})
	});
	b.jQuery = b.$ = h;
	"function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
		return h
	})
})(window);
(function(b, m) {
	function d(c, d) {
		var f = c.nodeName.toLowerCase();
		if ("area" === f) {
			var f = c.parentNode,
				e = f.name;
			if (!c.href || !e || "map" !== f.nodeName.toLowerCase()) return !1;
			f = b("img[usemap\x3d#" + e + "]")[0];
			return !!f && a(f)
		}
		return (/input|select|textarea|button|object/.test(f) ? !c.disabled : "a" == f ? c.href || d : d) && a(c)
	}

	function a(a) {
		return !b(a).parents().andSelf().filter(function() {
			return "hidden" === b.curCSS(this, "visibility") || b.expr.filters.hidden(this)
		}).length
	}
	b.ui = b.ui || {};
	b.ui.version || (b.extend(b.ui, {
		version: "1.8.18",
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91,
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91
		}
	}), b.fn.extend({
		propAttr: b.fn.prop || b.fn.attr,
		_focus: b.fn.focus,
		focus: function(a, d) {
			return "number" === typeof a ? this.each(function() {
				var f =
					this;
				setTimeout(function() {
					b(f).focus();
					d && d.call(f)
				}, a)
			}) : this._focus.apply(this, arguments)
		},
		scrollParent: function() {
			var a;
			a = b.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(b.curCSS(this, "position", 1)) && /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
			}).eq(0) : this.parents().filter(function() {
				return /(auto|scroll)/.test(b.curCSS(this,
					"overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
			}).eq(0);
			return /fixed/.test(this.css("position")) || !a.length ? b(document) : a
		},
		zIndex: function(a) {
			if (a !== m) return this.css("zIndex", a);
			if (this.length) {
				a = b(this[0]);
				for (var d; a.length && a[0] !== document;) {
					d = a.css("position");
					if ("absolute" === d || "relative" === d || "fixed" === d)
						if (d = parseInt(a.css("zIndex"), 10), !isNaN(d) && 0 !== d) return d;
					a = a.parent()
				}
			}
			return 0
		},
		disableSelection: function() {
			return this.bind((b.support.selectstart ? "selectstart" :
				"mousedown") + ".ui-disableSelection", function(a) {
				a.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}), b.each(["Width", "Height"], function(a, d) {
		function f(a, c, f, d) {
			b.each(e, function() {
				c -= parseFloat(b.curCSS(a, "padding" + this, !0)) || 0;
				f && (c -= parseFloat(b.curCSS(a, "border" + this + "Width", !0)) || 0);
				d && (c -= parseFloat(b.curCSS(a, "margin" + this, !0)) || 0)
			});
			return c
		}
		var e = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"],
			k = d.toLowerCase(),
			l = {
				innerWidth: b.fn.innerWidth,
				innerHeight: b.fn.innerHeight,
				outerWidth: b.fn.outerWidth,
				outerHeight: b.fn.outerHeight
			};
		b.fn["inner" + d] = function(a) {
			return a === m ? l["inner" + d].call(this) : this.each(function() {
				b(this).css(k, f(this, a) + "px")
			})
		};
		b.fn["outer" + d] = function(a, e) {
			return "number" !== typeof a ? l["outer" + d].call(this, a) : this.each(function() {
				b(this).css(k, f(this, a, !0, e) + "px")
			})
		}
	}), b.extend(b.expr[":"], {
		data: function(a, d, f) {
			return !!b.data(a, f[3])
		},
		focusable: function(a) {
			return d(a, !isNaN(b.attr(a, "tabindex")))
		},
		tabbable: function(a) {
			var g = b.attr(a, "tabindex"),
				f = isNaN(g);
			return (f || 0 <= g) && d(a, !f)
		}
	}), b(function() {
		var a = document.body,
			d = a.appendChild(d = document.createElement("div"));
		d.offsetHeight;
		b.extend(d.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		});
		b.support.minHeight = 100 === d.offsetHeight;
		b.support.selectstart = "onselectstart" in d;
		a.removeChild(d).style.display = "none"
	}), b.extend(b.ui, {
		plugin: {
			add: function(a, d, f) {
				a = b.ui[a].prototype;
				for (var e in f) a.plugins[e] = a.plugins[e] || [], a.plugins[e].push([d, f[e]])
			},
			call: function(a, b, f) {
				if ((b = a.plugins[b]) &&
					a.element[0].parentNode)
					for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, f)
			}
		},
		contains: function(a, b) {
			return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
		},
		hasScroll: function(a, d) {
			if ("hidden" === b(a).css("overflow")) return !1;
			var f = d && "left" === d ? "scrollLeft" : "scrollTop",
				e = !1;
			if (0 < a[f]) return !0;
			a[f] = 1;
			e = 0 < a[f];
			a[f] = 0;
			return e
		},
		isOverAxis: function(a, b, f) {
			return a > b && a < b + f
		},
		isOver: function(a, d, f, e, k, l) {
			return b.ui.isOverAxis(a, f, k) && b.ui.isOverAxis(d,
				e, l)
		}
	}))
})(jQuery);
(function(b, m) {
	if (b.cleanData) {
		var d = b.cleanData;
		b.cleanData = function(a) {
			for (var g = 0, f; null != (f = a[g]); g++) try {
				b(f).triggerHandler("remove")
			} catch (e) {}
			d(a)
		}
	} else {
		var a = b.fn.remove;
		b.fn.remove = function(c, d) {
			return this.each(function() {
				d || (!c || b.filter(c, [this]).length) && b("*", this).add([this]).each(function() {
					try {
						b(this).triggerHandler("remove")
					} catch (a) {}
				});
				return a.call(b(this), c, d)
			})
		}
	}
	b.widget = function(a, d, f) {
		var e = a.split(".")[0],
			k;
		a = a.split(".")[1];
		k = e + "-" + a;
		f || (f = d, d = b.Widget);
		b.expr[":"][k] =
			function(e) {
				return !!b.data(e, a)
		};
		b[e] = b[e] || {};
		b[e][a] = function(a, b) {
			arguments.length && this._createWidget(a, b)
		};
		d = new d;
		d.options = b.extend(!0, {}, d.options);
		b[e][a].prototype = b.extend(!0, d, {
			namespace: e,
			widgetName: a,
			widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
			widgetBaseClass: k
		}, f);
		b.widget.bridge(a, b[e][a])
	};
	b.widget.bridge = function(a, d) {
		b.fn[a] = function(f) {
			var e = "string" === typeof f,
				k = Array.prototype.slice.call(arguments, 1),
				l = this;
			f = !e && k.length ? b.extend.apply(null, [!0, f].concat(k)) : f;
			if (e && "_" === f.charAt(0)) return l;
			e ? this.each(function() {
				var e = b.data(this, a),
					d = e && b.isFunction(e[f]) ? e[f].apply(e, k) : e;
				if (d !== e && d !== m) return l = d, !1
			}) : this.each(function() {
				var e = b.data(this, a);
				e ? e.option(f || {})._init() : b.data(this, a, new d(f, this))
			});
			return l
		}
	};
	b.Widget = function(a, b) {
		arguments.length && this._createWidget(a, b)
	};
	b.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		options: {
			disabled: !1
		},
		_createWidget: function(a, d) {
			b.data(d, this.widgetName, this);
			this.element = b(d);
			this.options = b.extend(!0, {}, this.options, this._getCreateOptions(), a);
			var f = this;
			this.element.bind("remove." + this.widgetName, function() {
				f.destroy()
			});
			this._create();
			this._trigger("create");
			this._init()
		},
		_getCreateOptions: function() {
			return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
		},
		_create: function() {},
		_init: function() {},
		destroy: function() {
			this.element.unbind("." + this.widgetName).removeData(this.widgetName);
			this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass +
				"-disabled ui-state-disabled")
		},
		widget: function() {
			return this.element
		},
		option: function(a, d) {
			var f = a;
			if (0 === arguments.length) return b.extend({}, this.options);
			if ("string" === typeof a) {
				if (d === m) return this.options[a];
				f = {};
				f[a] = d
			}
			this._setOptions(f);
			return this
		},
		_setOptions: function(a) {
			var d = this;
			b.each(a, function(a, b) {
				d._setOption(a, b)
			});
			return this
		},
		_setOption: function(a, b) {
			this.options[a] = b;
			"disabled" === a && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled",
				b);
			return this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_trigger: function(a, d, f) {
			var e, k = this.options[a];
			f = f || {};
			d = b.Event(d);
			d.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
			d.target = this.element[0];
			if (a = d.originalEvent)
				for (e in a) e in d || (d[e] = a[e]);
			this.element.trigger(d, f);
			return !(b.isFunction(k) && !1 === k.call(this.element[0], d, f) || d.isDefaultPrevented())
		}
	}
})(jQuery);
(function(b, m) {
	var d = !1;
	b(document).mouseup(function(a) {
		d = !1
	});
	b.widget("ui.mouse", {
		options: {
			cancel: ":input,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var a = this;
			this.element.bind("mousedown." + this.widgetName, function(b) {
				return a._mouseDown(b)
			}).bind("click." + this.widgetName, function(c) {
				if (!0 === b.data(c.target, a.widgetName + ".preventClickEvent")) return b.removeData(c.target, a.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
			});
			this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." +
				this.widgetName)
		},
		_mouseDown: function(a) {
			if (!d) {
				this._mouseStarted && this._mouseUp(a);
				this._mouseDownEvent = a;
				var c = this,
					g = 1 == a.which,
					f = "string" == typeof this.options.cancel && a.target.nodeName ? b(a.target).closest(this.options.cancel).length : !1;
				if (!g || f || !this._mouseCapture(a)) return !0;
				this.mouseDelayMet = !this.options.delay;
				this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					c.mouseDelayMet = !0
				}, this.options.delay));
				if (this._mouseDistanceMet(a) && this._mouseDelayMet(a) && (this._mouseStarted = !1 !== this._mouseStart(a), !this._mouseStarted)) return a.preventDefault(), !0;
				!0 === b.data(a.target, this.widgetName + ".preventClickEvent") && b.removeData(a.target, this.widgetName + ".preventClickEvent");
				this._mouseMoveDelegate = function(a) {
					return c._mouseMove(a)
				};
				this._mouseUpDelegate = function(a) {
					return c._mouseUp(a)
				};
				b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
				a.preventDefault();
				return d = !0
			}
		},
		_mouseMove: function(a) {
			if (b.browser.msie && !(9 <= document.documentMode) && !a.button) return this._mouseUp(a);
			if (this._mouseStarted) return this._mouseDrag(a), a.preventDefault();
			this._mouseDistanceMet(a) && this._mouseDelayMet(a) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, a)) ? this._mouseDrag(a) : this._mouseUp(a));
			return !this._mouseStarted
		},
		_mouseUp: function(a) {
			b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
			this._mouseStarted && (this._mouseStarted = !1, a.target == this._mouseDownEvent.target && b.data(a.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(a));
			return !1
		},
		_mouseDistanceMet: function(a) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function(a) {
			return this.mouseDelayMet
		},
		_mouseStart: function(a) {},
		_mouseDrag: function(a) {},
		_mouseStop: function(a) {},
		_mouseCapture: function(a) {
			return !0
		}
	})
})(jQuery);
(function(b, m) {
	b.widget("ui.draggable", b.ui.mouse, {
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1
		},
		_create: function() {
			"original" == this.options.helper && !/^(?:r|a|f)/.test(this.element.css("position")) &&
				(this.element[0].style.position = "relative");
			this.options.addClasses && this.element.addClass("ui-draggable");
			this.options.disabled && this.element.addClass("ui-draggable-disabled");
			this._mouseInit()
		},
		destroy: function() {
			if (this.element.data("draggable")) return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
		},
		_mouseCapture: function(d) {
			var a = this.options;
			if (this.helper || a.disabled || b(d.target).is(".ui-resizable-handle")) return !1;
			this.handle = this._getHandle(d);
			if (!this.handle) return !1;
			a.iframeFix && b(!0 === a.iframeFix ? "iframe" : a.iframeFix).each(function() {
				b('\x3cdiv class\x3d"ui-draggable-iframeFix" style\x3d"background: #fff;"\x3e\x3c/div\x3e').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1E3
				}).css(b(this).offset()).appendTo("body")
			});
			return !0
		},
		_mouseStart: function(d) {
			var a = this.options;
			this.helper = this._createHelper(d);
			this._cacheHelperProportions();
			b.ui.ddmanager &&
				(b.ui.ddmanager.current = this);
			this._cacheMargins();
			this.cssPosition = this.helper.css("position");
			this.scrollParent = this.helper.scrollParent();
			this.offset = this.positionAbs = this.element.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
			b.extend(this.offset, {
				click: {
					left: d.pageX - this.offset.left,
					top: d.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			});
			this.originalPosition = this.position = this._generatePosition(d);
			this.originalPageX = d.pageX;
			this.originalPageY = d.pageY;
			a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt);
			a.containment && this._setContainment();
			if (!1 === this._trigger("start", d)) return this._clear(), !1;
			this._cacheHelperProportions();
			b.ui.ddmanager && !a.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, d);
			this.helper.addClass("ui-draggable-dragging");
			this._mouseDrag(d, !0);
			b.ui.ddmanager && b.ui.ddmanager.dragStart(this, d);
			return !0
		},
		_mouseDrag: function(d, a) {
			this.position = this._generatePosition(d);
			this.positionAbs =
				this._convertPositionTo("absolute");
			if (!a) {
				var c = this._uiHash();
				if (!1 === this._trigger("drag", d, c)) return this._mouseUp({}), !1;
				this.position = c.position
			}
			if (!this.options.axis || "y" != this.options.axis) this.helper[0].style.left = this.position.left + "px";
			if (!this.options.axis || "x" != this.options.axis) this.helper[0].style.top = this.position.top + "px";
			b.ui.ddmanager && b.ui.ddmanager.drag(this, d);
			return !1
		},
		_mouseStop: function(d) {
			var a = !1;
			b.ui.ddmanager && !this.options.dropBehaviour && (a = b.ui.ddmanager.drop(this, d));
			this.dropped && (a = this.dropped, this.dropped = !1);
			if ((!this.element[0] || !this.element[0].parentNode) && "original" == this.options.helper) return !1;
			if ("invalid" == this.options.revert && !a || "valid" == this.options.revert && a || !0 === this.options.revert || b.isFunction(this.options.revert) && this.options.revert.call(this.element, a)) {
				var c = this;
				b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					!1 !== c._trigger("stop", d) && c._clear()
				})
			} else !1 !== this._trigger("stop", d) && this._clear();
			return !1
		},
		_mouseUp: function(d) {
			!0 === this.options.iframeFix && b("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			});
			b.ui.ddmanager && b.ui.ddmanager.dragStop(this, d);
			return b.ui.mouse.prototype._mouseUp.call(this, d)
		},
		cancel: function() {
			this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
			return this
		},
		_getHandle: function(d) {
			var a = !this.options.handle || !b(this.options.handle, this.element).length ? !0 : !1;
			b(this.options.handle, this.element).find("*").andSelf().each(function() {
				this ==
					d.target && (a = !0)
			});
			return a
		},
		_createHelper: function(d) {
			var a = this.options;
			d = b.isFunction(a.helper) ? b(a.helper.apply(this.element[0], [d])) : "clone" == a.helper ? this.element.clone().removeAttr("id") : this.element;
			d.parents("body").length || d.appendTo("parent" == a.appendTo ? this.element[0].parentNode : a.appendTo);
			d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute");
			return d
		},
		_adjustOffsetFromHelper: function(d) {
			"string" == typeof d && (d = d.split(" "));
			b.isArray(d) && (d = {
				left: +d[0],
				top: +d[1] || 0
			});
			"left" in d && (this.offset.click.left = d.left + this.margins.left);
			"right" in d && (this.offset.click.left = this.helperProportions.width - d.right + this.margins.left);
			"top" in d && (this.offset.click.top = d.top + this.margins.top);
			"bottom" in d && (this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var d = this.offsetParent.offset();
			"absolute" == this.cssPosition && (this.scrollParent[0] != document &&
				b.ui.contains(this.scrollParent[0], this.offsetParent[0])) && (d.left += this.scrollParent.scrollLeft(), d.top += this.scrollParent.scrollTop());
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && b.browser.msie) d = {
				top: 0,
				left: 0
			};
			return {
				top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" == this.cssPosition) {
				var b =
					this.element.position();
				return {
					top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var d = this.options;
			"parent" == d.containment && (d.containment = this.helper[0].parentNode);
			if ("document" == d.containment || "window" == d.containment) this.containment = ["document" == d.containment ? 0 : b(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == d.containment ? 0 : b(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == d.containment ? 0 : b(window).scrollLeft()) +
				b("document" == d.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == d.containment ? 0 : b(window).scrollTop()) + (b("document" == d.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
			];
			if (!/^(document|window|parent)$/.test(d.containment) && d.containment.constructor != Array) {
				var d = b(d.containment),
					a = d[0];
				if (a) {
					d.offset();
					var c = "hidden" != b(a).css("overflow");
					this.containment = [(parseInt(b(a).css("borderLeftWidth"),
							10) || 0) + (parseInt(b(a).css("paddingLeft"), 10) || 0), (parseInt(b(a).css("borderTopWidth"), 10) || 0) + (parseInt(b(a).css("paddingTop"), 10) || 0), (c ? Math.max(a.scrollWidth, a.offsetWidth) : a.offsetWidth) - (parseInt(b(a).css("borderLeftWidth"), 10) || 0) - (parseInt(b(a).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (c ? Math.max(a.scrollHeight, a.offsetHeight) : a.offsetHeight) - (parseInt(b(a).css("borderTopWidth"), 10) || 0) - (parseInt(b(a).css("paddingBottom"), 10) || 0) - this.helperProportions.height -
						this.margins.top - this.margins.bottom
					];
					this.relative_container = d
				}
			} else d.containment.constructor == Array && (this.containment = d.containment)
		},
		_convertPositionTo: function(d, a) {
			a || (a = this.position);
			var c = "absolute" == d ? 1 : -1,
				g = "absolute" == this.cssPosition && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				f = /(html|body)/i.test(g[0].tagName);
			return {
				top: a.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari &&
					526 > b.browser.version && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : g.scrollTop()) * c),
				left: a.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : g.scrollLeft()) * c)
			}
		},
		_generatePosition: function(d) {
			var a = this.options,
				c = "absolute" == this.cssPosition && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0],
					this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				g = /(html|body)/i.test(c[0].tagName),
				f = d.pageX,
				e = d.pageY;
			if (this.originalPosition) {
				var k;
				this.containment && (this.relative_container ? (k = this.relative_container.offset(), k = [this.containment[0] + k.left, this.containment[1] + k.top, this.containment[2] + k.left, this.containment[3] + k.top]) : k = this.containment, d.pageX - this.offset.click.left < k[0] && (f = k[0] + this.offset.click.left), d.pageY - this.offset.click.top < k[1] && (e = k[1] + this.offset.click.top), d.pageX - this.offset.click.left >
					k[2] && (f = k[2] + this.offset.click.left), d.pageY - this.offset.click.top > k[3] && (e = k[3] + this.offset.click.top));
				a.grid && (e = a.grid[1] ? this.originalPageY + Math.round((e - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, e = k ? !(e - this.offset.click.top < k[1] || e - this.offset.click.top > k[3]) ? e : !(e - this.offset.click.top < k[1]) ? e - a.grid[1] : e + a.grid[1] : e, f = a.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, f = k ? !(f - this.offset.click.left < k[0] || f - this.offset.click.left >
					k[2]) ? f : !(f - this.offset.click.left < k[0]) ? f - a.grid[0] : f + a.grid[0] : f)
			}
			return {
				top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : c.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :
					g ? 0 : c.scrollLeft())
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging");
			this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
			this.helper = null;
			this.cancelHelperRemoval = !1
		},
		_trigger: function(d, a, c) {
			c = c || this._uiHash();
			b.ui.plugin.call(this, d, [a, c]);
			"drag" == d && (this.positionAbs = this._convertPositionTo("absolute"));
			return b.Widget.prototype._trigger.call(this, d, a, c)
		},
		plugins: {},
		_uiHash: function(b) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	});
	b.extend(b.ui.draggable, {
		version: "1.8.18"
	});
	b.ui.plugin.add("draggable", "connectToSortable", {
		start: function(d, a) {
			var c = b(this).data("draggable"),
				g = c.options,
				f = b.extend({}, a, {
					item: c.element
				});
			c.sortables = [];
			b(g.connectToSortable).each(function() {
				var a = b.data(this, "sortable");
				a && !a.options.disabled && (c.sortables.push({
					instance: a,
					shouldRevert: a.options.revert
				}), a.refreshPositions(), a._trigger("activate", d, f))
			})
		},
		stop: function(d, a) {
			var c = b(this).data("draggable"),
				g = b.extend({},
					a, {
						item: c.element
					});
			b.each(c.sortables, function() {
				this.instance.isOver ? (this.instance.isOver = 0, c.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(d), this.instance.options.helper = this.instance.options._helper, "original" == c.options.helper && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", d, g))
			})
		},
		drag: function(d, a) {
			var c = b(this).data("draggable"),
				g = this;
			b.each(c.sortables, function(f) {
				this.instance.positionAbs = c.positionAbs;
				this.instance.helperProportions = c.helperProportions;
				this.instance.offset.click = c.offset.click;
				this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = b(g).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
							return a.helper[0]
						},
						d.target = this.instance.currentItem[0], this.instance._mouseCapture(d, !0), this.instance._mouseStart(d, !0, !0), this.instance.offset.click.top = c.offset.click.top, this.instance.offset.click.left = c.offset.click.left, this.instance.offset.parent.left -= c.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= c.offset.parent.top - this.instance.offset.parent.top, c._trigger("toSortable", d), c.dropped = this.instance.element, c.currentItem = c.element, this.instance.fromOutside = c), this.instance.currentItem &&
					this.instance._mouseDrag(d)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", d, this.instance._uiHash(this.instance)), this.instance._mouseStop(d, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), c._trigger("fromSortable", d), c.dropped = !1)
			})
		}
	});
	b.ui.plugin.add("draggable", "cursor", {
		start: function(d,
			a) {
			var c = b("body"),
				g = b(this).data("draggable").options;
			c.css("cursor") && (g._cursor = c.css("cursor"));
			c.css("cursor", g.cursor)
		},
		stop: function(d, a) {
			var c = b(this).data("draggable").options;
			c._cursor && b("body").css("cursor", c._cursor)
		}
	});
	b.ui.plugin.add("draggable", "opacity", {
		start: function(d, a) {
			var c = b(a.helper),
				g = b(this).data("draggable").options;
			c.css("opacity") && (g._opacity = c.css("opacity"));
			c.css("opacity", g.opacity)
		},
		stop: function(d, a) {
			var c = b(this).data("draggable").options;
			c._opacity && b(a.helper).css("opacity",
				c._opacity)
		}
	});
	b.ui.plugin.add("draggable", "scroll", {
		start: function(d, a) {
			var c = b(this).data("draggable");
			c.scrollParent[0] != document && "HTML" != c.scrollParent[0].tagName && (c.overflowOffset = c.scrollParent.offset())
		},
		drag: function(d, a) {
			var c = b(this).data("draggable"),
				g = c.options,
				f = !1;
			if (c.scrollParent[0] != document && "HTML" != c.scrollParent[0].tagName) {
				if (!g.axis || "x" != g.axis) c.overflowOffset.top + c.scrollParent[0].offsetHeight - d.pageY < g.scrollSensitivity ? c.scrollParent[0].scrollTop = f = c.scrollParent[0].scrollTop +
					g.scrollSpeed : d.pageY - c.overflowOffset.top < g.scrollSensitivity && (c.scrollParent[0].scrollTop = f = c.scrollParent[0].scrollTop - g.scrollSpeed);
				if (!g.axis || "y" != g.axis) c.overflowOffset.left + c.scrollParent[0].offsetWidth - d.pageX < g.scrollSensitivity ? c.scrollParent[0].scrollLeft = f = c.scrollParent[0].scrollLeft + g.scrollSpeed : d.pageX - c.overflowOffset.left < g.scrollSensitivity && (c.scrollParent[0].scrollLeft = f = c.scrollParent[0].scrollLeft - g.scrollSpeed)
			} else {
				if (!g.axis || "x" != g.axis) d.pageY - b(document).scrollTop() <
					g.scrollSensitivity ? f = b(document).scrollTop(b(document).scrollTop() - g.scrollSpeed) : b(window).height() - (d.pageY - b(document).scrollTop()) < g.scrollSensitivity && (f = b(document).scrollTop(b(document).scrollTop() + g.scrollSpeed));
				if (!g.axis || "y" != g.axis) d.pageX - b(document).scrollLeft() < g.scrollSensitivity ? f = b(document).scrollLeft(b(document).scrollLeft() - g.scrollSpeed) : b(window).width() - (d.pageX - b(document).scrollLeft()) < g.scrollSensitivity && (f = b(document).scrollLeft(b(document).scrollLeft() + g.scrollSpeed))
			}!1 !==
				f && (b.ui.ddmanager && !g.dropBehaviour) && b.ui.ddmanager.prepareOffsets(c, d)
		}
	});
	b.ui.plugin.add("draggable", "snap", {
		start: function(d, a) {
			var c = b(this).data("draggable"),
				g = c.options;
			c.snapElements = [];
			b(g.snap.constructor != String ? g.snap.items || ":data(draggable)" : g.snap).each(function() {
				var a = b(this),
					e = a.offset();
				this != c.element[0] && c.snapElements.push({
					item: this,
					width: a.outerWidth(),
					height: a.outerHeight(),
					top: e.top,
					left: e.left
				})
			})
		},
		drag: function(d, a) {
			for (var c = b(this).data("draggable"), g = c.options, f = g.snapTolerance,
					e = a.offset.left, k = e + c.helperProportions.width, l = a.offset.top, r = l + c.helperProportions.height, p = c.snapElements.length - 1; 0 <= p; p--) {
				var n = c.snapElements[p].left,
					u = n + c.snapElements[p].width,
					q = c.snapElements[p].top,
					v = q + c.snapElements[p].height;
				if (n - f < e && e < u + f && q - f < l && l < v + f || n - f < e && e < u + f && q - f < r && r < v + f || n - f < k && k < u + f && q - f < l && l < v + f || n - f < k && k < u + f && q - f < r && r < v + f) {
					if ("inner" != g.snapMode) {
						var m = Math.abs(q - r) <= f,
							C = Math.abs(v - l) <= f,
							x = Math.abs(n - k) <= f,
							z = Math.abs(u - e) <= f;
						m && (a.position.top = c._convertPositionTo("relative", {
							top: q - c.helperProportions.height,
							left: 0
						}).top - c.margins.top);
						C && (a.position.top = c._convertPositionTo("relative", {
							top: v,
							left: 0
						}).top - c.margins.top);
						x && (a.position.left = c._convertPositionTo("relative", {
							top: 0,
							left: n - c.helperProportions.width
						}).left - c.margins.left);
						z && (a.position.left = c._convertPositionTo("relative", {
							top: 0,
							left: u
						}).left - c.margins.left)
					}
					var D = m || C || x || z;
					"outer" != g.snapMode && (m = Math.abs(q - l) <= f, C = Math.abs(v - r) <= f, x = Math.abs(n - e) <= f, z = Math.abs(u - k) <= f, m && (a.position.top = c._convertPositionTo("relative", {
						top: q,
						left: 0
					}).top - c.margins.top), C && (a.position.top = c._convertPositionTo("relative", {
						top: v - c.helperProportions.height,
						left: 0
					}).top - c.margins.top), x && (a.position.left = c._convertPositionTo("relative", {
						top: 0,
						left: n
					}).left - c.margins.left), z && (a.position.left = c._convertPositionTo("relative", {
						top: 0,
						left: u - c.helperProportions.width
					}).left - c.margins.left));
					!c.snapElements[p].snapping && (m || C || x || z || D) && c.options.snap.snap && c.options.snap.snap.call(c.element, d, b.extend(c._uiHash(), {
						snapItem: c.snapElements[p].item
					}));
					c.snapElements[p].snapping = m || C || x || z || D
				} else c.snapElements[p].snapping && c.options.snap.release && c.options.snap.release.call(c.element, d, b.extend(c._uiHash(), {
					snapItem: c.snapElements[p].item
				})), c.snapElements[p].snapping = !1
			}
		}
	});
	b.ui.plugin.add("draggable", "stack", {
		start: function(d, a) {
			var c = b(this).data("draggable").options,
				c = b.makeArray(b(c.stack)).sort(function(a, e) {
					return (parseInt(b(a).css("zIndex"), 10) || 0) - (parseInt(b(e).css("zIndex"), 10) || 0)
				});
			if (c.length) {
				var g = parseInt(c[0].style.zIndex) ||
					0;
				b(c).each(function(a) {
					this.style.zIndex = g + a
				});
				this[0].style.zIndex = g + c.length
			}
		}
	});
	b.ui.plugin.add("draggable", "zIndex", {
		start: function(d, a) {
			var c = b(a.helper),
				g = b(this).data("draggable").options;
			c.css("zIndex") && (g._zIndex = c.css("zIndex"));
			c.css("zIndex", g.zIndex)
		},
		stop: function(d, a) {
			var c = b(this).data("draggable").options;
			c._zIndex && b(a.helper).css("zIndex", c._zIndex)
		}
	})
})(jQuery);
(function(b, m) {
	b.widget("ui.droppable", {
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect"
		},
		_create: function() {
			var d = this.options,
				a = d.accept;
			this.isover = 0;
			this.isout = 1;
			this.accept = b.isFunction(a) ? a : function(b) {
				return b.is(a)
			};
			this.proportions = {
				width: this.element[0].offsetWidth,
				height: this.element[0].offsetHeight
			};
			b.ui.ddmanager.droppables[d.scope] = b.ui.ddmanager.droppables[d.scope] || [];
			b.ui.ddmanager.droppables[d.scope].push(this);
			d.addClasses && this.element.addClass("ui-droppable")
		},
		destroy: function() {
			for (var d = b.ui.ddmanager.droppables[this.options.scope], a = 0; a < d.length; a++) d[a] == this && d.splice(a, 1);
			this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
			return this
		},
		_setOption: function(d, a) {
			"accept" == d && (this.accept = b.isFunction(a) ? a : function(b) {
				return b.is(a)
			});
			b.Widget.prototype._setOption.apply(this, arguments)
		},
		_activate: function(d) {
			var a = b.ui.ddmanager.current;
			this.options.activeClass &&
				this.element.addClass(this.options.activeClass);
			a && this._trigger("activate", d, this.ui(a))
		},
		_deactivate: function(d) {
			var a = b.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass);
			a && this._trigger("deactivate", d, this.ui(a))
		},
		_over: function(d) {
			var a = b.ui.ddmanager.current;
			if (a && (a.currentItem || a.element)[0] != this.element[0])
				if (this.accept.call(this.element[0], a.currentItem || a.element)) this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over",
					d, this.ui(a))
		},
		_out: function(d) {
			var a = b.ui.ddmanager.current;
			if (a && (a.currentItem || a.element)[0] != this.element[0])
				if (this.accept.call(this.element[0], a.currentItem || a.element)) this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", d, this.ui(a))
		},
		_drop: function(d, a) {
			var c = a || b.ui.ddmanager.current;
			if (!c || (c.currentItem || c.element)[0] == this.element[0]) return !1;
			var g = !1;
			this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
				var a = b.data(this,
					"droppable");
				if (a.options.greedy && !a.options.disabled && a.options.scope == c.options.scope && a.accept.call(a.element[0], c.currentItem || c.element) && b.ui.intersect(c, b.extend(a, {
					offset: a.element.offset()
				}), a.options.tolerance)) return g = !0, !1
			});
			return g ? !1 : this.accept.call(this.element[0], c.currentItem || c.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", d, this.ui(c)), this.element) : !1
		},
		ui: function(b) {
			return {
				draggable: b.currentItem || b.element,
				helper: b.helper,
				position: b.position,
				offset: b.positionAbs
			}
		}
	});
	b.extend(b.ui.droppable, {
		version: "1.8.18"
	});
	b.ui.intersect = function(d, a, c) {
		if (!a.offset) return !1;
		var g = (d.positionAbs || d.position.absolute).left,
			f = g + d.helperProportions.width,
			e = (d.positionAbs || d.position.absolute).top,
			k = e + d.helperProportions.height,
			l = a.offset.left,
			r = l + a.proportions.width,
			p = a.offset.top,
			n = p + a.proportions.height;
		switch (c) {
			case "fit":
				return l <= g && f <= r && p <= e && k <= n;
			case "intersect":
				return l < g + d.helperProportions.width / 2 && f - d.helperProportions.width / 2 < r && p < e + d.helperProportions.height / 2 && k - d.helperProportions.height / 2 < n;
			case "pointer":
				return b.ui.isOver((d.positionAbs || d.position.absolute).top + (d.clickOffset || d.offset.click).top, (d.positionAbs || d.position.absolute).left + (d.clickOffset || d.offset.click).left, p, l, a.proportions.height, a.proportions.width);
			case "touch":
				return (e >= p && e <= n || k >= p && k <= n || e < p && k > n) && (g >= l && g <= r || f >= l && f <= r || g < l && f > r);
			default:
				return !1
		}
	};
	b.ui.ddmanager = {
		current: null,
		droppables: {
			"default": []
		},
		prepareOffsets: function(d, a) {
			var c = b.ui.ddmanager.droppables[d.options.scope] || [],
				g = a ? a.type : null,
				f = (d.currentItem || d.element).find(":data(droppable)").andSelf(),
				e = 0;
			a: for (; e < c.length; e++)
				if (!(c[e].options.disabled || d && !c[e].accept.call(c[e].element[0], d.currentItem || d.element))) {
					for (var k = 0; k < f.length; k++)
						if (f[k] == c[e].element[0]) {
							c[e].proportions.height = 0;
							continue a
						}
					c[e].visible = "none" != c[e].element.css("display");
					c[e].visible && ("mousedown" ==
						g && c[e]._activate.call(c[e], a), c[e].offset = c[e].element.offset(), c[e].proportions = {
							width: c[e].element[0].offsetWidth,
							height: c[e].element[0].offsetHeight
						})
				}
		},
		drop: function(d, a) {
			var c = !1;
			b.each(b.ui.ddmanager.droppables[d.options.scope] || [], function() {
				if (this.options && (!this.options.disabled && (this.visible && b.ui.intersect(d, this, this.options.tolerance)) && (c = this._drop.call(this, a) || c), !this.options.disabled && this.visible && this.accept.call(this.element[0], d.currentItem || d.element))) this.isout = 1, this.isover =
					0, this._deactivate.call(this, a)
			});
			return c
		},
		dragStart: function(d, a) {
			d.element.parents(":not(body,html)").bind("scroll.droppable", function() {
				d.options.refreshPositions || b.ui.ddmanager.prepareOffsets(d, a)
			})
		},
		drag: function(d, a) {
			d.options.refreshPositions && b.ui.ddmanager.prepareOffsets(d, a);
			b.each(b.ui.ddmanager.droppables[d.options.scope] || [], function() {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var c = b.ui.intersect(d, this, this.options.tolerance);
					if (c = !c && 1 == this.isover ? "isout" : c && 0 ==
						this.isover ? "isover" : null) {
						var g;
						if (this.options.greedy) {
							var f = this.element.parents(":data(droppable):eq(0)");
							f.length && (g = b.data(f[0], "droppable"), g.greedyChild = "isover" == c ? 1 : 0)
						}
						g && "isover" == c && (g.isover = 0, g.isout = 1, g._out.call(g, a));
						this[c] = 1;
						this["isout" == c ? "isover" : "isout"] = 0;
						this["isover" == c ? "_over" : "_out"].call(this, a);
						g && "isout" == c && (g.isout = 0, g.isover = 1, g._over.call(g, a))
					}
				}
			})
		},
		dragStop: function(d, a) {
			d.element.parents(":not(body,html)").unbind("scroll.droppable");
			d.options.refreshPositions ||
				b.ui.ddmanager.prepareOffsets(d, a)
		}
	}
})(jQuery);
(function(b, m) {
	b.widget("ui.resizable", b.ui.mouse, {
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 1E3
		},
		_create: function() {
			var a = this,
				d = this.options;
			this.element.addClass("ui-resizable");
			b.extend(this, {
				_aspectRatio: !! d.aspectRatio,
				aspectRatio: d.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: d.helper || d.ghost || d.animate ? d.helper || "ui-resizable-helper" : null
			});
			this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(b('\x3cdiv class\x3d"ui-wrapper" style\x3d"overflow: hidden;"\x3e\x3c/div\x3e').css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})), this.element = this.element.parent().data("resizable", this.element.data("resizable")),
				this.elementIsWrapper = !0, this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				}), this.originalElement.css({
					marginLeft: 0,
					marginTop: 0,
					marginRight: 0,
					marginBottom: 0
				}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				})), this.originalElement.css({
					margin: this.originalElement.css("margin")
				}), this._proportionallyResize());
			this.handles = d.handles || (!b(".ui-resizable-handle", this.element).length ? "e,s,se" : {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			});
			if (this.handles.constructor == String) {
				"all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
				var f = this.handles.split(",");
				this.handles = {};
				for (var e = 0; e < f.length; e++) {
					var k = b.trim(f[e]),
						l = b('\x3cdiv class\x3d"ui-resizable-handle ui-resizable-' + k + '"\x3e\x3c/div\x3e');
					/sw|se|ne|nw/.test(k) && l.css({
						zIndex: ++d.zIndex
					});
					"se" == k && l.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
					this.handles[k] = ".ui-resizable-" + k;
					this.element.append(l)
				}
			}
			this._renderAxis = function(a) {
				a = a || this.element;
				for (var e in this.handles) {
					this.handles[e].constructor == String && (this.handles[e] = b(this.handles[e], this.element).show());
					if (this.elementIsWrapper &&
						this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
						var c = b(this.handles[e], this.element),
							f = 0,
							f = /sw|ne|nw|se|n|s/.test(e) ? c.outerHeight() : c.outerWidth(),
							c = ["padding", /ne|nw|n/.test(e) ? "Top" : /se|sw|s/.test(e) ? "Bottom" : /^e$/.test(e) ? "Right" : "Left"].join("");
						a.css(c, f);
						this._proportionallyResize()
					}
					b(this.handles[e])
				}
			};
			this._renderAxis(this.element);
			this._handles = b(".ui-resizable-handle", this.element).disableSelection();
			this._handles.mouseover(function() {
				if (!a.resizing) {
					if (this.className) var b =
						this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
					a.axis = b && b[1] ? b[1] : "se"
				}
			});
			d.autoHide && (this._handles.hide(), b(this.element).addClass("ui-resizable-autohide").hover(function() {
				d.disabled || (b(this).removeClass("ui-resizable-autohide"), a._handles.show())
			}, function() {
				!d.disabled && !a.resizing && (b(this).addClass("ui-resizable-autohide"), a._handles.hide())
			}));
			this._mouseInit()
		},
		destroy: function() {
			this._mouseDestroy();
			var a = function(a) {
				b(a).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			if (this.elementIsWrapper) {
				a(this.element);
				var d = this.element;
				d.after(this.originalElement.css({
					position: d.css("position"),
					width: d.outerWidth(),
					height: d.outerHeight(),
					top: d.css("top"),
					left: d.css("left")
				})).remove()
			}
			this.originalElement.css("resize", this.originalResizeStyle);
			a(this.originalElement);
			return this
		},
		_mouseCapture: function(a) {
			var d = !1,
				f;
			for (f in this.handles) b(this.handles[f])[0] == a.target && (d = !0);
			return !this.options.disabled && d
		},
		_mouseStart: function(a) {
			var g = this.options,
				f = this.element.position(),
				e = this.element;
			this.resizing = !0;
			this.documentScroll = {
				top: b(document).scrollTop(),
				left: b(document).scrollLeft()
			};
			(e.is(".ui-draggable") || /absolute/.test(e.css("position"))) && e.css({
				position: "absolute",
				top: f.top,
				left: f.left
			});
			this._renderProxy();
			var f = d(this.helper.css("left")),
				k = d(this.helper.css("top"));
			g.containment && (f += b(g.containment).scrollLeft() || 0, k += b(g.containment).scrollTop() || 0);
			this.offset = this.helper.offset();
			this.position = {
				left: f,
				top: k
			};
			this.size = this._helper ? {
				width: e.outerWidth(),
				height: e.outerHeight()
			} : {
				width: e.width(),
				height: e.height()
			};
			this.originalSize = this._helper ? {
				width: e.outerWidth(),
				height: e.outerHeight()
			} : {
				width: e.width(),
				height: e.height()
			};
			this.originalPosition = {
				left: f,
				top: k
			};
			this.sizeDiff = {
				width: e.outerWidth() - e.width(),
				height: e.outerHeight() - e.height()
			};
			this.originalMousePosition = {
				left: a.pageX,
				top: a.pageY
			};
			this.aspectRatio = "number" == typeof g.aspectRatio ? g.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
			g = b(".ui-resizable-" + this.axis).css("cursor");
			b("body").css("cursor",
				"auto" == g ? this.axis + "-resize" : g);
			e.addClass("ui-resizable-resizing");
			this._propagate("start", a);
			return !0
		},
		_mouseDrag: function(a) {
			var b = this.helper,
				f = this.originalMousePosition,
				e = this._change[this.axis];
			if (!e) return !1;
			f = e.apply(this, [a, a.pageX - f.left || 0, a.pageY - f.top || 0]);
			this._updateVirtualBoundaries(a.shiftKey);
			if (this._aspectRatio || a.shiftKey) f = this._updateRatio(f, a);
			f = this._respectSize(f, a);
			this._propagate("resize", a);
			b.css({
				top: this.position.top + "px",
				left: this.position.left + "px",
				width: this.size.width + "px",
				height: this.size.height + "px"
			});
			!this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
			this._updateCache(f);
			this._trigger("resize", a, this.ui());
			return !1
		},
		_mouseStop: function(a) {
			this.resizing = !1;
			var d = this.options;
			if (this._helper) {
				var f = this._proportionallyResizeElements,
					e = f.length && /textarea/i.test(f[0].nodeName),
					f = e && b.ui.hasScroll(f[0], "left") ? 0 : this.sizeDiff.height,
					e = e ? 0 : this.sizeDiff.width,
					e = {
						width: this.helper.width() - e,
						height: this.helper.height() - f
					}, f = parseInt(this.element.css("left"),
						10) + (this.position.left - this.originalPosition.left) || null,
					k = parseInt(this.element.css("top"), 10) + (this.position.top - this.originalPosition.top) || null;
				d.animate || this.element.css(b.extend(e, {
					top: k,
					left: f
				}));
				this.helper.height(this.size.height);
				this.helper.width(this.size.width);
				this._helper && !d.animate && this._proportionallyResize()
			}
			b("body").css("cursor", "auto");
			this.element.removeClass("ui-resizable-resizing");
			this._propagate("stop", a);
			this._helper && this.helper.remove();
			return !1
		},
		_updateVirtualBoundaries: function(b) {
			var d =
				this.options,
				f, e, k, d = {
					minWidth: a(d.minWidth) ? d.minWidth : 0,
					maxWidth: a(d.maxWidth) ? d.maxWidth : Infinity,
					minHeight: a(d.minHeight) ? d.minHeight : 0,
					maxHeight: a(d.maxHeight) ? d.maxHeight : Infinity
				};
			if (this._aspectRatio || b) b = d.minHeight * this.aspectRatio, e = d.minWidth / this.aspectRatio, f = d.maxHeight * this.aspectRatio, k = d.maxWidth / this.aspectRatio, b > d.minWidth && (d.minWidth = b), e > d.minHeight && (d.minHeight = e), f < d.maxWidth && (d.maxWidth = f), k < d.maxHeight && (d.maxHeight = k);
			this._vBoundaries = d
		},
		_updateCache: function(b) {
			this.offset =
				this.helper.offset();
			a(b.left) && (this.position.left = b.left);
			a(b.top) && (this.position.top = b.top);
			a(b.height) && (this.size.height = b.height);
			a(b.width) && (this.size.width = b.width)
		},
		_updateRatio: function(b, d) {
			var f = this.position,
				e = this.size,
				k = this.axis;
			a(b.height) ? b.width = b.height * this.aspectRatio : a(b.width) && (b.height = b.width / this.aspectRatio);
			"sw" == k && (b.left = f.left + (e.width - b.width), b.top = null);
			"nw" == k && (b.top = f.top + (e.height - b.height), b.left = f.left + (e.width - b.width));
			return b
		},
		_respectSize: function(b,
			d) {
			var f = this._vBoundaries,
				e = this.axis,
				k = a(b.width) && f.maxWidth && f.maxWidth < b.width,
				l = a(b.height) && f.maxHeight && f.maxHeight < b.height,
				r = a(b.width) && f.minWidth && f.minWidth > b.width,
				p = a(b.height) && f.minHeight && f.minHeight > b.height;
			r && (b.width = f.minWidth);
			p && (b.height = f.minHeight);
			k && (b.width = f.maxWidth);
			l && (b.height = f.maxHeight);
			var n = this.originalPosition.left + this.originalSize.width,
				u = this.position.top + this.size.height,
				q = /sw|nw|w/.test(e),
				e = /nw|ne|n/.test(e);
			r && q && (b.left = n - f.minWidth);
			k && q && (b.left =
				n - f.maxWidth);
			p && e && (b.top = u - f.minHeight);
			l && e && (b.top = u - f.maxHeight);
			(f = !b.width && !b.height) && !b.left && b.top ? b.top = null : f && (!b.top && b.left) && (b.left = null);
			return b
		},
		_proportionallyResize: function() {
			if (this._proportionallyResizeElements.length)
				for (var a = this.helper || this.element, d = 0; d < this._proportionallyResizeElements.length; d++) {
					var f = this._proportionallyResizeElements[d];
					if (!this.borderDif) {
						var e = [f.css("borderTopWidth"), f.css("borderRightWidth"), f.css("borderBottomWidth"), f.css("borderLeftWidth")],
							k = [f.css("paddingTop"), f.css("paddingRight"), f.css("paddingBottom"), f.css("paddingLeft")];
						this.borderDif = b.map(e, function(a, b) {
							var e = parseInt(a, 10) || 0,
								c = parseInt(k[b], 10) || 0;
							return e + c
						})
					}
					if (!b.browser.msie || !b(a).is(":hidden") && !b(a).parents(":hidden").length) f.css({
						height: a.height() - this.borderDif[0] - this.borderDif[2] || 0,
						width: a.width() - this.borderDif[1] - this.borderDif[3] || 0
					})
				}
		},
		_renderProxy: function() {
			var a = this.options;
			this.elementOffset = this.element.offset();
			if (this._helper) {
				this.helper = this.helper ||
					b('\x3cdiv style\x3d"overflow:hidden;"\x3e\x3c/div\x3e');
				var d = b.browser.msie && 7 > b.browser.version,
					f = d ? 1 : 0,
					d = d ? 2 : -1;
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() + d,
					height: this.element.outerHeight() + d,
					position: "absolute",
					left: this.elementOffset.left - f + "px",
					top: this.elementOffset.top - f + "px",
					zIndex: ++a.zIndex
				});
				this.helper.appendTo("body").disableSelection()
			} else this.helper = this.element
		},
		_change: {
			e: function(a, b, d) {
				return {
					width: this.originalSize.width + b
				}
			},
			w: function(a, b, d) {
				return {
					left: this.originalPosition.left + b,
					width: this.originalSize.width - b
				}
			},
			n: function(a, b, d) {
				return {
					top: this.originalPosition.top + d,
					height: this.originalSize.height - d
				}
			},
			s: function(a, b, d) {
				return {
					height: this.originalSize.height + d
				}
			},
			se: function(a, d, f) {
				return b.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [a, d, f]))
			},
			sw: function(a, d, f) {
				return b.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [a, d, f]))
			},
			ne: function(a, d, f) {
				return b.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [a, d, f]))
			},
			nw: function(a, d, f) {
				return b.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [a, d, f]))
			}
		},
		_propagate: function(a, d) {
			b.ui.plugin.call(this, a, [d, this.ui()]);
			"resize" != a && this._trigger(a, d, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	});
	b.extend(b.ui.resizable, {
		version: "1.8.18"
	});
	b.ui.plugin.add("resizable",
		"alsoResize", {
			start: function(a, d) {
				var f = b(this).data("resizable").options,
					e = function(a) {
						b(a).each(function() {
							var a = b(this);
							a.data("resizable-alsoresize", {
								width: parseInt(a.width(), 10),
								height: parseInt(a.height(), 10),
								left: parseInt(a.css("left"), 10),
								top: parseInt(a.css("top"), 10)
							})
						})
					};
				"object" == typeof f.alsoResize && !f.alsoResize.parentNode ? f.alsoResize.length ? (f.alsoResize = f.alsoResize[0], e(f.alsoResize)) : b.each(f.alsoResize, function(a) {
					e(a)
				}) : e(f.alsoResize)
			},
			resize: function(a, d) {
				var f = b(this).data("resizable"),
					e = f.options,
					k = f.originalSize,
					l = f.originalPosition,
					r = {
						height: f.size.height - k.height || 0,
						width: f.size.width - k.width || 0,
						top: f.position.top - l.top || 0,
						left: f.position.left - l.left || 0
					}, p = function(a, e) {
						b(a).each(function() {
							var a = b(this),
								c = b(this).data("resizable-alsoresize"),
								f = {}, k = e && e.length ? e : a.parents(d.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
							b.each(k, function(a, b) {
								var e = (c[b] || 0) + (r[b] || 0);
								e && 0 <= e && (f[b] = e || null)
							});
							a.css(f)
						})
					};
				"object" == typeof e.alsoResize && !e.alsoResize.nodeType ?
					b.each(e.alsoResize, function(a, b) {
						p(a, b)
					}) : p(e.alsoResize)
			},
			stop: function(a, d) {
				b(this).removeData("resizable-alsoresize")
			}
		});
	b.ui.plugin.add("resizable", "animate", {
		stop: function(a, d) {
			var f = b(this).data("resizable"),
				e = f.options,
				k = f._proportionallyResizeElements,
				l = k.length && /textarea/i.test(k[0].nodeName),
				r = l && b.ui.hasScroll(k[0], "left") ? 0 : f.sizeDiff.height,
				l = {
					width: f.size.width - (l ? 0 : f.sizeDiff.width),
					height: f.size.height - r
				}, r = parseInt(f.element.css("left"), 10) + (f.position.left - f.originalPosition.left) ||
					null,
				p = parseInt(f.element.css("top"), 10) + (f.position.top - f.originalPosition.top) || null;
			f.element.animate(b.extend(l, p && r ? {
				top: p,
				left: r
			} : {}), {
				duration: e.animateDuration,
				easing: e.animateEasing,
				step: function() {
					var e = {
						width: parseInt(f.element.css("width"), 10),
						height: parseInt(f.element.css("height"), 10),
						top: parseInt(f.element.css("top"), 10),
						left: parseInt(f.element.css("left"), 10)
					};
					k && k.length && b(k[0]).css({
						width: e.width,
						height: e.height
					});
					f._updateCache(e);
					f._propagate("resize", a)
				}
			})
		}
	});
	b.ui.plugin.add("resizable",
		"containment", {
			start: function(a, g) {
				var f = b(this).data("resizable"),
					e = f.element,
					k = f.options.containment;
				if (e = k instanceof b ? k.get(0) : /parent/.test(k) ? e.parent().get(0) : k)
					if (f.containerElement = b(e), /document/.test(k) || k == document) f.containerOffset = {
						left: 0,
						top: 0
					}, f.containerPosition = {
						left: 0,
						top: 0
					}, f.parentData = {
						element: b(document),
						left: 0,
						top: 0,
						width: b(document).width(),
						height: b(document).height() || document.body.parentNode.scrollHeight
					};
					else {
						var l = b(e),
							r = [];
						b(["Top", "Right", "Left", "Bottom"]).each(function(a,
							b) {
							r[a] = d(l.css("padding" + b))
						});
						f.containerOffset = l.offset();
						f.containerPosition = l.position();
						f.containerSize = {
							height: l.innerHeight() - r[3],
							width: l.innerWidth() - r[1]
						};
						var k = f.containerOffset,
							p = f.containerSize.height,
							n = f.containerSize.width,
							n = b.ui.hasScroll(e, "left") ? e.scrollWidth : n,
							p = b.ui.hasScroll(e) ? e.scrollHeight : p;
						f.parentData = {
							element: e,
							left: k.left,
							top: k.top,
							width: n,
							height: p
						}
					}
			},
			resize: function(a, d) {
				var f = b(this).data("resizable"),
					e = f.options,
					k = f.containerOffset,
					l = f.position,
					r = f._aspectRatio ||
						a.shiftKey,
					p = {
						top: 0,
						left: 0
					}, n = f.containerElement;
				n[0] != document && /static/.test(n.css("position")) && (p = k);
				if (l.left < (f._helper ? k.left : 0)) f.size.width += f._helper ? f.position.left - k.left : f.position.left - p.left, r && (f.size.height = f.size.width / e.aspectRatio), f.position.left = e.helper ? k.left : 0;
				if (l.top < (f._helper ? k.top : 0)) f.size.height += f._helper ? f.position.top - k.top : f.position.top, r && (f.size.width = f.size.height * e.aspectRatio), f.position.top = f._helper ? k.top : 0;
				f.offset.left = f.parentData.left + f.position.left;
				f.offset.top = f.parentData.top + f.position.top;
				e = Math.abs(f.offset.left - p.left + f.sizeDiff.width);
				k = Math.abs((f._helper ? f.offset.top - p.top : f.offset.top - k.top) + f.sizeDiff.height);
				p = f.containerElement.get(0) == f.element.parent().get(0);
				l = /relative|absolute/.test(f.containerElement.css("position"));
				p && l && (e -= f.parentData.left);
				e + f.size.width >= f.parentData.width && (f.size.width = f.parentData.width - e, r && (f.size.height = f.size.width / f.aspectRatio));
				k + f.size.height >= f.parentData.height && (f.size.height = f.parentData.height -
					k, r && (f.size.width = f.size.height * f.aspectRatio))
			},
			stop: function(a, d) {
				var f = b(this).data("resizable"),
					e = f.options,
					k = f.containerOffset,
					l = f.containerPosition,
					r = f.containerElement,
					p = b(f.helper),
					n = p.offset(),
					u = p.outerWidth() - f.sizeDiff.width,
					p = p.outerHeight() - f.sizeDiff.height;
				f._helper && (!e.animate && /relative/.test(r.css("position"))) && b(this).css({
					left: n.left - l.left - k.left,
					width: u,
					height: p
				});
				f._helper && (!e.animate && /static/.test(r.css("position"))) && b(this).css({
					left: n.left - l.left - k.left,
					width: u,
					height: p
				})
			}
		});
	b.ui.plugin.add("resizable", "ghost", {
		start: function(a, d) {
			var f = b(this).data("resizable"),
				e = f.options,
				k = f.size;
			f.ghost = f.originalElement.clone();
			f.ghost.css({
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: k.height,
				width: k.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof e.ghost ? e.ghost : "");
			f.ghost.appendTo(f.helper)
		},
		resize: function(a, d) {
			var f = b(this).data("resizable");
			f.ghost && f.ghost.css({
				position: "relative",
				height: f.size.height,
				width: f.size.width
			})
		},
		stop: function(a, d) {
			var f = b(this).data("resizable");
			f.ghost && f.helper && f.helper.get(0).removeChild(f.ghost.get(0))
		}
	});
	b.ui.plugin.add("resizable", "grid", {
		resize: function(a, d) {
			var f = b(this).data("resizable"),
				e = f.options,
				k = f.size,
				l = f.originalSize,
				r = f.originalPosition,
				p = f.axis;
			e.grid = "number" == typeof e.grid ? [e.grid, e.grid] : e.grid;
			var n = Math.round((k.width - l.width) / (e.grid[0] || 1)) * (e.grid[0] || 1),
				e = Math.round((k.height - l.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
			/^(se|s|e)$/.test(p) ? (f.size.width = l.width +
				n, f.size.height = l.height + e) : /^(ne)$/.test(p) ? (f.size.width = l.width + n, f.size.height = l.height + e, f.position.top = r.top - e) : (/^(sw)$/.test(p) ? (f.size.width = l.width + n, f.size.height = l.height + e) : (f.size.width = l.width + n, f.size.height = l.height + e, f.position.top = r.top - e), f.position.left = r.left - n)
		}
	});
	var d = function(a) {
		return parseInt(a, 10) || 0
	}, a = function(a) {
			return !isNaN(parseInt(a, 10))
		}
})(jQuery);
(function(b, m) {
	b.widget("ui.selectable", b.ui.mouse, {
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch"
		},
		_create: function() {
			var d = this;
			this.element.addClass("ui-selectable");
			this.dragged = !1;
			var a;
			this.refresh = function() {
				a = b(d.options.filter, d.element[0]);
				a.addClass("ui-selectee");
				a.each(function() {
					var a = b(this),
						d = a.offset();
					b.data(this, "selectable-item", {
						element: this,
						$element: a,
						left: d.left,
						top: d.top,
						right: d.left + a.outerWidth(),
						bottom: d.top + a.outerHeight(),
						startselected: !1,
						selected: a.hasClass("ui-selected"),
						selecting: a.hasClass("ui-selecting"),
						unselecting: a.hasClass("ui-unselecting")
					})
				})
			};
			this.refresh();
			this.selectees = a.addClass("ui-selectee");
			this._mouseInit();
			this.helper = b("\x3cdiv class\x3d'ui-selectable-helper'\x3e\x3c/div\x3e")
		},
		destroy: function() {
			this.selectees.removeClass("ui-selectee").removeData("selectable-item");
			this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
			this._mouseDestroy();
			return this
		},
		_mouseStart: function(d) {
			var a = this;
			this.opos = [d.pageX, d.pageY];
			if (!this.options.disabled) {
				var c = this.options;
				this.selectees = b(c.filter, this.element[0]);
				this._trigger("start", d);
				b(c.appendTo).append(this.helper);
				this.helper.css({
					left: d.clientX,
					top: d.clientY,
					width: 0,
					height: 0
				});
				c.autoRefresh && this.refresh();
				this.selectees.filter(".ui-selected").each(function() {
					var c = b.data(this, "selectable-item");
					c.startselected = !0;
					!d.metaKey && !d.ctrlKey && (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"),
						c.unselecting = !0, a._trigger("unselecting", d, {
							unselecting: c.element
						}))
				});
				b(d.target).parents().andSelf().each(function() {
					var c = b.data(this, "selectable-item");
					if (c) {
						var f = !d.metaKey && !d.ctrlKey || !c.$element.hasClass("ui-selected");
						c.$element.removeClass(f ? "ui-unselecting" : "ui-selected").addClass(f ? "ui-selecting" : "ui-unselecting");
						c.unselecting = !f;
						c.selecting = f;
						(c.selected = f) ? a._trigger("selecting", d, {
							selecting: c.element
						}) : a._trigger("unselecting", d, {
							unselecting: c.element
						});
						return !1
					}
				})
			}
		},
		_mouseDrag: function(d) {
			var a =
				this;
			this.dragged = !0;
			if (!this.options.disabled) {
				var c = this.options,
					g = this.opos[0],
					f = this.opos[1],
					e = d.pageX,
					k = d.pageY;
				if (g > e) var l = e,
				e = g, g = l;
				f > k && (l = k, k = f, f = l);
				this.helper.css({
					left: g,
					top: f,
					width: e - g,
					height: k - f
				});
				this.selectees.each(function() {
					var l = b.data(this, "selectable-item");
					if (l && l.element != a.element[0]) {
						var p = !1;
						"touch" == c.tolerance ? p = !(l.left > e || l.right < g || l.top > k || l.bottom < f) : "fit" == c.tolerance && (p = l.left > g && l.right < e && l.top > f && l.bottom < k);
						p ? (l.selected && (l.$element.removeClass("ui-selected"),
							l.selected = !1), l.unselecting && (l.$element.removeClass("ui-unselecting"), l.unselecting = !1), l.selecting || (l.$element.addClass("ui-selecting"), l.selecting = !0, a._trigger("selecting", d, {
							selecting: l.element
						}))) : (l.selecting && ((d.metaKey || d.ctrlKey) && l.startselected ? (l.$element.removeClass("ui-selecting"), l.selecting = !1, l.$element.addClass("ui-selected"), l.selected = !0) : (l.$element.removeClass("ui-selecting"), l.selecting = !1, l.startselected && (l.$element.addClass("ui-unselecting"), l.unselecting = !0), a._trigger("unselecting",
							d, {
								unselecting: l.element
							}))), l.selected && (!d.metaKey && !d.ctrlKey && !l.startselected) && (l.$element.removeClass("ui-selected"), l.selected = !1, l.$element.addClass("ui-unselecting"), l.unselecting = !0, a._trigger("unselecting", d, {
							unselecting: l.element
						})))
					}
				});
				return !1
			}
		},
		_mouseStop: function(d) {
			var a = this;
			this.dragged = !1;
			b(".ui-unselecting", this.element[0]).each(function() {
				var c = b.data(this, "selectable-item");
				c.$element.removeClass("ui-unselecting");
				c.unselecting = !1;
				c.startselected = !1;
				a._trigger("unselected",
					d, {
						unselected: c.element
					})
			});
			b(".ui-selecting", this.element[0]).each(function() {
				var c = b.data(this, "selectable-item");
				c.$element.removeClass("ui-selecting").addClass("ui-selected");
				c.selecting = !1;
				c.selected = !0;
				c.startselected = !0;
				a._trigger("selected", d, {
					selected: c.element
				})
			});
			this._trigger("stop", d);
			this.helper.remove();
			return !1
		}
	});
	b.extend(b.ui.selectable, {
		version: "1.8.18"
	})
})(jQuery);
(function(b, m) {
	b.widget("ui.sortable", b.ui.mouse, {
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "\x3e *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1E3
		},
		_create: function() {
			var b = this.options;
			this.containerCache = {};
			this.element.addClass("ui-sortable");
			this.refresh();
			this.floating = this.items.length ? "x" === b.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1;
			this.offset = this.element.offset();
			this._mouseInit();
			this.ready = !0
		},
		destroy: function() {
			b.Widget.prototype.destroy.call(this);
			this.element.removeClass("ui-sortable ui-sortable-disabled");
			this._mouseDestroy();
			for (var d = this.items.length - 1; 0 <= d; d--) this.items[d].item.removeData(this.widgetName + "-item");
			return this
		},
		_setOption: function(d,
			a) {
			"disabled" === d ? (this.options[d] = a, this.widget()[a ? "addClass" : "removeClass"]("ui-sortable-disabled")) : b.Widget.prototype._setOption.apply(this, arguments)
		},
		_mouseCapture: function(d, a) {
			var c = this;
			if (this.reverting || this.options.disabled || "static" == this.options.type) return !1;
			this._refreshItems(d);
			var g = null,
				f = this;
			b(d.target).parents().each(function() {
				if (b.data(this, c.widgetName + "-item") == f) return g = b(this), !1
			});
			b.data(d.target, c.widgetName + "-item") == f && (g = b(d.target));
			if (!g) return !1;
			if (this.options.handle && !a) {
				var e = !1;
				b(this.options.handle, g).find("*").andSelf().each(function() {
					this == d.target && (e = !0)
				});
				if (!e) return !1
			}
			this.currentItem = g;
			this._removeCurrentsFromItems();
			return !0
		},
		_mouseStart: function(d, a, c) {
			a = this.options;
			this.currentContainer = this;
			this.refreshPositions();
			this.helper = this._createHelper(d);
			this._cacheHelperProportions();
			this._cacheMargins();
			this.scrollParent = this.helper.scrollParent();
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");
			b.extend(this.offset, {
				click: {
					left: d.pageX - this.offset.left,
					top: d.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			});
			this.originalPosition = this._generatePosition(d);
			this.originalPageX = d.pageX;
			this.originalPageY = d.pageY;
			a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt);
			this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			};
			this.helper[0] != this.currentItem[0] && this.currentItem.hide();
			this._createPlaceholder();
			a.containment && this._setContainment();
			a.cursor && (b("body").css("cursor") && (this._storedCursor = b("body").css("cursor")), b("body").css("cursor", a.cursor));
			a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity));
			a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex));
			this.scrollParent[0] !=
				document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset());
			this._trigger("start", d, this._uiHash());
			this._preserveHelperProportions || this._cacheHelperProportions();
			if (!c)
				for (c = this.containers.length - 1; 0 <= c; c--) this.containers[c]._trigger("activate", d, this._uiHash(this));
			b.ui.ddmanager && (b.ui.ddmanager.current = this);
			b.ui.ddmanager && !a.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, d);
			this.dragging = !0;
			this.helper.addClass("ui-sortable-helper");
			this._mouseDrag(d);
			return !0
		},
		_mouseDrag: function(d) {
			this.position = this._generatePosition(d);
			this.positionAbs = this._convertPositionTo("absolute");
			this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
			if (this.options.scroll) {
				var a = this.options,
					c = !1;
				this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - d.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + a.scrollSpeed : d.pageY - this.overflowOffset.top <
					a.scrollSensitivity && (this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - d.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + a.scrollSpeed : d.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (d.pageY - b(document).scrollTop() < a.scrollSensitivity ? c = b(document).scrollTop(b(document).scrollTop() -
					a.scrollSpeed) : b(window).height() - (d.pageY - b(document).scrollTop()) < a.scrollSensitivity && (c = b(document).scrollTop(b(document).scrollTop() + a.scrollSpeed)), d.pageX - b(document).scrollLeft() < a.scrollSensitivity ? c = b(document).scrollLeft(b(document).scrollLeft() - a.scrollSpeed) : b(window).width() - (d.pageX - b(document).scrollLeft()) < a.scrollSensitivity && (c = b(document).scrollLeft(b(document).scrollLeft() + a.scrollSpeed)));
				!1 !== c && (b.ui.ddmanager && !a.dropBehaviour) && b.ui.ddmanager.prepareOffsets(this, d)
			}
			this.positionAbs =
				this._convertPositionTo("absolute");
			if (!this.options.axis || "y" != this.options.axis) this.helper[0].style.left = this.position.left + "px";
			if (!this.options.axis || "x" != this.options.axis) this.helper[0].style.top = this.position.top + "px";
			for (a = this.items.length - 1; 0 <= a; a--) {
				var c = this.items[a],
					g = c.item[0],
					f = this._intersectsWithPointer(c);
				if (f && g != this.currentItem[0] && this.placeholder[1 == f ? "next" : "prev"]()[0] != g && !b.ui.contains(this.placeholder[0], g) && ("semi-dynamic" == this.options.type ? !b.ui.contains(this.element[0],
					g) : 1)) {
					this.direction = 1 == f ? "down" : "up";
					if ("pointer" == this.options.tolerance || this._intersectsWithSides(c)) this._rearrange(d, c);
					else break;
					this._trigger("change", d, this._uiHash());
					break
				}
			}
			this._contactContainers(d);
			b.ui.ddmanager && b.ui.ddmanager.drag(this, d);
			this._trigger("sort", d, this._uiHash());
			this.lastPositionAbs = this.positionAbs;
			return !1
		},
		_mouseStop: function(d, a) {
			if (d) {
				b.ui.ddmanager && !this.options.dropBehaviour && b.ui.ddmanager.drop(this, d);
				if (this.options.revert) {
					var c = this,
						g = c.placeholder.offset();
					c.reverting = !0;
					b(this.helper).animate({
						left: g.left - this.offset.parent.left - c.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
						top: g.top - this.offset.parent.top - c.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
					}, parseInt(this.options.revert, 10) || 500, function() {
						c._clear(d)
					})
				} else this._clear(d, a);
				return !1
			}
		},
		cancel: function() {
			if (this.dragging) {
				this._mouseUp({
					target: null
				});
				"original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :
					this.currentItem.show();
				for (var d = this.containers.length - 1; 0 <= d; d--) this.containers[d]._trigger("deactivate", null, this._uiHash(this)), this.containers[d].containerCache.over && (this.containers[d]._trigger("out", null, this._uiHash(this)), this.containers[d].containerCache.over = 0)
			}
			this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" != this.options.helper && (this.helper && this.helper[0].parentNode) && this.helper.remove(), b.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? b(this.domPosition.prev).after(this.currentItem) : b(this.domPosition.parent).prepend(this.currentItem));
			return this
		},
		serialize: function(d) {
			var a = this._getItemsAsjQuery(d && d.connected),
				c = [];
			d = d || {};
			b(a).each(function() {
				var a = (b(d.item || this).attr(d.attribute || "id") || "").match(d.expression || /(.+)[-=_](.+)/);
				a && c.push((d.key || a[1] + "[]") + "\x3d" + (d.key && d.expression ? a[1] : a[2]))
			});
			!c.length && d.key && c.push(d.key + "\x3d");
			return c.join("\x26")
		},
		toArray: function(d) {
			var a = this._getItemsAsjQuery(d && d.connected),
				c = [];
			d = d || {};
			a.each(function() {
				c.push(b(d.item || this).attr(d.attribute || "id") || "")
			});
			return c
		},
		_intersectsWith: function(b) {
			var a = this.positionAbs.left,
				c = a + this.helperProportions.width,
				g = this.positionAbs.top,
				f = g + this.helperProportions.height,
				e = b.left,
				k = e + b.width,
				l = b.top,
				r = l + b.height,
				p = this.offset.click.top,
				n = this.offset.click.left;
			return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance &&
				this.helperProportions[this.floating ? "width" : "height"] > b[this.floating ? "width" : "height"] ? g + p > l && g + p < r && a + n > e && a + n < k : e < a + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < k && l < g + this.helperProportions.height / 2 && f - this.helperProportions.height / 2 < r
		},
		_intersectsWithPointer: function(d) {
			var a = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height);
			d = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width);
			a = a && d;
			d = this._getDragVerticalDirection();
			var c =
				this._getDragHorizontalDirection();
			return !a ? !1 : this.floating ? c && "right" == c || "down" == d ? 2 : 1 : d && ("down" == d ? 2 : 1)
		},
		_intersectsWithSides: function(d) {
			var a = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top + d.height / 2, d.height);
			d = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left + d.width / 2, d.width);
			var c = this._getDragVerticalDirection(),
				g = this._getDragHorizontalDirection();
			return this.floating && g ? "right" == g && d || "left" == g && !d : c && ("down" == c && a || "up" == c && !a)
		},
		_getDragVerticalDirection: function() {
			var b =
				this.positionAbs.top - this.lastPositionAbs.top;
			return 0 != b && (0 < b ? "down" : "up")
		},
		_getDragHorizontalDirection: function() {
			var b = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 != b && (0 < b ? "right" : "left")
		},
		refresh: function(b) {
			this._refreshItems(b);
			this.refreshPositions();
			return this
		},
		_connectWith: function() {
			var b = this.options;
			return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
		},
		_getItemsAsjQuery: function(d) {
			var a = [],
				c = [],
				g = this._connectWith();
			if (g && d)
				for (d = g.length - 1; 0 <= d; d--)
					for (var f =
						b(g[d]), e = f.length - 1; 0 <= e; e--) {
						var k = b.data(f[e], this.widgetName);
						k && (k != this && !k.options.disabled) && c.push([b.isFunction(k.options.items) ? k.options.items.call(k.element) : b(k.options.items, k.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), k])
					}
			c.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
			for (d = c.length -
				1; 0 <= d; d--) c[d][0].each(function() {
				a.push(this)
			});
			return b(a)
		},
		_removeCurrentsFromItems: function() {
			for (var b = this.currentItem.find(":data(" + this.widgetName + "-item)"), a = 0; a < this.items.length; a++)
				for (var c = 0; c < b.length; c++) b[c] == this.items[a].item[0] && this.items.splice(a, 1)
		},
		_refreshItems: function(d) {
			this.items = [];
			this.containers = [this];
			var a = this.items,
				c = [
					[b.isFunction(this.options.items) ? this.options.items.call(this.element[0], d, {
						item: this.currentItem
					}) : b(this.options.items, this.element), this]
				],
				g =
					this._connectWith();
			if (g && this.ready)
				for (var f = g.length - 1; 0 <= f; f--)
					for (var e = b(g[f]), k = e.length - 1; 0 <= k; k--) {
						var l = b.data(e[k], this.widgetName);
						l && (l != this && !l.options.disabled) && (c.push([b.isFunction(l.options.items) ? l.options.items.call(l.element[0], d, {
							item: this.currentItem
						}) : b(l.options.items, l.element), l]), this.containers.push(l))
					}
			for (f = c.length - 1; 0 <= f; f--) {
				d = c[f][1];
				g = c[f][0];
				k = 0;
				for (e = g.length; k < e; k++) l = b(g[k]), l.data(this.widgetName + "-item", d), a.push({
					item: l,
					instance: d,
					width: 0,
					height: 0,
					left: 0,
					top: 0
				})
			}
		},
		refreshPositions: function(d) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			for (var a = this.items.length - 1; 0 <= a; a--) {
				var c = this.items[a];
				if (!(c.instance != this.currentContainer && this.currentContainer && c.item[0] != this.currentItem[0])) {
					var g = this.options.toleranceElement ? b(this.options.toleranceElement, c.item) : c.item;
					d || (c.width = g.outerWidth(), c.height = g.outerHeight());
					g = g.offset();
					c.left = g.left;
					c.top = g.top
				}
			}
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else
				for (a = this.containers.length - 1; 0 <= a; a--) g = this.containers[a].element.offset(), this.containers[a].containerCache.left = g.left, this.containers[a].containerCache.top = g.top, this.containers[a].containerCache.width = this.containers[a].element.outerWidth(), this.containers[a].containerCache.height = this.containers[a].element.outerHeight();
			return this
		},
		_createPlaceholder: function(d) {
			var a = d || this,
				c = a.options;
			if (!c.placeholder || c.placeholder.constructor == String) {
				var g = c.placeholder;
				c.placeholder = {
					element: function() {
						var c =
							b(document.createElement(a.currentItem[0].nodeName)).addClass(g || a.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
						g || (c.style.visibility = "hidden");
						return c
					},
					update: function(b, e) {
						if (!g || c.forcePlaceholderSize) e.height() || e.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") ||
							0, 10))
					}
				}
			}
			a.placeholder = b(c.placeholder.element.call(a.element, a.currentItem));
			a.currentItem.after(a.placeholder);
			c.placeholder.update(a, a.placeholder)
		},
		_contactContainers: function(d) {
			for (var a = null, c = null, g = this.containers.length - 1; 0 <= g; g--)
				if (!b.ui.contains(this.currentItem[0], this.containers[g].element[0]))
					if (this._intersectsWith(this.containers[g].containerCache)) {
						if (!a || !b.ui.contains(this.containers[g].element[0], a.element[0])) a = this.containers[g], c = g
					} else this.containers[g].containerCache.over &&
						(this.containers[g]._trigger("out", d, this._uiHash(this)), this.containers[g].containerCache.over = 0);
			if (a)
				if (1 === this.containers.length) this.containers[c]._trigger("over", d, this._uiHash(this)), this.containers[c].containerCache.over = 1;
				else
			if (this.currentContainer != this.containers[c]) {
				for (var a = 1E4, g = null, f = this.positionAbs[this.containers[c].floating ? "left" : "top"], e = this.items.length - 1; 0 <= e; e--)
					if (b.ui.contains(this.containers[c].element[0], this.items[e].item[0])) {
						var k = this.items[e][this.containers[c].floating ?
							"left" : "top"
						];
						Math.abs(k - f) < a && (a = Math.abs(k - f), g = this.items[e])
					}
				if (g || this.options.dropOnEmpty) this.currentContainer = this.containers[c], g ? this._rearrange(d, g, null, !0) : this._rearrange(d, null, this.containers[c].element, !0), this._trigger("change", d, this._uiHash()), this.containers[c]._trigger("change", d, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[c]._trigger("over", d, this._uiHash(this)), this.containers[c].containerCache.over = 1
			}
		},
		_createHelper: function(d) {
			var a =
				this.options;
			d = b.isFunction(a.helper) ? b(a.helper.apply(this.element[0], [d, this.currentItem])) : "clone" == a.helper ? this.currentItem.clone() : this.currentItem;
			d.parents("body").length || b("parent" != a.appendTo ? a.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]);
			d[0] == this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			});
			("" ==
				d[0].style.width || a.forceHelperSize) && d.width(this.currentItem.width());
			("" == d[0].style.height || a.forceHelperSize) && d.height(this.currentItem.height());
			return d
		},
		_adjustOffsetFromHelper: function(d) {
			"string" == typeof d && (d = d.split(" "));
			b.isArray(d) && (d = {
				left: +d[0],
				top: +d[1] || 0
			});
			"left" in d && (this.offset.click.left = d.left + this.margins.left);
			"right" in d && (this.offset.click.left = this.helperProportions.width - d.right + this.margins.left);
			"top" in d && (this.offset.click.top = d.top + this.margins.top);
			"bottom" in
				d && (this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var d = this.offsetParent.offset();
			"absolute" == this.cssPosition && (this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) && (d.left += this.scrollParent.scrollLeft(), d.top += this.scrollParent.scrollTop());
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() &&
				b.browser.msie) d = {
				top: 0,
				left: 0
			};
			return {
				top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" == this.cssPosition) {
				var b = this.currentItem.position();
				return {
					top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var d = this.options;
			"parent" == d.containment && (d.containment = this.helper[0].parentNode);
			if ("document" == d.containment || "window" == d.containment) this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top -
				this.offset.parent.top, b("document" == d.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (b("document" == d.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
			];
			if (!/^(document|window|parent)$/.test(d.containment)) {
				var a = b(d.containment)[0],
					d = b(d.containment).offset(),
					c = "hidden" != b(a).css("overflow");
				this.containment = [d.left + (parseInt(b(a).css("borderLeftWidth"), 10) || 0) + (parseInt(b(a).css("paddingLeft"),
						10) || 0) - this.margins.left, d.top + (parseInt(b(a).css("borderTopWidth"), 10) || 0) + (parseInt(b(a).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (c ? Math.max(a.scrollWidth, a.offsetWidth) : a.offsetWidth) - (parseInt(b(a).css("borderLeftWidth"), 10) || 0) - (parseInt(b(a).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (c ? Math.max(a.scrollHeight, a.offsetHeight) : a.offsetHeight) - (parseInt(b(a).css("borderTopWidth"), 10) || 0) - (parseInt(b(a).css("paddingBottom"), 10) || 0) - this.helperProportions.height -
					this.margins.top
				]
			}
		},
		_convertPositionTo: function(d, a) {
			a || (a = this.position);
			var c = "absolute" == d ? 1 : -1,
				g = "absolute" == this.cssPosition && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				f = /(html|body)/i.test(g[0].tagName);
			return {
				top: a.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : g.scrollTop()) * c),
				left: a.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : g.scrollLeft()) * c)
			}
		},
		_generatePosition: function(d) {
			var a = this.options,
				c = "absolute" == this.cssPosition && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				g = /(html|body)/i.test(c[0].tagName);
			"relative" == this.cssPosition && !(this.scrollParent[0] != document && this.scrollParent[0] !=
				this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
			var f = d.pageX,
				e = d.pageY;
			this.originalPosition && (this.containment && (d.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), d.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top), d.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), d.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] +
				this.offset.click.top)), a.grid && (e = this.originalPageY + Math.round((e - this.originalPageY) / a.grid[1]) * a.grid[1], e = this.containment ? !(e - this.offset.click.top < this.containment[1] || e - this.offset.click.top > this.containment[3]) ? e : !(e - this.offset.click.top < this.containment[1]) ? e - a.grid[1] : e + a.grid[1] : e, f = this.originalPageX + Math.round((f - this.originalPageX) / a.grid[0]) * a.grid[0], f = this.containment ? !(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : !(f - this.offset.click.left <
				this.containment[0]) ? f - a.grid[0] : f + a.grid[0] : f));
			return {
				top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : c.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : g ? 0 : c.scrollLeft())
			}
		},
		_rearrange: function(b, a, c, g) {
			c ? c[0].appendChild(this.placeholder[0]) :
				a.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? a.item[0] : a.item[0].nextSibling);
			this.counter = this.counter ? ++this.counter : 1;
			var f = this,
				e = this.counter;
			window.setTimeout(function() {
				e == f.counter && f.refreshPositions(!g)
			}, 0)
		},
		_clear: function(d, a) {
			this.reverting = !1;
			var c = [];
			!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
			this._noFinalSort = null;
			if (this.helper[0] == this.currentItem[0]) {
				for (var g in this._storedCSS)
					if ("auto" == this._storedCSS[g] ||
						"static" == this._storedCSS[g]) this._storedCSS[g] = "";
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else this.currentItem.show();
			this.fromOutside && !a && c.push(function(a) {
				this._trigger("receive", a, this._uiHash(this.fromOutside))
			});
			(this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !a && c.push(function(a) {
				this._trigger("update", a, this._uiHash())
			});
			if (!b.ui.contains(this.element[0],
				this.currentItem[0])) {
				a || c.push(function(a) {
					this._trigger("remove", a, this._uiHash())
				});
				for (g = this.containers.length - 1; 0 <= g; g--) b.ui.contains(this.containers[g].element[0], this.currentItem[0]) && !a && (c.push(function(a) {
					return function(b) {
						a._trigger("receive", b, this._uiHash(this))
					}
				}.call(this, this.containers[g])), c.push(function(a) {
					return function(b) {
						a._trigger("update", b, this._uiHash(this))
					}
				}.call(this, this.containers[g])))
			}
			for (g = this.containers.length - 1; 0 <= g; g--) a || c.push(function(a) {
				return function(b) {
					a._trigger("deactivate",
						b, this._uiHash(this))
				}
			}.call(this, this.containers[g])), this.containers[g].containerCache.over && (c.push(function(a) {
				return function(b) {
					a._trigger("out", b, this._uiHash(this))
				}
			}.call(this, this.containers[g])), this.containers[g].containerCache.over = 0);
			this._storedCursor && b("body").css("cursor", this._storedCursor);
			this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
			this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex);
			this.dragging = !1;
			if (this.cancelHelperRemoval) {
				if (!a) {
					this._trigger("beforeStop",
						d, this._uiHash());
					for (g = 0; g < c.length; g++) c[g].call(this, d);
					this._trigger("stop", d, this._uiHash())
				}
				return !1
			}
			a || this._trigger("beforeStop", d, this._uiHash());
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			this.helper[0] != this.currentItem[0] && this.helper.remove();
			this.helper = null;
			if (!a) {
				for (g = 0; g < c.length; g++) c[g].call(this, d);
				this._trigger("stop", d, this._uiHash())
			}
			this.fromOutside = !1;
			return !0
		},
		_trigger: function() {
			!1 === b.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
		},
		_uiHash: function(d) {
			var a = d || this;
			return {
				helper: a.helper,
				placeholder: a.placeholder || b([]),
				position: a.position,
				originalPosition: a.originalPosition,
				offset: a.positionAbs,
				item: a.currentItem,
				sender: d ? d.element : null
			}
		}
	});
	b.extend(b.ui.sortable, {
		version: "1.8.18"
	})
})(jQuery);
jQuery.effects || function(b, m) {
	function d(a) {
		var e;
		return a && a.constructor == Array && 3 == a.length ? a : (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] : (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a)) ? [2.55 * parseFloat(e[1]), 2.55 * parseFloat(e[2]), 2.55 * parseFloat(e[3])] : (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) ? [parseInt(e[1], 16), parseInt(e[2],
			16), parseInt(e[3], 16)] : (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a)) ? [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] : /rgba\(0, 0, 0, 0\)/.exec(a) ? k.transparent : k[b.trim(a).toLowerCase()]
	}

	function a() {
		var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
			b = {}, e, c;
		if (a && a.length && a[0] && a[a[0]])
			for (var d = a.length; d--;) e = a[d], "string" == typeof a[e] && (c = e.replace(/\-(\w)/g, function(a, b) {
				return b.toUpperCase()
			}), b[c] = a[e]);
		else
			for (e in a) "string" ===
				typeof a[e] && (b[e] = a[e]);
		return b
	}

	function c(a) {
		var e, c;
		for (e in a) c = a[e], (null == c || b.isFunction(c) || e in r || /scrollbar/.test(e) || !/color/i.test(e) && isNaN(parseFloat(c))) && delete a[e];
		return a
	}

	function g(a, b) {
		var e = {
			_: 0
		}, c;
		for (c in b) a[c] != b[c] && (e[c] = b[c]);
		return e
	}

	function f(a, e, c, d) {
		"object" == typeof a && (d = e, c = null, e = a, a = e.effect);
		b.isFunction(e) && (d = e, c = null, e = {});
		if ("number" == typeof e || b.fx.speeds[e]) d = c, c = e, e = {};
		b.isFunction(c) && (d = c, c = null);
		e = e || {};
		c = c || e.duration;
		c = b.fx.off ? 0 : "number" == typeof c ?
			c : c in b.fx.speeds ? b.fx.speeds[c] : b.fx.speeds._default;
		d = d || e.complete;
		return [a, e, c, d]
	}

	function e(a) {
		return !a || ("number" === typeof a || b.fx.speeds[a]) || "string" === typeof a && !b.effects[a] ? !0 : !1
	}
	b.effects = {};
	b.each("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor borderColor color outlineColor".split(" "), function(a, e) {
		b.fx.step[e] = function(a) {
			if (!a.colorInit) {
				var c;
				c = a.elem;
				var f = e,
					k;
				do {
					k = b.curCSS(c, f);
					if ("" != k && "transparent" != k || b.nodeName(c, "body")) break;
					f = "backgroundColor"
				} while (c =
					c.parentNode);
				c = d(k);
				a.start = c;
				a.end = d(a.end);
				a.colorInit = !0
			}
			a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
		}
	});
	var k = {
		aqua: [0, 255, 255],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		black: [0, 0, 0],
		blue: [0, 0, 255],
		brown: [165, 42, 42],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgrey: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkviolet: [148, 0, 211],
		fuchsia: [255, 0, 255],
		gold: [255, 215, 0],
		green: [0, 128, 0],
		indigo: [75, 0, 130],
		khaki: [240, 230, 140],
		lightblue: [173, 216, 230],
		lightcyan: [224, 255, 255],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		navy: [0, 0, 128],
		olive: [128, 128, 0],
		orange: [255, 165, 0],
		pink: [255, 192, 203],
		purple: [128, 0, 128],
		violet: [128, 0, 128],
		red: [255, 0, 0],
		silver: [192, 192, 192],
		white: [255, 255, 255],
		yellow: [255, 255, 0],
		transparent: [255, 255, 255]
	}, l = ["add", "remove", "toggle"],
		r = {
			border: 1,
			borderBottom: 1,
			borderColor: 1,
			borderLeft: 1,
			borderRight: 1,
			borderTop: 1,
			borderWidth: 1,
			margin: 1,
			padding: 1
		};
	b.effects.animateClass = function(e, d, f, k) {
		b.isFunction(f) && (k = f, f = null);
		return this.queue(function() {
			var r = b(this),
				m = r.attr("style") ||
					" ",
				C = c(a.call(this)),
				x, z = r.attr("class");
			b.each(l, function(a, b) {
				if (e[b]) r[b + "Class"](e[b])
			});
			x = c(a.call(this));
			r.attr("class", z);
			r.animate(g(C, x), {
				queue: !1,
				duration: d,
				easing: f,
				complete: function() {
					b.each(l, function(a, b) {
						if (e[b]) r[b + "Class"](e[b])
					});
					"object" == typeof r.attr("style") ? (r.attr("style").cssText = "", r.attr("style").cssText = m) : r.attr("style", m);
					k && k.apply(this, arguments);
					b.dequeue(this)
				}
			})
		})
	};
	b.fn.extend({
		_addClass: b.fn.addClass,
		addClass: function(a, e, c, d) {
			return e ? b.effects.animateClass.apply(this, [{
					add: a
				},
				e, c, d
			]) : this._addClass(a)
		},
		_removeClass: b.fn.removeClass,
		removeClass: function(a, e, c, d) {
			return e ? b.effects.animateClass.apply(this, [{
					remove: a
				},
				e, c, d
			]) : this._removeClass(a)
		},
		_toggleClass: b.fn.toggleClass,
		toggleClass: function(a, e, c, d, f) {
			return "boolean" == typeof e || e === m ? c ? b.effects.animateClass.apply(this, [e ? {
					add: a
				} : {
					remove: a
				},
				c, d, f
			]) : this._toggleClass(a, e) : b.effects.animateClass.apply(this, [{
					toggle: a
				},
				e, c, d
			])
		},
		switchClass: function(a, e, c, d, f) {
			return b.effects.animateClass.apply(this, [{
					add: e,
					remove: a
				},
				c, d, f
			])
		}
	});
	b.extend(b.effects, {
		version: "1.8.18",
		save: function(a, b) {
			for (var e = 0; e < b.length; e++) null !== b[e] && a.data("ec.storage." + b[e], a[0].style[b[e]])
		},
		restore: function(a, b) {
			for (var e = 0; e < b.length; e++) null !== b[e] && a.css(b[e], a.data("ec.storage." + b[e]))
		},
		setMode: function(a, b) {
			"toggle" == b && (b = a.is(":hidden") ? "show" : "hide");
			return b
		},
		getBaseline: function(a, b) {
			var e, c;
			switch (a[0]) {
				case "top":
					e = 0;
					break;
				case "middle":
					e = 0.5;
					break;
				case "bottom":
					e = 1;
					break;
				default:
					e = a[0] / b.height
			}
			switch (a[1]) {
				case "left":
					c =
						0;
					break;
				case "center":
					c = 0.5;
					break;
				case "right":
					c = 1;
					break;
				default:
					c = a[1] / b.width
			}
			return {
				x: c,
				y: e
			}
		},
		createWrapper: function(a) {
			if (a.parent().is(".ui-effects-wrapper")) return a.parent();
			var e = {
				width: a.outerWidth(!0),
				height: a.outerHeight(!0),
				"float": a.css("float")
			}, c = b("\x3cdiv\x3e\x3c/div\x3e").addClass("ui-effects-wrapper").css({
					fontSize: "100%",
					background: "transparent",
					border: "none",
					margin: 0,
					padding: 0
				}),
				d = document.activeElement;
			a.wrap(c);
			(a[0] === d || b.contains(a[0], d)) && b(d).focus();
			c = a.parent();
			"static" ==
				a.css("position") ? (c.css({
					position: "relative"
				}), a.css({
					position: "relative"
				})) : (b.extend(e, {
					position: a.css("position"),
					zIndex: a.css("z-index")
				}), b.each(["top", "left", "bottom", "right"], function(b, c) {
					e[c] = a.css(c);
					isNaN(parseInt(e[c], 10)) && (e[c] = "auto")
				}), a.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				}));
			return c.css(e).show()
		},
		removeWrapper: function(a) {
			var e, c = document.activeElement;
			return a.parent().is(".ui-effects-wrapper") ? (e = a.parent().replaceWith(a), (a[0] === c || b.contains(a[0],
				c)) && b(c).focus(), e) : a
		},
		setTransition: function(a, e, c, d) {
			d = d || {};
			b.each(e, function(b, e) {
				unit = a.cssUnit(e);
				0 < unit[0] && (d[e] = unit[0] * c + unit[1])
			});
			return d
		}
	});
	b.fn.extend({
		effect: function(a, e, c, d) {
			var k = f.apply(this, arguments),
				g = {
					options: k[1],
					duration: k[2],
					callback: k[3]
				}, k = g.options.mode,
				l = b.effects[a];
			return b.fx.off || !l ? k ? this[k](g.duration, g.callback) : this.each(function() {
				g.callback && g.callback.call(this)
			}) : l.call(this, g)
		},
		_show: b.fn.show,
		show: function(a) {
			if (e(a)) return this._show.apply(this, arguments);
			var b = f.apply(this, arguments);
			b[1].mode = "show";
			return this.effect.apply(this, b)
		},
		_hide: b.fn.hide,
		hide: function(a) {
			if (e(a)) return this._hide.apply(this, arguments);
			var b = f.apply(this, arguments);
			b[1].mode = "hide";
			return this.effect.apply(this, b)
		},
		__toggle: b.fn.toggle,
		toggle: function(a) {
			if (e(a) || "boolean" === typeof a || b.isFunction(a)) return this.__toggle.apply(this, arguments);
			var c = f.apply(this, arguments);
			c[1].mode = "toggle";
			return this.effect.apply(this, c)
		},
		cssUnit: function(a) {
			var e = this.css(a),
				c = [];
			b.each(["em",
				"px", "%", "pt"
			], function(a, b) {
				0 < e.indexOf(b) && (c = [parseFloat(e), b])
			});
			return c
		}
	});
	b.easing.jswing = b.easing.swing;
	b.extend(b.easing, {
		def: "easeOutQuad",
		swing: function(a, e, c, d, f) {
			return b.easing[b.easing.def](a, e, c, d, f)
		},
		easeInQuad: function(a, b, e, c, d) {
			return c * (b /= d) * b + e
		},
		easeOutQuad: function(a, b, e, c, d) {
			return -c * (b /= d) * (b - 2) + e
		},
		easeInOutQuad: function(a, b, e, c, d) {
			return 1 > (b /= d / 2) ? c / 2 * b * b + e : -c / 2 * (--b * (b - 2) - 1) + e
		},
		easeInCubic: function(a, b, e, c, d) {
			return c * (b /= d) * b * b + e
		},
		easeOutCubic: function(a, b, e, c, d) {
			return c *
				((b = b / d - 1) * b * b + 1) + e
		},
		easeInOutCubic: function(a, b, e, c, d) {
			return 1 > (b /= d / 2) ? c / 2 * b * b * b + e : c / 2 * ((b -= 2) * b * b + 2) + e
		},
		easeInQuart: function(a, b, e, c, d) {
			return c * (b /= d) * b * b * b + e
		},
		easeOutQuart: function(a, b, e, c, d) {
			return -c * ((b = b / d - 1) * b * b * b - 1) + e
		},
		easeInOutQuart: function(a, b, e, c, d) {
			return 1 > (b /= d / 2) ? c / 2 * b * b * b * b + e : -c / 2 * ((b -= 2) * b * b * b - 2) + e
		},
		easeInQuint: function(a, b, e, c, d) {
			return c * (b /= d) * b * b * b * b + e
		},
		easeOutQuint: function(a, b, e, c, d) {
			return c * ((b = b / d - 1) * b * b * b * b + 1) + e
		},
		easeInOutQuint: function(a, b, e, c, d) {
			return 1 > (b /= d / 2) ?
				c / 2 * b * b * b * b * b + e : c / 2 * ((b -= 2) * b * b * b * b + 2) + e
		},
		easeInSine: function(a, b, e, c, d) {
			return -c * Math.cos(b / d * (Math.PI / 2)) + c + e
		},
		easeOutSine: function(a, b, e, c, d) {
			return c * Math.sin(b / d * (Math.PI / 2)) + e
		},
		easeInOutSine: function(a, b, e, c, d) {
			return -c / 2 * (Math.cos(Math.PI * b / d) - 1) + e
		},
		easeInExpo: function(a, b, e, c, d) {
			return 0 == b ? e : c * Math.pow(2, 10 * (b / d - 1)) + e
		},
		easeOutExpo: function(a, b, e, c, d) {
			return b == d ? e + c : c * (-Math.pow(2, -10 * b / d) + 1) + e
		},
		easeInOutExpo: function(a, b, e, c, d) {
			return 0 == b ? e : b == d ? e + c : 1 > (b /= d / 2) ? c / 2 * Math.pow(2, 10 * (b - 1)) +
				e : c / 2 * (-Math.pow(2, -10 * --b) + 2) + e
		},
		easeInCirc: function(a, b, e, c, d) {
			return -c * (Math.sqrt(1 - (b /= d) * b) - 1) + e
		},
		easeOutCirc: function(a, b, e, c, d) {
			return c * Math.sqrt(1 - (b = b / d - 1) * b) + e
		},
		easeInOutCirc: function(a, b, e, c, d) {
			return 1 > (b /= d / 2) ? -c / 2 * (Math.sqrt(1 - b * b) - 1) + e : c / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + e
		},
		easeInElastic: function(a, b, e, c, d) {
			a = 1.70158;
			var f = 0,
				k = c;
			if (0 == b) return e;
			if (1 == (b /= d)) return e + c;
			f || (f = 0.3 * d);
			k < Math.abs(c) ? (k = c, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(c / k);
			return -(k * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * d - a) *
				2 * Math.PI / f)) + e
		},
		easeOutElastic: function(a, b, e, c, d) {
			a = 1.70158;
			var f = 0,
				k = c;
			if (0 == b) return e;
			if (1 == (b /= d)) return e + c;
			f || (f = 0.3 * d);
			k < Math.abs(c) ? (k = c, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(c / k);
			return k * Math.pow(2, -10 * b) * Math.sin((b * d - a) * 2 * Math.PI / f) + c + e
		},
		easeInOutElastic: function(a, b, e, c, d) {
			a = 1.70158;
			var f = 0,
				k = c;
			if (0 == b) return e;
			if (2 == (b /= d / 2)) return e + c;
			f || (f = d * 0.3 * 1.5);
			k < Math.abs(c) ? (k = c, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(c / k);
			return 1 > b ? -0.5 * k * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * d - a) * 2 * Math.PI / f) + e : 0.5 * k *
				Math.pow(2, -10 * (b -= 1)) * Math.sin((b * d - a) * 2 * Math.PI / f) + c + e
		},
		easeInBack: function(a, b, e, c, d, f) {
			f == m && (f = 1.70158);
			return c * (b /= d) * b * ((f + 1) * b - f) + e
		},
		easeOutBack: function(a, b, e, c, d, f) {
			f == m && (f = 1.70158);
			return c * ((b = b / d - 1) * b * ((f + 1) * b + f) + 1) + e
		},
		easeInOutBack: function(a, b, e, c, d, f) {
			f == m && (f = 1.70158);
			return 1 > (b /= d / 2) ? c / 2 * b * b * (((f *= 1.525) + 1) * b - f) + e : c / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + e
		},
		easeInBounce: function(a, e, c, d, f) {
			return d - b.easing.easeOutBounce(a, f - e, 0, d, f) + c
		},
		easeOutBounce: function(a, b, e, c, d) {
			return (b /=
				d) < 1 / 2.75 ? c * 7.5625 * b * b + e : b < 2 / 2.75 ? c * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + e : b < 2.5 / 2.75 ? c * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + e : c * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + e
		},
		easeInOutBounce: function(a, e, c, d, f) {
			return e < f / 2 ? 0.5 * b.easing.easeInBounce(a, 2 * e, 0, d, f) + c : 0.5 * b.easing.easeOutBounce(a, 2 * e - f, 0, d, f) + 0.5 * d + c
		}
	})
}(jQuery);
(function(b, m) {
	b.effects.blind = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = ["position", "top", "bottom", "left", "right"],
				g = b.effects.setMode(a, d.options.mode || "hide"),
				f = d.options.direction || "vertical";
			b.effects.save(a, c);
			a.show();
			var e = b.effects.createWrapper(a).css({
				overflow: "hidden"
			}),
				k = "vertical" == f ? "height" : "width",
				f = "vertical" == f ? e.height() : e.width();
			"show" == g && e.css(k, 0);
			var l = {};
			l[k] = "show" == g ? f : 0;
			e.animate(l, d.duration, d.options.easing, function() {
				"hide" == g && a.hide();
				b.effects.restore(a,
					c);
				b.effects.removeWrapper(a);
				d.callback && d.callback.apply(a[0], arguments);
				a.dequeue()
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.bounce = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = ["position", "top", "bottom", "left", "right"],
				g = b.effects.setMode(a, d.options.mode || "effect"),
				f = d.options.direction || "up",
				e = d.options.distance || 20,
				k = d.options.times || 5,
				l = d.duration || 250;
			/show|hide/.test(g) && c.push("opacity");
			b.effects.save(a, c);
			a.show();
			b.effects.createWrapper(a);
			var r = "up" == f || "down" == f ? "top" : "left",
				f = "up" == f || "left" == f ? "pos" : "neg",
				e = d.options.distance || ("top" == r ? a.outerHeight({
						margin: !0
					}) / 3 : a.outerWidth({
						margin: !0
					}) /
					3);
			"show" == g && a.css("opacity", 0).css(r, "pos" == f ? -e : e);
			"hide" == g && (e /= 2 * k);
			"hide" != g && k--;
			if ("show" == g) {
				var p = {
					opacity: 1
				};
				p[r] = ("pos" == f ? "+\x3d" : "-\x3d") + e;
				a.animate(p, l / 2, d.options.easing);
				e /= 2;
				k--
			}
			for (p = 0; p < k; p++) {
				var n = {}, m = {};
				n[r] = ("pos" == f ? "-\x3d" : "+\x3d") + e;
				m[r] = ("pos" == f ? "+\x3d" : "-\x3d") + e;
				a.animate(n, l / 2, d.options.easing).animate(m, l / 2, d.options.easing);
				e = "hide" == g ? 2 * e : e / 2
			}
			"hide" == g ? (p = {
				opacity: 0
			}, p[r] = ("pos" == f ? "-\x3d" : "+\x3d") + e, a.animate(p, l / 2, d.options.easing, function() {
				a.hide();
				b.effects.restore(a,
					c);
				b.effects.removeWrapper(a);
				d.callback && d.callback.apply(this, arguments)
			})) : (n = {}, m = {}, n[r] = ("pos" == f ? "-\x3d" : "+\x3d") + e, m[r] = ("pos" == f ? "+\x3d" : "-\x3d") + e, a.animate(n, l / 2, d.options.easing).animate(m, l / 2, d.options.easing, function() {
				b.effects.restore(a, c);
				b.effects.removeWrapper(a);
				d.callback && d.callback.apply(this, arguments)
			}));
			a.queue("fx", function() {
				a.dequeue()
			});
			a.dequeue()
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.clip = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = "position top bottom left right height width".split(" "),
				g = b.effects.setMode(a, d.options.mode || "hide"),
				f = d.options.direction || "vertical";
			b.effects.save(a, c);
			a.show();
			var e = b.effects.createWrapper(a).css({
				overflow: "hidden"
			}),
				e = "IMG" == a[0].tagName ? e : a,
				k = "vertical" == f ? "height" : "width",
				l = "vertical" == f ? "top" : "left",
				f = "vertical" == f ? e.height() : e.width();
			"show" == g && (e.css(k, 0), e.css(l, f / 2));
			var r = {};
			r[k] = "show" == g ? f : 0;
			r[l] = "show" == g ? 0 : f / 2;
			e.animate(r, {
				queue: !1,
				duration: d.duration,
				easing: d.options.easing,
				complete: function() {
					"hide" == g && a.hide();
					b.effects.restore(a, c);
					b.effects.removeWrapper(a);
					d.callback && d.callback.apply(a[0], arguments);
					a.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.drop = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = "position top bottom left right opacity".split(" "),
				g = b.effects.setMode(a, d.options.mode || "hide"),
				f = d.options.direction || "left";
			b.effects.save(a, c);
			a.show();
			b.effects.createWrapper(a);
			var e = "up" == f || "down" == f ? "top" : "left",
				f = "up" == f || "left" == f ? "pos" : "neg",
				k = d.options.distance || ("top" == e ? a.outerHeight({
					margin: !0
				}) / 2 : a.outerWidth({
					margin: !0
				}) / 2);
			"show" == g && a.css("opacity", 0).css(e, "pos" == f ? -k : k);
			var l = {
				opacity: "show" == g ? 1 : 0
			};
			l[e] = ("show" == g ? "pos" == f ? "+\x3d" : "-\x3d" : "pos" == f ? "-\x3d" : "+\x3d") + k;
			a.animate(l, {
				queue: !1,
				duration: d.duration,
				easing: d.options.easing,
				complete: function() {
					"hide" == g && a.hide();
					b.effects.restore(a, c);
					b.effects.removeWrapper(a);
					d.callback && d.callback.apply(this, arguments);
					a.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.explode = function(d) {
		return this.queue(function() {
			var a = d.options.pieces ? Math.round(Math.sqrt(d.options.pieces)) : 3,
				c = d.options.pieces ? Math.round(Math.sqrt(d.options.pieces)) : 3;
			d.options.mode = "toggle" == d.options.mode ? b(this).is(":visible") ? "hide" : "show" : d.options.mode;
			var g = b(this).show().css("visibility", "hidden"),
				f = g.offset();
			f.top -= parseInt(g.css("marginTop"), 10) || 0;
			f.left -= parseInt(g.css("marginLeft"), 10) || 0;
			for (var e = g.outerWidth(!0), k = g.outerHeight(!0), l = 0; l < a; l++)
				for (var r =
					0; r < c; r++) g.clone().appendTo("body").wrap("\x3cdiv\x3e\x3c/div\x3e").css({
					position: "absolute",
					visibility: "visible",
					left: -r * (e / c),
					top: -l * (k / a)
				}).parent().addClass("ui-effects-explode").css({
					position: "absolute",
					overflow: "hidden",
					width: e / c,
					height: k / a,
					left: f.left + r * (e / c) + ("show" == d.options.mode ? (r - Math.floor(c / 2)) * (e / c) : 0),
					top: f.top + l * (k / a) + ("show" == d.options.mode ? (l - Math.floor(a / 2)) * (k / a) : 0),
					opacity: "show" == d.options.mode ? 0 : 1
				}).animate({
					left: f.left + r * (e / c) + ("show" == d.options.mode ? 0 : (r - Math.floor(c / 2)) *
						(e / c)),
					top: f.top + l * (k / a) + ("show" == d.options.mode ? 0 : (l - Math.floor(a / 2)) * (k / a)),
					opacity: "show" == d.options.mode ? 1 : 0
				}, d.duration || 500);
			setTimeout(function() {
				"show" == d.options.mode ? g.css({
					visibility: "visible"
				}) : g.css({
					visibility: "visible"
				}).hide();
				d.callback && d.callback.apply(g[0]);
				g.dequeue();
				b("div.ui-effects-explode").remove()
			}, d.duration || 500)
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.fade = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = b.effects.setMode(a, d.options.mode || "hide");
			a.animate({
				opacity: c
			}, {
				queue: !1,
				duration: d.duration,
				easing: d.options.easing,
				complete: function() {
					d.callback && d.callback.apply(this, arguments);
					a.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.fold = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = ["position", "top", "bottom", "left", "right"],
				g = b.effects.setMode(a, d.options.mode || "hide"),
				f = d.options.size || 15,
				e = !! d.options.horizFirst,
				k = d.duration ? d.duration / 2 : b.fx.speeds._default / 2;
			b.effects.save(a, c);
			a.show();
			var l = b.effects.createWrapper(a).css({
				overflow: "hidden"
			}),
				r = "show" == g != e,
				p = r ? ["width", "height"] : ["height", "width"],
				r = r ? [l.width(), l.height()] : [l.height(), l.width()],
				n = /([0-9]+)%/.exec(f);
			n && (f = parseInt(n[1],
				10) / 100 * r["hide" == g ? 0 : 1]);
			"show" == g && l.css(e ? {
				height: 0,
				width: f
			} : {
				height: f,
				width: 0
			});
			e = {};
			n = {};
			e[p[0]] = "show" == g ? r[0] : f;
			n[p[1]] = "show" == g ? r[1] : 0;
			l.animate(e, k, d.options.easing).animate(n, k, d.options.easing, function() {
				"hide" == g && a.hide();
				b.effects.restore(a, c);
				b.effects.removeWrapper(a);
				d.callback && d.callback.apply(a[0], arguments);
				a.dequeue()
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.highlight = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = ["backgroundImage", "backgroundColor", "opacity"],
				g = b.effects.setMode(a, d.options.mode || "show"),
				f = {
					backgroundColor: a.css("backgroundColor")
				};
			"hide" == g && (f.opacity = 0);
			b.effects.save(a, c);
			a.show().css({
				backgroundImage: "none",
				backgroundColor: d.options.color || "#ffff99"
			}).animate(f, {
				queue: !1,
				duration: d.duration,
				easing: d.options.easing,
				complete: function() {
					"hide" == g && a.hide();
					b.effects.restore(a, c);
					"show" == g && !b.support.opacity &&
						this.style.removeAttribute("filter");
					d.callback && d.callback.apply(this, arguments);
					a.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.pulsate = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = b.effects.setMode(a, d.options.mode || "show");
			times = 2 * (d.options.times || 5) - 1;
			duration = d.duration ? d.duration / 2 : b.fx.speeds._default / 2;
			isVisible = a.is(":visible");
			animateTo = 0;
			isVisible || (a.css("opacity", 0).show(), animateTo = 1);
			("hide" == c && isVisible || "show" == c && !isVisible) && times--;
			for (c = 0; c < times; c++) a.animate({
				opacity: animateTo
			}, duration, d.options.easing), animateTo = (animateTo + 1) % 2;
			a.animate({
					opacity: animateTo
				}, duration,
				d.options.easing, function() {
					0 == animateTo && a.hide();
					d.callback && d.callback.apply(this, arguments)
				});
			a.queue("fx", function() {
				a.dequeue()
			}).dequeue()
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.puff = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = b.effects.setMode(a, d.options.mode || "hide"),
				g = parseInt(d.options.percent, 10) || 150,
				f = g / 100,
				e = {
					height: a.height(),
					width: a.width()
				};
			b.extend(d.options, {
				fade: !0,
				mode: c,
				percent: "hide" == c ? g : 100,
				from: "hide" == c ? e : {
					height: e.height * f,
					width: e.width * f
				}
			});
			a.effect("scale", d.options, d.duration, d.callback);
			a.dequeue()
		})
	};
	b.effects.scale = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = b.extend(!0, {}, d.options),
				g = b.effects.setMode(a,
					d.options.mode || "effect"),
				f = parseInt(d.options.percent, 10) || (0 == parseInt(d.options.percent, 10) ? 0 : "hide" == g ? 0 : 100),
				e = d.options.direction || "both",
				k = d.options.origin;
			"effect" != g && (c.origin = k || ["middle", "center"], c.restore = !0);
			k = {
				height: a.height(),
				width: a.width()
			};
			a.from = d.options.from || ("show" == g ? {
				height: 0,
				width: 0
			} : k);
			a.to = {
				height: k.height * ("horizontal" != e ? f / 100 : 1),
				width: k.width * ("vertical" != e ? f / 100 : 1)
			};
			d.options.fade && ("show" == g && (a.from.opacity = 0, a.to.opacity = 1), "hide" == g && (a.from.opacity = 1, a.to.opacity =
				0));
			c.from = a.from;
			c.to = a.to;
			c.mode = g;
			a.effect("size", c, d.duration, d.callback);
			a.dequeue()
		})
	};
	b.effects.size = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = "position top bottom left right width height overflow opacity".split(" "),
				g = "position top bottom left right overflow opacity".split(" "),
				f = ["width", "height", "overflow"],
				e = ["fontSize"],
				k = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
				l = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
				r = b.effects.setMode(a,
					d.options.mode || "effect"),
				p = d.options.restore || !1,
				n = d.options.scale || "both",
				m = d.options.origin,
				q = {
					height: a.height(),
					width: a.width()
				};
			a.from = d.options.from || q;
			a.to = d.options.to || q;
			m && (m = b.effects.getBaseline(m, q), a.from.top = (q.height - a.from.height) * m.y, a.from.left = (q.width - a.from.width) * m.x, a.to.top = (q.height - a.to.height) * m.y, a.to.left = (q.width - a.to.width) * m.x);
			var v = a.from.height / q.height,
				A = a.from.width / q.width,
				C = a.to.height / q.height,
				x = a.to.width / q.width;
			if ("box" == n || "both" == n) v != C && (c = c.concat(k),
				a.from = b.effects.setTransition(a, k, v, a.from), a.to = b.effects.setTransition(a, k, C, a.to)), A != x && (c = c.concat(l), a.from = b.effects.setTransition(a, l, A, a.from), a.to = b.effects.setTransition(a, l, x, a.to));
			if (("content" == n || "both" == n) && v != C) c = c.concat(e), a.from = b.effects.setTransition(a, e, v, a.from), a.to = b.effects.setTransition(a, e, C, a.to);
			b.effects.save(a, p ? c : g);
			a.show();
			b.effects.createWrapper(a);
			a.css("overflow", "hidden").css(a.from);
			if ("content" == n || "both" == n) k = k.concat(["marginTop", "marginBottom"]).concat(e),
			l = l.concat(["marginLeft", "marginRight"]), f = c.concat(k).concat(l), a.find("*[width]").each(function() {
				child = b(this);
				p && b.effects.save(child, f);
				var a = child.height(),
					e = child.width();
				child.from = {
					height: a * v,
					width: e * A
				};
				child.to = {
					height: a * C,
					width: e * x
				};
				v != C && (child.from = b.effects.setTransition(child, k, v, child.from), child.to = b.effects.setTransition(child, k, C, child.to));
				A != x && (child.from = b.effects.setTransition(child, l, A, child.from), child.to = b.effects.setTransition(child, l, x, child.to));
				child.css(child.from);
				child.animate(child.to, d.duration, d.options.easing, function() {
					p && b.effects.restore(child, f)
				})
			});
			a.animate(a.to, {
				queue: !1,
				duration: d.duration,
				easing: d.options.easing,
				complete: function() {
					0 === a.to.opacity && a.css("opacity", a.from.opacity);
					"hide" == r && a.hide();
					b.effects.restore(a, p ? c : g);
					b.effects.removeWrapper(a);
					d.callback && d.callback.apply(this, arguments);
					a.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.shake = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = ["position", "top", "bottom", "left", "right"];
			b.effects.setMode(a, d.options.mode || "effect");
			var g = d.options.direction || "left",
				f = d.options.distance || 20,
				e = d.options.times || 3,
				k = d.duration || d.options.duration || 140;
			b.effects.save(a, c);
			a.show();
			b.effects.createWrapper(a);
			var l = "up" == g || "down" == g ? "top" : "left",
				r = "up" == g || "left" == g ? "pos" : "neg",
				g = {}, p = {}, n = {};
			g[l] = ("pos" == r ? "-\x3d" : "+\x3d") + f;
			p[l] = ("pos" == r ? "+\x3d" : "-\x3d") +
				2 * f;
			n[l] = ("pos" == r ? "-\x3d" : "+\x3d") + 2 * f;
			a.animate(g, k, d.options.easing);
			for (f = 1; f < e; f++) a.animate(p, k, d.options.easing).animate(n, k, d.options.easing);
			a.animate(p, k, d.options.easing).animate(g, k / 2, d.options.easing, function() {
				b.effects.restore(a, c);
				b.effects.removeWrapper(a);
				d.callback && d.callback.apply(this, arguments)
			});
			a.queue("fx", function() {
				a.dequeue()
			});
			a.dequeue()
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.slide = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = ["position", "top", "bottom", "left", "right"],
				g = b.effects.setMode(a, d.options.mode || "show"),
				f = d.options.direction || "left";
			b.effects.save(a, c);
			a.show();
			b.effects.createWrapper(a).css({
				overflow: "hidden"
			});
			var e = "up" == f || "down" == f ? "top" : "left",
				f = "up" == f || "left" == f ? "pos" : "neg",
				k = d.options.distance || ("top" == e ? a.outerHeight({
					margin: !0
				}) : a.outerWidth({
					margin: !0
				}));
			"show" == g && a.css(e, "pos" == f ? isNaN(k) ? "-" + k : -k : k);
			var l = {};
			l[e] = ("show" == g ? "pos" == f ? "+\x3d" : "-\x3d" : "pos" == f ? "-\x3d" : "+\x3d") + k;
			a.animate(l, {
				queue: !1,
				duration: d.duration,
				easing: d.options.easing,
				complete: function() {
					"hide" == g && a.hide();
					b.effects.restore(a, c);
					b.effects.removeWrapper(a);
					d.callback && d.callback.apply(this, arguments);
					a.dequeue()
				}
			})
		})
	}
})(jQuery);
(function(b, m) {
	b.effects.transfer = function(d) {
		return this.queue(function() {
			var a = b(this),
				c = b(d.options.to),
				g = c.offset(),
				c = {
					top: g.top,
					left: g.left,
					height: c.innerHeight(),
					width: c.innerWidth()
				}, g = a.offset(),
				f = b('\x3cdiv class\x3d"ui-effects-transfer"\x3e\x3c/div\x3e').appendTo(document.body).addClass(d.options.className).css({
					top: g.top,
					left: g.left,
					height: a.innerHeight(),
					width: a.innerWidth(),
					position: "absolute"
				}).animate(c, d.duration, d.options.easing, function() {
					f.remove();
					d.callback && d.callback.apply(a[0],
						arguments);
					a.dequeue()
				})
		})
	}
})(jQuery);
(function(b, m) {
	b.widget("ui.accordion", {
		options: {
			active: 0,
			animated: "slide",
			autoHeight: !0,
			clearStyle: !1,
			collapsible: !1,
			event: "click",
			fillSpace: !1,
			header: "\x3e li \x3e :first-child,\x3e :not(li):even",
			icons: {
				header: "ui-icon-triangle-1-e",
				headerSelected: "ui-icon-triangle-1-s"
			},
			navigation: !1,
			navigationFilter: function() {
				return this.href.toLowerCase() === location.href.toLowerCase()
			}
		},
		_create: function() {
			var d = this,
				a = d.options;
			d.running = 0;
			d.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
			d.headers =
				d.element.find(a.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
					a.disabled || b(this).addClass("ui-state-hover")
				}).bind("mouseleave.accordion", function() {
					a.disabled || b(this).removeClass("ui-state-hover")
				}).bind("focus.accordion", function() {
					a.disabled || b(this).addClass("ui-state-focus")
				}).bind("blur.accordion", function() {
					a.disabled || b(this).removeClass("ui-state-focus")
				});
			d.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
			if (a.navigation) {
				var c = d.element.find("a").filter(a.navigationFilter).eq(0);
				if (c.length) {
					var g = c.closest(".ui-accordion-header");
					d.active = g.length ? g : c.closest(".ui-accordion-content").prev()
				}
			}
			d.active = d._findActive(d.active || a.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
			d.active.next().addClass("ui-accordion-content-active");
			d._createIcons();
			d.resize();
			d.element.attr("role", "tablist");
			d.headers.attr("role", "tab").bind("keydown.accordion",
				function(a) {
					return d._keydown(a)
				}).next().attr("role", "tabpanel");
			d.headers.not(d.active || "").attr({
				"aria-expanded": "false",
				"aria-selected": "false",
				tabIndex: -1
			}).next().hide();
			d.active.length ? d.active.attr({
				"aria-expanded": "true",
				"aria-selected": "true",
				tabIndex: 0
			}) : d.headers.eq(0).attr("tabIndex", 0);
			b.browser.safari || d.headers.find("a").attr("tabIndex", -1);
			a.event && d.headers.bind(a.event.split(" ").join(".accordion ") + ".accordion", function(a) {
				d._clickHandler.call(d, a, this);
				a.preventDefault()
			})
		},
		_createIcons: function() {
			var d =
				this.options;
			d.icons && (b("\x3cspan\x3e\x3c/span\x3e").addClass("ui-icon " + d.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
		},
		_destroyIcons: function() {
			this.headers.children(".ui-icon").remove();
			this.element.removeClass("ui-accordion-icons")
		},
		destroy: function() {
			var d = this.options;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
			this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
			this.headers.find("a").removeAttr("tabIndex");
			this._destroyIcons();
			var a = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
			(d.autoHeight || d.fillHeight) && a.css("height", "");
			return b.Widget.prototype.destroy.call(this)
		},
		_setOption: function(d, a) {
			b.Widget.prototype._setOption.apply(this, arguments);
			"active" == d && this.activate(a);
			"icons" == d && (this._destroyIcons(),
				a && this._createIcons());
			if ("disabled" == d) this.headers.add(this.headers.next())[a ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
		},
		_keydown: function(d) {
			if (!this.options.disabled && !d.altKey && !d.ctrlKey) {
				var a = b.ui.keyCode,
					c = this.headers.length,
					g = this.headers.index(d.target),
					f = !1;
				switch (d.keyCode) {
					case a.RIGHT:
					case a.DOWN:
						f = this.headers[(g + 1) % c];
						break;
					case a.LEFT:
					case a.UP:
						f = this.headers[(g - 1 + c) % c];
						break;
					case a.SPACE:
					case a.ENTER:
						this._clickHandler({
							target: d.target
						}, d.target), d.preventDefault()
				}
				return f ?
					(b(d.target).attr("tabIndex", -1), b(f).attr("tabIndex", 0), f.focus(), !1) : !0
			}
		},
		resize: function() {
			var d = this.options,
				a;
			if (d.fillSpace) {
				if (b.browser.msie) {
					var c = this.element.parent().css("overflow");
					this.element.parent().css("overflow", "hidden")
				}
				a = this.element.parent().height();
				b.browser.msie && this.element.parent().css("overflow", c);
				this.headers.each(function() {
					a -= b(this).outerHeight(!0)
				});
				this.headers.next().each(function() {
					b(this).height(Math.max(0, a - b(this).innerHeight() + b(this).height()))
				}).css("overflow",
					"auto")
			} else d.autoHeight && (a = 0, this.headers.next().each(function() {
				a = Math.max(a, b(this).height("").height())
			}).height(a));
			return this
		},
		activate: function(b) {
			this.options.active = b;
			b = this._findActive(b)[0];
			this._clickHandler({
				target: b
			}, b);
			return this
		},
		_findActive: function(d) {
			return d ? "number" === typeof d ? this.headers.filter(":eq(" + d + ")") : this.headers.not(this.headers.not(d)) : !1 === d ? b([]) : this.headers.filter(":eq(0)")
		},
		_clickHandler: function(d, a) {
			var c = this.options;
			if (!c.disabled)
				if (d.target) {
					var g = b(d.currentTarget ||
						a),
						f = g[0] === this.active[0];
					c.active = c.collapsible && f ? !1 : this.headers.index(g);
					if (!(this.running || !c.collapsible && f)) {
						var e = this.active,
							k = g.next(),
							l = this.active.next(),
							r = {
								options: c,
								newHeader: f && c.collapsible ? b([]) : g,
								oldHeader: this.active,
								newContent: f && c.collapsible ? b([]) : k,
								oldContent: l
							}, p = this.headers.index(this.active[0]) > this.headers.index(g[0]);
						this.active = f ? b([]) : g;
						this._toggle(k, l, r, f, p);
						e.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(c.icons.headerSelected).addClass(c.icons.header);
						f || (g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(c.icons.header).addClass(c.icons.headerSelected), g.next().addClass("ui-accordion-content-active"))
					}
				} else
			if (c.collapsible) {
				this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(c.icons.headerSelected).addClass(c.icons.header);
				this.active.next().addClass("ui-accordion-content-active");
				var l = this.active.next(),
					r = {
						options: c,
						newHeader: b([]),
						oldHeader: c.active,
						newContent: b([]),
						oldContent: l
					}, k = this.active = b([]);
				this._toggle(k, l, r)
			}
		},
		_toggle: function(d, a, c, g, f) {
			var e = this,
				k = e.options;
			e.toShow = d;
			e.toHide = a;
			e.data = c;
			var l = function() {
				if (e) return e._completed.apply(e, arguments)
			};
			e._trigger("changestart", null, e.data);
			e.running = 0 === a.size() ? d.size() : a.size();
			if (k.animated) {
				c = {};
				c = k.collapsible && g ? {
					toShow: b([]),
					toHide: a,
					complete: l,
					down: f,
					autoHeight: k.autoHeight || k.fillSpace
				} : {
					toShow: d,
					toHide: a,
					complete: l,
					down: f,
					autoHeight: k.autoHeight || k.fillSpace
				};
				k.proxied || (k.proxied = k.animated);
				k.proxiedDuration || (k.proxiedDuration = k.duration);
				k.animated = b.isFunction(k.proxied) ? k.proxied(c) : k.proxied;
				k.duration = b.isFunction(k.proxiedDuration) ? k.proxiedDuration(c) : k.proxiedDuration;
				g = b.ui.accordion.animations;
				var r = k.duration,
					p = k.animated;
				p && (!g[p] && !b.easing[p]) && (p = "slide");
				g[p] || (g[p] = function(a) {
					this.slide(a, {
						easing: p,
						duration: r || 700
					})
				});
				g[p](c)
			} else k.collapsible && g ? d.toggle() : (a.hide(), d.show()), l(!0);
			a.prev().attr({
				"aria-expanded": "false",
				"aria-selected": "false",
				tabIndex: -1
			}).blur();
			d.prev().attr({
				"aria-expanded": "true",
				"aria-selected": "true",
				tabIndex: 0
			}).focus()
		},
		_completed: function(b) {
			this.running = b ? 0 : --this.running;
			this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
				height: "",
				overflow: ""
			}), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
		}
	});
	b.extend(b.ui.accordion, {
		version: "1.8.18",
		animations: {
			slide: function(d, a) {
				d = b.extend({
					easing: "swing",
					duration: 300
				}, d, a);
				if (d.toHide.size())
					if (d.toShow.size()) {
						var c = d.toShow.css("overflow"),
							g = 0,
							f = {}, e = {}, k, l = d.toShow;
						k = l[0].style.width;
						l.width(l.parent().width() - parseFloat(l.css("paddingLeft")) - parseFloat(l.css("paddingRight")) - (parseFloat(l.css("borderLeftWidth")) || 0) - (parseFloat(l.css("borderRightWidth")) || 0));
						b.each(["height", "paddingTop", "paddingBottom"], function(a, c) {
							e[c] = "hide";
							var k = ("" + b.css(d.toShow[0], c)).match(/^([\d+-.]+)(.*)$/);
							f[c] = {
								value: k[1],
								unit: k[2] || "px"
							}
						});
						d.toShow.css({
							height: 0,
							overflow: "hidden"
						}).show();
						d.toHide.filter(":hidden").each(d.complete).end().filter(":visible").animate(e, {
							step: function(a, b) {
								"height" == b.prop && (g = 0 === b.end - b.start ? 0 : (b.now - b.start) / (b.end - b.start));
								d.toShow[0].style[b.prop] = g * f[b.prop].value + f[b.prop].unit
							},
							duration: d.duration,
							easing: d.easing,
							complete: function() {
								d.autoHeight || d.toShow.css("height", "");
								d.toShow.css({
									width: k,
									overflow: c
								});
								d.complete()
							}
						})
					} else d.toHide.animate({
						height: "hide",
						paddingTop: "hide",
						paddingBottom: "hide"
					}, d);
					else d.toShow.animate({
						height: "show",
						paddingTop: "show",
						paddingBottom: "show"
					}, d)
			},
			bounceslide: function(b) {
				this.slide(b, {
					easing: b.down ? "easeOutBounce" : "swing",
					duration: b.down ? 1E3 : 200
				})
			}
		}
	})
})(jQuery);
(function(b, m) {
	var d = 0;
	b.widget("ui.autocomplete", {
		options: {
			appendTo: "body",
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null
		},
		pending: 0,
		_create: function() {
			var a = this,
				c = this.element[0].ownerDocument,
				d;
			this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			}).bind("keydown.autocomplete", function(c) {
				if (!a.options.disabled && !a.element.propAttr("readOnly")) {
					d = !1;
					var e = b.ui.keyCode;
					switch (c.keyCode) {
						case e.PAGE_UP:
							a._move("previousPage", c);
							break;
						case e.PAGE_DOWN:
							a._move("nextPage", c);
							break;
						case e.UP:
							a._move("previous", c);
							c.preventDefault();
							break;
						case e.DOWN:
							a._move("next", c);
							c.preventDefault();
							break;
						case e.ENTER:
						case e.NUMPAD_ENTER:
							a.menu.active && (d = !0, c.preventDefault());
						case e.TAB:
							if (!a.menu.active) break;
							a.menu.select(c);
							break;
						case e.ESCAPE:
							a.element.val(a.term);
							a.close(c);
							break;
						default:
							clearTimeout(a.searching), a.searching = setTimeout(function() {
								a.term !=
									a.element.val() && (a.selectedItem = null, a.search(null, c))
							}, a.options.delay)
					}
				}
			}).bind("keypress.autocomplete", function(a) {
				d && (d = !1, a.preventDefault())
			}).bind("focus.autocomplete", function() {
				a.options.disabled || (a.selectedItem = null, a.previous = a.element.val())
			}).bind("blur.autocomplete", function(b) {
				a.options.disabled || (clearTimeout(a.searching), a.closing = setTimeout(function() {
					a.close(b);
					a._change(b)
				}, 150))
			});
			this._initSource();
			this.response = function() {
				return a._response.apply(a, arguments)
			};
			this.menu = b("\x3cul\x3e\x3c/ul\x3e").addClass("ui-autocomplete").appendTo(b(this.options.appendTo ||
				"body", c)[0]).mousedown(function(c) {
				var e = a.menu.element[0];
				b(c.target).closest(".ui-menu-item").length || setTimeout(function() {
					b(document).one("mousedown", function(c) {
						c.target !== a.element[0] && (c.target !== e && !b.ui.contains(e, c.target)) && a.close()
					})
				}, 1);
				setTimeout(function() {
					clearTimeout(a.closing)
				}, 13)
			}).menu({
				focus: function(b, e) {
					var c = e.item.data("item.autocomplete");
					!1 !== a._trigger("focus", b, {
						item: c
					}) && /^key/.test(b.originalEvent.type) && a.element.val(c.value)
				},
				selected: function(b, e) {
					var d = e.item.data("item.autocomplete"),
						g = a.previous;
					a.element[0] !== c.activeElement && (a.element.focus(), a.previous = g, setTimeout(function() {
						a.previous = g;
						a.selectedItem = d
					}, 1));
					!1 !== a._trigger("select", b, {
						item: d
					}) && a.element.val(d.value);
					a.term = a.element.val();
					a.close(b);
					a.selectedItem = d
				},
				blur: function(b, e) {
					a.menu.element.is(":visible") && a.element.val() !== a.term && a.element.val(a.term)
				}
			}).zIndex(this.element.zIndex() + 1).css({
				top: 0,
				left: 0
			}).hide().data("menu");
			b.fn.bgiframe && this.menu.element.bgiframe();
			a.beforeunloadHandler = function() {
				a.element.removeAttr("autocomplete")
			};
			b(window).bind("beforeunload", a.beforeunloadHandler)
		},
		destroy: function() {
			this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
			this.menu.element.remove();
			b(window).unbind("beforeunload", this.beforeunloadHandler);
			b.Widget.prototype.destroy.call(this)
		},
		_setOption: function(a, c) {
			b.Widget.prototype._setOption.apply(this, arguments);
			"source" === a && this._initSource();
			"appendTo" === a && this.menu.element.appendTo(b(c ||
				"body", this.element[0].ownerDocument)[0]);
			"disabled" === a && (c && this.xhr) && this.xhr.abort()
		},
		_initSource: function() {
			var a = this,
				c, g;
			b.isArray(this.options.source) ? (c = this.options.source, this.source = function(a, e) {
				e(b.ui.autocomplete.filter(c, a.term))
			}) : "string" === typeof this.options.source ? (g = this.options.source, this.source = function(c, e) {
				a.xhr && a.xhr.abort();
				a.xhr = b.ajax({
					url: g,
					data: c,
					dataType: "json",
					context: {
						autocompleteRequest: ++d
					},
					success: function(a, b) {
						this.autocompleteRequest === d && e(a)
					},
					error: function() {
						this.autocompleteRequest ===
							d && e([])
					}
				})
			}) : this.source = this.options.source
		},
		search: function(a, b) {
			a = null != a ? a : this.element.val();
			this.term = this.element.val();
			if (a.length < this.options.minLength) return this.close(b);
			clearTimeout(this.closing);
			if (!1 !== this._trigger("search", b)) return this._search(a)
		},
		_search: function(a) {
			this.pending++;
			this.element.addClass("ui-autocomplete-loading");
			this.source({
				term: a
			}, this.response)
		},
		_response: function(a) {
			!this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger("open")) :
				this.close();
			this.pending--;
			this.pending || this.element.removeClass("ui-autocomplete-loading")
		},
		close: function(a) {
			clearTimeout(this.closing);
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", a))
		},
		_change: function(a) {
			this.previous !== this.element.val() && this._trigger("change", a, {
				item: this.selectedItem
			})
		},
		_normalize: function(a) {
			return a.length && a[0].label && a[0].value ? a : b.map(a, function(a) {
				return "string" === typeof a ? {
					label: a,
					value: a
				} : b.extend({
					label: a.label || a.value,
					value: a.value || a.label
				}, a)
			})
		},
		_suggest: function(a) {
			var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
			this._renderMenu(c, a);
			this.menu.deactivate();
			this.menu.refresh();
			c.show();
			this._resizeMenu();
			c.position(b.extend({
				of: this.element
			}, this.options.position));
			this.options.autoFocus && this.menu.next(new b.Event("mouseover"))
		},
		_resizeMenu: function() {
			var a = this.menu.element;
			a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(a, c) {
			var d =
				this;
			b.each(c, function(b, e) {
				d._renderItem(a, e)
			})
		},
		_renderItem: function(a, c) {
			return b("\x3cli\x3e\x3c/li\x3e").data("item.autocomplete", c).append(b("\x3ca\x3e\x3c/a\x3e").text(c.label)).appendTo(a)
		},
		_move: function(a, b) {
			if (this.menu.element.is(":visible"))
				if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) this.element.val(this.term), this.menu.deactivate();
				else this.menu[a](b);
				else this.search(null, b)
		},
		widget: function() {
			return this.menu.element
		}
	});
	b.extend(b.ui.autocomplete, {
		escapeRegex: function(a) {
			return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$\x26")
		},
		filter: function(a, c) {
			var d = RegExp(b.ui.autocomplete.escapeRegex(c), "i");
			return b.grep(a, function(a) {
				return d.test(a.label || a.value || a)
			})
		}
	})
})(jQuery);
(function(b) {
	b.widget("ui.menu", {
		_create: function() {
			var m = this;
			this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
				role: "listbox",
				"aria-activedescendant": "ui-active-menuitem"
			}).click(function(d) {
				b(d.target).closest(".ui-menu-item a").length && (d.preventDefault(), m.select(d))
			});
			this.refresh()
		},
		refresh: function() {
			var m = this;
			this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(d) {
				m.activate(d, b(this).parent())
			}).mouseleave(function() {
				m.deactivate()
			})
		},
		activate: function(b, d) {
			this.deactivate();
			if (this.hasScroll()) {
				var a = d.offset().top - this.element.offset().top,
					c = this.element.scrollTop(),
					g = this.element.height();
				0 > a ? this.element.scrollTop(c + a) : a >= g && this.element.scrollTop(c + a - g + d.height())
			}
			this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
			this._trigger("focus", b, {
				item: d
			})
		},
		deactivate: function() {
			this.active &&
				(this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null)
		},
		next: function(b) {
			this.move("next", ".ui-menu-item:first", b)
		},
		previous: function(b) {
			this.move("prev", ".ui-menu-item:last", b)
		},
		first: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		last: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		move: function(b, d, a) {
			this.active ? (b = this.active[b + "All"](".ui-menu-item").eq(0), b.length ? this.activate(a,
				b) : this.activate(a, this.element.children(d))) : this.activate(a, this.element.children(d))
		},
		nextPage: function(m) {
			if (this.hasScroll())
				if (!this.active || this.last()) this.activate(m, this.element.children(".ui-menu-item:first"));
				else {
					var d = this.active.offset().top,
						a = this.element.height(),
						c = this.element.children(".ui-menu-item").filter(function() {
							var c = b(this).offset().top - d - a + b(this).height();
							return 10 > c && -10 < c
						});
					c.length || (c = this.element.children(".ui-menu-item:last"));
					this.activate(m, c)
				} else this.activate(m,
					this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
		},
		previousPage: function(m) {
			if (this.hasScroll())
				if (!this.active || this.first()) this.activate(m, this.element.children(".ui-menu-item:last"));
				else {
					var d = this.active.offset().top,
						a = this.element.height();
					result = this.element.children(".ui-menu-item").filter(function() {
						var c = b(this).offset().top - d + a - b(this).height();
						return 10 > c && -10 < c
					});
					result.length || (result = this.element.children(".ui-menu-item:first"));
					this.activate(m,
						result)
				} else this.activate(m, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
		},
		hasScroll: function() {
			return this.element.height() < this.element[b.fn.prop ? "prop" : "attr"]("scrollHeight")
		},
		select: function(b) {
			this._trigger("selected", b, {
				item: this.active
			})
		}
	})
})(jQuery);
(function(b, m) {
	var d, a, c, g, f = function() {
			var a = b(this).find(":ui-button");
			setTimeout(function() {
				a.button("refresh")
			}, 1)
		}, e = function(a) {
			var e = a.name,
				c = a.form,
				d = b([]);
			e && (d = c ? b(c).find("[name\x3d'" + e + "']") : b("[name\x3d'" + e + "']", a.ownerDocument).filter(function() {
				return !this.form
			}));
			return d
		};
	b.widget("ui.button", {
		options: {
			disabled: null,
			text: !0,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest("form").unbind("reset.button").bind("reset.button", f);
			"boolean" !== typeof this.options.disabled ?
				this.options.disabled = !! this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled);
			this._determineButtonType();
			this.hasTitle = !! this.buttonElement.attr("title");
			var k = this,
				l = this.options,
				r = "checkbox" === this.type || "radio" === this.type,
				p = "ui-state-hover" + (!r ? " ui-state-active" : "");
			null === l.label && (l.label = this.buttonElement.html());
			this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function() {
				l.disabled ||
					(b(this).addClass("ui-state-hover"), this === d && b(this).addClass("ui-state-active"))
			}).bind("mouseleave.button", function() {
				l.disabled || b(this).removeClass(p)
			}).bind("click.button", function(a) {
				l.disabled && (a.preventDefault(), a.stopImmediatePropagation())
			});
			this.element.bind("focus.button", function() {
				k.buttonElement.addClass("ui-state-focus")
			}).bind("blur.button", function() {
				k.buttonElement.removeClass("ui-state-focus")
			});
			r && (this.element.bind("change.button", function() {
				g || k.refresh()
			}), this.buttonElement.bind("mousedown.button",
				function(b) {
					l.disabled || (g = !1, a = b.pageX, c = b.pageY)
				}).bind("mouseup.button", function(b) {
				if (!l.disabled && (a !== b.pageX || c !== b.pageY)) g = !0
			}));
			"checkbox" === this.type ? this.buttonElement.bind("click.button", function() {
				if (l.disabled || g) return !1;
				b(this).toggleClass("ui-state-active");
				k.buttonElement.attr("aria-pressed", k.element[0].checked)
			}) : "radio" === this.type ? this.buttonElement.bind("click.button", function() {
				if (l.disabled || g) return !1;
				b(this).addClass("ui-state-active");
				k.buttonElement.attr("aria-pressed",
					"true");
				var a = k.element[0];
				e(a).not(a).map(function() {
					return b(this).button("widget")[0]
				}).removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : (this.buttonElement.bind("mousedown.button", function() {
				if (l.disabled) return !1;
				b(this).addClass("ui-state-active");
				d = this;
				b(document).one("mouseup", function() {
					d = null
				})
			}).bind("mouseup.button", function() {
				if (l.disabled) return !1;
				b(this).removeClass("ui-state-active")
			}).bind("keydown.button", function(a) {
				if (l.disabled) return !1;
				(a.keyCode == b.ui.keyCode.SPACE ||
					a.keyCode == b.ui.keyCode.ENTER) && b(this).addClass("ui-state-active")
			}).bind("keyup.button", function() {
				b(this).removeClass("ui-state-active")
			}), this.buttonElement.is("a") && this.buttonElement.keyup(function(a) {
				a.keyCode === b.ui.keyCode.SPACE && b(this).click()
			}));
			this._setOption("disabled", l.disabled);
			this._resetButton()
		},
		_determineButtonType: function() {
			this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button";
			if ("checkbox" === this.type || "radio" === this.type) {
				var a = this.element.parents().filter(":last"),
					b = "label[for\x3d'" + this.element.attr("id") + "']";
				this.buttonElement = a.find(b);
				this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b)));
				this.element.addClass("ui-helper-hidden-accessible");
				(a = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
				this.buttonElement.attr("aria-pressed",
					a)
			} else this.buttonElement = this.element
		},
		widget: function() {
			return this.buttonElement
		},
		destroy: function() {
			this.element.removeClass("ui-helper-hidden-accessible");
			this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
			this.hasTitle || this.buttonElement.removeAttr("title");
			b.Widget.prototype.destroy.call(this)
		},
		_setOption: function(a, e) {
			b.Widget.prototype._setOption.apply(this, arguments);
			"disabled" === a ? e ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1) : this._resetButton()
		},
		refresh: function() {
			var a = this.element.is(":disabled");
			a !== this.options.disabled && this._setOption("disabled", a);
			"radio" === this.type ? e(this.element[0]).each(function() {
				b(this).is(":checked") ? b(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
					"true") : b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
			}) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
		},
		_resetButton: function() {
			if ("input" === this.type) this.options.label && this.element.val(this.options.label);
			else {
				var a = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
					e = b("\x3cspan\x3e\x3c/span\x3e", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),
					c = this.options.icons,
					d = c.primary && c.secondary,
					f = [];
				c.primary || c.secondary ? (this.options.text && f.push("ui-button-text-icon" + (d ? "s" : c.primary ? "-primary" : "-secondary")), c.primary && a.prepend("\x3cspan class\x3d'ui-button-icon-primary ui-icon " + c.primary + "'\x3e\x3c/span\x3e"), c.secondary && a.append("\x3cspan class\x3d'ui-button-icon-secondary ui-icon " + c.secondary +
					"'\x3e\x3c/span\x3e"), this.options.text || (f.push(d ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || a.attr("title", e))) : f.push("ui-button-text-only");
				a.addClass(f.join(" "))
			}
		}
	});
	b.widget("ui.buttonset", {
		options: {
			items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
		},
		_create: function() {
			this.element.addClass("ui-buttonset")
		},
		_init: function() {
			this.refresh()
		},
		_setOption: function(a, e) {
			"disabled" === a && this.buttons.button("option", a, e);
			b.Widget.prototype._setOption.apply(this,
				arguments)
		},
		refresh: function() {
			var a = "rtl" === this.element.css("direction");
			this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
				return b(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(a ? "ui-corner-left" : "ui-corner-right").end().end()
		},
		destroy: function() {
			this.element.removeClass("ui-buttonset");
			this.buttons.map(function() {
				return b(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
			b.Widget.prototype.destroy.call(this)
		}
	})
})(jQuery);
(function(b, m) {
	function d() {
		this.debug = !1;
		this._curInst = null;
		this._keyEvent = !1;
		this._disabledInputs = [];
		this._inDialog = this._datepickerShowing = !1;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass =
			"ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: "January February March April May June July August September October November December".split(" "),
			monthNamesShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
			dayNames: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
			dayNamesShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
			dayNamesMin: "Su Mo Tu We Th Fr Sa".split(" "),
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		};
		this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		};
		b.extend(this._defaults, this.regional[""]);
		this.dpDiv = a(b('\x3cdiv id\x3d"' + this._mainDivId + '" class\x3d"ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"\x3e\x3c/div\x3e'))
	}

	function a(a) {
		return a.bind("mouseout", function(a) {
			a = b(a.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
			a.length && a.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
		}).bind("mouseover", function(c) {
			c = b(c.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
			if (!b.datepicker._isDisabledDatepicker(f.inline ? a.parent()[0] : f.input[0]) && c.length) c.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), c.addClass("ui-state-hover"), c.hasClass("ui-datepicker-prev") && c.addClass("ui-datepicker-prev-hover"), c.hasClass("ui-datepicker-next") &&
				c.addClass("ui-datepicker-next-hover")
		})
	}

	function c(a, c) {
		b.extend(a, c);
		for (var d in c)
			if (null == c[d] || c[d] == m) a[d] = c[d];
		return a
	}
	b.extend(b.ui, {
		datepicker: {
			version: "1.8.18"
		}
	});
	var g = (new Date).getTime(),
		f;
	b.extend(d.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		log: function() {
			this.debug && console.log.apply("", arguments)
		},
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(a) {
			c(this._defaults, a || {});
			return this
		},
		_attachDatepicker: function(a, c) {
			var d = null,
				f;
			for (f in this._defaults) {
				var g =
					a.getAttribute("date:" + f);
				if (g) {
					d = d || {};
					try {
						d[f] = eval(g)
					} catch (n) {
						d[f] = g
					}
				}
			}
			f = a.nodeName.toLowerCase();
			g = "div" == f || "span" == f;
			a.id || (this.uuid += 1, a.id = "dp" + this.uuid);
			var m = this._newInst(b(a), g);
			m.settings = b.extend({}, c || {}, d || {});
			"input" == f ? this._connectDatepicker(a, m) : g && this._inlineDatepicker(a, m)
		},
		_newInst: function(e, c) {
			return {
				id: e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
				input: e,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: c,
				dpDiv: !c ? this.dpDiv : a(b('\x3cdiv class\x3d"' +
					this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"\x3e\x3c/div\x3e'))
			}
		},
		_connectDatepicker: function(a, c) {
			var d = b(a);
			c.append = b([]);
			c.trigger = b([]);
			d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(a, b, e) {
				c.settings[b] = e
			}).bind("getData.datepicker", function(a, b) {
				return this._get(c, b)
			}), this._autoSize(c), b.data(a,
				"datepicker", c), c.settings.disabled && this._disableDatepicker(a))
		},
		_attachments: function(a, c) {
			var d = this._get(c, "appendText"),
				f = this._get(c, "isRTL");
			c.append && c.append.remove();
			d && (c.append = b('\x3cspan class\x3d"' + this._appendClass + '"\x3e' + d + "\x3c/span\x3e"), a[f ? "before" : "after"](c.append));
			a.unbind("focus", this._showDatepicker);
			c.trigger && c.trigger.remove();
			d = this._get(c, "showOn");
			("focus" == d || "both" == d) && a.focus(this._showDatepicker);
			if ("button" == d || "both" == d) {
				var d = this._get(c, "buttonText"),
					g = this._get(c,
						"buttonImage");
				c.trigger = b(this._get(c, "buttonImageOnly") ? b("\x3cimg/\x3e").addClass(this._triggerClass).attr({
					src: g,
					alt: d,
					title: d
				}) : b('\x3cbutton type\x3d"button"\x3e\x3c/button\x3e').addClass(this._triggerClass).html("" == g ? d : b("\x3cimg/\x3e").attr({
					src: g,
					alt: d,
					title: d
				})));
				a[f ? "before" : "after"](c.trigger);
				c.trigger.click(function() {
					b.datepicker._datepickerShowing && b.datepicker._lastInput == a[0] ? b.datepicker._hideDatepicker() : (b.datepicker._datepickerShowing && b.datepicker._lastInput != a[0] && b.datepicker._hideDatepicker(),
						b.datepicker._showDatepicker(a[0]));
					return !1
				})
			}
		},
		_autoSize: function(a) {
			if (this._get(a, "autoSize") && !a.inline) {
				var b = new Date(2009, 11, 20),
					c = this._get(a, "dateFormat");
				if (c.match(/[DM]/)) {
					var d = function(a) {
						for (var b = 0, e = 0, c = 0; c < a.length; c++) a[c].length > b && (b = a[c].length, e = c);
						return e
					};
					b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort")));
					b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
				}
				a.input.attr("size", this._formatDate(a, b).length)
			}
		},
		_inlineDatepicker: function(a,
			c) {
			var d = b(a);
			d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv).bind("setData.datepicker", function(a, b, e) {
				c.settings[b] = e
			}).bind("getData.datepicker", function(a, b) {
				return this._get(c, b)
			}), b.data(a, "datepicker", c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(a), c.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(a, d, f, g, p) {
			a = this._dialogInst;
			a || (this.uuid += 1, this._dialogInput =
				b('\x3cinput type\x3d"text" id\x3d"dp' + this.uuid + '" style\x3d"position: absolute; top: -100px; width: 0px; z-index: -10;"/\x3e'), this._dialogInput.keydown(this._doKeyDown), b("body").append(this._dialogInput), a = this._dialogInst = this._newInst(this._dialogInput, !1), a.settings = {}, b.data(this._dialogInput[0], "datepicker", a));
			c(a.settings, g || {});
			d = d && d.constructor == Date ? this._formatDate(a, d) : d;
			this._dialogInput.val(d);
			this._pos = p ? p.length ? p : [p.pageX, p.pageY] : null;
			this._pos || (this._pos = [document.documentElement.clientWidth /
				2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)
			]);
			this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
			a.settings.onSelect = f;
			this._inDialog = !0;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			b.blockUI && b.blockUI(this.dpDiv);
			b.data(this._dialogInput[0], "datepicker", a);
			return this
		},
		_destroyDatepicker: function(a) {
			var c =
				b(a),
				d = b.data(a, "datepicker");
			if (c.hasClass(this.markerClassName)) {
				var f = a.nodeName.toLowerCase();
				b.removeData(a, "datepicker");
				"input" == f ? (d.append.remove(), d.trigger.remove(), c.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == f || "span" == f) && c.removeClass(this.markerClassName).empty()
			}
		},
		_enableDatepicker: function(a) {
			var c = b(a),
				d = b.data(a, "datepicker");
			if (c.hasClass(this.markerClassName)) {
				var f =
					a.nodeName.toLowerCase();
				if ("input" == f) a.disabled = !1, d.trigger.filter("button").each(function() {
					this.disabled = !1
				}).end().filter("img").css({
					opacity: "1.0",
					cursor: ""
				});
				else if ("div" == f || "span" == f) c = c.children("." + this._inlineClass), c.children().removeClass("ui-state-disabled"), c.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");
				this._disabledInputs = b.map(this._disabledInputs, function(b) {
					return b == a ? null : b
				})
			}
		},
		_disableDatepicker: function(a) {
			var c = b(a),
				d = b.data(a, "datepicker");
			if (c.hasClass(this.markerClassName)) {
				var f = a.nodeName.toLowerCase();
				if ("input" == f) a.disabled = !0, d.trigger.filter("button").each(function() {
					this.disabled = !0
				}).end().filter("img").css({
					opacity: "0.5",
					cursor: "default"
				});
				else if ("div" == f || "span" == f) c = c.children("." + this._inlineClass), c.children().addClass("ui-state-disabled"), c.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled");
				this._disabledInputs = b.map(this._disabledInputs, function(b) {
					return b == a ? null : b
				});
				this._disabledInputs[this._disabledInputs.length] =
					a
			}
		},
		_isDisabledDatepicker: function(a) {
			if (!a) return !1;
			for (var b = 0; b < this._disabledInputs.length; b++)
				if (this._disabledInputs[b] == a) return !0;
			return !1
		},
		_getInst: function(a) {
			try {
				return b.data(a, "datepicker")
			} catch (c) {
				throw "Missing instance data for this datepicker";
			}
		},
		_optionDatepicker: function(a, d, f) {
			var g = this._getInst(a);
			if (2 == arguments.length && "string" == typeof d) return "defaults" == d ? b.extend({}, b.datepicker._defaults) : g ? "all" == d ? b.extend({}, g.settings) : this._get(g, d) : null;
			var p = d || {};
			"string" == typeof d &&
				(p = {}, p[d] = f);
			if (g) {
				this._curInst == g && this._hideDatepicker();
				var n = this._getDateDatepicker(a, !0),
					u = this._getMinMaxDate(g, "min"),
					q = this._getMinMaxDate(g, "max");
				c(g.settings, p);
				null !== u && (p.dateFormat !== m && p.minDate === m) && (g.settings.minDate = this._formatDate(g, u));
				null !== q && (p.dateFormat !== m && p.maxDate === m) && (g.settings.maxDate = this._formatDate(g, q));
				this._attachments(b(a), g);
				this._autoSize(g);
				this._setDate(g, n);
				this._updateAlternate(g);
				this._updateDatepicker(g)
			}
		},
		_changeDatepicker: function(a, b, c) {
			this._optionDatepicker(a,
				b, c)
		},
		_refreshDatepicker: function(a) {
			(a = this._getInst(a)) && this._updateDatepicker(a)
		},
		_setDateDatepicker: function(a, b) {
			var c = this._getInst(a);
			c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
		},
		_getDateDatepicker: function(a, b) {
			var c = this._getInst(a);
			c && !c.inline && this._setDateFromField(c, b);
			return c ? this._getDate(c) : null
		},
		_doKeyDown: function(a) {
			var c = b.datepicker._getInst(a.target),
				d = !0,
				f = c.dpDiv.is(".ui-datepicker-rtl");
			c._keyEvent = !0;
			if (b.datepicker._datepickerShowing) switch (a.keyCode) {
				case 9:
					b.datepicker._hideDatepicker();
					d = !1;
					break;
				case 13:
					return d = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", c.dpDiv), d[0] && b.datepicker._selectDay(a.target, c.selectedMonth, c.selectedYear, d[0]), (a = b.datepicker._get(c, "onSelect")) ? (d = b.datepicker._formatDate(c), a.apply(c.input ? c.input[0] : null, [d, c])) : b.datepicker._hideDatepicker(), !1;
				case 27:
					b.datepicker._hideDatepicker();
					break;
				case 33:
					b.datepicker._adjustDate(a.target, a.ctrlKey ? -b.datepicker._get(c, "stepBigMonths") : -b.datepicker._get(c, "stepMonths"), "M");
					break;
				case 34:
					b.datepicker._adjustDate(a.target, a.ctrlKey ? +b.datepicker._get(c, "stepBigMonths") : +b.datepicker._get(c, "stepMonths"), "M");
					break;
				case 35:
					(a.ctrlKey || a.metaKey) && b.datepicker._clearDate(a.target);
					d = a.ctrlKey || a.metaKey;
					break;
				case 36:
					(a.ctrlKey || a.metaKey) && b.datepicker._gotoToday(a.target);
					d = a.ctrlKey || a.metaKey;
					break;
				case 37:
					if (a.ctrlKey || a.metaKey) b.datepicker._adjustDate(a.target, f ? 1 : -1, "D");
					d = a.ctrlKey || a.metaKey;
					a.originalEvent.altKey && b.datepicker._adjustDate(a.target, a.ctrlKey ? -b.datepicker._get(c, "stepBigMonths") : -b.datepicker._get(c, "stepMonths"), "M");
					break;
				case 38:
					(a.ctrlKey || a.metaKey) && b.datepicker._adjustDate(a.target, -7, "D");
					d = a.ctrlKey || a.metaKey;
					break;
				case 39:
					if (a.ctrlKey || a.metaKey) b.datepicker._adjustDate(a.target, f ? -1 : 1, "D");
					d = a.ctrlKey || a.metaKey;
					a.originalEvent.altKey && b.datepicker._adjustDate(a.target, a.ctrlKey ? +b.datepicker._get(c, "stepBigMonths") : +b.datepicker._get(c, "stepMonths"), "M");
					break;
				case 40:
					(a.ctrlKey || a.metaKey) && b.datepicker._adjustDate(a.target,
						7, "D");
					d = a.ctrlKey || a.metaKey;
					break;
				default:
					d = !1
			} else 36 == a.keyCode && a.ctrlKey ? b.datepicker._showDatepicker(this) : d = !1;
			d && (a.preventDefault(), a.stopPropagation())
		},
		_doKeyPress: function(a) {
			var c = b.datepicker._getInst(a.target);
			if (b.datepicker._get(c, "constrainInput")) {
				var c = b.datepicker._possibleChars(b.datepicker._get(c, "dateFormat")),
					d = String.fromCharCode(a.charCode == m ? a.keyCode : a.charCode);
				return a.ctrlKey || a.metaKey || " " > d || !c || -1 < c.indexOf(d)
			}
		},
		_doKeyUp: function(a) {
			a = b.datepicker._getInst(a.target);
			if (a.input.val() != a.lastVal) try {
				if (b.datepicker.parseDate(b.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, b.datepicker._getFormatConfig(a))) b.datepicker._setDateFromField(a), b.datepicker._updateAlternate(a), b.datepicker._updateDatepicker(a)
			} catch (c) {
				b.datepicker.log(c)
			}
			return !0
		},
		_showDatepicker: function(a) {
			a = a.target || a;
			"input" != a.nodeName.toLowerCase() && (a = b("input", a.parentNode)[0]);
			if (!(b.datepicker._isDisabledDatepicker(a) || b.datepicker._lastInput == a)) {
				var d = b.datepicker._getInst(a);
				b.datepicker._curInst && b.datepicker._curInst != d && (b.datepicker._curInst.dpDiv.stop(!0, !0), d && b.datepicker._datepickerShowing && b.datepicker._hideDatepicker(b.datepicker._curInst.input[0]));
				var f = b.datepicker._get(d, "beforeShow"),
					f = f ? f.apply(a, [a, d]) : {};
				if (!1 !== f) {
					c(d.settings, f);
					d.lastVal = null;
					b.datepicker._lastInput = a;
					b.datepicker._setDateFromField(d);
					b.datepicker._inDialog && (a.value = "");
					b.datepicker._pos || (b.datepicker._pos = b.datepicker._findPos(a), b.datepicker._pos[1] += a.offsetHeight);
					var g = !1;
					b(a).parents().each(function() {
						g |= "fixed" == b(this).css("position");
						return !g
					});
					g && b.browser.opera && (b.datepicker._pos[0] -= document.documentElement.scrollLeft, b.datepicker._pos[1] -= document.documentElement.scrollTop);
					f = {
						left: b.datepicker._pos[0],
						top: b.datepicker._pos[1]
					};
					b.datepicker._pos = null;
					d.dpDiv.empty();
					d.dpDiv.css({
						position: "absolute",
						display: "block",
						top: "-1000px"
					});
					b.datepicker._updateDatepicker(d);
					f = b.datepicker._checkOffset(d, f, g);
					d.dpDiv.css({
						position: b.datepicker._inDialog && b.blockUI ? "static" : g ? "fixed" : "absolute",
						display: "none",
						left: f.left + "px",
						top: f.top + "px"
					});
					if (!d.inline) {
						var f = b.datepicker._get(d, "showAnim"),
							p = b.datepicker._get(d, "duration"),
							n = function() {
								var a = d.dpDiv.find("iframe.ui-datepicker-cover");
								if (a.length) {
									var e = b.datepicker._getBorders(d.dpDiv);
									a.css({
										left: -e[0],
										top: -e[1],
										width: d.dpDiv.outerWidth(),
										height: d.dpDiv.outerHeight()
									})
								}
							};
						d.dpDiv.zIndex(b(a).zIndex() + 1);
						b.datepicker._datepickerShowing = !0;
						if (b.effects && b.effects[f]) d.dpDiv.show(f, b.datepicker._get(d, "showOptions"),
							p, n);
						else d.dpDiv[f || "show"](f ? p : null, n);
						(!f || !p) && n();
						d.input.is(":visible") && !d.input.is(":disabled") && d.input.focus();
						b.datepicker._curInst = d
					}
				}
			}
		},
		_updateDatepicker: function(a) {
			this.maxRows = 4;
			var c = b.datepicker._getBorders(a.dpDiv);
			f = a;
			a.dpDiv.empty().append(this._generateHTML(a));
			var d = a.dpDiv.find("iframe.ui-datepicker-cover");
			d.length && d.css({
				left: -c[0],
				top: -c[1],
				width: a.dpDiv.outerWidth(),
				height: a.dpDiv.outerHeight()
			});
			a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
			c = this._getNumberOfMonths(a);
			d = c[1];
			a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			1 < d && a.dpDiv.addClass("ui-datepicker-multi-" + d).css("width", 17 * d + "em");
			a.dpDiv[(1 != c[0] || 1 != c[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
			a == b.datepicker._curInst && (b.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement) && a.input.focus();
			if (a.yearshtml) {
				var g =
					a.yearshtml;
				setTimeout(function() {
					g === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);
					g = a.yearshtml = null
				}, 0)
			}
		},
		_getBorders: function(a) {
			var b = function(a) {
				return {
					thin: 1,
					medium: 2,
					thick: 3
				}[a] || a
			};
			return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
		},
		_checkOffset: function(a, c, d) {
			var f = a.dpDiv.outerWidth(),
				g = a.dpDiv.outerHeight(),
				n = a.input ? a.input.outerWidth() : 0,
				m = a.input ? a.input.outerHeight() : 0,
				q = document.documentElement.clientWidth +
					b(document).scrollLeft(),
				v = document.documentElement.clientHeight + b(document).scrollTop();
			c.left -= this._get(a, "isRTL") ? f - n : 0;
			c.left -= d && c.left == a.input.offset().left ? b(document).scrollLeft() : 0;
			c.top -= d && c.top == a.input.offset().top + m ? b(document).scrollTop() : 0;
			c.left -= Math.min(c.left, c.left + f > q && q > f ? Math.abs(c.left + f - q) : 0);
			c.top -= Math.min(c.top, c.top + g > v && v > g ? Math.abs(g + m) : 0);
			return c
		},
		_findPos: function(a) {
			for (var c = this._getInst(a), c = this._get(c, "isRTL"); a && ("hidden" == a.type || 1 != a.nodeType || b.expr.filters.hidden(a));) a =
				a[c ? "previousSibling" : "nextSibling"];
			a = b(a).offset();
			return [a.left, a.top]
		},
		_hideDatepicker: function(a) {
			var c = this._curInst;
			if (c && !(a && c != b.data(a, "datepicker")) && this._datepickerShowing) {
				a = this._get(c, "showAnim");
				var d = this._get(c, "duration"),
					f = this,
					g = function() {
						b.datepicker._tidyDialog(c);
						f._curInst = null
					};
				if (b.effects && b.effects[a]) c.dpDiv.hide(a, b.datepicker._get(c, "showOptions"), d, g);
				else c.dpDiv["slideDown" == a ? "slideUp" : "fadeIn" == a ? "fadeOut" : "hide"](a ? d : null, g);
				a || g();
				this._datepickerShowing = !1;
				(a = this._get(c, "onClose")) && a.apply(c.input ? c.input[0] : null, [c.input ? c.input.val() : "", c]);
				this._lastInput = null;
				this._inDialog && (this._dialogInput.css({
					position: "absolute",
					left: "0",
					top: "-100px"
				}), b.blockUI && (b.unblockUI(), b("body").append(this.dpDiv)));
				this._inDialog = !1
			}
		},
		_tidyDialog: function(a) {
			a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(a) {
			if (b.datepicker._curInst) {
				a = b(a.target);
				var c = b.datepicker._getInst(a[0]);
				(a[0].id != b.datepicker._mainDivId &&
					0 == a.parents("#" + b.datepicker._mainDivId).length && !a.hasClass(b.datepicker.markerClassName) && !a.closest("." + b.datepicker._triggerClass).length && b.datepicker._datepickerShowing && (!b.datepicker._inDialog || !b.blockUI) || a.hasClass(b.datepicker.markerClassName) && b.datepicker._curInst != c) && b.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(a, c, d) {
			a = b(a);
			var f = this._getInst(a[0]);
			this._isDisabledDatepicker(a[0]) || (this._adjustInstDate(f, c + ("M" == d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
		},
		_gotoToday: function(a) {
			a = b(a);
			var c = this._getInst(a[0]);
			if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear;
			else {
				var d = new Date;
				c.selectedDay = d.getDate();
				c.drawMonth = c.selectedMonth = d.getMonth();
				c.drawYear = c.selectedYear = d.getFullYear()
			}
			this._notifyChange(c);
			this._adjustDate(a)
		},
		_selectMonthYear: function(a, c, d) {
			a = b(a);
			var f = this._getInst(a[0]);
			f["selected" + ("M" == d ? "Month" : "Year")] = f["draw" + ("M" ==
				d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10);
			this._notifyChange(f);
			this._adjustDate(a)
		},
		_selectDay: function(a, c, d, f) {
			var g = b(a);
			!b(f).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(g[0]) && (g = this._getInst(g[0]), g.selectedDay = g.currentDay = b("a", f).html(), g.selectedMonth = g.currentMonth = c, g.selectedYear = g.currentYear = d, this._selectDate(a, this._formatDate(g, g.currentDay, g.currentMonth, g.currentYear)))
		},
		_clearDate: function(a) {
			a = b(a);
			this._getInst(a[0]);
			this._selectDate(a,
				"")
		},
		_selectDate: function(a, c) {
			var d = b(a),
				d = this._getInst(d[0]);
			c = null != c ? c : this._formatDate(d);
			d.input && d.input.val(c);
			this._updateAlternate(d);
			var f = this._get(d, "onSelect");
			f ? f.apply(d.input ? d.input[0] : null, [c, d]) : d.input && d.input.trigger("change");
			d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], "object" != typeof d.input[0] && d.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(a) {
			var c = this._get(a, "altField");
			if (c) {
				var d = this._get(a, "altFormat") ||
					this._get(a, "dateFormat"),
					f = this._getDate(a),
					g = this.formatDate(d, f, this._getFormatConfig(a));
				b(c).each(function() {
					b(this).val(g)
				})
			}
		},
		noWeekends: function(a) {
			a = a.getDay();
			return [0 < a && 6 > a, ""]
		},
		iso8601Week: function(a) {
			a = new Date(a.getTime());
			a.setDate(a.getDate() + 4 - (a.getDay() || 7));
			var b = a.getTime();
			a.setMonth(0);
			a.setDate(1);
			return Math.floor(Math.round((b - a) / 864E5) / 7) + 1
		},
		parseDate: function(a, c, d) {
			if (null == a || null == c) throw "Invalid arguments";
			c = "object" == typeof c ? c.toString() : c + "";
			if ("" == c) return null;
			for (var f = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff, f = "string" != typeof f ? f : (new Date).getFullYear() % 100 + parseInt(f, 10), g = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort, n = (d ? d.dayNames : null) || this._defaults.dayNames, m = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort, q = (d ? d.monthNames : null) || this._defaults.monthNames, v = d = -1, A = -1, C = -1, x = !1, z = function(b) {
					(b = G + 1 < a.length && a.charAt(G + 1) == b) && G++;
					return b
				}, D = function(a) {
					var b = z(a);
					a = RegExp("^\\d{1," + ("@" == a ? 14 : "!" == a ? 20 :
						"y" == a && b ? 4 : "o" == a ? 3 : 2) + "}");
					a = c.substring(F).match(a);
					if (!a) throw "Missing number at position " + F;
					F += a[0].length;
					return parseInt(a[0], 10)
				}, y = function(a, e, d) {
					a = b.map(z(a) ? d : e, function(a, b) {
						return [[b, a]]
					}).sort(function(a, b) {
						return -(a[1].length - b[1].length)
					});
					var f = -1;
					b.each(a, function(a, b) {
						var e = b[1];
						if (c.substr(F, e.length).toLowerCase() == e.toLowerCase()) return f = b[0], F += e.length, !1
					});
					if (-1 != f) return f + 1;
					throw "Unknown name at position " + F;
				}, B = function() {
					if (c.charAt(F) != a.charAt(G)) throw "Unexpected literal at position " +
						F;
					F++
				}, F = 0, G = 0; G < a.length; G++)
				if (x) "'" == a.charAt(G) && !z("'") ? x = !1 : B();
				else switch (a.charAt(G)) {
					case "d":
						A = D("d");
						break;
					case "D":
						y("D", g, n);
						break;
					case "o":
						C = D("o");
						break;
					case "m":
						v = D("m");
						break;
					case "M":
						v = y("M", m, q);
						break;
					case "y":
						d = D("y");
						break;
					case "@":
						var L = new Date(D("@"));
						d = L.getFullYear();
						v = L.getMonth() + 1;
						A = L.getDate();
						break;
					case "!":
						L = new Date((D("!") - this._ticksTo1970) / 1E4);
						d = L.getFullYear();
						v = L.getMonth() + 1;
						A = L.getDate();
						break;
					case "'":
						z("'") ? B() : x = !0;
						break;
					default:
						B()
				}
				if (F < c.length) throw "Extra/unparsed characters found in date: " +
					c.substring(F); - 1 == d ? d = (new Date).getFullYear() : 100 > d && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= f ? 0 : -100));
			if (-1 < C) {
				v = 1;
				A = C;
				do {
					f = this._getDaysInMonth(d, v - 1);
					if (A <= f) break;
					v++;
					A -= f
				} while (1)
			}
			L = this._daylightSavingAdjust(new Date(d, v - 1, A));
			if (L.getFullYear() != d || L.getMonth() + 1 != v || L.getDate() != A) throw "Invalid date";
			return L
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 864E9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
		formatDate: function(a, b, c) {
			if (!b) return "";
			var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
				f = (c ? c.dayNames : null) || this._defaults.dayNames,
				g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort;
			c = (c ? c.monthNames : null) || this._defaults.monthNames;
			var m = function(b) {
				(b = x + 1 < a.length && a.charAt(x + 1) == b) && x++;
				return b
			}, q = function(a, b, c) {
					b = "" + b;
					if (m(a))
						for (; b.length <
							c;) b = "0" + b;
					return b
				}, v = function(a, b, c, e) {
					return m(a) ? e[b] : c[b]
				}, A = "",
				C = !1;
			if (b)
				for (var x = 0; x < a.length; x++)
					if (C) "'" == a.charAt(x) && !m("'") ? C = !1 : A += a.charAt(x);
					else switch (a.charAt(x)) {
						case "d":
							A += q("d", b.getDate(), 2);
							break;
						case "D":
							A += v("D", b.getDay(), d, f);
							break;
						case "o":
							A += q("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864E5), 3);
							break;
						case "m":
							A += q("m", b.getMonth() + 1, 2);
							break;
						case "M":
							A += v("M", b.getMonth(), g, c);
							break;
						case "y":
							A +=
								m("y") ? b.getFullYear() : (10 > b.getYear() % 100 ? "0" : "") + b.getYear() % 100;
							break;
						case "@":
							A += b.getTime();
							break;
						case "!":
							A += 1E4 * b.getTime() + this._ticksTo1970;
							break;
						case "'":
							m("'") ? A += "'" : C = !0;
							break;
						default:
							A += a.charAt(x)
					}
					return A
		},
		_possibleChars: function(a) {
			for (var b = "", c = !1, d = function(b) {
					(b = f + 1 < a.length && a.charAt(f + 1) == b) && f++;
					return b
				}, f = 0; f < a.length; f++)
				if (c) "'" == a.charAt(f) && !d("'") ? c = !1 : b += a.charAt(f);
				else switch (a.charAt(f)) {
					case "d":
					case "m":
					case "y":
					case "@":
						b += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						d("'") ? b += "'" : c = !0;
						break;
					default:
						b += a.charAt(f)
				}
				return b
		},
		_get: function(a, b) {
			return a.settings[b] !== m ? a.settings[b] : this._defaults[b]
		},
		_setDateFromField: function(a, b) {
			if (a.input.val() != a.lastVal) {
				var c = this._get(a, "dateFormat"),
					d = a.lastVal = a.input ? a.input.val() : null,
					f, g;
				f = g = this._getDefaultDate(a);
				var m = this._getFormatConfig(a);
				try {
					f = this.parseDate(c, d, m) || g
				} catch (q) {
					this.log(q), d = b ? "" : d
				}
				a.selectedDay = f.getDate();
				a.drawMonth = a.selectedMonth = f.getMonth();
				a.drawYear = a.selectedYear = f.getFullYear();
				a.currentDay = d ? f.getDate() : 0;
				a.currentMonth = d ? f.getMonth() : 0;
				a.currentYear = d ? f.getFullYear() : 0;
				this._adjustInstDate(a)
			}
		},
		_getDefaultDate: function(a) {
			return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
		},
		_determineDate: function(a, c, d) {
			var f = function(a) {
				var b = new Date;
				b.setDate(b.getDate() + a);
				return b
			}, g = function(c) {
					try {
						return b.datepicker.parseDate(b.datepicker._get(a, "dateFormat"), c, b.datepicker._getFormatConfig(a))
					} catch (d) {}
					for (var f = (c.toLowerCase().match(/^c/) ?
						b.datepicker._getDate(a) : null) || new Date, g = f.getFullYear(), k = f.getMonth(), f = f.getDate(), l = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, p = l.exec(c); p;) {
						switch (p[2] || "d") {
							case "d":
							case "D":
								f += parseInt(p[1], 10);
								break;
							case "w":
							case "W":
								f += 7 * parseInt(p[1], 10);
								break;
							case "m":
							case "M":
								k += parseInt(p[1], 10);
								f = Math.min(f, b.datepicker._getDaysInMonth(g, k));
								break;
							case "y":
							case "Y":
								g += parseInt(p[1], 10), f = Math.min(f, b.datepicker._getDaysInMonth(g, k))
						}
						p = l.exec(c)
					}
					return new Date(g, k, f)
				};
			if (c = (c = null == c || "" === c ? d : "string" ==
				typeof c ? g(c) : "number" == typeof c ? isNaN(c) ? d : f(c) : new Date(c.getTime())) && "Invalid Date" == c.toString() ? d : c) c.setHours(0), c.setMinutes(0), c.setSeconds(0), c.setMilliseconds(0);
			return this._daylightSavingAdjust(c)
		},
		_daylightSavingAdjust: function(a) {
			if (!a) return null;
			a.setHours(12 < a.getHours() ? a.getHours() + 2 : 0);
			return a
		},
		_setDate: function(a, b, c) {
			var d = !b,
				f = a.selectedMonth,
				g = a.selectedYear;
			b = this._restrictMinMax(a, this._determineDate(a, b, new Date));
			a.selectedDay = a.currentDay = b.getDate();
			a.drawMonth = a.selectedMonth =
				a.currentMonth = b.getMonth();
			a.drawYear = a.selectedYear = a.currentYear = b.getFullYear();
			(f != a.selectedMonth || g != a.selectedYear) && !c && this._notifyChange(a);
			this._adjustInstDate(a);
			a.input && a.input.val(d ? "" : this._formatDate(a))
		},
		_getDate: function(a) {
			return !a.currentYear || a.input && "" == a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay))
		},
		_generateHTML: function(a) {
			var c = new Date,
				c = this._daylightSavingAdjust(new Date(c.getFullYear(), c.getMonth(), c.getDate())),
				d = this._get(a, "isRTL"),
				f = this._get(a, "showButtonPanel"),
				p = this._get(a, "hideIfNoPrevNext"),
				n = this._get(a, "navigationAsDateFormat"),
				m = this._getNumberOfMonths(a),
				q = this._get(a, "showCurrentAtPos"),
				v = this._get(a, "stepMonths"),
				A = 1 != m[0] || 1 != m[1],
				C = this._daylightSavingAdjust(!a.currentDay ? new Date(9999, 9, 9) : new Date(a.currentYear, a.currentMonth, a.currentDay)),
				x = this._getMinMaxDate(a, "min"),
				z = this._getMinMaxDate(a, "max"),
				q = a.drawMonth - q,
				D = a.drawYear;
			0 > q && (q += 12, D--);
			if (z)
				for (var y = this._daylightSavingAdjust(new Date(z.getFullYear(),
					z.getMonth() - m[0] * m[1] + 1, z.getDate())), y = x && y < x ? x : y; this._daylightSavingAdjust(new Date(D, q, 1)) > y;) q--, 0 > q && (q = 11, D--);
			a.drawMonth = q;
			a.drawYear = D;
			var y = this._get(a, "prevText"),
				y = !n ? y : this.formatDate(y, this._daylightSavingAdjust(new Date(D, q - v, 1)), this._getFormatConfig(a)),
				y = this._canAdjustMonth(a, -1, D, q) ? '\x3ca class\x3d"ui-datepicker-prev ui-corner-all" onclick\x3d"DP_jQuery_' + g + ".datepicker._adjustDate('#" + a.id + "', -" + v + ", 'M');\" title\x3d\"" + y + '"\x3e\x3cspan class\x3d"ui-icon ui-icon-circle-triangle-' +
					(d ? "e" : "w") + '"\x3e' + y + "\x3c/span\x3e\x3c/a\x3e" : p ? "" : '\x3ca class\x3d"ui-datepicker-prev ui-corner-all ui-state-disabled" title\x3d"' + y + '"\x3e\x3cspan class\x3d"ui-icon ui-icon-circle-triangle-' + (d ? "e" : "w") + '"\x3e' + y + "\x3c/span\x3e\x3c/a\x3e",
				B = this._get(a, "nextText"),
				B = !n ? B : this.formatDate(B, this._daylightSavingAdjust(new Date(D, q + v, 1)), this._getFormatConfig(a)),
				p = this._canAdjustMonth(a, 1, D, q) ? '\x3ca class\x3d"ui-datepicker-next ui-corner-all" onclick\x3d"DP_jQuery_' + g + ".datepicker._adjustDate('#" +
					a.id + "', +" + v + ", 'M');\" title\x3d\"" + B + '"\x3e\x3cspan class\x3d"ui-icon ui-icon-circle-triangle-' + (d ? "w" : "e") + '"\x3e' + B + "\x3c/span\x3e\x3c/a\x3e" : p ? "" : '\x3ca class\x3d"ui-datepicker-next ui-corner-all ui-state-disabled" title\x3d"' + B + '"\x3e\x3cspan class\x3d"ui-icon ui-icon-circle-triangle-' + (d ? "w" : "e") + '"\x3e' + B + "\x3c/span\x3e\x3c/a\x3e",
				v = this._get(a, "currentText"),
				B = this._get(a, "gotoCurrent") && a.currentDay ? C : c,
				v = !n ? v : this.formatDate(v, B, this._getFormatConfig(a)),
				n = !a.inline ? '\x3cbutton type\x3d"button" class\x3d"ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick\x3d"DP_jQuery_' +
					g + '.datepicker._hideDatepicker();"\x3e' + this._get(a, "closeText") + "\x3c/button\x3e" : "",
				f = f ? '\x3cdiv class\x3d"ui-datepicker-buttonpane ui-widget-content"\x3e' + (d ? n : "") + (this._isInRange(a, B) ? '\x3cbutton type\x3d"button" class\x3d"ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick\x3d"DP_jQuery_' + g + ".datepicker._gotoToday('#" + a.id + "');\"\x3e" + v + "\x3c/button\x3e" : "") + (d ? "" : n) + "\x3c/div\x3e" : "",
				n = parseInt(this._get(a, "firstDay"), 10),
				n = isNaN(n) ? 0 : n,
				v = this._get(a, "showWeek"),
				B = this._get(a, "dayNames");
			this._get(a, "dayNamesShort");
			var F = this._get(a, "dayNamesMin"),
				G = this._get(a, "monthNames"),
				L = this._get(a, "monthNamesShort"),
				J = this._get(a, "beforeShowDay"),
				Z = this._get(a, "showOtherMonths"),
				ta = this._get(a, "selectOtherMonths");
			this._get(a, "calculateWeek");
			for (var la = this._getDefaultDate(a), aa = "", M = 0; M < m[0]; M++) {
				var V = "";
				this.maxRows = 4;
				for (var ba = 0; ba < m[1]; ba++) {
					var pa = this._daylightSavingAdjust(new Date(D, q, a.selectedDay)),
						H = " ui-corner-all",
						w = "";
					if (A) {
						w += '\x3cdiv class\x3d"ui-datepicker-group';
						if (1 < m[1]) switch (ba) {
							case 0:
								w += " ui-datepicker-group-first";
								H = " ui-corner-" + (d ? "right" : "left");
								break;
							case m[1] - 1:
								w += " ui-datepicker-group-last";
								H = " ui-corner-" + (d ? "left" : "right");
								break;
							default:
								w += " ui-datepicker-group-middle", H = ""
						}
						w += '"\x3e'
					}
					for (var w = w + ('\x3cdiv class\x3d"ui-datepicker-header ui-widget-header ui-helper-clearfix' + H + '"\x3e' + (/all|left/.test(H) && 0 == M ? d ? p : y : "") + (/all|right/.test(H) && 0 == M ? d ? y : p : "") + this._generateMonthYearHeader(a, q, D, x, z, 0 < M || 0 < ba, G, L) + '\x3c/div\x3e\x3ctable class\x3d"ui-datepicker-calendar"\x3e\x3cthead\x3e\x3ctr\x3e'),
							N = v ? '\x3cth class\x3d"ui-datepicker-week-col"\x3e' + this._get(a, "weekHeader") + "\x3c/th\x3e" : "", H = 0; 7 > H; H++) var K = (H + n) % 7,
					N = N + ("\x3cth" + (5 <= (H + n + 6) % 7 ? ' class\x3d"ui-datepicker-week-end"' : "") + '\x3e\x3cspan title\x3d"' + B[K] + '"\x3e' + F[K] + "\x3c/span\x3e\x3c/th\x3e");
					w += N + "\x3c/tr\x3e\x3c/thead\x3e\x3ctbody\x3e";
					N = this._getDaysInMonth(D, q);
					D == a.selectedYear && q == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, N));
					H = (this._getFirstDayOfMonth(D, q) - n + 7) % 7;
					N = Math.ceil((H + N) / 7);
					this.maxRows = N = A ? this.maxRows >
						N ? this.maxRows : N : N;
					for (var K = this._daylightSavingAdjust(new Date(D, q, 1 - H)), wa = 0; wa < N; wa++) {
						for (var w = w + "\x3ctr\x3e", qa = !v ? "" : '\x3ctd class\x3d"ui-datepicker-week-col"\x3e' + this._get(a, "calculateWeek")(K) + "\x3c/td\x3e", H = 0; 7 > H; H++) {
							var ea = J ? J.apply(a.input ? a.input[0] : null, [K]) : [!0, ""],
								Q = K.getMonth() != q,
								fa = Q && !ta || !ea[0] || x && K < x || z && K > z,
								qa = qa + ('\x3ctd class\x3d"' + (5 <= (H + n + 6) % 7 ? " ui-datepicker-week-end" : "") + (Q ? " ui-datepicker-other-month" : "") + (K.getTime() == pa.getTime() && q == a.selectedMonth && a._keyEvent ||
									la.getTime() == K.getTime() && la.getTime() == pa.getTime() ? " " + this._dayOverClass : "") + (fa ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Q && !Z ? "" : " " + ea[1] + (K.getTime() == C.getTime() ? " " + this._currentClass : "") + (K.getTime() == c.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!Q || Z) && ea[2] ? ' title\x3d"' + ea[2] + '"' : "") + (fa ? "" : ' onclick\x3d"DP_jQuery_' + g + ".datepicker._selectDay('#" + a.id + "'," + K.getMonth() + "," + K.getFullYear() + ', this);return false;"') + "\x3e" + (Q && !Z ? "\x26#xa0;" : fa ? '\x3cspan class\x3d"ui-state-default"\x3e' +
									K.getDate() + "\x3c/span\x3e" : '\x3ca class\x3d"ui-state-default' + (K.getTime() == c.getTime() ? " ui-state-highlight" : "") + (K.getTime() == C.getTime() ? " ui-state-active" : "") + (Q ? " ui-priority-secondary" : "") + '" href\x3d"#"\x3e' + K.getDate() + "\x3c/a\x3e") + "\x3c/td\x3e");
							K.setDate(K.getDate() + 1);
							K = this._daylightSavingAdjust(K)
						}
						w += qa + "\x3c/tr\x3e"
					}
					q++;
					11 < q && (q = 0, D++);
					w += "\x3c/tbody\x3e\x3c/table\x3e" + (A ? "\x3c/div\x3e" + (0 < m[0] && ba == m[1] - 1 ? '\x3cdiv class\x3d"ui-datepicker-row-break"\x3e\x3c/div\x3e' : "") : "");
					V += w
				}
				aa +=
					V
			}
			aa += f + (b.browser.msie && 7 > parseInt(b.browser.version, 10) && !a.inline ? '\x3ciframe src\x3d"javascript:false;" class\x3d"ui-datepicker-cover" frameborder\x3d"0"\x3e\x3c/iframe\x3e' : "");
			a._keyEvent = !1;
			return aa
		},
		_generateMonthYearHeader: function(a, b, c, d, f, n, m, q) {
			var v = this._get(a, "changeMonth"),
				A = this._get(a, "changeYear"),
				C = this._get(a, "showMonthAfterYear"),
				x = '\x3cdiv class\x3d"ui-datepicker-title"\x3e',
				z = "";
			if (n || !v) z += '\x3cspan class\x3d"ui-datepicker-month"\x3e' + m[b] + "\x3c/span\x3e";
			else {
				m = d && d.getFullYear() ==
					c;
				for (var D = f && f.getFullYear() == c, z = z + ('\x3cselect class\x3d"ui-datepicker-month" onchange\x3d"DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" \x3e"), y = 0; 12 > y; y++)
					if ((!m || y >= d.getMonth()) && (!D || y <= f.getMonth())) z += '\x3coption value\x3d"' + y + '"' + (y == b ? ' selected\x3d"selected"' : "") + "\x3e" + q[y] + "\x3c/option\x3e";
				z += "\x3c/select\x3e"
			}
			C || (x += z + (n || !v || !A ? "\x26#xa0;" : ""));
			if (!a.yearshtml)
				if (a.yearshtml = "", n || !A) x += '\x3cspan class\x3d"ui-datepicker-year"\x3e' + c + "\x3c/span\x3e";
				else {
					q =
						this._get(a, "yearRange").split(":");
					var B = (new Date).getFullYear();
					m = function(a) {
						a = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? B + parseInt(a, 10) : parseInt(a, 10);
						return isNaN(a) ? B : a
					};
					b = m(q[0]);
					q = Math.max(b, m(q[1] || ""));
					b = d ? Math.max(b, d.getFullYear()) : b;
					q = f ? Math.min(q, f.getFullYear()) : q;
					for (a.yearshtml += '\x3cselect class\x3d"ui-datepicker-year" onchange\x3d"DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" \x3e"; b <= q; b++) a.yearshtml += '\x3coption value\x3d"' +
						b + '"' + (b == c ? ' selected\x3d"selected"' : "") + "\x3e" + b + "\x3c/option\x3e";
					a.yearshtml += "\x3c/select\x3e";
					x += a.yearshtml;
					a.yearshtml = null
				}
			x += this._get(a, "yearSuffix");
			C && (x += (n || !v || !A ? "\x26#xa0;" : "") + z);
			return x + "\x3c/div\x3e"
		},
		_adjustInstDate: function(a, b, c) {
			var d = a.drawYear + ("Y" == c ? b : 0),
				f = a.drawMonth + ("M" == c ? b : 0);
			b = Math.min(a.selectedDay, this._getDaysInMonth(d, f)) + ("D" == c ? b : 0);
			d = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, f, b)));
			a.selectedDay = d.getDate();
			a.drawMonth = a.selectedMonth =
				d.getMonth();
			a.drawYear = a.selectedYear = d.getFullYear();
			("M" == c || "Y" == c) && this._notifyChange(a)
		},
		_restrictMinMax: function(a, b) {
			var c = this._getMinMaxDate(a, "min"),
				d = this._getMinMaxDate(a, "max"),
				c = c && b < c ? c : b;
			return d && c > d ? d : c
		},
		_notifyChange: function(a) {
			var b = this._get(a, "onChangeMonthYear");
			b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
		},
		_getNumberOfMonths: function(a) {
			a = this._get(a, "numberOfMonths");
			return null == a ? [1, 1] : "number" == typeof a ? [1, a] : a
		},
		_getMinMaxDate: function(a,
			b) {
			return this._determineDate(a, this._get(a, b + "Date"), null)
		},
		_getDaysInMonth: function(a, b) {
			return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
		},
		_getFirstDayOfMonth: function(a, b) {
			return (new Date(a, b, 1)).getDay()
		},
		_canAdjustMonth: function(a, b, c, d) {
			var f = this._getNumberOfMonths(a);
			c = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : f[0] * f[1]), 1));
			0 > b && c.setDate(this._getDaysInMonth(c.getFullYear(), c.getMonth()));
			return this._isInRange(a, c)
		},
		_isInRange: function(a, b) {
			var c = this._getMinMaxDate(a,
				"min"),
				d = this._getMinMaxDate(a, "max");
			return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
		},
		_getFormatConfig: function(a) {
			var b = this._get(a, "shortYearCutoff"),
				b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10);
			return {
				shortYearCutoff: b,
				dayNamesShort: this._get(a, "dayNamesShort"),
				dayNames: this._get(a, "dayNames"),
				monthNamesShort: this._get(a, "monthNamesShort"),
				monthNames: this._get(a, "monthNames")
			}
		},
		_formatDate: function(a, b, c, d) {
			b || (a.currentDay = a.selectedDay, a.currentMonth =
				a.selectedMonth, a.currentYear = a.selectedYear);
			b = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return this.formatDate(this._get(a, "dateFormat"), b, this._getFormatConfig(a))
		}
	});
	b.fn.datepicker = function(a) {
		if (!this.length) return this;
		b.datepicker.initialized || (b(document).mousedown(b.datepicker._checkExternalClick).find("body").append(b.datepicker.dpDiv), b.datepicker.initialized = !0);
		var c = Array.prototype.slice.call(arguments,
			1);
		return "string" == typeof a && ("isDisabled" == a || "getDate" == a || "widget" == a) || "option" == a && 2 == arguments.length && "string" == typeof arguments[1] ? b.datepicker["_" + a + "Datepicker"].apply(b.datepicker, [this[0]].concat(c)) : this.each(function() {
			"string" == typeof a ? b.datepicker["_" + a + "Datepicker"].apply(b.datepicker, [this].concat(c)) : b.datepicker._attachDatepicker(this, a)
		})
	};
	b.datepicker = new d;
	b.datepicker.initialized = !1;
	b.datepicker.uuid = (new Date).getTime();
	b.datepicker.version = "1.8.18";
	window["DP_jQuery_" + g] =
		b
})(jQuery);
(function(b, m) {
	var d = {
		buttons: !0,
		height: !0,
		maxHeight: !0,
		maxWidth: !0,
		minHeight: !0,
		minWidth: !0,
		width: !0
	}, a = {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
		}, c = b.attrFn || {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0,
			click: !0
		};
	b.widget("ui.dialog", {
		options: {
			autoOpen: !0,
			buttons: {},
			closeOnEscape: !0,
			closeText: "close",
			dialogClass: "",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: !1,
			maxWidth: !1,
			minHeight: 150,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				collision: "fit",
				using: function(a) {
					var c =
						b(this).css(a).offset().top;
					0 > c && b(this).css("top", a.top - c)
				}
			},
			resizable: !0,
			show: null,
			stack: !0,
			title: "",
			width: 300,
			zIndex: 1E3
		},
		_create: function() {
			this.originalTitle = this.element.attr("title");
			"string" !== typeof this.originalTitle && (this.originalTitle = "");
			this.options.title = this.options.title || this.originalTitle;
			var a = this,
				c = a.options,
				d = c.title || "\x26#160;",
				k = b.ui.dialog.getTitleId(a.element),
				l = (a.uiDialog = b("\x3cdiv\x3e\x3c/div\x3e")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " +
					c.dialogClass).css({
					zIndex: c.zIndex
				}).attr("tabIndex", -1).css("outline", 0).keydown(function(d) {
					c.closeOnEscape && (!d.isDefaultPrevented() && d.keyCode && d.keyCode === b.ui.keyCode.ESCAPE) && (a.close(d), d.preventDefault())
				}).attr({
					role: "dialog",
					"aria-labelledby": k
				}).mousedown(function(b) {
					a.moveToTop(!1, b)
				});
			a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(l);
			var m = (a.uiDialogTitlebar = b("\x3cdiv\x3e\x3c/div\x3e")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(l),
				p = b('\x3ca href\x3d"#"\x3e\x3c/a\x3e').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
					p.addClass("ui-state-hover")
				}, function() {
					p.removeClass("ui-state-hover")
				}).focus(function() {
					p.addClass("ui-state-focus")
				}).blur(function() {
					p.removeClass("ui-state-focus")
				}).click(function(b) {
					a.close(b);
					return !1
				}).appendTo(m);
			(a.uiDialogTitlebarCloseText = b("\x3cspan\x3e\x3c/span\x3e")).addClass("ui-icon ui-icon-closethick").text(c.closeText).appendTo(p);
			b("\x3cspan\x3e\x3c/span\x3e").addClass("ui-dialog-title").attr("id",
				k).html(d).prependTo(m);
			b.isFunction(c.beforeclose) && !b.isFunction(c.beforeClose) && (c.beforeClose = c.beforeclose);
			m.find("*").add(m).disableSelection();
			c.draggable && b.fn.draggable && a._makeDraggable();
			c.resizable && b.fn.resizable && a._makeResizable();
			a._createButtons(c.buttons);
			a._isOpen = !1;
			b.fn.bgiframe && l.bgiframe()
		},
		_init: function() {
			this.options.autoOpen && this.open()
		},
		destroy: function() {
			this.overlay && this.overlay.destroy();
			this.uiDialog.hide();
			this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
			this.uiDialog.remove();
			this.originalTitle && this.element.attr("title", this.originalTitle);
			return this
		},
		widget: function() {
			return this.uiDialog
		},
		close: function(a) {
			var c = this,
				d, k;
			if (!1 !== c._trigger("beforeClose", a)) return c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function() {
				c._trigger("close", a)
			}) : (c.uiDialog.hide(), c._trigger("close", a)), b.ui.dialog.overlay.resize(), c.options.modal && (d = 0, b(".ui-dialog").each(function() {
				this !==
					c.uiDialog[0] && (k = b(this).css("z-index"), isNaN(k) || (d = Math.max(d, k)))
			}), b.ui.dialog.maxZ = d), c
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function(a, c) {
			var d = this.options;
			if (d.modal && !a || !d.stack && !d.modal) return this._trigger("focus", c);
			d.zIndex > b.ui.dialog.maxZ && (b.ui.dialog.maxZ = d.zIndex);
			this.overlay && (b.ui.dialog.maxZ += 1, this.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ));
			d = {
				scrollTop: this.element.scrollTop(),
				scrollLeft: this.element.scrollLeft()
			};
			b.ui.dialog.maxZ +=
				1;
			this.uiDialog.css("z-index", b.ui.dialog.maxZ);
			this.element.attr(d);
			this._trigger("focus", c);
			return this
		},
		open: function() {
			if (!this._isOpen) {
				var a = this.options,
					c = this.uiDialog;
				this.overlay = a.modal ? new b.ui.dialog.overlay(this) : null;
				this._size();
				this._position(a.position);
				c.show(a.show);
				this.moveToTop(!0);
				a.modal && c.bind("keydown.ui-dialog", function(a) {
					if (a.keyCode === b.ui.keyCode.TAB) {
						var c = b(":tabbable", this),
							d = c.filter(":first"),
							c = c.filter(":last");
						if (a.target === c[0] && !a.shiftKey) return d.focus(1), !1;
						if (a.target === d[0] && a.shiftKey) return c.focus(1), !1
					}
				});
				b(this.element.find(":tabbable").get().concat(c.find(".ui-dialog-buttonpane :tabbable").get().concat(c.get()))).eq(0).focus();
				this._isOpen = !0;
				this._trigger("open");
				return this
			}
		},
		_createButtons: function(a) {
			var d = this,
				e = !1,
				k = b("\x3cdiv\x3e\x3c/div\x3e").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
				l = b("\x3cdiv\x3e\x3c/div\x3e").addClass("ui-dialog-buttonset").appendTo(k);
			d.uiDialog.find(".ui-dialog-buttonpane").remove();
			"object" === typeof a && null !== a && b.each(a, function() {
				return !(e = !0)
			});
			e && (b.each(a, function(a, e) {
				e = b.isFunction(e) ? {
					click: e,
					text: a
				} : e;
				var g = b('\x3cbutton type\x3d"button"\x3e\x3c/button\x3e').click(function() {
					e.click.apply(d.element[0], arguments)
				}).appendTo(l);
				b.each(e, function(a, b) {
					if ("click" !== a)
						if (a in c) g[a](b);
						else g.attr(a, b)
				});
				b.fn.button && g.button()
			}), k.appendTo(d.uiDialog))
		},
		_makeDraggable: function() {
			function a(b) {
				return {
					position: b.position,
					offset: b.offset
				}
			}
			var c = this,
				d = c.options,
				k = b(document),
				l;
			c.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(k, m) {
					l = "auto" === d.height ? "auto" : b(this).height();
					b(this).height(b(this).height()).addClass("ui-dialog-dragging");
					c._trigger("dragStart", k, a(m))
				},
				drag: function(b, d) {
					c._trigger("drag", b, a(d))
				},
				stop: function(m, p) {
					d.position = [p.position.left - k.scrollLeft(), p.position.top - k.scrollTop()];
					b(this).removeClass("ui-dialog-dragging").height(l);
					c._trigger("dragStop",
						m, a(p));
					b.ui.dialog.overlay.resize()
				}
			})
		},
		_makeResizable: function(a) {
			function c(a) {
				return {
					originalPosition: a.originalPosition,
					originalSize: a.originalSize,
					position: a.position,
					size: a.size
				}
			}
			a = a === m ? this.options.resizable : a;
			var d = this,
				k = d.options,
				l = d.uiDialog.css("position");
			a = "string" === typeof a ? a : "n,e,s,w,se,sw,ne,nw";
			d.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: d.element,
				maxWidth: k.maxWidth,
				maxHeight: k.maxHeight,
				minWidth: k.minWidth,
				minHeight: d._minHeight(),
				handles: a,
				start: function(a, g) {
					b(this).addClass("ui-dialog-resizing");
					d._trigger("resizeStart", a, c(g))
				},
				resize: function(a, b) {
					d._trigger("resize", a, c(b))
				},
				stop: function(a, g) {
					b(this).removeClass("ui-dialog-resizing");
					k.height = b(this).height();
					k.width = b(this).width();
					d._trigger("resizeStop", a, c(g));
					b.ui.dialog.overlay.resize()
				}
			}).css("position", l).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
		},
		_minHeight: function() {
			var a = this.options;
			return "auto" === a.height ? a.minHeight : Math.min(a.minHeight,
				a.height)
		},
		_position: function(a) {
			var c = [],
				d = [0, 0],
				k;
			if (a) {
				if ("string" === typeof a || "object" === typeof a && "0" in a) c = a.split ? a.split(" ") : [a[0], a[1]], 1 === c.length && (c[1] = c[0]), b.each(["left", "top"], function(a, b) {
					+c[a] === c[a] && (d[a] = c[a], c[a] = b)
				}), a = {
					my: c.join(" "),
					at: c.join(" "),
					offset: d.join(" ")
				};
				a = b.extend({}, b.ui.dialog.prototype.options.position, a)
			} else a = b.ui.dialog.prototype.options.position;
			(k = this.uiDialog.is(":visible")) || this.uiDialog.show();
			this.uiDialog.css({
				top: 0,
				left: 0
			}).position(b.extend({
					of: window
				},
				a));
			k || this.uiDialog.hide()
		},
		_setOptions: function(c) {
			var f = this,
				e = {}, k = !1;
			b.each(c, function(b, c) {
				f._setOption(b, c);
				b in d && (k = !0);
				b in a && (e[b] = c)
			});
			k && this._size();
			this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", e)
		},
		_setOption: function(a, c) {
			var d = this.uiDialog;
			switch (a) {
				case "beforeclose":
					a = "beforeClose";
					break;
				case "buttons":
					this._createButtons(c);
					break;
				case "closeText":
					this.uiDialogTitlebarCloseText.text("" + c);
					break;
				case "dialogClass":
					d.removeClass(this.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " +
						c);
					break;
				case "disabled":
					c ? d.addClass("ui-dialog-disabled") : d.removeClass("ui-dialog-disabled");
					break;
				case "draggable":
					var k = d.is(":data(draggable)");
					k && !c && d.draggable("destroy");
					!k && c && this._makeDraggable();
					break;
				case "position":
					this._position(c);
					break;
				case "resizable":
					(k = d.is(":data(resizable)")) && !c && d.resizable("destroy");
					k && "string" === typeof c && d.resizable("option", "handles", c);
					!k && !1 !== c && this._makeResizable(c);
					break;
				case "title":
					b(".ui-dialog-title", this.uiDialogTitlebar).html("" + (c || "\x26#160;"))
			}
			b.Widget.prototype._setOption.apply(this,
				arguments)
		},
		_size: function() {
			var a = this.options,
				c, d, k = this.uiDialog.is(":visible");
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				height: 0
			});
			a.minWidth > a.width && (a.width = a.minWidth);
			c = this.uiDialog.css({
				height: "auto",
				width: a.width
			}).height();
			d = Math.max(0, a.minHeight - c);
			"auto" === a.height ? b.support.minHeight ? this.element.css({
				minHeight: d,
				height: "auto"
			}) : (this.uiDialog.show(), a = this.element.css("height", "auto").height(), k || this.uiDialog.hide(), this.element.height(Math.max(a, d))) : this.element.height(Math.max(a.height -
				c, 0));
			this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		}
	});
	b.extend(b.ui.dialog, {
		version: "1.8.18",
		uuid: 0,
		maxZ: 0,
		getTitleId: function(a) {
			a = a.attr("id");
			a || (a = this.uuid += 1);
			return "ui-dialog-title-" + a
		},
		overlay: function(a) {
			this.$el = b.ui.dialog.overlay.create(a)
		}
	});
	b.extend(b.ui.dialog.overlay, {
		instances: [],
		oldInstances: [],
		maxZ: 0,
		events: b.map("focus mousedown mouseup keydown keypress click".split(" "), function(a) {
			return a + ".dialog-overlay"
		}).join(" "),
		create: function(a) {
			0 === this.instances.length && (setTimeout(function() {
				b.ui.dialog.overlay.instances.length && b(document).bind(b.ui.dialog.overlay.events, function(a) {
					if (b(a.target).zIndex() < b.ui.dialog.overlay.maxZ) return !1
				})
			}, 1), b(document).bind("keydown.dialog-overlay", function(c) {
				a.options.closeOnEscape && (!c.isDefaultPrevented() && c.keyCode && c.keyCode === b.ui.keyCode.ESCAPE) && (a.close(c), c.preventDefault())
			}), b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize));
			var c = (this.oldInstances.pop() ||
				b("\x3cdiv\x3e\x3c/div\x3e").addClass("ui-widget-overlay")).appendTo(document.body).css({
				width: this.width(),
				height: this.height()
			});
			b.fn.bgiframe && c.bgiframe();
			this.instances.push(c);
			return c
		},
		destroy: function(a) {
			var c = b.inArray(a, this.instances); - 1 != c && this.oldInstances.push(this.instances.splice(c, 1)[0]);
			0 === this.instances.length && b([document, window]).unbind(".dialog-overlay");
			a.remove();
			var d = 0;
			b.each(this.instances, function() {
				d = Math.max(d, this.css("z-index"))
			});
			this.maxZ = d
		},
		height: function() {
			var a,
				c;
			return b.browser.msie && 7 > b.browser.version ? (a = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), a < c ? b(window).height() + "px" : a + "px") : b(document).height() + "px"
		},
		width: function() {
			var a, c;
			return b.browser.msie ? (a = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), a < c ? b(window).width() + "px" : a + "px") : b(document).width() +
				"px"
		},
		resize: function() {
			var a = b([]);
			b.each(b.ui.dialog.overlay.instances, function() {
				a = a.add(this)
			});
			a.css({
				width: 0,
				height: 0
			}).css({
				width: b.ui.dialog.overlay.width(),
				height: b.ui.dialog.overlay.height()
			})
		}
	});
	b.extend(b.ui.dialog.overlay.prototype, {
		destroy: function() {
			b.ui.dialog.overlay.destroy(this.$el)
		}
	})
})(jQuery);
(function(b, m) {
	b.ui = b.ui || {};
	var d = /left|center|right/,
		a = /top|center|bottom/,
		c = {}, g = b.fn.position,
		f = b.fn.offset;
	b.fn.position = function(e) {
		if (!e || !e.of) return g.apply(this, arguments);
		e = b.extend({}, e);
		var f = b(e.of),
			l = f[0],
			m = (e.collision || "flip").split(" "),
			p = e.offset ? e.offset.split(" ") : [0, 0],
			n, u, q;
		9 === l.nodeType ? (n = f.width(), u = f.height(), q = {
			top: 0,
			left: 0
		}) : l.setTimeout ? (n = f.width(), u = f.height(), q = {
			top: f.scrollTop(),
			left: f.scrollLeft()
		}) : l.preventDefault ? (e.at = "left top", n = u = 0, q = {
			top: e.of.pageY,
			left: e.of.pageX
		}) :
			(n = f.outerWidth(), u = f.outerHeight(), q = f.offset());
		b.each(["my", "at"], function() {
			var b = (e[this] || "").split(" ");
			1 === b.length && (b = d.test(b[0]) ? b.concat(["center"]) : a.test(b[0]) ? ["center"].concat(b) : ["center", "center"]);
			b[0] = d.test(b[0]) ? b[0] : "center";
			b[1] = a.test(b[1]) ? b[1] : "center";
			e[this] = b
		});
		1 === m.length && (m[1] = m[0]);
		p[0] = parseInt(p[0], 10) || 0;
		1 === p.length && (p[1] = p[0]);
		p[1] = parseInt(p[1], 10) || 0;
		"right" === e.at[0] ? q.left += n : "center" === e.at[0] && (q.left += n / 2);
		"bottom" === e.at[1] ? q.top += u : "center" === e.at[1] &&
			(q.top += u / 2);
		q.left += p[0];
		q.top += p[1];
		return this.each(function() {
			var a = b(this),
				d = a.outerWidth(),
				f = a.outerHeight(),
				k = parseInt(b.curCSS(this, "marginLeft", !0)) || 0,
				g = parseInt(b.curCSS(this, "marginTop", !0)) || 0,
				l = d + k + (parseInt(b.curCSS(this, "marginRight", !0)) || 0),
				y = f + g + (parseInt(b.curCSS(this, "marginBottom", !0)) || 0),
				B = b.extend({}, q),
				F;
			"right" === e.my[0] ? B.left -= d : "center" === e.my[0] && (B.left -= d / 2);
			"bottom" === e.my[1] ? B.top -= f : "center" === e.my[1] && (B.top -= f / 2);
			c.fractions || (B.left = Math.round(B.left), B.top =
				Math.round(B.top));
			F = {
				left: B.left - k,
				top: B.top - g
			};
			b.each(["left", "top"], function(a, c) {
				if (b.ui.position[m[a]]) b.ui.position[m[a]][c](B, {
					targetWidth: n,
					targetHeight: u,
					elemWidth: d,
					elemHeight: f,
					collisionPosition: F,
					collisionWidth: l,
					collisionHeight: y,
					offset: p,
					my: e.my,
					at: e.at
				})
			});
			b.fn.bgiframe && a.bgiframe();
			a.offset(b.extend(B, {
				using: e.using
			}))
		})
	};
	b.ui.position = {
		fit: {
			left: function(a, c) {
				var d = b(window),
					d = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
				a.left = 0 < d ? a.left - d : Math.max(a.left -
					c.collisionPosition.left, a.left)
			},
			top: function(a, c) {
				var d = b(window),
					d = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
				a.top = 0 < d ? a.top - d : Math.max(a.top - c.collisionPosition.top, a.top)
			}
		},
		flip: {
			left: function(a, c) {
				if ("center" !== c.at[0]) {
					var d = b(window),
						d = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
						f = "left" === c.my[0] ? -c.elemWidth : "right" === c.my[0] ? c.elemWidth : 0,
						g = "left" === c.at[0] ? c.targetWidth : -c.targetWidth,
						m = -2 * c.offset[0];
					a.left += 0 > c.collisionPosition.left ? f +
						g + m : 0 < d ? f + g + m : 0
				}
			},
			top: function(a, c) {
				if ("center" !== c.at[1]) {
					var d = b(window),
						d = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
						f = "top" === c.my[1] ? -c.elemHeight : "bottom" === c.my[1] ? c.elemHeight : 0,
						g = "top" === c.at[1] ? c.targetHeight : -c.targetHeight,
						m = -2 * c.offset[1];
					a.top += 0 > c.collisionPosition.top ? f + g + m : 0 < d ? f + g + m : 0
				}
			}
		}
	};
	b.offset.setOffset || (b.offset.setOffset = function(a, c) {
		/static/.test(b.curCSS(a, "position")) && (a.style.position = "relative");
		var d = b(a),
			f = d.offset(),
			g = parseInt(b.curCSS(a, "top", !0), 10) || 0,
			m = parseInt(b.curCSS(a, "left", !0), 10) || 0,
			f = {
				top: c.top - f.top + g,
				left: c.left - f.left + m
			};
		"using" in c ? c.using.call(a, f) : d.css(f)
	}, b.fn.offset = function(a) {
		var c = this[0];
		return !c || !c.ownerDocument ? null : a ? this.each(function() {
			b.offset.setOffset(this, a)
		}) : f.call(this)
	});
	(function() {
		var a = document.getElementsByTagName("body")[0],
			d = document.createElement("div"),
			f, g;
		f = document.createElement(a ? "div" : "body");
		g = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0,
			background: "none"
		};
		a && b.extend(g, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
		for (var m in g) f.style[m] = g[m];
		f.appendChild(d);
		g = a || document.documentElement;
		g.insertBefore(f, g.firstChild);
		d.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;";
		d = b(d).offset(function(a, b) {
			return b
		}).offset();
		f.innerHTML = "";
		g.removeChild(f);
		a = d.top + d.left + (a ? 2E3 : 0);
		c.fractions = 21 < a && 22 > a
	})()
})(jQuery);
(function(b, m) {
	b.widget("ui.progressbar", {
		options: {
			value: 0,
			max: 100
		},
		min: 0,
		_create: function() {
			this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
				role: "progressbar",
				"aria-valuemin": this.min,
				"aria-valuemax": this.options.max,
				"aria-valuenow": this._value()
			});
			this.valueDiv = b("\x3cdiv class\x3d'ui-progressbar-value ui-widget-header ui-corner-left'\x3e\x3c/div\x3e").appendTo(this.element);
			this.oldValue = this._value();
			this._refreshValue()
		},
		destroy: function() {
			this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
			this.valueDiv.remove();
			b.Widget.prototype.destroy.apply(this, arguments)
		},
		value: function(b) {
			if (b === m) return this._value();
			this._setOption("value", b);
			return this
		},
		_setOption: function(d, a) {
			"value" === d && (this.options.value = a, this._refreshValue(), this._value() === this.options.max && this._trigger("complete"));
			b.Widget.prototype._setOption.apply(this, arguments)
		},
		_value: function() {
			var b = this.options.value;
			"number" !== typeof b && (b = 0);
			return Math.min(this.options.max, Math.max(this.min, b))
		},
		_percentage: function() {
			return 100 *
				this._value() / this.options.max
		},
		_refreshValue: function() {
			var b = this.value(),
				a = this._percentage();
			this.oldValue !== b && (this.oldValue = b, this._trigger("change"));
			this.valueDiv.toggle(b > this.min).toggleClass("ui-corner-right", b === this.options.max).width(a.toFixed(0) + "%");
			this.element.attr("aria-valuenow", b)
		}
	});
	b.extend(b.ui.progressbar, {
		version: "1.8.18"
	})
})(jQuery);
(function(b, m) {
	b.widget("ui.slider", b.ui.mouse, {
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null
		},
		_create: function() {
			var d = this,
				a = this.options,
				c = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				g = a.values && a.values.length || 1,
				f = [];
			this._mouseSliding = this._keySliding = !1;
			this._animateOff = !0;
			this._handleIndex = null;
			this._detectOrientation();
			this._mouseInit();
			this.element.addClass("ui-slider ui-slider-" +
				this.orientation + " ui-widget ui-widget-content ui-corner-all" + (a.disabled ? " ui-slider-disabled ui-disabled" : ""));
			this.range = b([]);
			a.range && (!0 === a.range && (a.values || (a.values = [this._valueMin(), this._valueMin()]), a.values.length && 2 !== a.values.length && (a.values = [a.values[0], a.values[0]])), this.range = b("\x3cdiv\x3e\x3c/div\x3e").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === a.range || "max" === a.range ? " ui-slider-range-" + a.range : "")));
			for (var e = c.length; e < g; e += 1) f.push("\x3ca class\x3d'ui-slider-handle ui-state-default ui-corner-all' href\x3d'#'\x3e\x3c/a\x3e");
			this.handles = c.add(b(f.join("")).appendTo(d.element));
			this.handle = this.handles.eq(0);
			this.handles.add(this.range).filter("a").click(function(a) {
				a.preventDefault()
			}).hover(function() {
				a.disabled || b(this).addClass("ui-state-hover")
			}, function() {
				b(this).removeClass("ui-state-hover")
			}).focus(function() {
				a.disabled ? b(this).blur() : (b(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), b(this).addClass("ui-state-focus"))
			}).blur(function() {
				b(this).removeClass("ui-state-focus")
			});
			this.handles.each(function(a) {
				b(this).data("index.ui-slider-handle",
					a)
			});
			this.handles.keydown(function(a) {
				var c = b(this).data("index.ui-slider-handle"),
					e, f, g;
				if (!d.options.disabled) {
					switch (a.keyCode) {
						case b.ui.keyCode.HOME:
						case b.ui.keyCode.END:
						case b.ui.keyCode.PAGE_UP:
						case b.ui.keyCode.PAGE_DOWN:
						case b.ui.keyCode.UP:
						case b.ui.keyCode.RIGHT:
						case b.ui.keyCode.DOWN:
						case b.ui.keyCode.LEFT:
							if (a.preventDefault(), !d._keySliding && (d._keySliding = !0, b(this).addClass("ui-state-active"), e = d._start(a, c), !1 === e)) return
					}
					g = d.options.step;
					e = d.options.values && d.options.values.length ?
						f = d.values(c) : f = d.value();
					switch (a.keyCode) {
						case b.ui.keyCode.HOME:
							f = d._valueMin();
							break;
						case b.ui.keyCode.END:
							f = d._valueMax();
							break;
						case b.ui.keyCode.PAGE_UP:
							f = d._trimAlignValue(e + (d._valueMax() - d._valueMin()) / 5);
							break;
						case b.ui.keyCode.PAGE_DOWN:
							f = d._trimAlignValue(e - (d._valueMax() - d._valueMin()) / 5);
							break;
						case b.ui.keyCode.UP:
						case b.ui.keyCode.RIGHT:
							if (e === d._valueMax()) return;
							f = d._trimAlignValue(e + g);
							break;
						case b.ui.keyCode.DOWN:
						case b.ui.keyCode.LEFT:
							if (e === d._valueMin()) return;
							f = d._trimAlignValue(e -
								g)
					}
					d._slide(a, c, f)
				}
			}).keyup(function(a) {
				var c = b(this).data("index.ui-slider-handle");
				d._keySliding && (d._keySliding = !1, d._stop(a, c), d._change(a, c), b(this).removeClass("ui-state-active"))
			});
			this._refreshValue();
			this._animateOff = !1
		},
		destroy: function() {
			this.handles.remove();
			this.range.remove();
			this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
			this._mouseDestroy();
			return this
		},
		_mouseCapture: function(d) {
			var a = this.options,
				c, g, f, e, k;
			if (a.disabled) return !1;
			this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			};
			this.elementOffset = this.element.offset();
			c = this._normValueFromMouse({
				x: d.pageX,
				y: d.pageY
			});
			g = this._valueMax() - this._valueMin() + 1;
			e = this;
			this.handles.each(function(a) {
				var d = Math.abs(c - e.values(a));
				g > d && (g = d, f = b(this), k = a)
			});
			!0 === a.range && this.values(1) === a.min && (k += 1, f = b(this.handles[k]));
			if (!1 === this._start(d, k)) return !1;
			this._mouseSliding = !0;
			e._handleIndex = k;
			f.addClass("ui-state-active").focus();
			a = f.offset();
			this._clickOffset = !b(d.target).parents().andSelf().is(".ui-slider-handle") ? {
				left: 0,
				top: 0
			} : {
				left: d.pageX - a.left - f.width() / 2,
				top: d.pageY - a.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
			};
			this.handles.hasClass("ui-state-hover") || this._slide(d, k, c);
			return this._animateOff = !0
		},
		_mouseStart: function(b) {
			return !0
		},
		_mouseDrag: function(b) {
			var a =
				this._normValueFromMouse({
					x: b.pageX,
					y: b.pageY
				});
			this._slide(b, this._handleIndex, a);
			return !1
		},
		_mouseStop: function(b) {
			this.handles.removeClass("ui-state-active");
			this._mouseSliding = !1;
			this._stop(b, this._handleIndex);
			this._change(b, this._handleIndex);
			this._clickOffset = this._handleIndex = null;
			return this._animateOff = !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(b) {
			var a;
			"horizontal" === this.orientation ? (a = this.elementSize.width,
				b = b.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (a = this.elementSize.height, b = b.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0));
			a = b / a;
			1 < a && (a = 1);
			0 > a && (a = 0);
			"vertical" === this.orientation && (a = 1 - a);
			b = this._valueMax() - this._valueMin();
			a = this._valueMin() + a * b;
			return this._trimAlignValue(a)
		},
		_start: function(b, a) {
			var c = {
				handle: this.handles[a],
				value: this.value()
			};
			this.options.values && this.options.values.length && (c.value = this.values(a), c.values = this.values());
			return this._trigger("start", b, c)
		},
		_slide: function(b, a, c) {
			var g;
			if (this.options.values && this.options.values.length) {
				g = this.values(a ? 0 : 1);
				if (2 === this.options.values.length && !0 === this.options.range && (0 === a && c > g || 1 === a && c < g)) c = g;
				c !== this.values(a) && (g = this.values(), g[a] = c, b = this._trigger("slide", b, {
					handle: this.handles[a],
					value: c,
					values: g
				}), this.values(a ? 0 : 1), !1 !== b && this.values(a, c, !0))
			} else c !== this.value() && (b = this._trigger("slide", b, {
				handle: this.handles[a],
				value: c
			}), !1 !== b && this.value(c))
		},
		_stop: function(b,
			a) {
			var c = {
				handle: this.handles[a],
				value: this.value()
			};
			this.options.values && this.options.values.length && (c.value = this.values(a), c.values = this.values());
			this._trigger("stop", b, c)
		},
		_change: function(b, a) {
			if (!this._keySliding && !this._mouseSliding) {
				var c = {
					handle: this.handles[a],
					value: this.value()
				};
				this.options.values && this.options.values.length && (c.value = this.values(a), c.values = this.values());
				this._trigger("change", b, c)
			}
		},
		value: function(b) {
			if (arguments.length) this.options.value = this._trimAlignValue(b), this._refreshValue(),
			this._change(null, 0);
			else return this._value()
		},
		values: function(d, a) {
			var c, g, f;
			if (1 < arguments.length) this.options.values[d] = this._trimAlignValue(a), this._refreshValue(), this._change(null, d);
			else if (arguments.length)
				if (b.isArray(arguments[0])) {
					c = this.options.values;
					g = arguments[0];
					for (f = 0; f < c.length; f += 1) c[f] = this._trimAlignValue(g[f]), this._change(null, f);
					this._refreshValue()
				} else return this.options.values && this.options.values.length ? this._values(d) : this.value();
				else return this._values()
		},
		_setOption: function(d,
			a) {
			var c, g = 0;
			b.isArray(this.options.values) && (g = this.options.values.length);
			b.Widget.prototype._setOption.apply(this, arguments);
			switch (d) {
				case "disabled":
					a ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
					break;
				case "orientation":
					this._detectOrientation();
					this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" +
						this.orientation);
					this._refreshValue();
					break;
				case "value":
					this._animateOff = !0;
					this._refreshValue();
					this._change(null, 0);
					this._animateOff = !1;
					break;
				case "values":
					this._animateOff = !0;
					this._refreshValue();
					for (c = 0; c < g; c += 1) this._change(null, c);
					this._animateOff = !1
			}
		},
		_value: function() {
			var b = this.options.value;
			return b = this._trimAlignValue(b)
		},
		_values: function(b) {
			var a, c;
			if (arguments.length) return a = this.options.values[b], a = this._trimAlignValue(a);
			a = this.options.values.slice();
			for (c = 0; c < a.length; c += 1) a[c] =
				this._trimAlignValue(a[c]);
			return a
		},
		_trimAlignValue: function(b) {
			if (b <= this._valueMin()) return this._valueMin();
			if (b >= this._valueMax()) return this._valueMax();
			var a = 0 < this.options.step ? this.options.step : 1,
				c = (b - this._valueMin()) % a;
			b -= c;
			2 * Math.abs(c) >= a && (b += 0 < c ? a : -a);
			return parseFloat(b.toFixed(5))
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.options.max
		},
		_refreshValue: function() {
			var d = this.options.range,
				a = this.options,
				c = this,
				g = !this._animateOff ? a.animate : !1,
				f, e = {}, k, l, m, p;
			if (this.options.values && this.options.values.length) this.handles.each(function(d, l) {
				f = 100 * ((c.values(d) - c._valueMin()) / (c._valueMax() - c._valueMin()));
				e["horizontal" === c.orientation ? "left" : "bottom"] = f + "%";
				b(this).stop(1, 1)[g ? "animate" : "css"](e, a.animate);
				if (!0 === c.options.range)
					if ("horizontal" === c.orientation) {
						if (0 === d) c.range.stop(1, 1)[g ? "animate" : "css"]({
							left: f + "%"
						}, a.animate);
						if (1 === d) c.range[g ? "animate" : "css"]({
							width: f - k + "%"
						}, {
							queue: !1,
							duration: a.animate
						})
					} else {
						if (0 === d) c.range.stop(1,
							1)[g ? "animate" : "css"]({
							bottom: f + "%"
						}, a.animate);
						if (1 === d) c.range[g ? "animate" : "css"]({
							height: f - k + "%"
						}, {
							queue: !1,
							duration: a.animate
						})
					}
				k = f
			});
			else {
				l = this.value();
				m = this._valueMin();
				p = this._valueMax();
				f = p !== m ? 100 * ((l - m) / (p - m)) : 0;
				e["horizontal" === c.orientation ? "left" : "bottom"] = f + "%";
				this.handle.stop(1, 1)[g ? "animate" : "css"](e, a.animate);
				if ("min" === d && "horizontal" === this.orientation) this.range.stop(1, 1)[g ? "animate" : "css"]({
					width: f + "%"
				}, a.animate);
				if ("max" === d && "horizontal" === this.orientation) this.range[g ?
					"animate" : "css"]({
					width: 100 - f + "%"
				}, {
					queue: !1,
					duration: a.animate
				});
				if ("min" === d && "vertical" === this.orientation) this.range.stop(1, 1)[g ? "animate" : "css"]({
					height: f + "%"
				}, a.animate);
				if ("max" === d && "vertical" === this.orientation) this.range[g ? "animate" : "css"]({
					height: 100 - f + "%"
				}, {
					queue: !1,
					duration: a.animate
				})
			}
		}
	});
	b.extend(b.ui.slider, {
		version: "1.8.18"
	})
})(jQuery);
(function(b, m) {
	var d = 0,
		a = 0;
	b.widget("ui.tabs", {
		options: {
			add: null,
			ajaxOptions: null,
			cache: !1,
			cookie: null,
			collapsible: !1,
			disable: null,
			disabled: [],
			enable: null,
			event: "click",
			fx: null,
			idPrefix: "ui-tabs-",
			load: null,
			panelTemplate: "\x3cdiv\x3e\x3c/div\x3e",
			remove: null,
			select: null,
			show: null,
			spinner: "\x3cem\x3eLoading\x26#8230;\x3c/em\x3e",
			tabTemplate: "\x3cli\x3e\x3ca href\x3d'#{href}'\x3e\x3cspan\x3e#{label}\x3c/span\x3e\x3c/a\x3e\x3c/li\x3e"
		},
		_create: function() {
			this._tabify(!0)
		},
		_setOption: function(a, b) {
			"selected" ==
				a ? this.options.collapsible && b == this.options.selected || this.select(b) : (this.options[a] = b, this._tabify())
		},
		_tabId: function(a) {
			return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + ++d
		},
		_sanitizeSelector: function(a) {
			return a.replace(/:/g, "\\:")
		},
		_cookie: function() {
			var c = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++a);
			return b.cookie.apply(null, [c].concat(b.makeArray(arguments)))
		},
		_ui: function(a, b) {
			return {
				tab: a,
				panel: b,
				index: this.anchors.index(a)
			}
		},
		_cleanup: function() {
			this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
				var a = b(this);
				a.html(a.data("label.tabs")).removeData("label.tabs")
			})
		},
		_tabify: function(a) {
			function d(a, c) {
				a.css("display", "");
				!b.support.opacity && c.opacity && a[0].style.removeAttribute("filter")
			}
			var f = this,
				e = this.options,
				k = /^#.+/;
			this.list = this.element.find("ol,ul").eq(0);
			this.lis = b(" \x3e li:has(a[href])", this.list);
			this.anchors = this.lis.map(function() {
				return b("a",
					this)[0]
			});
			this.panels = b([]);
			this.anchors.each(function(a, c) {
				var d = b(c).attr("href"),
					g = d.split("#")[0],
					l;
				if (g && (g === location.toString().split("#")[0] || (l = b("base")[0]) && g === l.href)) d = c.hash, c.href = d;
				k.test(d) ? f.panels = f.panels.add(f.element.find(f._sanitizeSelector(d))) : d && "#" !== d ? (b.data(c, "href.tabs", d), b.data(c, "load.tabs", d.replace(/#.*$/, "")), d = f._tabId(c), c.href = "#" + d, g = f.element.find("#" + d), g.length || (g = b(e.panelTemplate).attr("id", d).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(f.panels[a -
					1] || f.list), g.data("destroy.tabs", !0)), f.panels = f.panels.add(g)) : e.disabled.push(a)
			});
			a ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), e.selected === m ? (location.hash && this.anchors.each(function(a, b) {
					if (b.hash == location.hash) return e.selected = a, !1
				}),
				"number" !== typeof e.selected && e.cookie && (e.selected = parseInt(f._cookie(), 10)), "number" !== typeof e.selected && this.lis.filter(".ui-tabs-selected").length && (e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : null === e.selected && (e.selected = -1), e.selected = 0 <= e.selected && this.anchors[e.selected] || 0 > e.selected ? e.selected : 0, e.disabled = b.unique(e.disabled.concat(b.map(this.lis.filter(".ui-state-disabled"), function(a, b) {
				return f.lis.index(a)
			}))).sort(), -1 != b.inArray(e.selected, e.disabled) && e.disabled.splice(b.inArray(e.selected, e.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), 0 <= e.selected && this.anchors.length && (f.element.find(f._sanitizeSelector(f.anchors[e.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"), f.element.queue("tabs", function() {
					f._trigger("show", null, f._ui(f.anchors[e.selected], f.element.find(f._sanitizeSelector(f.anchors[e.selected].hash))[0]))
				}),
				this.load(e.selected)), b(window).bind("unload", function() {
				f.lis.add(f.anchors).unbind(".tabs");
				f.lis = f.anchors = f.panels = null
			})) : e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
			this.element[e.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
			e.cookie && this._cookie(e.selected, e.cookie);
			a = 0;
			for (var l; l = this.lis[a]; a++) b(l)[-1 != b.inArray(a, e.disabled) && !b(l).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
			!1 === e.cache && this.anchors.removeData("cache.tabs");
			this.lis.add(this.anchors).unbind(".tabs");
			if ("mouseover" !== e.event) {
				var r = function(a, b) {
					b.is(":not(.ui-state-disabled)") && b.addClass("ui-state-" + a)
				};
				this.lis.bind("mouseover.tabs", function() {
					r("hover", b(this))
				});
				this.lis.bind("mouseout.tabs", function() {
					b(this).removeClass("ui-state-hover")
				});
				this.anchors.bind("focus.tabs", function() {
					r("focus", b(this).closest("li"))
				});
				this.anchors.bind("blur.tabs", function() {
					b(this).closest("li").removeClass("ui-state-focus")
				})
			}
			var p, n;
			e.fx && (b.isArray(e.fx) ? (p = e.fx[0],
				n = e.fx[1]) : p = n = e.fx);
			var u = n ? function(a, c) {
					b(a).closest("li").addClass("ui-tabs-selected ui-state-active");
					c.hide().removeClass("ui-tabs-hide").animate(n, n.duration || "normal", function() {
						d(c, n);
						f._trigger("show", null, f._ui(a, c[0]))
					})
				} : function(a, c) {
					b(a).closest("li").addClass("ui-tabs-selected ui-state-active");
					c.removeClass("ui-tabs-hide");
					f._trigger("show", null, f._ui(a, c[0]))
				}, q = p ? function(a, b) {
					b.animate(p, p.duration || "normal", function() {
						f.lis.removeClass("ui-tabs-selected ui-state-active");
						b.addClass("ui-tabs-hide");
						d(b, p);
						f.element.dequeue("tabs")
					})
				} : function(a, b, c) {
					f.lis.removeClass("ui-tabs-selected ui-state-active");
					b.addClass("ui-tabs-hide");
					f.element.dequeue("tabs")
				};
			this.anchors.bind(e.event + ".tabs", function() {
				var a = this,
					c = b(a).closest("li"),
					d = f.panels.filter(":not(.ui-tabs-hide)"),
					g = f.element.find(f._sanitizeSelector(a.hash));
				if (c.hasClass("ui-tabs-selected") && !e.collapsible || c.hasClass("ui-state-disabled") || c.hasClass("ui-state-processing") || f.panels.filter(":animated").length || !1 === f._trigger("select",
					null, f._ui(this, g[0]))) return this.blur(), !1;
				e.selected = f.anchors.index(this);
				f.abort();
				if (e.collapsible) {
					if (c.hasClass("ui-tabs-selected")) return e.selected = -1, e.cookie && f._cookie(e.selected, e.cookie), f.element.queue("tabs", function() {
						q(a, d)
					}).dequeue("tabs"), this.blur(), !1;
					if (!d.length) return e.cookie && f._cookie(e.selected, e.cookie), f.element.queue("tabs", function() {
						u(a, g)
					}), f.load(f.anchors.index(this)), this.blur(), !1
				}
				e.cookie && f._cookie(e.selected, e.cookie);
				if (g.length) d.length && f.element.queue("tabs",
					function() {
						q(a, d)
					}), f.element.queue("tabs", function() {
					u(a, g)
				}), f.load(f.anchors.index(this));
				else throw "jQuery UI Tabs: Mismatching fragment identifier.";
				b.browser.msie && this.blur()
			});
			this.anchors.bind("click.tabs", function() {
				return !1
			})
		},
		_getIndex: function(a) {
			"string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$\x3d" + a + "]")));
			return a
		},
		destroy: function() {
			var a = this.options;
			this.abort();
			this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
			this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
			this.anchors.each(function() {
				var a = b.data(this, "href.tabs");
				a && (this.href = a);
				var c = b(this).unbind(".tabs");
				b.each(["href", "load", "cache"], function(a, b) {
					c.removeData(b + ".tabs")
				})
			});
			this.lis.unbind(".tabs").add(this.panels).each(function() {
				b.data(this, "destroy.tabs") ? b(this).remove() : b(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
			});
			a.cookie && this._cookie(null, a.cookie);
			return this
		},
		add: function(a, d, f) {
			f === m && (f = this.anchors.length);
			var e = this,
				k = this.options;
			d = b(k.tabTemplate.replace(/#\{href\}/g, a).replace(/#\{label\}/g, d));
			a = !a.indexOf("#") ? a.replace("#", "") : this._tabId(b("a", d)[0]);
			d.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
			var l = e.element.find("#" + a);
			l.length || (l = b(k.panelTemplate).attr("id", a).data("destroy.tabs", !0));
			l.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
			f >=
				this.lis.length ? (d.appendTo(this.list), l.appendTo(this.list[0].parentNode)) : (d.insertBefore(this.lis[f]), l.insertBefore(this.panels[f]));
			k.disabled = b.map(k.disabled, function(a, b) {
				return a >= f ? ++a : a
			});
			this._tabify();
			1 == this.anchors.length && (k.selected = 0, d.addClass("ui-tabs-selected ui-state-active"), l.removeClass("ui-tabs-hide"), this.element.queue("tabs", function() {
				e._trigger("show", null, e._ui(e.anchors[0], e.panels[0]))
			}), this.load(0));
			this._trigger("add", null, this._ui(this.anchors[f], this.panels[f]));
			return this
		},
		remove: function(a) {
			a = this._getIndex(a);
			var d = this.options,
				f = this.lis.eq(a).remove(),
				e = this.panels.eq(a).remove();
			f.hasClass("ui-tabs-selected") && 1 < this.anchors.length && this.select(a + (a + 1 < this.anchors.length ? 1 : -1));
			d.disabled = b.map(b.grep(d.disabled, function(b, d) {
				return b != a
			}), function(b, d) {
				return b >= a ? --b : b
			});
			this._tabify();
			this._trigger("remove", null, this._ui(f.find("a")[0], e[0]));
			return this
		},
		enable: function(a) {
			a = this._getIndex(a);
			var d = this.options;
			if (-1 != b.inArray(a, d.disabled)) return this.lis.eq(a).removeClass("ui-state-disabled"),
			d.disabled = b.grep(d.disabled, function(b, d) {
				return b != a
			}), this._trigger("enable", null, this._ui(this.anchors[a], this.panels[a])), this
		},
		disable: function(a) {
			a = this._getIndex(a);
			var b = this.options;
			a != b.selected && (this.lis.eq(a).addClass("ui-state-disabled"), b.disabled.push(a), b.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a])));
			return this
		},
		select: function(a) {
			a = this._getIndex(a);
			if (-1 == a)
				if (this.options.collapsible && -1 != this.options.selected) a = this.options.selected;
				else return this;
			this.anchors.eq(a).trigger(this.options.event + ".tabs");
			return this
		},
		load: function(a) {
			a = this._getIndex(a);
			var d = this,
				f = this.options,
				e = this.anchors.eq(a)[0],
				k = b.data(e, "load.tabs");
			this.abort();
			if (!k || 0 !== this.element.queue("tabs").length && b.data(e, "cache.tabs")) this.element.dequeue("tabs");
			else {
				this.lis.eq(a).addClass("ui-state-processing");
				if (f.spinner) {
					var l = b("span", e);
					l.data("label.tabs", l.html()).html(f.spinner)
				}
				this.xhr = b.ajax(b.extend({}, f.ajaxOptions, {
					url: k,
					success: function(k,
						l) {
						d.element.find(d._sanitizeSelector(e.hash)).html(k);
						d._cleanup();
						f.cache && b.data(e, "cache.tabs", !0);
						d._trigger("load", null, d._ui(d.anchors[a], d.panels[a]));
						try {
							f.ajaxOptions.success(k, l)
						} catch (m) {}
					},
					error: function(b, k, l) {
						d._cleanup();
						d._trigger("load", null, d._ui(d.anchors[a], d.panels[a]));
						try {
							f.ajaxOptions.error(b, k, a, e)
						} catch (m) {}
					}
				}));
				d.element.dequeue("tabs");
				return this
			}
		},
		abort: function() {
			this.element.queue([]);
			this.panels.stop(!1, !0);
			this.element.queue("tabs", this.element.queue("tabs").splice(-2,
				2));
			this.xhr && (this.xhr.abort(), delete this.xhr);
			this._cleanup();
			return this
		},
		url: function(a, b) {
			this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", b);
			return this
		},
		length: function() {
			return this.anchors.length
		}
	});
	b.extend(b.ui.tabs, {
		version: "1.8.18"
	});
	b.extend(b.ui.tabs.prototype, {
		rotation: null,
		rotate: function(a, b) {
			var d = this,
				e = this.options,
				k = d._rotate || (d._rotate = function(b) {
					clearTimeout(d.rotation);
					d.rotation = setTimeout(function() {
						var a = e.selected;
						d.select(++a < d.anchors.length ? a : 0)
					}, a);
					b && b.stopPropagation()
				}),
				l = d._unrotate || (d._unrotate = !b ? function(a) {
					a.clientX && d.rotate(null)
				} : function(a) {
					t = e.selected;
					k()
				});
			a ? (this.element.bind("tabsshow", k), this.anchors.bind(e.event + ".tabs", l), k()) : (clearTimeout(d.rotation), this.element.unbind("tabsshow", k), this.anchors.unbind(e.event + ".tabs", l), delete this._rotate, delete this._unrotate);
			return this
		}
	})
})(jQuery);
(function(b) {
	b.flexslider = function(m, d) {
		var a = b(m),
			c = b.extend({}, b.flexslider.defaults, d),
			g = c.namespace,
			f = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
			e = f ? "touchend" : "click",
			k = "vertical" === c.direction,
			l = c.reverse,
			r = 0 < c.itemWidth,
			p = "fade" === c.animation,
			n = "" !== c.asNavFor,
			u = {};
		b.data(m, "flexslider", a);
		u = {
			init: function() {
				a.animating = !1;
				a.currentSlide = c.startAt;
				a.animatingTo = a.currentSlide;
				a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
				a.containerSelector = c.selector.substr(0,
					c.selector.search(" "));
				a.slides = b(c.selector, a);
				a.container = b(a.containerSelector, a);
				a.count = a.slides.length;
				a.syncExists = 0 < b(c.sync).length;
				"slide" === c.animation && (c.animation = "swing");
				a.prop = k ? "top" : "marginLeft";
				a.args = {};
				a.manualPause = !1;
				a.transitions = !c.video && !p && c.useCSS && function() {
					var b = document.createElement("div"),
						c = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
						d;
					for (d in c)
						if (void 0 !== b.style[c[d]]) return a.pfx = c[d].replace("Perspective", "").toLowerCase(),
					a.prop = "-" + a.pfx + "-transform", !0;
					return !1
				}();
				"" !== c.controlsContainer && (a.controlsContainer = 0 < b(c.controlsContainer).length && b(c.controlsContainer));
				"" !== c.manualControls && (a.manualControls = 0 < b(c.manualControls).length && b(c.manualControls));
				c.randomize && (a.slides.sort(function() {
					return Math.round(Math.random()) - 0.5
				}), a.container.empty().append(a.slides));
				a.doMath();
				n && u.asNav.setup();
				a.setup("init");
				c.controlNav && u.controlNav.setup();
				c.directionNav && u.directionNav.setup();
				c.keyboard && (1 === b(a.containerSelector).length ||
					c.multipleKeyboard) && b(document).bind("keyup", function(b) {
					b = b.keyCode;
					if (!a.animating && (39 === b || 37 === b)) b = 39 === b ? a.getTarget("next") : 37 === b ? a.getTarget("prev") : !1, a.flexAnimate(b, c.pauseOnAction)
				});
				c.mousewheel && a.bind("mousewheel", function(b, d, e, f) {
					b.preventDefault();
					b = 0 > d ? a.getTarget("next") : a.getTarget("prev");
					a.flexAnimate(b, c.pauseOnAction)
				});
				c.pausePlay && u.pausePlay.setup();
				c.slideshow && (c.pauseOnHover && a.hover(function() {
					!a.manualPlay && !a.manualPause && a.pause()
				}, function() {
					!a.manualPause && !a.manualPlay && a.play()
				}), 0 < c.initDelay ? setTimeout(a.play, c.initDelay) : a.play());
				f && c.touch && u.touch();
				(!p || p && c.smoothHeight) && b(window).bind("resize focus", u.resize);
				setTimeout(function() {
					c.start(a)
				}, 200)
			},
			asNav: {
				setup: function() {
					a.asNav = !0;
					a.animatingTo = Math.floor(a.currentSlide / a.move);
					a.currentItem = a.currentSlide;
					a.slides.removeClass(g + "active-slide").eq(a.currentItem).addClass(g + "active-slide");
					a.slides.click(function(d) {
						d.preventDefault();
						d = b(this);
						var e = d.index();
						!b(c.asNavFor).data("flexslider").animating && !d.hasClass("active") && (a.direction = a.currentItem < e ? "next" : "prev", a.flexAnimate(e, c.pauseOnAction, !1, !0, !0))
					})
				}
			},
			controlNav: {
				setup: function() {
					a.manualControls ? u.controlNav.setupManual() : u.controlNav.setupPaging()
				},
				setupPaging: function() {
					var d = 1,
						k;
					a.controlNavScaffold = b('\x3col class\x3d"' + g + "control-nav " + g + ("thumbnails" === c.controlNav ? "control-thumbs" : "control-paging") + '"\x3e\x3c/ol\x3e');
					if (1 < a.pagingCount)
						for (var l = 0; l < a.pagingCount; l++) k = "thumbnails" === c.controlNav ? '\x3cimg src\x3d"' + a.slides.eq(l).attr("data-thumb") +
							'"/\x3e' : "\x3ca\x3e" + d + "\x3c/a\x3e", a.controlNavScaffold.append("\x3cli\x3e" + k + "\x3c/li\x3e"), d++;
					a.controlsContainer ? b(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold);
					u.controlNav.set();
					u.controlNav.active();
					a.controlNavScaffold.delegate("a, img", e, function(d) {
						d.preventDefault();
						d = b(this);
						var e = a.controlNav.index(d);
						d.hasClass(g + "active") || (a.direction = e > a.currentSlide ? "next" : "prev", a.flexAnimate(e, c.pauseOnAction))
					});
					f && a.controlNavScaffold.delegate("a", "click touchstart",
						function(a) {
							a.preventDefault()
						})
				},
				setupManual: function() {
					a.controlNav = a.manualControls;
					u.controlNav.active();
					a.controlNav.live(e, function(d) {
						d.preventDefault();
						d = b(this);
						var e = a.controlNav.index(d);
						d.hasClass(g + "active") || (e > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(e, c.pauseOnAction))
					});
					f && a.controlNav.live("click touchstart", function(a) {
						a.preventDefault()
					})
				},
				set: function() {
					a.controlNav = b("." + g + "control-nav li " + ("thumbnails" === c.controlNav ? "img" : "a"), a.controlsContainer ?
						a.controlsContainer : a)
				},
				active: function() {
					a.controlNav.removeClass(g + "active").eq(a.animatingTo).addClass(g + "active")
				},
				update: function(c, d) {
					1 < a.pagingCount && "add" === c ? a.controlNavScaffold.append(b("\x3cli\x3e\x3ca\x3e" + a.count + "\x3c/a\x3e\x3c/li\x3e")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(d).closest("li").remove();
					u.controlNav.set();
					1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(d, c) : u.controlNav.active()
				}
			},
			directionNav: {
				setup: function() {
					var d =
						b('\x3cul class\x3d"' + g + 'direction-nav"\x3e\x3cli\x3e\x3ca class\x3d"' + g + 'prev" href\x3d"#"\x3e' + c.prevText + '\x3c/a\x3e\x3c/li\x3e\x3cli\x3e\x3ca class\x3d"' + g + 'next" href\x3d"#"\x3e' + c.nextText + "\x3c/a\x3e\x3c/li\x3e\x3c/ul\x3e");
					a.controlsContainer ? (b(a.controlsContainer).append(d), a.directionNav = b("." + g + "direction-nav li a", a.controlsContainer)) : (a.append(d), a.directionNav = b("." + g + "direction-nav li a", a));
					u.directionNav.update();
					a.directionNav.bind(e, function(d) {
						d.preventDefault();
						d = b(this).hasClass(g +
							"next") ? a.getTarget("next") : a.getTarget("prev");
						a.flexAnimate(d, c.pauseOnAction)
					});
					f && a.directionNav.bind("click touchstart", function(a) {
						a.preventDefault()
					})
				},
				update: function() {
					var b = g + "disabled";
					1 === a.pagingCount ? a.directionNav.addClass(b) : c.animationLoop ? a.directionNav.removeClass(b) : 0 === a.animatingTo ? a.directionNav.removeClass(b).filter("." + g + "prev").addClass(b) : a.animatingTo === a.last ? a.directionNav.removeClass(b).filter("." + g + "next").addClass(b) : a.directionNav.removeClass(b)
				}
			},
			pausePlay: {
				setup: function() {
					var d =
						b('\x3cdiv class\x3d"' + g + 'pauseplay"\x3e\x3ca\x3e\x3c/a\x3e\x3c/div\x3e');
					a.controlsContainer ? (a.controlsContainer.append(d), a.pausePlay = b("." + g + "pauseplay a", a.controlsContainer)) : (a.append(d), a.pausePlay = b("." + g + "pauseplay a", a));
					u.pausePlay.update(c.slideshow ? g + "pause" : g + "play");
					a.pausePlay.bind(e, function(c) {
						c.preventDefault();
						b(this).hasClass(g + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())
					});
					f && a.pausePlay.bind("click touchstart", function(a) {
						a.preventDefault()
					})
				},
				update: function(b) {
					"play" === b ? a.pausePlay.removeClass(g + "pause").addClass(g + "play").text(c.playText) : a.pausePlay.removeClass(g + "play").addClass(g + "pause").text(c.pauseText)
				}
			},
			touch: function() {
				function b(d) {
					u = k ? e - d.touches[0].pageY : e - d.touches[0].pageX;
					B = k ? Math.abs(u) < Math.abs(d.touches[0].pageX - f) : Math.abs(u) < Math.abs(d.touches[0].pageY - f);
					if (!B || 500 < Number(new Date) - y) d.preventDefault(), !p && a.transitions && (c.animationLoop || (u /= 0 === a.currentSlide && 0 > u || a.currentSlide === a.last && 0 < u ? Math.abs(u) / n + 2 :
						1), a.setProps(g + u, "setTouch"))
				}

				function d(k) {
					m.removeEventListener("touchmove", b, !1);
					if (a.animatingTo === a.currentSlide && !B && null !== u) {
						k = l ? -u : u;
						var r = 0 < k ? a.getTarget("next") : a.getTarget("prev");
						a.canAdvance(r) && (550 > Number(new Date) - y && 50 < Math.abs(k) || Math.abs(k) > n / 2) ? a.flexAnimate(r, c.pauseOnAction) : p || a.flexAnimate(a.currentSlide, c.pauseOnAction, !0)
					}
					m.removeEventListener("touchend", d, !1);
					g = u = f = e = null
				}
				var e, f, g, n, u, y, B = !1;
				m.addEventListener("touchstart", function(p) {
					a.animating ? p.preventDefault() :
						1 === p.touches.length && (a.pause(), n = k ? a.h : a.w, y = Number(new Date), g = r && l && a.animatingTo === a.last ? 0 : r && l ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : r && a.currentSlide === a.last ? a.limit : r ? (a.itemW + c.itemMargin) * a.move * a.currentSlide : l ? (a.last - a.currentSlide + a.cloneOffset) * n : (a.currentSlide + a.cloneOffset) * n, e = k ? p.touches[0].pageY : p.touches[0].pageX, f = k ? p.touches[0].pageX : p.touches[0].pageY, m.addEventListener("touchmove", b, !1), m.addEventListener("touchend", d, !1))
				}, !1)
			},
			resize: function() {
				!a.animating &&
					a.is(":visible") && (r || a.doMath(), p ? u.smoothHeight() : r ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : k ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (c.smoothHeight && u.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
			},
			smoothHeight: function(b) {
				if (!k || p) {
					var c = p ? a : a.viewport;
					b ? c.animate({
						height: a.slides.eq(a.animatingTo).height()
					}, b) : c.height(a.slides.eq(a.animatingTo).height())
				}
			},
			sync: function(d) {
				var e = b(c.sync).data("flexslider"),
					f = a.animatingTo;
				switch (d) {
					case "animate":
						e.flexAnimate(f, c.pauseOnAction, !1, !0);
						break;
					case "play":
						!e.playing && !e.asNav && e.play();
						break;
					case "pause":
						e.pause()
				}
			}
		};
		a.flexAnimate = function(d, e, m, C, x) {
			n && 1 === a.pagingCount && (a.direction = a.currentItem < d ? "next" : "prev");
			if (!a.animating && (a.canAdvance(d, x) || m) && a.is(":visible")) {
				if (n && C)
					if (m = b(c.asNavFor).data("flexslider"), a.atEnd = 0 === d || d === a.count - 1, m.flexAnimate(d, !0, !1, !0, x), a.direction = a.currentItem < d ? "next" : "prev", m.direction = a.direction, Math.ceil((d + 1) / a.visible) - 1 !==
						a.currentSlide && 0 !== d) a.currentItem = d, a.slides.removeClass(g + "active-slide").eq(d).addClass(g + "active-slide"), d = Math.floor(d / a.visible);
					else return a.currentItem = d, a.slides.removeClass(g + "active-slide").eq(d).addClass(g + "active-slide"), !1;
				a.animating = !0;
				a.animatingTo = d;
				c.before(a);
				e && a.pause();
				a.syncExists && !x && u.sync("animate");
				c.controlNav && u.controlNav.active();
				r || a.slides.removeClass(g + "active-slide").eq(d).addClass(g + "active-slide");
				a.atEnd = 0 === d || d === a.last;
				c.directionNav && u.directionNav.update();
				d === a.last && (c.end(a), c.animationLoop || a.pause());
				if (p) f ? (a.slides.eq(a.currentSlide).css({
					opacity: 0,
					zIndex: 1
				}), a.slides.eq(d).css({
					opacity: 1,
					zIndex: 2
				}), a.slides.unbind("webkitTransitionEnd transitionend"), a.slides.eq(a.currentSlide).bind("webkitTransitionEnd transitionend", function() {
					c.after(a)
				}), a.animating = !1, a.currentSlide = a.animatingTo) : (a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed, c.easing), a.slides.eq(d).fadeIn(c.animationSpeed, c.easing, a.wrapup));
				else {
					var z = k ? a.slides.filter(":first").height() :
						a.computedW;
					r ? (d = c.itemWidth > a.w ? 2 * c.itemMargin : c.itemMargin, d = (a.itemW + d) * a.move * a.animatingTo, d = d > a.limit && 1 !== a.visible ? a.limit : d) : d = 0 === a.currentSlide && d === a.count - 1 && c.animationLoop && "next" !== a.direction ? l ? (a.count + a.cloneOffset) * z : 0 : a.currentSlide === a.last && 0 === d && c.animationLoop && "prev" !== a.direction ? l ? 0 : (a.count + 1) * z : l ? (a.count - 1 - d + a.cloneOffset) * z : (d + a.cloneOffset) * z;
					a.setProps(d, "", c.animationSpeed);
					if (a.transitions) {
						if (!c.animationLoop || !a.atEnd) a.animating = !1, a.currentSlide = a.animatingTo;
						a.container.unbind("webkitTransitionEnd transitionend");
						a.container.bind("webkitTransitionEnd transitionend", function() {
							a.wrapup(z)
						})
					} else a.container.animate(a.args, c.animationSpeed, c.easing, function() {
						a.wrapup(z)
					})
				}
				c.smoothHeight && u.smoothHeight(c.animationSpeed)
			}
		};
		a.wrapup = function(b) {
			!p && !r && (0 === a.currentSlide && a.animatingTo === a.last && c.animationLoop ? a.setProps(b, "jumpEnd") : a.currentSlide === a.last && (0 === a.animatingTo && c.animationLoop) && a.setProps(b, "jumpStart"));
			a.animating = !1;
			a.currentSlide =
				a.animatingTo;
			c.after(a)
		};
		a.animateSlides = function() {
			a.animating || a.flexAnimate(a.getTarget("next"))
		};
		a.pause = function() {
			clearInterval(a.animatedSlides);
			a.playing = !1;
			c.pausePlay && u.pausePlay.update("play");
			a.syncExists && u.sync("pause")
		};
		a.play = function() {
			a.animatedSlides = setInterval(a.animateSlides, c.slideshowSpeed);
			a.playing = !0;
			c.pausePlay && u.pausePlay.update("pause");
			a.syncExists && u.sync("play")
		};
		a.canAdvance = function(b, d) {
			var e = n ? a.pagingCount - 1 : a.last;
			return d ? !0 : n && a.currentItem === a.count - 1 &&
				0 === b && "prev" === a.direction ? !0 : n && 0 === a.currentItem && b === a.pagingCount - 1 && "next" !== a.direction ? !1 : b === a.currentSlide && !n ? !1 : c.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && b === e && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === e && 0 === b && "next" === a.direction ? !1 : !0
		};
		a.getTarget = function(b) {
			a.direction = b;
			return "next" === b ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
		};
		a.setProps = function(b, d, e) {
			var f = function() {
				var e = b ? b : (a.itemW + c.itemMargin) * a.move * a.animatingTo;
				return -1 * function() {
					if (r) return "setTouch" === d ? b : l && a.animatingTo === a.last ? 0 : l ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : e;
					switch (d) {
						case "setTotal":
							return l ? (a.count - 1 - a.currentSlide + a.cloneOffset) * b : (a.currentSlide + a.cloneOffset) * b;
						case "setTouch":
							return b;
						case "jumpEnd":
							return l ? b : a.count * b;
						case "jumpStart":
							return l ? a.count * b : b;
						default:
							return b
					}
				}() + "px"
			}();
			a.transitions && (f = k ? "translate3d(0," + f + ",0)" : "translate3d(" + f + ",0,0)", e = void 0 !== e ? e / 1E3 + "s" : "0s", a.container.css("-" +
				a.pfx + "-transition-duration", e));
			a.args[a.prop] = f;
			(a.transitions || void 0 === e) && a.container.css(a.args)
		};
		a.setup = function(d) {
			if (p) a.slides.css({
				width: "100%",
				"float": "left",
				marginRight: "-100%",
				position: "relative"
			}), "init" === d && (f ? a.slides.css({
				opacity: 0,
				display: "block",
				webkitTransition: "opacity " + c.animationSpeed / 1E3 + "s ease",
				zIndex: 1
			}).eq(a.currentSlide).css({
				opacity: 1,
				zIndex: 2
			}) : a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed, c.easing)), c.smoothHeight && u.smoothHeight();
			else {
				var e, m;
				"init" === d &&
					(a.viewport = b('\x3cdiv class\x3d"' + g + 'viewport"\x3e\x3c/div\x3e').css({
					overflow: "hidden",
					position: "relative"
				}).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, l && (m = b.makeArray(a.slides).reverse(), a.slides = b(m), a.container.empty().append(a.slides)));
				c.animationLoop && !r && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== d && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));
				a.newSlides = b(c.selector,
					a);
				e = l ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset;
				k && !r ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
					a.newSlides.css({
						display: "block"
					});
					a.doMath();
					a.viewport.height(a.h);
					a.setProps(e * a.h, "init")
				}, "init" === d ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(e * a.computedW, "init"), setTimeout(function() {
					a.doMath();
					a.newSlides.css({
						width: a.computedW,
						"float": "left",
						display: "block"
					});
					c.smoothHeight &&
						u.smoothHeight()
				}, "init" === d ? 100 : 0))
			}
			r || a.slides.removeClass(g + "active-slide").eq(a.currentSlide).addClass(g + "active-slide")
		};
		a.doMath = function() {
			var b = a.slides.first(),
				d = c.itemMargin,
				e = c.minItems,
				f = c.maxItems;
			a.w = a.width();
			a.h = b.height();
			a.boxPadding = b.outerWidth() - b.width();
			r ? (a.itemT = c.itemWidth + d, a.minW = e ? e * a.itemT : a.w, a.maxW = f ? f * a.itemT : a.w, a.itemW = a.minW > a.w ? (a.w - d * e) / e : a.maxW < a.w ? (a.w - d * f) / f : c.itemWidth > a.w ? a.w : c.itemWidth, a.visible = Math.floor(a.w / (a.itemW + d)), a.move = 0 < c.move && c.move < a.visible ?
				c.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : c.itemWidth > a.w ? (a.itemW + 2 * d) * a.count - a.w - d : (a.itemW + d) * a.count - a.w - d) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1);
			a.computedW = a.itemW - a.boxPadding
		};
		a.update = function(b, d) {
			a.doMath();
			r || (b < a.currentSlide ? a.currentSlide += 1 : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1), a.animatingTo = a.currentSlide);
			if (c.controlNav && !a.manualControls)
				if ("add" === d && !r || a.pagingCount > a.controlNav.length) u.controlNav.update("add");
				else
			if ("remove" === d && !r || a.pagingCount < a.controlNav.length) r && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), u.controlNav.update("remove", a.last);
			c.directionNav && u.directionNav.update()
		};
		a.addSlide = function(d, e) {
			var f = b(d);
			a.count += 1;
			a.last = a.count - 1;
			k && l ? void 0 !== e ? a.slides.eq(a.count - e).after(f) : a.container.prepend(f) : void 0 !== e ? a.slides.eq(e).before(f) : a.container.append(f);
			a.update(e, "add");
			a.slides = b(c.selector + ":not(.clone)", a);
			a.setup();
			c.added(a)
		};
		a.removeSlide = function(d) {
			var e =
				isNaN(d) ? a.slides.index(b(d)) : d;
			a.count -= 1;
			a.last = a.count - 1;
			isNaN(d) ? b(d, a.slides).remove() : k && l ? a.slides.eq(a.last).remove() : a.slides.eq(d).remove();
			a.doMath();
			a.update(e, "remove");
			a.slides = b(c.selector + ":not(.clone)", a);
			a.setup();
			c.removed(a)
		};
		u.init()
	};
	b.flexslider.defaults = {
		namespace: "flex-",
		selector: ".slides \x3e li",
		animation: "fade",
		easing: "swing",
		direction: "horizontal",
		reverse: !1,
		animationLoop: !0,
		smoothHeight: !1,
		startAt: 0,
		slideshow: !0,
		slideshowSpeed: 7E3,
		animationSpeed: 600,
		initDelay: 0,
		randomize: !1,
		pauseOnAction: !0,
		pauseOnHover: !1,
		useCSS: !0,
		touch: !0,
		video: !1,
		controlNav: !0,
		directionNav: !0,
		prevText: "Previous",
		nextText: "Next",
		keyboard: !0,
		multipleKeyboard: !1,
		mousewheel: !1,
		pausePlay: !1,
		pauseText: "Pause",
		playText: "Play",
		controlsContainer: "",
		manualControls: "",
		sync: "",
		asNavFor: "",
		itemWidth: 0,
		itemMargin: 0,
		minItems: 0,
		maxItems: 0,
		move: 0,
		start: function() {},
		before: function() {},
		after: function() {},
		end: function() {},
		added: function() {},
		removed: function() {}
	};
	b.fn.flexslider = function(m) {
		void 0 === m && (m = {});
		if ("object" ===
			typeof m) return this.each(function() {
			var a = b(this),
				c = a.find(m.selector ? m.selector : ".slides \x3e li");
			1 === c.length ? (c.fadeIn(400), m.start && m.start(a)) : void 0 == a.data("flexslider") && new b.flexslider(this, m)
		});
		var d = b(this).data("flexslider");
		switch (m) {
			case "play":
				d.play();
				break;
			case "pause":
				d.pause();
				break;
			case "next":
				d.flexAnimate(d.getTarget("next"), !0);
				break;
			case "prev":
			case "previous":
				d.flexAnimate(d.getTarget("prev"), !0);
				break;
			default:
				"number" === typeof m && d.flexAnimate(m, !0)
		}
	}
})(jQuery);
var i, llactid, myid, llnocookies;
myid = 1;
mypage = escape(location.href);
myref = escape(document.referrer);
myip = escape(location.hostaddress);
"undefined" != i && 1E4 < i && (myid = i);
"undefined" != llactid && 1E4 < llactid && (myid = llactid);
"" == myref && (myref = "None");
"" == mypage && (mypage = "Unavailable");
var linkreefer = "https://ssl.t6.trackalyzer.com/trackalyze.asp?r\x3d" + myref + "\x26p\x3d" + mypage + "\x26i\x3d" + myid + "\x26llnocookies\x3d" + llnocookies;

function Trackalyzer(b, m, d, a) {
	var c = escape(document.referrer);
	escape(location.hostaddress);
	"undefined" == typeof d && (d = m);
	b = "https://ssl.t6.trackalyzer.com/trackalyze.asp?i\x3d" + b + "\x26r\x3d" + c + "\x26p\x3d" + m + "\x26f\x3d" + d;
	m = document.createElement("iframe");
	m.setAttribute("width", "0%");
	m.setAttribute("height", "0%");
	m.setAttribute("frameborder", "0");
	m.setAttribute("id", "ifrm");
	m.setAttribute("src", b);
	setTimeout(document.body.appendChild(m), 1E4);
	document.body.appendChild(m);
	"new" == a ? setTimeout(window.open(d),
		700) : setTimeout("location.href \x3d '" + d + "'", 700)
}
TINY = {};
TINY.box = function() {
	var b, m, d, a, c, g = 0;
	return {
		show: function(f) {
			c = {
				opacity: 70,
				close: 1,
				animate: 1,
				fixed: 1,
				mask: 1,
				maskid: "",
				boxid: "",
				topsplit: 2,
				url: 0,
				post: 0,
				height: 0,
				width: 0,
				html: 0,
				iframe: 0
			};
			for (s in f) c[s] = f[s];
			g ? (b.style.display = "none", clearTimeout(g.ah), a.v && (g.removeChild(a), a.v = 0)) : (b = document.createElement("div"), b.className = "tbox", g = document.createElement("div"), g.className = "tinner", d = document.createElement("div"), d.className = "tcontent", m = document.createElement("div"), m.className = "tmask", a = document.createElement("div"),
				a.className = "tclose", a.v = 0, document.body.appendChild(m), document.body.appendChild(b), b.appendChild(g), g.appendChild(d), m.onclick = a.onclick = TINY.box.hide, window.onresize = TINY.box.resize);
			g.id = c.boxid;
			m.id = c.maskid;
			b.style.position = c.fixed ? "fixed" : "absolute";
			c.html && !c.animate ? (g.style.backgroundImage = "none", d.innerHTML = c.html, d.style.display = "", g.style.width = c.width ? c.width + "px" : "auto", g.style.height = c.height ? c.height + "px" : "auto") : (d.style.display = "none", !c.animate && c.width && c.height ? (g.style.width =
				c.width + "px", g.style.height = c.height + "px") : g.style.width = g.style.height = "100px");
			c.mask ? (this.mask(), this.alpha(m, 1, c.opacity)) : this.alpha(b, 1, 100);
			c.autohide ? g.ah = setTimeout(TINY.box.hide, 1E3 * c.autohide) : document.onkeyup = TINY.box.esc
		},
		fill: function(a, b, d, l, m, p) {
			if (b)
				if (c.image) {
					var n = new Image;
					n.onload = function() {
						m = m || n.width;
						p = p || n.height;
						TINY.box.psh(n, l, m, p)
					};
					n.src = c.image
				} else
			if (c.iframe) this.psh('\x3ciframe src\x3d"' + c.iframe + '" width\x3d"' + c.width + '" frameborder\x3d"0" height\x3d"' + c.height +
				'"\x3e\x3c/iframe\x3e', l, m, p);
			else {
				var u = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
				u.onreadystatechange = function() {
					4 == u.readyState && 200 == u.status && (g.style.backgroundImage = "", TINY.box.psh(u.responseText, l, m, p))
				};
				d ? (u.open("POST", a, !0), u.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), u.send(d)) : (u.open("GET", a, !0), u.send(null))
			} else this.psh(a, l, m, p)
		},
		psh: function(a, b, c, l) {
			"object" == typeof a ? d.appendChild(a) : d.innerHTML = a;
			a = g.style.width;
			var m = g.style.height;
			if (!c || !l) g.style.width = c ? c + "px" : "", g.style.height = l ? l + "px" : "", d.style.display = "", l || (l = parseInt(d.offsetHeight)), c || (c = parseInt(d.offsetWidth)), d.style.display = "none";
			g.style.width = a;
			g.style.height = m;
			this.size(c, l, b)
		},
		esc: function(a) {
			a = a || window.event;
			27 == a.keyCode && TINY.box.hide()
		},
		hide: function() {
			TINY.box.alpha(b, -1, 0, 3);
			document.onkeypress = null;
			c.closejs && c.closejs()
		},
		resize: function() {
			TINY.box.pos();
			TINY.box.mask()
		},
		mask: function() {
			m.style.height = this.total(1) + "px";
			m.style.width =
				this.total(0) + "px"
		},
		pos: function() {
			var a;
			"undefined" != typeof c.top ? a = c.top : (a = this.height() / c.topsplit - b.offsetHeight / 2, a = 20 > a ? 20 : a);
			!c.fixed && !c.top && (a += this.top());
			b.style.top = a + "px";
			b.style.left = "undefined" != typeof c.left ? c.left + "px" : this.width() / 2 - b.offsetWidth / 2 + "px"
		},
		alpha: function(a, b, c) {
			clearInterval(a.ai);
			b && (a.style.opacity = 0, a.style.filter = "alpha(opacity\x3d0)", a.style.display = "block", TINY.box.pos());
			a.ai = setInterval(function() {
				TINY.box.ta(a, c, b)
			}, 20)
		},
		ta: function(a, e, k) {
			var l = Math.round(100 *
				a.style.opacity);
			l == e ? (clearInterval(a.ai), -1 == k ? (a.style.display = "none", a == b ? TINY.box.alpha(m, -1, 0, 2) : d.innerHTML = g.style.backgroundImage = "") : a == m ? this.alpha(b, 1, 100) : (b.style.filter = "", TINY.box.fill(c.html || c.url, c.url || c.iframe || c.image, c.post, c.animate, c.width, c.height))) : (e -= Math.floor(0.5 * Math.abs(e - l)) * k, a.style.opacity = e / 100, a.style.filter = "alpha(opacity\x3d" + e + ")")
		},
		size: function(b, e, k) {
			if (k) {
				clearInterval(g.si);
				var l = parseInt(g.style.width) > b ? -1 : 1,
					m = parseInt(g.style.height) > e ? -1 : 1;
				g.si =
					setInterval(function() {
						TINY.box.ts(b, l, e, m)
					}, 20)
			} else g.style.backgroundImage = "none", c.close && (g.appendChild(a), a.v = 1), g.style.width = b + "px", g.style.height = e + "px", d.style.display = "", this.pos(), c.openjs && c.openjs()
		},
		ts: function(b, e, k, l) {
			var m = parseInt(g.style.width),
				p = parseInt(g.style.height);
			m == b && p == k ? (clearInterval(g.si), g.style.backgroundImage = "none", d.style.display = "block", c.close && (g.appendChild(a), a.v = 1), c.openjs && c.openjs()) : (m != b && (g.style.width = b - Math.floor(0.6 * Math.abs(b - m)) * e + "px"), p != k &&
				(g.style.height = k - Math.floor(0.6 * Math.abs(k - p)) * l + "px"), this.pos())
		},
		top: function() {
			return document.documentElement.scrollTop || document.body.scrollTop
		},
		width: function() {
			return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
		},
		height: function() {
			return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		},
		total: function(a) {
			var b = document.body,
				c = document.documentElement;
			return a ? Math.max(Math.max(b.scrollHeight, c.scrollHeight), Math.max(b.clientHeight,
				c.clientHeight)) : Math.max(Math.max(b.scrollWidth, c.scrollWidth), Math.max(b.clientWidth, c.clientWidth))
		}
	}
}();
(function(b, m, d) {
	b.onerror = function(a, b, g) {
		try {
			var f = "message\x3d" + a + "\x26fileNameAndPath\x3d" + b + "\x26lineNumber\x3d" + g + "\x26browser\x3d" + (d ? d.userAgent : "n/a") + "\x26platform\x3d" + (d ? d.platform : "n/a") + "\x26currentURL\x3d" + (m ? m.URL : "n/a") + "\x26referrer\x3d" + (m ? m.referrer : "n/a"),
				e = new XMLHttpRequest;
			e.open("POST", "http://my.datameer.com/logger/website/javascript/error", !0);
			e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset\x3dUTF-8");
			e.send(f)
		} catch (k) {}
	}
})(window, document,
	navigator);
var NWS = NWS || {};
NWS.NameSpaceManager = function(b) {
	b = b.split(".");
	var m = NWS,
		d = 0;
	"NWS" === b[0] && (b = b.slice(1));
	for (var d = b.length, a = 0; a < d; a += 1) "undefined" === typeof m[b[a]] && (m[b[a]] = {}), m = m[b[a]];
	return m
};
(function(b, m) {
	b(function() {
		try {
			for (var d = b('input[name\x3d"modules"]'), a = 0, c = [], g = d.length, a = 0; a < g; a++) {
				var f = d[a].value; - 1 !== c.indexOf(f) ? b.post("/logger/javascript/error", {
					message: 'error page is duplicate instanciated: "' + site + '"'
				}) : (c.push(f), m.modules[f] && m.modules[f].initModule())
			}
		} catch (e) {
			throw Error(e.stack);
		}
	})
})(jQuery, window);
(function(b, m, d, a) {
	function c(a, b, c) {
		var d = "../../images/teampics/";
		return '\x3cimg src\x3d"' + (b && !c ? d + ("big/" + a + ".jpg") : !b && c ? d + ("detail/" + a + ".png") : d + ("small/" + a + ".jpg")) + '" class\x3d"' + (b ? "overviewBig" : "overview") + '"/\x3e'
	}

	function g() {
		b("#detailsView.active").removeClass("active").hide();
		b("#overlay").hide()
	}
	window.modules = window.modules || {};
	window.modules.culture = window.modules.culture || {};
	var f = {
		employee: [{
			name: "Adam",
			location: "San Mateo",
			position: "Solutions Engineer",
			pic: "adam",
			question: [{
				q: "What makes Datameer so different?",
				a: "Gamma Ray mutations"
			}, {
				q: "If you could have dinner with 3 famous people, living or dead, who would it be?",
				a: "Mark Twain, Oscar Wilde and Terry Prachett - Just to enjoy the wit and conversation, though I wonder if it might just be exhausting."
			}, {
				q: "If you were a tree or animal what kind would you be?",
				a: "A well cared for domestic housecat."
			}]
		}, {
			name: "Alejandro Malbet",
			location: "San Mateo",
			position: "Technical Account Manager",
			pic: "alejandro",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Strong sense of teamwork across the organization. Everyone is willing to help in any way regardless of what problem is."
			}, {
				q: "If you could have dinner with three famous people, living or dead, who would it be?",
				a: "Isaac Newton, Albert Einstein, and Steve Jobs."
			}, {
				q: "If Hollywood made a novel about your life, who would you like to see play the lead role as you?",
				a: "Eric Bana."
			}, {
				q: "What is the best advice you've ever received?",
				a: "Never make the same mistake twice."
			}]
		}, {
			name: "Andreas",
			location: "Halle/Saale",
			position: "Head of QA Team",
			pic: "andreas",
			question: [{
				q: "How would you explain Datameer software to an eight-year old child?",
				a: "Go to the beach and take a bucket of sand. Skim and sieve to find an amber or an olivine - Datameer is the bucket and sieve together."
			}, {
				q: "What food(s) will you never eat?",
				a: "Whale meat"
			}, {
				q: "Who is your favorite musician or band?",
				a: "Depeche Mode"
			}, {
				q: "What is the best advice you've ever gotten?",
				a: "Don't dream your life, live your dreams!"
			}]
		}, {
			name: "Brooke",
			location: "San Mateo",
			position: "Technical Support Engineer",
			pic: "brooke",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "My coworkers. Everyone is so supportive and fun."
			}, {
				q: "What is in your refrigerator right now?",
				a: "Pickles, Cheese, Homemade Bloody Mary Mix, Leftovers from Last Night\u2019s Dinner, Beer, Some Type of Fruit Juice, Skim Milk, Seasonal Flavored Coffee Creamer, Hot Peppers (Sport Peppers, Giardenara, Jalapenos...), Hot Sauce (Sriracha, Tapatio, Cholula, Tabasco...), Various Vegetables, Condiments."
			}, {
				q: "What are the names of your three favorite books?",
				a: "The Harry Potter Series, Anything by Walter Moer, and Cruddy by Lynda Barry."
			}, {
				q: "If you had a plane ticket to go anywhere in the world where would you go?",
				a: "Either Chicago for my family and a Chicago-style hotdog or Florence, Italy for the art, food, wine, and culture. I feel like I travel back to the Renaissance when I visit."
			}]
		}, {
			name: "David",
			location: "Connecticut",
			position: "Regional Sales Director - East",
			pic: "david",
			question: [{
				q: "How would you explain Datameer software to an eight-year-old child?",
				a: "I ask my daughter how is she going to sift through the disaster zone that is her playroom to determine the one toy she wants to play with.  Daddy helps people with lots of toys determine the one they are going to play with."
			}, {
				q: "If you could have dinner with three famous people, living or dead, who would it be?",
				a: "Craig Kelly (Dead), Bono, Barack Obama."
			}, {
				q: "If you were a Harry Potter character, which one would it be?",
				a: "Dobby the House Elf."
			}, {
				q: "What is in your refrigerator right now?",
				a: "Lots of stuff that can no longer be eaten -- unless I wanted to get sick."
			}]
		}, {
			name: "Dianna",
			location: "San Mateo",
			position: "Director, Marketing Programs",
			pic: "dianna",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "The people and the culture."
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Crickets"
			}, {
				q: "What is the weirdest thing to ever happen to you?",
				a: "I once rode in the back of a pick up truck with a chicken and a motorcycle."
			}, {
				q: "What are three fun facts about you?",
				a: "I'm getting married 3 times in one year, to the same guy.\x3cbr /\x3eMy grandma is 93 and she's in better shape than I am.\x3cbr /\x3eIn my next life, I want to ride in the back of a pickup truck with two chickens and a motorcycle."
			}]
		}, {
			name: "Eduardo",
			location: "San Mateo",
			position: "VP, Services",
			pic: "eduardo",
			question: [{
				q: "What makes Datameer so different?",
				a: "The people are all excited to be working together on solving news and big issues, not just making money."
			}, {
				q: "If you could be a mixed drink, what drink would you be and why?",
				a: "Scotch! I tend to grow on people."
			}, {
				q: "What is the best advice you've ever gotten?",
				a: "Be confident in what you do and do the best you can. Others will step in to help if they know you are giving it your all."
			}, {
				q: "What food(s) will you never eat?",
				a: "This sushi mussel thing. It pops in your mouth... so disgusting."
			}]
		}, {
			name: "Edwin",
			location: "San Mateo",
			position: "Visual Designer",
			pic: "edwin",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Great people, fun people, great team. It's like having a 2nd family in your workplace."
			}, {
				q: "What are your three favorite cuisines?",
				a: "Thai, Japanese, American."
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Turtle soup. They said, \x26#8220;It's healthy, and good for your skin.\x26#8221; Really?"
			}, {
				q: "If you were a superhero which superhero would you be?",
				a: "Superman."
			}, {
				q: "What is the best advice you've ever gotten?",
				a: "Be humble. From humility comes wisdom of life."
			}]
		}, {
			name: "Evan",
			location: "New York",
			position: "User Interface Engineer",
			pic: "evan",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "The people."
			}, {
				q: "What are you 3 favorite cuisines?",
				a: "Bacon, steak, bacon."
			}, {
				q: "If you were a Superhero which Superhero would you be?",
				a: "Spiderman."
			}, {
				q: "What are the names of your three favorite books?",
				a: "The Fountainhead, The Power of One, Chronicles of Tao."
			}]
		}, {
			name: "Frank",
			location: "Halle/Saale",
			position: "VP, Products",
			pic: "frank",
			question: [{
				q: "How would you explain Datameer software to an eight-year old child?",
				a: "Big boys play with big toys."
			}, {
				q: "What is your favorite beer and why?",
				a: "The only beer worth calling beer, is German Pils (except Cologne beer, which is thin and served in glasses that are too small."
			}, {
				q: "What is the best advice you've ever gotten?",
				a: "\x26#8220;Just trust me\x26#8221;, when Stefan predicts the future."
			}, {
				q: "What is the weirdest thing to ever happen to you?",
				a: "I was lost on a lonely island for several days. When I was a student at university, we took a sailing trip and a storm came up. We were randomly stranded on an island that turned out to be a former GDR military base evacuated in 1989."
			}]
		}, {
			name: "Frieder",
			location: "Halle/Saale",
			position: "Authorized Representative of Datameer GmbH",
			pic: "frieder",
			question: [{
				q: "Quote:",
				a: "\x26#8220;Silence is a source of great strength.\x26#8221; \x26ndash; Lao Tzu."
			}]
		}, {
			name: "Georg",
			location: "Halle/Saale",
			position: "User Interface Designer",
			pic: "georg",
			question: [{
				q: "How would you explain Datameer software to an eight-year old?",
				a: "You have a lot of toys everywhere in your room. You put all the toys in the Datameer box. You push a button and every single toy gets its own place in your room. Now you leave your room with the Datameer box. When you check your box, it has created a nice and colorful drawing for you. The drawing shows you how many toys you have and where you can find it in your room. Later, the drawing will show you what new toys you may want that are missing from your room."
			}, {
				q: "What is your favorite beer and why?",
				a: "Becks \x26#8211; because it is brewed with real hops and not with hops extract."
			}, {
				q: "What are the names of your three favorite books?",
				a: "The City of Dreaming Books by Walter Moers\x3cbr /\x3e Bartimaeus (Jonathan Stroud)\x3cbr /\x3e Betty Blue (Philippe Djian)"
			}, {
				q: "You've been given access to a time machine.  Where and when would you travel to?",
				a: "Back to nineteen-twenties and study at the Bauhaus of course."
			}]
		}, {
			name: "Hans-Henning",
			location: "San Mateo",
			position: "Data Scientist",
			pic: "hans",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Datameer rhymes with beer."
			}, {
				q: "What do you do at Datameer?",
				a: "Either I entertain my collegues with my latest speed dating stories or I invent new algorithms."
			}, {
				q: "What are your three favorite cuisines?",
				a: "Yasmin, Steinweg, Halle\x3cbr /\x3eHabana Social Club, Valencia St., San Francisco\x3cbr /\x3eSouth Pine Cafe, Pine St, Nevada City."
			}, {
				q: "What is the weirdest thing that has ever happened to you?",
				a: "Being mistaken for a DJ 5 times in a row within a month at different places far apart from each other."
			}, {
				q: "What is the best advice you ever received?",
				a: "Life begins where your comfort zone ends."
			}]
		}, {
			name: "Hector",
			location: "San Mateo",
			position: "Account Development Manager",
			pic: "hector",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "I never stop learning."
			}, {
				q: "If you could have dinner with three famous people, living or dead, who would it be?",
				a: "FDR, John Elway and Natalie Portman."
			}, {
				q: "What are the names of your three favorite books?",
				a: "The Big Short, How Soccer Explains the World and The Giver."
			}, {
				q: "What are the names of your three favorite movies?",
				a: "Godfather II, Good Will Hunting and Knocked Up."
			}]
		}, {
			name: "Holger",
			location: "Halle/Saale",
			position: "Java Developer",
			pic: "holger",
			question: [{
				q: "How would you explain Datameer software to an eight-year old child?",
				a: "A pot of ashened lentils we need to sort,\x3cbr /\x3eHelp me pick through them, please come forth,\x3cbr /\x3eThe good ones must be put in the dish,\x3cbr /\x3eThe bad ones you may eat if you wish."
			}, {
				q: "What is in your refrigerator right now?",
				a: "Tofu, tofu, tofu."
			}, {
				q: "What are your three favorite cuisines?",
				a: "Vegan dishes influenced by the Indian, Mediterranean and Thai cuisine."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Charles Bronson, a band from Chicago."
			}]
		}, {
			name: "Jeff",
			location: "San Mateo",
			position: "Vice President of Sales, West",
			pic: "jeff",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "I love working for a fast paced and energetic company that is focused in on a hot space (Big Data). Datameer is a very exciting place to be."
			}, {
				q: "What is in your refrigerator right now?",
				a: "Diet Coke and German Beer. What more do you need?"
			}, {
				q: "What was the last book you read?",
				a: "Pillars of the Earth. Awesome read!"
			}, {
				q: "What is the best advice you've ever received?",
				a: "Don't confuse activity with accomplishment."
			}]
		}, {
			name: "Joe",
			location: "San Mateo",
			position: "VP, Marketing",
			pic: "joe",
			question: [{
				q: "What is your favorite thing you do at Datameer?",
				a: "I love talking to people and explaining what we do, coolest job in the world."
			}, {
				q: "What food(s) will you never eat?",
				a: "Eggplant and beets."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Neil Young"
			}, {
				q: "You've been given access to a time machine. Where and when would you travel to?",
				a: "The American West, early 1800's."
			}]
		}, {
			name: "Johannes",
			location: "Halle/Saale",
			position: "Java Developer/Hadoop Expert",
			pic: "johannes",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Challenging work and changing challenges. Colleagues and friends I like, trust and from whom I still can learn even after knowing them for years."
			}, {
				q: "If you could have dinner with 3 famous people, living or dead, who would it be?",
				a: "Albert Einstein, Ramakrishna Paramahamsa, and Marilyn Monroe."
			}, {
				q: "If Hollywood made a movie about your life, whom would you like to see play the lead role as you?",
				a: "Brad Pitt might be able to do it."
			}, {
				q: "Where are you from and what brought you to Halle, Germany?",
				a: "Born in Transylvania, grew up a bit Thuringia, a bit more in Naumburg Saxony-Anhalt, studied in Leipzig, met our CEO and ended up in Halle."
			}]
		}, {
			name: "Jon",
			location: "San Mateo",
			position: "Director of Finance",
			pic: "jon",
			question: [{
				q: "Why is Datameer so different?",
				a: "We have the greatest people ever, all of whom work together to achieve a common goal of success, and we have fun doing it."
			}, {
				q: "What is the weirdest thing to ever happen to you?",
				a: "Two things 1) I hit a kangaroo with a rental car on Kangaroo Island in Australia, 2) I broke three bones and one helmet in two separate snowboarding incidents six days apart in Jackson, WY while I was living there."
			}, {
				q: "What's the strangest thing you have ever done?",
				a: "I've done lots of strange things...most of which happened during the six months I spent in Australia \x26#8220;studying\x26#8221; abroad. I can't share these things on the internet. They were all worth it, though."
			}, {
				q: "If Hollywood made a movie about your life, whom would you like to see play the lead role as you?",
				a: "One of the lesser known Baldwin Brothers, perhaps the one in The Usual Suspects."
			}]
		}, {
			name: "J\x26ouml;rg",
			location: "Halle/Saale",
			position: "UI-Developer",
			pic: "joerg",
			question: [{
				q: "Quote",
				a: "\x26#8220;Silence is the secret to sanity.\x26#8221; - Astrid Alauda."
			}]
		}, {
			name: "Karen",
			location: "San Mateo",
			position: "HR Generalist",
			pic: "karen",
			question: [{
				q: "Why is Datameer so different?",
				a: "I love the positive energy, we laugh and chat during lunch, and the teamwork."
			}, {
				q: "If you could be a mixed drink what drink would you be and why?",
				a: "A Hawaiian Sunrise - It has wonderful layers of sweet goodness, but a sneaky punch, and must have an umbrella."
			}, {
				q: "If Hollywood made a movie about your life, who would you like to see play the lead role as you? ",
				a: "Maggie Q because it would definitely be about my former fantasy life as a spy or a kung fu master."
			}, {
				q: "What's the strangest thing you have ever done?",
				a: "I put on my jeans to go to work. All day I was horribly uncomfortable and beating myself up, thinking that I gained a bunch of weight. When I got home and changed my clothes there was good news and bad news. The good news... they weren't my pants. The bad news... they were my husband's."
			}]
		}, {
			name: "Karla",
			location: "San Mateo",
			position: "Executive Assistant and Office Manager",
			pic: "karla",
			question: [{
				q: "Why is Datameer so different?",
				a: "Datameer has heart! Datameer cares for our community, takes action with environmental and social issues - both within our company and globally."
			}, {
				q: "If you could be a mixed drink what drink would you be and why?",
				a: "Strawberry daiquiri - sweet with a little kick."
			}, {
				q: "If you were a superhero which superhero would you be?",
				a: "Wonder Woman"
			}, {
				q: "What is the weirdest thing to ever happen to you? ",
				a: "Broke right leg, then broke it again a week after cast was removed - ouch!"
			}]
		}, {
			name: "Kathrin",
			location: "Halle/Saale",
			position: "Quality Assurance Software Tester",
			pic: "kathrin",
			question: [{
				q: "Why is Datameer so different?",
				a: "Datameer is a big family and it's my second family.  I like working and celebrating with the team."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Slipknot"
			}, {
				q: "What are the names of your three favorite books?",
				a: "Fantasy: Temeraire (Part 1-6)\x3cbr /\x3eEragon (Part 1-4)\x3cbr /\x3eand Lord of the Rings"
			}, {
				q: "If you were a Star Wars character, which one would it be?",
				a: "Darth Vader! When I tell my boyfriend what to do, he always says, \x26#8220;Yes, Lord Vader!\x26#8221;"
			}]
		}, {
			name: "Kelly",
			location: "New York",
			position: "Java Developer",
			pic: "kelly",
			question: [{
				q: "How would you explain Datameer software to an eight-year old child?",
				a: "We make it as easy to use many computers as it is to use one."
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Calf's Brain."
			}, {
				q: "If you were a superhero which superhero would you be?",
				a: "Batman."
			}, {
				q: "You've been given access to a time machine. Where and when would you travel to?",
				a: "Paris in the 1920s."
			}, {
				q: "What's the strangest thing you have ever done?",
				a: "Worked for the music industry."
			}]
		}, {
			name: "Lale",
			location: "San Mateo",
			position: "Talent Acquisition Manager",
			pic: "lale",
			question: [{
				q: "What do you do at Datameer?",
				a: "I get to look for others to join the party, the journey, the fun..."
			}, {
				q: "What are 3 fun facts about you?",
				a: "One day I fully intend to experience the art of herding sheep. I love Sahelian thunder storms. Listening to Abba makes me happy!"
			}, {
				q: "If you had a plane ticket to go anywhere in the world, where would you go?",
				a: "Timbuktu, Mali (for the Festival in the Desert)."
			}, {
				q: "Weirdest thing that has ever happened to you?",
				a: "I once went on an interview, unknowing that a coat hanger was caught on the back of my jacket."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Goran Bregovic Wedding and Funeral Band."
			}]
		}, {
			name: "Marko",
			location: "Halle/Saale",
			position: "Java Developer",
			pic: "marko",
			question: [{
				q: "How would you explain Datameer software to an eight-year old child?",
				a: "Imagine that I work at a construction site. Most of the other workers use tools like hammers or shovels, but I use the big, loud and dirty Datameer excavators."
			}, {
				q: "What is in your refrigerator right now?",
				a: "Beer for me, carrot salad for my girlfriend and baby food for our son."
			}, {
				q: "What are the names of your three favorite books?",
				a: "House of Leaves (Das Haus)\x3cbr /\x3e The Swarm (Der Schwarm)\x3cbr /\x3e Vineland"
			}, {
				q: "What is the best advice you've ever received?",
				a: "Don't eat yellow snow."
			}]
		}, {
			name: "Martin",
			location: "Halle/Saale",
			position: "Team Leader Software Development/Software Architect",
			pic: "martin",
			question: [{
				q: "What is your favorite thing you do at Datameer?",
				a: "Finding the reason for slow code execution."
			}, {
				q: "If you had a plane ticket to go anywhere in the world, where would you go?",
				a: "They don't have airports there."
			}, {
				q: "What is your favorite beer and why?",
				a: "Jever. Try it and you will never ask why."
			}]
		}, {
			name: "Matt S.",
			location: "San Mateo",
			position: "Director, Solutions Engineering",
			pic: "matt",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "We're nimble. My real passion is helping us achieve product market fit. As a young, agile company with a world class engineering team, we're able to respond extremely quickly and shape an entirely new type of product in a way that big companies simply can't. Watching the product evolve, literally every day, is gratifying."
			}, {
				q: "What are your three favorite cuisines?",
				a: "Vietnamese\x3cbr /\x3eJapanese\x3cbr /\x3eBurritoese!"
			}, {
				q: "If you were a tree or animal what kind would you be?",
				a: "People tell me I'm a monkey.  Long arms and big fat ears... they come in handy."
			}, {
				q: "What's the strangest thing you have ever done?",
				a: "According to some people... quit my job and travel the world"
			}]
		}, {
			name: "Mike",
			location: "Halle/Saale",
			position: "Java Developer",
			pic: "mike",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "I love working with the friendly and helpful team."
			}, {
				q: "What are your three favorite cuisines?",
				a: "Schnitzel, Nudeln, Bratwurst with Sauerkraut."
			}, {
				q: "You've been given access to a time machine.  Where and when would you travel to?",
				a: "I'd like to travel to ancient Egypt and see the great pyramids when they were new."
			}]
		}, {
			name: "Natalie",
			location: "San Mateo",
			position: "Executive Assistant",
			pic: "natalie",
			question: [{
				q: "Why is Datameer so different?",
				a: "I wake up every morning and actually want to go into work.  I'm sure you can't say that for every job.  The people, the atmosphere, the culture, everything at Datameer is just amazing."
			}, {
				q: "If you had one superpower what would it be?",
				a: "To teleport, definitely to teleport! I could be in Italy while I'm on my lunch break right now! And I'd never have to drive or take the plane anywhere again."
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Fried tarantula."
			}, {
				q: "What is your favorite pastime?",
				a: "Cooking while drinking a glass of wine... or a bottle!"
			}]
		}, {
			name: "Peter",
			location: "Halle/Saale",
			position: "Quality Assurance Software Tester",
			pic: "peter_r",
			question: [{
				q: "What is your favorite thing about working for Datameer?",
				a: "Working with a fantastic team and creating an awesome product."
			}, {
				q: "What is your favorite beer and why?",
				a: "Staropramen - It is from Prague and the Czechs make better beer than the Germans."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Leonard Cohen"
			}, {
				q: "What is the best advice you've ever gotten?",
				a: "All the world says, yes, that's written in books but now let us see for ourselves - Life of Galileo by Bertolt Brecht."
			}]
		}, {
			name: "Peter",
			location: "Halle/Saale",
			position: "Quality Assurance",
			pic: "peter_s",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Everyone at Datameer is committed to teamwork. If you need help, you'll always get it."
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Fried grasshopper"
			}, {
				q: "If you were a superhero, what superhero would you be?",
				a: "Hulk"
			}, {
				q: "You've been given access to a time machine. Where and when would you travel to?",
				a: "1000 years in the future, to see how the earth develops."
			}]
		}, {
			name: "Peter",
			location: "Cologne",
			position: "Chief Technical Officer",
			pic: "peter_v",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "For me it is working with the most amazing team I could imagine. Being able to work with nice people makes every day at Datameer fun."
			}, {
				q: "What are the names of your 3 favorite books?",
				a: "Siddhartha, Sand in Gottes M\x26uuml;hlen, Java Puzzlers."
			}, {
				q: "If you had a plane ticket to go anywhere in the world where would you go?",
				a: "Bali."
			}, {
				q: "You've been given access to a time machine. Where and when would you travel to?",
				a: "I would travel to the time when I was a kid to recall the good times that I had and take some more pictures."
			}]
		}, {
			name: "Richard",
			location: "San Mateo",
			position: "Enterprise Account Manager",
			pic: "guzzo",
			question: [{
				q: "Why is Datameer so different?",
				a: "Datameer is like no company I have ever worked for, close nit, great ideas, and everyone is open to hear your feedback."
			}, {
				q: "What is the strangest thing you\u2019ve ever eaten?",
				a: "Braised ox cheek was a little odd sounding, had it in Paris, turned out to be one of the most enjoyable dinners I have ever had."
			}, {
				q: "What are the names of your three favorite books?",
				a: "Great Gatsby, To Kill a Mockingbird, Of Mice and Men."
			}, {
				q: "What are the names of your three favorite movies?",
				a: "Godfather 2, The Departed, Django Unchained."
			}, {
				q: "What is the best advice you've ever received?",
				a: "Best advice I ever received was from my dad \x26#8220;Son, between work and sleep that\u2019s 2/3rds of your life make sure you have a comfortable bed, and love your job\x26#8221;"
			}]
		}, {
			name: "Simone",
			location: "San Mateo",
			position: "Video Editor",
			pic: "simone",
			question: [{
				q: "Why is Datameer so different?",
				a: "I really like how much of a technical company Datameer is but the tools are focused on usability."
			}, {
				q: "Describe the best meal you've ever eaten",
				a: "Burger with pork belly on top instead of bacon - Possibly the best and worst burger I've ever had. Such good flavor but too many calories in one sitting. Haha! I was pretty much sweating while eating it. I usually don't eat like that but it was too good not to."
			}, {
				q: "What is your favorite beer and why?",
				a: "Death and Taxes - You get the smoked and dark flavors of a porter or stout but the drinkability of a lager."
			}, {
				q: "If someone wrote a biography about you, what do you think the title should be?",
				a: "'Door Life - The Life of a Doorman'. I've had so many conversations with all kinds of people while working the door at a bar/restaurant. I've also made friends with a lot of the street people in the neighborhood and there's an interesting dynamic between the different classes of people in this city."
			}]
		}, {
			name: "Sirko",
			location: "Halle/Saale",
			position: "System Administrator",
			pic: "sirko",
			question: [{
				q: "Why is Datameer so different?",
				a: "It's like a family."
			}, {
				q: "If you could be a mixed drink what drink would you be and why?",
				a: "A tequilla sunrise, because this drink makes me happy when I drink it."
			}, {
				q: "If you could have dinner with 3 famous people, living or dead, who would it be?",
				a: "Einstein, Al Capone and Snoop Doggy Dog :D"
			}, {
				q: "What is the best advice you have ever received?",
				a: "Money alone doesn't make you happy."
			}]
		}, {
			name: "Stefan",
			location: "San Mateo",
			position: "Chief Executive Officer",
			pic: "stefan",
			question: [{
				q: "What do you do at Datameer?",
				a: "Circus Director"
			}, {
				q: "What is in your refrigerator right now?",
				a: "Literally, 2 take out order menus."
			}, {
				q: "What is the weirdest thing to ever happen to you?",
				a: "I was very sick and went to the drugstore to get cold medicine. I saw a brand name I was familiar with and bought it. Later that day I gave a tech conference presentation, but I was incredibly sleepy, could not concentrate or speak very clearly. It turns out I bought NyQuil when I should have bought DayQuil."
			}, {
				q: "You've been given access to a time machine.  Where and when would you travel to?",
				a: "The day we have first contact with a species from another planet."
			}]
		}, {
			name: "Stefanie",
			location: "Halle/Saale",
			position: "HR Generalist",
			pic: "stefanie",
			question: [{
				q: "Why is Datameer so different?",
				a: "We are not like a company, we are a family!"
			}, {
				q: "If you could be a mixed drink what drink would you be and why?",
				a: "Mai Tai - strong, sweet, fruity and sour - sounds like me (yes, I can be \x26#8220;sour\x26#8221; sometimes too) :)"
			}, {
				q: "If you had a plane ticket to go anywhere in the world where would you go?",
				a: "Tokyo - to visit friends."
			}, {
				q: "What are three fun facts about you?",
				a: "My nickname in high school was \x26#8220;Fighting Smurf \x26#8211; Kampfschlumpf\x26#8221; because of karate\x3cbr /\x3eMy second toes are bigger than my big toes.\x3cbr /\x3eI love karaoke"
			}]
		}, {
			name: "Steffen",
			location: "Halle/Saale",
			position: "QA Engineer Test Engineer",
			pic: "steffen",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Achieving company goals with one big family!"
			}, {
				q: "If you could be a mixed drink, what drink would you be and why?",
				a: "I'd like to be a Long Island Iced Tea, because its like Datameer - the mixture of the individuals are blazing."
			}, {
				q: "If Hollywood made a movie about your life, who would you like to see play the lead role as you?",
				a: "A mixture between George Clooney and Kevin James."
			}, {
				q: "If you had a plane ticket to go anywhere in the world where would you go?",
				a: "Mexico"
			}]
		}, {
			name: "Steve E.",
			location: "East Coast",
			position: "Solutions Engineer",
			pic: "steve_e",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "Working with a great team, and learning the Datameer product and all the related big data technologies."
			}, {
				q: "Describe the best meal you've ever eaten",
				a: "Every meal when I visited Germany (not just saying that - Sausage and Sauerkraut are my favorite)."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Coldplay and Foo Fighters"
			}, {
				q: "What are 3 fun facts about you?",
				a: "I play ice hockey\x3cbr /\x3eI have 4 kids who also play ice hockey\x3cbr /\x3eI can eat 4,000 calories in a single meal - preferably at Taco Bell or McDonalds."
			}]
		}, {
			name: "Steve S.",
			location: "East Coast",
			position: "Java Developer",
			pic: "steve_s",
			question: [{
				q: "Why is Datameer so different?",
				a: "The CEO is a great guy who is passionate about the product and the people. All good things flow from there."
			}, {
				q: "If you could have dinner with three famous people, living or dead, who would it be?",
				a: "Galileo, Newton, and Einstein."
			}, {
				q: "If someone wrote a biography about you, what do you think the title should be?",
				a: "\x26#8220;Why would you want this book? It's just Steve\x26#8221;"
			}, {
				q: "If Hollywood made a movie about your life, who would you like to see play the lead role as you?",
				a: "Richard Simmons"
			}, {
				q: "Who is your favorite musician or band?",
				a: "Too tough. Rolling Stones, Rage Against the Machine, Jesus and Mary Chain, Gang of 4, Stevie Wonder, Catherine Wheel, Led Zepplin, The National, Beach House, Jeff Beck the list goes on..."
			}]
		}, {
			name: "Thomas",
			location: "Halle/Saale",
			position: "Software Developer",
			pic: "thomas",
			question: [{
				q: "Why is Datameer so different?",
				a: "At Datameer you can meet people looking like punks \x26#8211; but with the intelligence of Nobel prize laureates."
			}, {
				q: "What is your favorite beer and why?",
				a: "Radeberger \x26mdash; I'll show you during next company meeting in Halle."
			}, {
				q: "Who is your favorite musician or band?",
				a: "Metallica and a German one, Westernhagen."
			}, {
				q: "If you could be a mixed drink what drink would you be and why?",
				a: "Campari-orange \x26#8212; from the outside it looks innocent."
			}]
		}, {
			name: "Tim",
			location: "San Mateo",
			position: "Solution Engineer, West",
			pic: "tim",
			question: [{
				q: "Why is Datameer so different?",
				a: "It's the only big data analytics company with a single product for the entire data pipeline."
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Solidified duck blood in Vietnam \x26mdash; yes, it was gross."
			}, {
				q: "If you could have dinner with three famous people, living or dead, who would it be?",
				a: "Alexis de Tocqueville, Richard Feinman, and the guy from the Dos Equis commercials."
			}, {
				q: "What are the names of your three favorite book?",
				a: "Zen and the Art of Motorcycle Maintenance, The Leopard, The Adventures of TinTin."
			}]
		}, {
			name: "Ulrich",
			location: "San Mateo",
			position: "Data Scientist",
			pic: "ulrich",
			question: [{
				q: "What is your favorite thing about working at Datameer?",
				a: "The things we discuss during lunch: should we buy four blocks of Detroit real estate?"
			}, {
				q: "What is the strangest thing you've ever eaten?",
				a: "Living squid (in Japan). It had pigments moving strangely all over its skin."
			}, {
				q: "What is in your refrigerator right now?",
				a: "German sausage, beer and a shoehorn (don't ask)."
			}, {
				q: "What is your favorite beer and why?",
				a: "Augustiner Hell. It's from a local brewery in my hometown, Munich, Germany. It's not available in the US unfortunately. I sometimes wonder whether if it would be worth smuggling in a few bottles when traveling back to the US."
			}]
		}, {
			name: "Will",
			location: "Halle/Saale",
			position: "Technical Writer",
			pic: "will_b",
			question: [{
				q: "How would you explain Datameer software to an eight-year old child?",
				a: "We take a messy room (unstructured data) and turn it into an orderly room (neatly visualized data). Any questions? Ah... no, good. Now, go run \x26#8216;Datameer\x26#8217; on the petabytes of unstructuredness you have created upstairs!"
			}, {
				q: "What is your favorite beer and why?",
				a: "I think this is a trick question..."
			}, {
				q: "What are the names of your 3 favorite books?",
				a: "Starship Troopers, Ender's Game, and The Hitch Hiker's Guide to the Galaxy."
			}, {
				q: "You've been given access to a time machine. Where and when would you travel to?",
				a: "To infinity and beyond!"
			}]
		}, {
			name: "Will",
			location: "New York",
			position: "Software Development Engineer",
			pic: "will_k",
			question: [{
				q: "Why is Datameer so different?",
				a: "We're very distributed geographically for a company of our size; that's because we believe in bringing the best people on board, wherever they may be."
			}, {
				q: "If you could be a mixed drink what drink would you be and why?",
				a: "I'd be an Appletini because then I'd be so popular."
			}, {
				q: "What are 3 fun facts about you?",
				a: "I bat and throw left-handed; I have never been hang-gliding; I like the taste of celery all right, but I can't stand those fibers."
			}, {
				q: "If someone wrote a biography about you, what do you think the title should be?",
				a: "\x26quot;Hammer of the Gods: The Will Koshuta Saga\x26quot;"
			}]
		}]
	};
	d.prototype.contains = function(a) {
		for (var b = 0, c = this.length; b < c && this[b] !== a; b++);
		return b < c
	};
	var e = function(a) {
		"mouseenter" == a.type ? b(a.currentTarget).find(".descDiv").fadeTo(300, 0.6) : b(a.currentTarget).find(".descDiv").fadeTo(300, 0)
	}, k = function(a) {
			a = b(a.currentTarget).attr("nr");
			var d = b(c(p[a].pic, !1, !0));
			d.removeClass("overview").addClass("detail ui-corner-left");
			for (var e = '\x3cdiv class\x3d"detailsDiv"\x3e\x3cspan class\x3d"nameSpanDetail"\x3e' + p[a].name + '\x3c/span\x3e\x3cbr /\x3e\x3cspan class\x3d"positionSpan"\x3e' + p[a].position + "\x3c/span\x3e \x3c/div\x3e", f = b('\x3cdiv id\x3d"qa"\x3e\x3c/div\x3e'), k = b('\x3cdiv id\x3d"paginator" data-nrOfqa\x3d"' + p[a].question.length + '"\x3e\x3cimg src\x3d"../../images/btn-prev-inactive.png" id\x3d"prev"\x3e\x3cimg src\x3d"../../images/btn-next.png" alt\x3d"" id\x3d"next"\x3e\x3c/div\x3e'), k = b('\x3cdiv id\x3d"paginator" data-nrOfqa\x3d"' +
					p[a].question.length + '"\x3e\x3cimg src\x3d"../../images/btn-prev-inactive.png" id\x3d"prev"\x3e\x3cimg src\x3d"../../images/btn-next.png" alt\x3d"" id\x3d"next"\x3e\x3c/div\x3e'), l = 0, m = p[a].question.length; l < m; l++) {
				var n = b('\x3cdiv id\x3d"step_' + l + '" class\x3d"stepDiv' + (0 < l ? "" : " active") + '"\x3e\x3c/div\x3e'),
					y = '\x3cspan class\x3d"question"\x3eQ: ' + p[a].question[l].q + "\x3c/span\x3e\x3cbr/\x3e\x3cbr/\x3e",
					B = '\x3cspan class\x3d"answer"\x3e' + p[a].question[l].a + "\x3c/span\x3e";
				b(n).append(y, B);
				b(f).append(n)
			}
			e =
				b(e);
			e.append(f, k);
			b("#detailsView").html("").append('\x3cdiv id\x3d"close"\x3e\x3c/div\x3e', d, e).addClass("active").show();
			b("#detailsView").draggable({
				containment: "document"
			});
			b("#prev, #next").on("click", r);
			b("#close").on("click", function() {
				g()
			})
		}, l = function(a) {
			var c = b("#detailsView.active");
			27 === a.keyCode && 0 !== c.length && g()
		}, r = function(a) {
			a = b(a.currentTarget);
			var c = a.attr("id"),
				d = parseInt(b(".stepDiv.active").attr("id").split("_")[1]),
				e = parseInt(a.closest("div").attr("data-nrOfqa")),
				f = d + 1,
				g = d -
					1;
			"next" === c ? f !== e && (f === e - 1 && a.attr("src", "../../images/btn-next-inactive.png"), 1 === f && b("#prev").attr("src", "../../images/btn-prev.png"), b("#step_" + d).removeClass("active"), b("#step_" + f).addClass("active")) : 0 !== d && (1 === d && a.attr("src", "../../images/btn-prev-inactive.png"), g < e - 1 && b("#next").attr("src", "../../images/btn-next.png"), b("#step_" + d).removeClass("active"), b("#step_" + g).addClass("active"))
		}, p, n = function(d) {
			d = d || f;
			var g = [];
			p = d.employee;
			d = b("\x3cdiv\x3e");
			for (var n = 0; 25 > n; n++) {
				for (var r = a.floor(a.random() *
					p.length); g.contains(r);) r = a.floor(a.random() * p.length);
				var C = 1 == n || 7 == n || 21 == n || 10 == n || 14 == n,
					x = 5 == n || 10 == n || 15 == n || 14 == n,
					z = 10 == n || 15 == n,
					D = 14 === n,
					y = p[r],
					B = y.pic,
					F = b,
					G = "",
					L = !C ? B : "",
					G = G + (!C ? "imgDiv" : "emptyDiv"),
					G = G + (z ? " right" : ""),
					G = G + (x ? " big" : ""),
					G = G + (D ? " stretch" : ""),
					z = F('\x3cdiv id\x3d"' + L + '" class\x3d"' + G + '"  nr\x3d"' + r + '"\x3e\x3c/div\x3e');
				C || (C = b(c(B, x, !1)), B = b, D = x, x = b('\x3cdiv class\x3d"' + (D ? "descDiv big" : "descDiv") + '"\x3e'), F = b("\x3cspan\x3e" + y.name + "\x3c/span\x3e\x3cbr /\x3e"), x.append(F),
					D && (D = b('\x3cimg src\x3d"../../images/white_arrow.png" class\x3d"arrow"\x3e'), y = b('\x3cspan class\x3d"position"\x3e' + y.position + "\x3c/span\x3e"), x.append(y, D)), x = B(x), z.append(x, C));
				d.append(z);
				g.push(r)
			}
			b("#cultureContainer").append(d);
			b(".imgDiv").on("hover", e);
			b(".imgDiv").on("click", k);
			b(m).keyup(l)
		};
	window.modules.culture.initModule = function() {
		n();
		b.ajax({
			url: "https://www.flickr.com/badge_code_v2.gne?show_name\x3d1\x26count\x3d6\x26display\x3drandom\x26size\x3ds\x26layout\x3dv\x26source\x3duser\x26user\x3d68860424%40N06",
			type: "GET",
			dataType: "script"
		}).success(function() {
			for (var a = b_txt.match(RegExp("\x3cs*a[^\x3e]*\x3e(.*?)\x3cs*/s*a\x3e", "g")), c = 0, d = a.length; c < d; c++) b(a[c]).appendTo("#flickr")
		})
	}
})(jQuery, document, Array, Math);
(function(b, m, d) {
	m.modules = m.modules || {};
	m.modules.googleAnalytics = m.modules.googleAnalytics || {};
	var a;
	a = a || [];
	var c = function() {
		var b = d.createElement("script"),
			c = d.getElementsByTagName("script")[0];
		a.push(["_setAccount", "UA-15829911-1"]);
		a.push(["_trackPageview"]);
		b.type = "text/javascript";
		b.async = !0;
		b.src = ("https:" == d.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
		c.parentNode.insertBefore(b, c)
	};
	m.modules.googleAnalytics.initModule = function() {
		b(d).ready(c)
	}
})(jQuery, window,
	document);
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.ieExtention = m.modules.ieExtention || {};
	var d = function() {
		m.PIE && b(".initPIE").each(function() {
			PIE.attach(this)
		})
	};
	m.modules.ieExtention.initModule = function() {
		d()
	}
})(jQuery, window);
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.flexSlider = m.modules.flexSlider || {};
	var d = function() {
		b(document).ready(function() {
			b(".flexslider").flexslider({
				height: 400,
				slideshow: !0
			})
		})
	};
	m.modules.flexSlider.initModule = function() {
		d()
	}
})(jQuery, window);
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.leadLanderTracking = m.modules.leadLanderTracking || {};
	llactid = 17071;
	var d = function() {
		var a = document.createElement("script");
		a.src = "/assets/js/trackalyze.js";
		document.body.appendChild(a)
	};
	m.modules.leadLanderTracking.initModule = function() {
		b(document).ready(d)
	}
})(jQuery, window);
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.marketoForm = m.modules.marketoForm || {};
	m.modules.marketoForm.initModule = function() {}
})(jQuery, window);
(function(b, m, d) {
	m.modules = m.modules || {};
	m.modules.marketoTracking = m.modules.marketoTracking || {};
	m.modules.marketoTracking.initModule = function() {
		var a = d.createElement("script");
		a.src = d.location.protocol + "//munchkin.marketo.net/munchkin.js";
		a.onload = function() {
			"function" === typeof mktoMunchkin && mktoMunchkin("061-BGC-590")
		};
		d.body.appendChild(a)
	}
})(jQuery, window, document);
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.menue = m.modules.menue || {};
	var d, a, c;
	d = function() {
		b(m).scroll(function() {
			c = 0;
			"number" === typeof m.pageYOffset ? c = m.pageYOffset : document.body && document.body.scrollTop ? c = document.body.scrollTop : document.documentElement && document.documentElement.scrollTop && (c = document.documentElement.scrollTop);
			a = c;
			480 <= a ? (b("#menu").css({
				position: "fixed"
			}), b("#logo_menu").fadeIn("medium")) : (b("#menu").css({
				position: "relative"
			}), b("#logo_menu").fadeOut("medium"))
		})
	};
	m.modules.menue.initModule =
		function() {
			d()
	}
})(jQuery, window);
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.menueAllwaysTop = m.modules.menueAllwaysTop || {};
	m.modules.menueAllwaysTop.initModule = function() {
		b("#tabs").css("paddingLeft", (b("#wrapp-content").width() - b("#tabs").width()) / 2);
		b("#menu").css("position", "fixed");
		b("#logo_menu").css({
			display: "block",
			marginLeft: "-15px"
		})
	}
})(jQuery, window);
/*(function(b, m) {
	var d = null,
		a = null,
		c = null,
		g = null;
	m.modules = m.modules || {};
	m.modules.onlineInstance = m.modules.onlineInstance || {};
	d = function() {
		var a = document.getElementById("mktForm_1116"),
			c = !1,
			d = null,
			d = null,
			g = "",
			m = 0;
		try {
			Mkto.recomputeMessages()
		} catch (p) {}
		if (!Mkto.pageSubmitted) {
			for (m = 0; m < a.elements.length; m++) d = a.elements[m], Mkto.validateField(d) || (c = !0);
			if (!c) return b.browser.msie && "9.0" == b.browser.version ? (d = new XDomainRequest, d.onerror = function() {
				Mkto.addField(a, "hidden", "retURL", "http://www.datameer.com/thankyou-freetrial.html?status\x3d500");
				Mkto.addField(a, "hidden", "returnURL", "http://www.datameer.com/thankyou-freetrial.html?status\x3d500");
				Mkto.formSubmit(a)
			}, d.ontimeout = function() {
				Mkto.addField(a, "hidden", "retURL", "http://www.datameer.com/thankyou-freetrial.html?status\x3d504");
				Mkto.addField(a, "hidden", "returnURL", "http://www.datameer.com/thankyou-freetrial.html?status\x3d504");
				Mkto.formSubmit(a)
			}, d.onload = function() {
				Mkto.addField(a, "hidden", "retURL", "http://www.datameer.com/thankyou-freetrial.html");
				Mkto.addField(a, "hidden", "returnURL",
					"http://www.datameer.com/thankyou-freetrial.html");
				Mkto.formSubmit(a)
			}, d.open("POST", "http://online-demo-cgi.datameer.com/cgi-bin/aVr8crp9bTW2dSjt8Egtt4G48EhhzSxiC8v?email\x3d" + encodeURIComponent(b("#Email").val()) + "\x26FirstName\x3d" + encodeURIComponent(b("#FirstName").val()) + "\x26LastName\x3d" + encodeURIComponent(b("#LastName").val())), d.send()) : (b.ajax({
				type: "POST",
				url: "http://online-demo-cgi.datameer.com/cgi-bin/aVr8crp9bTW2dSjt8Egtt4G48EhhzSxiC8v",
				data: {
					email: b("#Email").val(),
					FirstName: b("#FirstName").val(),
					LastName: b("#LastName").val()
				},
				async: !1
			}).always(function(b, c) {
				"timeout" === c ? g = "?status\x3d504" : "success" !== c && (g = b.status ? "?status\x3d" + b.status : "?status\x3d500");
				Mkto.addField(a, "hidden", "retURL", "http://www.datameer.com/thankyou-freetrial.html" + g);
				Mkto.addField(a, "hidden", "returnURL", "http://www.datameer.com/thankyou-freetrial.html" + g)
			}), Mkto.formSubmit(a)), !1
		}
	};
	a = function() {};
	c = function() {
		b("#registrationContainer").slideToggle("slow", a)
	};
	g = function() {
		m.open("https://online-demo.datameer.com/authentication/oauth/send-authentication-request?state\x3dfacebook,true",
			"blank", "scrollbars\x3dno,toolbar\x3dno,width\x3d710,height\x3d310")
	};
	m.modules.onlineInstance.initModule = function() {
		b("#mktFrmSubmit").on("click", d);
		b("#noFacebookAccountClick").on("click", c);
		b("#facebookLoginButton").on("click", g)
	}
})(jQuery, window);*/
(function(b, m) {
	m.modules = m.modules || {};
	m.modules.upcomingEventsMenue = m.modules.upcomingEventsMenue || {};
	var d = function() {
		b("#tickbox .open").on("click", function() {
			b("#tickbox .desc").is(":hidden") ? jQuery("#tickbox").animate({
				width: 250
			}, "medium", function() {
				b("#tickbox .desc").fadeIn("fast")
			}) : jQuery("#tickbox .desc").fadeOut("fast", function() {
				jQuery("#tickbox").animate({
					width: 35
				}, "slow")
			})
		})
	};
	m.modules.upcomingEventsMenue.initModule = function() {
		d()
	}
})(jQuery, window);
window.XDomainRequest && jQuery.ajaxTransport(function(b) {
	if (b.crossDomain && b.async) {
		b.timeout && (b.xdrTimeout = b.timeout, delete b.timeout);
		var m;
		return {
			send: function(d, a) {
				function c(b, c, d, k) {
					m.onload = m.onerror = m.ontimeout = jQuery.noop;
					m = void 0;
					a(b, c, d, k)
				}
				m = new XDomainRequest;
				m.onload = function() {
					c(200, "OK", {
						text: m.responseText
					}, "Content-Type: " + m.contentType)
				};
				m.onerror = function() {
					c(404, "Not Found")
				};
				m.onprogress = jQuery.noop;
				m.ontimeout = function() {
					c(0, "timeout")
				};
				m.timeout = b.xdrTimeout || Number.MAX_VALUE;
				m.open(b.type, b.url);
				m.send(b.hasContent && b.data || null)
			},
			abort: function() {
				m && (m.onerror = jQuery.noop, m.abort())
			}
		}
	}
});