import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, contact, telegram } = body;

    const phoneNumber = phone || body.telephone || '';
    const contactInfo = contact || telegram || body.telegram || '';

    if (!name || !phoneNumber || !contactInfo) {
      return NextResponse.json(
        { success: false, error: 'Все поля обязательны' },
        { status: 400 }
      );
    }

    const auth = new JWT({
      email: process.env.SERVICE_ACCOUNT_EMAIL,
      key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(
      process.env.SPREADSHEET_ID!,
      auth
    );

    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Данные формы' });
    }

    await sheet.addRow({
      'Имя': name.trim(),
      'Номер телефона': `'${phoneNumber.trim()}`,
      'Telegram / email': contactInfo.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Заявка отправлена',
    });

  } catch (error: any) {
    console.error('FORM ERROR:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
