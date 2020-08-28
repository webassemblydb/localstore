<template>
    <div>
        setting{{count}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: this.$store.state.count
        }
    }

}
</script>
<style scoped>

</style>