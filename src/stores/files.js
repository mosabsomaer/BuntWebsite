// stores/files.js
import { defineStore } from 'pinia';

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [],
  }),
  actions: {
    addFile(file) {
      if (this.files.length < 10) {
        this.files.push({ ...file, colorMode: 'RGB', copies: 1, price: '0d' });
      } else {
        console.error('Maximum file limit reached (10 files).');
      }
    },
    removeFile(id) {
      this.files = this.files.filter(file => file.id !== id);
    },
    uploadFile(file) {
      const index = this.files.findIndex(f => f.name === file.name && f.size === file.size);
      if (index !== -1) {
        this.files[index].uploaded = true;
      }
    },
    incrementCopies(id) {
      const file = this.files.find(file => file.id === id);
      if (file) {
        file.copies++;
      }
    },
    decrementCopies(id) {
      const file = this.files.find(file => file.id === id);
      if (file && file.copies > 0) {
        file.copies--;
      }
    },
  },
});











