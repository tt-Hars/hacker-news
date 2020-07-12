import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  @Input() noOfRecords;
  @Output() updatedPageNo = new EventEmitter<number>();

  ngOnInit(): void {
  }

  changePage( type = 'next') {
    type === 'next' ? this.noOfRecords ++ : this.noOfRecords --;
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       page: this.noOfRecords
     },
     queryParamsHandling: 'merge',
     skipLocationChange: true
    });
    this.updatedPageNo.emit(this.noOfRecords);
  }

}
