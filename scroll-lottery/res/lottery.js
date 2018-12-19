/*
* Photo Lottery
* Author: Kris Zhang
* Lincense: MIT
* https://github.com/newghost/js-lottery.git
*/
/*
Fix old IE.
*/
// var Audio = Audio || function() { 
//   var self  = this;
//   self.play = self.stop = new Function();
// };


var Lottery = (function() {

  var timer           = null,
      itemWidth       = 142,
      itemCount       = 0,
      curPos          = 0;

  // var stopAudio       = new Audio("res/ping.mp3")
    // , backAudio       = new Audio("res/ping.mp3")
    ;

  // var $container      = $("#lottery-container"), //可是区域容器，次容器的列表项被隐藏
var   $content        = $("#lottery-container ul"), //所有列表项的容器
      $item           = $("#lottery-container ul li"); //列表单项
      // $hero           = $("#lottery-hero img"); //中奖的项

  // 初始化
  var init = function() {

    //Pre-caculate the count of items
    itemCount       = $item.size(); //单项大小
    //Clone the contents
    $content.append($content.html()); //复制所有列表项插入至$content的后面（如列表项是5条，则复制后就是10条);
  };

 // 开始
  var start  = function() {
    clearInterval(timer);

    // backAudio.play();
    // stopAudio.pause();

    timer = setInterval(function() {

      curPos = parseInt($content.css("left")) | 0; //列表项容器left值
      curPos -= itemWidth / 2; //每次想左滑动itemWidth/2的距离，设置left值实现左滑动效果

      //列表有2组，当curPos< 0-(一组列表总宽度)，curPos=0,实现无缝滑动,
      // 当第2组列表项刚好进入可是区域,也就是第2组列表项第一项左边距是0时(ul的left= -itemWidth * itemCount)，
      // 将第一组列表的左边距设置0（此时就是ul的left=0）
      (curPos < 0 - itemWidth * itemCount) && (curPos = 0); 

      $content.css("left", curPos);

    }, 25);

    // $hero.hide();

  };

  // 停止
  var stop = function() {
    clearInterval(timer);
    timer = null;

    // backAudio.pause();
    // stopAudio.play();

    //Roll at the half width?
    (curPos % itemWidth == 0 - itemWidth / 2) && (curPos = curPos - itemWidth / 2);

    var selected  = getCurIdx();

    setCurIdx(selected);
  };
  
  var running = function() {
    return timer != null;
  };

  //Index: first item on the left
  var setCurIdx = function(idx) {
    curPos = (0 - idx) * itemWidth;

    var $items = $("#lottery li img"),
        imgUrl = $items.eq(idx + 3).attr("src");

    $content.css("left", curPos);
    // $hero.attr("src", imgUrl).show("slow");

    console.log(curPos, idx);
  };

  var getCurIdx = function() {
    return (0 - curPos) / itemWidth;
  };

  return {
      init: init
    , start: start
    , stop: stop
    , running: running
    , setCurIdx: setCurIdx
    , getCurIdx: getCurIdx
  };

})();

$(document).ready(function() {
  Lottery.init();
});

// $(document).keydown(function(e) {
//     var key = e.keyCode;
//     if (key != 32 && key != 13) return;

//     Lottery.running()
//       ? Lottery.stop()
//       : Lottery.start();
// });