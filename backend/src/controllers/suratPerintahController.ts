import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Generate nomor surat otomatis
const generateNomorSurat = async (tempat: string): Promise<string> => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  
  // Format: WIM.4.IMI.2.UM.01.01-XXX/[MONTH]/2026
  const result = await pool.query(
    'SELECT COUNT(*) as count FROM surat_perintah WHERE EXTRACT(YEAR FROM created_at) = $1 AND EXTRACT(MONTH FROM created_at) = $2',
    [year, new Date().getMonth() + 1]
  );
  
  const count = parseInt(result.rows[0].count) + 1;
  const nomor = `WIM.4.IMI.2.UM.01.01-${String(count).padStart(3, '0')}/${month}/${year}`;
  
  return nomor;
};

export const createSuratPerintah = async (req: AuthRequest, res: Response) => {
  try {
    const { menimbang, dasar, kepada_nama, untuk, ttd_nama, ttd_nip, ttd_jabatan, tempat } = req.body;

    const id = uuidv4();
    const nomor_surat = await generateNomorSurat(tempat);
    const tanggal = new Date();

    const result = await pool.query(
      `INSERT INTO surat_perintah 
      (id, nomor_surat, tanggal, menimbang, dasar, kepada_nama, untuk, ttd_nama, ttd_nip, ttd_jabatan, tempat, status, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        id,
        nomor_surat,
        tanggal,
        menimbang,
        JSON.stringify(dasar),
        JSON.stringify(kepada_nama),
        JSON.stringify(untuk),
        ttd_nama,
        ttd_nip,
        ttd_jabatan,
        tempat,
        'draft',
        req.user?.id,
      ]
    );

    res.status(201).json({
      message: 'Surat Perintah created successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSuratPerintah = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM surat_perintah WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Surat Perintah not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listSuratPerintah = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT * FROM surat_perintah ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) as total FROM surat_perintah');
    const total = parseInt(countResult.rows[0].total);

    res.json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSuratPerintah = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { menimbang, dasar, kepada_nama, untuk, ttd_nama, ttd_nip, ttd_jabatan, tempat } = req.body;

    const result = await pool.query(
      `UPDATE surat_perintah 
      SET menimbang = $1, dasar = $2, kepada_nama = $3, untuk = $4, ttd_nama = $5, ttd_nip = $6, ttd_jabatan = $7, tempat = $8, updated_at = NOW()
      WHERE id = $9
      RETURNING *`,
      [
        menimbang,
        JSON.stringify(dasar),
        JSON.stringify(kepada_nama),
        JSON.stringify(untuk),
        ttd_nama,
        ttd_nip,
        ttd_jabatan,
        tempat,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Surat Perintah not found' });
    }

    res.json({
      message: 'Surat Perintah updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const approveSuratPerintah = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE surat_perintah SET status = $1, approved_by = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      ['approved', req.user?.id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Surat Perintah not found' });
    }

    res.json({
      message: 'Surat Perintah approved successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSuratPerintah = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM surat_perintah WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Surat Perintah not found' });
    }

    res.json({ message: 'Surat Perintah deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
