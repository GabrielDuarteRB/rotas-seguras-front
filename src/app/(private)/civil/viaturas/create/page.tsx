"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { ButtonPrimary } from '@/components/Button/Primary';
import { InputText } from '@/components/Input/Text';
import { InputSelect } from '@/components/Input/Select';
import { policeApi } from '@/utils/police-api';

export default function CreateViaturaPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    placa: '',
    modelo: '',
    ano: '',
    id_status_viatura: '',
  });

  const [statusList, setStatusList] = useState<any[]>([]);

  useEffect(() => {
    policeApi('/status-viatura')
      .then(async (res) => {
        const data = await res.json();
        setStatusList(data);
      })
      .catch(() => alert('Erro ao buscar status.'));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.id_status_viatura) {
      alert('Por favor, selecione um status válido.');
      return;
    }

    try {
      await policeApi('/viatura', 'POST', {
        ...form,
        ano: Number(form.ano),
        id_status_viatura: Number(form.id_status_viatura),
      });

      alert('Viatura criada com sucesso!');
      router.push('/civil/viaturas');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar viatura.');
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6 text-primary cursor-pointer hover:underline" onClick={() => router.back()}>
        <FaArrowLeft />
        <span>Voltar</span>
      </div>

      <h1 className="text-3xl font-bold text-center text-primary mb-8">Cadastrar Nova Viatura</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-lg rounded-2xl">
        <InputText
          label="Placa"
          name="placa"
          value={form.placa}
          onChange={handleChange}
          required
        />

        <InputText
          label="Modelo"
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          required
        />

        <InputText
          label="Ano"
          name="ano"
          value={form.ano}
          onChange={handleChange}
          type="number"
          required
        />

        <InputSelect
          label="Status da Viatura"
          name="id_status_viatura"
          value={form.id_status_viatura}
          onChange={handleChange}
          options={
            Array.isArray(statusList)
              ? statusList.map((status) => ({
                  label: status.descricao,
                  value: String(status.id_status_viatura),
                }))
              : []
          }
          required
        />

        <div className="flex justify-end">
          <ButtonPrimary type="submit">Cadastrar</ButtonPrimary>
        </div>
      </form>
    </div>
  );
}
