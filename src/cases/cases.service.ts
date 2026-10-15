import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class CasesService {
  constructor(private readonly db: DatabaseService) {}

  private get pool() {
    return this.db.getPool();
  }

  async getAllCases() {
    return this.getAll();
  }

  async getCaseById(id: number) {
    return this.findById(id);
  }

  async getAll() {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM cases'
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM cases WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async createCases(type_asus: string, type_cooler: string, type_corsair: string) {
    const [result] = await this.pool.execute<OkPacket>(
      'INSERT INTO cases (type_asus, type_cooler, type_corsair) VALUES (?, ?, ?)',
      [type_asus, type_cooler, type_corsair]
    );
    return { id: result.insertId, type_asus, type_cooler, type_corsair };
  }

  async updateCases(id: number, data: {
    type_asus?: string;
    type_cooler?: string;
    type_corsair?: string;
  }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (data.type_asus) { fields.push('type_asus = ?'); values.push(data.type_asus); }
    if (data.type_cooler) { fields.push('type_cooler = ?'); values.push(data.type_cooler); }
    if (data.type_corsair) { fields.push('type_corsair = ?'); values.push(data.type_corsair); }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    await this.pool.execute(
      `UPDATE cases SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  async deleteCases(id: number) {
    const [result] = await this.pool.execute<OkPacket>(
      'DELETE FROM cases WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}