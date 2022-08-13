// Header
const header = document.querySelector(".header"),
    homeHeader = document.querySelector(".header-home"),
    menuLink = document.querySelector(".mega-menu"),
    menuBlock = document.querySelector(".mega-menu-block");
if (header) {
    // Animate Header on scroll
    let scrollpos = window.scrollY
    const header_height = header.offsetHeight
    const addClassOnScroll = () => document.body.classList.add("header-active")
    const remClassOnScroll = () => document.body.classList.remove("header-active")
    window.addEventListener('scroll', function() {
        scrollpos = window.scrollY;
        if (scrollpos >= header_height) { addClassOnScroll() } else { remClassOnScroll() }
    })

    // Remove Transparent Header on Mega Menu Hover
    if (homeHeader && menuLink) {
        const mOver = () => {
            header.classList.remove('header-home');
        }
        const mOut = () => {
            header.classList.add('header-home');
        }
        menuLink.addEventListener("mouseover", mOver, false);
        menuLink.addEventListener("mouseout", mOut, false);
    }

    // Nav Toggle for Mobile 
    if (menuLink && menuBlock && window.innerWidth < 992) {
        menuLink.onclick = () => {

            if (menuBlock.classList.contains('hide')) {
                menuBlock.classList.remove("hide");
            } else {
                menuBlock.classList.add('hide');
            }
        }
        menuBlock.onclick = (e) => {
            e.stopPropagation();
        }
    }
}

// Case Swiper Slider
var caseSwiperID = document.getElementById('caseSwiper');
if (caseSwiperID) {
    const caseSwiper = new Swiper('#caseSwiper .swiper', {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
            nextEl: '#caseSwiper .swiper-button-next',
            prevEl: '#caseSwiper .swiper-button-prev',
        },
    });
}

// News Room Slider
var newsSwiperID = document.getElementById('caseSwiper');
if (newsSwiperID) {
    const newsSwiper = new Swiper('#newsSwiper .swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '#newsSwiper .swiper-button-next',
            prevEl: '#newsSwiper .swiper-button-prev',
        },
    });
}


//Detect Closest Edge
var boxes = document.querySelectorAll(".team-unit");
if (boxes) {
    function closestEdge(x, y, w, h) {
        var topEdgeDist = distMetric(x, y, w / 2, 0);
        var bottomEdgeDist = distMetric(x, y, w / 2, h);
        var leftEdgeDist = distMetric(x, y, 0, h / 2);
        var rightEdgeDist = distMetric(x, y, w, h / 2);
        var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
        switch (min) {
            case leftEdgeDist:
                return "left";
            case rightEdgeDist:
                return "right";
            case topEdgeDist:
                return "top";
            case bottomEdgeDist:
                return "bottom";
        }
    }

    //Direction Aware Hover Effect
    function distMetric(x, y, x2, y2) {
        var xDiff = x - x2;
        var yDiff = y - y2;
        return (xDiff * xDiff) + (yDiff * yDiff);
    }

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onmouseenter = function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
            var overlay = this.childNodes[1];

            switch (edge) {
                case "left":
                    //tween overlay from the left
                    overlay.style.top = "0%";
                    overlay.style.left = "-100%";
                    TweenMax.to(overlay, .5, { left: '0%' });
                    break;
                case "right":
                    overlay.style.top = "0%";
                    overlay.style.left = "100%";
                    //tween overlay from the right
                    TweenMax.to(overlay, .5, { left: '0%' });
                    break;
                case "top":
                    overlay.style.top = "-100%";
                    overlay.style.left = "0%";
                    //tween overlay from the right
                    TweenMax.to(overlay, .5, { top: '0%' });
                    break;
                case "bottom":
                    overlay.style.top = "100%";
                    overlay.style.left = "0%";
                    //tween overlay from the right
                    TweenMax.to(overlay, .5, { top: '0%' });
                    break;
            }
        };


        boxes[i].onmouseleave = function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
            var overlay = this.childNodes[1];
            switch (edge) {
                case "left":
                    TweenMax.to(overlay, .5, { left: '-100%' });
                    break;
                case "right":
                    TweenMax.to(overlay, .5, { left: '100%' });
                    break;
                case "top":
                    TweenMax.to(overlay, .5, { top: '-100%' });
                    break;
                case "bottom":
                    TweenMax.to(overlay, .5, { top: '100%' });
                    break;
            }
        };
    }
}

// Timeline Scroll Section
// --------------------------------------------------------------
var items = $(".timeline-block li"),
    timelineHeight = $(".timeline-block").height(),
    greyLine = $('.default-line'),
    lineToDraw = $('.draw-line');
// run this function only if draw line exists on the page
if (lineToDraw.length) {
    $(window).on('scroll', function() {
        // Need to constantly get '.draw-line' height to compare against '.default-line'
        var redLineHeight = lineToDraw.height(),
            greyLineHeight = greyLine.height(),
            windowDistance = $(window).scrollTop(),
            windowHeight = $(window).height() / 2,
            timelineDistance = $(".timeline-block").offset().top;

        if (windowDistance >= timelineDistance - windowHeight) {
            line = windowDistance - timelineDistance + windowHeight;

            if (line <= greyLineHeight) {
                lineToDraw.css({
                    'height': line + 20 + 'px'
                });
            }
        }

        // This takes care of adding the class in-view to the li:before items
        var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true);
        items.each(function(index) {
            var circlePosition = $(this).offset();

            if (bottom > circlePosition.top) {
                $(this).addClass('in-view');
            } else {
                $(this).removeClass('in-view');
            }
        });
    });
}