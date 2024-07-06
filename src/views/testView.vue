<template>
  <div>
    <p class="middle-align">
      Paste <a href="" @click.prevent="openImageURLInput">URL</a> image link
    </p>
  
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeModal">&times;</span>
        <input type="text" v-model="imageUrl" placeholder="Enter image URL" />
        <button @click="handleImageUrl">Submit</button>
      </div>
    </div>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
<p>ss {{  files.length }}</p>
</template>

<script>
import axios from "axios";
import { defineComponent, ref, computed } from "vue";
import { useFilesStore } from "@/stores/files";

export default defineComponent({
  data() {
    return {

    };
  },
  setup() {
    const showModal = ref(false);
    const showError = ref(false);
    const imageUrl = ref("");
    const message = ref("");
    const filesStore = useFilesStore();
    const files = computed(() => filesStore.files);
    function openImageURLInput() {
      if(this.files.length<10){
      showModal.value = true;}
      else{
        message.value="Maximum file limit reached (10 files)."
        console.log("Maximum file limit reached (10 files).");
      }
    }

    function closeModal() {
      showModal.value = false;
      imageUrl.value = "";
    }

    async function waitForJobCompletion(jobId) {
      while (true) {
        const jobResponse = await axios.get(
          `https://api.cloudconvert.com/v2/jobs/${jobId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTQ5YWJlMjEyOTFmYmQ1NTRjNzIzNWM5YTQ3ZDRkMGQyNDdjZjdhNTdjNDM0Y2Y1OGUyNmVlZDc2ZTk4MjVhNWFiMWFmZTVhZmU4YmE4YWIiLCJpYXQiOjE3MjAyMDIwOTIuOTE2NzI3LCJuYmYiOjE3MjAyMDIwOTIuOTE2NzI5LCJleHAiOjQ4NzU4NzU2OTIuOTEzNjA1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.cGVM4cETdbGkhO0qjxj6nvLvx_odXtixgyixb6oPQavhEweTqD9yS6hyHoDeDcCzyvqOYURCu024Ke-L22nz_fS1RkjSynOCatYekoGRsGIYTWmiDeXh8jlPI0SVCveRAgDuXNkZmnNERHUbUD82_kTrfp13nrPpOb8z_uuaP-uk-dY5Hv7afgz8rKPa0q0NbFF716-KVmk8DNhprSspP-x3rDrj9VGvJSjKRzfJTk1u5V21OPbAqU3G9YGKifZvLDJMQ-gJEA8U36ab93aE5LLn8z9sfKfFIcSbxWtwczpUgYa-MC_7SKtCBOp3TxkA2dvum-TRX1Sj4fhmlw7oc55TR_-goSUZ2k6uUXrVIa2IXGGxjnFmZwHW5DjXTNykEgG0qh3U3mn6IGhTW5YnEegTVQ4D4zBAltsWkpg0VGEXPiKx2n7YUVt9JiDhQhddtSOb1Q6B7e43lTymtJ7quqz6TRmUvh6hc3T-eW9wSVFHdS8srt3T1G0xr6lUVcBgGzjQNBGxkX82a3_K6MLbmBzq316XRAQYauT3F9yIMa1e4mPOPxqZPI3DVzzKn9YiAcT0yXtqj1cqcy79S2Y_Bzd_KtGPBuOcn1hlGnHtc3AdhyaaNWjIyFFbOwR3psAy63hm_yHZItmYduOU-idFlr4EiEFCKHk_esCL-QM4asw",
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

    async function handleImageUrl() {
      try {
        // Step 1: Create a job
        const jobResponse = await axios.post(
          "https://api.cloudconvert.com/v2/jobs",
          {
            tasks: {
              "import-1": {
                operation: "import/url",
                url: imageUrl.value,
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
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTQ5YWJlMjEyOTFmYmQ1NTRjNzIzNWM5YTQ3ZDRkMGQyNDdjZjdhNTdjNDM0Y2Y1OGUyNmVlZDc2ZTk4MjVhNWFiMWFmZTVhZmU4YmE4YWIiLCJpYXQiOjE3MjAyMDIwOTIuOTE2NzI3LCJuYmYiOjE3MjAyMDIwOTIuOTE2NzI5LCJleHAiOjQ4NzU4NzU2OTIuOTEzNjA1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.cGVM4cETdbGkhO0qjxj6nvLvx_odXtixgyixb6oPQavhEweTqD9yS6hyHoDeDcCzyvqOYURCu024Ke-L22nz_fS1RkjSynOCatYekoGRsGIYTWmiDeXh8jlPI0SVCveRAgDuXNkZmnNERHUbUD82_kTrfp13nrPpOb8z_uuaP-uk-dY5Hv7afgz8rKPa0q0NbFF716-KVmk8DNhprSspP-x3rDrj9VGvJSjKRzfJTk1u5V21OPbAqU3G9YGKifZvLDJMQ-gJEA8U36ab93aE5LLn8z9sfKfFIcSbxWtwczpUgYa-MC_7SKtCBOp3TxkA2dvum-TRX1Sj4fhmlw7oc55TR_-goSUZ2k6uUXrVIa2IXGGxjnFmZwHW5DjXTNykEgG0qh3U3mn6IGhTW5YnEegTVQ4D4zBAltsWkpg0VGEXPiKx2n7YUVt9JiDhQhddtSOb1Q6B7e43lTymtJ7quqz6TRmUvh6hc3T-eW9wSVFHdS8srt3T1G0xr6lUVcBgGzjQNBGxkX82a3_K6MLbmBzq316XRAQYauT3F9yIMa1e4mPOPxqZPI3DVzzKn9YiAcT0yXtqj1cqcy79S2Y_Bzd_KtGPBuOcn1hlGnHtc3AdhyaaNWjIyFFbOwR3psAy63hm_yHZItmYduOU-idFlr4EiEFCKHk_esCL-QM4asw",
            },
          }
        );
        closeModal()
        const jobId = jobResponse.data.data.id;

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
      showModal,
      imageUrl,
      message,
      files,
      openImageURLInput,
      closeModal,
      handleImageUrl,
      waitForJobCompletion,
    };
  },
});
</script>

<style scoped>
.middle-align {
  text-align: center;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.message {
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  background-color: #4d4d4d;
  color: white;
  padding: 10px 0;
}
</style>
