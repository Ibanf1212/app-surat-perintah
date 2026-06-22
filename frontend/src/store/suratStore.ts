import { create } from 'zustand';

export interface SuratPerintah {
  id: string;
  nomor_surat: string;
  tanggal: string;
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
  created_at: string;
  updated_at: string;
}

interface SuratStore {
  surat: SuratPerintah | null;
  suratList: SuratPerintah[];
  setSurat: (surat: SuratPerintah | null) => void;
  setSuratList: (list: SuratPerintah[]) => void;
}

export const useSuratStore = create<SuratStore>((set) => ({
  surat: null,
  suratList: [],
  setSurat: (surat) => set({ surat }),
  setSuratList: (list) => set({ suratList: list }),
}));
