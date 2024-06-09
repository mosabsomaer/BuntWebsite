<template>
  <h1 style="text-align: center; font-weight: lighter;">Your Files</h1>
  <div>
    <vue-good-table ref="table" :columns="columns" :rows="files" compactMode
      styleClass="vgt-table striped custom-striped-table">
      <template #table-row="props">
        <tr>
          <td v-if="props.column.field === 'name'"><img src="@/assets/paper.svg" class="trash-icon" />{{ props.row.name
            }}</td>

          <td v-if="props.column.field === 'colorMode'" @click="toggleColorMode(props.row.id)"
            style="border-radius:30px;">
            <img v-if="props.row.colorMode" src="@/assets/Colored_Paper.svg" class="trash-icon" />
            <img v-else src="@/assets/b&w_Paper.svg" class="trash-icon" />
          </td>
          <td v-if="props.column.field === 'copies'" class="center-content">
            <button @click="decrementCopies(props.row.id)" class="copy-btn">-</button>
            <div class="copies-display">{{ props.row.copies }}</div>
            <button @click="incrementCopies(props.row.id)" class="copy-btn">+</button>
          </td>

          <td v-if="props.column.field === 'price'">{{ props.row.price }} LYD</td>
          <td v-if="props.column.field === 'actions'">
            <img src="@/assets/trash_can.svg" class="trash-icon" @click="deleteRow(props.row.id)" />

          </td>
        </tr>
      </template>

    </vue-good-table>
    <h2>Live Feed of Files</h2>
    <ul>
      <li v-for="file in files" :key="file.id">{{ file.name }}{{ file.colorMode }}{{ file.copies }}</li>

    </ul>
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
    <button :disabled="!agreed" @click="save" class="save-btn">Save</button>
  </div>
  <form action="https://upload.cloudconvert.com/d660c0df-d15e-468a-9554-917e0f0f3ef1/"
      method="POST"
      enctype="multipart/form-data">
    <input type="hidden" name="expires" value="1545444403">
    <input type="hidden" name="max_file_count" value="1">
    <input type="hidden" name="max_file_size" value="10000000000">
    <input type="hidden" name="signature" value="d0db9b5e4ff7283xxfe0b1e3ad6x1db95c616121">
    <input type="file" name="file">
    <input type="submit">
</form>
</template>




<script>
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { useFilesStore } from '@/stores/files';
import { computed } from 'vue';

export default {
  data() {
    return {
      agreed: false,
    };
  },
  methods: {
    save() {
      console.log('Saved');
    },
  },
  setup() {
    const filesStore = useFilesStore();
    const files = computed(() => filesStore.files);
    const totalPrice = computed(() => filesStore.totalPrice);

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

    return {
      files,
      columns: [
        {
          label: 'File Name',
          field: 'name',
          type: 'string',
        },
        {
          label: 'Color Mode',
          field: 'colorMode',
          html: true,
        },
        {
          label: 'Copies',
          field: 'copies',
          html: true,
        },
        {
          label: 'Price',
          field: 'price',
          type: 'number',
        },
        {
          label: '',
          field: 'actions',
          html: true,
        },
      ],
      deleteRow,
      toggleColorMode,
      incrementCopies,
      decrementCopies,
      totalPrice,
    };
  },
};

</script>
<style scoped>

.trash-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}





.copy-btn {
  background-color: transparent;
  color: #3F3F3F;
  padding: 5px 15px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}
.copy-btn:hover {
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.943);
}
.copies-display {
  display: inline-block;
  width: 5px; 
  text-align: center;
  margin: 0 5px;
}






.form-container {
  text-align: center;
  margin: 20px;
}

.terms {
  display: flex;
  align-items: center;
}

.terms label {
  margin-left: 8px;
}

.terms a {
  color: #007bff;
  text-decoration: none;
  margin: 0 5px;
}

.terms a:hover {
  text-decoration: underline;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.total-price {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left;
}

.save-btn {
  background-color: #4e63ea;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
