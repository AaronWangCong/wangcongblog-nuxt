<template>
  <div ref="messageCarousel" :style="{ height: showItemNum * eleH + 'px'}" class="auto-carousel-wrap">
    <ul :class="{ anim:animate === true }" class="carousel-list-box">
      <li v-for="(row,index) in dataList" :key="index">
        <slot :row="row"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
  var timer = null;
  import { mapState } from 'vuex'
  export default {
    props: {
      dataList: {
        type: Array,
        required: true,
      },
      showItemNum: {
        type: Number,
        required: false,
        default: 1
      }
    },
    data() {
      return {
        animate: false,
        eleH: ''
      }
    },
    mounted(){
      this.setHeight();
      this.initAnamate();
    },
    destroyed(){
      clearInterval(timer);
    },
    methods: {
      scroll(){
        this.$refs.messageCarousel && (this.$refs.messageCarousel.querySelector('.carousel-list-box').style.marginTop = -this.eleH + 'px');
        this.animate = true;                       // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{
          this.dataList.push(this.dataList[0]);    // 将数组的第一个元素添加到数组的
          this.dataList.shift();                   // 删除数组的第一个元素
          this.animate = false;                   // margin-top 为0 的时候取消过渡动画，实现无缝滚动
          this.$refs.messageCarousel && (this.$refs.messageCarousel.querySelector('.carousel-list-box').style.marginTop = '0');
        },500)
      },
      setHeight(){
        this.eleH = this.$refs.messageCarousel.querySelector('li').getBoundingClientRect().height;
      },
      initAnamate(){
        if(!this.dataList || this.dataList.length === 1) return;
        clearInterval(timer);
        timer = setInterval(this.scroll,2000);
        let messageCarousel = this.$refs.messageCarousel.querySelector('.carousel-list-box');
        messageCarousel.addEventListener('mouseenter',()=>{
          clearInterval(timer);
        });
        messageCarousel.addEventListener('mouseleave',()=>{
          timer = setInterval(this.scroll,2000);
        });
      }
    },
    beforeRouteLeave(form,to,next){
      clearInterval(timer);
      next();
    }
  }
</script>

<style lang="scss">
  .auto-carousel-wrap{
    overflow: hidden;
    .anim{
      transition: all 0.5s linear;
    }
    .carousel-list-box li{
      list-style: none;
      line-height: 30px;
      height: 30px;
    }
  }
</style>
