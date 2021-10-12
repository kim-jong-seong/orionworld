// mouseController
let cursorSize = 18;

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

// let speed = 0.19;
let speed = 0.9;

init();

function init() {
    cursorChange();
}

// mouseCursor Change
$(window).on('mousedown', function(e) {
    $('#mouseController').css("transform", "scale(0.9)").css("opacity", 0.23);
});
$(window).on('mouseup', function(e) {
    $('#mouseController').css("transform", "scale(1)").css("opacity", 0.3);
});


function cursorChange(){

    let distX = mouseX - ballX;
    let distY = mouseY - ballY;
    
    
    ballX = ballX + (distX * speed);
    ballY = ballY + (distY * speed);

    $('#mouseController').css("left", ballX - (cursorSize/2) + "px").css("top", ballY - (cursorSize/2) + "px");
    // $('#mouseController').stop().animate({ left: ballX - (cursorSize/2) + "px", top: ballY - (cursorSize/2) + "px" }, 35);    
    requestAnimationFrame(cursorChange);
}
cursorChange();

document.addEventListener("mousemove", function(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
});

// mouse hover

$('a.go').mouseenter(function() {
    cursorSize = 30;
    $('#mouseController').text("go").stop().animate({ width: "30px", height: "30px", lineHeight: "20px" });
}).mouseleave(function() {
    cursorSize = 18;
    $('#mouseController').text("").stop().animate({ width: "18px", height: "18px", lineHeight: "0px" })
});

$('a.on').mouseenter(function() {
    cursorSize = 30;
    $('#mouseController').text("on").stop().animate({ width: "30px", height: "30px", lineHeight: "20px" });
}).mouseleave(function() {
    cursorSize = 18;
    $('#mouseController').text("").stop().animate({ width: "18px", height: "18px", lineHeight: "0px" })
});


// gnbWrap hover
$('#gnbWrap').mouseenter(function() {
    $('#header').css({ borderBottom: "1px solid #ddd" });
    $(this).stop().animate({ height: "410px" });
}).mouseleave(function() {
    $(this).stop().animate({ height: "70px" }, 500, function() {
        $('#header').css({ borderBottom: 0 });
    });
});


// slider
let slideWidth = $('#slideList li:eq(0)').width();
let state = 0;
let now = 0;

let autoSlide;

autoSlideMode();

function autoSlideMode() {
    autoSlide = setInterval(function() {
        next();
    }, 5000);
}

// prev
$('#slider #prev').click(function(e) {
    e.preventDefault();
    if(state == 0) {
        state = 1;
        prev();
    }
});

function prev() {
    now--;
    if(now < 0) now = $('#slideList li').length-1;

    clearInterval(autoSlide);
    locationUpdate();

    $('#slideList').prepend($('#slideList li:last')).css({ marginLeft: -slideWidth })
                   .animate({ marginLeft: 0 }, 500, function() {
                       animateSlide();
                       detailsBtn();
                       autoSlideMode();
                       state = 0;
                   });
}

// next
$('#slider #next').click(function(e) {
    e.preventDefault();
    if(state == 0) {
        state = 1;
        next();
    }
});

function next() {
    now++;
    if(now > $('#slideList li').length-1) now = 0;

    clearInterval(autoSlide);
    locationUpdate();

    $('#slideList').animate({ marginLeft: -slideWidth }, 500, function() {
        $('#slideList').append($('#slideList li:eq(0)')).css({ marginLeft: 0 });
        animateSlide();
        detailsBtn();
        autoSlideMode();
        state = 0;
    });
}

// slideBtnUpdate
function locationUpdate() {
    $('#slideBtnList li a').removeClass("select");
    $('#slideBtnList li').eq(now).children(0).addClass("select");
}

// selectBtnClickEvent

$('#slideBtnList li a').click(function(e) {
    e.preventDefault();
    if(state == 0) {
        state = 1;

        now = $(this).parent().index();
        locationUpdate();
        clearInterval(autoSlide);
    
        let n = 0;
        
        for(let i = 0; i < $('#slideList li').length; i++) {
           if($('#slideList li').eq(i).children(0).attr("class").substr(5, 1) == $(this).parent().index() + 1 ) {
               n = $('#slideList li').eq(i).index();
           } 
        }
    
        $('#slideList').animate({ marginLeft: n * -slideWidth }, 500, function() {
            for(let i = 0; i < n; i++) {
                $('#slideList').append($('#slideList li:eq(0)'));
            }
            $('#slideList').css({ marginLeft: 0 });
            animateSlide();
            detailsBtn();
            autoSlideMode();
            state = 0;
        });
    }
    
});

// 슬라이드 scale 효과
function animateSlide() {
    $('#slideList li a').removeClass("animate");
    $('#slideList li').eq(0).children(0).addClass("animate");
}


// 자세히보기 버튼 최신화
function detailsBtn() {
    $('#slider a#in').attr("href", $('#slideList li').eq(0).children(0).attr("href"));
}




// viewer

let viewNow = 0;
let viewSlideNow = 0;
let viewerState = 0;
const viewListWidth = 225;

$('#viewer a#viewPrev').on('click', function(e) {
    e.preventDefault();
    if(viewerState == 0) {
        viewerState = 1;
        viewSlideNow--;
        if(viewSlideNow < 0) viewSlideNow = 0;
    
        $('#viewer ul').eq(viewNow).animate({ marginLeft: -viewListWidth * viewSlideNow }, 500, function() {
            viewerState = 0;
        });
    }
});
$('#viewer a#viewNext').on('click', function(e) {
    e.preventDefault();
    if(viewerState == 0) {
        viewerState = 1;
        viewSlideNow++;
        if(viewSlideNow > $('#pieList li').length - 4) viewSlideNow = $('#pieList li').length - 4;
    
        $('#viewer ul').eq(viewNow).animate({ marginLeft: -viewListWidth * viewSlideNow }, 500, function() {
            viewerState = 0;
        });
    }
});


// viewer kind
$('#product > a.kind').on('click', function(e) {
    e.preventDefault();
    let thisIndex = $(this).index() - 1;
    if(viewerState == 0 && viewNow != thisIndex ) {
        viewerState = 1;

        viewNow = thisIndex;
        viewSlideNow = 0;
    
        $('#viewer section').eq(thisIndex).siblings().find('ul').animate({ marginLeft: -1350 }, 800, function() {
            $('#viewer section').eq(thisIndex).siblings().find('ul').hide().css({ marginLeft: 0 });
            $('#viewer section').eq(thisIndex).find('ul').css({ marginLeft: 1350 }).show()
                                         .animate({ marginLeft: -viewListWidth * viewSlideNow }, 500, function() {
                                               viewerState = 0;
                                         });
        });
    }
});


// content3 tab

let content3_state = 0;

$('#global #country li a').on('click', function(e) {
    e.preventDefault();
    if(content3_state == 0) {
        content3_state = 1;

        if($(this).parent().index() == 0) $('#global #selectBall').animate({ top: "18%" });
        if($(this).parent().index() == 1) $('#global #selectBall').animate({ top: "48%" });
        if($(this).parent().index() == 2) $('#global #selectBall').animate({ top: "78%" });
    
        $('#countryContent li').removeClass("show").css({ opacity: 0 });
        $('#countryContent li').eq($(this).parent().index()).addClass("show").animate({ opacity: 1 }, 1000, function() {
            content3_state = 0;
        });
    }
});


// header language opacity

$('#header a.lang, #language').mouseenter(function() {
    $('#language').stop().animate({ opacity: 1 });
}).mouseleave(function() {
    $('#language').stop().animate({ opacity: 0 });
});


// 메뉴 더보기 - more

$('#header a.more').on('click', function(e) {
    e.preventDefault();
    $('#aside').animate({ right: 0 });
});
$('#more_close').on('click', function(e) {
    e.preventDefault();
    $('#aside').animate({ right: "-20%" });
});



// scroll content2

$(window).scroll(function(e) {
    if($('#content2').offset().top < scrollY + 500) {
        $('#content2 section.content2:nth-of-type(1)').animate({ left: 0, opacity: 1 }, 1500, "easeInOutCubic");
        $('#content2 section.content2:nth-of-type(2)').animate({ right: 0, opacity: 1 }, 1500, "easeInOutCubic");
    }
    if($('#content2').offset().top < scrollY + 300) {
        $('#content2 section.content2:nth-of-type(3)').animate({ left: 0, opacity: 1 }, 1500, "easeInOutCubic");
        $('#content2 section.content2:nth-of-type(4)').animate({ right: 0, opacity: 1 }, 1500, "easeInOutCubic");
        $('#content2 img:nth-of-type(1)').animate({ right: 0, opacity: 1 }, 3000, "easeInOutCubic");
        $('#content2 img:nth-of-type(2)').animate({ left: 0, opacity: 1 }, 3000, "easeInOutCubic");
    }

})




// content4 실시간 주가 정보

// let stock, stockNum;

// $(window).scroll(function() {
//     if(scrollY > $('#stock p').offset().top - 700) {
//         stockNum = $('#stock p').text();
//         console.log(stockNum.splice(3, 1));
//     }
// });





// wheel header
// var wheelState = 0;
// let lastpage = 1024;

// window.addEventListener('wheel', function(e) {
    
//     if(e.wheelDelta < 0 && wheelState == 0) {
//         mouseY -= e.wheelDelta;
//         wheelState = 1;
//         wheelUpMouse();
//         $('#header').css({ overflow: "hidden" }).stop().animate({ height: 0 }, 500, function() {
//             wheelState = 0;
//         });
//     } else if(e.wheelDelta > 0 && wheelState == 0) {
//         mouseY -= e.wheelDelta;
//         wheelState = 1;
//         wheelDownMouse();
//         $('#header').css({ overflow: "unset" }).stop().animate({ height: "102px" }, 500, function() {
//             wheelState = 0;
//         });
//     }
// });

// scroll event
// window.addEventListener('scroll', function() {

//     if(scrollY > 100 && wheelState == 1) {
//         $('#header').css({ opacity: 0.8 });
//     } else if(scrollY < 100 && wheelState == 1) {
//         $('#header').css({ opacity: 1 });
//     }
// });




// 할 일 목록

// scroll시 content2 옆쪽에서 나오기
// 실시간 주가정보 splice() 물어보기 내일 물어보기
// scroll시 header fixed 시키면서 슬라이더 그만큼 위에 여백주기