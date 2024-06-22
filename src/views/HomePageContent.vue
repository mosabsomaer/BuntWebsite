<template>
      <p>url: {{ urld,jobID,pramnamed }}</p>
  <div class="content-wrapper">
    <div class="dropzone-icon">
      <img src="@/assets/dropzone_icon.svg" alt="Dropzone Icon" />
    </div>

    <DropZone
     
      :dropzoneClassName="customDropzoneClass"
      :dropzoneMessageClassName="customDropzoneMessageClass"
      :dropzoneItemClassName="customDropzoneItemClass"
      :dropzoneDetailsClassName="customDropzoneDetailsClass"
      :maxFiles="Number(10)"
      
      ref="dropzoneRef"
      :uploadOnDrop="false"
      :url= urld
      :paramName=pramnamed
      :headers="{'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c'}"


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
<button @click="UploadDocument">upload document</button>

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
import axios from "axios";
import { defineComponent, ref } from "vue";
import { DropZone } from "dropzone-vue";
//local data storage
import { useFilesStore } from '@/stores/files';
//api logic
// import {taskss} from "@/API/cloudconvert";
//css code
import '@/assets/styles/homepage.css';

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
    function toggleFaqAnswer(index) {
      if (activeFaqIndex.value === index) {
        activeFaqIndex.value = -1;
      } else {
        activeFaqIndex.value = index;
      }
    }














    





const jobID =";"
const urld="http://localhost:5173/home";
const pramnamed="test";


    async function UploadDocument(){
      await handleImage()
      dropzoneRef.value.processQueue();
    }



    const message = ref("");
    async function waitForJobCompletion(jobId) {
      while (true) {
        const jobResponse = await axios.get(
          `https://api.cloudconvert.com/v2/jobs/${jobId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c",
            },
          }
        );

        console.log("Job Response:", jobResponse.data);

        const jobStatus = jobResponse.data.data.status;
        const tasks = jobResponse.data.data.tasks;



        if (jobStatus === "finished") {
          return tasks;
        } else if (jobStatus === "error") {
          throw new Error("Job failed");
        }

        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
      }
    }



    async function handleImage() {
      
      try {
        // Step 1: Create a job
        const jobResponse = await axios.post(
          "https://api.cloudconvert.com/v2/jobs",
          {
            tasks: {
              "import-1": {
                operation: "import/upload",
              },
              "task-1": {
                operation: "convert",
                input: ["import-1"],
                output_format: "pdf",
              }, 
              "task-2": {
                operation: "metadata",
                input: ["task-1"],
              },
              "export-1": {
                operation: "export/url",
                input: ["task-1"],
                inline: false,
                archive_multiple_files: false,
              },
            },
            tag: "jobbuilder",
          },
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c",
            },
          }
        );
       jobID = jobResponse.data.data.id;






        
        urld= jobResponse.data.data.find((task) => task.name === "import-1").result.form.url;
        pramnamed=jobResponse.data.data.find((task) => task.name === "import-1").result.form.parameters;

       


        // Step 2: Wait for the job to complete
        const tasks = await waitForJobCompletion(jobId);

        console.log("Completed Tasks:", tasks);

        const metadataTask = tasks.find((task) => task.name === "task-2");
        if (!metadataTask) {
          throw new Error("Metadata task not found");
        }
        const fileMetadata = metadataTask.result.metadata;
        const fileName = fileMetadata.FileName;
        const pageCount = fileMetadata.PageCount;
        const fileSize = fileMetadata.FileSize;
        filesStore.addFile({
          id: jobId,
          name: fileName,
          pageCount: pageCount,
          size: fileSize,
        },
        );

        message.value = `Uploaded document successfully with ID: ${jobId}`;

      } catch (error) {
        message.value = `Error uploading document: ${error.response ? error.response.data.message : error.message
          }`;
      }
    }





    return {
      customDropzoneClass,
      customDropzoneMessageClass,
      customDropzoneItemClass,
      customDropzoneDetailsClass,
     
      openImageURLInput,
      showModal,
      imageUrl,
      closeModal,
    
      
      faqs,
      activeFaqIndex,
      toggleFaqAnswer,

      dropzoneRef,
      onFileAdd,
      onFileRemove,
      onFilesUploaded,

//API
waitForJobCompletion,
handleImage,
UploadDocument,

jobID,
urld,
pramnamed,

    };
  },
});
</script>

