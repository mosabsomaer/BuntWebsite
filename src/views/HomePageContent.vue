<template>
        <p>job ID: {{ jobID }}</p>
<p>URL: {{ urld }}</p>
<p>Parameters computed: {{ paramName }}</p>
<br>
<br>
<p>Parameters: {{ pramnamed }}</p>
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
          :url= this.urld
      :paramName= pramnamed
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
<button @click="senddropzone">run dropzone</button>
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
  data() {
    return {
      jobID: "",
      urld: "https://eu-central.storage.cloudconvert.com/tasks",
      pramnamed: "",
                            
    }
  },
  
  components: {
    DropZone,
  },
  name: "HomePageContent",
  computed: {
    paramName() {
      return Object.entries(this.pramnamed)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    }
  },
  //without param
  // Content-Disposition: form-data; name="file"; filename="photo_4_2024-05-20_00-43-09.jpg"
//with param (with param it thinks that name contains all the rest of the data like acl:private,key and all while without param its colors are correctly placed)
  //Content-Disposition: form-data; name="acl: private, key: 6e24c408-172e-41fd-a818-ff6dbdc6c2f9/${filename}, success_action_status: 201, X-Amz-Credential: cloudconvert-production/20240624/fra/s3/aws4_request, X-Amz-Algorithm: AWS4-HMAC-SHA256, X-Amz-Date: 20240624T104853Z, Policy: eyJleHBpcmF0aW9uIjoiMjAyNC0wNi0yNFQyMjo0ODo1M1oiLCJjb25kaXRpb25zIjpbeyJhY2wiOiJwcml2YXRlIn0seyJidWNrZXQiOiJ0YXNrcyJ9LFsic3RhcnRzLXdpdGgiLCIka2V5IiwiNmUyNGM0MDgtMTcyZS00MWZkLWE4MTgtZmY2ZGJkYzZjMmY5XC8iXSx7InN1Y2Nlc3NfYWN0aW9uX3N0YXR1cyI6IjIwMSJ9LHsiWC1BbXotRGF0ZSI6IjIwMjQwNjI0VDEwNDg1M1oifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJjbG91ZGNvbnZlcnQtcHJvZHVjdGlvblwvMjAyNDA2MjRcL2ZyYVwvczNcL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9XX0=, X-Amz-Signature: 6ca8c29b530bfe98df0b716a280d470526931772b7c0dfd9990511bc36f3b4d1"; filename="photo_4_2024-05-20_00-43-09.jpg"

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














                  // { "acl": "private", "key": "a29c5ac7-c188-4636-bdd9-a4ba4bdd5bab/${filename}", 
                  //"success_action_status": "201", "X-Amz-Credential": "cloudconvert-production/20240622/fra/s3/aws4_request",
                  // "X-Amz-Algorithm": "AWS4-HMAC-SHA256", "X-Amz-Date": "20240622T121401Z",
                  // "Policy": "eyJleHBpcmF0aW9uIjoiMjAyNC0wNi0yM1QwMDoxNDowMVoiLCJjb25kaXRpb25zIjpbeyJhY2wiOiJwcml2YXRlIn0seyJidWNrZXQiOiJ0YXNrcyJ9LFsic3RhcnRzLXdpdGgiLCIka2V5IiwiYTI5YzVhYzctYzE4OC00NjM2LWJkZDktYTRiYTRiZGQ1YmFiXC8iXSx7InN1Y2Nlc3NfYWN0aW9uX3N0YXR1cyI6IjIwMSJ9LHsiWC1BbXotRGF0ZSI6IjIwMjQwNjIyVDEyMTQwMVoifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJjbG91ZGNvbnZlcnQtcHJvZHVjdGlvblwvMjAyNDA2MjJcL2ZyYVwvczNcL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9XX0=", "X-Amz-Signature": "b2441f46884cec7d8e5bac231b98277d74c261be765603c7fb3a7e3a837e07ca" }




        async  function senddropzone(){
          dropzoneRef.value.processQueue();
          }

    








async function UploadDocument(){
      
      
      await this.handleImage()


      const tasks = await waitForJobCompletion(this.jobID);
      console.log("Completed Tasks:", tasks);
      const metadataTask = tasks.find((task) => task.name === "task-2");
      if (!metadataTask) {
        throw new Error("Metadata task not found");
      }
      const fileMetadata = metadataTask.result.metadata;
      const fileName = fileMetadata.FileName;
      const pageCount = fileMetadata.PageCount;
      const fileSize = fileMetadata.FileSize;
      this.filesStore.addFile({
        id: this.jobID,
        name: fileName,
        pageCount: pageCount,
        size: fileSize,
      });
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
        // Access reactive data properties using this
        this.jobID = jobResponse.data.data.id;






       const importTask = jobResponse.data.data.tasks.find((task) => task.name === "import-1");
    if (importTask) {
      this.urld = importTask.result.form.url;
      this.pramnamed = importTask.result.form.parameters;
    } else {
      throw new Error("Import task not found");
    }


     
    this.message = `Uploaded document successfully with ID: ${jobId}`;
  } catch (error) {
        this.message = `Error uploading document: ${error.response ? error.response.data.message : error.message
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
message,
senddropzone,


    };
  },
});
</script>

