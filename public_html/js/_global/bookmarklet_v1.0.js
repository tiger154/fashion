/* History , it's made by 2013.01.09
 1) Path to crawl images only. line at 137 
 2) Pinterest crawl is alowed. line at 438
 
*/

// window, document, navigator, customObject
// w -> window Object
// d -> document Object
// n -> navigator Object
// a -> custom Object
// s -> empty Array
// f -> custom Function
//**************[[ 객체 접근 분석 ]]*****************************
//** a.d -> customObject.DocumentObject
//** a.d.d = a.d.documentElement;
//** a.d.b = a.d.getElementsByTagName("BODY")[0];
//** a.d.h = a.d.getElementsByTagName("HEAD")[0];
(function (k, n, o, m) {
	var a = k[m.k] = {
		w: k,
		d: n,
		n: o,
		a: m,
		s: {},
		f: function () {
			return {
				callback: [],
				kill: function (b) {
					if (typeof b === "string") b = a.d.getElementById(b);
					b && b.parentNode && b.parentNode.removeChild(b)
				},
				
				get: function (b, c) {
					var d = null;
					return d = typeof b[c] === "string" ? b[c] : b.getAttribute(c)
				},
				set: function (b, c, d) {
					if (typeof b[c] === "string") b[c] = d;
					else b.setAttribute(c, d)
				},
				make: function (b) {
					var c = false,
					d, e;
					for (d in b) if (b[d].hasOwnProperty) {
						c = a.d.createElement(d);
						for (e in b[d]) b[d][e].hasOwnProperty && typeof b[d][e] === "string" && a.f.set(c, e, b[d][e]);
						break
					}
					return c
				},
				listen: function (b, c, d) {
					if (typeof a.w.addEventListener !== "undefined") b.addEventListener(c, d, false);
					else typeof a.w.attachEvent !== "undefined" && b.attachEvent("on" + c, d)
				},
				// 선택영역 가져오고 특정 문자치환하기
				getSelection: function () {
					return ("" + (a.w.getSelection ? a.w.getSelection() : a.d.getSelection ? a.d.getSelection() : a.d.selection.createRange().text)).replace(/(^\s+|\s+$)/g, "")
				},
				pin: function (b) {
					var c = a.a.pin + "?",
					d = "false",
					e = a.f.get(b, "pinImg"),
					g = a.f.get(b, "pinUrl") || a.d.URL,
					f = a.v.selectedText || a.f.get(b, "pinDesc") || a.d.title;
					g = g.split("#")[0];
					if (b.rel === "video") d = "true";
					c = c + "media=" + encodeURIComponent(e);
					c = c + "&url=" + encodeURIComponent(g);
					c = c + "&title=" + encodeURIComponent(a.d.title.substr(0, 500));
					c = c + "&is_video=" + d;
					c = c + "&description=" + encodeURIComponent(f.substr(0, 500));
					if (a.v.inlineHandler) c = c + "&via=" + encodeURIComponent(a.d.URL);
					if (a.v.hazIOS) a.w.location = "http://" + c;
					else a.w.open("http://" + c, "pin" + (new Date).getTime(), a.a.pop)
				},
				close: function (b) {
					if (a.s.bg) {
						a.d.b.removeChild(a.s.shim);
						a.d.b.removeChild(a.s.bg);
						a.d.b.removeChild(a.s.bd)
					}
					k.hazPinningNow = false;
					b && a.w.alert(b);
					a.v.hazGoodUrl = false;
					a.w.scroll(0, a.v.saveScrollTop)
				},
				click: function (b) {
					b = b || a.w.event;
					var c = null;
					if (c = b.target ? b.target.nodeType === 3 ? b.target.parentNode: b.target: b.srcElement) if (c === a.s.x) a.f.close();
					else if (c.className !== a.a.k + "_hideMe") if (c.className === a.a.k + "_pinThis") {
						a.f.pin(c);
						a.w.setTimeout(function () {
							a.f.close()
						},
						10)
					}
				},
				keydown: function (b) { ((b || a.w.event).keyCode || null) === 27 && a.f.close()
				},
				resize: function () {
					var b = a.s.hd.offsetWidth;
					a.s.bd.style.width = b + "px";
					a.s.bg.style.width = b + "px";
					a.s.shim.style.width = b + "px";
					a.s.shim.width = b
				},
				behavior: function () {
					a.f.listen(a.w, "orientationchange", a.f.resize);
					a.f.listen(a.w, "resize", a.f.resize);
					a.f.listen(a.s.bd, "click", a.f.click);
					a.f.listen(a.d, "keydown", a.f.keydown);
					a.f.resize()
				},
				// 스타일 시트 재 정의 
				//  DOM 내에 스타일 추가 
				presentation: function () {
					var b = a.f.make({
						STYLE: {
							type: "text/css"
						}
					}),
					c = a.a.cdn[a.w.location.protocol] || a.a.cdn["http:"],
					d = a.a.rules.join("\n");
					d = d.replace(/#_/g, "#" + m.k + "_");
					d = d.replace(/\._/g, "." + m.k + "_");
					d = d.replace(/_cdn/g, c);
					if (b.styleSheet) b.styleSheet.cssText = d;  // 스타일 시트 객체사용하여 style rule 정의 
					else b.appendChild(a.d.createTextNode(d)); // 스타일시트 없다면 텍스트노드로 추가 
					a.d.h ? a.d.h.appendChild(b) : a.d.b.appendChild(b) // 헤더가 존재한다면 헤더에 스크립트 추가 또는 바디에 추가 
				},
				addThumb: function (b, c, d) { (d = b.getElementsByTagName(d)[0]) ? b.insertBefore(c, d) : b.appendChild(c)
				},
				thumb: function (b) {
					if (b.src) {
						/*2012.01.09 For only image not video*/
						//if (!b.media) b.media = "image";
						b.media = "image";
						var c = a.a.k + "_thumb_" + b.src,
						d = a.f.make({
							SPAN: {
								className: a.a.k + "_pinContainer"
							}
						}),
						e = a.f.make({
							A: {
								className: a.a.k + "_pinThis",
								rel: b.media,
								href: "#"
							}
						}),
						g = a.f.make({
							SPAN: {
								className: "img"
							}
						}),
						f = new Image;
						a.f.set(f, "nopin", "nopin");
						b.page && a.f.set(e, "pinUrl", b.page);
						if (a.v.canonicalTitle || b.title) a.f.set(e, "pinDesc", a.v.canonicalTitle || b.title);
						b.desc && a.f.set(e, "pinDesc", b.desc);
						f.style.visibility = "hidden";
						//**** Pinterest Algorthism
						f.onload = function () { //@@ 이미지 썸네일 작업 시작
							var i = this.width,
							h = this.height;
							if (h === i) this.width = this.height = a.a.thumbCellSize; //with&Height가 동일하면 동일하게 비율 조정
							if (h > i) { // 높이가 넓이보다 큰경우!
								this.width = a.a.thumbCellSize; // 넓이를 200으로 변경
								this.height = a.a.thumbCellSize * (h / i); // 200 * 높이/넓이 
								this.style.marginTop = 0 - (this.height - a.a.thumbCellSize) / 2 + "px" //이미지기본높이 - 조절된높이 = 즉 나머지 높이/2
							}
							if (h < i) { // 넓이가 높이보다 큰 경우!
								this.height = a.a.thumbCellSize; // 높이를 200으로 변경 
								this.width = a.a.thumbCellSize * (i / h); // 200 * 넓이/높이
//														200 = 500
//														400	= 200*2
									

								this.style.marginLeft = 0 - (this.width - a.a.thumbCellSize) / 2 + "px"
							}
							this.style.visibility = ""
						};
						f.src = b.thumb ? b.thumb: b.src;
						a.f.set(e, "pinImg", b.src);
						if (b.extended) f.className = "extended";
						g.appendChild(f);
						d.appendChild(g);
						b.media !== "image" && d.appendChild(a.f.make({
							/*Only Image crawl[2013.01.09]*/
							SPAN: {
								className: a.a.k + "_play"
							}
						}));
						g = a.f.make({
							CITE: {}
						});
						g.appendChild(a.f.make({
							span: {
								className: a.a.k + "_mask"
							}
						}));
						f = b.height + " x " + b.width;
						if (b.duration) {
							f = b.duration;
							if (f < 10) f = "0" + f;
							f = ~~ (b.duration / 60) + ":" + f
						}
						if (b.total_slides) f = b.total_slides + " slides";
						f = a.f.make({
							span: {
								innerHTML: f
							}
						});
						if (b.provider) f.className = a.a.k + "_" + b.provider;
						g.appendChild(f);
						d.appendChild(g);
						d.appendChild(e);
						e = false;
						if (b.dupe) {
							g = 0;
							for (f = a.v.thumbed.length; g < f; g += 1) if (a.v.thumbed[g].id.indexOf(b.dupe) !== -1) {
								e = a.v.thumbed[g].id;
								break
							}
						}
						if (e !== false) if (e = a.d.getElementById(e)) {
							e.parentNode.insertBefore(d, e);
							e.parentNode.removeChild(e)
//						2013.01.09 by revu. Only image
						} else b.page || b.media !== "image" ? a.f.addThumb(a.s.embedContainer, d, "SPAN") : a.f.addThumb(a.s.imgContainer, d, "SPAN");
						else {
							a.s.imgContainer.appendChild(d);
							a.v.hazAtLeastOneGoodThumb += 1
						} (b = a.d.getElementById(c)) && b.parentNode.removeChild(b);
						d.id = c;
						a.f.set(d, "domain", c.split("/")[2]);
						a.v.thumbed.push(d)
					}
				},
				call: function (b, c) {
					var d = a.f.callback.length,
					e = a.a.k + ".f.callback[" + d + "]",
					g = a.d.createElement("SCRIPT");
					a.f.callback[d] = function (f) {
						c(f, d);
						a.v.awaitingCallbacks -= 1;
						a.f.kill(e)
					};
					g.id = e;
					g.src = b + "&callback=" + e;
					g.type = "text/javascript";
					g.charset = "utf-8";
					a.v.firstScript.parentNode.insertBefore(g, a.v.firstScript);
					a.v.awaitingCallbacks += 1
				},
				ping: {
					// 도메인 핀 가능 여부 체크 
					// Call : http://api.pinterest.com/v2/domains/filter_nopin/?domains=
					// Return : {"status": "success", "disallowed_domains": []}
					checkDomain: function (b) {
						var c, d;
						if (b && b.disallowed_domains && b.disallowed_domains.length) {
							c = 0;
							for (d = b.disallowed_domains.length; c < d; c += 1) if (b.disallowed_domains[c] === a.w.location.host) {
								a.f.close(a.a.msg.noPin);
								return
							} else a.v.badDomain[b.disallowed_domains[c]] = true;
							c = 0;
							for (d = a.v.thumbed.length; c < d; c += 1) a.v.badDomain[a.f.get(a.v.thumbed[c], "domain")] === true && a.f.unThumb(a.v.thumbed[c].id.split("thumb_").pop())
						}
					},
					info: function (b) {
						if (b) if (b.err) a.f.unThumb(b.id);
						else if (b.reply && b.reply.img && b.reply.img.src) {
							var c = "";
							if (b.reply.page) c = b.reply.page;
							if (b.reply.nopin && b.reply.nopin === 1) a.f.unThumb(b.id);
							else {
								if (a.v.scragAllThumbs === true) {
									a.s.embedContainer.innerHTML = "";
									a.s.imgContainer.innerHTML = ""
								}
								a.f.thumb({
									provider: b.src,
									src: b.reply.img.src,
									height: b.reply.img.height,
									width: b.reply.img.width,
									media: b.reply.media,
									desc: b.reply.description,
									page: c,
									duration: b.reply.duration || 0,
									total_slides: b.reply.total_slides || 0,
									dupe: b.id
								})
							}
						}
					}
				},
				unThumb: function (b) {
					b = a.a.k + "_thumb_" + b;
					var c = a.d.getElementById(b);
					if (c) {
						if (a.v.canonicalImage) if (a.a.k + "_thumb_" + a.v.canonicalImage === b) return;
						b = c.getElementsByTagName("A")[0];
						b.className = a.a.k + "_hideMe";
						b.innerHTML = a.a.msg.grayOut;
						a.v.hazAtLeastOneGoodThumb -= 1
					}
				},
				getExtendedInfo: function (b) {
					if (!a.v.hazCalledForInfo[b]) {
						a.v.hazCalledForInfo[b] = true;
						a.f.call(a.a.embed + b, a.f.ping.info)
					}
				},
				getId: function (b) {
					for (var c, d = b.u.split("?")[0].split("#")[0].split("/"); ! c;) c = d.pop();
					if (b.r) c = parseInt(c, b.r);
					return encodeURIComponent(c)
				},
				seekCanonical: function (b) {
					var c = a.a.seek[b],
					d = null,
					e = null,
					g,
					f,
					i,
					h,
					l,
					j = {
						pPrice: "",
						pCurrencySymbol: ""
					};
					if (!c || !c.via) return null;
					if (typeof c.via === "string" && a.a.via[c.via]) d = a.a.via[c.via];
					else if (typeof c.via === "object") d = c.via;
					g = a.v[d.tagName] || a.d.getElementsByTagName(d.tagName);
					l = g.length;
					for (h = 0; h < l; h += 1) {
						f = a.f.get(g[h], d.property);
						if ((i = a.f.get(g[h], d.content)) && f) if (d.field[f]) j[d.field[f]] = i
					}
					if (j.pId && j.pId !== c.id) return null;
					if (j.pUrl && j.pImg) {
						e = new Image;
						e.onload = function () {
							a.f.thumb({
								media: c.media || "image",
								provider: b,
								src: this.src,
								title: this.title,
								height: this.height,
								width: this.width
							});
							a.v.tag.push(e)
						};
						a.v.canonicalTitle = j.pTitle || a.d.title;
						if (c.fixTitle) if (a.v.canonicalTitle.match(c.fixTitle.find)) {
							a.v.canonicalTitle = a.v.canonicalTitle.replace(c.fixTitle.find, c.fixTitle.replace);
							if (c.fixTitle.suffix) a.v.canonicalTitle += c.fixTitle.suffix
						}
						a.v.canonicalTitle = a.v.canonicalTitle.replace(/%s%/, j.pCurrencySymbol + j.pPrice);
						e.title = a.v.canonicalTitle;
						e.setAttribute("page", j.pUrl);
						if (c.fixImg) if (j.pImg.match(c.fixImg.find)) j.pImg = j.pImg.replace(c.fixImg.find, c.fixImg.replace);
						if (c.checkNonCanonicalImages) a.v.checkNonCanonicalImages = true;
						a.v.canonicalImage = e.src = j.pImg;
						return e
					}
					return null
				},
				hazUrl: {
					etsy: function () {
						a.f.seekCanonical("etsy")
					},
					fivehundredpx: function () {
						var b = a.f.seekCanonical("fivehundredpx");
						if (b) {
							b.setAttribute("extended", true);
							b.setAttribute("dupe", b.src);
							a.f.getExtendedInfo("src=fivehundredpx&id=" + encodeURIComponent(b.src))
						}
					},
					flickr: function () {
						var b = a.f.seekCanonical("flickr");
						if (b) {
							b.setAttribute("extended", true);
							b.setAttribute("dupe", b.src);
							a.f.getExtendedInfo("src=flickr&id=" + encodeURIComponent(b.src))
						}
					},
					kickstarter: function () {
						a.f.seekCanonical("kickstarter")
					},
					soundcloud: function () {
						var b = a.f.seekCanonical("soundcloud");
						if (b) {
							b.setAttribute("extended", true);
							a.v.scragAllThumbs = true;
							a.f.getExtendedInfo("src=soundcloud&id=" + encodeURIComponent(a.d.URL.split("?")[0].split("#")[0]))
						}
					},
					slideshare: function () {
						var b = a.f.seekCanonical("slideshare");
						if (b) {
							b.setAttribute("extended", true);
							a.v.scragAllThumbs = true;
							a.f.getExtendedInfo("src=slideshare&id=" + encodeURIComponent(a.d.URL.split("?")[0].split("#")[0]))
						}
					},
					youtube: function () {
						var b = a.f.seekCanonical("youtube");
						if (b) {
							b.setAttribute("extended", true);
							a.f.getExtendedInfo("src=youtube&id=" + encodeURIComponent(b.getAttribute("page").split("=")[1].split("&")[0]))
						}
						
					},
					vimeo: function () {
						var b = a.f.getId({
							u: a.d.URL,
							r: 10
						}),
						c = "vimeo";
						if (a.w.location.protocol === "https:") c += "_s";
						b > 1E3 && a.f.getExtendedInfo("src=" + c + "&id=" + b)
					},
					googleImages: function () {
						a.v.inlineHandler = "google"
					},
					tumblr: function () {
						a.v.inlineHandler = "tumblr"
					},
					netflix: function () {
						a.v.inlineHandler = "netflix"
					},
					pinterest: function () {
						/*Deleted by 2013.01.09*/
						//a.f.close(a.a.msg.installed) // installed 
					},
					facebook: function () {
						a.f.close(a.a.msg.privateDomain.replace(/%privateDomain%/, "Facebook"))
					},
					googleReader: function () {
						a.f.close(a.a.msg.privateDomain.replace(/%privateDomain%/, "Google Reader"))
					},
					stumbleUpon: function () {
						var b = 0,
						c = a.a.stumbleFrame.length,
						d;
						for (b = 0; b < c; b += 1) if (d = a.d.getElementById(a.a.stumbleFrame[b])) {
							a.f.close();
							if (a.w.confirm(a.a.msg.bustFrame)) a.w.location = d.src;
							break
						}
					}
				},
				hazSite: {
					flickr: {
						img: function (b) {
							if (b.src) {
								b.src = b.src.split("?")[0];
								a.f.getExtendedInfo("src=flickr&id=" + encodeURIComponent(b.src))
							}
						}
					},
					fivehundredpx: {
						img: function (b) {
							if (b.src) {
								b.src = b.src.split("?")[0];
								a.f.getExtendedInfo("src=fivehundredpx&id=" + encodeURIComponent(b.src))
							}
						}
					},
					behance: {
						img: function (b) {
							if (b.src) {
								b.src = b.src.split("?")[0];
								a.f.getExtendedInfo("src=behance&id=" + encodeURIComponent(b.src))
							}
						}
					},
					netflix: {
						img: function (b) {
							if (b = b.src.split("?")[0].split("#")[0].split("/").pop()) {
								id = parseInt(b.split(".")[0], 10);
								id > 1E3 && a.v.inlineHandler && a.v.inlineHandler === "netflix" && a.f.getExtendedInfo("src=netflix&id=" + id)
							}
						}
					},
					youtube: {						
						
						img: function (b) {
							b = b.src.split("?")[0].split("#")[0].split("/");
							b.pop();
							(id = b.pop()) && a.f.getExtendedInfo("src=youtube&id=" + id)
						},
						iframe: function (b) { (b = a.f.getId({
								u: b.src
							})) && a.f.getExtendedInfo("src=youtube&id=" + b)
						},
						video: function (b) { (b = a.f.get(b, "data-youtube-id")) && a.f.getExtendedInfo("src=youtube&id=" + b)
						},
						embed: function (b) {
							var c = a.f.get(b, "flashvars"),
							d = "";
							if (c) {
								if (d = c.split("video_id=")[1]) d = d.split("&")[0];
								d = encodeURIComponent(d)
							} else d = a.f.getId({
								u: b.src
							});
							d && a.f.getExtendedInfo("src=youtube&id=" + d)
						},
						object: function (b) {
							b = a.f.get(b, "data");
							var c = "";
							if (b)(c = a.f.getId({
								u: b
							})) && a.f.getExtendedInfo("src=youtube&id=" + c)
						}
					},
					vimeo: {
						iframe: function (b) {
							b = a.f.getId({
								u: b.src,
								r: 10
							});
							b > 1E3 && a.f.getExtendedInfo("src=vimeo&id=" + b)
						}
					}
				},
				parse: function (b, c) {
					b = b.split(c);
					if (b[1]) return b[1].split("&")[0];
					return ""
				},
				handleInline: {
					google: function (b) {
						if (b) {
							var c, d = 0,
							e = 0,
							g = a.f.get(b, "src");
							if (g) {
								e = b.parentNode;
								if (e.tagName === "A" && e.href) {
									b = a.f.parse(e.href, "&imgrefurl=");
									c = a.f.parse(e.href, "&imgurl=");
									d = parseInt(a.f.parse(e.href, "&w="), 10);
									e = parseInt(a.f.parse(e.href, "&h="), 10);
									c && g && b && e > a.a.minImgSize && d > a.a.minImgSize && a.f.thumb({
										thumb: g,
										src: c,
										page: b,
										height: e,
										width: d
									});
									a.v.checkThisDomain[c.split("/")[2]] = true
								}
							}
						}
					},
					tumblr: function (b) {
						var c = [];
						c = null;
						c = "";
						if (b.src) {
							for (c = b.parentNode; c.tagName !== "LI" && c !== a.d.b;) c = c.parentNode;
							if (c.tagName === "LI" && c.parentNode.id === "posts") {
								c = c.getElementsByTagName("A");
								(c = c[c.length - 1]) && c.href && a.f.thumb({
									src: b.src,
									page: c.href,
									height: b.height,
									width: b.width
								})
							}
						}
					}
				},
				hazTag: {
					img: function (b) {
						if (a.v.inlineHandler && typeof a.f.handleInline[a.v.inlineHandler] === "function") a.f.handleInline[a.v.inlineHandler](b);
						else if (!b.src.match(/^data/)) {
							if (b.height > a.a.minImgSize && b.width > a.a.minImgSize) { // 80보다 사이즈가 큰경우
								if (b.parentNode.tagName === "A" && b.parentNode.href) { // 부모노드에 A링크가있는경우
									var c = b.parentNode, // A태그
									d = c.href.split(".").pop().split("?")[0].split("#")[0]; // 확장자 추출 
									if (d === "gif" || d === "jpg" || d === "jpeg" || d === "png") { // 확장자가 IMAGE 일경우 
										d = new Image; // 새로운 IMAGE 썸네일 생성 
										d.onload = function () { 
											a.f.thumb({
												src: this.src,
												height: this.height,
												width: this.width,
												title: this.title,
												dupe: this.getAttribute("dupe")
											})
										};
										d.title = c.title || c.alt || b.title || b.alt;
										d.src = c.href;
										d.setAttribute("dupe", b.src)
									}
								}
								a.f.thumb({
									src: b.src,
									height: b.height,
									width: b.width,
									title: b.title || b.alt
								})
							}
							a.v.checkThisDomain[b.src.split("/")[2]] = true
						}
					}
				},
				checkTags: function () {
					var b, c, d, e, g, f, i, h, l;
					b = 0;
					for (c = a.a.check.length; b < c; b += 1) { // a.a.check -> check: ["meta", "iframe", "embed", "object", "img", "video", "a"],
						g = a.d.getElementsByTagName(a.a.check[b]); // Get selected each tags
						d = 0;
						for (e = g.length; d < e; d += 1) {
							// none, hidden, nopin , and tag push
							f = g[d]; ! a.f.get(f, "nopin") && f.style.display !== "none" && f.style.visibility !== "hidden" && a.v.tag.push(f)
						}
					}
					b = 0;
					for (c = a.v.tag.length; b < c; b += 1) {
						g = a.v.tag[b];
						f = g.tagName.toLowerCase();
						if (a.a.tag[f]) for (i in a.a.tag[f]) if (a.a.tag[f][i].hasOwnProperty) { // does tag has some attr?
							h = a.a.tag[f][i];
							if (l = a.f.get(g, h.att)) { // extract tags selected attr, ex) src, data ...
								d = 0;
								for (e = h.match.length; d < e; d += 1) l.match(h.match[d]) && a.f.hazSite[i][f](g)
								
							}
						}
						a.f.hazTag[f] && a.f.hazTag[f](g)
					}
					a.f.checkDomainBlacklist()
				},
				getHeight: function () {
					return Math.max(Math.max(a.d.b.scrollHeight, a.d.d.scrollHeight), Math.max(a.d.b.offsetHeight, a.d.d.offsetHeight), Math.max(a.d.b.clientHeight, a.d.d.clientHeight))
				},
				// 문서 구조 셋팅 
				// a.s -> EMPTY ARRAY
				structure: function () {
					a.s.shim = a.f.make({
						IFRAME: {
							height: "100%",
							width: "100%",
							allowTransparency: true,
							id: a.a.k + "_shim"
						}
					});
					a.f.set(a.s.shim, "nopin", "nopin"); // 어트리뷰트 셋팅( nopin =nopin)
					a.d.b.appendChild(a.s.shim); // 바디에 아이프레임 추가
					a.s.bg = a.f.make({
						DIV: {
							id: a.a.k + "_bg"
						}
					});
					a.d.b.appendChild(a.s.bg); // 바디에 bg 추가
					a.s.bd = a.f.make({
						DIV: {
							id: a.a.k + "_bd"
						}
					});
					a.s.hd = a.f.make({
						DIV: {
							id: a.a.k + "_hd"
						}
					});
					if (a.a.noHeader !== true) { // noHeader -> False라면 
						a.s.bd.appendChild(a.f.make({ // bd에 DIV 및 id _spacer 추가
							DIV: {
								id: a.a.k + "_spacer"
							}
						}));
						a.s.hd.appendChild(a.f.make({ // hd에 SPAN 태그 및 id 로고 추가
							SPAN: {
								id: a.a.k + "_logo"
							}
						}));
						if (a.a.noCancel !== true) { // noCancel -> False라면 
							a.s.x = a.f.make({
								A: {
									id: a.a.k + "_x",
									innerHTML: a.a.msg.cancelTitle
								}
							});
							a.s.hd.appendChild(a.s.x)   // A태그 추가 , id _x , 
						}
					} else a.s.hd.className = "noHeader"; // ** 정상일 경우 작업으로 보임 
					a.s.bd.appendChild(a.s.hd);
					a.s.embedContainer = a.f.make({
						SPAN: {
							id: a.a.k + "_embedContainer"
						}
					});
					a.s.bd.appendChild(a.s.embedContainer);
					a.s.imgContainer = a.f.make({
						SPAN: {
							id: a.a.k + "_imgContainer"
						}
					});
					a.s.bd.appendChild(a.s.imgContainer);
					a.d.b.appendChild(a.s.bd);
					var b = a.f.getHeight();
					if (a.s.bd.offsetHeight < b) {
						a.s.bd.style.height = b + "px";
						a.s.bg.style.height = b + "px";
						a.s.shim.style.height = b + "px"
					}
					a.w.scroll(0, 0) // scroll 0 으로 초기화!!
				},
				checkUrl: function () {
					var b;
					for (b in a.a.url) if (a.a.url[b].hasOwnProperty) if (a.d.URL.match(a.a.url[b])) {
						a.f.hazUrl[b]();
						if (a.v.hazGoodUrl === false) return false
					}
					return true
				},
				checkPage: function () {
					if (a.f.checkUrl()) {
						if (!a.v.canonicalImage || a.v.checkNonCanonicalImages) a.f.checkTags();
						if (a.v.hazGoodUrl === false) return false
					} else return false;
					return true
				},
				checkDomainBlacklist: function () {
					var b = a.a.checkDomain.url + "?domains=",
					c, d = 0;
					for (c in a.v.checkThisDomain) if (a.v.checkThisDomain[c].hasOwnProperty && !a.v.checkDomainDone[c]) {
						a.v.checkDomainDone[c] = true;
						if (d) b += ",";
						d += 1;
						b += encodeURIComponent(c);
						if (d > a.a.maxCheckCount) {
							a.f.call(b, a.f.ping.checkDomain);
							b = a.a.checkDomain.url + "?domains=";
							d = 0
						}
					}
					d > 0 && a.f.call(b, a.f.ping.checkDomain)
				},
				foundNoPinMeta: function () { // 메타데이터에 값을 체크하여 NOPIN처리
					var b, c, d;
					d = a.v.meta.length; // Check Metadata count from initFunction, meta: a.d.getElementsByTagName("META"), // get Metadatas,  a.v = custom class
					for (c = 0; c < d; c += 1) {
						b = a.v.meta[c];
						if (b.name && b.name.toUpperCase() === "PINTEREST" && b.content && b.content.toUpperCase() === "NOPIN") {
							if (b = a.f.get(b, "description")) {
								d = "The owner of the site";
								c = a.d.URL.split("/");
								if (c[2]) d = c[2];
								a.f.close(a.a.msg.noPinReason.replace(/%s%/, d) + "\n\n" + b)
							} else a.f.close(a.a.msg.noPin);
							return true
						}
					}
				},
					// window, document, navigator, customObject
// w -> window Object
// d -> document Object
// n -> navigator Object
// a -> custom Object
// s -> empty Array
// f -> custom Function
				getArgs: function () { 
					var b = a.d.getElementsByTagName("SCRIPT"),
					c = b.length,
					d = 0;
					for (d = 0; d < c; d += 1) if (b[d].src.match(a.a.me)) { // 핀터레스트의 북마클릿 js 와 일치한다면.
						if (b[d].getAttribute("noCancel")) a.a.noCancel = true; 
						if (b[d].getAttribute("noHeader")) a.a.noHeader = true;
						a.w.setTimeout(function () {
							b[d].parentNode.removeChild(b[d])
						},
						10);
						break
					}
				},
				init: function () {
					a.f.getArgs(); // sricpt 충돌 회피 
					a.d.d = a.d.documentElement;
					a.d.b = a.d.getElementsByTagName("BODY")[0];
					a.d.h = a.d.getElementsByTagName("HEAD")[0];
					if (a.d.b) { // BODY 가 존재한다면
						if (k.hazPinningNow !== true) { // If you closed pinning, you can pin but not
							k.hazPinningNow = true; // Flag to check which is pinning or not
							var b = a.n.userAgent; // set navigator Object 
							a.v = {
								saveScrollTop: a.w.pageYOffset, // init pageYOffset 페이지상 왼쪽상단 Y좌표
								hazGoodUrl: true, // init GoodURL
								hazAtLeastOneGoodThumb: 0, // init 
								awaitingCallbacks: 0, // init Callbacks
								thumbed: [], // init thumbed
								hazIE: function () {
									return /msie/i.test(b) && !/opera/i.test(b) // Check User agent
								} (),
								hazIOS: function () {
									return b.match(/iP/) !== null // check User agent For IOS
								} (),
								firstScript: a.d.getElementsByTagName("SCRIPT")[0], //Check to firstScript
								selectedText: a.f.getSelection(), // Selected Text
								hazCalledForInfo: {},
								checkThisDomain: {},
								checkDomainDone: {},
								badDomain: {},
								meta: a.d.getElementsByTagName("META"), // get Metadatas
								tag: [],
								canonicalTitle: ""
							};
							if (!a.f.foundNoPinMeta()) { // NoPin 대상이 아니라면 
								a.v.checkThisDomain[a.w.location.host] = true; // 호스트URL에 True셋팅 
								a.f.checkDomainBlacklist(); // 블랙리스트 여부 체크
								a.f.presentation(); // 스타일 시트 추가[하단 rule 참고] 
								a.f.structure(); // 문서 구조 설정
								if (a.f.checkPage()) if (a.v.hazGoodUrl === true) {
									a.f.behavior();
									if (a.f.callback.length > 1) a.v.waitForCallbacks = a.w.setInterval(function () {
										if (a.v.awaitingCallbacks === 0) if (a.v.hazAtLeastOneGoodThumb === 0 || a.v.tag.length === 0) {
											a.w.clearInterval(a.v.waitForCallbacks);
											a.f.close(a.a.msg.notFound)
										}
									},
									500);
									else if (!a.v.canonicalImage && (a.v.hazAtLeastOneGoodThumb === 0 || a.v.tag.length === 0)) a.f.close(a.a.msg.notFound)
								}
							}
						}
					} else a.f.close(a.a.msg.noPinIncompletePage) // There aren't images(Non html)
				}
			}
		} ()
	};
	a.f.init() // 정의 함수 실행 
})(window, document, navigator, {
	k: "FASSION_" + (new Date).getTime(),
	me: /pinterest.com\/js\/pinmarklet/,
	checkDomain: {
		url: "//api.pinterest.com/v2/domains/filter_nopin/?domains="
	},
	cdn: {
		"https:": "https://a248.e.akamai.net/passets.pinterest.com.s3.amazonaws.com",
		"http:": "http://passets-cdn.pinterest.com"
	},
	embed: "//pinterest.com/embed/?",
	pin: "www.revu.co.kr/",
	minImgSize: 80, // limit size to 80
	maxCheckCount: 20,
	thumbCellSize: 200,
	check: ["meta", "iframe", "embed", "object", "img", "video", "a"],
	url: {
		fivehundredpx: /^https?:\/\/500px\.com\/photo\//,
		etsy: /^https?:\/\/.*?\.etsy\.com\/listing\//,
		flickr: /^https?:\/\/www\.flickr\.com\//,
		googleImages: /^https?:\/\/.*?\.google\.com\/search/,
		googleReader: /^https?:\/\/.*?\.google\.com\/reader\//,
		kickstarter: /^https?:\/\/.*?\.kickstarter\.com\/projects\//,
		netflix: /^https?:\/\/.*?\.netflix\.com/,
		pinterest: /^https?:\/\/.*?\.?pinterest\.com\//,
		slideshare: /^https?:\/\/.*?\.slideshare\.net\//,
		soundcloud: /^https?:\/\/soundcloud\.com\//,
		stumbleUpon: /^https?:\/\/.*?\.stumbleupon\.com\//,
		tumblr: /^https?:\/\/www\.tumblr\.com/,
		vimeo: /^https?:\/\/vimeo\.com\//,
		youtube: /^https?:\/\/www\.youtube\.com\/watch\?/
	},
	via: {
		og: {
			tagName: "meta",
			property: "property",
			content: "content",
			field: {
				"og:type": "pId",
				"og:url": "pUrl",
				"og:image": "pImg"
			}
		}
	},
	seek: {
		etsy: {
			id: "etsymarketplace:item",
			via: {
				tagName: "meta",
				property: "property",
				content: "content",
				field: {
					"og:title": "pTitle",
					"og:type": "pId",
					"og:url": "pUrl",
					"og:image": "pImg",
					"etsymarketplace:price_value": "pPrice",
					"etsymarketplace:currency_symbol": "pCurrencySymbol"
				}
			},
			fixImg: {
				find: /_570xN/,
				replace: "_fullxfull"
			},
			fixTitle: {
				suffix: ". %s%, via Etsy."
			},
			checkNonCanonicalImages: true
		},
		fivehundredpx: {
			id: "five_hundred_pixels:photo",
			via: "og",
			fixImg: {
				find: /\/3.jpg/,
				replace: "/4.jpg"
			},
			fixTitle: {
				find: /^500px \/ Photo /,
				replace: "",
				suffix: ", via 500px."
			}
		},
		flickr: {
			via: {
				tagName: "link",
				property: "rel",
				content: "href",
				field: {
					canonical: "pUrl",
					image_src: "pImg"
				}
			},
			fixImg: {
				find: /_m.jpg/,
				replace: "_z.jpg"
			},
			fixTitle: {
				find: / \| Flickr(.*)$/,
				replace: "",
				suffix: ", via Flickr."
			}
		},
		kickstarter: {
			id: "kickstarter:project",
			via: "og",
			media: "video",
			fixTitle: {
				find: / \u2014 Kickstarter$/,
				replace: "",
				suffix: ", via Kickstarter."
			}
		},
		slideshare: {
			id: "slideshare:presentation",
			via: "og",
			media: "video"
		},
		soundcloud: {
			id: "soundcloud:sound",
			via: "og",
			media: "video",
			fixTitle: {
				find: / on SoundCloud(.*)$/,
				replace: "",
				suffix: ", via SoundCloud."
			}
		},
		youtube: {
			id: "video",
			via: "og",
			fixTitle: {
				find: / - YouTube$/,
				replace: "",
				suffix: ", via YouTube."
			}
		}
	},
	stumbleFrame: ["tb-stumble-frame", "stumbleFrame"],
	tag: {
		img: {
			flickr: {
				att: "src",
				match: [/staticflickr.com/, /static.flickr.com/]
			},
			fivehundredpx: {
				att: "src",
				match: [/pcdn\.500px\.net/]
			},
			behance: {
				att: "src",
				match: [/^http:\/\/behance\.vo\.llnwd\.net/]
			},
			netflix: {
				att: "src",
				match: [/^http:\/\/cdn-?[0-9]\.nflximg\.com/, /^http?s:\/\/netflix\.hs\.llnwd\.net/]
			},
			youtube: {
				att: "src",
				match: [/ytimg.com\/vi/, /img.youtube.com\/vi/]
			}
		},
		video: {
			youtube: {
				att: "src",
				match: [/videoplayback/]
			}
		},
		embed: {
			youtube: {
				att: "src",
				match: [/^http:\/\/s\.ytimg\.com\/yt/, /^http:\/\/.*?\.?youtube-nocookie\.com\/v/]
			}
		},
		iframe: {
			youtube: {
				att: "src",
				match: [/^http:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9\-_]+)/]
			},
			vimeo: {
				att: "src",
				match: [/^http?s:\/\/vimeo.com\/(\d+)/, /^http:\/\/player\.vimeo\.com\/video\/(\d+)/]
			}
		},
		object: {
			youtube: {
				att: "data",
				match: [/^http:\/\/.*?\.?youtube-nocookie\.com\/v/]
			}
		}
	},
	msg: {
		check: "",
		cancelTitle: "Cancel",
		grayOut: "죄송합니다, 이미지를 로드 할수 없습니다.",
		noPinIncompletePage: "죄송합니다, HTML문서양식이아닌경우 이미지를 로드할수없습니다.이미지를 업로드 하시려면, fassion.com을 방문해주세요",
		bustFrame: "해당 페이지에서 이미지 로드를 위해서는 특정툴바(StumbleUpon toolbar)를 비활성화 요청드립니다.  이미지 업로드후, 뒤로가기 버튼을 누를시 StumbleUpon 사이트로 이동됩니다. 계속진행하시려면 OK를 클릭, 사이트에 머무를시 Cancel 버튼을 클릭해주세요.",
		noPin: "죄송합니다, 해당 도메인에서는 이미지로드가 차단되어있습니다. 궁금한 사항은 won.jh@revu.co.kr로 문의 바랍니다",
		noPinReason: "\n\n%s% 와 같은 사유를 통해서 해당 페이지는 이미지로드가 차단되어있습니다.:",
		privateDomain: "죄송합니다, %privateDomain% 은 직접 이미지 로드가 차단되어있습니다.",
		notFound: "죄송합니다, 해당 페이지에서는 업로드 가능한 이미지를 찾을수 없습니다.",
		installed: "북마클릿이 설치되었습니다! 이제 어떤 웹사이트에서든 북마클릿을 이용하여 원하는 이미지를 업로드 할수있습니다."
	},
	pop: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=632,height=270,left=0,top=0",
	rules: ["#_shim {z-index:2147483640; position: absolute; background: transparent; top:0; right:0; bottom:0; left:0; width: 100%; border: 0;}", "#_bg {z-index:2147483641; position: absolute; top:0; right:0; bottom:0; left:0; padding-top: 19px;background-color:#f2f2f2;width: 100%; }", "#_bd {z-index:2147483642; position: absolute; text-align: center; width: 100%; top: 60px; left: 0; right: 0; font:16px hevetica neue,arial,san-serif; }", "#_bd #_hd { z-index:2147483643; -moz-box-shadow: 0 1px 2px #aaa; -webkit-box-shadow: 0 1px 2px #aaa; box-shadow: 0 1px 2px #aaa; position: fixed; *position:absolute; width:100%; top: 0; left: 0; right: 0; padding-top: 19px;height: 58px;font-size: 14px; font-weight: bold; display: block; margin: 0; background: #596978; border-bottom: 1px solid #aaa; }", "#_bd #_hd.noHeader { height: 1px; background-color:#f2f2f2; -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none; border: none; }", "#_bd #_hd a#_x { display: inline-block; cursor: pointer; position:absolute;right:0;top:0;width: 81px; height:75px;text-indent:-9999px; background:url(http://design.fassion.co.kr/common/_layout/sprites-button_130111.png) no-repeat 0 -400px}", "#_bd #_hd a#_x:hover {}", "#_bd #_hd a#_x:active { color: #fff; background: #cb2027; text-decoration: none; text-shadow:none;}", "#_bd #_hd #_logo {height: 43px; width: 139px; height:37px; display: inline-block; margin-right: -100px; background: transparent url(http://design.fassion.co.kr/common/_layout/sprites-layout_130111.png) -920px -300px no-repeat; border: none;}", "@media only screen and (-webkit-min-device-pixel-ratio: 2) { #_bd #_hd #_logo {background-size: 100px 26px; background-image: url(_cdn/images/LogoRed.2x.png); } }", "#_bd #_spacer { display: block; height: 50px; }", "#_bd span._pinContainer { height:198px; width:198px; display:inline-block; background:#fff; position:relative; border:1px solid #c1c4cb;margin:0 13px 11px 0; }", "#_bd span._pinContainer { zoom:1; *border: 1px solid #aaa; }", "#_bd span._pinContainer img { margin:0; padding:0; border:none; }", "#_bd span._pinContainer span.img, #_bd span._pinContainer span._play { position: absolute; top: 0; left: 0; height:198px; width:198px; overflow:hidden; }", "#_bd span._pinContainer span._play { background: transparent url(_cdn/images/bm/play.png) 50% 50% no-repeat; }", "#_bd span._pinContainer cite, #_bd span._pinContainer cite span { position: absolute; bottom: 0; left: 0; right: 0; width: 198px; color: #fff; height: 19px; line-height: 19px; font-size: 11px; font-style: normal; text-align: center; overflow: hidden; }", "#_bd span._pinContainer cite span._mask { background:#777; opacity:.70; *filter:alpha(opacity=75); }", "#_bd span._pinContainer cite span._behance { background: transparent url(_cdn/images/attrib/behance.png) 180px 3px no-repeat; }", "#_bd span._pinContainer cite span._flickr { background: transparent url(_cdn/images/attrib/flickr.png) 182px 3px no-repeat; }", "#_bd span._pinContainer cite span._fivehundredpx { background: transparent url(_cdn/images/attrib/fivehundredpx.png) 180px 3px no-repeat; }", "#_bd span._pinContainer cite span._kickstarter { background: transparent url(_cdn/images/attrib/kickstarter.png) 182px 3px no-repeat; }", "#_bd span._pinContainer cite span._slideshare { background: transparent url(_cdn/images/attrib/slideshare.png) 182px 3px no-repeat; }", "#_bd span._pinContainer cite span._soundcloud { background: transparent url(_cdn/images/attrib/soundcloud.png) 182px 3px no-repeat; }", "#_bd span._pinContainer cite span._vimeo { background: transparent url(_cdn/images/attrib/vimeo.png) 180px 3px no-repeat; }", "#_bd span._pinContainer cite span._vimeo_s { background: transparent url(_cdn/images/attrib/vimeo.png) 180px 3px no-repeat; }", "#_bd span._pinContainer cite span._youtube { background: transparent url(_cdn/images/attrib/youtube.png) 180px 3px no-repeat; }", "#_bd span._pinContainer a { text-decoration:none; background:transparent url(http://design.fassion.co.kr/common/_layout/btn_item_130111.png) 52px 300px no-repeat; cursor:pointer; position:absolute; top:0; left:0; height:200px; width:200px; }", "#_bd span._pinContainer a { -moz-transition-property: background-color; -moz-transition-duration: .25s; -webkit-transition-property: background-color; -webkit-transition-duration: .25s; transition-property: background-color; transition-duration: .25s; }", "#_bd span._pinContainer a:hover { background-position: 52px 89px; background-color:rgba(0, 0, 0, 0.5); border:2px solid #000; width:196px; height:196px; margin:-1px 0 0 -1px; }", "#_bd span._pinContainer a._hideMe { background: rgba(128, 128, 128, .5); *background: #aaa; *filter:alpha(opacity=75); line-height: 200px; font-size: 10px; color: #fff; text-align: center; font-weight: normal!important; }"]
});