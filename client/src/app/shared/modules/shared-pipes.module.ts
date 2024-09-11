import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeAgoPipe} from "../../DTO/TimeAgoPipe";
import {DateFormatPipe} from "../../DTO/DateFormatPipe";
import {HourMinuteFormatPipe} from "../../DTO/HourMinuteFormatPipe";
import {RoundFloats} from "../../DTO/RoundFloats";
import {TimeFormatPipe} from "../../DTO/TimeFormatPipe";
import {TruncateCommentsPipe} from "../../DTO/TruncateCommentsPipe";
import {TruncatePipe} from "../../DTO/TruncatePipe";

@NgModule({
  declarations: [
    DateFormatPipe,
    HourMinuteFormatPipe,
    RoundFloats,
    TimeAgoPipe,
    TimeFormatPipe,
    TruncateCommentsPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateFormatPipe,
    HourMinuteFormatPipe,
    RoundFloats,
    TimeAgoPipe,
    TimeFormatPipe,
    TruncateCommentsPipe,
    TruncatePipe
  ]
})
export class SharedPipesModule { }
