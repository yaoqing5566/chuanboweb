<template>
  <header class="short-header">

    <div class="gradient-block"></div>

    <div class="row header-content">

      <div class="logo">
        <a href="#/index">Author</a>
      </div>

      <nav id="main-nav-wrap">
        <ul class="main-navigation sf-menu">
          <li class="current"><a href="#/index" title="">主页</a></li>

          <!--<li class="has-children">-->
            <!--<a href="single-standard.html" title="">Blog</a>-->
            <!--<ul class="sub-menu">-->
              <!--<li><a href="single-video.html">page2</a></li>-->
              <!--<li><a href="single-audio.html">page2</a></li>-->
            <!--</ul>-->
          <!--</li>-->
          <li><a href="#/index" title="">关于我们</a></li>
          <li><a href="#/index" title="">频道</a></li>
          <li><a target="_blank" href="http://old.chuanboweb.com" title="">切换成旧版</a></li>
        </ul>
      </nav> <!-- end main-nav-wrap -->

      <div class="search-wrap">

        <div class="search-form">
          <label>
            <span class="hide-content">Search for:</span>
            <input type="search" class="search-field" v-model="keyword" placeholder="请输入您要搜索的关键字"  @keyup.enter="search()" value="" name="s" title="Search for:" autocomplete="off">
          </label>
        </div>

        <a href="javascript:;;" @click="closeSearch()" id="close-search" class="close-btn">Close</a>

      </div> <!-- end search wrap -->

      <div class="triggers">
        <a class="search-trigger" @click="showSearch()" href="javascript:;;"><i class="fa fa-search"></i></a>
        <a class="menu-toggle" :class="{'is-clicked':mobileNav}" @click="ssMobileNav()" href="javascript:;;"><span>Menu</span></a>
      </div> <!-- end triggers -->

    </div>

  </header> <!-- end header -->
</template>

<script>

    export default {
        data(){
            return {
                mobileNav:false,
                keyword:'',
            }
        },
        components:{
        },
        methods: {
            search(){
                let k=this.keyword;
                this.$router.push({path:'/index?type='+this.$store.state.webType+'&keyword='+k})
                this.closeSearch();
            },
            ssMobileNav(){
                this.mobileNav=!this.mobileNav;
                $('.main-navigation').slideToggle();
            },
            showSearch(){
                $("body").addClass('search-visible');
                setTimeout(()=>{
                    $('.search-wrap').find('.search-field').focus();
                },100)
            },
            closeSearch(){
                if($("body").hasClass('search-visible')){
                    $("body").removeClass('search-visible');
                    setTimeout(()=>{
                        $('.search-wrap').find('.search-field').blur();
                    },100)
                }
            }
        },
        created(){

        }
    }
</script>
