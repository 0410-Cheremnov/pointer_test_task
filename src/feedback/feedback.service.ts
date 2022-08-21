import { InjectRepository } from "@nestjs/typeorm";
import { Feedback } from "./feedback.model";
import { Repository } from "typeorm";
import { FilterOptions } from "../filter/filter.options";
import { FeedbackDto } from "./dto/feedback.dto";
import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepo: Repository<Feedback>
  ){}

  async parseData() {
    let limit = 2500;
    let offset = 0;
    let count = 1;

    while (true) {
      console.log("iteration #",count);
      const axiosResponse = await axios.get(`https://api.delivery-club.ru/api1.2/reviews?chainId=48274&limit=${limit}&offset=${offset}&cacheBreaker=1660307294`);
      const items = axiosResponse.data.reviews;
      for (const item of items) {
        const dto = new FeedbackDto(item);
        const feedback = await dto.toEntity();
        await this.feedbackRepo.save(feedback)
      }

      if(items.length < limit) {
        break;
      }
      limit+= 50;
      offset+= limit;
      count++;
    }
  }

  async findReviews(filter?: FilterOptions) {
    const condition = await FilterOptions.getOptions(filter);
    return  this.feedbackRepo.find(condition);
  }

}