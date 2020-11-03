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
                tag: post.info.tag
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

        async uploadCoverImg(coverImg) {
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

        async uploadPdf(file) {
            const [res, success] = await this.$request.uploadFile(file, 'pdf/' + this.cid + '/file')
                .catch(err => console.log(err))
            if (success) {
                this.pdfContent.file = res.location + '?timestamp=' + Date.now()
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

        async updatePdf(file) {
            const [res, success] = await this.$request.post("/api/post/update/pdf/" + this.cid, { file })
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

        async updateInfo(info) {
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

        async saveArticle() {
            let coverImg = this.$refs.info ? this.$refs.info.imageFile : null
            if (coverImg && !(await this.uploadCoverImg(coverImg)))
                return
            if (this.type === 'BLOG' && !(await this.updateContent(this.blogContent.text)))
                return
            else if (this.type === 'PDF') {
                let file = this.$refs.content ? this.$refs.content.pdfFile : null
                if (file && !(await this.uploadPdf(file)))
                    return
                if (file && !(await this.updatePdf(this.pdfContent.file)))
                    return
            }
            if (await this.updateInfo(this.info)) {
                this.$emit('update-articles')
                this.$emit('message', 'article updated!', 'success')
            } 
        },

        async deleteCoverImg() {
            const [res, success] = await this.$request.deleteImg('blogCoverImg/' + this.cid + '/img')
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

        async deletePdf() {
            const [res, success] = await this.$request.deleteFile('pdf/' + this.cid + '/file')
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

        async deleteInfo() {
            const [res, success] = await this.$request.post("/api/post/delete/" + this.cid)
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
            if (!!this.info.coverImg && !await this.deleteCoverImg())
                return 
            if (this.type === 'PDF' && this.pdfContent.file.length > 0 && !await this.deletePdf())
                return
            if (await this.deleteInfo())
                this.$emit('message', 'article deleted!', 'success')
            this.close()
        },
    },
}
