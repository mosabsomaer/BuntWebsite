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
  <!-- <p>task for metadata : {{ taskk }}</p> -->
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
import { useFilesStore } from "@/stores/files";

export default defineComponent({
  data() {
    return {
      // taskk: tasks.find((task) => task.name === "task-1").result.files[0].id,
    };
  },
  setup() {
    const showModal = ref(false);
    const imageUrl = ref("");
    const message = ref("");
    const filesStore = useFilesStore();

    function openImageURLInput() {
      showModal.value = true;
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
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c",
            },
          }
        );

        const jobId = jobResponse.data.data.id;

        // Step 2: Wait for the job to complete
        const tasks = await waitForJobCompletion(jobId);

        console.log("Completed Tasks:", tasks);

        const metadataTask = tasks.find((task) => task.name === "task-2");
        if (!metadataTask) {
          throw new Error("Metadata task not found");
        }

        // Fetch metadata
        const metadataResponse = await axios.post(
          "https://api.cloudconvert.com/v2/metadata",
          {
            input: tasks.find((task) => task.name === "task-1").id,
            input_format: "pdf",
          },
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c",
            },
          }
        );

        const fileMetadata = metadataResponse.data.data.metadata;
        const fileName = fileMetadata.filename;
        const pageCount = fileMetadata.pagecount;
        const fileSize = fileMetadata.filesize;

        filesStore.addFile({
          id: jobId,
          name: fileName,
          pageCount,
          size: fileSize,
        });
        message.value = `Job created successfully with ID: ${jobId}`;
        closeModal();
      } catch (error) {
        message.value = `Error creating job: ${
          error.response ? error.response.data.message : error.message
        }`;
      }
    }

    return {
      showModal,
      imageUrl,
      message,

      openImageURLInput,
      closeModal,
      handleImageUrl,
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
  background-color: #4caf50;
  color: white;
  padding: 10px 0;
}
</style>
