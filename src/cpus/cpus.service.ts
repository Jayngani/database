import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class CpusService {
  constructor(private readonly db: DatabaseService) {}

  private get pool() {
    return this.db.getPool();
  }

  async getAllCpus() {
    return this.getAll();
  }

  async getCpuById(id: number) {
    return this.findById(id);
  }

  async getAll() {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM cpus'
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM cpus WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async createCpus(id: number, type_amd: string, type_intel: string) {
  const [result] = await this.pool.execute<OkPacket>(
    'INSERT INTO cpus (type_amd, type_intel) VALUES (?, ?)',
    [type_amd, type_intel]
  );
  return { id: result.insertId, type_amd, type_intel };
}

  async updateCpus(id: number, data: {
    type_amd?: string;
    type_intel?: string;
  }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (data.type_amd) { fields.push('type_amd = ?'); values.push(data.type_amd); }
    if (data.type_intel) { fields.push('type_intel = ?'); values.push(data.type_intel); }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    await this.pool.execute(
      `UPDATE cpus SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  async deleteCpus(id: number) {
    const [result] = await this.pool.execute<OkPacket>(
      'DELETE FROM cpus WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}