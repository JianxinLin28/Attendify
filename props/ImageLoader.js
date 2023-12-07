import * as React from 'react';
import { Asset } from 'expo-asset';


const images = [
  require('../assets/bluetooth-scan-icon.png'),
  require('../assets/qr-scan-icon.png'),
  require('../assets/add-icon.png'),
  require('../assets/clicker-icon.png'),
  require('../assets/profile-icon.png'),
  require('../assets/BSCenter.png'),
  require('../assets/BSInner.png'),
  require('../assets/BSOuter.png')
];

export function loadImages() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const cacheResources = async () => {
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });

      return Promise.all(cacheImages);
    }

    React.useEffect(() => {
        const loadResources = async () => {
          await cacheResources();
          setIsLoaded(true);
        };

        loadResources();
    }, []);

    return isLoaded;
}
