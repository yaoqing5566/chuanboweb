<template>
    <div>

        <section id="bricks">

            <div class="row masonry">

                <!-- brick-wrapper -->
                <div class="bricks-wrapper">

                    <div class="grid-sizer"></div>

                    <div class="brick entry featured-grid animate-this">
                        <div class="entry-content">
                            <div id="featured-post-slider" class="flexslider">
                                <ul class="slides">

                                    <li>
                                        <div class="featured-post-slide">

                                            <div class="post-background" style="background-image:url('http://demo.sc.chinaz.com/Files/DownLoad/moban/201709/moban2366/images/thumbs/featured/featured-1.jpg');"></div>

                                            <div class="overlay"></div>

                                            <div class="post-content">
                                                <ul class="entry-meta">
                                                    <li>September 06, 2016</li>
                                                    <li><a href="#" >Naruto Uzumaki</a></li>
                                                </ul>

                                                <h1 class="slide-title"><a href="#/detail" title="">Minimalism Never Goes Out of Style</a></h1>
                                            </div>

                                        </div>
                                    </li> <!-- /slide -->

                                    <li>
                                        <div class="featured-post-slide">

                                            <div class="post-background" style="background-image:url('http://demo.sc.chinaz.com/Files/DownLoad/moban/201709/moban2366/images/thumbs/featured/featured-2.jpg');"></div>

                                            <div class="overlay"></div>

                                            <div class="post-content">
                                                <ul class="entry-meta">
                                                    <li>August 29, 2016</li>
                                                    <li><a href="#">Sasuke Uchiha</a></li>
                                                </ul>

                                                <h1 class="slide-title"><a href="#/detail" title="">Enhancing Your Designs with Negative Space</a></h1>
                                            </div>

                                        </div>
                                    </li> <!-- /slide -->

                                    <li>
                                        <div class="featured-post-slide">

                                            <div class="post-background" style="background-image:url('http://demo.sc.chinaz.com/Files/DownLoad/moban/201709/moban2366/images/thumbs/featured/featured-3.jpg');;"></div>

                                            <div class="overlay"></div>

                                            <div class="post-content">
                                                <ul class="entry-meta">
                                                    <li>August 27, 2016</li>
                                                    <li><a href="#" class="author">Naruto Uzumaki</a></li>
                                                </ul>

                                                <h1 class="slide-title"><a href="#/detail" title="">Music Album Cover Designs for Inspiration</a></h1>
                                            </div>

                                        </div>
                                    </li> <!-- end slide -->

                                </ul> <!-- end slides -->
                            </div> <!-- end featured-post-slider -->
                        </div> <!-- end entry content -->
                    </div>

                    <article class="brick entry format-standard animate-this" v-for="item in tableData">
                        <div class="entry-thumb">
                            <a href="#/detail" class="thumb-link">
                                <img :src="'/image/upload_news/'+item.news_image" alt="building">
                            </a>
                        </div>
                        <div class="entry-text">
                            <div class="entry-header">
                                <div class="entry-meta">
               			<!--<span class="cat-links">-->
               				<!--<a href="#">Design</a>-->
               				<!--<a href="#">Photography</a>-->
               			<!--</span>-->
                                </div>
                                <h1 class="entry-title"><a href="#/detail">{{item.news_title}}</a></h1>
                            </div>
                            <div class="entry-excerpt" v-if="item.news_subtitle">
                                {{item.news_subtitle}}
                            </div>
                        </div>
                    </article> <!-- end article -->

                </div> <!-- end brick-wrapper -->

            </div> <!-- end row -->

            <div class="row">

                <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="count">
                    </el-pagination>
                </div>

            </div>

        </section> <!-- end bricks -->



    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        data () {
            return {
                tableData: [],
                pageIndex:1,
                pageSize:10,
                count:0,
                type:1
            }
        },
        components: {

        },
        methods:{
            init(){
                this.$nextTick( () => {
                    $_common.ssPreloader();
                    $_common.ssMediaElementPlayer();
                    $_common.ssFitVids();
                    $_common.ssPrettyPrint();
                    $_common.ssAlertBoxes();
                    $_common.ssSuperFish();
                    $_common.ssMobileNav();
                    $_common.ssMasonryFolio();
                    $_common.ssBricksAnimate();
                    $_common.ssFlexSlider();
                    $_common.ssBackToTop();
                })
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getData();
            },
            getData(){
                let that=this;
                $_get('/Views/web/getNew.aspx?pageIndex='+that.pageIndex+'&pageSize='+that.pageSize+'&type='+that.type+'&name=').then(function (response) {
                    that.tableData=response.data.list;
                    that.count=response.data.count;
                    that.init();
                })
            }
        },
        created(){
            this.getData();

        }
    }
</script>
<style>
</style>