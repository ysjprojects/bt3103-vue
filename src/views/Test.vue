<template>
  <div>Hello {{ model }}</div>
</template>

<script>
export default {
  name: "Test",
  props: {
    model: String,
  },
};
</script>
