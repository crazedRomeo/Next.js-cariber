import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AccessGroup } from 'src/models/accessgroup';
import { AcessgroupService } from '../repositories/acessgroup/acessgroup.service';
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Course } from 'src/models/course';
import { IsArray, IsNumber } from 'class-validator';

class setCourseDTO {
  @ApiProperty({type: Number})
  @IsNumber()
  id: number;

  @ApiProperty({type: [Number]})
  @IsArray()
  course_list: Array<number>;
}
@Crud({
  model: {
    type: AccessGroup,
  },
})
@ApiTags('Acessgroup')
@Controller('api/acessgroup')
export class AcessgroupController implements CrudController<AccessGroup> {
  constructor(public service: AcessgroupService) { }

  @ApiOperation({ summary: 'Add Course to AccessGroup' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ description: 'Set Course Of Access Group', type: setCourseDTO })
  @Post('set-course')
  @HttpCode(HttpStatus.OK)
  subscription(
      @Body() request: setCourseDTO
  ): Promise<any> {
      return this.service.setCourseOfAccessGroup(request)
  }
}
