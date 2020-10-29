import { toLocalTimestamp } from '@/utils/transform'
export default {
    name: 'EditArticle',

    data: () => ({
        cid: '',
        type: 'BLOG',
        info: {
            title: 'New Draft',
            description: '',
            isDraft: true,
            coverImg: '',
            tag: []
        },
        blogContent: {
            lastUpdate: 0,
            text: '',
        },
        pdfContent: {
            lastUpdate: 0,
            file: ''
        }
    }),

    methods: {
        toLocalTimestamp,
        editArticle(post) {
            this.cid = post.info.cid
            this.type = post.info.collectionType
            this.info = {
                title: post.info.title,
                description: post.info.description,
                isDraft: post.info.isDraft,
                coverImg: post.info.coverImg,
                tag: post.info.tag.filter(x=>!!x)
            }
            if (this.type === 'BLOG') {
                this.blogContent = {
                    lastUpdate: this.toLocalTimestamp(post.content.lastUpdate),
                    text: post.content.text
                }
            }
            else if (this.type === 'PDF') {
                this.pdfContent = {
                    lastUpdate: this.toLocalTimestamp(post.content.lastUpdate),
                    file: post.content.file
                }
            }
            this.contentType = 3
            this.tab = 1
        },
        async updateCoverImg(coverImg) {
            const [res, success] = await this.$request.uploadImg(coverImg, 'blogCoverImg/' + this.cid + '/img')
                .catch(err => console.log(err))
            if (success) {
                this.info.coverImg = res.location + '?timestamp=' + Date.now()
                return true
            }
            else {
                if (res.status === 401)
                    this.$router.push({ 'name': 'NotLogin' })
                else
                    this.$emit('message', res.error.message || res.error, 'error')
                return false
            }
        },
        async updateArticle(info) {
            const [res, success] = await this.$request.post("/api/post/update/info/"+this.cid, info)
                .catch(err => console.log(err))
            if (success) {
                return true
            }
            else {
                if (res.status === 401)
                    this.$router.push({ 'name': 'NotLogin' })
                else
                    this.$emit('message', res.error.message || res.error, 'error')
                return false
            }
        },
        async updateContent(text) {
            const [res, success] = await this.$request.post("/api/post/update/blog/" + this.cid, { text })
                .catch(err => console.log(err))
            if (success) {
                return true
            }
            else {
                if (res.status === 401)
                    this.$router.push({ 'name': 'NotLogin' })
                else
                    this.$emit('message', res.error.message || res.error, 'error')
                return false
            }
        },
        async deleteArticle() {
            const [res, success] = await this.$request.post("/api/post/delete/" + this.cid)
                .catch(err => console.log(err))
            if (success) {
                this.$emit('message', 'article deleted!', 'success')
                this.close()
            }
            else {
                if (res.status === 401)
                    this.$router.push({ 'name': 'NotLogin' })
                else
                    this.$emit('message', res.error.message || res.error, 'error')
            }
        },

        async saveArticle() {
            let coverImg = this.$refs.info ? this.$refs.info.imageFile : null
            if (coverImg && !(await this.updateCoverImg(coverImg))) {
                return
            }
            if (await this.updateContent(this.blogContent.text) && await this.updateArticle(this.info)) {
                this.$emit('update-articles')
                this.$emit('message', 'article updated!', 'success')
            } 
        }
    },
}
