export default {
    name: 'EditList',

    props: {
        value: {
            type: Array,
            default: () => [
                
            ],
        },
        edit: {
            type: Boolean,
            default: true
        },
    },

    methods: {
        deleteItem(list, i) {
            if (i >= list.length) return false
            list.splice(i, 1)
            this.$emit('input', this.value)
            return true
        },
        addItem(list, item) {
            list.forEach(element => {
                if (this.getKey(element)===this.getKey(item))
                    return false
            });
            list.push(item)
            list.sort((a, b) => {
                let left = this.getKey(a)
                let right = this.getKey(b)
                if (left > right) return 1
                else return -1
            })
            this.$emit('input', this.value)
            return true
        },
        getKey(item) {
            return item
        }
    },

}