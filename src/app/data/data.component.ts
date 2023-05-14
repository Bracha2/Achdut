import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../Services/data.service';
import { MatTable } from '@angular/material';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  inform: any
  displayedColumns: string[] = ['Nation', 'Year', 'Population', 'PopulationGrowth'];
  max: number
  flag = true
  temp: string[];
  buttonSort = "sorting by years desc"

  constructor(private data: DataService) {
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  ngOnInit() {
    this.data.getData().subscribe(result => {
      this.inform = result.data
      this.sort()
      this.populationGrowthAllYear()
      this.greatValue()
      this.temp = this.inform.map(({ Population }) => Population
      )
    })
  }
  onResize($event) {
    debugger
    if ($event.target.innerWidth < 400) {
      this.inform.map(item => {
        delete item.Population
      })
      this.displayedColumns = ['Nation', 'Year', 'PopulationGrowth'];
    }
    else {
      this.flag && this.temp.reverse();
      this.inform.forEach((item, index) => item.Population = this.temp[index])
      this.flag && this.temp.reverse();
      this.displayedColumns = ['Nation', 'Year', 'Population', 'PopulationGrowth'];
    }
    this.table && this.table.renderRows()
  }
  
  sort() {
    this.inform = this.flag ? this.inform.sort((a, b) => a.Year - b.Year) : this.inform.sort((a, b) => b.Year - a.Year)
    this.flag = !this.flag
    this.buttonSort = this.flag ? 'sorting by years desc' : 'sorting by years asc'
    this.table && this.table.renderRows()
  }

  populationGrowthAllYear() {
    this.inform.forEach((element, index) => {
      index > 0 && (element.PopulationGrowth = element.Population - this.inform[index - 1].Population)
    });
    this.table && this.table.renderRows()
  }

  greatValue() {
    this.inform.forEach((item, index) => {
      if (index > 0)
        if (item.Population > this.inform[index - 1].Population)
          this.max = item.Population
    });
  }

}

