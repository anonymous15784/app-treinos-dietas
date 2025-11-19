"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dumbbell, Loader2, CheckCircle, ArrowLeft, CreditCard, Lock } from "lucide-react"
import Link from "next/link"

interface FormData {
  nome: string
  idade: string
  peso: string
  altura: string
  sexo: string
  objetivo: string
  nivel: string
  restricoes: string
  diasTreino: string
}

export default function AppPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
    objetivo: "",
    nivel: "",
    restricoes: "",
    diasTreino: ""
  })

  const [etapa, setEtapa] = useState<"formulario" | "pagamento" | "resultado">("formulario")
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState<any>(null)
  const [erro, setErro] = useState("")
  const [processandoPagamento, setProcessandoPagamento] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")
    
    // Validação básica
    if (!formData.nome || !formData.idade || !formData.peso || !formData.altura || 
        !formData.sexo || !formData.objetivo || !formData.nivel || !formData.diasTreino) {
      setErro("Por favor, preencha todos os campos obrigatórios")
      return
    }

    // Avançar para página de pagamento
    setEtapa("pagamento")
  }

  const processarPagamento = async () => {
    setProcessandoPagamento(true)
    setErro("")

    // Simular processamento de pagamento (3 segundos)
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Após "pagamento confirmado", gerar o plano
    setLoading(true)

    try {
      const response = await fetch("/api/gerar-plano", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar plano")
      }

      setResultado(data)
      setEtapa("resultado")
    } catch (error: any) {
      setErro(error.message || "Erro ao processar sua solicitação")
      setEtapa("pagamento") // Volta para pagamento em caso de erro
    } finally {
      setLoading(false)
      setProcessandoPagamento(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const voltarFormulario = () => {
    setEtapa("formulario")
    setErro("")
  }

  const novoPlano = () => {
    setEtapa("formulario")
    setResultado(null)
    setErro("")
    setFormData({
      nome: "",
      idade: "",
      peso: "",
      altura: "",
      sexo: "",
      objetivo: "",
      nivel: "",
      restricoes: "",
      diasTreino: ""
    })
  }

  // TELA DE RESULTADO
  if (etapa === "resultado" && resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                FitPro AI
              </span>
            </Link>
            <Button 
              variant="outline" 
              onClick={novoPlano}
              className="border-emerald-500/30 text-emerald-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 mb-8 flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Plano Criado com Sucesso!</h3>
              <p className="text-gray-400">Seu plano personalizado está pronto. Salve ou imprima para começar hoje mesmo!</p>
            </div>
          </div>

          {/* Plano de Treino */}
          <Card className="bg-slate-800/50 border-slate-700 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Seu Plano de Treino</h2>
                <p className="text-gray-400">Personalizado para {formData.nome}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                {resultado.treino}
              </div>
            </div>
          </Card>

          {/* Plano Alimentar */}
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-3 rounded-xl">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Seu Plano Alimentar</h2>
                <p className="text-gray-400">Dieta balanceada para seus objetivos</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                {resultado.dieta}
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">
              💡 Dica: Salve esta página ou tire um print para ter seu plano sempre à mão!
            </p>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Imprimir Plano
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // TELA DE PAGAMENTO
  if (etapa === "pagamento") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                FitPro AI
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Finalizar Pagamento
            </h1>
            <p className="text-xl text-gray-400">
              Último passo para receber seu plano personalizado
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 p-8">
            {/* Resumo do Pedido */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h3>
              <div className="bg-slate-900/50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Plano Personalizado FitPro AI</span>
                  <span className="text-white font-semibold">R$ 6,99</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-bold text-emerald-400">R$ 6,99</span>
                </div>
              </div>
            </div>

            {/* Informações do Cliente */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Seus Dados</h3>
              <div className="bg-slate-900/50 rounded-lg p-6 space-y-2">
                <p className="text-gray-300"><span className="text-gray-500">Nome:</span> {formData.nome}</p>
                <p className="text-gray-300"><span className="text-gray-500">Idade:</span> {formData.idade} anos</p>
                <p className="text-gray-300"><span className="text-gray-500">Objetivo:</span> {formData.objetivo}</p>
              </div>
            </div>

            {/* Simulação de Pagamento */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Dados do Cartão
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Número do Cartão</Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    className="bg-slate-900 border-slate-700 text-white"
                    disabled={processandoPagamento || loading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white mb-2 block">Validade</Label>
                    <Input
                      placeholder="MM/AA"
                      className="bg-slate-900 border-slate-700 text-white"
                      disabled={processandoPagamento || loading}
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">CVV</Label>
                    <Input
                      placeholder="123"
                      className="bg-slate-900 border-slate-700 text-white"
                      disabled={processandoPagamento || loading}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-white mb-2 block">Nome no Cartão</Label>
                  <Input
                    placeholder="Nome como está no cartão"
                    className="bg-slate-900 border-slate-700 text-white"
                    disabled={processandoPagamento || loading}
                  />
                </div>
              </div>
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 mb-6">
                {erro}
              </div>
            )}

            {/* Botões */}
            <div className="space-y-4">
              <Button
                onClick={processarPagamento}
                disabled={processandoPagamento || loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg py-6"
              >
                {processandoPagamento ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando pagamento...
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Gerando seu plano...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Pagar R$ 6,99 e Receber Plano
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={voltarFormulario}
                disabled={processandoPagamento || loading}
                className="w-full border-slate-700 text-gray-400"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Formulário
              </Button>
            </div>

            <p className="text-center text-gray-500 text-xs mt-6">
              🔒 Pagamento 100% seguro e criptografado
            </p>
          </Card>
        </div>
      </div>
    )
  }

  // TELA DE FORMULÁRIO
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FitPro AI
            </span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Crie Seu Plano Personalizado
          </h1>
          <p className="text-xl text-gray-400">
            Preencha o formulário abaixo para receber seu treino e dieta
          </p>
        </div>

        {/* Form */}
        <Card className="bg-slate-800/50 border-slate-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <Label htmlFor="nome" className="text-white mb-2 block">Nome Completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Seu nome"
                required
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>

            {/* Idade e Sexo */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idade" className="text-white mb-2 block">Idade</Label>
                <Input
                  id="idade"
                  type="number"
                  value={formData.idade}
                  onChange={(e) => handleChange("idade", e.target.value)}
                  placeholder="Ex: 25"
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="sexo" className="text-white mb-2 block">Sexo</Label>
                <Select value={formData.sexo} onValueChange={(value) => handleChange("sexo", value)} required>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Peso e Altura */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="peso" className="text-white mb-2 block">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  step="0.1"
                  value={formData.peso}
                  onChange={(e) => handleChange("peso", e.target.value)}
                  placeholder="Ex: 75.5"
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="altura" className="text-white mb-2 block">Altura (cm)</Label>
                <Input
                  id="altura"
                  type="number"
                  value={formData.altura}
                  onChange={(e) => handleChange("altura", e.target.value)}
                  placeholder="Ex: 175"
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>
            </div>

            {/* Objetivo */}
            <div>
              <Label htmlFor="objetivo" className="text-white mb-2 block">Objetivo Principal</Label>
              <Select value={formData.objetivo} onValueChange={(value) => handleChange("objetivo", value)} required>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perder-peso">Perder Peso / Emagrecer</SelectItem>
                  <SelectItem value="ganhar-massa">Ganhar Massa Muscular</SelectItem>
                  <SelectItem value="definir">Definição Muscular</SelectItem>
                  <SelectItem value="condicionamento">Melhorar Condicionamento</SelectItem>
                  <SelectItem value="saude">Saúde e Bem-estar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nível */}
            <div>
              <Label htmlFor="nivel" className="text-white mb-2 block">Nível de Experiência</Label>
              <Select value={formData.nivel} onValueChange={(value) => handleChange("nivel", value)} required>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Selecione seu nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante (nunca treinei ou parei há muito tempo)</SelectItem>
                  <SelectItem value="intermediario">Intermediário (treino há alguns meses)</SelectItem>
                  <SelectItem value="avancado">Avançado (treino há mais de 1 ano)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dias de Treino */}
            <div>
              <Label htmlFor="diasTreino" className="text-white mb-2 block">Quantos dias por semana pode treinar?</Label>
              <Select value={formData.diasTreino} onValueChange={(value) => handleChange("diasTreino", value)} required>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 dias por semana</SelectItem>
                  <SelectItem value="4">4 dias por semana</SelectItem>
                  <SelectItem value="5">5 dias por semana</SelectItem>
                  <SelectItem value="6">6 dias por semana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Restrições */}
            <div>
              <Label htmlFor="restricoes" className="text-white mb-2 block">
                Restrições Alimentares ou Lesões (opcional)
              </Label>
              <Textarea
                id="restricoes"
                value={formData.restricoes}
                onChange={(e) => handleChange("restricoes", e.target.value)}
                placeholder="Ex: Intolerância à lactose, lesão no joelho, vegetariano..."
                className="bg-slate-900 border-slate-700 text-white min-h-[100px]"
              />
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                {erro}
              </div>
            )}

            {/* Preço e Submit */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Investimento</p>
                  <p className="text-4xl font-bold text-white">R$ 6,99</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">Pagamento único</p>
                  <p className="text-gray-400 text-sm">Acesso instantâneo</p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg py-6"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Continuar para Pagamento
              </Button>

              <p className="text-center text-gray-500 text-xs mt-4">
                🔒 Pagamento seguro • ⚡ Resultado instantâneo • 💯 Garantia de satisfação
              </p>
            </div>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Ao continuar, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </div>
      </div>
    </div>
  )
}
