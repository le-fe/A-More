//https://github.com/lupas/vue3-keypress
import { watch, onMounted, onUnmounted } from "vue";

interface KeyBind {
  keyCode: string;
  modifiers?: ["altKey" | "metaKey" | "ctrlKey" | "shiftKey"];
  preventDefault: boolean;
  success: { (SuccessResult): void };
}

interface KeypressOptions {
  keyEvent: "keydown" | "keypress" | "keyup";
  keyBinds: KeyBind[];
  isActive?: any; // TODO
  onAnyKey?: { (SuccessResult): void };
  onWrongKey?: { (SuccessResult): void };
}

interface KeypressResult {
  event: KeypressResult;
  keyEvent: string;
}

interface SuccessResult extends KeypressResult {
  keyCode: string;
  keyEvent: string;
  modifiers: ["altKey" | "metaKey" | "ctrlKey" | "shiftKey"];
  preventDefault: boolean;
}

const keyCodes = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  "pause/break": 19,
  "caps lock": 20,
  esc: 27,
  space: 32,
  "page up": 33,
  "page down": 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  delete: 46,
  command: 91,
  "left command": 91,
  "right command": 93,
  "numpad *": 106,
  "numpad +": 107,
  "numpad -": 109,
  "numpad .": 110,
  "numpad /": 111,
  "num lock": 144,
  "scroll lock": 145,
  "my computer": 182,
  "my calculator": 183,
  ";": 186,
  "=": 187,
  ",": 188,
  "-": 189,
  ".": 190,
  "/": 191,
  "`": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222,
};

const supportedModifiers = ["altKey", "metaKey", "ctrlKey", "shiftKey"];

export const useKeypress = ({
  keyEvent,
  keyBinds,
  onAnyKey,
  onWrongKey,
  isActive: isListenerActiveRef,
}: KeypressOptions) => {
  let eventListener = null;

  for (const keyBind of keyBinds) {
    keyBind.keyCode = keyCodes[keyBind.keyCode] || keyBind.keyCode;
  }

  const requiredModifiersPressed = (event, modifiers) => {
    return supportedModifiers.every(
      (modifier) => event[modifier] == (modifiers.indexOf(modifier) !== -1)
    );
  };

  const anyModifiersPress = (event, modifiers) => {
    return supportedModifiers.some((modifier) => !!event[modifier]);
  };

  const eventHandler = () => {
    return (event) => {
      const callbackData = (eventData = {}) => ({
        event,
        keyEvent,
        ...eventData,
      });

      if (typeof onAnyKey == "function")
        onAnyKey(callbackData(event) as KeypressResult);

      for (const {
        keyCode,
        modifiers,
        success,
        preventDefault = true,
      } of keyBinds) {
        // Check if the correct keys have been clicked:
        if (keyCode !== event.keyCode) continue;

        if (modifiers && modifiers.length > 0) {
          if (!requiredModifiersPressed(event, modifiers)) continue;
        } else {
          if (anyModifiersPress(event, modifiers)) continue;
        }

        if (preventDefault) event.preventDefault();

        // SUCCESS -> the correct key was pressed if we got to this point
        success(
          callbackData({
            keyCode,
            modifiers,
            preventDefault,
            event,
          } as SuccessResult)
        );

        return !preventDefault;
      }
      if (typeof onWrongKey == "function")
        onWrongKey(callbackData(event) as KeypressResult);
      return null;
    };
  };

  const addListener = () => {
    if (!eventListener) eventListener = eventHandler();
    window.addEventListener(keyEvent, eventListener);
  };

  const removeListener = () => {
    if (!eventListener) return;
    window.removeEventListener(keyEvent, eventListener);
  };

  if (isListenerActiveRef) {
    if (isListenerActiveRef.value) addListener();
    watch(isListenerActiveRef, (active) => {
      active ? addListener() : removeListener();
    });
  } else {
    onMounted(() => addListener());
  }

  onUnmounted(() => removeListener());
};
