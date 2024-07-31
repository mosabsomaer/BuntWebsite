<template>
  <div>
    <vue-good-table
      ref="table"
      :columns="columns"
      :rows="orders"
      compactMode
      styleClass="vgt-table striped custom-striped-table"
    >
    </vue-good-table>
  </div>
</template>

<script>
import axiosInstance from "../services/AxiosTokenInstance";
import { useFilesStore } from "@/stores/files";

export default {
  setup() {
    const filesStore = useFilesStore();
    return {
      filesStore,
    };
  },
  data() {
    return {
      columns: [
        {
          label: "Order ID",
          field: "order_id",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Number of Pages",
          field: "number_pages",
          type: "number",
        },
        {
          label: 'Created At',
          field: 'created_at',
          type: 'date',
        },
        {
          label: 'Updated At',
          field: 'updated_at',
          type: 'date',
        },
        {
          label: "Price",
          field: "price",
          type: "number",
        },
        {
          label: "Files",
          field: "files",
          type: "number",
        },
      ],
      orders: [],
      token: localStorage.getItem("token"),
    };
  },
  mounted() {
    axiosInstance
      .get(this.filesStore.server_link + "/api/orders", {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
      .then((response) => {
        this.orders = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
