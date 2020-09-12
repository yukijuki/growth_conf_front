//読み込み
$(function() {
    var h = $(window).height();
    
    $('#wrap').css('display','none');
    $('#loader-bg ,#loader').height(h).css('display','block');
});
    
$(function () { //全ての読み込みが完了したら実行
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
    $('#wrap').css('display', 'block');
});
    
  //10秒たったら強制的にロード画面を非表示
$(function(){
    setTimeout('stopload()',10000);
});   
    
function stopload(){
    $('#wrap').css('display','block');
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
}

//リロード時にページトップ
$(function () {
    var speed = 300;
    $('html,body').animate({ scrollTop: 0 }, speed);
});

//自動フェードイン
$(function () {
    $('.fadein-auto').addClass("scrollin");
});

//スクロールフェードイン
$(window).scroll(function (){
    $('.fadein').each(function(){
        var elemPos = $(this).offset().top,
            scroll = $(window).scrollTop(),
            windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 100){
            $(this).addClass('scrollin');
            }
    });
});



