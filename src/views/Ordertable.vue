<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="orders"
      styleClass="vgt-table striped custom-striped-table"
      :pagination-options="{
        enabled: true,
        mode: 'records',
      }"
      :search-options="{ enabled: true,}"
    >
  
    </vue-good-table>
  </div>
</template>

<script>
import axiosInstance from "../services/AxiosTokenInstance";
import { useFilesStore } from "@/stores/files";

export default {
  methods: {
 
    deleteOrder(orderId) {
      axiosInstance
        .delete(this.filesStore.server_link + `/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ` + this.token,
          },
        })
        .then(() => {
          console.log(`Order with ID ${orderId} deleted successfully.`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
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
          sortable: false,
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
          label: "Created On",
          field: "created_at",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM-do",
        },
        {
          label: "Last Update",
          field: "updated_at",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM-do",
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
      selectedOrderId: null,
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
        this.orders = response.data.data.map((order) => {
          return {
            ...order,
            created_at: new Date(order.created_at).toISOString().split("T")[0],
            updated_at: new Date(order.updated_at).toISOString().split("T")[0],
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
