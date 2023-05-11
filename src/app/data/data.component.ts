import { Component, OnInit, ViewChild, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Information } from '../models/data';
import { NEVER, Observable } from 'rxjs';
import { MatTable } from '@angular/material';
import { element } from 'protractor';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnChanges {
  inform: any
  displayedColumns: string[] = ['Nation', 'Year', 'Population', 'PopulationGrowth'];
  max :number
  flag = true
  constructor(private data: DataService) {
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  ngOnInit() {
    this.data.getData().subscribe(result => {
      this.inform = result.data
      this.sort()
      this.populationGrowthAllYear()
      this.greatValue()
    })
  }

  ngOnChanges() {
    const ether=this.inform
    if (window.innerWidth < 400) {
      this.inform.map(item=>{
        delete item.Population,
        delete item.PopulationGrowth
      })
    }
    else{
      this.inform=ether
    }
  }

  sort() {
    this.inform = this.flag ? this.inform.sort((a, b) => a.Year - b.Year) : this.inform.sort((a, b) => b.Year - a.Year)
    this.flag = !this.flag
    this.table && this.table.renderRows()
  }

  populationGrowthAllYear() {
    this.inform.forEach((element, index) => {
      index > 0 && (element.populationGrowth = element.Population - this.inform[index - 1].Population)

    });
  }

  greatValue() {
    this.inform.forEach((item, index) => {
      if (index > 0)
        if (item.Population > this.inform[index - 1].Population)
          this.max = item.Population
    });
  }

}

