export default {
    name: 'EditAbout',

    methods: {
        async updateAbout(about) {
            const [res, success] = await this.$request.post("/api/user/about/update", about)
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
        assembleAbout() {
            let about = {}
            about.education = JSON.stringify(this.$refs.education ? this.$refs.education.education_m : this.about.education)
            about.work = JSON.stringify(this.$refs.work ? this.$refs.work.work_m : this.about.work)
            about.award = JSON.stringify(this.$refs.achievement ? this.$refs.achievement.award_m : this.about.award)
            about.skillset = JSON.stringify(this.$refs.skillset ? this.$refs.skillset.skillset_m : this.about.skillset)
            about.interest = JSON.stringify(this.$refs.interest ? this.$refs.interest.interest_m : this.about.interest)
            return about
        },
        async saveAbout() {
            let about = this.assembleAbout()
            if (await this.updateAbout(about)) {
                this.$emit('update-about', about)
                this.$emit('message', 'about me updated!', 'success')
            } 
        }
    },
}
