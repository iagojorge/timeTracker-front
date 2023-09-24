<template>
    <div class="box has-text-weight-build">
        <slot></slot>
    </div>
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Box'
})

</script>

<style scoped>
.box{
    background: #FAF0CA;
}
</style>

