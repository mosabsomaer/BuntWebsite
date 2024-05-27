<template>
  <div class="content-wrapper">
    <div class="dropzone-icon">
      <img src="@/assets/dropzone_icon.svg" alt="Dropzone Icon" />
    </div>
    <DropZone
      ref="dropzoneRef"
      :dropzoneClassName="customDropzoneClass"
      :dropzoneMessageClassName="customDropzoneMessageClass"
      :dropzoneItemClassName="customDropzoneItemClass"
      :dropzoneDetailsClassName="customDropzoneDetailsClass"
      :maxFiles="Number(10)"
      url="http://localhost:5173/"
      :uploadOnDrop="false"
      :multipleUpload="true"
      :parallelUpload="3"
      :retryOnError="true"
      :acceptedFiles="[
        'pdf',
        'eps',
        'jpg',
        'tiff',
        'png',
        'JPEG',
        'svg',
        'pages',
        'doc',
        'docx',
        'ppt',
        'pptx',
        'xls',
        'xlsx',
        'txt',
      ]"
    />
  </div>
  <p class="middle-align">Paste <a href="#" @click.prevent="openImageURLInput">URL</a> image link</p>
  <button @click="triggerUpload">Upload Files</button>

  <div v-if="showModal" class="modal">
    <span class="close-button" @click="closeModal">&times;</span>
    <div class="modal-content">
      <input type="text" v-model="imageUrl" placeholder="Enter image URL" />
      <button @click="handleImageUrl">Submit</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { DropZone } from "dropzone-vue";

export default defineComponent({
  components: {
    DropZone,
  },
  name: "HomePageContent",
  setup() {
    const dropzoneRef = ref(null);
    const customDropzoneClass = "my-custom-dropzone";
    const customDropzoneMessageClass = "my-custom-dropzone-message";
    const customDropzoneItemClass = "my-custom-dropzone-item";
    const customDropzoneDetailsClass = "my-custom-dropzone-details";
    const showModal = ref(false);
    const imageUrl = ref("");

    function triggerUpload() {
      if (dropzoneRef.value) {
        dropzoneRef.value.processQueue();
      }
    }

    function openImageURLInput() {
      showModal.value = true;
    }

    function closeModal() {
      showModal.value = false;
      imageUrl.value = "";
    }

    function handleImageUrl() {
      // Do something with the image URL, e.g., display the image
      console.log("Image URL:", imageUrl.value);
      closeModal();
    }

    return {
      customDropzoneClass,
      customDropzoneMessageClass,
      customDropzoneItemClass,
      customDropzoneDetailsClass,
      dropzoneRef,
      triggerUpload,
      openImageURLInput,
      showModal,
      imageUrl,
      closeModal,
      handleImageUrl,
    };
  },
});
</script>

<style>
/* Custom styles for the DropZone */
/* Main DropZone styles */
.my-custom-dropzone {
  flex-grow: 1; /* Make the dropzone take up all the available space */
  background-color: #f0f6ff;
  border-radius: 12px;
  text-align: center;
  height: 300px;
}

/* DropZone message styles */
.my-custom-dropzone-message {
  font-size: 25px;
  color: #363861;
  margin-top: 60px;
  
}
.my-custom-dropzone-item{
  color:#4d5dff;
 margin:4px;
 align-items: center;
 justify-content: center;
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-custom-dropzone-details{
color:#4d5dff;
}
.content-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto; 
  overflow: hidden; 
  width: clamp(
    400px,
    80%,
    600px
  ); /* Minimum width of 200px, maximum width of 300px, or 80% of the available width */
  height: 300px; /* Fixed height of 150px */
  border-radius: 10px;
}

.content-wrapper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px dashed #4d5dff;
  border-radius: inherit;
  pointer-events: none;
}

.dropzone-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  pointer-events: none;
}

.dropzone-icon img {
  width: 100%;
  height: 100%;
  
}



.middle-align {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
}

.close-button {
  align-self: flex-end;
  margin: 10px;
  font-size: 28px;
  cursor: pointer;
}
</style>
