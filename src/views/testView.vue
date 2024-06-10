<template>
  <div>
    <DropZone
      ref="myDropzone"
      :options="dropzoneOptions"
      @vdropzone-success="onFileUploadSuccess"
      @vdropzone-error="onFileUploadError"
      @sending="onSending"
    ></DropZone>
    <button @click="createAndUploadJob">Upload and Convert</button>
    <div v-if="response">
      <h3>Response:</h3>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from "vue";
import { DropZone } from "dropzone-vue";

export default defineComponent({
  components: {
    DropZone,
  },
  data() {
    return {
      selectedFile: null,
      response: null,
      dropzoneOptions: {
        url: '/', // This will be updated dynamically
        method: 'POST',
        headers: {},
        paramName: 'file',
        autoProcessQueue: false,
      },
    };
  },
  methods: {
    async createCloudConvertJob() {
      const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTk4NWRmNTk0YzgxYzk1OWRjZjEzMTk5Y2UwZWJkOTVkZjk0YjRlODE2NDViNDE2OTViYjM2ODk2YzkyZTg3Yzk1NzQ0ZjE3YjRlNjlmYzEiLCJpYXQiOjE3MTc5MjM5MjkuODc2Njc3LCJuYmYiOjE3MTc5MjM5MjkuODc2Njc4LCJleHAiOjQ4NzM1OTc1MjkuODcyMjg1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.mt9HTAb6k5wuIDnaKqyegfMgBR6TLTA68bu2oBj0vrw5LAV_OasBhadcTNVqvkvAHEksAvnoS4cLDkqBxX7iRG-hXdh5viy7a8bHQjcgxTQaagHq2i3W7VTqGvwSWG0qQgL6HPwLqy0SHa_TZ_H9z4Eq0nWCJ4lB9jnOFsEM5mreAx0l84uuHS3cNAeLgRUKYQ7_7maRw4_ZwFskfb0n3OyTnJvXLF4hAQe3kUrtOFA66OkPNBag20NvO7e00jrYTJhOTjlBRLwAtfycUA567dCa-JkbS5ZRK73Oztb5Ivox_xUzDtlfYJKrrd9gRbzXlu6sgehDSMf_HyAPPq2oL21vOsVr1REkWFifWcU9t22x_rw7UL5IrKoR9KWaJMn4pQFPeSVHtzEQj2tC_WEg9UjGjSpx80GN3NBHiKjVuFy7q-YBFV6SmhYYN5joMLn5fM2sxE-ZN8s8aI16fwyusEuoU9argvSKIHPEGGuTKgyoaj1TC63vOtbQuquoergY2Ri2JC0GPCuK7fr2-JIyycGo0Cq6XbG4xpdjTUSxQr25pNKD8nwm2rSOcssxXxGKSYhVH5zXH_ZdQkLwqrfJYKr0QVHZLXSfeWYINgwd0YoWcEysqCG9Aaq0Y3Isw479Drvgwwyyg9DYWHTC4RyICLxer0AvS_CXFCl5Smqro_w';
      const jobRequestBody = {
        tasks: {
          'import-1': { operation: 'import/upload' },
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
      };

      try {
        const res = await axios.post('https://api.cloudconvert.com/v2/jobs', jobRequestBody, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        return res.data.data;
      } catch (error) {
        console.error('Error creating CloudConvert job:', error);
        throw error;
      }
    },
    async createAndUploadJob() {
      try {
        const jobData = await this.createCloudConvertJob();
        const importTask = jobData.tasks.find(task => task.operation === 'import/upload');
        this.dropzoneOptions.url = importTask.result.form.url;
        this.dropzoneOptions.headers = {
          ...importTask.result.form.parameters,
        };
        this.$refs.myDropzone.processQueue();
      } catch (error) {
        console.error('Error creating or uploading job:', error);
      }
    },
    onSending(file, xhr, formData) {
      const importTask = this.jobData.tasks.find(task => task.operation === 'import/upload');
      for (const key in importTask.result.form.parameters) {
        formData.append(key, importTask.result.form.parameters[key]);
      }
    },
    onFileUploadSuccess(file, response) {
      console.log('File uploaded successfully:', response);
      this.checkJobStatus(this.jobData.id);
    },
    onFileUploadError(file, error) {
      console.error('Error uploading file:', error);
    },
    async checkJobStatus(jobId) {
      const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTk4NWRmNTk0YzgxYzk1OWRjZjEzMTk5Y2UwZWJkOTVkZjk0YjRlODE2NDViNDE2OTViYjM2ODk2YzkyZTg3Yzk1NzQ0ZjE3YjRlNjlmYzEiLCJpYXQiOjE3MTc5MjM5MjkuODc2Njc3LCJuYmYiOjE3MTc5MjM5MjkuODc2Njc4LCJleHAiOjQ4NzM1OTc1MjkuODcyMjg1LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.mt9HTAb6k5wuIDnaKqyegfMgBR6TLTA68bu2oBj0vrw5LAV_OasBhadcTNVqvkvAHEksAvnoS4cLDkqBxX7iRG-hXdh5viy7a8bHQjcgxTQaagHq2i3W7VTqGvwSWG0qQgL6HPwLqy0SHa_TZ_H9z4Eq0nWCJ4lB9jnOFsEM5mreAx0l84uuHS3cNAeLgRUKYQ7_7maRw4_ZwFskfb0n3OyTnJvXLF4hAQe3kUrtOFA66OkPNBag20NvO7e00jrYTJhOTjlBRLwAtfycUA567dCa-JkbS5ZRK73Oztb5Ivox_xUzDtlfYJKrrd9gRbzXlu6sgehDSMf_HyAPPq2oL21vOsVr1REkWFifWcU9t22x_rw7UL5IrKoR9KWaJMn4pQFPeSVHtzEQj2tC_WEg9UjGjSpx80GN3NBHiKjVuFy7q-YBFV6SmhYYN5joMLn5fM2sxE-ZN8s8aI16fwyusEuoU9argvSKIHPEGGuTKgyoaj1TC63vOtbQuquoergY2Ri2JC0GPCuK7fr2-JIyycGo0Cq6XbG4xpdjTUSxQr25pNKD8nwm2rSOcssxXxGKSYhVH5zXH_ZdQkLwqrfJYKr0QVHZLXSfeWYINgwd0YoWcEysqCG9Aaq0Y3Isw479Drvgwwyyg9DYWHTC4RyICLxer0AvS_CXFCl5Smqro_w';
      let jobStatus = 'waiting';

      while (jobStatus !== 'finished') {
        try {
          const response = await axios.get(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });

          const data = response.data.data;
          jobStatus = data.status;

          if (jobStatus === 'finished') {
            const exportTask = data.tasks.find(task => task.operation === 'export/url');
            const fileUrl = exportTask.result.files[0].url;
            this.downloadFile(fileUrl);
            break;
          } else if (jobStatus === 'error') {
            console.error('Error during conversion:', data.message);
            break;
          }
        } catch (error) {
          console.error('Error checking job status:', error);
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
      }
    },
    downloadFile(url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
});
</script>

