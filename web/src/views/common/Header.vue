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
        </ul>
      </nav> <!-- end main-nav-wrap -->

      <div class="search-wrap">

        <form role="search" method="get" class="search-form" action="#">
          <label>
            <span class="hide-content">Search for:</span>
            <input type="search" class="search-field" placeholder="Type Your Keywords" value="" name="s" title="Search for:" autocomplete="off">
          </label>
          <input type="submit" class="search-submit" value="Search">
        </form>

        <a href="javascript:;;" @click="closeSearch()" id="close-search" class="close-btn">Close</a>

      </div> <!-- end search wrap -->

      <div class="triggers">
        <a class="search-trigger" @click="showSearch()" href="javascript:;;"><i class="fa fa-search"></i></a>
        <a class="menu-toggle" href="#"><span>Menu</span></a>
      </div> <!-- end triggers -->

    </div>

  </header> <!-- end header -->
</template>

<script>

    export default {
        data(){
            return {

            }
        },
        components:{
        },
        methods: {
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
