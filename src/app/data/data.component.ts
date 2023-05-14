import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Information } from '../models/data';
import { NEVER, Observable } from 'rxjs';
import { MatTable } from '@angular/material';
import { element } from 'protractor';
import { log } from 'console';


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
  temp: string[]
  name:string;
  constructor(private data: DataService) {
  }

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  ngOnInit() {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      if (window.innerWidth < 400) {
        this.inform.map(item => {
          delete item.Population
        })
        this.displayedColumns=['Nation', 'Year', 'PopulationGrowth'];
      }
      else {
        this.flag && this.temp.reverse();
        this.inform.forEach((item, index) => item.Population = this.temp[index])
        this.flag && this.temp.reverse();
        this.displayedColumns=['Nation', 'Year', 'Population', 'PopulationGrowth'];
      }
      this.table && this.table.renderRows()

    });
    this.data.getData().subscribe(result => {
      this.inform = result.data
      this.sort()
      this.populationGrowthAllYear()
      this.greatValue()
      this.temp = this.inform.map(({ Population }) => Population
      )
    })
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

