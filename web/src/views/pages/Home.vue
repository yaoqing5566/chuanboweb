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
                                                    <li>2018-12-25</li>
                                                    <li><a>趣分享个人网站作品展示</a></li>
                                                </ul>

                                                <h1 class="slide-title"><a title="">网站秩序开发中</a></h1>
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
                                                    <li><a>Sasuke Uchiha</a></li>
                                                </ul>

                                                <h1 class="slide-title"><a title="">Enhancing Your Designs with Negative Space</a></h1>
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
                                                    <li><a class="author">Naruto Uzumaki</a></li>
                                                </ul>

                                                <h1 class="slide-title"><a title="">Music Album Cover Designs for Inspiration</a></h1>
                                            </div>

                                        </div>
                                    </li> <!-- end slide -->

                                </ul> <!-- end slides -->
                            </div> <!-- end featured-post-slider -->
                        </div> <!-- end entry content -->
                    </div>

                    <article class="brick entry format-standard animate-this" v-for="item in tableData">
                        <div class="entry-thumb" @click="goDetatl(item)">
                            <a href="javascript:;;" class="thumb-link">
                                <img v-if="item.news_image.lastIndexOf('http')==-1" :src="'/image/upload_news/'+item.news_image" alt="building">
                                <img v-else :src="item.news_image" alt="building">
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
                                <h1 class="entry-title" @click="goDetatl(item)"><a href="javascript:;;">{{item.news_title}}</a></h1>
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
                    <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="count" :current-page.sync="pageIndex">
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
                pageSize:15,
                keyword:'',
                count:0
            }
        },
        components: {

        },
        mounted: function () {
          console.log(111)
        },
        watch: {
            $route() {
                this.keyword=this.$route.query.keyword?this.$route.query.keyword:'';
                this.pageIndex=this.$route.query.pageIndex?this.$route.query.pageIndex:1;
            },
            keyword(){
                this.getData();
            },
            pageIndex(){
                this.getData();
            }
        },
        methods:{
            goDetatl(item){
                if(item.news_type==2){
                    window.open(item.news_ztlink)
                }else {
                    this.$router.push({path:'/detail',query:{id:item.news_id}})
                }
                
                console.log(item.news_id)
            },
            init(){
                this.$nextTick( () => {
                    $_common.ssPreloader();
                    $_common.ssMediaElementPlayer();
                    $_common.ssFitVids();
                    $_common.ssPrettyPrint();
                    $_common.ssAlertBoxes();
                    $_common.ssSuperFish();
                    $_common.ssMasonryFolio();
                    $_common.ssBricksAnimate();
                    $_common.ssFlexSlider();
                    $_common.ssBackToTop();
                })
            },
            handleCurrentChange(val) {
                $("#loader,#preloader").show();
                this.pageIndex = val;
                this.$router.push({path:'/index',query:{type:this.$store.state.webType,pageIndex:val}})
                document.body.scrollTop = 0
                this.getData();
            },
            getData(){
                let that=this;
                $_get('/Views/web/getNew.aspx?pageIndex='+that.pageIndex+'&pageSize='+that.pageSize+'&type='+that.$store.state.webType+'&name='+that.keyword).then(function (response) {
                    that.tableData=response.data.list;
                    that.count=response.data.count;
                    that.init();
                })
            }
        },
        created(){
            if(this.$route.query.type){
                this.$store.state.webType=this.$route.query.type;
            }
            if(this.$route.query.pageIndex){
                this.pageIndex=parseInt(this.$route.query.pageIndex);
            }
            if(this.$route.query.keyword){
                this.keyword=this.$route.query.keyword;
            }
            this.getData();
        }
    }
</script>
<style>
</style>