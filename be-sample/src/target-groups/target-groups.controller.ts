import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { TargetGroupsService } from './target-groups.service';
import { CreateTargetGroupDto } from './dto/create-target-group.dto';
import { UpdateTargetGroupDto } from './dto/update-target-group.dto';
import { TargetGroupResponseDto } from './dto/target-group-response.dto';
import { ListTargetGroupsQueryDto } from './dto/list-target-groups-query.dto';
import { TargetGroupsListResponseDto } from './dto/target-groups-list-response.dto';
import { BulkSoftDeleteTargetGroupsDto } from './dto/bulk-soft-delete-target-groups.dto';

@Controller('target-groups')
export class TargetGroupsController {
  constructor(private readonly targetGroupsService: TargetGroupsService) {}

  @Get('public')
  getPublic(): Promise<TargetGroupResponseDto[]> {
    return this.targetGroupsService.getPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(
    @Query() query: ListTargetGroupsQueryDto,
  ): Promise<TargetGroupsListResponseDto> {
    return this.targetGroupsService.getAll(query);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string): Promise<TargetGroupResponseDto> {
    return this.targetGroupsService.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTargetGroupDto): Promise<TargetGroupResponseDto> {
    return this.targetGroupsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('bulk/soft-delete')
  bulkSoftDelete(
    @Body() dto: BulkSoftDeleteTargetGroupsDto,
  ): Promise<{ success: boolean; updatedCount: number }> {
    return this.targetGroupsService.bulkSoftDelete(dto.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTargetGroupDto,
  ): Promise<TargetGroupResponseDto> {
    return this.targetGroupsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.targetGroupsService.remove(id);
  }
}
