import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MotherboardService } from './motherboard.service';

@Controller('motherboard')
export class MotherboardController {
  constructor(private readonly motherboardService: MotherboardService) {}

  @Get()
  async findAll() {
    return this.motherboardService.getAllMotherboards();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.motherboardService.getMotherboardById(+id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.motherboardService.createMotherboard(body.id, body.type_asus, body.type_msi, body.type_gigabyte);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.motherboardService.createMotherboard(body.id, body.type_asus, body.type_msi, body.type_gigabyte);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.motherboardService.updateMotherboard(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.motherboardService.deleteMotherboard(+id);
  }
}