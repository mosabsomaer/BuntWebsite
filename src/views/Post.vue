<template>
  <div class="statistic-box">
    <div class="box">
      <p class="title">Today's Sale</p>
      <div class="bottom-content">
        <p class="price">{{ stats.Today_sales }} LYD</p>
      </div>
    </div>

    <div class="box">
      <p class="title">Monthly Sales</p>
      <div class="bottom-content">
        <p class="price">{{ stats.Monthly_sales }} LYD</p>
      </div>
    </div>

    <div class="box">
      <p class="title">Total Orders</p>
      <div class="bottom-content">
        <p class="price">{{ stats.count_orders }}</p>
      </div>
    </div>

    <div class="box">
      <p class="title">Average pages/Order</p>
      <div class="bottom-content">
        <p class="price">{{ stats.Average_pages_per_order }} Pages</p>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="table-container" style="float: left">
      <div class="header-container">
        <h2 class="order-heading">Orders</h2>
        <a href="#" class="see-all-orders">See All Orders</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Paper</th>
            <th>Price</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in latestPosts"
            :key="post.id"
            :class="post.status.toLowerCase()"
          >
            <td class="status-cell">
              <span
                :class="`status-indicator ${post.status.toLowerCase()}`"
              ></span>
              {{ post.status }}
            </td>
            <td>{{ post.number_pages }}</td>
            <td>{{ post.price }} LYD</td>
            <td>{{ post.files }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="status-box">
      <div class="status-header">
        <h2 class="status-heading">Status</h2>
        <div class="status-item">
          <span class="status-indicator active"></span>{{ status }}
        </div>
      </div>
      <div class="status-item">
        <div class="header-container">
          <p>papers</p>
          <p>{{ paper }}</p>
        </div>
        <div class="status-bar-container">
          <div class="status-bar" :style="{ width: `${paper}%` }"></div>
        </div>
      </div>
      <div class="status-item">
        <div class="header-container">
          <p>ink</p>
          <p>{{ ink }}%</p>
        </div>
        <div class="status-bar-container">
          <div class="status-bar ink" :style="{ width: `${ink}%` }"></div>
        </div>
      </div>
      <div class="status-item">
        <div class="header-container">
          <p>coin jar</p>
          <p>{{ coins }} LYD</p>
        </div>
        <div class="status-bar-container">
          <div class="status-bar" :style="{ width: `${coins}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../services/AxiosTokenInstance";
import { mapMutations } from "vuex";
import { useFilesStore } from "@/stores/files";
import { LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
import "@/assets/styles/Post.css";
export default {
  data() {
    return {
      posts: [],
      stats: [],
      token: localStorage.getItem("token"),
      paper: null,
      ink: null,
      coins: null,
      status: null,
      last_ping: null,
    };
  },

  computed: {
    latestPosts() {
      const length = this.posts.length;
      return this.posts.slice(length - 4, length);
    },
  },
  setup() {
    const filesStore = useFilesStore();
    return {
      filesStore,
    };
  },
  mounted() {
    console.log("token:" + this.filesStore.token);
    this.showLoading(true);
    axiosInstance
      .get(this.filesStore.server_link + "/api/orders", {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
      .then((response) => {
        this.posts = response.data.data;
        this.showLoading(false);
      })
      .catch(() => {
        this.showLoading(false);
      });

    axiosInstance
      .get(this.filesStore.server_link + "/api/statistics", {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      })
      .then((response) => {
        this.stats = response.data;
        this.showLoading(false);
        this.paper = this.stats.status.paper;
        this.ink = this.stats.status.ink;
        this.coins = this.stats.status.coins;
        this.status = this.stats.status.status;
        this.last_ping = this.stats.status.last_ping;
      })
      .catch(() => {
        this.showLoading(false);
      });
  },
  methods: {
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
  },
};
</script>
