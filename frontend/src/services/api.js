import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const analyzeSymptoms = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/analyze`, formData, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    })
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || 'Unable to connect to server. Please try again.'
    }
  }
}