<template>
  <div>
    <h1>Your Table Title</h1>
    <vue-good-table
      :columns="columns"
      :rows="files"
      
      
    >
      <template slot="table-row" slot-scope="props">
        <tr :class="props.row.styleClass">
          <td>
            <i class="far fa-file-alt"></i> {{ props.row.fileName }}
          </td>
          <td>
            <i :class="props.row.colorMode === 'RGB' ? 'fas fa-palette' : 'fas fa-adjust'"></i>
          </td>
          <td>
            <button @click="decrementCopies(props.row)">-</button>
            {{ props.row.copies }}
            <button @click="incrementCopies(props.row)">+</button>
          </td>
          <td>{{ props.row.price }}</td>
          <td>
            <i class="fas fa-trash" @click="deleteRow(props.row)"></i>
          </td>
        </tr>
      </template>
    </vue-good-table>
  </div>
  <h1>sdas</h1>
</template>

<script>
import 'vue-good-table-next/dist/vue-good-table-next.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useFilesStore } from '@/stores/files';
import { computed } from 'vue';
export default {

  setup() {
    const filesStore = useFilesStore();
    const files = computed(() => filesStore.files);

    return {
      files,
      columns: [
        {
          label: 'File Name',
          field: 'name',
          type: 'string',
        },
        {
          label: 'Size',
          field: 'size',
          type: 'number',
          formatter: (value) => `${(value / 1024).toFixed(2)} KB`,
        },
        {
          label: 'Status',
          field: 'uploaded',
          type: 'boolean',
          formatter: (value) => (value ? 'Uploaded' : 'Pending'),
        },
      ],
    };
  },
  methods: {
    incrementCopies(row) {
      row.copies++;
    },
    decrementCopies(row) {
      if (row.copies > 0) {
        row.copies--;
      }
    },
    deleteRow(row) {
      this.rows = this.rows.filter(r => r !== row);
    },
  },
};
</script>

<style scoped>
/* Additional styling if needed */
button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 5px;
}

button:focus {
  outline: none;
}
</style>



