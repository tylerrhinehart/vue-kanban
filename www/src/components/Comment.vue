<template>
    <div>
        <p>Comment: {{comment.content}}</p>
    </div>
</template>
<script>
    export default {
        name: 'Comment',
        data() {
            return {}
        },
        props:["comment"]
    }

</script>
<style>

</style>