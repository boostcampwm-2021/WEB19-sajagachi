import React, { useState } from 'react';
import ErrorPopper from '../common/error-popper';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

function useError(): [(msg: string) => void, () => EmotionJSX.Element] {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isOn, setIsOn] = useState<boolean>(false);

  const popError = (msg: string) => {
    setErrorMsg(msg);
    setIsOn(true);
    setTimeout(() => setIsOn(false), 3000);
  };

  const renderError = () => {
    return <>{isOn && <ErrorPopper alert={isOn} errorMsg={errorMsg} />}</>;
  };

  return [popError, renderError];
}

export default useError;
