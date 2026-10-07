import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { review_item } from './review-item';
import { SupabaseService } from './supabase-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private supabase_service: SupabaseService) {}
  async ngOnInit() {
    this.review_list = await this.supabase_service.getReview();
    console.log(this.review_list);
  }

  title = 'terry-review';

  review_title: string = '';
  vote: number | null = null;
  review_text: string = '';

  review_list: review_item[] = [];

  async addReview() {
    let vote: number = this.vote === null ? 0 : this.vote;
    const item: review_item = {
      title: this.review_title,
      vote: vote,
      review_text: this.review_text,
    };

    await this.supabase_service.addReview(item);

    this.review_list.push(item);

    this.title = '';
    this.vote = null;
    this.review_text = '';
  }
}
