<template>
    <h1>Order Code</h1>
    <h1>123456</h1>
    <p>number of papers:</p>
    <p>Total Price: {{ totalPrice }} Dinar</p>
</template>
<script>
import { computed } from 'vue';
import { useFilesStore } from '@/stores/files';
export default {
    setup() {
        const filesStore = useFilesStore();
        const totalPrice = computed(() => filesStore.totalPrice);
        return { totalPrice, };
    },

}

</script>
<style>
</style>