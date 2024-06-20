// stores/files.js
import { defineStore } from 'pinia';

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [],
    totalprice: 0,
  }),
  actions: {
    addFile(file) {
      if (this.files.length < 10) {
        const price = file.pageCount*1;
        this.files.push({ ...file, colorMode: true, copies: 1, price });
        this.calculateTotalPrice();
       
      } else {
        console.error('Maximum file limit reached (10 files).');
      }
    },

    removeFile(id) {
      this.files = this.files.filter(file => file.id !== id);
      this.calculateTotalPrice();
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
        this.calculateTotalPrice();
        
      }
    },
    decrementCopies(id) {
      const file = this.files.find(file => file.id === id);
      if (file && file.copies > 0) {
        file.copies--;
        this.calculateTotalPrice();
      }
    },

    toggleColorMode(id) {
      const file = this.files.find(file => file.id === id);
      if (file) {
        file.colorMode = !file.colorMode;
        if(file.colorMode == true){
          file.price=file.pageCount*1;
        }else{
          file.price=file.pageCount*0.5;
        }
        this.calculateTotalPrice();
      }
    },
    calculateTotalPrice() {
      this.totalPrice = parseFloat(this.files
        .reduce((sum, file) => sum + parseFloat(file.price) * file.copies, 0)
        .toFixed(2));
    },

  },
  hydrate(state) {
    state.totalPrice = parseFloat(this.files
      .reduce((sum, file) => sum + parseFloat(file.price)* file.copies, 0)
      .toFixed(2));
  },
});











