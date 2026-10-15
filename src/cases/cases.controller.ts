import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  async findAll() {
    return this.casesService.getAllCases();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.casesService.getCaseById(+id);
  } 

  @Post()
  async create(@Body() body: any) {
    return this.casesService.createCases(body.type_asus, body.type_cooler, body.type_corsair);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.casesService.createCases(body.type_asus, body.type_cooler, body.type_corsair);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.casesService.deleteCases(+id);
  }

   @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.casesService.updateCases(+id, body);
  }
}