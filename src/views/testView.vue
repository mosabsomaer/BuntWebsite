<template>
  <div>
    <button @click="openImageURLInput">Upload and Convert</button>
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
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { useFilesStore } from '@/stores/files';

export default defineComponent({
  setup() {
    const showModal = ref(false);
    const imageUrl = ref('');
    const message = ref('');
    const filesStore = useFilesStore();

    function openImageURLInput() {
      showModal.value = true;
    }

    function closeModal() {
      showModal.value = false;
      imageUrl.value = '';
    }

    async function waitForJobCompletion(jobId) {
      while (true) {
        const jobResponse = await axios.get(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTk4NWRmNTk0YzgxYzk1OWRjZjEzMTk5Y2UwZWJkOTVkZjk0YjRlODE2NDViNDE2OTViYjM2ODk2YzkyZTg3Yzk1NzQ0ZjE3YjRlNjlmYzEiLCJpYXQiOjE3MTc5MjM5MjkuODc2Njc3LCJuYmYiOjE3MTc5MjM5MjkuODc2Njc4LCJleHAiOjQ4NzM1OTc1MjkuODcyMjg1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.mt9HTAb6k5wuIDnaKqyegfMgBR6TLTA68bu2oBj0vrw5LAV_OasBhadcTNVqvkvAHEksAvnoS4cLDkqBxX7iRG-hXdh5viy7a8bHQjcgxTQaagHq2i3W7VTqGvwSWG0qQgL6HPwLqy0SHa_TZ_H9z4Eq0nWCJ4lB9jnOFsEM5mreAx0l84uuHS3cNAeLgRUKYQ7_7maRw4_ZwFskfb0n3OyTnJvXLF4hAQe3kUrtOFA66OkPNBag20NvO7e00jrYTJhOTjlBRLwAtfycUA567dCa-JkbS5ZRK73Oztb5Ivox_xUzDtlfYJKrrd9gRbzXlu6sgehDSMf_HyAPPq2oL21vOsVr1REkWFifWcU9t22x_rw7UL5IrKoR9KWaJMn4pQFPeSVHtzEQj2tC_WEg9UjGjSpx80GN3NBHiKjVuFy7q-YBFV6SmhYYN5joMLn5fM2sxE-ZN8s8aI16fwyusEuoU9argvSKIHPEGGuTKgyoaj1TC63vOtbQuquoergY2Ri2JC0GPCuK7fr2-JIyycGo0Cq6XbG4xpdjTUSxQr25pNKD8nwm2rSOcssxXxGKSYhVH5zXH_ZdQkLwqrfJYKr0QVHZLXSfeWYINgwd0YoWcEysqCG9Aaq0Y3Isw479Drvgwwyyg9DYWHTC4RyICLxer0AvS_CXFCl5Smqro_w',
          },
        });

        const jobStatus = jobResponse.data.data.status;

        if (jobStatus === 'finished') {
          return jobResponse.data.data;
        } else if (jobStatus === 'error') {
          throw new Error('Job failed');
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
      }
    }

    async function handleImageUrl() {
      try {
        // Step 1: Create a job
        const jobResponse = await axios.post(
          'https://api.cloudconvert.com/v2/jobs',
          {
            tasks: {
              'import-1': {
                operation: 'import/url',
                url: imageUrl.value,
              },
              'task-1': {
                operation: 'convert',
                input: ['import-1'],
                output_format: 'pdf',
              },
              'export-1': {
                operation: 'export/url',
                input: ['task-1'],
                inline: false,
                archive_multiple_files: false,
              },
            },
            tag: 'jobbuilder',
          },
          {
            headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTk4NWRmNTk0YzgxYzk1OWRjZjEzMTk5Y2UwZWJkOTVkZjk0YjRlODE2NDViNDE2OTViYjM2ODk2YzkyZTg3Yzk1NzQ0ZjE3YjRlNjlmYzEiLCJpYXQiOjE3MTc5MjM5MjkuODc2Njc3LCJuYmYiOjE3MTc5MjM5MjkuODc2Njc4LCJleHAiOjQ4NzM1OTc1MjkuODcyMjg1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.mt9HTAb6k5wuIDnaKqyegfMgBR6TLTA68bu2oBj0vrw5LAV_OasBhadcTNVqvkvAHEksAvnoS4cLDkqBxX7iRG-hXdh5viy7a8bHQjcgxTQaagHq2i3W7VTqGvwSWG0qQgL6HPwLqy0SHa_TZ_H9z4Eq0nWCJ4lB9jnOFsEM5mreAx0l84uuHS3cNAeLgRUKYQ7_7maRw4_ZwFskfb0n3OyTnJvXLF4hAQe3kUrtOFA66OkPNBag20NvO7e00jrYTJhOTjlBRLwAtfycUA567dCa-JkbS5ZRK73Oztb5Ivox_xUzDtlfYJKrrd9gRbzXlu6sgehDSMf_HyAPPq2oL21vOsVr1REkWFifWcU9t22x_rw7UL5IrKoR9KWaJMn4pQFPeSVHtzEQj2tC_WEg9UjGjSpx80GN3NBHiKjVuFy7q-YBFV6SmhYYN5joMLn5fM2sxE-ZN8s8aI16fwyusEuoU9argvSKIHPEGGuTKgyoaj1TC63vOtbQuquoergY2Ri2JC0GPCuK7fr2-JIyycGo0Cq6XbG4xpdjTUSxQr25pNKD8nwm2rSOcssxXxGKSYhVH5zXH_ZdQkLwqrfJYKr0QVHZLXSfeWYINgwd0YoWcEysqCG9Aaq0Y3Isw479Drvgwwyyg9DYWHTC4RyICLxer0AvS_CXFCl5Smqro_w',
            },
          }
        );

        const jobId = jobResponse.data.data.id;

        // Step 2: Wait for the job to complete
        const completedJob = await waitForJobCompletion(jobId);

        // Step 3: Fetch metadata
        const metadataResponse = await axios.post(
          'https://api.cloudconvert.com/v2/metadata',
          {
            input: completedJob.tasks['import-1'].id,
            input_format: 'pdf',
          },
          {
            headers: {
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTk4NWRmNTk0YzgxYzk1OWRjZjEzMTk5Y2UwZWJkOTVkZjk0YjRlODE2NDViNDE2OTViYjM2ODk2YzkyZTg3Yzk1NzQ0ZjE3YjRlNjlmYzEiLCJpYXQiOjE3MTc5MjM5MjkuODc2Njc3LCJuYmYiOjE3MTc5MjM5MjkuODc2Njc4LCJleHAiOjQ4NzM1OTc1MjkuODcyMjg1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.mt9HTAb6k5wuIDnaKqyegfMgBR6TLTA68bu2oBj0vrw5LAV_OasBhadcTNVqvkvAHEksAvnoS4cLDkqBxX7iRG-hXdh5viy7a8bHQjcgxTQaagHq2i3W7VTqGvwSWG0qQgL6HPwLqy0SHa_TZ_H9z4Eq0nWCJ4lB9jnOFsEM5mreAx0l84uuHS3cNAeLgRUKYQ7_7maRw4_ZwFskfb0n3OyTnJvXLF4hAQe3kUrtOFA66OkPNBag20NvO7e00jrYTJhOTjlBRLwAtfycUA567dCa-JkbS5ZRK73Oztb5Ivox_xUzDtlfYJKrrd9gRbzXlu6sgehDSMf_HyAPPq2oL21vOsVr1REkWFifWcU9t22x_rw7UL5IrKoR9KWaJMn4pQFPeSVHtzEQj2tC_WEg9UjGjSpx80GN3NBHiKjVuFy7q-YBFV6SmhYYN5joMLn5fM2sxE-ZN8s8aI16fwyusEuoU9argvSKIHPEGGuTKgyoaj1TC63vOtbQuquoergY2Ri2JC0GPCuK7fr2-JIyycGo0Cq6XbG4xpdjTUSxQr25pNKD8nwm2rSOcssxXxGKSYhVH5zXH_ZdQkLwqrfJYKr0QVHZLXSfeWYINgwd0YoWcEysqCG9Aaq0Y3Isw479Drvgwwyyg9DYWHTC4RyICLxer0AvS_CXFCl5Smqro_w',
            },
          }
        );

        const fileMetadata = metadataResponse.data.data.metadata;
        const fileName = fileMetadata.filename;
        const pageCount = fileMetadata.pages;

        filesStore.addFile({ id: jobId, name: fileName, pageCount });
        message.value = `Job created successfully with ID: ${jobId}`;
        closeModal();
      } catch (error) {
        message.value = `Error creating job: ${error.response ? error.response.data.message : error.message}`;
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
