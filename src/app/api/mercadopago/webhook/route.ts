import { NextRequest, NextResponse } from 'next/server';
import { payment } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    // Validar Access Token
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Configuração do Mercado Pago pendente.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { data } = body;

    // Verificar se é uma notificação de pagamento
    if (data && data.id) {
      const paymentId = data.id;

      // Buscar informações do pagamento
      const paymentInfo = await payment.get({ id: paymentId });

      console.log('Pagamento recebido:', {
        id: paymentInfo.id,
        status: paymentInfo.status,
        status_detail: paymentInfo.status_detail,
        transaction_amount: paymentInfo.transaction_amount,
        external_reference: paymentInfo.external_reference,
        payer: paymentInfo.payer,
      });

      // Processar pagamento aprovado
      if (paymentInfo.status === 'approved') {
        console.log('✅ Pagamento aprovado!');
        
        // Extrair dados do cliente do external_reference
        const externalRef = paymentInfo.external_reference;
        if (externalRef && externalRef.includes('-')) {
          const parts = externalRef.split('-');
          if (parts.length >= 3) {
            try {
              // Decodificar dados do cliente
              const dadosBase64 = parts.slice(2).join('-');
              const dadosJson = Buffer.from(dadosBase64, 'base64').toString('utf-8');
              const dadosCliente = JSON.parse(dadosJson);

              console.log('Gerando plano para cliente:', dadosCliente.nome);

              // Chamar API de gerar plano
              const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
              const gerarPlanoResponse = await fetch(`${baseUrl}/api/gerar-plano`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCliente),
              });

              if (gerarPlanoResponse.ok) {
                const planoGerado = await gerarPlanoResponse.json();
                console.log('✅ Plano gerado com sucesso para:', dadosCliente.nome);
                
                // Aqui você pode:
                // - Salvar no banco de dados
                // - Enviar por email
                // - Armazenar em cache
                // Por enquanto, apenas logamos
                
                return NextResponse.json({ 
                  received: true, 
                  plano_gerado: true,
                  cliente: dadosCliente.nome 
                });
              } else {
                console.error('❌ Erro ao gerar plano:', await gerarPlanoResponse.text());
                return NextResponse.json({ 
                  received: true, 
                  plano_gerado: false,
                  error: 'Erro ao gerar plano' 
                });
              }
            } catch (error) {
              console.error('❌ Erro ao processar dados do cliente:', error);
              return NextResponse.json({ 
                received: true, 
                plano_gerado: false,
                error: 'Dados do cliente inválidos' 
              });
            }
          }
        }
        
        // Se não tem dados do cliente, apenas confirma recebimento
        return NextResponse.json({ 
          received: true, 
          plano_gerado: false,
          message: 'Pagamento aprovado mas sem dados do cliente' 
        });
      }

      // Outros status
      switch (paymentInfo.status) {
        case 'pending':
          console.log('⏳ Pagamento pendente');
          break;
        case 'rejected':
          console.log('❌ Pagamento rejeitado');
          break;
        default:
          console.log('Status:', paymentInfo.status);
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: false });

  } catch (error: any) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
