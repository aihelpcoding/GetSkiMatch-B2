import { SkiResort, ResortFilters } from '../types';

const API_BASE_URL = 'https://ski-query-worker.3we.org';

export async function getFilteredResorts(filters: ResortFilters = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/resorts?${queryParams.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      resorts: data.resorts || [],
      pagination: data.pagination || {
        total: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      }
    };
  } catch (error) {
    return {
      resorts: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
        total_pages: 0
      }
    };
  }
}

export async function getResortById(id: string): Promise<SkiResort | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/resort?id=${id}`);
    const data = await response.json();

    if (!response.ok || !data.resort || !data.resort.resort_id || !data.resort.name) {
      return null;
    }

    return data.resort;
  } catch (error) {
    return null;
  }
}

export async function getCountries() {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data || [];
  } catch (error) {
    return [];
  }
}

export default {
  getFilteredResorts,
  getResortById,
  getCountries
};