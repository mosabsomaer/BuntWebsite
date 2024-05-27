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
  <p>Paste <a href="#" @click.prevent="openImageURLInput">URL</a> image link</p>
  <button @click="triggerUpload">Upload Files</button>

  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
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
  padding: 21%;
  text-align: center;
  height: 150px;
}

/* DropZone message styles */
.my-custom-dropzone-message {
  font-size: 14px;
  color: #363861;
}

.content-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto; /* Center the content wrapper horizontally */
  width: clamp(
    200px,
    80%,
    300px
  ); /* Minimum width of 200px, maximum width of 300px, or 80% of the available width */
  height: 150px; /* Fixed height of 150px */
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
  width: 40;
  height: 40;
  pointer-events: none;
}

.dropzone-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-bottom: 55px;
}

.hover-div {
  width: 500px;
  position: relative;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;

  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  border-radius: 10px;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
