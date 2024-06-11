<template>
  <div>
    <DropZone
      ref="myDropzone"
      :url="dropzoneOptions.url"
      :method="dropzoneOptions.method"
      :headers="dropzoneOptions.headers"
      :paramName="dropzoneOptions.paramName"
      :autoProcessQueue="dropzoneOptions.autoProcessQueue"
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
import { defineComponent, ref } from 'vue';
import { DropZone } from 'dropzone-vue';

export default defineComponent({
  components: {
    DropZone,
  },
  data() {
    return {
      jobData: null,
      response: null,
      dropzoneOptions: {
        url: '/',
        method: 'POST',
        headers: {},
        paramName: 'file',
        autoProcessQueue: false,
      },
    };
  },
  methods: {
    async createCloudConvertJob() {
      const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c';
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
        this.jobData = jobData;
        const importTask = jobData.tasks.find(task => task.operation === 'import/upload');
        this.dropzoneOptions.url = importTask.result.form.url;
        this.dropzoneOptions.headers = {
          ...importTask.result.form.parameters,
        };
        this.$nextTick(() => {
          this.$refs.myDropzone.processQueue();
        });
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
      const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGFlMmNhODBiOTMxMzg5MWVkNjkxMTFlMDEwMzcxMWQ1MDg3NmM0MDI2YjFhMzI2ZGYwMmZhMmI1NjhmMmRhNmY1ZDYxMTdkZDk3YThiMjEiLCJpYXQiOjE3MTc4NzY3MDguMjU2MTA4LCJuYmYiOjE3MTc4NzY3MDguMjU2MTA5LCJleHAiOjQ4NzM1NTAzMDguMjUyMzM2LCJzdWIiOiI2NzI4MDMwOSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.aTf8WYbw4q0E-TppaCbr2i6jvkSd3OkVX1zh35QT8ij2X5zgqtaXhAHRcVD5FRpIp4t8YQg0pSwFPqWFoT5xMAzV1YGO9X_wVtIlwlh-5SNTjDQhTNBNmRm0jNAxVaHqg2B7in0uB9MhK892qn6mE_P2peyebL794rdIulRyb6808_mzD8BtcXXAsI362zHyjIdSDE6xyv8GwdLz1MhZI-s-XEkFEKYX8TBKCQ31xy9dswsM1GLznDzCFQgEbISmNI9t7X8SLVDY5LPcnH3DMOwI5WbsoQctzSduPifydD72AXO3g4FHTfErh4obG6U6xcyZn32ymhnwlQ0UrQw3JbvCitrJWvGHQ8pTxZC4-HfMwPgRob1-olXCXJyvSD28-Qk-1kB5LqVbIuLTHG5kilJP3PRahNOQG0kHKIo_KkAtiB0WHVWT4V9ImJy0R26PHUdlarZSd_jZsrV8LtmVl1yODBYAEnRkLHo2UNbhL-CEwURQRAnzkYHm2067tEkCFogJcb-75MZaHdAocbGs41__z1K6RdzqCzsPjFI_Dj49oPRe48b6yGg8hOtWYNbED0kA-hZh0FV6vNjjoeyYYG2AUJaCZBkLUPi-ewRaXeSpTeDtqvqZCc2UqRjxTHywecy_lVpL82BHKRxAjOfZwAbTW0lTBXwZoj8Ixtw0i2c';
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
