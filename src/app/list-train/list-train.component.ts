import { Component, OnInit } from '@angular/core';
import { TrainService } from '../services/train.service';

@Component({
  selector: 'app-list-train',
  imports: [],
  templateUrl: './list-train.component.html',
  styleUrl: './list-train.component.css'
})
export class ListTrainComponent implements OnInit {

  constructor(private service: TrainService) { }

    ngOnInit() {

    }

    addTrain() {
        // Logic to navigate to Add Train component
        // This could be a router navigation or a service call
        console.log('Navigate to Add Train');
    }
}
