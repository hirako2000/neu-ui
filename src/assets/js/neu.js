"use strict";
$(function () {

    // options
    var breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };

    var $navbarCollapse = $('.navbar-main .collapse');

    // Collapse navigation
    $navbarCollapse.on('hide.bs.collapse', function () {
        var $this = $(this);
        $this.addClass('collapsing-out');
        $('html, body').css('overflow', 'initial');
    });

    $navbarCollapse.on('hidden.bs.collapse', function () {
        var $this = $(this);
        $this.removeClass('collapsing-out');
    });

    $navbarCollapse.on('shown.bs.collapse', function () {
        $('html, body').css('overflow', 'hidden');
    });

    $('.navbar-main .dropdown').on('hide.bs.dropdown', function () {
        var $this = $(this).find('.dropdown-menu');

        $this.addClass('close');

        setTimeout(function () {
            $this.removeClass('close');
        }, 200);

    });

    $(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.navbar-nav > .dropdown', function (e) {
        e.stopPropagation();
    });

    $('.dropdown-submenu > .dropdown-toggle').click(function (e) {
        e.preventDefault();
        $(this).parent('.dropdown-submenu').toggleClass('show');
    });

    // Headroom - show/hide navbar on scroll
    if ($('.headroom')[0]) {
        var headroom = new Headroom(document.querySelector("#navbar-main"), {
            offset: 0,
            tolerance: {
                up: 0,
                down: 0
            },
        });
        headroom.init();
    }

    // Background images for sections
    $('[data-background]').each(function () {
        $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
    });

    $('[data-background-color]').each(function () {
        $(this).css('background-color', $(this).attr('data-background-color'));
    });

    $('[data-color]').each(function () {
        $(this).css('color', $(this).attr('data-color'));
    });

    // Datepicker
    $('.datepicker')[0] && $('.datepicker').each(function () {
        $('.datepicker').datepicker({
            disableTouchKeyboard: true,
            autoclose: false
        });
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Popover
    $('[data-toggle="popover"]').each(function () {
        var popoverClass = '';
        if ($(this).data('color')) {
            popoverClass = 'popover-' + $(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover ' + popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });

    // Additional .focus class on form-groups
    $('.form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // NoUI Slider
    if ($(".input-slider-container")[0]) {
        $('.input-slider-container').each(function () {

            var slider = $(this).find('.input-slider');
            var sliderId = slider.attr('id');
            var minValue = slider.data('range-value-min');
            var maxValue = slider.data('range-value-max');

            var sliderValue = $(this).find('.range-slider-value');
            var sliderValueId = sliderValue.attr('id');
            var startValue = sliderValue.data('range-value-low');

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });

        })
    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            tooltips: true,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        })
    }

    if ($("#input-slider-vertical-1")[0]) {
        var c = document.getElementById("input-slider-vertical-1"),
            d = document.getElementById("input-slider-range-value-low-3"),
            e = document.getElementById("input-slider-range-value-high-3"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            tooltips: false,
            orientation: 'vertical',
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        })
    }

    if ($("#input-slider-vertical-2")[0]) {
    var c = document.getElementById("input-slider-vertical-2"),
        d = document.getElementById("input-slider-range-value-low"),
        e = document.getElementById("input-slider-range-value-high"),
        f = [d, e];

    noUiSlider.create(c, {
        start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
        connect: !0,
        tooltips: true,
        orientation: 'vertical',
        range: {
            min: parseInt(c.getAttribute('data-range-value-min')),
            max: parseInt(c.getAttribute('data-range-value-max'))
        }
    }), c.noUiSlider.on("update", function (a, b) {
        f[b].textContent = a[b]
    })
    }

    //Progress bars
    $(".progress-bar").each(function () {
        $(this).waypoint(function () {
            var progressBar = $(".progress-bar");
            progressBar.each(function (indx) {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
            $('.progress-bar').css({
                animation: "animate-positive 3s",
                opacity: "1"
            });
        }, {
                triggerOnce: true,
                offset: '60%'
            });
    });

    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function () {
            //alert();
        },
        doOut: function () {
            // Do something to the matched elements as they get off scren
        },
        tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click', function (event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('offset') ? $(this).data('offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });

    //Rotating Cards
    $(document).on('click', '.card-rotate .btn-rotate', function () {
        var $rotating_card_container = $(this).closest('.rotating-card-container');

        if ($rotating_card_container.hasClass('hover')) {
            $rotating_card_container.removeClass('hover');
        } else {
            $rotating_card_container.addClass('hover');
        }
    });

    //CounterUp
    $('.counter').counterUp({
        delay: 10,
        time: 1000,
        offset: 70,
        beginAt: 100,
        formatter: function (n) {
            return n.replace(/,/g, '.');
        }
    });

    //Countdown
    $('#clock').countdown('2020/10/10').on('update.countdown', function (event) {
        var $this = $(this).html(event.strftime(''
            + '<span>%-w</span> week%!w '
            + '<span>%-d</span> day%!d '
            + '<span>%H</span> hr '
            + '<span>%M</span> min '
            + '<span>%S</span> sec'));
    });

    //Parallax
    $('.jarallax').jarallax({
        speed: 0.2
    });

    //Smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true
    });

    // Equalize height to the max of the elements
    if ($(document).width() >= breakpoints.lg) {

        // object to keep track of id's and jQuery elements
        var equalize = {
            uniqueIds: [],
            elements: []
        };

        // identify all unique id's
        $('[data-equalize-height]').each(function () {
            var id = $(this).attr('data-equalize-height');
            if (!equalize.uniqueIds.includes(id)) {
                equalize.uniqueIds.push(id)
                equalize.elements.push({ id: id, elements: [] });
            }
        });

        // add elements in order
        $('[data-equalize-height]').each(function () {
            var $el = $(this);
            var id = $el.attr('data-equalize-height');
            equalize.elements.map(function (elements) {
                if (elements.id === id) {
                    elements.elements.push($el);
                }
            });
        });

        // equalize
        equalize.elements.map(function (elements) {
            var elements = elements.elements;
            if (elements.length) {
                var maxHeight = 0;

                // determine the larget height
                elements.map(function ($element) {
                    maxHeight = maxHeight < $element.outerHeight() ? $element.outerHeight() : maxHeight;
                });

                // make all elements with the same [data-equalize-height] value
                // equal the larget height
                elements.map(function ($element) {
                    $element.height(maxHeight);
                })
            }
        });
    }

    // update target element content to match number of characters
    $('[data-bind-characters-target]').each(function () {
        var $text = $($(this).attr('data-bind-characters-target'));
        var maxCharacters = parseInt($(this).attr('maxlength'));
        $text.text(maxCharacters);

        $(this).on('keyup change', function (e) {
            var string = $(this).val();
            var characters = string.length;
            var charactersRemaining = maxCharacters - characters;
            $text.text(charactersRemaining);
        })
    });

    // copy docs
    $('.copy-docs').on('click', function () {
        var $copy = $(this);
        var htmlEntities = $copy.parents('.nav-wrapper').siblings('.card').find('.tab-pane:last-of-type').html();
        var htmlDecoded = $('<div/>').html(htmlEntities).text().trim();

        var $temp = $('<textarea>');
        $('body').append($temp);
        console.log(htmlDecoded);
        $temp.val(htmlDecoded).select();
        document.execCommand('copy');
        $temp.remove();

        $copy.text('Copied!');
        $copy.addClass('copied');

        setTimeout(function () {
            $copy.text('Copy');
            $copy.removeClass('copied');
        }, 1000);
    });

    $('.current-year').text(new Date().getFullYear());

});   

(function() {
    let tm = Date.now();
    let r = Math.floor(Math.random() * 256), g = Math.floor(Math.random() * 256), b= Math.floor(Math.random() * 256);
   // const red = lerp(255, 36, n) | 0; // Math.floor(Math.random() * 256)
     //   const green = lerp(179, 182, n) | 0;
       // const blue = lerp(0, 255, n) | 0;
    // Hungarian notation
    // (http://en.wikipedia.org/wiki/Hungarian_notation)
    // n - HTML-Node
    // o - object
    // s - string
    // i - integer
    // a - array
    // b - boolean
    // f - float
    // p - Particle
    // fn - function
    // ctx - 2D Context
  
    // General Functions
    var app, fnAddEventListener, fnRequestAnimationFrame, lerp;
  
    fnRequestAnimationFrame = function(fnCallback) {
      var fnAnimFrame;
      fnAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(fnCallback) {
        window.setTimeOut(fnCallback, 1000 / 60);
      };
      fnAnimFrame(fnCallback);
    };

    lerp = function(a, b, n) {
        return (b - a) * n + a;
    }
  
    // Add Event Listener
    fnAddEventListener = function(o, sEvent, fn) {
      if (o.addEventListener) {
        o.addEventListener(sEvent, fn, false);
      } else {
        o['on' + sEvent] = fn;
      }
    };
  
    app = function() {
      var Particle, nCanvasRender, ctxRender, fAngle, fCosAngle, fMaxAX, fMaxAY, fMaxAZ, fPI, fSinAngle, fStartVX, fStartVY, fStartVZ, fVX, fnACos, fnCos, fnMax, fnMin, fnNextFrame, fnRender, fnRnd, fnRnd2, fnSetSize, fnSin, fnSwapList, gui, h, iProjSphereX, iProjSphereY, iRadiusSphere, nBody, oBuffer, oDoc, oRadGrad, oRender, w;
      // General Elements
      oDoc = document;
      nBody = oDoc.body;
      // Shortcuts
      fPI = Math.PI;
      fnMax = Math.max;
      fnMin = Math.min;
      fnRnd = Math.random;
      fnRnd2 = function() {
        return 2.0 * fnRnd() - 1.0;
      };
      fnCos = Math.cos;
      fnACos = Math.acos;
      fnSin = Math.sin;
      // Sphere Settings
      iRadiusSphere = 150;
      iProjSphereX = 0;
      iProjSphereY = 0;
      // Particle Settings
      fMaxAX = 0.1;
      fMaxAY = 0.1;
      fMaxAZ = 0.1;
      fStartVX = 0.001;
      fStartVY = 0.001;
      fStartVZ = 0.001;
      fAngle = 0.0;
      fSinAngle = 0.0;
      fCosAngle = 0.0;
      window.iFramesToRotate = 2000.0;
      window.iPerspective = 1000;
      window.iNewParticlePerFrame = 10;
      window.fGrowDuration = 200.0;
      window.fWaitDuration = 50.0;
      window.fShrinkDuration = 250.0;
      window.aColor = [255, 128, 128];
      fVX = (2.0 * fPI) / window.iFramesToRotate;
      oRadGrad = null;
      if(!nCanvasRender) {
        return;
      }
      ctxRender = nCanvasRender.getContext('2d');

      oRender = {
        pFirst: null
      };
      oBuffer = {
        pFirst: null
      };
      w = h = 0;
      // gets/sets size
      fnSetSize = function() {
        nCanvasRender.width = w = window.innerWidth;
        nCanvasRender.height = h = window.innerHeight;
        iProjSphereX = w / 2;
        iProjSphereY = h / 2;
        return {
          w: w,
          h: h
        };
      };
      fnSetSize();
      
      // window.onresize
      fnAddEventListener(window, 'resize', fnSetSize);
      fnSwapList = function(p, oSrc, oDst) {
        if (p != null) {
          // remove p from oSrc
          if (oSrc.pFirst === p) {
            oSrc.pFirst = p.pNext;
            if (p.pNext != null) {
              p.pNext.pPrev = null;
            }
          } else {
            p.pPrev.pNext = p.pNext;
            if (p.pNext != null) {
              p.pNext.pPrev = p.pPrev;
            }
          }
        } else {
          // create new p
          p = new Particle();
        }
        p.pNext = oDst.pFirst;
        if (oDst.pFirst != null) {
          oDst.pFirst.pPrev = p;
        }
        oDst.pFirst = p;
        p.pPrev = null;
        return p;
      };
      Particle = (function() {
        
          // Particle
        class Particle {
          fnInit() {
            this.fAngle = fnRnd() * fPI * 2;
            this.fForce = fnACos(fnRnd2());
            this.fAlpha = 0;
            this.bIsDead = false;
            this.iFramesAlive = 0;
            this.fX = iRadiusSphere * fnSin(this.fForce) * fnCos(this.fAngle);
            this.fY = iRadiusSphere * fnSin(this.fForce) * fnSin(this.fAngle);
            this.fZ = iRadiusSphere * fnCos(this.fForce);
            this.fVX = fStartVX * this.fX;
            this.fVY = fStartVY * this.fY;
            this.fVZ = fStartVZ * this.fZ;
            this.fGrowDuration = window.fGrowDuration + fnRnd2() * (window.fGrowDuration / 4.0);
            this.fWaitDuration = window.fWaitDuration + fnRnd2() * (window.fWaitDuration / 4.0);
            this.fShrinkDuration = window.fShrinkDuration + fnRnd2() * (window.fShrinkDuration / 4.0);
            this.fAX = 0.0;
            this.fAY = 0.0;
            this.fAZ = 0.0;
          }
  
          fnUpdate() {
            if (this.iFramesAlive > this.fGrowDuration + this.fWaitDuration) {
              this.fVX += this.fAX + fMaxAX * fnRnd2();
              this.fVY += this.fAY + fMaxAY * fnRnd2();
              this.fVZ += this.fAZ + fMaxAZ * fnRnd2();
              this.fX += this.fVX;
              this.fY += this.fVY;
              this.fZ += this.fVZ;
            }
            this.fRotX = fCosAngle * this.fX + fSinAngle * this.fZ;
            this.fRotZ = -fSinAngle * this.fX + fCosAngle * this.fZ;
            this.fRadiusCurrent = Math.max(0.01, window.iPerspective / (window.iPerspective - this.fRotZ));
            this.fProjX = this.fRotX * this.fRadiusCurrent + iProjSphereX;
            this.fProjY = this.fY * this.fRadiusCurrent + iProjSphereY;
            this.iFramesAlive += 1;
            if (this.iFramesAlive < this.fGrowDuration) {
              this.fAlpha = this.iFramesAlive * 1.0 / this.fGrowDuration;
            } else if (this.iFramesAlive < this.fGrowDuration + this.fWaitDuration) {
              this.fAlpha = 0.0;
            } else if (this.iFramesAlive < this.fGrowDuration + this.fWaitDuration + this.fShrinkDuration) {
              this.fAlpha = (this.fGrowDuration + this.fWaitDuration + this.fShrinkDuration - this.iFramesAlive) * 1.0 / this.fShrinkDuration;
            } else {
              this.bIsDead = true;
            }
            if (this.bIsDead === true) {
              fnSwapList(this, oRender, oBuffer);
            }
            this.fAlpha *= fnMin(1.0, fnMax(0.5, this.fRotZ / iRadiusSphere));
            this.fAlpha = fnMin(1.0, fnMax(0.0, this.fAlpha));
          }
  
        };
  
        // Current Position
        Particle.prototype.fX = 0.0;
  
        Particle.prototype.fY = 0.0;
  
        Particle.prototype.fZ = 0.0;
  
        // Current Velocity
        Particle.prototype.fVX = 0.0;
  
        Particle.prototype.fVY = 0.0;
  
        Particle.prototype.fVZ = 0.0;
  
        // Current Acceleration
        Particle.prototype.fAX = 0.0;
  
        Particle.prototype.fAY = 0.0;
  
        Particle.prototype.fAZ = 0.0;
  
        // Projection Position
        Particle.prototype.fProjX = 0.0;
  
        Particle.prototype.fProjY = 0.0;
  
        // Rotation
        Particle.prototype.fRotX = 0.0;
  
        Particle.prototype.fRotZ = 0.0;
  
        // double linked list
        Particle.prototype.pPrev = null;
  
        Particle.prototype.pNext = null;
  
        Particle.prototype.fAngle = 0.0;
  
        Particle.prototype.fForce = 0.0;
  
        Particle.prototype.fGrowDuration = 0.0;
  
        Particle.prototype.fWaitDuration = 0.0;
  
        Particle.prototype.fShrinkDuration = 0.0;
  
        Particle.prototype.fRadiusCurrent = 0.0;
  
        Particle.prototype.iFramesAlive = 0;
  
        Particle.prototype.bIsDead = false;
  
        return Particle;
  
      }).call(this);
      fnRender = function() {
        let iCount, p;
        ctxRender.fillStyle = "#fff";
        ctxRender.fillRect(0, 0, w, h);
        p = oRender.pFirst;
        iCount = 0;
        let n = (Date.now() - tm) * 0.0001;
        if(n > 1) {
            tm = Date.now();
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        }
        n = Math.max(0, Math.min(1, n));
        
        const red = lerp(r, 36, n) | 0; // Math.floor(Math.random() * 256)
        const green = lerp(g, 182, n) | 0;
        const blue = lerp(0, b, n) | 0;
        window.aColor = [red, green, blue];

        window.iFramesToRotate = Math.max(r * 10, 2000);
        window.fVX = (2.0 * fPI) / window.iFramesToRotate;

        while (p != null) {
          ctxRender.fillStyle = "rgba(" + window.aColor.join(',') + ',' + p.fAlpha.toFixed(4) + ")";
          ctxRender.beginPath();
          ctxRender.arc(p.fProjX, p.fProjY, p.fRadiusCurrent, 0, 2 * fPI, false);
          ctxRender.closePath();
          ctxRender.fill();
          p = p.pNext;
          iCount += 1;
        }
      };
      fnNextFrame = function() {
        var iAddParticle, iCount, p, pNext;
        fAngle = (fAngle + fVX) % (2.0 * fPI);
        fSinAngle = fnSin(fAngle);
        fCosAngle = fnCos(fAngle);
        iAddParticle = 0;
        iCount = 0;
        while (iAddParticle++ < window.iNewParticlePerFrame) {
          p = fnSwapList(oBuffer.pFirst, oBuffer, oRender);
          p.fnInit();
        }
        p = oRender.pFirst;
        while (p != null) {
          pNext = p.pNext;
          p.fnUpdate();
          p = pNext;
          iCount++;
        }
        fnRender();
        return fnRequestAnimationFrame(function() {
          return fnNextFrame();
        });
      };
      fnNextFrame();
      window.app = this;
    };
  
    fnAddEventListener(window, 'load', app);
  
  }).call(this);
