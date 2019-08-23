<template>
  <div id="slider">
    <div class="window" @mouseover="stop" @mouseleave="play">
      <div class="container" :style="containerStyle">
        <div class="container-item">
          <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt="">
          <p>name</p>
        </div>
        <div class="container-item">
          <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 2].img" alt="">
          <p>name</p>
        </div>
        <div class="container-item">
          <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 3].img" alt="">
          <p>name</p>
        </div>
        <div v-for="(item, index) in sliders" :key="index">
          <img :style="{width:imgWidth+'px'}" :src="item.img" alt="">
          <p>name</p>
        </div>
        <div>
          <img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt="">
          <p>name</p>
        </div>
        <div>
          <img :style="{width:imgWidth+'px'}" :src="sliders[1].img" alt="">
          <p>name</p>
        </div>
        <div>
          <img :style="{width:imgWidth+'px'}" :src="sliders[2].img" alt="">
          <p>name</p>
        </div>
      </div>
    </div>
    <div class="direction">
      <div class="left" @click="move(distanceNum, 1, speed)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="right" @click="move(distanceNum, -1, speed)">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import featuredImg01 from '~/assets/images/featured/featured-img01.jpg'
import featuredImg02 from '~/assets/images/featured/featured-img02.jpg'
import featuredImg03 from '~/assets/images/featured/featured-img03.jpg'
import featuredImg04 from '~/assets/images/featured/featured-img04.jpg'
export default {
  name: "",
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    initialInterval: {
      type: Number,
      default: 3
    },
    imgWidth1: {
      type: Number,
      default: 260
    },
    distance1: {
      type: Number,
      default: -300
    },
    distanceNum1: {
      type: Number,
      default: 300
    },
  },
  data() {
    return {
      sliders: [
        {
          img:featuredImg01
        },
        {
          img:featuredImg02
        },
        {
          img:featuredImg03
        },
        {
          img:featuredImg04
        },
      ],
      currentIndex: 1,
      transitionEnd: true,
      imgWidth: 260,
      distance:-300,
      distanceNum:300,
      speed: this.initialSpeed
    };
  },
  computed: {
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      };
    },
    interval() {
      return this.initialInterval * 1000;
    }
  },
  mounted() {
    this.imgWidth = this.imgWidth1
    this.distance = this.distance1
    this.distanceNum = this.distanceNum1
    this.init();
  },
  methods: {
    init() {
      this.play();
      window.onblur = function() {
        this.stop();
      }.bind(this);
      window.onfocus = function() {
        this.play();
      }.bind(this);
    },
    move(offset, direction, speed) {
      // console.log(speed);
      if (!this.transitionEnd) return;
      this.transitionEnd = false;
      direction === -1 ? (this.currentIndex += offset / this.distanceNum) : (this.currentIndex -= offset / this.distanceNum);
      if (this.currentIndex > this.sliders.length) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = this.sliders.length;

      const destination = this.distance + offset * direction;
      this.animate(destination, direction, speed);
    },
    animate(des, direc, speed) {
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null;
      }
      this.temp = window.setInterval(() => {
        if (
          (direc === -1 && des < this.distance) ||
          (direc === 1 && des > this.distance)
        ) {
          this.distance += speed * direc;
        } else {
          this.transitionEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          // console.log('des',des)
          if (des < -(this.sliders.length)*this.distanceNum) this.distance = -this.distanceNum;
          if (des > -this.distanceNum) this.distance = -(this.sliders.length)*this.distanceNum;
        }
      }, 20);
    },
    play() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = window.setInterval(() => {
        this.move(this.distanceNum, -1, this.speed);
      }, this.interval);
    },
    stop() {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#slider {
  text-align: center;
  position: relative;
  width: 100%;
  .window {
    position: relative;
    width: 100%;
    height: 200px;
    margin: 0 auto 80px;
    overflow: hidden;
    z-index: 100;
    .container {
      display: flex;
      position: absolute;
      justify-content: space-between;
      &>div{
        width: 300px;
        cursor: pointer;
        img{
          width: 100%;
          height: 140px;
        }
        p{
          font-family: Arial;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0px;
          color: #333333;
          font-weight: 300;
          padding-top: 20px;
        }
      }
    }
  }
  .direction{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .left,
    .right {
      position: absolute;
      border-radius: 50%;
      top: 60px;
      cursor: pointer;
      i{
        font-size: 30px;
        font-weight: bold;
        color: #999;
      }
      &:hover{
        i{
          color: #00a0e9;
        }
      }
    }
    .left {
      left: -50px;
    }
    .right {
      right: -50px;
    }
  }
}
img {
  user-select: none;
}

</style>
