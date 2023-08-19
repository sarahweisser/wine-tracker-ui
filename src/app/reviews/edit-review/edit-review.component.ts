import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-edit-review',
    templateUrl: './edit-review.component.html'
})
export class EditUserReviewComponent implements OnInit {
    pageTitle = "Edit review";

    ngOnInit(): void {
        console.log("INIT :: edit user review comp");
    }
}