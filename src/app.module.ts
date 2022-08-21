import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "./feedback/feedback.model";
import { FeedbackModule } from "./feedback/feedback.module";

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "88776655",
      database: "testing",
      entities: [
        Feedback
      ],
      synchronize: true,
    }
    ),
    FeedbackModule
  ],
})
export class AppModule {}
