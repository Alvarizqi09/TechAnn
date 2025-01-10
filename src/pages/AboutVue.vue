<template>
  <section class="container mx-auto px-6 py-12 my-10">
    <!-- Title Section -->
    <h1 class="text-4xl font-extrabold text-accent mb-6 text-center">About Us</h1>

    <!-- Description Section -->
    <div class="bg-white p-8 rounded-lg shadow-lg text-gray-800">
      <p class="text-lg leading-relaxed mb-4">
        At <span class="font-semibold text-accent">techAnn</span>, we are passionate about bringing
        the latest and greatest in technology to your fingertips. From smartphones and laptops to
        home appliances and gaming accessories, we provide top-notch products at competitive prices.
      </p>
      <p class="text-lg leading-relaxed mb-6">
        Our mission is to deliver exceptional customer service, ensuring a seamless shopping
        experience from start to finish. Whether you're a tech enthusiast or just looking for the
        perfect gift, <span class="font-semibold text-accent">techAnn</span> has something for
        everyone.
      </p>

      <!-- Call to Action Section -->
      <div class="text-center mt-6">
        <button
          class="bg-accent text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-hover transition-colors"
        >
          Explore Our Products
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutVue'
}
</script>

<style scoped>
/* Custom Styling for the About Us Section */
.container {
  max-width: 900px;
}

section {
  background-color: #f7fafc;
  border-radius: 10px;
  padding-top: 20px;
}

.bg-white {
  background-color: #ffffff; /* White background for content block */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow for a soft elevation effect */
}
</style>
