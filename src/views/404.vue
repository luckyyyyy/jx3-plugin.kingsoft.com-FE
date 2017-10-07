<template>
  <div>404</div>
</template>
<script>
import { isClient } from '@/util';

export default {
  created() {
    if (!isClient()) {
      this.$ssrContext.httpStatus = 404;
    }
  },
};
</script>
