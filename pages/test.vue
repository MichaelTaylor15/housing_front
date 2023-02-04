<template>
  <section>
    <label>关键词：<input v-model="keyword" /></label>
    <label>地区：<input v-model="location" /></label>
    <baidu-map>
      <bm-view class="map"></bm-view>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :location="location"
      ></bm-local-search>
    </baidu-map>
  </section>
</template>

<script>
export default {
  data() {
    return {
      location: "广州",
      keyword: "建业路华翠街",
    };
  },
};
</script>
