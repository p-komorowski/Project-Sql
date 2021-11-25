import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PriceHistoryResponseDto {
  @Expose({ name: 'id' })
  @ApiProperty({ type: String, description: 'ID of review' })
  IdOfPriceHistory: string;

  @Expose({ name: 'previousPrice' })
  @ApiProperty({ type: String, description: 'previous price of book' })
  PreviousPriceOfBook: number;

  @Expose({ name: 'currentPrice' })
  @ApiProperty({ type: String, description: 'current price of book' })
  CurrentPriceOfBook: number;

  @Expose({ name: 'date' })
  @ApiProperty({ type: String, description: 'date of changes' })
  DateOfChanges: Date;
}
