<template>
  <div class="app">
    <header class="header">
      <h1>🎵 Album Collection</h1>
      <p>Discover amazing music albums</p>
    </header>

    <main class="main">
      <section class="validator-card">
        <h2>GUID validator</h2>
        <label for="guid-input">Enter a GUID</label>
        <input
          id="guid-input"
          v-model="guidInput"
          type="text"
          placeholder="123e4567-e89b-42d3-a456-426614174000"
        />
        <p :class="{ valid: isValidGuid, invalid: guidInput && !isValidGuid }">
          {{
            guidInput
              ? isValidGuid
                ? 'Valid GUID format'
                : 'Invalid GUID format'
              : 'Enter a GUID to validate'
          }}
        </p>
      </section>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading albums...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchAlbums" class="retry-btn">Try Again</button>
      </div>

      <div v-else class="albums-grid">
        <AlbumCard 
          v-for="album in albums" 
          :key="album.id" 
          :album="album" 
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import AlbumCard from './components/AlbumCard.vue'
import type { Album } from './types/album'
import { validateGuid } from './utils/guid'

const albums = ref<Album[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const guidInput = ref('')
const isValidGuid = computed(() => validateGuid(guidInput.value))

const fetchAlbums = async (): Promise<void> => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get<Album[]>('/albums')
    albums.value = response.data
  } catch (err) {
    error.value = 'Failed to load albums. Please make sure the API is running.'
    console.error('Error fetching albums:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAlbums()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.validator-card {
  max-width: 520px;
  margin: 0 auto 2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.validator-card h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.validator-card label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.validator-card input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 1rem;
}

.validator-card input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.validator-card p {
  margin-top: 0.75rem;
  font-weight: 600;
}

.validator-card p.valid {
  color: #7ef3b5;
}

.validator-card p.invalid {
  color: #ff9ca1;
}

.error {
  text-align: center;
  padding: 4rem;
  color: white;
}

.error p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.retry-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: white;
  color: #667eea;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .albums-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
