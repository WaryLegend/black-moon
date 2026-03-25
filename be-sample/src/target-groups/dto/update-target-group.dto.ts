import { PartialType } from '@nestjs/mapped-types';
import { CreateTargetGroupDto } from './create-target-group.dto';

export class UpdateTargetGroupDto extends PartialType(CreateTargetGroupDto) {}
