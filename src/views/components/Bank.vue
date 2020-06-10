<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <br>
                <h4>Tambahkan Bank</h4>
                <br>
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function addData() -->
                <form @submit.prevent="addBank">
                    <div class="form-group">
                        <label>Nama Bank</label>
                        <input
                                type="text"
                                class="form-control"
                                placeholder="Masukkan Nama Bank"
                                v-model="bank_name"
                        >
                    </div>

                    <button class="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                bank_name:''
            }
        },
        methods: {
            addBank() {
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/molde/api/v1/bank/add?name=this.bank_name',
                    
                    // localhost:9000/molde/api/v1/bank/add?name=BNI
                })
                    .then(response => {
                        this.$router.push("/listBank");
                        console.log(response);
                        console.log(this.bank_name);
                    });
            }
        }
    };
</script>
