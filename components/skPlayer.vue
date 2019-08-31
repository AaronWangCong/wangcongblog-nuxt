<template>
  <div class="skPlayer-wrap" :class="iscloseSkPlayer?'':'none'">
    <div id="skPlayer"></div>
    <div class="canvasBox">
      <!-- <canvas id='canvas' width="575" height="350"></canvas> -->
      <span class="skPlayer-close" @click="iscloseSkPlayer = !iscloseSkPlayer"><i class="iconfont icon-yiliao"></i></span>
    </div>
  </div>
</template>
<script>
  // import player from '../plugins/skPlayer.js'
  export default {
    name: 'skPlayer',
    components: {
    },
    props:{
    },
    layout:'',
    data() {
      return {
        iscloseSkPlayer: false,
        player: {}
      }
    },
    computed: {
    },
    created() {
      if(process.client) {
      }
    },
    mounted() {
      this.player = new skPlayer({
        autoplay: true,
        //可选项,自动播放,默认为false,true/false
        listshow: true,
        //可选项,列表显示,默认为true,true/false
        mode: 'listloop',
        //可选项,循环模式,默认为'listloop'
        //'listloop',列表循环
        //'singleloop',单曲循环
        music: {
        //必需项,音乐配置
            type: 'cloud',
            //必需项,网易云方式指定填'cloud'
            source: 2894693890
            //必需项,网易云音乐歌单id
            //登录网易云网页版,在网页地址中拿到
            // ... playlist?id=317921676
        }
      })
      window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
      let that = this
      setTimeout(()=>{
        // that.initCavans()
        // var music = document.querySelector('.skPlayer-source');//获取ID
        // console.log(music.paused);
        // if (music.paused) { //判读是否播放
        //     this.player.play(); //没有就播放 
        //     console.log(this.player);
        // }
      },500)
    },
    methods: {
      initCavans() {
        var audio = document.querySelector('.skPlayer-source');
        var ctx = new AudioContext();
        var analyser = ctx.createAnalyser();
        var audioSrc = ctx.createMediaElementSource(audio);
        // we have to connect the MediaElementSource with the analyser 
        audioSrc.connect(analyser);
        analyser.connect(ctx.destination);
        // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
        // analyser.fftSize = 64;
        // frequencyBinCount tells you how many values you'll receive from the analyser
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);

        // we're ready to receive some data!
        var canvas = document.getElementById('canvas'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 10, //width of the meters in the spectrum
            gap = 2, //gap between meters
            capHeight = 2,
            capStyle = '#fff',
            meterNum = 800 / (10 + 2), //count of the meters
            capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
        ctx = canvas.getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        // loop
        function renderFrame() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var step = Math.round(array.length / meterNum); //sample limited data from the total array
            ctx.clearRect(0, 0, cwidth, cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                };
                ctx.fillStyle = capStyle;
                //draw the cap, with transition effect
                if (value < capYPositionArray[i]) {
                    ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                } else {
                    ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                };
                ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
            }
            requestAnimationFrame(renderFrame);
        }
        renderFrame();
      }
    },
    destroyed() {
      this.player.destroy();
    }
  }
</script>
<style lang="scss">
.skPlayer-wrap{
  top: 2vh;
  right: 2vw;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1001;
  transition: all 0.3s ease-in;
  #skPlayer{
    transition: all 0.3s ease-in;
    opacity: 1;
  }
  &.none{
    #skPlayer{
      // display: none;
      opacity: 0;
      width: 0px;
      height: 0;
      overflow: hidden;
    }
  }
  .canvasBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;
  }
  .skPlayer-close{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    background: rgba(230, 83, 83, 0.8);
    box-shadow: 0 0 15px rgba(230, 83, 83, 0.8);
    cursor: pointer;
    color: #fff;
    animation: scale-an 2s linear infinite;
    i{
      font-size: 28px;
    }
    @media screen and (max-width: 750px) {
      width: 0.7rem;
      height: 0.7rem;
      line-height: 0.7rem;
      i{
        font-size: 0.5rem;
      }
    }
  }
  .skPlayer-list{
    &::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
      border-radius: 15px;
    }
  }


  @keyframes scale-an
  {
  0% {transform: scale(1);background: rgba(230, 83, 83, 0.8);color: #fff;}
  50% {transform: scale(1.1);background: rgba(83, 105, 230, 0.8);color: rgb(238, 185, 38);}
  100% {transform: scale(1);background: rgba(230, 83, 83, 0.8);color: #fff;}
  }

  @-moz-keyframes scale-an /* Firefox */
  {
  0% {transform: scale(1)}
  50% {transform: scale(1.1)}
  100% {transform: scale(1)}
  }

  @-webkit-keyframes scale-an /* Safari 和 Chrome */
  {
  0% {transform: scale(1)}
  50% {transform: scale(1.1)}
  100% {transform: scale(1)}
  }

  @-o-keyframes scale-an /* Opera */
  {
  0% {transform: scale(1)}
  50% {transform: scale(1.1)}
  100% {transform: scale(1)}
  }




    /*!
      SKPlayer
  */

  //const
  $white:#FFF;              //主白
  $red:#D94240;             //主红
  $gray:#6A6B6F;            //主灰
  $gray_grandma:#666;       //奶奶灰
  $line:#EBEBF2;            //进度条
  $line_loading:#D3D3E0;    //加载进度条
  $list_bg:#B0B0B0;         //列表项背景
  $list_hover:#DDD;         //列表项hover
  $list_border:#E9E9E9;     //列表项边框

  //mixin
  @mixin user-select($value:none){
    user-select:$value;
    -webkit-user-select:$value;
    -moz-user-select:$value;
    -ms-user-select:$value;
  }
  @mixin box-sizing($value:content-box){
    box-sizing:$value;
    -webkit-box-sizing:$value;
    -moz-box-sizing:$value;
  }
  @mixin filter($value:blur(3px)){
    filter:$value;
    -webkit-filter:$value;
  }
  @mixin transition($value:.37s){
    transition:$value;
    -webkit-transition:$value;
    -moz-transition:$value;
  }
  @mixin transform($value:translate(-50%,-50%)){
    transform:$value;
    -webkit-transform:$value;
    -moz-transform:$value;
    -ms-transform:$value;
  }
  @mixin ellipsis{
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }

  //css
  #skPlayer{
    width:380px;
    height:100px;
    font-family:Arial,Helvetica,sans-serif;
    position:relative;
    @include user-select();
    cursor:default;
    background-color:$white;
    box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);

    *{
      margin:0;
      padding:0;
      @include box-sizing();

      &::before{
        @include box-sizing();
      }

      &::after{
        @include box-sizing();
      }

    }

    .skPlayer-tip-loading{
      font-size:30px;
      color:$gray;
      line-height:100px;
      text-align:center;
    }

    .skPlayer-picture{
      width:100px;
      height:100px;
      float:left;
      position:relative;
      border-radius:7px 0 0 5px;
      z-index:3;
    }

    .skPlayer-cover{
      width:100%;
      @include transition();
      &.skPlayer-pause{
        @include filter();
      }
    }

    .skPlayer-play-btn{
      display:block;
      width:60px;
      height:60px;
      background-color:$red;
      border-radius:50%;
      position:absolute;
      overflow:hidden;
      top:50%;
      left:0;
      @include transform(translate(-50%,-50%) translateZ(0));
      z-index:2;
      @include transition(.7s);

      &.skPlayer-pause{
        left:50%;

        .skPlayer-left{
          border:14px solid $white;
          border-left:2px solid $white;
          border-right:2px solid $white;
        }

        .skPlayer-right{
          top:16px;
        }

      }

      span{
        display:block;
        width:0;
        height:0;
        position:absolute;
        @include transition();
        @include transform(translateZ(0));

        &.skPlayer-left{
          border-left:24px solid $white;
          border-top:14px solid transparent;
          border-bottom:14px solid transparent;
          left:21px;
          top:16px;
        }

        &.skPlayer-right{
          border:14px solid $white;
          border-left:2px solid $white;
          border-right:2px solid $white;
          right:21px;
          top:-76px;
        }

      }

    }

    .skPlayer-control{
      width:250px;
      height:75px;
      padding:10px 15px 15px;
      background-color:transparent;
      float:right;
      border-radius:0 7px 7px 0;
      position:relative;
      z-index:2;
      text-align:left;

      p{
        line-height:1.2;
        @include ellipsis;

        &.skPlayer-name{
          font-size:18px;
          font-weight:700;
          color:$gray;
        }

        &.skPlayer-author{
          font-size:15px;
          color:$gray_grandma;
          max-width:90%;
        }

      }

      >.skPlayer-percent{
        width:250px;
        height:6px;
        background-color:$line;
        margin:9px 0;
        cursor:pointer;
        overflow:hidden;
        position:relative;

        .skPlayer-line{
          width:0;
          height:100%;
          background-color:$red;
          position:absolute;
          left:0;
          top:0;
          z-index:2;
        }

        .skPlayer-line-loading{
          width:0;
          height:100%;
          background-color:$line_loading;
          position:absolute;
          left:0;
          top:0;
          z-index:1;
          @include transition(.7s);
          @include transform(translateZ(0));
        }

      }

      .skPlayer-time{
        font-size:15px;
        color:$gray_grandma;
        float:left;
      }

      .skPlayer-volume{
        width:95px;
        height:14px;
        float:right;
        position:relative;
        margin:1px 24px 0 0;

        .skPlayer-icon{
          display:block;
          width:5px;
          height:6px;
          position:absolute;
          background-color:$gray;
          top:4px;
          left:-20px;
          cursor:pointer;

          &.skPlayer-quiet::before{
            display:block;
          }

          &::before{
            content:'';
            display:none;
            width:2px;
            height:22px;
            @include transform(rotate(58deg));
            background-color:$gray;
            position:absolute;
            top:-8px;
            left:5px;
          }

          &::after{
            content:'';
            display:block;
            width:5px;
            height:6px;
            border-width:4px 5px;
            border-style:solid;
            border-color:transparent $gray transparent transparent;
            position:absolute;
            top:-4px;
            left:-5px;
          }

        }

        .skPlayer-percent{
          position:absolute;
          width:95px;
          height:14px;
          background-color:$line;
          border-radius:6px;
          overflow:hidden;
          cursor:pointer;
          top:0;
          left:0;
        }

        .skPlayer-line{
          height:100%;
          width:100%;
          background-color:$red;
          @include transition();
        }

      }

      .skPlayer-list-switch{
        display:block;
        width:16px;
        height:15px;
        position:absolute;
        right:15px;
        bottom:12px;
        cursor:pointer;
      }

      .skPlayer-list-icon{
        display:block;
        width:16px;
        height:3px;
        background-color:$gray;
        position:absolute;
        right:0;
        bottom:6px;

        &::before{
          content:'';
          display:block;
          width:16px;
          height:3px;
          background-color:$gray;
          position:absolute;
          left:0;
          bottom:6px;
        }

        &::after{
          content:'';
          display:block;
          width:16px;
          height:3px;
          background-color:$gray;
          position:absolute;
          left:0;
          bottom:-6px;
        }

      }

      .skPlayer-mode{
        display:block;
        width:16px;
        height:17px;
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQ4y5XTvY6NURQG4OdsnElMFFqFiCgk/htBaFAoRq0QHYO9JTsSVyB6+STfx4hO5QJMZTQkU0gw4gJM4wpIxH8x6+QMxndy3mZl7bXf911r/wwgl/oCJ/2Ll13bnNKDpB8nJtTXBMJlBi1+TjLIpW7+Y0MudYinKPiOeziObRuQL2Epl7oVRkp3cRYfMde1zZv/OA9xBzuDc3WQS92HlXA+1rXN276Zc6mH8CrMjyRcxibcn0SO81rBQwwwn3Auak8mkdfhccQzCbsjeT2FwKjTXQk/IpmdQmBLxG8Jq5HsnUJgf8TVhOeRXJhC4GLEZwkL+IVrcUW9yKUexJUY/VHq2uZdiMxgMZd6tId8GIuxd6Frm/ejl1ixx9prvG18tXKpszgQbc9jGGPfZPyZvuI8HuDWX8afsIwbQYbTWGL8F3Rt8wXXN+j8Mz5gO3asWx/AbzMQVi2KT5GSAAAAAElFTkSuQmCC);
        position:absolute;
        right:15px;
        bottom:51px;
        cursor:pointer;
        &.skPlayer-mode-loop{
          background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABa0lEQVQ4y5XTu2pVURAG4O9s9QgGC1sLEbEQvMXGG7FRCwutLcROIq4lLASfQOxlC3trbK18AFMZm0QEhcSID2Aan0BB4gWLM8cT48455G+GWWv++WfWzOpBymURM/7HUtvUF4xBZTzOT7gfJAiV3Wjwe5JAymXnPwEplz5eIuMnHuMc9naQb2Ih5bIHhpke4TK+4Grb1CtbKPfxEAeCc7uXcjmK1VA+2zb1h3E9p1xO4n2In6pwCzvwZDM55bIYE/qLtqlX8Qw9zFa4EncvOgRndI/3edhLFQ6FszxpZBswrPRghV/hTG0jwa6wPyqshXNkGwmOhV2r8Dqc6x2BS3jTcX4j7KteyuVE9LSOM/HKWyLi3xmMcbpqm/oj5gxWeT7lcnoMeRrzETvXNvWn4SYWHDbYxgdGo5VymcLxKHsW/Wj7HqPPtI5reIr7m4S/4i3uBhkuYoHRX9A29Xfc6aj8Gz5jH/ZvOO/BH1b7XciLVLbaAAAAAElFTkSuQmCC);
        }
      }

    }

    .skPlayer-list{
      display:none;
      width:100%;
      position:absolute;
      top:100px;
      padding-top:6px;
      background-color:$white;
      list-style:none;
      max-height:171px;
      overflow-y:auto;
      box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);

      li{
        position:relative;
        height:32px;
        line-height:32px;
        padding:0 15px;
        font-size:12px;
        border-top:1px solid $list_border;
        cursor:pointer;
        @include transition(.2s);
        overflow:hidden;

        &:hover{
          background-color:$list_hover;
        }

        &.skPlayer-curMusic{
          background-color:$list_bg;
          .skPlayer-list-sign{
            display:block;
          }
        }

      }

      &::-webkit-scrollbar{
        width:14px;
      }

      &::-webkit-scrollbar-track{
        border-left:1px solid $list_border;
      }

      &::-webkit-scrollbar-thumb{
        box-shadow:inset 0 0 7px rgba(0,0,0,.3);
        background-color:$red;
      }

      .skPlayer-list-sign{
        display:none;
        width:3px;
        height:22px;
        position:absolute;
        left:0;
        top:5px;
        background-color:$red;
      }

      .skPlayer-list-index{
        color:$gray_grandma;
        position:absolute;
        left:15px;
        top:0;
      }

      .skPlayer-list-name{
        color:$gray;
        float:left;
        margin-left:24px;
        max-width:200px;
        @include ellipsis;
      }

      .skPlayer-list-author{
        color:$gray_grandma;
        float:right;
        max-width:107px;
        @include ellipsis;
      }

    }

    &.skPlayer-list-on{
      .skPlayer-list{
        display:block;
      }
    }

  }
}
#skPlayer{
  @media screen and (max-width: 550px) {
    width: 5.0rem !important;
    height: 2.5rem !important;
    .skPlayer-picture{
      width: 1.5rem !important;
      height: 1.5rem !important;
    }
    .skPlayer-play-btn{
      width: 1rem !important;
      height: 1rem !important;
    }
    .skPlayer-left{
      // top: 0.3rem !important;
      left: 18px !important;
    }
    .skPlayer-right{
      // top: 0.3rem !important;
      right: 18px !important;
    }
    .skPlayer-control{
      width: 3rem !important;
      height: 0.75rem !important;
      padding: 0.1rem 0.15rem 0.15rem !important;
      .skPlayer-name{
        font-size: 0.3rem !important;
      }
      .skPlayer-author{
        font-size: 0.2rem !important;
      }
      .skPlayer-percent{
        width: 100% !important;
        margin: 0.18rem 0 !important;
      }
      .skPlayer-time{
        font-size: 0.15rem !important;
      }
    }
    .skPlayer-list li{
      font-size: 0.24rem !important;
    }
  }
}
</style>