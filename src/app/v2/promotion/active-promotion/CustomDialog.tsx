import CustomButton from '@/components/common/custom-button';
import { useTranslation } from 'react-i18next';

interface DialogExampleProps {
  title?: string;
  message?: string;
  primaryButtonLabel?: string;
  primaryButtonVariant?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  imageSrc?: string;
  // New props to control loading/disabled state inside dialog
  isProcessing?: boolean;
  processingLabel?: string;
  disableActions?: boolean;
  secondaryButtonVariant?: string
}

export default function CustomDialog({
  title,
  message,
  primaryButtonLabel,
  primaryButtonVariant = "deactivate",
  secondaryButtonVariant = "muted",
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  imageSrc = "https://placehold.co/80x80",
  isProcessing = false,
  processingLabel,
  disableActions = false
}: DialogExampleProps) {
  // Localize default texts if props are not provided
  // We intentionally keep primaryButtonVariant default as before
  const { t } = useTranslation();
  const computedTitle = title ?? t('promotionV2.areYouSure', 'Are you sure?');
  const computedMessage = message ?? t('promotionV2.loseProgress', "You'll lose any progress made with this bonus.");
  const computedPrimaryLabel = isProcessing
    ? (processingLabel ?? t('promotionV2.processing', 'Processing...'))
    : (primaryButtonLabel ?? t('promotionV2.deactivate', 'Deactivate'));
  const computedSecondaryLabel = secondaryButtonLabel ?? t('promotionV2.cancel', 'Cancel');

  return (
    <div className="w-96 md:w-full md:px-4 md:py-6 bg-zinc-950 rounded-tl-[20px] rounded-tr-[20px] backdrop-blur-lg inline-flex flex-col justify-start items-center">
      <div className="self-stretch pb-8 flex flex-col justify-center items-center gap-4">
        <img className="w-20 h-20" src={imageSrc} />
        <div className="self-stretch text-center justify-center text-white text-sm font-medium font-['Satoshi']">{computedTitle}</div>
        <div className="self-stretch text-center justify-center text-slate-400 text-xs font-medium font-['Satoshi']">{computedMessage}</div>
      </div>
      <div className="self-stretch inline-flex justify-start items-start gap-2.5">
        <CustomButton
          // @ts-ignore
          variant={primaryButtonVariant}
          label={computedPrimaryLabel}
          className="flex-1 h-10"
          onClick={disableActions ? undefined : onPrimaryButtonClick}
          disabled={disableActions}
        />
        <CustomButton
            // @ts-ignore
          variant={secondaryButtonVariant}
          label={computedSecondaryLabel}
          className="flex-1 h-10"
          onClick={disableActions ? undefined : onSecondaryButtonClick}
          disabled={disableActions}
        />
      </div>
    </div>
  );
}
