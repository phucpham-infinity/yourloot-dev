import { useTranslation } from 'react-i18next';
import { Promotion } from '@/services/controller/promotions';

interface PromotionDetailsProps {
  promoType?: string;
  promotion?: Promotion;
}

export default function PromotionDetails({ promoType, promotion }: PromotionDetailsProps) {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language?.toLowerCase().startsWith('ru');
  const tEn = i18n.getFixedT('en');
  if(promotion?.description ){
      return (
          <div className="self-stretch pb-4 flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch rounded-sm flex flex-col justify-start items-start gap-4 border border-[#524877] p-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-4">
                      <div className="justify-center text-slate-300 text-xs font-medium font-['Satoshi']" dangerouslySetInnerHTML={{ __html: promotion?.description}}/>
                  </div>
              </div>
          </div>
      );
  }

  // Render different content based on promotion type
  if (promoType === 'crypto_bonus') {
    return (
      <div className="self-stretch pb-4 flex flex-col justify-start items-start gap-2 w-full">
        <div className="self-stretch rounded-sm flex flex-col justify-start items-start gap-4 border border-[#524877] p-4">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="justify-center text-white text-sm font-medium font-['Satoshi']">{isRu ? t('promotionV2.details.howToParticipate', 'Как принять участие?') : tEn('promotionV2.details.howToParticipate', 'How to Participate?')}</div>
            <div className="self-stretch justify-center text-slate-300 text-xs font-medium font-['Satoshi']" dangerouslySetInnerHTML={{ __html: isRu
                ? t('promotionV2.details.cryptoInstructions', 'Введите промокод YLCrypto<br/>Сделайте свой первый крипто-депозит не менее 10 USDT (или эквивалент)<br/>Получите свой бонус автоматически')
                : tEn('promotionV2.details.cryptoInstructions', 'Enter promo code YLCrypto<br/>Make your first crypto deposit of at least 10 USDT (or equivalent)<br/>Receive your bonus automatically') }}></div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="justify-center text-white text-sm font-medium font-['Satoshi']">{isRu ? t('promotionV2.details.details', 'Детали') : tEn('promotionV2.details.details', 'Details')}</div>
            <div className="justify-center text-slate-300 text-xs font-medium font-['Satoshi']" dangerouslySetInnerHTML={{ __html: (isRu
                ? t('promotionV2.details.cryptoDetails', 'Тип бонуса: Ежедневный бонус за первый крипто-депозит<br/>Размер бонуса: 7%<br/>Минимальный депозит: 10 USDT<br/>Максимальный бонус: 50 USDT<br/>Вейджер: x1<br/>Окно активации: 00:00–23:59 UTC (раз в день)<br/>Продолжительность бонуса: 1 день с момента зачисления<br/>Вывод средств с активным бонусом недоступен')
                : tEn('promotionV2.details.cryptoDetails', 'Bonus type: Daily first crypto deposit bonus<br/>Bonus amount: 7%<br/>Minimum deposit: 10 USDT<br/>Maximum bonus: 50 USDT<br/>Wager: x1<br/>Activation window: 00:00–23:59 UTC (once per day)<br/>Bonus duration: 1 day from crediting<br/>Withdrawals not allowed with active bonus')) }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Default content for other promotion types
  return (
    <div className="self-stretch pb-4 flex flex-col justify-start items-start gap-2 w-full">
      <div className="self-stretch rounded-sm  flex flex-col justify-start items-start gap-4 border border-[#524877] p-4">
        <div className="text-white text-sm font-medium font-['Satoshi'] w-full">{isRu ? 'Как принять участие?' : 'How to Participate?'}</div>
        <div className="self-stretch text-slate-300 text-xs font-medium font-['Satoshi'] w-full" dangerouslySetInnerHTML={{ __html: isRu
                ? 'Зарегистрируйтесь или войдите<br/>Внесите не менее $10<br/>Играйте с увеличенным балансом'
                : 'Register or log in<br/>Deposit at least $10<br/>Play with your boosted balance' }}></div>
        <div className="text-white text-sm font-medium font-['Satoshi'] w-full mt-2">{ isRu ? 'Детали' : 'Details'}</div>
        <div className="self-stretch text-slate-300 text-xs font-medium font-['Satoshi'] w-full" dangerouslySetInnerHTML={{ __html: promotion?.description || (isRu
          ? 'Размер бонуса: 100%<br/>Минимальный депозит: от 10 USD / 1,000 RUB<br/>Максимальная сумма бонуса: 1500 USD / 130,000 RUB<br/>Вейджер: 35'
          : 'Bonus amount: 100%<br/>Minimum deposit: from 10 USD / 1,000 RUB<br/>Maximum bonus amount: 1500 USD / 130,000 RUB<br/>Wager: 35') }}></div>
      </div>
    </div>
  );
}
