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

// mouse wheel을 굴렸을때 마우스 효과
// let mouseSetTime;

// function wheelUpMouse() {
//     clearTimeout(mouseSetTime);
//     $('#mouseController').text("▼").stop().animate({ width: "30px", height: "30px", lineHeight: "30px" });
    
//     mouseSetTime = setTimeout(() => {
//         $('#mouseController').text("").stop().animate({ width: "18px", height: "18px", lineHeight: "0px" });
//     }, 1000);
// }
// function wheelDownMouse() {
//     clearTimeout(mouseSetTime);
//     $('#mouseController').text("▲").stop().animate({ width: "30px", height: "30px", lineHeight: "20px" });
    
//     mouseSetTime = setTimeout(() => {
//         $('#mouseController').text("").stop().animate({ width: "18px", height: "18px", lineHeight: "0px" });
//     }, 1000);
// }



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
        nextSlide();
    }, 5000);
}

// 맨처음 자세히보기버튼 초기화
$('#slider a#in').attr("href", $('#slideList li').eq(0).children(0).attr("href"));

$('#slideList').prepend($('#slideList li:last')).css({ marginLeft: -slideWidth });

$('#slider #prev').on('click', function(e) {
    e.preventDefault();
    stateBlock(prevSlide);
});

$('#slider #next').on('click', function(e) {
    e.preventDefault();
    stateBlock(nextSlide);
});

// 자세히보기 버튼 최신화
function detailsBtn() {
    $('#slider a#in').attr("href", $('#slideList li').eq(1).children(0).attr("href"));
}

// slide 클릭시 막기
$('#slideList li a').on('click', function(e) {
    e.preventDefault();
});

// slide prev, next botton active
function prevSlide() {
    clearInterval(autoSlide);
    
    now--;
    if(now < 0) now = $('#slideList li').length-1;

    $('#slideList').css({ marginLeft: 2 * -slideWidth }).prepend($('#slideList li:last'))
                   .animate({ marginLeft: -slideWidth }, 500, function() {
                       animateSlide();
                       autoSlideMode();
                       detailsBtn();
                       statePass();
                   });
}
function nextSlide() {
    clearInterval(autoSlide);

    now++;
    if(now > $('#slideList li').length-1) now = 0;

    $('#slideList').animate({ marginLeft: 2 * -slideWidth }, 500, function() {
        $('#slideList').css({ marginLeft: -slideWidth }).append($('#slideList li:eq(0)'));
        animateSlide();
        autoSlideMode();
        detailsBtn();
        statePass();
    });
}

function stateBlock(fn) {
    if(state == 0) {
        state = 1;
        fn();
    }
}
function statePass() {
    state = 0;
}

function animateSlide() {
    $('#slideList > li a').removeClass("animate");
    $('#slideList li').eq(1).children(0).addClass("animate");
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



// lastpage 설정하기



// 할 일 목록
// language 표시 -> 말풍선 만들기
// 서브웨이 사이트 아래쪽 레이아웃으로 orion 관련 소개 부분 만들기