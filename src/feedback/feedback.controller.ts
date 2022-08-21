import { FeedbackService } from "./feedback.service";
import { Controller, Get, Query } from "@nestjs/common";
import { FilterOptions } from "../filter/filter.options";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Feedback } from "./feedback.model";

@ApiTags('FeedbackController')
@Controller()
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService
  ) {}

  @Get('parser')
  @ApiResponse({status: 200})
  async parse() {
    return this.feedbackService.parseData();
  }

  @Get('reviews')
  @ApiResponse({status: 200, description: 'Array of Feedbacks', isArray: true, type: Feedback})
  async find(@Query() filter?: FilterOptions) {
    return this.feedbackService.findReviews(filter);
  }
}