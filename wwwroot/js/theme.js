mm_base = window.mm_base || {}, mm_base.vars = window.mm_base_vars || {}, mm_base.fn = {
        getURLParameterByName: function (e, t) {
            t = t || window.location.href, e = e.replace(/[\[\]]/g, "\\$&");
            var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
            return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
        },
        in_viewport: function (e) {
            var t, n;
            return !(!e || 1 !== e.nodeType) && (n = document.documentElement, !!(t = e.getBoundingClientRect()) && this.is_visible(e) && 0 <= t.bottom && 0 <= t.right && t.top <= n.clientHeight && t.left <= n.clientWidth)
        },
        is_visible: function (e) {
            return !(!e || 1 !== e.nodeType) && (0 < e.offsetWidth && 0 < e.offsetHeight)
        },
        isMobile: function () {
            return !!bowser && (bowser.mobile || bowser.tablet)
        },
        get_transitionend_event_name: function () {
            return {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                transition: "transitionend"
            } [Modernizr.prefixed("transition")]
        },
        create_fragment: function (e) {
            var t = document.createDocumentFragment(),
                n = document.createElement("div");
            for (n.innerHTML = e; n.firstChild;) t.appendChild(n.firstChild);
            return t
        },
        parse_rgba: function (e) {
            return -1 === e.indexOf("rgba") ? ["0", "0", "0", "0"] : input.split("(")[1].split(")")[0].split(",")
        },
        to_boolean: function (e) {
            return !!JSON.parse(String(e).toLowerCase())
        },
        smooth_scroll: function (e, t, n, i) {
            var s;
            t = t || 1e3, n = n || "swing", i = i || !1;
            if ("string" == typeof e) {
                try {
                    s = document.getElementById(e)
                } catch (e) {
                    s = !1
                }
                if (!s) try {
                    s = document.querySelector("[name=" + e + "]")
                } catch (e) {
                    s = !1
                }
            } else s = e;
            if (!s) return !1;
            var a = jQuery(".c-site-header");
            jQuery("html, body").animate({
                scrollTop: jQuery(s).offset().top - a.height()
            }, t, n, function () {
                i && i()
            })
        },
        custom_event: function (t, n) {
            if (t) {
                var i;
                n = n || {
                    bubbles: !0,
                    cancelable: !0
                };
                try {
                    i = new CustomEvent(t, n)
                } catch (e) {
                    (i = window.CustomEvent(t, n)).initEvent(t, n)
                }
                document.dispatchEvent(i)
            }
        },
        openPopupWin: function (e, t, n) {
            var i = "height=450,width=800,left=" + (n.outerWidth / 2 + n.screenX - 400) + ",top=" + (n.outerHeight / 2 + n.screenY - 225) + ",toolbar=no,menubar=no",
                s = n.open(e, t, i);
            n.focus && void 0 !== s && s.focus()
        },
        sendBannerEvent: function (e, t) {
            gtag("event", "view_item", {
                id: e,
                name: t,
                category: "abtesting"
            })
        }
    }, jQuery(document).ready(function (s) {
        var e = {
            vars: {
                accordions: void 0,
                positions: void 0
            },
            init: function () {
                this.vars.accordions = document.querySelectorAll(".js-accordion"), this.vars.positions = document.querySelectorAll(".js-position"), (this.vars.accordions || this.vars.positions) && (this.bindPositionsMobile(), this.bindPositions(), this.bindEvents(), this.bindTriggers(), this.resizePanes())
            },
            bindPositionsMobile: function () {
                window.matchMedia && window.matchMedia("(max-width: 768px)").matches && (1 < s(".js-position").length && s(".js-position").removeClass("is-open"), [].forEach.call(s(".js-position"), function (e) {
                    var t = s(e);
                    if (t) {
                        var n = t.width(),
                            i = t.offset().left;
                        0 <= i && i + n <= s(window).width() ? t.addClass("is-open") : t.removeClass("is-open")
                    }
                }))
            },
            bindPositions: function () {
                [].forEach.call(this.vars.positions, function (t) {
                    t && t.addEventListener("click", function (e) {
                        window.matchMedia && window.matchMedia("(min-width: 768px)").matches && t.classList.toggle("is-open")
                    })
                })
            },
            bindTriggers: function () {
                [].forEach.call(this.vars.accordions, function (t) {
                    var e = t.firstElementChild;
                    e && e.addEventListener("click", function (e) {
                        window.matchMedia ? window.matchMedia("(max-width: 1199px)").matches && (e.preventDefault(), t.classList.toggle("is-open")) : (e.preventDefault(), t.classList.toggle("is-open"))
                    })
                })
            },
            resizePanes: function () {
                var e = "object" == typeof mm_base.accordion ? mm_base.accordion : this;
                [].forEach.call(e.vars.accordions, function (e) {
                    var t = e.querySelector(".sub-menu");
                    t && (t.style.height = "", t.style.height = t.scrollHeight + "px")
                })
            },
            bindEvents: function () {
                s(window).on("resize", _.debounce(this.resizePanes, 500)), s(".c-accordion-positions").on("scroll", _.debounce(this.bindPositionsMobile, 100))
            }
        };
        e.init(), mm_base.accordion = e
    }), jQuery(document).ready(function (e) {
        //e.get(mm_base.vars.MM_BASE_SPRITES + "base/symbol/svg/sprite.symbol-79c02bf5.svg", function (e) {
        //    var t = document.createElement("div");
        //    t.className = "o-sprite-symbol-svg u-hidden", t.innerHTML = (new XMLSerializer).serializeToString(e.documentElement), document.body.insertBefore(t, document.body.childNodes[0])
        //})
    }), jQuery(document).ready(function (n) {
        var i = n(".c-site-header");

        function e() {
            mm_base.fn.isMobile() || n(".vc_desktop .animated-column").each(function () {
                var e = n(window).scrollTop() + n(window).height() - i.height();
                if (n(this).offset().top < e) {
                    var t = n(this);
                    t.hasClass("animated") || t.addClass("animate-now")
                }
            })
        }
        e(), n(window).scroll(function () {
            e()
        })
    }), jQuery(document).ready(function (c) {
        var e = {
            init: function () {
                var l = !1,
                    e = c(".js-benefits-expander"),
                    t = c(".js-benefits-expander-trigger");
                e.each(function () {
                    var e = c(this),
                        t = e.prev(".o-row");
                    if (t.length) {
                        var n = e.children(".js-benefits-expander-trigger"),
                            i = n.outerHeight();
                        n.hasClass("o-expander__trigger--reverse") || n.css({
                            top: -i
                        }), t.css({
                            "padding-bottom": i
                        });
                        var s = t[0].classList;
                        c.each(s, function (e, t) {
                            -1 !== t.indexOf("s-color-scheme") && n.addClass(t)
                        })
                    }
                }), t.on("click", function (e) {
                    if (e.preventDefault(), !l) {
                        l = !0;
                        var t = c(this),
                            n = t.data("state"),
                            i = t.outerHeight(),
                            s = t.hasClass("o-expander__trigger--reverse"),
                            a = c("#" + t.data("target"));
                        a.length || (a = t.closest(".c-benefits").find(".js-benefits-expander-content").parent());
                        var o = a.children(".js-benefits-expander-content"),
                            r = a.prev(".o-row");
                        n && "closed" !== n ? (t.data("state", "closed").removeClass("is-open").addClass("is-closed"), a.data("state", "closed").removeClass("is-open").addClass("is-closed"), o.data("state", "closed").removeClass("is-open").addClass("is-closed"), s && (o.animate({
                            "padding-bottom": 0
                        }), r.animate({
                            "padding-bottom": i
                        }))) : (t.data("state", "open").removeClass("is-closed").addClass("is-open"), a.data("state", "open").removeClass("is-closed").addClass("is-open"), o.data("state", "open").removeClass("is-closed").addClass("is-open"), s && (o.animate({
                            "padding-bottom": i
                        }), r.animate({
                            "padding-bottom": 0
                        })), mm_base.fn.custom_event("expander-open")), setTimeout(function () {
                            l = !1
                        }, 100)
                    }
                })
            }
        };
        e.init(), mm_base.expanders = e
    }), jQuery(document).ready(function (n) {
        function e() {
            n(".c-content-element__benefit").height("auto");
            var t = 0;
            n(".c-content-element__benefit").each(function () {
                var e = n(this).innerHeight();
                t < e && (t = e)
            }), n(".c-content-element__benefit").height(t)
        }

        function t() {
            n(".gift-campaign .c-card__source").height("auto");
            var t = 0;
            n(".gift-campaign .c-card__source").each(function () {
                var e = n(this).innerHeight();
                t < e && (t = e)
            }), n(".gift-campaign .c-card__source").height(t)
        }

        function i() {
            n(".c-solutions .c-card__source").height("auto");
            var t = 0;
            n(".c-solutions .c-card__source").each(function () {
                var e = n(this).innerHeight();
                t < e && (t = e)
            }), n(".c-solutions .c-card__source").height(t)
        }
        jQuery(window).on("resize", function () {
            e(), t(), i()
        }), e(), t(), i()
    }), jQuery(document).ready(function (t) {
        t(window).scroll(function () {
            ! function () {
                var e = t(".ebook-sticky");
                t(".ebook-sticky .js-sticky-element").hasClass("is-down") ? e.addClass("is-down") : e.removeClass("is-down")
            }()
        })
    }), jQuery(document).ready(function (d) {
        d(document).on("hsFormReady", ".js-hs-form-wrap", function (e) {
            d(".js-email-capture").each(function (e, t) {
                t.classList.remove("u-invisible");
                var c = d(t).find("form");
                c.on("submit", function (e) {
                    e.preventDefault();
                    var t, n = c.find(".js-email-capture__input"),
                        i = c.find(".js-email-capture__form_id"),
                        s = !!n.length && n.val(),
                        a = !!i.length && i.val();
                    if (t = a ? document.getElementById("hsForm_" + a) : document.querySelector('[id^="hsForm_"]')) {
                        if (s) {
                            var o = t.querySelector('input[name="email"]');
                            if (o) {
                                o.value = s, o.setAttribute("value", s);
                                var r = new Event("change");
                                o.dispatchEvent(r)
                            }
                        }
                        var l = d(t).parents(".o-row").first().get(0);
                        mm_base.fn.smooth_scroll(l, null, null, function () {
                            var e = t.querySelector("input");
                            e && e.focus()
                        })
                    }
                })
            })
        })
    }), jQuery(document).ready(function (c) {
        var e = {
            init: function () {
                var l = !1,
                    e = c(".js-expander"),
                    t = c(".js-expander-trigger");
                e.each(function () {
                    var e = c(this),
                        t = e.prev(".o-row");
                    if (t.length) {
                        var n = e.children(".js-expander-trigger"),
                            i = (n.find(".js-expander-content"), n.outerHeight());
                        n.hasClass("o-expander__trigger--reverse") || n.css({
                            top: -i
                        }), t.css({
                            "padding-bottom": i
                        });
                        var s = t[0].classList;
                        c.each(s, function (e, t) {
                            -1 !== t.indexOf("s-color-scheme") && n.addClass(t)
                        })
                    }
                }), t.on("click", function (e) {
                    if (e.preventDefault(), !l) {
                        l = !0;
                        var t = c(this),
                            n = t.data("state"),
                            i = t.outerHeight(),
                            s = t.hasClass("o-expander__trigger--reverse"),
                            a = c("#" + t.data("target"));
                        a.length || (a = t.parent());
                        var o = a.children(".js-expander-content"),
                            r = a.prev(".o-row");
                        n && "closed" !== n ? (t.data("state", "closed").removeClass("is-open").addClass("is-closed"), a.data("state", "closed").removeClass("is-open").addClass("is-closed"), o.data("state", "closed").removeClass("is-open").addClass("is-closed"), s && setTimeout(function () {
                            o.animate({
                                "padding-bottom": 0
                            }), r.animate({
                                "padding-bottom": i
                            })
                        }, 1e3)) : (t.data("state", "open").removeClass("is-closed").addClass("is-open"), a.data("state", "open").removeClass("is-closed").addClass("is-open"), o.data("state", "open").removeClass("is-closed").addClass("is-open"), s && (o.animate({
                            "padding-bottom": i
                        }), r.animate({
                            "padding-bottom": 0
                        })), mm_base.fn.custom_event("expander-open")), setTimeout(function () {
                            l = !1
                        }, 2e3)
                    }
                })
            }
        };
        e.init(), mm_base.expanders = e
    }), jQuery(document).ready(function (e) {
        for (var t = document.querySelectorAll(".s-cms-content a"), n = location.protocol + "//" + location.hostname, i = 0; i < t.length; i++)
            if (0 !== t[i].href.indexOf(n) && (t[i].target = "_blank", !e(t[i]).hasClass("c-btn"))) {
                t[i].classList.add("o-link-external");
                var s = document.createElement("span");
                s.classList.add("o-link-external__icon"), s.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10 10" style="enable-background:new 0 0 10 10;" xml:space="preserve"><polygon points="10,5 9,5 9,1 5,1 5,0 10,0 "/><polygon points="9,9 1,9 1,1 3,1 3,0 0,0 0,10 10,10 10,7 9,7 "/><rect x="6" y="-1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.3787 -3.5711)" width="1" height="9"/></svg>', t[i].appendChild(s)
            }
    }), jQuery(document).ready(function (e) {
        var t = {
            vars: {
                $feat_post: void 0,
                $main_gradient: void 0
            },
            init: function () {
                this.vars.$feat_post = e(".js-entry-featured"), this.vars.$main_gradient = e(".js-main-gradient"), this.vars.$feat_post.length && this.vars.$main_gradient.length && (this.position(), this.vars.$feat_post.hasClass("js-entry-featured--once") || e(window).on("resize", _.debounce(this.repositionOnResize, 500)))
            },
            position: function (e) {
                e = void 0 !== e ? e : 1e3;
                var t = this.vars.$feat_post.outerHeight();
                t = t || 0, this.vars.$feat_post.delay(e).animate({
                    "margin-top": -t / 2
                }, 1500), this.vars.$main_gradient.delay(e).animate({
                    "margin-bottom": 0,
                    "padding-bottom": t / 2
                }, 1500)
            },
            repositionOnResize: function () {
                mm_base.feat_post_position.position(0)
            }
        };
        t.init(), mm_base.feat_post_position = t
    }), jQuery(document).ready(function (a) {
       
    }), jQuery(document).ready(function (r) {
        
    }), jQuery(document).ready(function (e) {
        for (var t = document.querySelectorAll(".glide"), n = 0; n < t.length; n++) {
            new Glide(t[n], {
                type: "slider",
                startAt: 0,
                perView: 5,
                rewind: !1,
                peek: {
                    before: 100,
                    after: 10
                },
                bound: !0,
                breakpoints: {
                    800: {
                        perView: 3
                    },
                    500: {
                        perView: 2
                    },
                    400: {
                        perView: 1,
                        peek: {
                            before: 20,
                            after: 20
                        }
                    }
                }
            }).mount()
        }
    }), jQuery(document).ready(function (e) {
        var t, n, i;
        e("#wordChanger").css("color", "#03A8F5"), t = ["инженери", "лидери", "създатели", "иноватори", "хора"], n = 0, i = ["#03A8F5", "#29D29A", "#FF9400", "#EA0089", "#3C06E5"], setInterval(function () {
            e("#wordChanger").fadeOut(function () {
                e(this).html(t[n = (n + 1) % t.length]).css("color", i[n]).fadeIn()
            })
        }, 2e3)
    }), jQuery(document).ready(function (n) {
        var i;
        n(window).one("touchstart", function () {
            i = !0
        });
        var s = n(".js-touch-hover");
        s.on("click", function (e) {
            if (i) {
                var t = n(this);
                t.hasClass("is-hover") || (s.removeClass("is-hover"), t.addClass("is-hover"), e.preventDefault())
            }
        })
    }), jQuery(document).ready(function (o) {
        var e = {
            options: {
                container: ".js-inf-scroll-container",
                loadingClass: "o-infinite-loading",
                items: ".js-inf-scroll-item",
                more: ".js-inf-scroll-nav .current + .page-numbers"
            },
            load: function () {
                var s = o(this.options.container),
                    a = o(this.options.more);
                o.get(o(this.options.more).prop("href")).done(o.proxy(function (e) {
                    var t = o(o.parseHTML(e)),
                        n = t.find(this.options.more),
                        i = t.find(this.options.items);
                    i.length || (i = t.filter(this.options.items)), i.addClass("animated fadeIn"), s.append(i), s.removeClass(this.options.loadingClass), n.length || (n = t.filter(this.options.more)), n.length ? (a.replaceWith(n), a = n, this.init()) : a.remove()
                }, this)).fail(o.proxy(function () {
                    s.removeClass(this.options.loadingClass), this.init()
                }, this))
            },
            init: function () {
                var t = o(".js-inf-scroll-load-more"),
                    e = o(".js-inf-scroll-load-more-btn"),
                    n = o(this.options.container);
                t.fadeIn(), e.off("click").on("click", o.proxy(function (e) {
                    e.preventDefault(), o(this.options.items).addClass("js-infinite-scroll-item--old"), t.fadeOut(o.proxy(function () {
                        n.addClass(this.options.loadingClass), this.load()
                    }, this))
                }, this))
            }
        };
        e.init(), mm_base.inf_scroll = e
    }), jQuery(document).ready(function (e) {
        function t() {
            e(".o-lazy-load").not(".o-lazy-load--complete").each(function (e, t) {
                mm_base.fn.in_viewport(t) ? n(t) : new Waypoint({
                    offset: "200%",
                    handler: function () {
                        n(t), this.destroy()
                    },
                    element: t
                })
            })
        }

        function n(t) {
            if (t.getAttribute("data-lazy-src") && (t.setAttribute("src", t.getAttribute("data-lazy-src")), t.removeAttribute("data-lazy-src")), t.getAttribute("data-lazy-srcset") && (t.setAttribute("srcset", t.getAttribute("data-lazy-srcset")), t.removeAttribute("data-lazy-srcset")), t.getAttribute("data-lazy-style")) {
                var e = t.getAttribute("style"),
                    n = t.getAttribute("data-lazy-style"),
                    i = e ? e + " " + n : n;
                t.setAttribute("style", i), t.removeAttribute("data-lazy-style")
            }
            t.classList.contains("o-lazy-load--vc") && (t.className = t.className.replace(/\bo-lazy-load--vc o-lazy-load--/g, ""), t.classList.add("o-lazy-load--complete")), t.getAttribute("src") && t.addEventListener("load", loadListener = function (e) {
                t.classList.add("o-lazy-load--complete"), e.target.removeEventListener(e.type, loadListener)
            })
        }
        t(), document.addEventListener("content-sets-ready", t), document.addEventListener("expander-open", t)
    }), jQuery(document).ready(function (c) {
        var e = {
            setCookie: function (e, t, n) {
                var i = new Date;
                i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
                var s = "expires=" + i.toUTCString();
                document.cookie = e + "=" + t + ";" + s + ";path=/"
            },
            getCookie: function (e) {
                for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
                    for (var s = n[i];
                        " " == s.charAt(0);) s = s.substring(1);
                    if (0 == s.indexOf(t)) return s.substring(t.length, s.length)
                }
                return ""
            },
            homepageAnimations: function () {
                return ["homepage-01", "homepage-02", "homepage-03", "homepage-04"]
            },
            randomAnimation: function () {
                this.homepageAnimations();
                var e = this.getCookie("anim"),
                    t = "";
                return "" != e ? "homepage-01" == e ? t = "homepage-02" : "homepage-02" == e ? t = "homepage-03" : "homepage-03" == e ? t = "homepage-04" : "homepage-04" == e && (t = "homepage-01") : t = "homepage-01", this.setCookie("anim", t, 365), t
            },
            checkCookie: function () {
                var e = this.getCookie("visits");
                if ("" != e) {
                    var t = Number(e) + 1;
                    this.setCookie("visits", t, 365), this.randomAnimation()
                } else this.setCookie("visits", 0, 365), this.randomAnimation()
            },
            init: function () {
                var t = this,
                    e = setInterval(function () {
                        "undefined" != typeof _hsq && null !== _hsq && (clearInterval(e), _hsq.push(["addPrivacyConsentListener", function (e) {
                            (e.allowed || e.categories.functionality) && document.body.className.match("c-body--home") && t.checkCookie()
                        }]))
                    }, 100);
                this.startAnimations(), c(".c-card").mouseenter(function () {
                    c(".c-card__img").hasClass("no-filter") || c(this).find(".c-card__img").removeClass("filtered")
                }).mouseleave(function () {
                    c(".c-card__img").hasClass("no-filter") || c(this).find(".c-card__img").addClass("filtered")
                })
            },
            addHsqListener: function () {
                _hsq.push(["addPrivacyConsentListener", function (e) {
                    var t = e.previousCategories,
                        n = e.categories;
                    n.analytics && n.advertisement, t.analytics && t.advertisement;
                    (e.allowed || e.categories.functionality) && document.body.className.match("c-body--home") && this.checkCookie()
                }])
            },
            changeColor: function (e, t, n) {
                color = t.attr("data-color"), "gray" == color ? (e.find("path").css("fill", "#ddd"), e.find("path").css("stroke", "#ddd"), t.attr("data-color", "initial"), n.goToAndStop(0)) : "initial" == color && (e.find("path").css("fill", ""), e.find("path").css("stroke", ""), t.attr("data-color", "gray"), n.play())
            },
            startAnimations: function () {
                //debugger;
                var l = this;
                c.each(c(".animation-holder"), function (e, t) {
                    //debugger;
                    var n = c(this).find(".animated-icon"),
                        i = n.data("section");
                    c(this)[0];
                    void 0 === n.data("loop") ? loop = !0 : loop = "true" === n.attr("data-loop"), void 0 === n.data("autoplay") ? autoplay = !0 : autoplay = "true" === n.attr("data-autoplay");
                    var s = n.attr("data-icon");
                    if ("homepage-rotate" == s) {
                        s = "homepage";
                    }
                    var o = "/json/" + s + ".json";
                    //debugger;
                    if (1 == 1) {
                        var r = lottie.loadAnimation({
                            container: n[0],
                            renderer: "svg",
                            loop: loop,
                            autoplay: autoplay,
                            path: o
                        });
                        !1 === autoplay && "teams" == i && (r.removeEventListener("loopComplete"), r.pause()), !1 === autoplay && "approach" != i && (c(c(this)).on("mouseenter", function () {
                            r.removeEventListener("loopComplete"), r.setSpeed(1), r.play()
                        }), c(c(this)).on("mouseleave", function () {
                            r.setSpeed(1.5), r.addEventListener("loopComplete", function () {
                                r.pause()
                            })
                        })), !1 === autoplay && "positions" == i && c(c(this)).closest(".c-accordion-position").on("click", function (e) {
                            c(this).hasClass("is-open") ? (r.removeEventListener("loopComplete"), r.setSpeed(1), r.play()) : (r.setSpeed(1.5), r.addEventListener("loopComplete", function () {
                                r.pause()
                            }))
                        }), !1 === autoplay && "services_mini" == i && (c(c(this)).on("mouseenter", function () {
                            r.removeEventListener("loopComplete"), r.setSpeed(1), r.play()
                        }), c(c(this)).on("mouseleave", function () {
                            r.setSpeed(1.5), r.addEventListener("loopComplete", function () {
                                r.pause()
                            }), r.goToAndStop(0)
                        })), !1 === autoplay && "positions_list" == i && (c(c(this)).closest(".c-positions-list-single").on("mouseenter", function (e) {
                            c(this).find(".c-positions-list-single__heading").removeClass("filtered"), r.removeEventListener("loopComplete"), r.setSpeed(1), r.play()
                        }), c(c(this)).closest(".c-positions-list-single").on("mouseleave", function (e) {
                            c(this).find(".c-positions-list-single__heading").addClass("filtered"), r.setSpeed(1.5), r.addEventListener("loopComplete", function () {
                                r.pause()
                            })
                        })), r.addEventListener("DOMLoaded", function (e) {
                            var t = r.getDuration(!1);
                            l.changeColor(c(r.wrapper), n, r), setTimeout(function () {
                                c(r.wrapper).find("path").css("transition", "fill .4s ease-out"), c(r.wrapper).find("path").css("transition", "stroke .4s ease-out")
                            }, 400), n.css("visibility", "visible"), setInterval(function () {
                                l.changeColor(c(r.wrapper), n, r)
                            }, 970 * t), c(".c-approach-block").length && c(window).scroll(function () {
                                c(".c-approach-block").offset().top + c(".c-approach-block").outerHeight() - c(window).height() - 1300 < c(this).scrollTop() && "approach" == i && (r.loop = !1, r.play())
                            }), n.css("visibility", "")
                        })
                    }
                })
            }
        };
        e.init(), mm_base.animations = e
    }), jQuery(document).ready(function (t) {
        var n = 0,
            i = t(".js-overlay-nav__layer"),
            s = t(".c-menu-primary"),
            a = t(".js-overlay-nav__trigger"),
            e = t(".c-menu-primary__item"),
            o = i.width();

        function r() {
            var e = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                t = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            n = Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2) / o)
        }
        r(), t(window).on("resize", _.debounce(r, 500)), e.on("click", function (e) {
            a.hasClass("is-open") && (a.removeClass("is-open"), s.removeClass("is-visible"), i.velocity({
                translateZ: 0,
                scaleX: 0,
                scaleY: 0
            }, 300, "easeInOutCubic", function () {}))
        }), a.on("click", function (e) {
            t(".js-region-switcher").removeClass("is-open"), a.hasClass("is-open") ? (a.removeClass("is-open"), s.removeClass("is-visible"), i.velocity({
                translateZ: 0,
                scaleX: 0,
                scaleY: 0
            }, 300, "easeInOutCubic", function () {})) : (e.preventDefault(), a.addClass("is-open"), i.velocity({
                translateZ: 0,
                scaleX: n,
                scaleY: n
            }, 600, "easeInOutCubic", function () {
                s.addClass("is-visible")
            }))
        })
    }), jQuery(document).ready(function (l) {
        l(document).on("click", ".hs-button", function () {
            e = l(this), setTimeout(function () {
                l(".hs-error-msg").length || e.parent().hasClass("is-loading") || (e.parent().addClass("is-loading"), e.parent().append('<div class="loader loader--style2" title="1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml"attributeName="transform"type="rotate"from="0 25 25"to="360 25 25"dur="0.6s"repeatCount="indefinite"/></path></svg></div>'))
            }, 1e3)
        });
        var c = {
            init: function () {              
            },
            appliedForPositionHiddenField: function (e, t, n) {
                var i = l(".js-single-post-title").text(),
                    s = i || document.title;
                e.val(s.trim())
            },
            fileInput: function (e, t, n) {
                t.addClass("js-file-input")
            },
            filterCities: function (e, t, n) {
                "undefined" != typeof mmJobsCurrentLocations && "object" == typeof mmJobsCurrentLocations && e.children("option").filter(function () {
                    return "" !== this.value && !~l.inArray(this.value, mmJobsCurrentLocations)
                }).remove()
            },
            preSelectCity: function (e, t, n) {
                var i = mm_base.fn.getURLParameterByName("city");
                i && e.children("option").filter(function () {
                    return this.value === i
                }).prop("selected", "selected").change()
            },
            inputEventHandler: function (e, t, n) {
                var i = "is-invalid",
                    s = "is-focused",
                    a = "has-value";
                e.on("checkval", function () {
                    setTimeout(function () {
                        "" !== this.value ? t.addClass(a) : t.removeClass(a), e.hasClass("is-invalid") ? t.addClass(i) : t.removeClass(i)
                    }, 100)
                }).on("change", function () {
                    e.trigger("checkval"), e.blur()
                }).on("focus", function () {
                    e.trigger("checkval"), t.addClass(s)
                }).on("blur", function () {
                    e.trigger("checkval"), t.removeClass(s)
                }).trigger("checkval")
            }
        };
        c.init(), mm_base.focus_blur_inputs = c, l(document).on("hsFormReady", ".js-hs-form-wrap", function (e) {
            mm_base.focus_blur_inputs.init()
        })
    }), jQuery(document).ready(function (t) {
        t(window).scroll(function () {
            var e = t(window).scrollTop();
            t("#bg2").css({
                transform: "translate(0px, -" + e / 2 + "px)"
            }), t("#bg1").css({
                transform: "translate(0px, -" + e / 3.5 + "px)"
            })
        })
    }), jQuery(document).ready(function (e) {
        var o = document.documentElement.clientHeight,
            t = !1,
            a = document.getElementsByClassName("js-parallax-bgnd"),
            r = document.getElementsByClassName("js-parallax-fgnd");

        function n() {
            ! function () {
                for (var e, t, n, i, s = 0; s < a.length; s++) e = (t = a[s]).getAttribute("data-parallax-speed") ? parseFloat(t.getAttribute("data-parallax-speed")) : .2, n = t.parentNode, mm_base.fn.in_viewport(n) && (i = n.getBoundingClientRect(), l(t, (o - i.top) * e))
            }(),
            function () {
                if (!mm_base.fn.isMobile())
                    for (var e, t, n, i, s, a = 0; a < r.length; a++) t = (n = r[a]).getAttribute("data-parallax-speed") ? parseFloat(n.getAttribute("data-parallax-speed")) : .2, e = !!n.getAttribute("data-parallax-start-at-top") && mm_base.fn.to_boolean(n.getAttribute("data-parallax-start-at-top")), mm_base.fn.in_viewport(n) && (i = e ? window.pageYOffset * t : (s = n.getBoundingClientRect(), (.7 * o - s.top) * t), n.firstElementChild.style.marginTop = "-" + i + "px")
            }(), t = !1
        }

        function l(e, t) {
            if (e) {
                var n = "translate3d(0px, " + t + "px, 0px)";
                e.style["-webkit-transform"] = n, e.style["-moz-transform"] = n, e.style["-ms-transform"] = n, e.style["-o-transform"] = n, e.style.transform = n
            }
        }

        function i() {
            t || (window.requestAnimationFrame(n), window.requestAnimationFrame(_.debounce(s, 500)), t = !0)
        }

        function s() {
            Waypoint.refreshAll()
        }

        function c() {
            i()
        }

        function d() {
            u(), i()
        }

        function u() {
            o = document.documentElement.clientHeight,
                function () {
                    for (var e, t, n, i = 0; i < a.length; i++) e = (t = a[i]).getAttribute("data-parallax-speed") ? parseFloat(t.getAttribute("data-parallax-speed")) : .2, n = o * e, t.style.top = "-" + n + "px"
                }()
        }
        Modernizr.cssmask || mm_base.fn.isMobile() || [].forEach.call(r, function (e) {
            for (var t = e, n = window.getComputedStyle(t, null).getPropertyValue("background-color");
                "rgba(0, 0, 0, 0)" === n || "transparent" === n;) n = (t = t.parentNode).classList.contains("c-site-content") ? "rgba(255, 255, 255, 1)" : window.getComputedStyle(t, null).getPropertyValue("background-color");
            var i = mm_base.fn.parse_rgba(n);
            i[3] = "0";
            var s = "rgba(" + i.join() + ")",
                a = mm_base.fn.create_fragment('<div class="js-parallax-fgnd__grad" style="background-image: linear-gradient(to bottom, ' + n + ", " + s + ');"></div>');
            e.appendChild(a)
        }), u(), n(), window.addEventListener("scroll", c), window.addEventListener("resize", _.debounce(d, 500))
    }), jQuery(document).ready(function (s) {
        var e = s(".partner-network-company-field"),
            t = s(".c-accordion-position");
        if (s('select[name="bg_dropdown_test"]') && t.length) {
            s(".partner-network-form").hide(), e.on("change", function () {
                "yes" == s(this).children("option:selected").val() || "no" == s(this).children("option:selected").val() ? (s(".partner-network-form").hide(), s(".partner-network-form[data-select=" + s(this).children("option:selected").val() + "]").show()) : s(".partner-network-form").hide()
            }), t.on("click", function () {
                s(this).find(".c-readmore").on("click", function () {
                    var e = s(this).attr("data-form");
                    e && s('select[name="bg_dropdown_test"] > option[value=' + e + "]").prop("selected", "selected").change()
                })
            });
            var n = setInterval(function () {
                s('select[name="bg_dropdown_test"]').length && (i(), clearInterval(n))
            }, 100);
            s(".table_wrapper").on("scroll", function () {
                ! function () {
                    var e = s(".table_wrapper"),
                        t = s("#myBar"),
                        n = e[0].scrollWidth - e[0].offsetWidth,
                        i = e.scrollLeft() / n * 100;
                    t.css("width", i + "%")
                }()
            }), s(".c-accordion-positions__el").each(function () {
                s(this).on("click", function () {})
            })
        }

        function i() {
            if (window.location.hash) {
                var e = window.location.hash.substring(1);
                1 == function (e, t) {
                    return new RegExp("\\b" + t + "\\b", "i").test(e)
                }(e, "apply") && (s('select[name="partner-network-company-field"] > option[value="no"]').prop("selected", "selected").change(), e = e.replace("apply-", ""), s('select[name="bg_dropdown_test"] > option[value="' + e + '"]').prop("selected", "selected").change(), s("html, body").animate({
                    scrollTop: s("#contact-us-form").offset().top
                }, 50))
            }
        }
    }), jQuery(document).ready(function (n) {
        n.each(n(".additional-section-accordion"), function (e, t) {
            n(n(this).find(".additional-section-accordion__title")).on("click", function (e) {
                n(this).offsetParent().toggleClass("opened")
            })
        }), n.each(n(".c-section-accordion"), function (e, t) {
            n(n(this).find(".c-section-accordion__heading")).on("click", function (e) {
                n(this).offsetParent().toggleClass("opened")
            })
        })
    }), jQuery(document).ready(function (n) {
    }), jQuery(document).ready(function (e) {
        var t = {
            vars: {
                isScrolling: !1,
                $panes: void 0,
                $nav: void 0,
                currentPane: void 0
            },
            init: function () {
                this.vars.$panes = e(".js-scroll-pane"), this.vars.$nav = e(".js-scroll-pane-nav"), this.vars.$panes.length && (this.prepare(), this.createNav(), this.bindings())
            },
            prepare: function (e) {
                var t = mm_base.scroll_by_screen ? mm_base.scroll_by_screen : this;
                if (!t.vars.isScrolling)
                    for (var n = t.vars.$panes, i = n.length, s = 0; s < i; s++)
                        if (mm_base.fn.in_viewport(n[s])) {
                            t.vars.currentPane = s;
                            break
                        }
            },
            createNav: function () {
                var a = "";
                this.vars.$panes.each(function (e) {
                    a += '<span class="c-showcase__nav-item js-scroll-pane-nav-item" data-index="' + e + '"></span>'
                }), this.vars.$panes.each(function (e, t) {
                    if (t.classList.contains("has-nav")) {
                        var n = t.querySelector(".js-scroll-pane-nav");
                        if (n) {
                            n.appendChild(mm_base.fn.create_fragment(a));
                            var i = e + 1,
                                s = n.querySelector(".c-showcase__nav-item:nth-child(" + i + ")");
                            s && s.classList.add("is-active")
                        }
                    }
                })
            },
            bindings: function () {
                e(window).on("resize", _.debounce(this.prepare, 350)), this.vars.$panes.on("click", ".js-scroll-pane-nav-item", this.onClick)
            },
            navigateTo: function (t) {
                if (!1 !== (t = void 0 !== t && parseInt(t)) && !this.vars.isScrolling) {
                    var e = this.vars.$panes;
                    t < 0 || t > e.length - 1 ? t === e.length && (this.vars.currentPane = t) : (this.vars.isScrolling = !0, mm_base.fn.smooth_scroll(e[t], void 0, "easeOutQuart", function () {
                        var e = mm_base.scroll_by_screen;
                        e.vars.currentPane = t, e.vars.isScrolling = !1
                    }))
                }
            },
            onClick: function (e) {
                var t = mm_base.scroll_by_screen,
                    n = e.target.getAttribute("data-index");
                t.navigateTo.call(t, n)
            },
            onScroll: function (e) {
                var t = mm_base.scroll_by_screen,
                    n = t.vars.currentPane,
                    i = 0 < e.deltaY ? n - 1 : n + 1;
                t.navigateTo.call(t, i)
            }
        };
        t.init(), mm_base.scroll_by_screen = t
    }),
    function (a) {
        var o = a(window),
            u = [],
            r = [],
            s = !1,
            l = 0,
            c = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };

        function d() {
            ++l;
            var e = o.scrollTop(),
                t = o.scrollLeft(),
                n = t + o.width(),
                i = e + o.height(),
                s = function (o, r, l, c) {
                    var d = a();
                    return a.each(u, function (e, t) {
                        var n = t.offset().top,
                            i = t.offset().left,
                            s = i + t.width(),
                            a = n + t.height();
                        r < i || s < c || l < n || a < o || d.push(t)
                    }), d
                }(e + c.top, n + c.right, i + c.bottom, t + c.left);
            a.each(s, function (e, t) {
                "number" != typeof t.data("scrollSpy:ticks") && t.triggerHandler("scrollSpy:enter"), t.data("scrollSpy:ticks", l)
            }), a.each(r, function (e, t) {
                var n = t.data("scrollSpy:ticks");
                "number" == typeof n && n !== l && (t.triggerHandler("scrollSpy:exit"), t.data("scrollSpy:ticks", null))
            }), r = s
        }

        function t() {
            o.trigger("scrollSpy:winSize")
        }
        var f = Date.now || function () {
            return (new Date).getTime()
        };

        function h(n, i, s) {
            var a, o, r, l = null,
                c = 0;
            s = s || {};

            function d() {
                c = !1 === s.leading ? 0 : f(), l = null, r = n.apply(a, o), a = o = null
            }
            return function () {
                var e = f();
                c || !1 !== s.leading || (c = e);
                var t = i - (e - c);
                return a = this, o = arguments, t <= 0 ? (clearTimeout(l), l = null, c = e, r = n.apply(a, o), a = o = null) : l || !1 === s.trailing || (l = setTimeout(d, t)), r
            }
        }
        a.scrollSpy = function (e, t) {
            (e = a(e)).each(function (e, t) {
                u.push(a(t))
            }), t = t || {
                throttle: 100
            }, c.top = t.offsetTop || 0, c.right = t.offsetRight || 0, c.bottom = t.offsetBottom || 0, c.left = t.offsetLeft || 0;

            function n() {
                a(document).ready(i)
            }
            var i = h(d, t.throttle || 100);
            return s || (o.on("scroll", n), o.on("resize", n), s = !0), setTimeout(n, 0), e
        }, a.winSizeSpy = function (e) {
            return a.winSizeSpy = function () {
                return o
            }, e = e || {
                throttle: 100
            }, o.on("resize", h(t, e.throttle || 100))
        }, a.fn.scrollSpy = function (e) {
            return a.scrollSpy(a(this), e)
        }
    }(jQuery), jQuery(document).ready(function (s) {
        var e = s(".js-service-link"),
            a = s(".c-site-header");
        e.on("click", function (e) {
            e.preventDefault();
            var t = s(this).attr("href"),
                n = s(t);
            if (n.length) {
                var i = n.children().find(".js-service-toggle-button").first();
                new Waypoint({
                    offset: function () {
                        return offset = a.height(), offset + 2
                    },
                    handler: function () {
                        this.disable(), n.hasClass("o-toggle-visibility") || i.trigger("click")
                    },
                    element: n[0]
                })
            }
        })
    }), jQuery(document).ready(function (l) {
        
    }), jQuery(document).ready(function (e) {
        ({
            vars: {
                $menus: void 0,
                $links: void 0
            },
            init: function () {
                this.vars.$menus = e(".js-sharing-menu"), this.vars.$links = this.vars.$menus.find("a"), this.vars.$menus.length && this.bind()
            },
            bind: function () {
                this.vars.$links.on("click", function (e) {
                    e.preventDefault();
                    var t = this.getAttribute("href");
                    mm_base.fn.openPopupWin(t, "mmSharerPopup", window)
                })
            }
        }).init()
    }), location.hash && (window.scrollTo(0, 0), setTimeout(function () {
        window.scrollTo(0, 0)
    }, 1)), jQuery(document).ready(function (e) {
        e(".js-smooth-scroll").click(function (e) {
            e.preventDefault(), location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname && mm_base.fn.smooth_scroll(this.hash.slice(1))
        }), e(window).on("load", function () {
            location.hash && setTimeout(function () {
                mm_base.fn.smooth_scroll(location.hash.slice(1))
            }, 0)
        })
    }), jQuery(document).ready(function (i) {
        var e = i(".js-sticky-icon"),
            n = i(".js-service-content"),
            s = i(".c-site-header"),
            t = !1;
        if (e.length && n.length)
            if (r(), i(window).on("resize", _.debounce(r, 500)), n.on("service-content-resize", r), n.on("service-content-resize", function () {
                    Waypoint.refreshAll()
                }), window.matchMedia) {
                var a = window.matchMedia("(min-width: 900px)");
                a.addListener(function (e) {
                    e.matches ? o() : (Waypoint.destroyAll(), t = !1)
                }), a.matches && o()
            } else o();

        function o() {
            t || (t = !0, n.each(function () {
                var e = i(this),
                    t = e.find(".js-sticky-icon");
                t.each(function (e, t) {
                    new Waypoint.Sticky({
                        stuckClass: "is-sticky",
                        offset: function () {
                            return s.height()
                        },
                        wrapper: '<div class="o-sticky u-dn u-db@md" />',
                        element: t
                    })
                });
                new Waypoint({
                    offset: function () {
                        return offset = -e.height() + s.height() + t.height(), n.hasClass("o-toggle-visibility") && (offset -= 2), offset
                    },
                    handler: function (e) {
                        "down" === e ? t.addClass("is-down") : t.removeClass("is-down")
                    },
                    element: e[0]
                })
            }))
        }

        function r() {
            e.each(function (e) {
                var t = i(this),
                    n = t.parent().width();
                t.css({
                    width: n
                })
            })
        }
    }), jQuery(document).ready(function (e) {
        var t = e(".js-sticky-menu-sotsial-header"),
            n = e(".c-single-entry__header");
        if (t.length && n.length) new Waypoint({
            handler: function (e) {
                "up" === e ? t.addClass("is-hidden") : t.removeClass("is-hidden")
            },
            element: n[0]
        })
    }), jQuery(document).ready(function (e) {
        var t = e(".js-sticky-menu-sotsial"),
            n = e(".js-single-entry"),
            i = e(".c-site-header");
        if (t.length && n.length) new Waypoint.Sticky({
            stuckClass: "is-sticky",
            offset: function () {
                return i.height()
            },
            wrapper: '<div class="o-sticky" />',
            element: t[0]
        }), new Waypoint({
            offset: function () {
                return offset = -n.height() + i.height() + t.outerHeight(!0), offset
            },
            handler: function (e) {
                "down" === e ? t.addClass("is-down") : t.removeClass("is-down")
            },
            element: n[0]
        })
    }), jQuery(document).ready(function (i) {
        var t = i(".js-sticky-element"),
            n = i(".js-sticky-section"),
            s = i(".c-site-header"),
            a = !1;
        if (t.length && n.length)
            if (r(), i(window).on("resize", _.debounce(r, 500)), n.on("sticky-section-resize", r), n.on("sticky-section-resize", function () {
                    Waypoint.refreshAll()
                }), window.matchMedia) {
                var e = window.matchMedia("(min-width: 900px)");
                e.addListener(function (e) {
                    e.matches ? o() : (Waypoint.destroyAll(), a = !1, t.hasClass("is-sticky") && t.removeClass("is-sticky"))
                }), e.matches && o()
            } else o();

        function o() {
            a || (a = !0, n.each(function () {
                var e = i(this),
                    t = e.find(".js-sticky-element");
                t.each(function (e, t) {
                    new Waypoint.Sticky({
                        stuckClass: "is-sticky",
                        offset: function () {
                            return s.height()
                        },
                        wrapper: '<div class="o-sticky " />',
                        element: t
                    })
                });
                new Waypoint({
                    offset: function () {
                        return offset = -e.height() + s.height() + t.height(), n.hasClass("o-toggle-visibility") && (offset -= 2), offset
                    },
                    handler: function (e) {
                        "down" === e ? (t.addClass("is-down"), t.parent().parent().addClass("is-down"), n.addClass("is-down")) : (t.removeClass("is-down"), t.parent().parent().removeClass("is-down"), n.removeClass("is-down"))
                    },
                    element: e[0]
                })
            }))
        }

        function r() {
            t.each(function (e) {
                var t = i(this),
                    n = i(".sticky-section").width();
                t.css({
                    width: n
                })
            })
        }
    }), jQuery(document).ready(function (e) {
        e(document).on("hsFormReady", ".js-hs-form-wrap", function (e) {})
    }), jQuery(document).ready(function (f) {
        f(".js-swipe-posts").each(function (e, n) {
            var i, s, a, o, t, r, l, c = n.querySelector(".js-inf-scroll-container");

            function d(e) {
                var t = i + e;
                t <= 0 || s < t || (1 === t ? (o.classList.remove("is-disabled"), a.classList.add("is-disabled")) : (t === s ? o.classList.add("is-disabled") : o.classList.remove("is-disabled"), a.classList.remove("is-disabled")), i = t, n.setAttribute("data-paged-current", t))
            }

            function u() {
                i = 1;
                for (var e = r = 0; e < l; e++) r += t[e].offsetWidth;
                s = Math.round(r / c.offsetWidth), n.setAttribute("data-paged-current", i), n.setAttribute("data-paged-total", s), i === s ? (o.classList.add("is-hidden"), a.classList.add("is-hidden")) : (o.classList.remove("is-hidden"), a.classList.remove("is-hidden"), a.classList.add("is-disabled"), o.classList.remove("is-disabled"))
            }
            c && (a = n.querySelector(".js-swipe-posts-nav-prev"), o = n.querySelector(".js-swipe-posts-nav-next"), t = c.children, l = t.length, u(), a.addEventListener("click", function () {
                d(-1)
            }), o.addEventListener("click", function () {
                d(1)
            }), f(n).on("swipeleft swiperight", function (e) {
                e.stopPropagation(), "swipeleft" === e.type ? d(1) : "swiperight" === e.type && d(-1)
            }), window.addEventListener("resize", _.debounce(u, 500)))
        })
    });
var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: !0,
        pagination: {
            el: ".swiper-pagination",
            clickable: !0
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }),
    relatedPosts = new Swiper(".swiper-related-posts", {
        direction: "horizontal",
        loop: !0,
        slidesPerView: 2,
        slidesPerGroup: 2,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
jQuery(document).ready(function (n) {
    var e = n(".js-service-toggle-button"),
        t = n(".js-service-content"),
        i = window.location.hash;
    if (r(), n(window).on("resize", _.debounce(r, 500)), Modernizr.csstransitions ? t.on(mm_base.fn.get_transitionend_event_name(), function (e) {
            "max-height" === e.originalEvent.propertyName && o(n(this))
        }) : o(n(this)), "" !== i) {
        var s;
        try {
            s = document.querySelector(i)
        } catch (e) {
            s = !1
        }
        if (!s) return;
        var a = n(i);
        a.length && (a.addClass("o-toggle-visibility"), o(a))
    }

    function o(e) {
        e.trigger("service-content-resize")
    }

    function r() {
        t.each(function () {
            var e = n(this);
            if (!e.hasClass("o-toggle-visibility")) {
                e.css({
                    "max-height": "none"
                });
                var t = e.outerHeight();
                e.css({
                    "max-height": t
                })
            }
        })
    }
    e.on("click", function (e) {
        e.preventDefault();
        var t = n(this).parents(".js-service-content");
        history.replaceState && history.replaceState({}, "", this.href), t.toggleClass("o-toggle-visibility")
    })
}), jQuery(document).ready(function (r) {
    var t = r(".c-site-header");

    function e() {
        if (!mm_base.fn.isMobile()) {
            var e = r(window).height(),
                a = r(window).scrollTop(),
                o = a + e - t.height();
            r(".animated-section").each(function () {
                r(this).find(".wpb_animate_when_almost_visible").each(function (e, t) {
                    var n = r(this),
                        i = n.outerHeight(),
                        s = n.offset().top;
                    a <= s + i && s <= o && setTimeout(function () {
                        n.addClass("wpb_animate_when_almost_visible_now")
                    }, 0)
                })
            })
        }
    }
    e(), r(window).scroll(function () {
        e()
    })
});