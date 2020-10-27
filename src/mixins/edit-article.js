export default {
    name: 'EditArticle',

    computed: {
        defaultArticle: function () {
            return {
                cid: "",
                draft: true,
                title: "new Draft ",
                description: "",
                img: "",
                content: ""
            }
        },
    },

    data: () => ({
        article: {},
    }),

    methods: {
        async createArticle() {
            //this.article = this.defaultArticle
            //this.article.cid = cid
        },
        async updateArticle() {
            //this.article
            //update article information and settings
        },
        async deleteArticle() {
            //this.article
            //delete article by cid
            this.close()
        },
        async updateContent() {
            //update article content by cid
        },
        assembleArticle() {

        },
        async saveArticle() {
            //re-assamble this.article
            if (await this.updateArticle()) {
                this.$emit('update-article', this.article)
                this.$emit('message', 'article updated!', 'success')
            } else {
                this.loading = false
                return
            }
        }
    },
}
