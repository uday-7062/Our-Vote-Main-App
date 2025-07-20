import { API_URL } from '../config';

class ApiService {
  constructor() {
    this.baseURL = API_URL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Event endpoints
  async getEvents() {
    return this.request('/elections');
  }

  async getNearbyEvents(lng, lat, maxDistance = 10000) {
    return this.request(`/elections/nearby?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`);
  }

  async createEvent(eventData) {
    return this.request('/elections', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async registerForEvent(eventId) {
    return this.request(`/elections/${eventId}/register`, {
      method: 'POST',
    });
  }

  async unregisterFromEvent(eventId) {
    return this.request(`/elections/${eventId}/unregister`, {
      method: 'POST',
    });
  }
}

export default new ApiService(); 