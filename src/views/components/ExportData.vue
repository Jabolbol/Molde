<template>
    <div>
        <h1>Export Data</h1>
        <h3>Which data to export?</h3>
        <CButton class="btn btn-primary" @click="exportOrder">Order</CButton>
        &emsp;
        <CButton class="btn btn-primary" @click="exportProduct">Product</CButton>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: 'ExportData',
        methods: {
            exportProduct() {
                Axios({
                    url: '/product/export',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');

                    link.href = url;
                    link.setAttribute('download', 'products.xlsx');
                    document.body.appendChild(link);
                    link.click();
                }).catch((error) => {
                    console.log(error);
                })
            },

        }
    }
</script>

<style scoped>

</style>