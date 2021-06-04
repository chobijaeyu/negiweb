import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mermaid from "mermaid";
import { seriesTaskOption, seriesTaskSingleTask } from 'src/app/models/task-options.model';

@Component({
  selector: 'negi-mermaid',
  templateUrl: './mermaid.component.html',
  styleUrls: ['./mermaid.component.sass']
})
export class MermaidComponent implements AfterViewInit {
  st: seriesTaskOption = new seriesTaskOption()
  @Input() set inputSt(st: seriesTaskOption) {
    console.log(st)
    this.st = st
    mermaid.default.initialize({
      theme: "default"
    });

    if (this.mermaidDiv && this.st.title) {
      const element: any = this.mermaidDiv.nativeElement;

      const graphDefinition = `gantt\ntitle ${this.st.title}\n ${this.generateGantt(this.st.tasklist)}`;
      mermaid.default.render("graphDiv", graphDefinition, (svgCode: any, bindFunctions: any) => {
        element.innerHTML = svgCode;
        bindFunctions(element);
      });
    }
  }
  @ViewChild('mermaid') mermaidDiv!: ElementRef

  config = {
    startOnLoad: true,
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'cardinal',
    },
    securityLevel: 'loose',
  };

  constructor() { }

  public ngAfterViewInit(): void {
    mermaid.default.initialize({
      theme: "default"
    });

    const element: any = this.mermaidDiv.nativeElement;

    const graphDefinition = `gantt\ntitle ${this.st.title}\n ${this.generateGantt(this.st.tasklist)}`;
    mermaid.default.render("graphDiv", graphDefinition, (svgCode: any, bindFunctions: any) => {
      element.innerHTML = svgCode;
      bindFunctions(element);
    });

  }

  generateGantt(taskOptionList: seriesTaskSingleTask[]): string {
    let ganttString = ""
    taskOptionList.forEach(v => {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      if (v.start) {
        today.setDate(today.getDate() + v.start)
      }
      ganttString += ` ${v.title ? v.title : 'タイトルを入力して下さい'}: ${today.toISOString()} , ${v.end ? (v.end - (v.start ? v.start :0)) : 1}d\n`
    })
    return ganttString
  }
}
