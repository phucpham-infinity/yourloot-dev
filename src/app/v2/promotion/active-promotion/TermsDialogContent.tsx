import CustomButton from '@/components/common/custom-button';
import TermsAndConditions from '@/app/v2/promotion/active-promotion/TermsAndConditions';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@/assets/images/close.svg';
import { Promotion } from '@/services/controller/promotions';

interface TermsDialogContentProps {
  onClose: () => void;
  promoType?: string;
  promotion?: Promotion;
}

export default function TermsDialogContent({ onClose, promoType, promotion }: TermsDialogContentProps) {
  const { t } = useTranslation();

  return (
    <div className="w-[644px] bg-zinc-950 rounded-[10px] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-slate-800 backdrop-blur-[10px]">
        {/* Centered title */}
        <div className="h-4 left-1/2 -translate-x-1/2 top-[16px] absolute inline-flex justify-center items-center gap-2">
          <div className="justify-center text-white text-base font-medium font-['Satoshi']">
            {t('promotionV2.termsAndConditions1', 'Terms & Conditions')}
          </div>
        </div>
        {/* Top-right close button with close.svg, no border */}
        <div className="absolute right-2 top-[10px]">
          <CustomButton
            aria-label="Close"
            variant="invisible"
            height={24}
            onClick={onClose}
            label={<img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />}
            className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
            style={{ padding: 0, borderRadius: 0 }}
          />
        </div>
      </div>
      {/* Body */}
      <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
        <div className="self-stretch relative flex flex-col justify-center items-center gap-4 overflow-hidden">
          <div className="self-stretch justify-center">
            <TermsAndConditions promoType={promoType} promotion={promotion} />
          </div>
          {/* subtle bottom fade like in raw.tsx */}
          <div className="w-full h-9 left-0 bottom-0 absolute bg-gradient-to-b from-zinc-950/0 to-zinc-950 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
