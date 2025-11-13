import { useTranslation } from 'react-i18next';
import { Promotion } from '@/services/controller/promotions';

interface TermsAndConditionsProps {
  promoType?: string;
  promotion?: Promotion;
}

export default function TermsAndConditions({ promoType, promotion }: TermsAndConditionsProps) {
  const { i18n } = useTranslation();
  const isRu = i18n.language?.toLowerCase().startsWith('ru');

  const isCrypto = promoType === 'crypto_bonus';

  // If promotion has termsAndConditions field, use it
  if (promotion?.termsAndConditions) {
    return (
      <div className="p-4 text-slate-300 text-xs font-medium font-['Satoshi'] max-h-[70vh] overflow-y-auto">
        <div dangerouslySetInnerHTML={{ __html: promotion.termsAndConditions }} />
      </div>
    );
  }

  return (
    <div className="p-4 text-slate-300 text-xs font-medium font-['Satoshi'] max-h-[70vh] overflow-y-auto">
      {isCrypto ? (
        isRu ? (
          <div className="mb-4">
            <ol className="list-decimal pl-4 space-y-2">
              <li>Бонусное предложение в размере 7% к депозиту доступно только на первое пополнение с помощью криптовалюты в течение дня, при соблюдении условий для начисления.</li>
              <li>Активация возможна ежедневно, только на первый депозит в период с 00:00 UTC по 23:59 UTC после активации промокода “YLCrypto”.</li>
              <li>Для активации бонусного предложения «Крипто Бонус» необходимо ввести промокод, совершить единое пополнение игрового счета на общую сумму от 10 USDT (эквивалент в криптовалюте).</li>
              <li>Максимальная сумма бонуса - 50 USDT.</li>
              <li>Средства будут зачислены на бонусный баланс с вейджером х1.</li>
              <li>При отыгрыше бонуса все средства списываются и поступают на бонусный баланс.</li>
              <li>После отыгрыша бонуса выигрыш переходит на Primary баланс.</li>
              <li>Срок действия бонуса – 1 день с момента начисления.</li>
              <li>В учёт отыгрыша идут ставки совершенные в слотах раздела “Games for bonus”.</li>
              <li>При активном бонусе вывод средств не доступен.</li>
              <li>Только один бонус в казино может быть активен одновременно.</li>
            </ol>
          </div>
        ) : (
          <div className="mb-4">
            <ol className="list-decimal pl-4 space-y-2">
              <li>The 7% bonus on the deposit is available only for the first crypto deposit of the day, provided all accrual requirements are satisfied.</li>
              <li>Activation is possible daily, only for the first deposit within the period from 00:00 UTC to 23:59 UTC after applying the promo code “YLCrypto”.</li>
              <li>To unlock the “Crypto Bonus” offer, enter the promo code and make a single deposit to your gaming account totaling at least 10 USDT (or equivalent in cryptocurrency).</li>
              <li>Maximum bonus amount: 50 USDT.</li>
              <li>Funds will be credited to the bonus balance with a x1 wager.</li>
              <li>While wagering the bonus, all funds are deducted and transferred to the bonus balance.</li>
              <li>Upon completing the bonus wagering, the winnings are transferred to the Primary balance.</li>
              <li>Bonus validity period: 1 day from the moment of crediting.</li>
              <li>Bets placed in slots from the “Games for bonus” section count toward the wagering.</li>
              <li>Withdrawals are not available while a bonus is active.</li>
              <li>Only one bonus can be active in the casino at a time.</li>
            </ol>
          </div>
        )
      ) : (
        isRu ? (
          <div className="mb-4">
            <ol className="list-decimal pl-4 space-y-2">
              <li>Бонусное предложение в размере 100% доступно с 30.05.2025 до 31.12.2025.</li>
              <li>Активация возможна только на первый депозит.</li>
              <li>Максимальная сумма бонуса составляет 1500 USD/130 000 RUB с максимальной выплатой в 15 раз превышающей сумму депозита или  1500 USD/130 000 RUB.</li>
              <li>Для активации бонусного предложения необходимо совершить единое пополнение игрового счета на общую сумму от 10 USD/ 1 000 RUB.</li>
              <li>Бонусные средства будут зачислены на Bonus Balance.</li>
              <li>В учёт отыгрыша бонуса идут ставки совершенные в слотах раздела “Games for bonus”.</li>
              <li>Бонус отыгрывается за реальный баланс, за ту часть на которую был начислен бонус, потом за бонусный.</li>
              <li>Бонусный баланс становится доступным для всех игроков, которые отыграли сумму депозита с основного баланса. Чтобы продолжить игру с использованием бонусных средств, необходимо активировать «Бонусный баланс» в разделе "Управление средствами" в “Профиле”. При успешной активации рядом с «Бонусным балансом» отобразится зеленый знак. В случае ошибки система автоматически покажет соответствующее уведомление.</li>
              <li>Сумму бонуса нужно отыграть 35 раз.</li>
              <li>Выигрыш со ставок, которые не идут в учёт отыгрыша поступает на реальный баланс, однако за эти средства нельзя будет отыгрывать бонус.</li>
              <li>При внесении депозита во время активного бонуса – депозит можно будет использовать для отыгрыша бонуса.</li>
              <li>Срок действия отыгрыша квалифицированного депозита и процентной части бонуса – 7 дней с момента начисления.</li>
              <li>После отыгрыша бонуса для вывода средств необходимо совершить отыгрыш Х1 в соответствии с правилами сайта.</li>
              <li>При активном бонусе вывод средств недоступен.</li>
              <li>Только один бонус в казино может быть активен одновременно.</li>
              <li>После выполнения условия отыгрыша, выигрыш переходит на реальный баланс.</li>
              <li>Если Вы отменяете бонус, то оставшиеся средства на реальном балансе подлежат к отыгрышу х1, бонусные средства будут аннулированы.</li>
              <li>Акция действительна только для одного телефонного номера, счета, адреса, IP адреса, номера банковской карты, крипто-счета. Повторное участие в Акции не допускается. Участие в Акции под видом другого лица не допускается и ведет к аннулированию результатов и блокировке аккаунта без возврата каких-либо средств.</li>
            </ol>
          </div>
        ) : (
          <div className="mb-4">
            <ol className="list-decimal pl-4 space-y-2">
              <li>The 100% bonus offer is available from 30.05.2025 until 31.12.2025.</li>
              <li>Activation is only possible on the first deposit.</li>
              <li>The maximum bonus amount is 1500 USD / 130,000 RUB with a maximum payout of 15 times the deposit amount or 1500 USD / 130,000 RUB.</li>
              <li>To activate the bonus offer, a single deposit of at least 10 USD / 1,000 RUB is required.</li>
              <li>Bonus funds will be credited to the Bonus Balance.</li>
              <li>Only bets placed on slots from the "Games for bonus" section count towards the wagering requirement.</li>
              <li>The bonus is wagered using the real balance first — specifically, the portion on which the bonus was credited — and then from the bonus balance.</li>
              <li>The bonus balance becomes available to all players who have wagered the deposit amount from their main balance. To continue playing using bonus funds, visit "Manage Funds" section in “Profile“ and activate "Bonus Balance" with a single click. If the activation is successful, a green indicator will appear next to "Bonus Balance." In case of an error, the system will automatically display a corresponding notification.</li>
              <li>The bonus amount must be wagered 35 times.</li>
              <li>Winnings from bets that do not count towards the wagering requirement will be credited to the real balance, but these funds cannot be used to wager the bonus.</li>
              <li>If a deposit is made while a bonus is active, the deposited amount can be used to meet the wagering requirement.</li>
              <li>The wagering period for the qualified deposit and the bonus percentage is 7 days from the moment of crediting.</li>
              <li>After completing the bonus wagering, a wagering requirement of X1 must be met for withdrawal according to the site rules.</li>
              <li>Withdrawal is not available during an active bonus.</li>
              <li>Only one bonus can be active in the casino at any given time.</li>
              <li>After fulfilling the wagering requirement, the winnings will be transferred to the real balance.</li>
              <li>If you cancel the bonus, the remaining funds in the real balance will be subject to a X1 wagering requirement, and the bonus funds will be canceled.</li>
              <li>The promotion is valid for only one phone number, account, address, IP address, bank card number, or crypto account. Repeated participation in the promotion is not allowed. Participating in the promotion under a different identity will result in the cancellation of results and account blocking without refunding any funds.</li>
            </ol>
          </div>
        )
      )}
    </div>
  );
}
