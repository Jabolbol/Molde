<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <br />
        <h4>Update Bank</h4>
        <br />
        <!-- prevent form submit untuk reload halaman, kemudian memanggil function addData() -->
        <form @submit.prevent="updateBank()">
          <div class="form-group">
            <label>Nama Bank</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan Nama Bank"
              v-model="name"
              required
            />
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        id:'',
        name: ''
    };
  },
  created(){
      this.loadData();
  },
  methods: {
      loadData(){
          axios
          .get("http://localhost:9000/molde/api/v1/bank/"+this.$route.params.id+"/updateBank")
          .then(respone=>{
              this.name = respon.data.data.bank_name;
          });
      },
      
    updateBank(bankName) {

        axios
        .get("http://localhost:9000/molde/api/v1/bank" + this.$route.params.id + "/updateBank", {
            name: this.bank_name,
        })
        .then(_=> {
            this.$route.push('/app')
        })
        .catch(err=>{
            console.log(err)
        })
      
    //   axios({
    //     method: "post",
    //     url: `bank/add?name=${this.bank_name}`
        

    //   }).then(response => {
    //     this.$router.push("/components/listBank");
    //     console.log(response);
    //     console.log(this.bank_name);
    //   });
    },
    
  }
};
</script>
