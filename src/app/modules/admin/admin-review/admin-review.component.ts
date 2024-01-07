import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminReview } from './model/adminReview';
import { AdminReviewService } from './admin-review.service';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss'],
})
export class AdminReviewComponent implements OnInit {
  reviews: Array<AdminReview> = [];
  displayedColumns = ['authorName', 'content', 'isModerated', 'actions'];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private adminReviewService: AdminReviewService,
    private dialogService: AdminConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.adminReviewService.getReviews().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  confirmDelete(element: AdminReview): void {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this review?')
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;

        this.adminReviewService.removeReview(element.id).subscribe(() => {
          this.reviews.forEach((review, index) => {
            if (element === review) {
              this.reviews.splice(index, 1);
              this.table.renderRows();
            }
          });
        });
      });
  }

  confirmModerate(element: AdminReview): void {
    this.dialogService
      .openConfirmDialog('Are you sure you want to moderate this review?')
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;

        this.adminReviewService.moderateReview(element.id).subscribe(() => {
          this.reviews.forEach((value, index) => {
            if (element === value) {
              element.isModerated = true;
              this.table.renderRows();
            }
          });
        });
      });
  }
}
