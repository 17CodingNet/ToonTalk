 /*
 * rational.js - Javascript tools and libraries based around rational numbers.
 * Copyright (C) 2013 Dylan Ferris
 *
 * This file is part of rational.js.
 *
 * rational.js is free software: you may redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * rational.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with rational.js.  If not, see <http://www.gnu.org/licenses/>.
 */

// Ken Kahn pretty printed and removed physics and polyrat support (Jan 2014 and August 2015)

(function(_global) {
	"use strict";
	var shim = {};
	if (typeof (exports) === 'undefined') {
		if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
			shim.exports = {};
			define(function() {
				return shim.exports;
			}
			);
		} else {
			// browser, define in global
			shim.exports = typeof (window) !== 'undefined' ? window : _global;
		}
	} 
	else {
		// commonjs, define in exports
		shim.exports = exports;
	}
	(function(exports) {
		var integer = {
			greatest_common_divisor: function(a, b) {
				if (1 === b || 1 === a)
					return 1;
				for (var c; 0 !== b; ) {
					c = b;
					b = a % b;
					if (!isFinite(b))
						return 0;
					a = c
				}
				return a
			}
		};
		integer.gcd = integer.greatest_common_divisor;
		integer.fromRandom = function(a) {
			return Math.random() * (1 << a) >>> 0
		}
		;
		integer.fromMillitime = function() {
			return +new Date
		}
		;
		integer.fromUnixtime = function() {
			return .001 * integer.fromMillitime() | 0
		}
		;
		"undefined" !== typeof exports && (exports.integer = integer);
		(function(a) {
			function b(a, n, d) {
				if (d !== c)
					return a instanceof b ? a : "undefined" === typeof a ? e : b.parse(a);
				for (a = a || []; a.length && !a[a.length - 1]; )
					--a.length;
				this._d = a;
				this._s = a.length ? n || 1 : 0
			}
			var c = {};
			b._construct = function(a, e) {
				return new b(a,e,c)
			}
			;
			b.base = 1E7;
			b.base_log10 = 7;
			var e = new b([],0,c);
			b.ZERO = e;
			var d = new b([1],1,c);
			b.ONE = d;
			var f = new b(d._d,-1,c);
			b.M_ONE = f;
			b._0 = e;
			b._1 = d;
			b.small = [e, d, new b([2],1,c), new b([3],1,c), new b([4],1,c), new b([5],1,c), new b([6],1,c), new b([7],1,c), new b([8],1,c), new b([9],1,
			c), new b([10],1,c), new b([11],1,c), new b([12],1,c), new b([13],1,c), new b([14],1,c), new b([15],1,c), new b([16],1,c), new b([17],1,c), new b([18],1,c), new b([19],1,c), new b([20],1,c), new b([21],1,c), new b([22],1,c), new b([23],1,c), new b([24],1,c), new b([25],1,c), new b([26],1,c), new b([27],1,c), new b([28],1,c), new b([29],1,c), new b([30],1,c), new b([31],1,c), new b([32],1,c), new b([33],1,c), new b([34],1,c), new b([35],1,c), new b([36],1,c)];
			b.digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
			b.prototype.toString = 
			function(a) {
				a = +a || 10;
				if (2 > a || 36 < a)
					throw Error("illegal radix " + a + ".");
				if (0 === this._s)
					return "0";
				if (10 === a) {
					a = 0 > this._s ? "-" : "";
					a += this._d[this._d.length - 1].toString();
					for (var c = this._d.length - 2; 0 <= c; c--) {
						for (var e = this._d[c].toString(); 7 > e.length; )
							e = "0" + e;
						a += e
					}
					return a
				}
				c = b.digits;
				a = b.small[a];
				for (var e = this._s, d = this.abs(), f = [], k; 0 !== d._s; )
					k = d.divRem(a),
					d = k[0],
					k = k[1],
					f.push(c[k.valueOf()]);
				return (0 > e ? "-" : "") + f.reverse().join("")
			}
			;
			b.radixRegex = [/^$/, /^$/, /^[01]*$/, /^[012]*$/, /^[0-3]*$/, /^[0-4]*$/, /^[0-5]*$/, 
			/^[0-6]*$/, /^[0-7]*$/, /^[0-8]*$/, /^[0-9]*$/, /^[0-9aA]*$/, /^[0-9abAB]*$/, /^[0-9abcABC]*$/, /^[0-9a-dA-D]*$/, /^[0-9a-eA-E]*$/, /^[0-9a-fA-F]*$/, /^[0-9a-gA-G]*$/, /^[0-9a-hA-H]*$/, /^[0-9a-iA-I]*$/, /^[0-9a-jA-J]*$/, /^[0-9a-kA-K]*$/, /^[0-9a-lA-L]*$/, /^[0-9a-mA-M]*$/, /^[0-9a-nA-N]*$/, /^[0-9a-oA-O]*$/, /^[0-9a-pA-P]*$/, /^[0-9a-qA-Q]*$/, /^[0-9a-rA-R]*$/, /^[0-9a-sA-S]*$/, /^[0-9a-tA-T]*$/, /^[0-9a-uA-U]*$/, /^[0-9a-vA-V]*$/, /^[0-9a-wA-W]*$/, /^[0-9a-xA-X]*$/, /^[0-9a-yA-Y]*$/, /^[0-9a-zA-Z]*$/];
			b.parse = function(a, d) {
				function f(a) {
					a = 
					a.replace(/\s*[*xX]\s*10\s*(\^|\*\*)\s*/, "e");
					return a.replace(/^([+\-])?(\d+)\.?(\d*)[eE]([+\-]?\d+)$/, function(a, b, c, m, e) {
						e = +e;
						var d = 0 > e
						  , n = c.length + e;
						a = (d ? c : m).length;
						e = (e = Math.abs(e)) >= a ? e - a + d : 0;
						a = Array(e + 1).join("0");
						c += m;
						return (b || "") + (d ? c = a + c : c += a).substr(0, n += d ? a.length : 0) + (n < c.length ? "." + c.substr(n) : "")
					}
					)
				}
				a = a.toString();
				if ("undefined" === typeof d || 10 === +d)
					a = f(a);
				var p = (new RegExp("^([+\\-]?)(" + ("undefined" === typeof d ? "0[xcb]" : 16 == d ? "0x" : 8 == d ? "0c" : 2 == d ? "0b" : "") + ")?([0-9a-z]*)(?:\\.\\d*)?$",
				"i")).exec(a);
				if (p) {
					var g = p[1] || "+"
					  , k = p[2] || ""
					  , p = p[3] || "";
					if ("undefined" === typeof d)
						d = "0x" === k || "0X" === k ? 16 : "0c" === k || "0C" === k ? 8 : "0b" === k || "0B" === k ? 2 : 10;
					else if (2 > d || 36 < d)
						throw Error("Illegal radix " + d + ".");
					d = +d;
					if (!b.radixRegex[d].test(p))
						throw Error("Bad digit for radix " + d);
					p = p.replace(/^0+/, "").split("");
					if (0 === p.length)
						return e;
					g = "-" === g ? -1 : 1;
					if (10 == d) {
						for (k = []; 7 <= p.length; )
							k.push(parseInt(p.splice(p.length - b.base_log10, b.base_log10).join(""), 10));
						k.push(parseInt(p.join(""), 10));
						return new b(k,
						g,c)
					}
					k = e;
					d = b.small[d];
					for (var l = b.small, h = 0; h < p.length; h++)
						k = k.multiply(d).add(l[parseInt(p[h], 36)]);
					return new b(k._d,g,c)
				}
				throw Error("Invalid BigInteger format: " + a);
			}
			;
			b.prototype.add = function(a) {
				if (0 === this._s)
					return b(a);
				a = b(a);
				if (0 === a._s)
					return this;
				if (this._s !== a._s)
					return a = a.negate(),
					this.subtract(a);
				var e = this._d;
				a = a._d;
				for (var d = e.length, f = a.length, g = Array(Math.max(d, f) + 1), k = Math.min(d, f), l = 0, h = 0; h < k; h++)
					l = e[h] + a[h] + l,
					g[h] = l % 1E7,
					l = l / 1E7 | 0;
				f > d && (e = a,
				d = f);
				for (h = k; l && h < d; h++)
					l = e[h] + l,
					g[h] = 
					l % 1E7,
					l = l / 1E7 | 0;
				for (l && (g[h] = l); h < d; h++)
					g[h] = e[h];
				return new b(g,this._s,c)
			}
			;
			b.prototype.negate = function() {
				return new b(this._d,-this._s | 0,c)
			}
			;
			b.prototype.abs = function() {
				return 0 > this._s ? this.negate() : this
			}
			;
			b.prototype.subtract = function(a) {
				if (0 === this._s)
					return b(a).negate();
				a = b(a);
				if (0 === a._s)
					return this;
				if (this._s !== a._s)
					return a = a.negate(),
					this.add(a);
				var d = this;
				0 > this._s && (d = new b(a._d,1,c),
				a = new b(this._d,1,c));
				var f = d.compareAbs(a);
				if (0 === f)
					return e;
				if (0 > f) {
					var g = a;
					a = d;
					d = g
				}
				d = d._d;
				a = a._d;
				var g = 
				d.length, q = a.length, k = Array(g), l = 0, h, t;
				for (h = 0; h < q; h++)
					t = d[h] - l - a[h],
					0 > t ? (t += 1E7,
					l = 1) : l = 0,
					k[h] = t;
				for (h = q; h < g; h++) {
					t = d[h] - l;
					if (0 > t)
						t += 1E7;
					else {
						k[h++] = t;
						break
					}
					k[h] = t
				}
				for (; h < g; h++)
					k[h] = d[h];
				return new b(k,f,c)
			}
			;
			(function() {
				function a(e, d) {
					for (var m = e._d, f = m.slice(), n = 0; ; ) {
						var g = (m[n] || 0) + 1;
						f[n] = g % 1E7;
						if (9999999 >= g)
							break;
						++n
					}
					return new b(f,d,c)
				}
				function e(a, d) {
					for (var m = a._d, f = m.slice(), n = 0; ; ) {
						var g = (m[n] || 0) - 1;
						if (0 > g)
							f[n] = g + 1E7;
						else {
							f[n] = g;
							break
						}
						++n
					}
					return new b(f,d,c)
				}
				b.prototype.next = function() {
					switch (this._s) {
					case 0:
						return d;
					case -1:
						return e(this, -1);
					default:
						return a(this, 1)
					}
				}
				;
				b.prototype.prev = function() {
					switch (this._s) {
					case 0:
						return f;
					case -1:
						return a(this, -1);
					default:
						return e(this, 1)
					}
				}
			}
			)();
			b.prototype.compareAbs = function(a) {
				if (this === a)
					return 0;
				if (!(a instanceof b)) {
					if (!isFinite(a))
						return isNaN(a) ? a : -1;
					a = b(a)
				}
				if (0 === this._s)
					return 0 !== a._s ? -1 : 0;
				if (0 === a._s)
					return 1;
				var c = this._d.length
				  , e = a._d.length;
				if (c < e)
					return -1;
				if (c > e)
					return 1;
				e = this._d;
				a = a._d;
				for (--c; 0 <= c; c--)
					if (e[c] !== a[c])
						return e[c] < a[c] ? -1 : 1;
				return 0
			}
			;
			b.prototype.compare = 
			function(a) {
				if (this === a)
					return 0;
				a = b(a);
				return 0 === this._s ? -a._s : this._s === a._s ? this.compareAbs(a) * this._s : this._s
			}
			;
			b.prototype.isUnit = function() {
				return this === d || this === f || 1 === this._d.length && 1 === this._d[0]
			}
			;
			b.prototype.multiply = function(a) {
				if (0 === this._s)
					return e;
				a = b(a);
				if (0 === a._s)
					return e;
				if (this.isUnit())
					return 0 > this._s ? a.negate() : a;
				if (a.isUnit())
					return 0 > a._s ? this.negate() : this;
				if (this === a)
					return this.square();
				var d = this._d.length >= a._d.length, f = (d ? this : a)._d, d = (d ? a : this)._d, g = f.length, q = d.length, 
				k = g + q, l = Array(k), h;
				for (h = 0; h < k; h++)
					l[h] = 0;
				for (h = 0; h < q; h++) {
					for (var k = 0, t = d[h], w = g + h, v, u = h; u < w; u++)
						v = l[u] + t * f[u - h] + k,
						k = v / 1E7 | 0,
						l[u] = v % 1E7 | 0;
					k && (v = l[u] + k,
					l[u] = v % 1E7)
				}
				return new b(l,this._s * a._s,c)
			}
			;
			b.prototype.multiplySingleDigit = function(a) {
				if (0 === a || 0 === this._s)
					return e;
				if (1 === a)
					return this;
				var d;
				if (1 === this._d.length)
					return d = this._d[0] * a,
					1E7 <= d ? new b([d % 1E7 | 0, d / 1E7 | 0],1,c) : new b([d],1,c);
				if (2 === a)
					return this.add(this);
				if (this.isUnit())
					return new b([a],1,c);
				var f = this._d
				  , g = f.length;
				d = g + 1;
				for (var q = 
				Array(d), k = 0; k < d; k++)
					q[k] = 0;
				for (var l = k = 0; l < g; l++)
					d = a * f[l] + k,
					k = d / 1E7 | 0,
					q[l] = d % 1E7 | 0;
				k && (q[l] = k);
				return new b(q,1,c)
			}
			;
			b.prototype.square = function() {
				if (0 === this._s)
					return e;
				if (this.isUnit())
					return d;
				var a = this._d, f = a.length, g = Array(f + f + 1), p, q, k, l;
				for (l = 0; l < f; l++)
					k = 2 * l,
					p = a[l] * a[l],
					q = p / 1E7 | 0,
					g[k] = p % 1E7,
					g[k + 1] = q;
				for (l = 0; l < f; l++) {
					q = 0;
					k = 2 * l + 1;
					for (var h = l + 1; h < f; h++,
					k++)
						p = a[h] * a[l] * 2 + g[k] + q,
						q = p / 1E7 | 0,
						g[k] = p % 1E7;
					k = f + l;
					p = q + g[k];
					q = p / 1E7 | 0;
					g[k] = p % 1E7;
					g[k + 1] += q
				}
				return new b(g,1,c)
			}
			;
			b.prototype.quotient = function(a) {
				return this.divRem(a)[0]
			}
			;
			b.prototype.divide = b.prototype.quotient;
			b.prototype.remainder = function(a) {
				return this.divRem(a)[1]
			}
			;
			b.prototype.divRem = function(a) {
				a = b(a);
				if (0 === a._s)
					throw Error("Divide by zero");
				if (0 === this._s)
					return [e, e];
				if (1 === a._d.length)
					return this.divRemSmall(a._s * a._d[0]);
				switch (this.compareAbs(a)) {
				case 0:
					return [this._s === a._s ? d : f, e];
				case -1:
					return [e, this]
				}
				var g = this._s * a._s, r = a.abs(), p = this._d, q = p.length, k = [], l, h = new b([],0,c);
				for (h._s = 1; q; )
					if (h._d.unshift(p[--q]),
					0 > h.compareAbs(a))
						k.push(0);
					else {
						if (0 === 
						h._s)
							l = 0;
						else {
							var t = h._d.length;
							l = r._d.length;
							t = 1E7 * h._d[t - 1] + h._d[t - 2];
							l = 1E7 * r._d[l - 1] + r._d[l - 2];
							h._d.length > r._d.length && (t = 1E7 * (t + 1));
							l = Math.ceil(t / l)
						}
						do {
							t = r.multiplySingleDigit(l);
							if (0 >= t.compareAbs(h))
								break;
							l--
						} while (l);k.push(l);
						l && (l = h.subtract(t),
						h._d = l._d.slice(),
						0 === h._d.length && (h._s = 0))
					}
				return [new b(k.reverse(),g,c), new b(h._d,this._s,c)]
			}
			;
			b.prototype.divRemSmall = function(a) {
				a = +a;
				if (0 === a)
					throw Error("Divide by zero");
				var d = this._s * (0 > a ? -1 : 1);
				a = Math.abs(a);
				if (1 > a || 1E7 <= a)
					throw Error("Argument out of range");
				if (0 === this._s)
					return [e, e];
				if (1 === a || -1 === a)
					return [1 === d ? this.abs() : new b(this._d,d,c), e];
				if (1 === this._d.length) {
					var f = new b([this._d[0] / a | 0],1,c);
					a = new b([this._d[0] % a | 0],1,c);
					0 > d && (f = f.negate());
					0 > this._s && (a = a.negate());
					return [f, a]
				}
				for (var g = this._d.slice(), f = Array(g.length), q = 0, k = 0, l = 0, h; g.length; )
					q = 1E7 * q + g[g.length - 1],
					q < a ? (f[l++] = 0,
					g.pop(),
					k = 1E7 * k + q) : (h = 0 === q ? 0 : q / a | 0,
					k = q - a * h,
					(f[l++] = h) ? (g.pop(),
					q = k) : g.pop());
				a = new b([k],1,c);
				0 > this._s && (a = a.negate());
				return [new b(f.reverse(),d,c), a]
			}
			;
			b.prototype.isEven = 
			function() {
				var a = this._d;
				return 0 === this._s || 0 === a.length || 0 === a[0] % 2
			}
			;
			b.prototype.isOdd = function() {
				return !this.isEven()
			}
			;
			b.prototype.sign = function() {
				return this._s
			}
			;
			b.prototype.isPositive = function() {
				return 0 < this._s
			}
			;
			b.prototype.isNegative = function() {
				return 0 > this._s
			}
			;
			b.prototype.isZero = function() {
				return 0 === this._s
			}
			;
			b.prototype.exp10 = function(a) {
				a = +a;
				if (0 === a)
					return this;
				if (Math.abs(a) > Number(g))
					throw Error("exponent too large in BigInteger.exp10");
				if (0 < a) {
					for (var d = new b(this._d.slice(),this._s,
					c); 7 <= a; a -= 7)
						d._d.unshift(0);
					if (0 == a)
						return d;
					d._s = 1;
					d = d.multiplySingleDigit(Math.pow(10, a));
					return 0 > this._s ? d.negate() : d
				}
				if (-a >= 7 * this._d.length)
					return e;
				d = new b(this._d.slice(),this._s,c);
				for (a = -a; 7 <= a; a -= 7)
					d._d.shift();
				return 0 == a ? d : d.divRemSmall(Math.pow(10, a))[0]
			}
			;
			b.prototype.pow = function(a) {
				if (this.isUnit())
					return 0 < this._s ? this : b(a).isOdd() ? this : this.negate();
				a = b(a);
				if (0 === a._s)
					return d;
				if (0 > a._s) {
					if (0 === this._s)
						throw Error("Divide by zero");
					return e
				}
				if (0 === this._s)
					return e;
				if (a.isUnit())
					return this;
				if (0 < a.compareAbs(g))
					throw Error("exponent too large in BigInteger.pow");
				for (var c = this, f = d, p = b.small[2]; a.isPositive() && (!a.isOdd() || (f = f.multiply(c),
				!a.isUnit())); )
					c = c.square(),
					a = a.quotient(p);
				return f
			}
			;
			b.prototype.modPow = function(a, c) {
				for (var e = d, f = this; a.isPositive(); )
					a.isOdd() && (e = e.multiply(f).remainder(c)),
					a = a.quotient(b.small[2]),
					a.isPositive() && (f = f.square().remainder(c));
				return e
			}
			;
			b.prototype.log = function() {
				switch (this._s) {
				case 0:
					return -Infinity;
				case -1:
					return NaN
				}
				var a = this._d.length;
				if (30 > 
				7 * a)
					return Math.log(this.valueOf());
				var d = Math.ceil(30 / 7)
				  , e = this._d.slice(a - d);
				return Math.log((new b(e,1,c)).valueOf()) + (a - d) * Math.log(1E7)
			}
			;
			b.prototype.valueOf = function() {
				return parseInt(this.toString(), 10)
			}
			;
			b.prototype.toJSValue = function() {
				return parseInt(this.toString(), 10)
			}
			;
			var g = b(2147483647);
			b.MAX_EXP = g;
			(function() {
				function a(c) {
					return function(a) {
						return c.call(b(a))
					}
				}
				function c(a) {
					return function(c, d) {
						return a.call(b(c), b(d))
					}
				}
				function d(a) {
					return function(c, d, e) {
						return a.call(b(c), b(d), b(e))
					}
				}
				(function() {
					var e, f, g = "toJSValue isEven isOdd sign isZero isNegative abs isUnit square negate isPositive toString next prev log".split(" "), l = "compare remainder divRem subtract add quotient divide multiply pow compareAbs".split(" "), h = ["modPow"];
					for (e = 0; e < g.length; e++)
						f = g[e],
						b[f] = a(b.prototype[f]);
					for (e = 0; e < l.length; e++)
						f = l[e],
						b[f] = c(b.prototype[f]);
					for (e = 0; e < h.length; e++)
						f = h[e],
						b[f] = d(b.prototype[f]);
					b.exp10 = function(a, c) {
						return b(a).exp10(c)
					}
				}
				)()
			}
			)();
			a.BigInteger = b
		}
		)("undefined" !== typeof exports ? 
		exports : this);
		var bigint = {
			greatest_common_divisor: function(a, b) {
				if (b.isUnit() || a.isUnit())
					return BigInteger.ONE;
				for (var c; !b.isZero(); )
					c = b,
					b = a.remainder(b),
					a = c;
				return a
			},
			create: function() {
				return [0]
			},
			clone: function(a) {
				for (var b = [], c = 0, e = a.length; c < e; c++)
					b[c] = a[c];
				return b
			},
			copy: function(a, b) {
				a = [];
				for (var c = 0, e = b.length; c < e; c++)
					a[c] = b[c];
				return a
			},
			abs: function(a, b) {
				a[0] = Math.abs(b[0]);
				return a
			},
			str: function(a) {
				return a[0].toString()
			},
			toInteger: function(a) {
				return out[0]
			},
			fromInteger: function(a) {
				return [parseInt(a)]
			}
		};
		bigint.ZERO = bigint.fromInteger(0);
		bigint.ONE = bigint.fromInteger(1);
		"undefined" !== typeof exports && (exports.bigint = bigint);
		if (!RAT_ARRAY_TYPE)
			var RAT_ARRAY_TYPE = Array;
		if (!RAT_INFINITESIMAL_PRECISION)
			var RAT_INFINITESIMAL_PRECISION = Math.pow(2, 56);
		if (!RAT_MAX_LOOPS)
			var RAT_MAX_LOOPS = 16777216;
		var rat = {
			EPSILON: 2E-16
		};
		rat.MAX_LOOPS = RAT_MAX_LOOPS;
		rat.create = function() {
			var a = new RAT_ARRAY_TYPE(2);
			a[0] = 0;
			a[1] = 1;
			return a
		}
		;
		rat.clone = function(a) {
			var b = new RAT_ARRAY_TYPE(2);
			b[0] = a[0];
			b[1] = a[1];
			return b
		}
		;
		rat.fromValues = function(a, b) {
			var c = new RAT_ARRAY_TYPE(2);
			c[0] = a;
			c[1] = b;
			return rat.normalize(c, c)
		}
		;
		rat.copy = function(a, b) {
			a[0] = b[0];
			a[1] = b[1];
			return a
		}
		;
		rat.set = function(a, b, c) {
			a[0] = b;
			a[1] = c;
			return rat.normalize(a, a)
		}
		;
		rat.abs = function(a, b) {
			a[0] = Math.abs(b[0]);
			a[1] = b[1];
			return a
		}
		;
		rat.invert = function(a, b) {
			var c = b[0];
			a[0] = b[1];
			a[1] = c;
			return a
		}
		;
		rat.reciprocal = rat.invert;
		rat.add = function(a, b, c) {
			b[1] === c[1] ? (a[0] = b[0] + c[0],
			a[1] = b[1]) : (a[0] = b[0] * c[1] + c[0] * b[1],
			a[1] = b[1] * c[1]);
			return rat.normalize(a, a)
		}
		;
		rat.subtract = function(a, b, c) {
			b[1] === c[1] ? (a[0] = b[0] - c[0],
			a[1] = b[1]) : (a[0] = b[0] * c[1] - c[0] * b[1],
			a[1] = b[1] * c[1]);
			return rat.normalize(a, a)
		}
		;
		rat.sub = rat.subtract;
		rat.multiply = function(a, b, c) {
			a[0] = b[0] * c[0];
			a[1] = b[1] * c[1];
			return rat.normalize(a, a)
		}
		;
		rat.mul = rat.multiply;
		rat.mediant = function(a, b, c) {
			a[0] = b[0] + c[0];
			a[1] = b[1] + c[1];
			return rat.normalize(a, a)
		}
		;
		rat.divide = function(a, b, c) {
			a[0] = b[0] * c[1];
			a[1] = b[1] * c[0];
			return rat.normalize(a, a)
		}
		;
		rat.div = rat.divide;
		rat.equals = function(a, b) {
			return 0 === a[0] && 0 === b[0] || 0 === a[1] && 0 === b[1] ? !0 : a[0] === b[0] && a[1] === b[1]
		}
		;
		rat.approximates = function(a, b) {
			if (rat.equals(a, b))
				return !0;
			var c = rat.create();
			rat.sub(c, a, b);
			rat.abs(c, c);
			return rat.isLessThan(c, rat.INFINITESIMAL)
		}
		;
		rat.isGreaterThan = function(a, b) {
			return rat.equals(a, b) ? !1 : a[0] * b[1] > b[0] * a[1]
		}
		;
		rat.isLessThan = function(a, b) {
			return rat.equals(a, b) ? !1 : a[0] * b[1] < b[0] * a[1]
		}
		;
		rat.isNegative = function(a) {
			return 0 > a[0]
		}
		;
		rat.min = function(a, b, c) {
			rat.isLessThan(b, c) ? (a[0] = b[0],
			a[1] = b[1]) : (a[0] = c[0],
			a[1] = c[1]);
			return a
		}
		;
		rat.max = function(a, b, c) {
			rat.isGreaterThan(b, c) ? (a[0] = b[0],
			a[1] = b[1]) : (a[0] = c[0],
			a[1] = c[1]);
			return a
		}
		;
		rat.scalar_multiply = function(a, b, c) {
			a[0] = b[0] * c;
			a[1] = b[1];
			return rat.normalize(a, a)
		}
		;
		rat.scalar_divide = function(a, b, c) {
			a[0] = b[0];
			a[1] = b[1] * c;
			return rat.normalize(a, a)
		}
		;
		rat.normalize = function(a, b) {
			if (isNaN(b[0]) || isNaN(b[1]) || 0 === b[0] && 0 === b[1])
				return a[0] = 0,
				a[1] = 0,
				a;
			if (0 === b[0])
				return a[0] = 0,
				a[1] = 1,
				a;
			if (0 === b[1])
				return a[0] = 1,
				a[1] = 0,
				a;
			if (b[0] === b[1])
				return a[0] = 1,
				a[1] = 1,
				a;
			0 < b[1] ? (a[0] = b[0],
			a[1] = b[1]) : (a[0] = -b[0],
			a[1] = -b[1]);
			var c = integer.greatest_common_divisor(Math.abs(a[0]), a[1]);
			1 < c && (a[0] /= c,
			a[1] /= c);
			return a
		}
		;
		rat.opposite = function(a, b) {
			a[0] = -b[0];
			a[1] = b[1];
			return a
		}
		;
		rat.negative = rat.opposite;
		rat.neg = rat.opposite;
		rat.power = function(a, b, c) {
			2 === c ? (a[0] = b[0] * b[0],
			a[1] = b[1] * b[1]) : 0 < c ? (a[0] = Math.pow(b[0], c),
			a[1] = Math.pow(b[1], c)) : 0 > c ? (c = Math.abs(c),
			a[0] = Math.pow(b[1], c),
			a[1] = Math.pow(b[0], c)) : rat.copy(a, rat.ONE);
			return rat.normalize(a, a)
		}
		;
		rat.pow = rat.power;
		rat.sqrt = function(a, b) {
			return rat.nthRoot(a, b, 2)
		}
		;
		rat.nthRoot = function(a, b, c) {
			if (rat.equals(b, rat.ZERO))
				return rat.copy(a, rat.ZERO);
			if (rat.equals(b, rat.ONE))
				return rat.copy(a, rat.ONE);
			if (rat.equals(b, rat.INFINITY))
				return rat.copy(a, rat.INFINITY);
			if (rat.equals(b, rat.INFINULL))
				return rat.copy(a, rat.INFINULL);
			var e = rat.isNegative(b);
			e && (b[0] = -b[0]);
			a = rat.copy(a, rat.ONE);
			for (var d = [1, 0, 0, 1], f = rat.clone(rat.ONE), g = rat.MAX_LOOPS; !rat.approximates(b, f) && g--; )
				rat.isLessThan(b, f) ? (d[0] += d[1],
				d[2] += d[3]) : (d[1] += d[0],
				d[3] += d[2]),
				a[0] = d[0] + d[1],
				a[1] = d[2] + d[3],
				rat.pow(f, a, c);
			e && (b[0] = -b[0],
			1 === c % 2 && rat.neg(a, a));
			return a
		}
		;
		rat.dot = function(a, b) {
			return a[0] * b[0] + a[1] * b[1]
		}
		;
		rat.str = function(a) {
			return 1 === a[1] ? a[0].toString() : a[0] + "/" + a[1]
		}
		;
		rat.toDecimal = function(a) {
			return a[0] / a[1]
		}
		;
		rat.dec = rat.toDecimal;
		rat.toInteger = function(a) {
			return Math.round(rat.toDecimal(a))
		}
		;
		rat.round = rat.toInteger;
		rat.floor = function(a) {
			return Math.floor(rat.toDecimal(a))
		}
		;
		rat.ceil = function(a) {
			return Math.ceil(rat.toDecimal(a))
		}
		;
		rat.fromInteger_copy = function(a, b) {
			a[0] = parseInt(b);
			a[1] = 1;
			return a
		}
		;
		rat.fromInteger = function(a) {
			return rat.fromInteger_copy(rat.create(), a)
		}
		;
		rat.fromIntegerInverse_copy = function(a, b) {
			a[0] = 1;
			a[1] = parseInt(b);
			0 > a[1] && (a[0] = -a[0],
			a[1] = -a[1]);
			return a
		}
		;
		rat.fromIntegerInverse = function(a) {
			return rat.fromIntegerInverse_copy(rat.create(), a)
		}
		;
		rat.fromDecimal = function(a) {
			return rat.fromDecimal_copy(rat.create(), a)
		}
		;
		rat.fromDecimal_copy = function(a, b) {
			b = parseFloat(b);
			if (isNaN(b))
				return rat.copy(a, rat.INFINULL);
			if (Infinity === b)
				return rat.copy(a, rat.INFINITY);
			if (Math.abs(b) < rat.EPSILON)
				return rat.copy(a, rat.ZERO);
			if (Math.abs(b - 1) < rat.EPSILON)
				return rat.copy(a, rat.ONE);
			if (Math.abs(b % 1) < rat.EPSILON)
				return rat.fromInteger_copy(a, b);
			if (Math.abs(1 / b % 1) < rat.EPSILON)
				return rat.fromIntegerInverse_copy(a, Math.round(1 / b));
			rat.copy(a, rat.ONE);
			for (var c = [1, 0, 0, 1], e = b, d = 1, f = rat.MAX_LOOPS; f-- && Math.abs(b - rat.toDecimal(a)) > rat.EPSILON; )
				d = 
				Math.floor(e),
				a[0] = d * c[0] + c[2],
				a[1] = d * c[1] + c[3],
				e = 1 / (e - d),
				c[2] = c[0],
				c[3] = c[1],
				c[0] = a[0],
				c[1] = a[1];
			return a
		}
		;
		rat.fromRandom = function(a) {
			a[0] = 0xfffffffffffff * Math.random() << 0;
			a[1] = Math.abs(0xfffffffffffff * Math.random() << 0);
			return rat.normalize(a, a)
		}
		;
		rat.sin = function(a, b) {
			if (0 === b[1])
				return rat.copy(a, rat.ZERO);
			rat.scalar_multiply(a, b, 2);
			var c = rat.create();
			rat.pow(c, b, 2);
			rat.add(c, c, rat.ONE);
			rat.divide(a, a, c);
			return a
		}
		;
		rat.cos = function(a, b) {
			if (0 === b[1])
				return rat.neg(a, rat.ONE);
			var c = rat.create();
			rat.pow(c, b, 2);
			rat.sub(a, rat.ONE, c);
			var e = rat.create();
			rat.add(e, rat.ONE, c);
			rat.divide(a, a, e);
			return a
		}
		;
		rat.tan = function(a, b) {
			rat.scalar_multiply(a, b, 2);
			var c = rat.create();
			rat.pow(c, b, 2);
			rat.scalar_multiply(c, c, 2);
			rat.add(a, a, c);
			rat.pow(c, b, 4);
			rat.sub(c, rat.ONE, c);
			rat.divide(a, a, c);
			return a
		}
		;
		rat.toEgyptian = function(a) {
			a = rat.clone(a);
			rat.abs(a, a);
			var b = rat.floor(a);
			b && rat.sub(a, a, rat.fromInteger(b));
			if (!a[0])
				return b.toString();
			b || (b = "");
			for (var c = 1, e = rat.create(); 1 !== a[0]; )
				c++,
				e = rat.fromValues(1, c),
				rat.isGreaterThan(a, e) && (b && (b += " + "),
				b += rat.str(e),
				rat.sub(a, a, e));
			return a ? b ? b + " + " + rat.str(a) : rat.str(a) : b ? b : "0"
		}
		;
		rat.toBabylonian = function(a) {
			var b = ""
			  , c = rat.toDecimal(a);
			a = parseInt(c);
			for (var c = c - a, e = 0, d = 0; 0 < a; )
				(e = a % 60) && (b = e + " * 60^" + d + (b ? " + " : "") + b),
				a = (a - e) / 60,
				d++;
			for (d = -1; 0 < c; )
				c *= 60,
				e = parseInt(c + 1E-13),
				c -= e,
				-1E-13 > c || (e && (b += (b ? " + " : "") + e + " * 60^" + d),
				d--);
			return b ? b : "0"
		}
		;
		rat.traceSternBrocot = function(a) {
			var b = "";
			if (rat.equals(a, rat.ZERO) || rat.equals(a, rat.ONE) || rat.equals(a, rat.INFINITY) || rat.equals(a, rat.INFINULL))
				return b;
			a = rat.clone(a);
			rat.isNegative(a) && (a[0] = -a[0]);
			for (var c = rat.clone(rat.ONE), e = [1, 0, 0, 1], d = 0, f = 0, g = rat.MAX_LOOPS; !rat.approximates(a, c) && g--; )
				rat.isLessThan(a, c) ? (e[0] += e[1],
				e[2] += e[3],
				f++,
				d && (b += "R",
				1 !== d && (b += d),
				d = 0,
				b += " ")) : (e[1] += e[0],
				e[3] += e[2],
				d++,
				f && (b += "L",
				1 !== f && (b += f),
				f = 0,
				b += " ")),
				c[0] = e[0] + e[1],
				c[1] = e[2] + e[3];
			f ? (b += "L",
			1 !== f && (b += f)) : 
			d && (b += "R",
			1 !== d && (b += d));
			0 > g && (b += "...");
			return b
		}
		;
		rat.toContinuedFraction = function(a, b) {
			b = "undefined" === typeof b ? 65536 : parseInt(b);
			if (rat.equals(a, rat.ZERO))
				return [0];
			if (rat.equals(a, rat.ONE))
				return [1];
			if (rat.equals(a, rat.NEGONE))
				return [-1];
			if (rat.equals(a, rat.INFINITY))
				return [1, 0];
			if (rat.equals(a, rat.INFINULL))
				return [0, 0];
			var c = rat.clone(a)
			  , e = rat.isNegative(c);
			e && (c[0] = -c[0]);
			for (var d = rat.clone(rat.ONE), f = [1, 0, 0, 1], g = 1, m = [0], n = m.length - 1; !rat.equals(c, d) && b--; )
				rat.isLessThan(c, d) ? (-1 === g ? m[n]++ : (g = -1,
				m.push(1),
				n++),
				f[0] += f[1],
				f[2] += f[3]) : (1 === 
				g ? m[n]++ : (g = 1,
				m.push(1),
				n++),
				f[1] += f[0],
				f[3] += f[2]),
				d[0] = f[0] + f[1],
				d[1] = f[2] + f[3];
			0 > b ? m.push(0) : m[n]++;
			if (e)
				for (var r in m)
					m[r] = -m[r];
			return m
		}
		;
		rat.fromContinuedFraction = function(a, b) {
			rat.fromInteger_copy(a, b[b.length - 1]);
			for (var c = b.length - 2; -1 < c; c--)
				rat.invert(a, a),
				rat.add(a, rat.fromInteger(b[c]), a);
			return a
		}
		;
		rat.dump = function(a) {
			rat.create();
			return "rat\t" + rat.str(a) + "\n~\t" + rat.toDecimal(a) + "\nCF:\t[" + rat.toContinuedFraction(a) + "]\n"
		}
		;
		rat.ZERO = rat.fromInteger(0);
		rat.ONE = rat.fromInteger(1);
		rat.NEGONE = rat.fromInteger(-1);
		rat.INFINITY = rat.fromValues(1, 0);
		rat.INFINULL = rat.fromValues(0, 0);
		rat.INFINITESIMAL = rat.clone([1, RAT_INFINITESIMAL_PRECISION]);
		rat.PI = rat.fromValues(1320192667429, 420230377710);
		"undefined" !== typeof exports && (exports.rat = rat);
		if (!BIGRAT_INFINITESIMAL_PRECISION)
			var BIGRAT_INFINITESIMAL_PRECISION = new BigInteger("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
		if (!BIGRAT_MAX_LOOPS)
			var BIGRAT_MAX_LOOPS = 1073741824;
		var bigrat = {
			EPSILON: 2E-16
		};
		bigrat.MAX_LOOPS = BIGRAT_MAX_LOOPS;
		bigrat.create = function() {
			var a = [];
			a[0] = BigInteger.ZERO;
			a[1] = BigInteger.ONE;
			return a
		}
		;
		bigrat.clone = function(a) {
			var b = [];
			b[0] = a[0];
			b[1] = a[1];
			return b
		}
		;
		bigrat.fromValues = function(a, b) {
			var c = [];
			c[0] = new BigInteger(a);
			c[1] = new BigInteger(b);
			return bigrat.normalize(c, c)
		}
		;
		bigrat.copy = function(a, b) {
			a[0] = b[0];
			a[1] = b[1];
			return a
		}
		;
		bigrat.set = function(a, b, c) {
			a[0] = b;
			a[1] = c;
			return bigrat.normalize(a, a)
		}
		;
		bigrat.toRat = function(a, b) {
			return rat.set(a, b[0].toJSValue(), b[1].toJSValue())
		}
		;
		bigrat.fromRat = function(a, b) {
			return bigrat.set(a, BigInteger(b[0]), BigInteger(b[1]))
		}
		;
		bigrat.abs = function(a, b) {
			a[0] = b[0].abs();
			a[1] = b[1];
			return a
		}
		;
		bigrat.invert = function(a, b) {
			var c = b[0];
			a[0] = b[1];
			a[1] = c;
			return a
		}
		;
		bigrat.reciprocal = bigrat.invert;
		bigrat.add = function(a, b, c) {
			0 === b[1].compare(c[1]) ? (a[0] = b[0].add(c[0]),
			a[1] = b[1]) : (a[0] = b[0].multiply(c[1]).add(c[0].multiply(b[1])),
			a[1] = b[1].multiply(c[1]));
			return bigrat.normalize(a, a)
		}
		;
		bigrat.subtract = function(a, b, c) {
			0 === b[1].compare(c[1]) ? (a[0] = b[0].subtract(c[0]),
			a[1] = b[1]) : (a[0] = b[0].multiply(c[1]).subtract(c[0].multiply(b[1])),
			a[1] = b[1].multiply(c[1]));
			return bigrat.normalize(a, a)
		}
		;
		bigrat.sub = bigrat.subtract;
		bigrat.multiply = function(a, b, c) {
			a[0] = b[0].multiply(c[0]);
			a[1] = b[1].multiply(c[1]);
			return bigrat.normalize(a, a)
		}
		;
		bigrat.mul = bigrat.multiply;
		bigrat.mediant = function(a, b, c) {
			a[0] = b[0].add(c[0]);
			a[1] = b[1].add(c[1]);
			return bigrat.normalize(a, a)
		}
		;
		bigrat.divide = function(a, b, c) {
			a[0] = b[0].multiply(c[1]);
			a[1] = b[1].multiply(c[0]);
			return bigrat.normalize(a, a)
		}
		;
		bigrat.div = bigrat.divide;
		bigrat.equals = function(a, b) {
			return a[0].isZero() && b[0].isZero() || a[1].isZero() && b[1].isZero() ? !0 : 0 === a[0].compare(b[0]) && 0 === a[1].compare(b[1])
		}
		;
		bigrat.approximates = function(a, b) {
			if (bigrat.equals(a, b))
				return !0;
			var c = bigrat.create();
			bigrat.sub(c, a, b);
			bigrat.abs(c, c);
			return bigrat.isLessThan(c, bigrat.INFINITESIMAL)
		}
		;
		bigrat.isGreaterThan = function(a, b) {
			return bigrat.equals(a, b) ? !1 : 0 < a[0].multiply(b[1]).compare(b[0].multiply(a[1]))
		}
		;
		bigrat.isLessThan = function(a, b) {
			return bigrat.equals(a, b) ? !1 : 0 > a[0].multiply(b[1]).compare(b[0].multiply(a[1]))
		}
		;
		bigrat.isNegative = function(a) {
			return a[0].isNegative()
		}
		;
		bigrat.min = function(a, b, c) {
			bigrat.isLessThan(b, c) ? (a[0] = b[0],
			a[1] = b[1]) : (a[0] = c[0],
			a[1] = c[1]);
			return a
		}
		;
		bigrat.max = function(a, b, c) {
			bigrat.isGreaterThan(b, c) ? (a[0] = b[0],
			a[1] = b[1]) : (a[0] = c[0],
			a[1] = c[1]);
			return a
		}
		;
		bigrat.scalar_multiply = function(a, b, c) {
			a[0] = b[0].multiply(c);
			a[1] = b[1];
			return bigrat.normalize(a, a)
		}
		;
		bigrat.scalar_divide = function(a, b, c) {
			a[0] = b[0];
			a[1] = b[1].multiply(c);
			return bigrat.normalize(a, a)
		}
		;
		bigrat.normalize = function(a, b) {
			if (b[0].isZero() || b[1].isZero())
				return b;
			if (0 === b[0].compare(b[1]))
				return bigrat.clone(bigrat.ONE);
			if (b[1].isNegative())
				a[0] = b[0].negate(),
				a[1] = b[1].negate();
			else if (a[0] = b[0],
			a[1] = b[1],
			a[1].isZero())
				return a;
			var c = bigint.greatest_common_divisor(a[0].abs(), a[1]);
			0 < c.compare(BigInteger.ONE) && (a[0] = a[0].quotient(c),
			a[1] = a[1].quotient(c));
			return a
		}
		;
		bigrat.opposite = function(a, b) {
			a[0] = b[0].negate();
			a[1] = b[1];
			return a
		}
		;
		bigrat.negative = bigrat.opposite;
		bigrat.neg = bigrat.opposite;
		bigrat.power = function(a, b, c) {
			2 === c ? (a[0] = b[0].square(),
			a[1] = b[1].square()) : 0 < c ? (a[0] = b[0].pow(c),
			a[1] = b[1].pow(c)) : 0 > c ? (c = Math.abs(c),
			a[0] = b[1].pow(c),
			a[1] = b[0].pow(c)) : bigrat.copy(a, bigrat.ONE);
			return a
		}
		;
		bigrat.pow = bigrat.power;
		bigrat.sqrt = function(a, b) {
			return bigrat.nthRoot(a, b, 2)
		}
		;
		bigrat.nthRoot = function(a, b, c) {
			if (bigrat.equals(b, bigrat.ZERO))
				return bigrat.copy(a, bigrat.ZERO);
			if (bigrat.equals(b, bigrat.ONE))
				return bigrat.copy(a, bigrat.ONE);
			if (bigrat.equals(b, bigrat.INFINITY))
				return bigrat.copy(a, bigrat.INFINITY);
			if (bigrat.equals(b, bigrat.INFINULL))
				return bigrat.copy(a, bigrat.INFINULL);
			var e = bigrat.isNegative(b);
			e && (b[0] = b[0].negate());
			bigrat.copy(a, bigrat.ONE);
			for (var d = [BigInteger(1), BigInteger(0), BigInteger(0), BigInteger(1)], f = bigrat.clone(bigrat.ONE), g = BIGRAT_MAX_LOOPS; !bigrat.approximates(b, 
			f) && g--; )
				bigrat.isLessThan(b, f) ? (d[0] = d[0].add(d[1]),
				d[2] = d[2].add(d[3])) : (d[1] = d[1].add(d[0]),
				d[3] = d[3].add(d[2])),
				a[0] = d[0].add(d[1]),
				a[1] = d[2].add(d[3]),
				bigrat.pow(f, a, c);
			e && (b[0] = b[0].negate(),
			1 === c % 2 && bigrat.neg(a, a));
			return a
		}
		;
		bigrat.dot = function(a, b) {
			return a[0].multiply(b[0]).add(a[1].multiply(b[1]))
		}
		;
		bigrat.str = function(a) {
			return 0 === a[1].compare(BigInteger.ONE) ? a[0].toString() : a[0].toString() + "/" + a[1].toString()
		}
		;
		bigrat.toDecimal = function(a) {
			return a[0].toJSValue() / a[1].toJSValue()
		}
		;
		bigrat.dec = bigrat.toDecimal;
		bigrat.toInteger = function(a) {
			return a[0].quotient(a[1]).toJSValue()
		}
		;
		bigrat.round = bigrat.toInteger;
		bigrat.toBigInteger = function(a) {
			return a[0].quotient(a[1])
		}
		;
		bigrat.floor = function(a) {
			return Math.floor(bigrat.toDecimal(a))
		}
		;
		bigrat.ceil = function(a) {
			return Math.ceil(bigrat.toDecimal(a))
		}
		;
		bigrat.fromInteger_copy = function(a, b) {
			a[0] = BigInteger(b);
			a[1] = BigInteger.ONE;
			return a
		}
		;
		bigrat.fromInteger = function(a) {
			return bigrat.fromInteger_copy(bigrat.create(), a)
		}
		;
		bigrat.fromIntegerInverse_copy = function(a, b) {
			a[0] = BigInteger.ONE;
			a[1] = BigInteger(b);
			a[1].isNegative() && (a[0] = a[0].negate(),
			a[1] = a[1].negate());
			return a
		}
		;
		bigrat.fromIntegerInverse = function(a) {
			return bigrat.fromIntegerInverse_copy(bigrat.create(), a)
		}
		;
		bigrat.fromDecimal = function(a) {
			return bigrat.fromDecimal_copy(bigrat.create(), a)
		}
		;
		bigrat.fromDecimal_copy = function(a, b) {
			b = parseFloat(b);
			if (isNaN(b))
				return bigrat.copy(a, bigrat.INFINULL);
			if (Infinity === b)
				return bigrat.copy(a, bigrat.INFINITY);
			if (Math.abs(b) < bigrat.EPSILON)
				return bigrat.copy(a, bigrat.ZERO);
			if (Math.abs(b - 1) < bigrat.EPSILON)
				return bigrat.copy(a, bigrat.ONE);
			if (Math.abs(b % 1) < bigrat.EPSILON)
				return bigrat.fromInteger_copy(a, b);
			if (Math.abs(1 / b % 1) < bigrat.EPSILON)
				return bigrat.fromIntegerInverse_copy(a, Math.round(1 / b));
			bigrat.copy(a, bigrat.ONE);
			for (var c = [BigInteger(1), BigInteger(0), 
			BigInteger(0), BigInteger(1)], e = b, d = 1, f = bigrat.MAX_LOOPS; f-- && Math.abs(b - bigrat.toDecimal(a)) > bigrat.EPSILON; )
				d = Math.floor(e),
				a[0] = BigInteger(d * c[0] + c[2]),
				a[1] = BigInteger(d * c[1] + c[3]),
				e = 1 / (e - d),
				c[2] = c[0],
				c[3] = c[1],
				c[0] = a[0],
				c[1] = a[1];
			return a
		}
		;
		bigrat.fromRandom = function(a) {
			a[0] = BigInteger(0xfffffffffffff * Math.random() << 0);
			a[1] = BigInteger(Math.abs(0xfffffffffffff * Math.random() << 0));
			return bigrat.normalize(a, a)
		}
		;
		bigrat.sin = function(a, b) {
			if (b[1].isZero())
				return bigrat.copy(a, bigrat.ZERO);
			bigrat.scalar_multiply(a, b, 2);
			var c = bigrat.create();
			bigrat.pow(c, b, 2);
			bigrat.add(c, c, bigrat.ONE);
			bigrat.divide(a, a, c);
			return a
		}
		;
		bigrat.cos = function(a, b) {
			if (b[1].isZero())
				return bigrat.neg(a, bigrat.ONE);
			var c = bigrat.create();
			bigrat.pow(c, b, 2);
			bigrat.sub(a, bigrat.ONE, c);
			var e = bigrat.create();
			bigrat.add(e, bigrat.ONE, c);
			bigrat.divide(a, a, e);
			return a
		}
		;
		bigrat.tan = function(a, b) {
			bigrat.scalar_multiply(a, b, 2);
			var c = bigrat.create();
			bigrat.pow(c, b, 2);
			bigrat.scalar_multiply(c, c, 2);
			bigrat.add(a, a, c);
			bigrat.pow(c, b, 4);
			bigrat.sub(c, bigrat.ONE, c);
			bigrat.divide(a, a, c);
			return a
		}
		;
		bigrat.toEgyptian = function(a) {
			a = bigrat.clone(a);
			bigrat.abs(a, a);
			var b = bigrat.floor(a);
			b && bigrat.sub(a, a, bigrat.fromInteger(b));
			if (!a[0])
				return b.toString();
			b || (b = "");
			for (var c = 1, e = bigrat.create(); 1 !== a[0]; )
				c++,
				e = bigrat.fromValues(1, c),
				bigrat.isGreaterThan(a, e) && (b && (b += " + "),
				b += bigrat.str(e),
				bigrat.sub(a, a, e));
			return a ? b ? b + " + " + bigrat.str(a) : bigrat.str(a) : b ? b : "0"
		}
		;
		bigrat.toBabylonian = function(a) {
			var b = ""
			  , c = bigrat.toDecimal(a);
			a = parseInt(c);
			for (var c = c - a, e = 0, d = 0; 0 < a; )
				(e = a % 60) && (b = e + " * 60^" + d + (b ? " + " : "") + b),
				a = (a - e) / 60,
				d++;
			for (d = -1; 0 < c; )
				c *= 60,
				e = parseInt(c + 1E-13),
				c -= e,
				-1E-13 > c || (e && (b += (b ? " + " : "") + e + " * 60^" + d),
				d--);
			return b ? b : "0"
		}
		;
		bigrat.traceSternBrocot = function(a) {
			var b = "";
			if (bigrat.equals(a, bigrat.ZERO) || bigrat.equals(a, bigrat.ONE) || bigrat.equals(a, bigrat.INFINITY) || bigrat.equals(a, bigrat.INFINULL))
				return b;
			a = bigrat.clone(a);
			bigrat.isNegative(a) && (a[0] = a[0].negate());
			for (var c = bigrat.clone(bigrat.ONE), e = [BigInteger(1), BigInteger(0), BigInteger(0), BigInteger(1)], d = 0, f = 0, g = 65536; !bigrat.equals(a, c) && g--; )
				bigrat.isLessThan(a, c) ? (e[0] = e[0].add(e[1]),
				e[2] = e[2].add(e[3]),
				f++,
				d && (b += "R",
				1 !== d && (b += d),
				d = 0,
				b += " ")) : (e[1] = e[1].add(e[0]),
				e[3] = e[3].add(e[2]),
				d++,
				f && (b += "L",
				1 !== f && (b += f),
				f = 0,
				b += " ")),
				c[0] = e[0].add(e[1]),
				c[1] = e[2].add(e[3]);
			f ? (b += "L",
			1 !== f && (b += f)) : d && (b += "R",
			1 !== d && (b += d));
			0 > g && (b += "...");
			return b
		}
		;
		bigrat.toContinuedFraction = function(a, b) {
			b = "undefined" === typeof b ? 65536 : parseInt(b);
			if (bigrat.equals(a, bigrat.ZERO))
				return [0];
			if (bigrat.equals(a, bigrat.ONE))
				return [1];
			if (bigrat.equals(a, bigrat.NEGONE))
				return [-1];
			if (bigrat.equals(a, bigrat.INFINITY))
				return [1, 0];
			if (bigrat.equals(a, bigrat.INFINULL))
				return [0, 0];
			var c = bigrat.clone(a)
			  , e = bigrat.isNegative(c);
			e && (c[0] = c[0].negate());
			for (var d = bigrat.clone(bigrat.ONE), f = [BigInteger(1), BigInteger(0), BigInteger(0), BigInteger(1)], g = 1, m = [0], n = m.length - 1; !bigrat.equals(c, 
			d) && b--; )
				bigrat.isLessThan(c, d) ? (-1 === g ? m[n]++ : (g = -1,
				m.push(1),
				n++),
				f[0] = f[0].add(f[1]),
				f[2] = f[2].add(f[3])) : (1 === g ? m[n]++ : (g = 1,
				m.push(1),
				n++),
				f[1] = f[1].add(f[0]),
				f[3] = f[3].add(f[2])),
				d[0] = f[0].add(f[1]),
				d[1] = f[2].add(f[3]);
			0 > b ? m.push(0) : m[n]++;
			if (e)
				for (var r in m)
					m[r] = -m[r];
			return m
		}
		;
		bigrat.fromContinuedFraction = function(a, b) {
			bigrat.fromInteger_copy(a, b[b.length - 1]);
			for (var c = b.length - 2; -1 < c; c--)
				bigrat.invert(a, a),
				bigrat.add(a, bigrat.fromInteger(b[c]), a);
			return a
		}
		;
		bigrat.fromFactorial = function(a, b) {
			if ("undefined" !== typeof factorial.PREPARED[b])
				return bigrat.fromInteger_copy(a, factorial.PREPARED[b]);
			var c = factorial.PREPARED.length - 1;
			for (bigrat.fromInteger_copy(a, factorial.PREPARED[c]); c < b; )
				bigrat.scalar_multiply(a, a, ++c);
			return a
		}
		;
		bigrat.dump = function(a) {
			return "bigrat\t" + bigrat.str(a) + "\n~\t" + bigrat.toDecimal(a) + "\nCF:\t[" + bigrat.toContinuedFraction(a) + "]\n"
		}
		;
		bigrat.ZERO = bigrat.fromInteger(0);
		bigrat.ONE = bigrat.fromInteger(1);
		bigrat.NEGONE = bigrat.fromInteger(-1);
		bigrat.INFINITY = bigrat.fromValues(1, 0);
		bigrat.INFINULL = bigrat.fromValues(0, 0);
		bigrat.INFINITESIMAL = bigrat.clone([new BigInteger(1), BIGRAT_INFINITESIMAL_PRECISION]);
		bigrat.PI = bigrat.fromValues("3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587", "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
		"undefined" !== typeof exports && (exports.bigrat = bigrat);
		var rational = function(a, b) {
			this.a = rat.fromValues(parseInt(a), parseInt(b))
		}
		;
		rational.prototype.toString = function() {
			return rat.str(this.a)
		}
		;
		rational.prototype.toContinuedFraction = function(a) {
			return rat.toContinuedFraction(this.a, a)
		}
		;
		rational.prototype.invert = function() {
			return rat.invert(this.a)
		}
		;
		rational.prototype.reciprocal = rational.prototype.invert;
		rational.prototype.add = function(a) {
			var b = rat.create();
			rat.add(b, this.a, a.a);
			return new rational(b[0],b[1])
		}
		;
		rational.prototype.plus = rational.prototype.add;
		rational.prototype.subtract = function(a) {
			var b = rat.create();
			rat.sub(b, this.a, a.a);
			return new rational(b[0],b[1])
		}
		;
		rational.prototype.sub = rational.prototype.subtract;
		rational.prototype.minus = rational.prototype.subtract;
		rational.prototype.multiply = function(a) {
			var b = rat.create();
			rat.mul(b, this.a, a.a);
			return new rational(b[0],b[1])
		}
		;
		rational.prototype.mul = rational.prototype.multiply;
		rational.prototype.times = rational.prototype.multiply;
		rational.prototype.mediant = function(a) {
			var b = rat.create();
			rat.mediant(b, this.a, a.a);
			return new rational(b[0],b[1])
		}
		;
		rational.prototype.divide = function(a) {
			var b = rat.create();
			rat.div(b, this.a, a.a);
			return new rational(b[0],b[1])
		}
		;
		rational.prototype.div = rational.prototype.divide;
		rational.prototype.divided_by = rational.prototype.divide;
		rational.prototype.power = function(a) {
			var b = rat.create();
			rat.pow(b, this.a, a);
			return new rational(b[0],b[1])
		}
		;
		rational.prototype.pow = rational.prototype.power;
		rational.prototype.dump = function() {
			return rat.dump(this.a)
		}
		;
		rational.prototype.toRat = function() {
			return rat.clone(this.a)
		}
		;
		rational.prototype.toDecimal = function() {
			return rat.toDecimal(this.a)
		}
		;
		rational.fromRat = function(a) {
			var b = new rational;
			b.a[0] = a[0];
			b.a[1] = a[1];
			return b
		}
		;
		rational.fromInteger = function(a) {
			return rational.fromRat(rat.fromInteger(a))
		}
		;
		rational.fromIntegerInverse = function(a) {
			return rational.fromRat(rat.fromIntegerInverse(a))
		}
		;
		rational.fromDecimal = function(a) {
			return rational.fromRat(rat.fromDecimal(a))
		}
		;
		rational.fromContinuedFraction = function(a) {
			return rational.fromRat(rat.fromContinuedFraction(rat.create(), a))
		}
		;
		"undefined" !== typeof exports && (exports.rational = rational);
		var alpha = {
			GREEK: "\u03b1\u03b2\u03b3\u03b4\u03bc\u03c0\u03c1\u03c2\u03c4\u03c6\u03c7\u03c8\u03c9\u0398\u03a6\u03a9".split(""),
			iterator: function() {
				this.i = 0;
				this.next = function() {
					return this.i < alpha.GREEK.length ? alpha.GREEK[this.i++] : "?"
				}
			}
		};
		"undefined" !== typeof exports && (exports.alpha = alpha);
        var RAT_ZERO = rat.ZERO, RAT_ONE = rat.ONE, RAT_INFINITY = rat.INFINITY, RAT_INFINULL = rat.INFINULL, RAT_INFINITESIMAL = rat.INFINITESIMAL;
    })(shim.exports);
})(this);
