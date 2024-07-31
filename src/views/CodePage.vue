<template>
  <div class="order-container">
    <h1 class="order-word">Order Code</h1>
    <div class="order-code" @click="copyOrderCode()">{{ order_id }}</div>
    <div class="order-details">
      <p>Number of Papers: {{ numberOfPapers }}</p>
      <p>Total Price: {{ totalPrice }} Dinar</p>
    </div>
    <hr class="separator" />
    <div class="order-instructions">
      Use this order code in the machine and insert the coins to print your
      papers
    </div>
    <div v-if="copySuccess" class="copy-feedback">Copied to Clipboard</div>
  </div>


</template>

<script>
import { computed, ref } from "vue";
import { useFilesStore } from "@/stores/files";

export default {
  components: {
   
  },
  setup() {
    const filesStore = useFilesStore();
    const totalPrice = computed(() => filesStore.totalPrice);
    const order_id = computed(()=> filesStore.order_id);
    const numberOfPapers = computed(() => {
      return filesStore.files.reduce((total, file) => total + file.copies * file.pageCount, 0);
    });


    const copySuccess = ref(false);

    const copyOrderCode = () => {
      navigator.clipboard.writeText(order_id.value).then(() => {
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 2000);
      });
    };

    return {
      totalPrice,
      numberOfPapers,
      copyOrderCode,
      copySuccess,
      order_id
    };
  },
};
</script>

<style>
.order-container {
  text-align: center;
  font-family: "Poppins";
  padding: 20px;
}
.order-word {
  font-weight: lighter;
}
.order-code {
  display: inline-block;
  padding: 10px 40px;
  font-size: 2rem;
  background-color: #e0e0e0;
  border-radius: 50px;
  margin: 20px 0;
  font-weight: 100;
  letter-spacing: 15px;
  cursor: pointer;
}

.order-details {
  text-align: left !important;
  margin: 15px;
  font-size: 1.2rem;
}

.separator {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.order-instructions {
  margin-top: 20px;
  font-size: 1rem;
  color: gray;
}
.copy-feedback {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ecfdf5;
  color: #064e3b;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
