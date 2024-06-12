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
      :uploadOnDrop="true"
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
      @addedFile="onFileAdd"
      @removedFile="onFileRemove"
      @uploaded="onFilesUploaded"
    />
  </div>
  <p class="middle-align">Paste <a href="" @click.prevent="openImageURLInput">URL</a> image link</p>
  
  <div v-if="showModal" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close-button" @click="closeModal">&times;</span>
      <input type="text" v-model="imageUrl" placeholder="Enter image URL" />
      <button @click="handleImageUrl">Submit</button>
    </div>
  </div>

 
<div class= boxingg>
  <h2 class="faq-title">Leave the printing<br>
to us!</h2>
<p class="paragraphh" >Simply upload your documents and insert coins and your documents will be printed immediately </p>
<div class="containerr">
    <div class="image-container">
      <img src="@/assets/recycle pic.svg" class="imagee" />
    </div>
  </div>
  <h2 class="faq-title">What is Bunt?<br>
to us!</h2>
<p class="paragraphh" >Is commercial vending machine that prints paper on demand, we have built it to<br> be as easy as taking a picture by having vending machine accept as many types of files as possible.</p>
  <div class="faq-container">
    <h2 class="faq-title">Frequently Asked Questions</h2>
  <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
    <div class="faq-question" @click="toggleFaqAnswer(index)">
      <span>{{ faq.question }}</span>
      <span class="faq-arrow" :class="{ 'flipped': activeFaqIndex === index }">
        <img src="@/assets/cheveron-down.svg" alt="Chevron Down" />
      </span>
    </div>
    <div v-if="activeFaqIndex === index" class="faq-answer">
      <p>{{ faq.answer }}</p>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { DropZone } from "dropzone-vue";
import { useFilesStore } from '@/stores/files';
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
    const activeFaqIndex = ref(-1);
    const filesStore = useFilesStore();
    const faqs = [
      {
        question: "What is the price to print 1 paper?",
        answer: "The price to print 1 paper is $0.10.",
      },
      {
        question: "What file types does the machine accept?",
        answer: "The machine accepts    pdf, eps, jpg, tiff, png, JPEG, svg, pages, doc, docx, ppt, pptx, xls, xlsx, txt file types.",
      },
      {
        question: "How long does it take before order code expires?",
        answer: "The order code expires in 3 days.",
      },
      {
        question: "How many files can I upload?",
        answer: "You can upload up to 10 files at a time.",
      },
    ];
    const onFileAdd = ({ id, file }) => {
      filesStore.addFile({ id, name: file.name, size: file.size });
    };

    const onFileRemove = ({ id }) => {
      filesStore.removeFile(id);
    };

    const onFilesUploaded = (items) => {
      items.forEach(({ file }) => {
        filesStore.uploadFile({ name: file.name, size: file.size });
      });
    };



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

    function toggleFaqAnswer(index) {
      if (activeFaqIndex.value === index) {
        activeFaqIndex.value = -1;
      } else {
        activeFaqIndex.value = index;
      }
    }
    return {
      customDropzoneClass,
      customDropzoneMessageClass,
      customDropzoneItemClass,
      customDropzoneDetailsClass,
      dropzoneRef,
      
     

      openImageURLInput,
      showModal,
      imageUrl,
      closeModal,
      handleImageUrl,

      faqs,
      activeFaqIndex,
      toggleFaqAnswer,

      onFileAdd,
      onFileRemove,
      onFilesUploaded,
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
  height: 100%;
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
  width: clamp(200px, 80%, 600px); /* Minimum width of 200px, maximum width of 600px, or 80% of the available width */
  aspect-ratio: 4 / 3; /* Set the aspect ratio to 4:3 */
  border-radius: 10px;
}


@media (min-width: 1200px) {
  .content-wrapper {
    aspect-ratio: 3 / 2; /* Adjust the aspect ratio for larger screens (e.g., desktops) */
  }
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
  margin-top:40px;
}

.dropzone-icon img {
  width: 100%;
  height: 100%;
  
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent black background */
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fefefe;
  padding: 20px 30px; /* Increased padding for better spacing */
  border: 1px solid #888;
  border-radius: 10px;
  width: 80%; /* Constrain the width */
  max-width: 400px; /* Maximum width */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Add shadow for better aesthetics */
}

.modal-content > * {
  margin: 10px 0; /* Add margin between the items */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #888; /* Add color for better visibility */
}

.modal-content button {
  background-color: #4D5DFF; /* Button color */
  border: none; /* Remove border */
  color: white; /* Button text color */
  padding: 10px 20px; /* Add padding inside the button */
  cursor: pointer; /* Pointer cursor on hover */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Increased font size */
  margin-top: 10px; /* Margin at the top for spacing */
}

/* Style for the input box */
.modal-content input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* Full width */
  box-sizing: border-box; /* Ensure padding and border are included in the element's total width */
  font-size: 16px;
  margin-top: 10px; /* Margin at the top for spacing */
}

.middle-align {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px; /* Add margin at the top for spacing */
}



.boxingg{
  margin:2rem;
}
.paragraphh{
  font-size:16px;
}
.containerr {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
}

.image-container {
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: 100%;
}

.imagee {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.faq-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 0;
 
}

.faq-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.faq-item {
  width: 50%;
  border-radius: 5px;
  margin-bottom: 1rem;
  overflow: hidden;
}
@media (max-width: 767px) {
  .faq-item {
    width: 75%;
  }
  .content-wrapper {
    aspect-ratio: 16 / 9; /* Adjust the aspect ratio for smaller screens (e.g., phones) */
  }
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
}

.faq-question:hover {
  background-color: #e9e9e9;
  transition: background-color 0.3s ease;
}

.faq-arrow {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.faq-arrow img {
  width: 100%;
  height: 100%;
}

.faq-answer {
  padding: 1rem;
  border-top: 1px solid #ccc;
}

.faq-answer p {
  margin: 0;
}

.faq-arrow.flipped {
  transform: rotate(180deg);
}
</style>
