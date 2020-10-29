export default {
    name: 'EditSetting',

    methods: {
        async updateSetting(author) {
            const [res, success] = await this.$request.post("/api/user/account/update", author)
                .catch(err => console.log(err))
            if (success) {
                return true
            }
            else {
                if (res.status == 401)
                    this.$router.push({ 'name': 'NotLogin' })
                else
                    this.$emit('message', res.error.message || res.error, 'error')
                return false
            }
        },
        async updatePassword(password) {
            const [res, success] = await this.$request.post("/api/user/password/update", { 'password': password })
                .catch(err => console.log(err))
            if (success) {
                return true
            }
            else {
                if (res.status === 401)
                    this.$router.push({ 'name': 'NotLogin' })
                if (res.status === 422)
                    this.$emit('message', res.error.message, 'warn')
                else
                    this.$emit('message', res.error.message || res.error, 'error')
                return false
            }
        },
        async updateAvatar(avatar) {
            const [res, success] = await this.$request.uploadImg(avatar, 'avatar/img')
                .catch(err => console.log(err))
            if (success) {
                this.author.avatar = res.location + '?timestamp=' + Date.now()
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
        assembleAuthor() {
            let author = {}
            author.avatar = this.author.avatar
            if (this.$refs.basic) {
                author.displayName = this.$refs.basic.displayName_m
                author.simpleDescription = this.$refs.basic.simpleDescription_m
                author.description = this.$refs.basic.description_m
            } else {
                author.displayName = this.author.displayName
                author.simpleDescription = this.author.simpleDescription
                author.description = this.author.description
            }

            if (this.$refs.contact) {
                author.email = this.$refs.contact.email_m
                author.phone = this.$refs.contact.phone_m
                author.contactFacebook = this.$refs.contact.contactFacebook_m
                author.contactLinkedin = this.$refs.contact.contactLinkedin_m
                author.contactGithub = this.$refs.contact.contactGithub_m
            } else {
                author.email = this.author.email
                author.phone = this.author.phone
                author.contactFacebook = this.author.contactFacebook
                author.contactLinkedin = this.author.contactLinkedin
                author.contactGithub = this.author.contactGithub
            }

            if (this.$refs.location) {
                author.location = this.$refs.location.location_m
            } else {
                author.location = this.author.location
            }
            return author
        },
        async saveSetting() {
            let password = this.$refs.password ? this.$refs.password.password : ''
            if (password && !(await this.updatePassword(password))) {
                return
            }
            let avatar = this.$refs.basic ? this.$refs.basic.avatarFile : null
            if (avatar && !(await this.updateAvatar(avatar))) {
                return
            }
            let author = this.assembleAuthor()
            if (await this.updateSetting(author)) {
                this.$emit('update-author', author)
                this.$emit('message', 'settings updated!', 'success')
                if (avatar)
                    this.$emit('lazy-message', 'avatar updated!', 'success')
                if (password)
                    this.$emit('lazy-message', 'password updated!', 'success')
            } 
        }
    },
}