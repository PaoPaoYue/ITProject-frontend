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
            default: false
        },
    },

    methods: {
        deleteItem(list, i) {
            if (i >= list.length) return false
            list.splice(i, 1)
            return true
        },
        addItem(list, item) {
            let success = true
            list.forEach(element => {
                if (this.getKey(element)===this.getKey(item))
                    success = false
                    return 
            });
            if (!success) return false
            list.push(item)
            list.sort((a, b) => {
                let left = this.getKey(a)
                let right = this.getKey(b)
                if (left > right) return 1
                else return -1
            })
            return true
        },
        getKey(item) {
            return item
        }
    },

}