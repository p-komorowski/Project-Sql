import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class BookDto {
    @Expose()
    @IsNumber()
    @ApiProperty({ type: Number, description: 'IBSN' })
    IBSN: string;

    @Expose()
    @IsString()
    @ApiProperty({ description: 'Title of book' })
    @IsOptional()
    title: string;

    @Expose()
    @IsNumber()
    @ApiProperty({ description: 'price of book' })
    @IsOptional()
    price: number;

    @Expose()
    @IsString()
    @ApiProperty({ description: 'Name of author' })
    @IsOptional()
    author: string;

    @Expose()
    @IsNumber()
    @ApiProperty({ description: 'count of book' })
    @IsOptional()
    count: number;
}
