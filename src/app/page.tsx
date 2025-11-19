"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dumbbell, Apple, Zap, Shield, TrendingUp, CheckCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header/Navbar */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FitPro AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#como-funciona">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Como Funciona
              </Button>
            </Link>
            <Link href="#beneficios">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Benefícios
              </Button>
            </Link>
            <Link href="/app">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Planos Personalizados com IA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Seu Treino e Dieta
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Personalizados em Minutos
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Receba um plano completo de treino e alimentação criado especialmente para você. 
            Tecnologia de ponta por apenas <span className="text-emerald-400 font-bold">R$ 6,99</span> por consulta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/app">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg px-8 py-6 shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all">
                Criar Meu Plano Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/vendas">
              <Button size="lg" variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-lg px-8 py-6">
                Ver Exemplos
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-slate-950" />
                ))}
              </div>
              <span className="text-sm">+2.500 planos criados</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm">4.9/5 avaliação</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="como-funciona" className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Como Funciona?
            </h2>
            <p className="text-xl text-gray-400">
              Simples, rápido e eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 p-8 hover:bg-slate-800 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Preencha o Formulário</h3>
              <p className="text-gray-400 leading-relaxed">
                Informe seus dados: idade, peso, altura, objetivo e nível de experiência.
              </p>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-8 hover:bg-slate-800 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">IA Cria Seu Plano</h3>
              <p className="text-gray-400 leading-relaxed">
                Nossa inteligência artificial analisa seus dados e cria um plano personalizado.
              </p>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-8 hover:bg-slate-800 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Receba e Comece</h3>
              <p className="text-gray-400 leading-relaxed">
                Receba seu treino e dieta completos instantaneamente e comece hoje mesmo!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Por Que Escolher o FitPro AI?
            </h2>
            <p className="text-xl text-gray-400">
              Tecnologia premium por um preço acessível
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Dumbbell, title: "Treinos Personalizados", desc: "Exercícios adaptados ao seu nível e objetivo" },
              { icon: Apple, title: "Dieta Balanceada", desc: "Plano alimentar completo com calorias e macros" },
              { icon: Zap, title: "Resultados Rápidos", desc: "Plano otimizado para máxima eficiência" },
              { icon: Shield, title: "100% Seguro", desc: "Recomendações baseadas em ciência e saúde" },
              { icon: TrendingUp, title: "Progressão Clara", desc: "Acompanhe sua evolução semana a semana" },
              { icon: CheckCircle, title: "Garantia de Qualidade", desc: "Satisfação garantida ou seu dinheiro de volta" },
            ].map((benefit, i) => (
              <Card key={i} className="bg-slate-800/30 border-slate-700 p-6 flex items-start gap-4 hover:bg-slate-800/50 transition-all">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-slate-800/50 border-emerald-500/30 p-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Oferta Especial</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Apenas R$ 6,99
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Por consulta completa • Treino + Dieta Personalizados
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Plano de Treino Completo</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Dieta Personalizada</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Resultados Instantâneos</span>
              </div>
            </div>

            <Link href="/app">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-xl px-12 py-7 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all">
                Criar Meu Plano Agora
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500 mt-6">
              Pagamento seguro • Satisfação garantida
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              FitPro AI
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 FitPro AI. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Consulte um profissional de saúde antes de iniciar qualquer programa de exercícios ou dieta.
          </p>
        </div>
      </footer>
    </div>
  )
}
