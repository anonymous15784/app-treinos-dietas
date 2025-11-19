import { NextRequest, NextResponse } from 'next/server';
import { preference } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    // Validar Access Token
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Configuração do Mercado Pago pendente. Configure a variável MERCADOPAGO_ACCESS_TOKEN.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { title, quantity, price, email, nome, dadosCliente } = body;

    // Validação básica
    if (!title || !quantity || !price) {
      return NextResponse.json(
        { error: 'Título, quantidade e preço são obrigatórios' },
        { status: 400 }
      );
    }

    // Codificar dados do cliente para passar no external_reference
    const externalRef = dadosCliente 
      ? `plano-${Date.now()}-${Buffer.from(JSON.stringify(dadosCliente)).toString('base64')}`
      : `plano-${Date.now()}`;

    // Criar preferência de pagamento
    const preferenceData = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: 'BRL',
        },
      ],
      payer: {
        email: email || 'cliente@email.com',
        name: nome || 'Cliente',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pagamento/sucesso`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pagamento/falha`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pagamento/pendente`,
      },
      auto_return: 'approved' as const,
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
      statement_descriptor: 'Plano Fitness',
      external_reference: externalRef,
    };

    const result = await preference.create({ body: preferenceData });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });

  } catch (error: any) {
    console.error('Erro ao criar preferência de pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento. Tente novamente.' },
      { status: 500 }
    );
  }
}
