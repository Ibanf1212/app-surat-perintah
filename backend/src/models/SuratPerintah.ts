export interface SuratPerintah {
  id: string;
  nomor_surat: string;
  tanggal: Date;
  menimbang: string;
  dasar: string[];
  kepada_nama: string[];
  untuk: string[];
  ttd_nama: string;
  ttd_nip: string;
  ttd_jabatan: string;
  tempat: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  created_by: string;
  approved_by?: string;
  rejected_reason?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSuratPerintahInput {
  menimbang: string;
  dasar: string[];
  kepada_nama: string[];
  untuk: string[];
  ttd_nama: string;
  ttd_nip: string;
  ttd_jabatan: string;
  tempat: string;
}
