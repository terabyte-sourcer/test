import { Toaster } from 'react-hot-toast';

const CustomToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      className:
        'text-base font-medium bg-white text-gray-900 rounded-xl shadow-lg border border-gray-200 px-4 py-3',
      duration: 4000,
    }}
  />
);

export default CustomToaster; 