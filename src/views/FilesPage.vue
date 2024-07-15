<template>
  <h1 style="text-align: center; font-weight: lighter">Your Files</h1>
  <div>
    <vue-good-table
      ref="table"
      :columns="columns"
      :rows="files"
      compactMode
      styleClass="vgt-table striped custom-striped-table"
    >
      <template #table-row="props">
        <tr>
          <td v-if="props.column.field === 'name'">
            <img src="@/assets/paper.svg" class="trash-icon" />
            {{ props.row.name }}
          </td>
          <td
            v-if="props.column.field === 'colorMode'"
            @click="toggleColorMode(props.row.id)"
            style="border-radius: 30px"
          >
            <img
              v-if="props.row.colorMode"
              src="@/assets/Colored_Paper.svg"
              class="trash-icon"
            />
            <img v-else src="@/assets/b&w_Paper.svg" class="trash-icon" />
          </td>
          <td v-if="props.column.field === 'copies'" class="center-content">
            <button @click="decrementCopies(props.row.id)" class="copy-btn">
              -
            </button>
            <div class="copies-display">{{ props.row.copies }}</div>
            <button @click="incrementCopies(props.row.id)" class="copy-btn">
              +
            </button>
          </td>
          <td v-if="props.column.field === 'price'">
            {{ props.row.price }} LYD
          </td>
          <td v-if="props.column.field === 'actions'">
            <img
              src="@/assets/trash_can.svg"
              class="trash-icon"
              @click="deleteRow(props.row.id)"
            />
          </td>
        </tr>
      </template>
    </vue-good-table>
  </div>
  <div class="form-container">
    <div class="terms">
      <input type="checkbox" id="agree" v-model="agreed" />
      <label for="agree">
        By clicking this box you agree to the
        <router-link to="/terms">Terms of Service</router-link>
        &amp;
        <router-link to="/privacy">Privacy Policy</router-link>
      </label>
    </div>
    <hr />
    <div class="total-price">Total Price: {{ totalPrice }} Dinar</div>

    <div v-if="isSaveDisabled || !agreed" class="error-message">
      <p v-if="!agreed">
        You must agree to the Terms of Service and Privacy Policy.
      </p>
      <p v-if="!allFilesHaveCopies">All files must have at least one copy.</p>
    </div>
    <button
      :class="['save-btn', { disabled: isSaveDisabled }]"
      @click="isSaveDisabled ? $event.preventDefault() : save()">Save </button>
      
  </div>

  <!-- Section to display files -->
  <div v-if="files.length" class="files-list">
    <h3>Uploaded Files</h3>
    <ul>
      <li v-for="file in files" :key="file.id">
        <div v-for="[key, value] in Object.entries(file)">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </li>
    </ul>
    
  </div>

 
</template>

<script>
import "vue-good-table-next/dist/vue-good-table-next.css";
import { useFilesStore } from "@/stores/files";
import axios from "axios";
import { ref, computed } from "vue";
//css code
import "@/assets/styles/filespages.css";
export default {
  data() {
    return {
      agreed: false,
    };
  },
  methods: {
    
     sda(){
  this.$router.push('/code')
},

async save() {
    try {
      if (this.isSaveDisabled) {
        // If save is disabled, do not proceed with the request or navigation
        return;
      }
      const filesStore = useFilesStore();
      const files = computed(() => filesStore.files);

      // Send your request using axios to create the order
      const createOrderResponse = await axios.get("http://127.0.0.1:8000/api/createorders");
      console.log(createOrderResponse.data.message);
      filesStore.order_id = createOrderResponse.data.data.order_id;

      // Prepare the file details for the JSON store request
      const fileDetails = files.value.map((file) => ({
        JobID: file.id,
        copies: file.copies,
        color_mode: file.colorMode ? 1 : 0,
        order_id: filesStore.order_id,
      }));

      // Send the file details to the server
      for (const fileDetail of fileDetails) {
        const fileresponse = await axios.post('http://127.0.0.1:8000/api/files', fileDetail);
        console.log(fileresponse.data.message);
      }

      // Navigate to the '/code' page
      this.sda();
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  },



},
  setup() {
    const filesStore = useFilesStore();
    const files = computed(() => filesStore.files);
    const totalPrice = computed(() => filesStore.totalPrice);
    const order_id = computed(()=> filesStore.order_id);
    const agreed = ref(false);
    const check = ref(false);

    const allFilesHaveCopies = computed(() => {
      return files.value.every((file) => file.copies > 0);
    });

    const isSaveDisabled = computed(() => {
      return !agreed.value || !allFilesHaveCopies.value;
    });
    const deleteRow = (id) => {
      filesStore.removeFile(id);
    };

    const toggleColorMode = (id) => {
      filesStore.toggleColorMode(id);
    };

    const incrementCopies = (id) => {
      filesStore.incrementCopies(id);
    };

    const decrementCopies = (id) => {
      filesStore.decrementCopies(id);
    };

//     async function save() {
//   try {
//     if (this.isSaveDisabled) {
//       // If save is disabled, do not proceed with the request or navigation
//       return;
//     }
//     const filesStore = useFilesStore();
//     const files = computed(() => filesStore.files);

//     // Send your request using axios to create the order
//     const createOrderResponse = await axios.get("http://127.0.0.1:8000/api/createorders");
//     console.log(createOrderResponse.data.message);
//     filesStore.order_id = createOrderResponse.data.data.order_id;

//     // Prepare the file details for the JSON store request
//     const fileDetails = files.value.map((file) => ({
//       JobID: file.id,
//       copies: file.copies,
//       color_mode: file.colorMode ? 1 : 0,
//       order_id: filesStore.order_id,
//     }));

//     // Send the file details to the server
//     for (const fileDetail of fileDetails) {
//       const fileresponse = await axios.post('http://127.0.0.1:8000/api/files', fileDetail);
//       console.log(fileresponse.data.message);
//     }

//     // Navigate to the '/code' page
//     sda();
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//   }
// }




    return {
      files,
      columns: [
        {
          label: "File Name",
          field: "name",
          type: "string",
        },
        {
          label: "Color Mode",
          field: "colorMode",
          html: true,
        },
        {
          label: "Copies",
          field: "copies",
          html: true,
        },
        {
          label: "Price",
          field: "price",
          type: "number",
        },
        {
          label: "",
          field: "actions",
          html: true,
        },
      ],
      deleteRow,
      toggleColorMode,
      incrementCopies,
      decrementCopies,
      totalPrice,
      allFilesHaveCopies,
      isSaveDisabled,
      agreed,
      // save,
      order_id,
  
    };
  },
};
</script>
