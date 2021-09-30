import { Component, Input, OnInit } from '@angular/core';
import { VehicleCapacityColorConfigClient, VehicleCapacityColorConfigResource } from 'src/app/api-client-generated';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input() value: number;
  @Input() expectedTitle: string;
  @Input() calculatedTitle: string;
  @Input() expectedTitleHours: string;
  @Input() expectedTitleMinitues: string;
  @Input() hour: string;
  @Input() minute: string;
  vehicleCapacityColorConfig: VehicleCapacityColorConfigResource;

  constructor(
    private vehicleCapacityColorConfigClient: VehicleCapacityColorConfigClient
  ) { }

  ngOnInit() {
    this.vehicleCapacityColorConfigClient.getOne().subscribe(data => {
      this.vehicleCapacityColorConfig = data;
    });
  }

  getStyleClass(){
    if(this.value <= this.vehicleCapacityColorConfig.bluePercentageLimit){
      return "bg-info";
    }
    if(this.value > this.vehicleCapacityColorConfig.bluePercentageLimit && this.value <= this.vehicleCapacityColorConfig.amberPercentageLimit){
      return "bg-warning";
    }
    if(this.value > this.vehicleCapacityColorConfig.amberPercentageLimit){
      return "bg-danger";
    }
  }

}
