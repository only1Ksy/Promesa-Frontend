import { useAlertContext } from '@/components/common/alert/alert-provider';

const useAlert = () => {
  const { showAlert } = useAlertContext();
  return showAlert;
};

export default useAlert;
