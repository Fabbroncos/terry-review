import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { review_item } from './review-item';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  constructor() {}

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  async getReview(): Promise<review_item[]> {
    const { data, error } = await this.supabase.from('review').select('*');
    if (error) {
      throw error;
    }
    return data ?? [];
  }

  async addReview(item: review_item) {
    const { error } = await this.supabase.from('review').insert(item);
    if (error) {
      throw error;
    }
  }
}
