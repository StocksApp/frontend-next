import { useRouter } from 'next/router';
import { links } from '../config/urls';
import { isSameOrigin } from '../utils/path';
import { isClient } from '../utils/ssr';

const useCallbackUrl = () => {
  const { query } = useRouter();

  const getCallbackUrl = () => {
    if (!isClient) return '';

    let { callbackUrl } = query;
    if (!callbackUrl) return links.game.browse;

    if (Array.isArray(callbackUrl)) [callbackUrl] = callbackUrl;
    return isSameOrigin(callbackUrl) ? callbackUrl : links.game.browse;
  };
  return { callbackUrl: getCallbackUrl() };
};

export default useCallbackUrl;
