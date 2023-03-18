import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { adminStorage } from "~firebase/admin-config";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  src: Required<string>;
};

const URL_REGEX = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#]+\.?)+(\/[^\s]*)?$/i;

export const ImageLoader = ({ src, ...props }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    let isSubscribed = true;

    const isUrl = URL_REGEX.test(src);

    if (!isUrl) {
      getDownloadURL(ref(adminStorage, src)).then((url) => {
        if (isSubscribed) setImageSrc(url);
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [src]);

  return <img {...props} src={imageSrc} />;
};
