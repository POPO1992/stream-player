const isNavigatorUndef = () => (typeof navigator === 'undefined')
export const isIOS = () => !isNavigatorUndef() && /iPad|iPhone|iPod/.test(navigator.platform)
export const isSafari = () => !isNavigatorUndef() && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
export const isChrome = () =>!isNavigatorUndef() && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
