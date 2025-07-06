import { useState, FormEvent, useContext, useEffect} from 'react'
import { Modal } from './Modal'
import { InputTextArea } from '@/components/Input/TextArea'
import { InputSelect } from '@/components/Input/Select'
import { ButtonPrimary } from '@/components/Button/Primary'
import tipoOcorrencia from '@/constants/tipoOcorrencia'
import { OcorrenciaContext } from '@/context/OcorrenciaContext'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  id_pessoa: string
}

export function ModalCreateOcorrencia({ isOpen, onClose, id_pessoa }: ModalProps) {
  const [mensagem, setMensagem] = useState('')
  const [tipo, setTipo] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [error, setError] = useState('')

  const ocorrenciaContext = useContext(OcorrenciaContext)

  if(!ocorrenciaContext) return null

  const { createcorrencias } = ocorrenciaContext

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (
      latitude === null ||
      longitude === null
    ) {
      setError('Ative a geolocalização')
      return
    }
    if (
      !tipo ||
      !mensagem.trim()
    ) {
      setError('Preencha todos os campos corretamente')
      return
    }


    const obj = {
      id_pessoa: Number(id_pessoa),
      id_status_ocorrencia: 1,
      id_tipo_ocorrencia: Number(tipo),
      latitude,
      longitude,
      descricao: mensagem
    }


    try {
      setError('')
      createcorrencias(obj)
      console.log('Enviando ocorrência:', mensagem)

      setMensagem('')
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo navegador')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (error) => {
        setError('Não foi possível obter a localização')
        console.error(error)
      }
    )
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Ocorrencia!">
      <form onSubmit={handleSubmit}>
        <InputSelect
          label="Tipo de ocorrencia"
          options={tipoOcorrencia}
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        />

        <InputTextArea
          label="Mensagem"
          placeholder="Escreva sua mensagem..."
          rows={6}
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          error={error}
        />

        <ButtonPrimary type="submit" className="mb-8">
          Enviar Ocorrencia
        </ButtonPrimary>
      </form>
    </Modal>
  )
}
