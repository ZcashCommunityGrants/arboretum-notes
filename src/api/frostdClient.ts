import axios, { AxiosInstance } from 'axios';

/**
 * FrostdClient wraps the frostd REST API (v1.0.0) endpoints for FROST ceremonies.
 * Provides methods for version, action management, participant/nonces/signature submissions, and results.
 */
export class FrostdClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  // 1. GET /version
  async getVersion(): Promise<any> {
    return this.client.get('/version');
  }

  // 2. POST /actions
  async createAction(payload: any): Promise<any> {
    return this.client.post('/actions', payload);
  }

  // 3. GET /actions/:id
  async getAction(id: string): Promise<any> {
    return this.client.get(`/actions/${id}`);
  }

  // 4. POST /actions/:id/participants
  async addParticipant(id: string, payload: any): Promise<any> {
    return this.client.post(`/actions/${id}/participants`, payload);
  }

  // 5. POST /actions/:id/nonces
  async collectNonces(id: string, payload: any): Promise<any> {
    return this.client.post(`/actions/${id}/nonces`, payload);
  }

  // 6. POST /actions/:id/signatures
  async collectSignatures(id: string, payload: any): Promise<any> {
    return this.client.post(`/actions/${id}/signatures`, payload);
  }

  // 7. GET /actions/:id/results
  async getResult(id: string): Promise<any> {
    return this.client.get(`/actions/${id}/results`);
  }

  // 8. DELETE /actions/:id
  async cancelAction(id: string): Promise<any> {
    return this.client.delete(`/actions/${id}`);
  }
}
