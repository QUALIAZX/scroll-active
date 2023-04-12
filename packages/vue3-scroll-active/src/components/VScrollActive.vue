<template>
  <div ref="refScrollActive">
    <slot />
  </div>
</template>

<script>
  export default { name: 'v-scroll-active' }
</script>

<script setup>
/* 修改自v-scroll-active */
import { ref, onBeforeUpdate, onUpdated, onBeforeUnmount, onMounted, nextTick } from 'vue';
import ScrollActive from 'scroll-active';

const props = defineProps({
  activeClass: { type: String, default: 'active' },
  offset: { type: [Number, String], default: 0 },
  hash: { type: Boolean, default: false },
});
const emit = defineEmits(['update']);

const instanceScrollActive = ref();
const refScrollActive = ref(null);

const initScrollActive = () => {
  instanceScrollActive.value = new ScrollActive({
    wrapper: refScrollActive.value,
    activeClass: props.activeClass,
    offset: Number(props.offset),
    hash: props.hash,
    update: (id) => {
      console.log(id);
      emit('update', id);
    },
  });
};

// 释放资源
const destroyScrollActive = () => {
  if (instanceScrollActive.value) {
    instanceScrollActive.value.dispose();
    instanceScrollActive.value = void 0;
  }
};

onMounted(async () => {
  await nextTick();
  initScrollActive();
});

onBeforeUpdate(() => destroyScrollActive());
onBeforeUnmount(() => destroyScrollActive());
onUpdated(() => initScrollActive());
</script>
