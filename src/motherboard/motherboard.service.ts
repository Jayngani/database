import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class MotherboardService {
  constructor(private readonly db: DatabaseService) {}

  private get pool() {
    return this.db.getPool();
  }

  async getAllMotherboards() {
    return this.getAll();
  }

  async getMotherboardById(id: number) {
    return this.findById(id);
  }

  async getAll() {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM motherboard'
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM motherboard WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async createMotherboard(id: number, type_asus: string, type_msi: string, _type_gigabyte: any) {
    const [result] = await this.pool.execute<OkPacket>(
      'INSERT INTO motherboard (type_asus, type_msi, type_gigabyte) VALUES (?, ?, ?)',
      [type_asus, type_msi, _type_gigabyte]
    );
    return { id: result.insertId, type_asus, type_msi, _type_gigabyte };
  }

  async updateMotherboard(id: number, data: {
    type_asus?: string;
    type_msi?: string;
    type_gigabyte?: string
  }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (data.type_asus) { fields.push('type_asus = ?'); values.push(data.type_asus); }
    if (data.type_msi) { fields.push('type_msi = ?'); values.push(data.type_msi); }
    if (data.type_gigabyte) { fields.push('type_gigabyte = ?'); values.push(data.type_gigabyte); }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    await this.pool.execute(
      `UPDATE motherboard SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  async deleteMotherboard(id: number) {
    const [result] = await this.pool.execute<OkPacket>(
      'DELETE FROM motherboard WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}