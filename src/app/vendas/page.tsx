"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Apple, CheckCircle, Star, ArrowRight, Clock, Users, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function VendasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FitPro AI
            </span>
          </Link>
          <Link href="/app">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold">
              Começar Agora
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6">
              Transforme Seu Corpo Hoje
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Seu Plano Completo de
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Treino + Dieta por R$ 6,99
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Pare de perder tempo com planos genéricos. Receba um programa personalizado 
              criado especialmente para o SEU corpo e SEUS objetivos.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Users, value: "2.500+", label: "Clientes Satisfeitos" },
              { icon: Star, value: "4.9/5", label: "Avaliação Média" },
              { icon: Clock, value: "< 5min", label: "Tempo de Criação" },
              { icon: TrendingUp, value: "95%", label: "Taxa de Sucesso" },
            ].map((stat, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6 text-center">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            O Que Você Recebe
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Treino Card */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Plano de Treino</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Exercícios específicos para seu objetivo",
                  "Séries, repetições e descanso detalhados",
                  "Divisão semanal otimizada",
                  "Progressão de carga planejada",
                  "Alternativas para cada exercício",
                  "Dicas de execução e segurança",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Dieta Card */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-teal-500/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-3 rounded-xl">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Plano Alimentar</h3>
              </div>

              <ul className="space-y-4">
                {[
                  "Calorias calculadas para seu objetivo",
                  "Distribuição de macronutrientes",
                  "Sugestões de refeições completas",
                  "Opções de substituição de alimentos",
                  "Horários ideais para cada refeição",
                  "Dicas de hidratação e suplementação",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Exemplo de Plano Gerado
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Veja como seria um plano personalizado para você
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Example Workout */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-emerald-400" />
                Treino - Segunda-feira
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">Supino Reto</h4>
                  <p className="text-gray-400 text-sm">4 séries x 8-10 repetições</p>
                  <p className="text-gray-500 text-xs mt-1">Descanso: 90 segundos</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">Crucifixo Inclinado</h4>
                  <p className="text-gray-400 text-sm">3 séries x 12-15 repetições</p>
                  <p className="text-gray-500 text-xs mt-1">Descanso: 60 segundos</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-400 mb-2">Tríceps Pulley</h4>
                  <p className="text-gray-400 text-sm">3 séries x 12-15 repetições</p>
                  <p className="text-gray-500 text-xs mt-1">Descanso: 45 segundos</p>
                </div>
              </div>
            </Card>

            {/* Example Diet */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Apple className="w-6 h-6 text-teal-400" />
                Dieta - Café da Manhã
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-400 mb-2">Opção 1</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• 3 ovos mexidos</li>
                    <li>• 2 fatias de pão integral</li>
                    <li>• 1 banana</li>
                    <li>• Café sem açúcar</li>
                  </ul>
                  <p className="text-emerald-400 text-xs mt-2">~450 kcal | 30g proteína</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-400 mb-2">Opção 2</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Vitamina de whey protein</li>
                    <li>• Aveia (50g)</li>
                    <li>• Pasta de amendoim (20g)</li>
                    <li>• Frutas vermelhas</li>
                  </ul>
                  <p className="text-emerald-400 text-xs mt-2">~480 kcal | 35g proteína</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            O Que Nossos Clientes Dizem
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Carlos Silva",
                role: "Perdeu 12kg em 3 meses",
                text: "O plano foi perfeito para mim. Nunca imaginei que por menos de R$ 7 eu teria algo tão completo!",
                rating: 5
              },
              {
                name: "Ana Paula",
                role: "Ganhou massa muscular",
                text: "Finalmente consegui resultados! O treino é desafiador mas possível de seguir. Recomendo demais!",
                rating: 5
              },
              {
                name: "Roberto Costa",
                role: "Melhorou condicionamento",
                text: "Melhor investimento que fiz. Por esse preço, vale muito a pena. Plano super detalhado!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500/30 p-12 text-center">
            <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Garantia de Satisfação 100%
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Se você não ficar satisfeito com seu plano personalizado, 
              devolvemos seu dinheiro. Sem perguntas, sem complicações.
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Risco Zero para Você</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto Para Transformar Seu Corpo?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de pessoas que já alcançaram seus objetivos
          </p>

          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold text-white mb-2">R$ 6,99</div>
            <p className="text-gray-400 mb-6">Pagamento único • Acesso instantâneo</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Treino Completo</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Dieta Personalizada</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Suporte Incluso</span>
              </div>
            </div>

            <Link href="/app">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-xl px-12 py-7 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all w-full md:w-auto">
                Criar Meu Plano Agora
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            🔒 Pagamento 100% seguro • ⚡ Acesso imediato • 💯 Garantia de satisfação
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FitPro AI
            </span>
          </Link>
          <p className="text-gray-500 text-sm">
            © 2024 FitPro AI. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
