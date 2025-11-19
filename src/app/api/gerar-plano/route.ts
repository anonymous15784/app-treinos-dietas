import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: NextRequest) {
  try {
    // Validar API key em runtime
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Configuração da API OpenAI pendente. Configure a variável OPENAI_API_KEY." },
        { status: 500 }
      )
    }

    // Instanciar OpenAI apenas em runtime
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const body = await request.json()
    const { nome, idade, peso, altura, sexo, objetivo, nivel, restricoes, diasTreino } = body

    // Validação básica
    if (!nome || !idade || !peso || !altura || !sexo || !objetivo || !nivel || !diasTreino) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      )
    }

    // Calcular IMC
    const alturaMetros = parseFloat(altura) / 100
    const imc = (parseFloat(peso) / (alturaMetros * alturaMetros)).toFixed(1)

    // Prompt para gerar treino
    const promptTreino = `
Você é um personal trainer profissional. Crie um plano de treino COMPLETO e DETALHADO para:

DADOS DO CLIENTE:
- Nome: ${nome}
- Idade: ${idade} anos
- Sexo: ${sexo}
- Peso: ${peso}kg
- Altura: ${altura}cm
- IMC: ${imc}
- Objetivo: ${objetivo}
- Nível: ${nivel}
- Dias de treino: ${diasTreino} dias por semana
${restricoes ? `- Restrições/Lesões: ${restricoes}` : ""}

INSTRUÇÕES:
1. Crie um plano de treino semanal COMPLETO com divisão de grupos musculares
2. Para CADA DIA, liste os exercícios com:
   - Nome do exercício
   - Séries x Repetições
   - Tempo de descanso
   - Dicas de execução
3. Inclua aquecimento e alongamento
4. Adapte a intensidade ao nível do aluno
5. Considere as restrições mencionadas
6. Seja específico e profissional

FORMATO:
Use formatação clara com títulos, subtítulos e listas.
Seja detalhado mas objetivo.
`

    // Prompt para gerar dieta
    const promptDieta = `
Você é um nutricionista profissional. Crie um plano alimentar COMPLETO e DETALHADO para:

DADOS DO CLIENTE:
- Nome: ${nome}
- Idade: ${idade} anos
- Sexo: ${sexo}
- Peso: ${peso}kg
- Altura: ${altura}cm
- IMC: ${imc}
- Objetivo: ${objetivo}
- Nível de atividade: treina ${diasTreino} dias por semana
${restricoes ? `- Restrições alimentares: ${restricoes}` : ""}

INSTRUÇÕES:
1. Calcule as calorias diárias necessárias baseado no objetivo
2. Distribua macronutrientes (proteínas, carboidratos, gorduras)
3. Crie um cardápio COMPLETO com:
   - Café da manhã (2 opções)
   - Lanche da manhã (2 opções)
   - Almoço (2 opções)
   - Lanche da tarde (2 opções)
   - Jantar (2 opções)
   - Ceia (opcional)
4. Para cada refeição, liste:
   - Alimentos específicos com quantidades
   - Calorias aproximadas
   - Macros principais
5. Inclua dicas de hidratação
6. Considere as restrições alimentares
7. Seja específico com quantidades (gramas, unidades)

FORMATO:
Use formatação clara com títulos, subtítulos e listas.
Seja detalhado mas prático.
`

    // Gerar treino e dieta em paralelo
    const [treinoResponse, dietaResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Você é um personal trainer experiente que cria planos de treino personalizados, detalhados e profissionais."
          },
          {
            role: "user",
            content: promptTreino
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
      openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Você é um nutricionista experiente que cria planos alimentares personalizados, detalhados e práticos."
          },
          {
            role: "user",
            content: promptDieta
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    ])

    const treino = treinoResponse.choices[0].message.content
    const dieta = dietaResponse.choices[0].message.content

    return NextResponse.json({
      treino,
      dieta,
      cliente: {
        nome,
        idade,
        peso,
        altura,
        imc,
        objetivo,
        nivel
      }
    })

  } catch (error: any) {
    console.error("Erro ao gerar plano:", error)
    return NextResponse.json(
      { error: "Erro ao gerar seu plano. Tente novamente." },
      { status: 500 }
    )
  }
}
