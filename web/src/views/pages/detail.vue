<template>
    <div>

        <section id="content-wrap" class="blog-single">
            <div class="row">
                <div class="col-twelve">

                    <article class="format-standard">


                        <div class="primary-content">

                            <h1 class="page-title">Hey, This Is A Standard Format Post.</h1>

                            <ul class="entry-meta">
                                <li class="date">September 06, 2016</li>
                                <li class="cat"><a href="">Wordpress</a><a href="">Design</a></li>
                            </ul>

                            <p class="lead">Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim mollit amet anim veniam dolor dolor irure velit commodo cillum sit nulla ullamco magna amet magna cupidatat qui labore cillum sit in tempor veniam consequat non laborum adipisicing aliqua ea nisi sint.</p>

                            <p>Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim mollit amet anim veniam dolor dolor irure velit commodo cillum sit nulla ullamco magna amet magna cupidatat qui labore cillum sit in tempor veniam consequat non laborum adipisicing aliqua ea nisi sint ut quis proident ullamco ut dolore culpa occaecat ut laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed.
                            </p>

                            <p><img src="images/shutterbug.jpg" alt=""></p>

                            <h2>Large Heading</h2>

                            <p>Harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus <a href="http://#">omnis voluptas assumenda est</a> id quod maxime placeat facere possimus, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et.</p>

                            <blockquote><p>This is a simple example of a styled blockquote. A blockquote tag typically specifies a section that is quoted from another source of some sort, or highlighting text in your post.</p></blockquote>

                            <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed..</p>

                            <h3>Smaller Heading</h3>

                            <p>Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

                            <p>Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>



                            <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.</p>



                            <p>Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed..</p>

                            <p class="tags">
                                <span>Tagged in :</span>
                                <a href="#">orci</a><a href="#">lectus</a><a href="#">varius</a><a href="#">turpis</a>
                            </p>



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

                            <form name="contactForm" id="contactForm" method="post" action="">
                                <fieldset>
                                    <div class="message form-field">
                                        <textarea name="cMessage" id="cMessage" class="full-width" placeholder="请输入评论" ></textarea>
                                    </div>

                                    <button type="submit" class="submit button-primary">发布</button>

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
        components: {

        },
        methods:{

        },
        created(){
            this.$nextTick( () => {
                $_common.ssPreloader();
            })

        }
    }
</script>
<style>
</style>