<template>
    <div>

        <section id="content-wrap" class="blog-single">
            <div class="row">
                <div class="col-twelve">

                    <article class="format-standard">
                        <!--<div class="content-media">-->
                            <!--<div class="post-thumb">-->
                                <!--<img src="images/shutterbug.jpg">-->
                            <!--</div>-->
                        <!--</div>-->

                        <div class="primary-content">

                            <h1 class="page-title">{{dataTable.news_title}}</h1>

                            <ul class="entry-meta">
                                <li class="date">{{dataTable.news_addtime | formatDate}}</li>
                                <li class="cat">{{dataTable.news_author}}</li>
                            </ul>
                            <p class="lead" style="padding-bottom: 30px">{{dataTable.news_subtitle?dataTable.news_subtitle:dataTable.news_title}}</p>
                            <!--<blockquote><p>{{dataTable.news_subtitle?dataTable.news_subtitle:dataTable.news_title}}</p></blockquote>-->


                            <p v-html="dataTable.new_content"></p>






                        </div> <!-- end entry-primary -->

                    </article>


                </div> <!-- end col-twelve -->
            </div> <!-- end row -->

            <div class="comments-wrap">
                <div id="comments" class="row">
                    <div class="col-full">

                        <h3>全部评论（1）</h3>

                        <!-- commentlist -->
                        <ol class="commentlist">

                            <li class="depth-1">

                                <div class="avatar">
                                    <img width="50" height="50" class="avatar" src="images/shutterbug.jpg" alt="">
                                </div>

                                <div class="comment-content">

                                    <div class="comment-info">
                                        <cite>Itachi Uchiha</cite>

                                        <div class="comment-meta">
                                            <time class="comment-time" datetime="2014-07-12T23:05">Jul 12, 2014 @ 23:05</time>
                                            <span class="sep">/</span><a class="reply" href="#">Reply</a>
                                        </div>
                                    </div>

                                    <div class="comment-text">
                                        <p>Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate,
                                            facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.</p>
                                    </div>

                                </div>

                            </li>


                        </ol> <!-- Commentlist End -->

                        <!-- respond -->
                        <div class="respond">

                            <h3>留下评论</h3>

                            <form name="contactForm" id="contactForm">
                                <fieldset>
                                    <div class="message form-field">
                                        <textarea name="cMessage" id="cMessage" class="full-width" placeholder="请输入评论" ></textarea>
                                    </div>

                                    <button type="submit" class="submit button-primary"> 发 布 </button>

                                </fieldset>
                            </form> <!-- Form End -->

                        </div> <!-- Respond End -->

                    </div> <!-- end col-full -->
                </div> <!-- end row comments -->
            </div> <!-- end comments-wrap -->

        </section>


    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        data () {
            return {
                dataTable:""
            }
        },
        filters:{
            formatDate(da) {
                return moment(da).format("YYYY-MM-DD");
            }
        },
        components: {

        },
        methods:{
            getData(){
                let _this=this;
                $_get('/Views/web/getNewsDetail.aspx?id='+_this.id).then(function (response) {
                    if(response.code==1){
                        _this.dataTable=response.data[0];
                    }else {
                        _this.$message.error(response.msg);
                    }
                })
            }
        },
        created(){
            this.id=this.$route.query.id;
            if(this.id){
                this.getData();
            }

            this.$nextTick( () => {
                $_common.ssPreloader();
            })

        }
    }
</script>
<style>
</style>