import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  @Input() pageNo = 0;
  @Output() updatedPageNo = new EventEmitter<number>();

  ngOnInit(): void { }

  changePage( type = 'next') {
    type === 'next' ? this.pageNo++ : this.pageNo--;
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       page: this.pageNo
     },
    });
    this.updatedPageNo.emit(this.pageNo);
  }

}
