<template>
    <div>
        <Crow>
            <Ccol>
                <CCard>
                <CCardHeader>
                <div class="row">
                    <div class="col-md-10">
                        <h4>Daftar Request</h4>
                    </div>
                </div>
                </CCardHeader>
                <CCardBody>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Nama Aplikasi</th>
                        <th scope="col">Background</th>
                        <th scope="col">Font Color</th>
                        <th scope="col">Prod Layout</th>
                        <th scope="col">Kategory</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- menampilkan data ke table -->
                    <tr v-for="request in requests" :key="request.id">
                        <td>{{request.appName}}</td>
                        <td>{{request.customization.appBackground}}</td>
                        <td>{{request.customization.appFontColor}}</td>
                        <td>{{request.customization.prodLayout}}</td>
                        <td>{{request.customization.category.name}}</td>
                        <td style=" width:20%">
                            <button class="btn btn-success" v-on:click="acceptRequest(request.id)">Accept</button>
                            <button class="btn btn-danger" v-on:click="cancelRequest(request.id)">Reject</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </CCardBody>
                </CCard>
            </Ccol>
        </Crow>
    </div>
</template>


<!-- script js -->
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                // variable array yang akan menampung hasil fetch dari api
                requests: []
            };
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                // fetch data dari api menggunakan axios
                axios.get("http://localhost:9000/molde/api/v1/request/get").then(response => {
                    console.log(response.data.data)
                    // mengirim data hasil fetch ke varibale array persons
                    this.requests = response.data.data;
                });
            },
            acceptRequest(id) {
                axios.put("http://localhost:9000/molde/api/v1/request/" + id + "/accept").then(response => {
                    this.loadData();
                });
            },
            cancelRequest(id) {
                axios.put("http://localhost: 9000/molde/api/v1/request/" + id + "/cancel").then(response => {
                    this.loadData();
                });
            }
        }
    };
</script>
