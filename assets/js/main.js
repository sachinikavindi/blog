(function() {
	"use strict";
    
      window.onload = function(){

        //Header Sticky
        const getHeaderId = document.querySelector(".navbar-area");
        if (getHeaderId) {
            window.addEventListener('scroll', event => {
                const height = 150;
                const { scrollTop } = event.target.scrollingElement;
                document.querySelector('#navbar').classList.toggle('sticky', scrollTop >= height);
            });
        }

        // Back to Top
        let progressPath = document.getElementById("progress-path");
        let progressWrap = document.getElementById("progress-wrap");
        let pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.webkitTransition = "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.webkitTransition =
        "stroke-dashoffset 10ms linear";
        
        const onScollEvent = function (event) {
            let scroll = window.scrollY;
            let height = document.body.scrollHeight - window.innerHeight;
            let progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;

            let offset = 50;
                if (window.scrollY > offset) {
                progressWrap.classList.add("active-progress");
                } else {
                progressWrap.classList.remove("active-progress");
            }
        };

        onScollEvent();
            window.onscroll = onScollEvent;
            progressWrap.onclick = function (event) {
            window.scroll({ top: 0, behavior: "smooth" });
            return false;
        };
            
        // Preloader
        const getPreloaderId = document.getElementById('preloader');
        if (getPreloaderId) {
            getPreloaderId.style.display = 'none';
        }

    };

    //Hero Slider
	var deal_sliderOne = new Swiper(".hero-slider", {
		loop: true,
		speed: 1500,
        slidesPerView: 1,
		spaceBetween: 25,
        autoHeight: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        navigation: {
        nextEl: ".hero-next",
        prevEl: ".hero-prev",
      },
	});

    // // AOS
     AOS.init({
        startEvent: 'load'
    });

})();

    // Offcanvas Responsive Menu
    const list = document.querySelectorAll('.responsive-menu-list');
    function accordion(e) {
        e.stopPropagation(); 
        if(this.classList.contains('active')){
            this.classList.remove('active');
        }
        else if(this.parentElement.parentElement.classList.contains('active')){
            this.classList.add('active');
        }
        else {
            for(i=0; i < list.length; i++){
                list[i].classList.remove('active');
            }
            this.classList.add('active');
        }
    }
    for(i = 0; i < list.length; i++ ){
        list[i].addEventListener('click', accordion);
    }

    //Custom Cursor
    var cursor = document.querySelector('.cursor');
    var cursorinner = document.querySelector('.cursor-inner');
    var a = document.querySelectorAll('a');

    document.addEventListener('mousemove', function(e){
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    });

    document.addEventListener('mousemove', function(e){
        var x = e.clientX;
        var y = e.clientY;
        cursorinner.style.left = x + 'px';
        cursorinner.style.top = y + 'px';
    });

    document.addEventListener('mousedown', function(){
        cursor.classList.add('click');
        cursorinner.classList.add('cursorinnerhover')
    });

    document.addEventListener('mouseup', function(){
        cursor.classList.remove('click')
        cursorinner.classList.remove('cursorinnerhover')
    });

    a.forEach(item => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    })
    //Remove Ad Section
    const div = document.querySelector('.main-topics-wrap');
    const addBtn = document.querySelector('.close-promo-box');
    const closeBtn = document.querySelector('.close_promo-box');
    const adArea = document.querySelector('.promo-area');

    // Check if the elements exist before adding event listeners
    if (addBtn && div) {
        addBtn.addEventListener('click', () => {
            div.classList.add('full');
        });
    }

    if (closeBtn && adArea) {
        closeBtn.addEventListener('click', () => {
            adArea.classList.add('d-none');
        });
    }

try {

    // function to set a given theme/color-scheme
    function setTheme(themeName) {
        localStorage.setItem('renaz_theme', themeName);
        document.documentElement.className = themeName;
    }
    // function to toggle between light and dark theme
    function toggleTheme() {
        if (localStorage.getItem('renaz_theme') === 'theme-dark') {
            setTheme('theme-light');
        } else {
            setTheme('theme-dark');
        }
    }
    // Immediately invoked function to set the theme on initial load
    (function () {
        if (localStorage.getItem('renaz_theme') === 'theme-dark') {
            setTheme('theme-dark');
            document.querySelector('.slider-btn').checked = false;
        } else {
            setTheme('theme-light');
        document.querySelector('.slider-btn').checked = true;
        }
    })();

} catch (err) {}

