export interface EditModalProps {
  error: string | null;
  isLoading: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (email: string) => void;
}
