export class ViewHelper {

  static displayForSec = (func, arg, sec) => {
    func(arg);
    setTimeout(() => { func(''); }, sec * 1000);
  };

  static copyToClipboard = (ref, setMsg) => {
    ref.current.select();
    document.execCommand('copy');
    ref.current.blur();
    if (setMsg != null) {
      this.displayForSec(setMsg, 'copied!', 2);
    }
  };

  static shorten(text) {
    const textLength = text.length;
    const visibleLength = 4;
    const first = text.substring(0, visibleLength);
    const last = text.substring(textLength - visibleLength);
    return textLength > 12 ? first + '...' + last : text;
  }

}
