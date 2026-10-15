import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CpusService } from './cpus.service';

@Controller('cpus')
export class CpusController {
  constructor(private readonly cpusService: CpusService) {}

  @Get()
  async findAll() {
    return this.cpusService.getAllCpus();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cpusService.getCpuById(+id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.cpusService.createCpus(body.id, body.type_amd, body.type_intel);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.cpusService.createCpus(body.id, body.type_amd, body.type_intel);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.cpusService.updateCpus(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cpusService.deleteCpus(+id);
  }
}