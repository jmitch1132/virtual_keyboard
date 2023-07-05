import './Keyboard.css';
import { useState, useMemo } from 'react';

import clsx from 'clsx';

import {
  KeyboardBackspace,
  SpaceBarRounded,
  KeyboardCapslockRounded,
  CheckRounded,
  KeyboardReturnRounded,
  CloseRounded,
  KeyboardRounded
} from '@mui/icons-material';

const keyboardLayout = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'backspace',
  '',
  'clear',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '',
  'caps',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'enter',
  '',
  'done',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '?',
  '',
  'space'
];

const specialKeys: ReadonlySet<string> = new Set([
  'enter',
  'caps',
  'done',
  'backspace'
]);

export function Keyboard() {
  const [capsLock, setCapsLock] = useState(false);
  const [open, toggleOpen] = useState(false);
  const [input, setInput] = useState('');

  const keyboardKeys = useMemo(() => {
    function getKey(key: string) {
      switch (key) {
        case '': {
          return <br />;
        }
        case 'backspace': {
          return (
            <Key
              value={key}
              icon={<KeyboardBackspace />}
              onClick={() =>
                setInput((input) => input.substring(0, input.length - 1))
              }
            />
          );
        }
        case 'caps': {
          return (
            <Key
              value={key}
              icon={<KeyboardCapslockRounded />}
              onClick={() => setCapsLock((caps) => !caps)}
              className={capsLock ? 'keyboard_key--active' : undefined}
            />
          );
        }
        case 'done': {
          return (
            <Key value={key} icon={<CheckRounded />} onClick={toggleKeyboard} />
          );
        }
        case 'space': {
          return (
            <Key
              value={key}
              icon={<SpaceBarRounded />}
              onClick={() => setInput((input) => input + ' ')}
            />
          );
        }
        case 'enter': {
          return (
            <Key
              value={key}
              icon={<KeyboardReturnRounded />}
              onClick={() => setInput((input) => input + '\n')}
            />
          );
        }
        case 'clear': {
          return (
            <Key
              className="clear"
              value={'Clear'}
              onClick={() => setInput(() => '')}
            />
          );
        }
        default: {
          const casedKey = capsLock ? key.toUpperCase() : key.toLowerCase();
          return (
            <Key
              value={casedKey}
              onClick={() => setInput((input) => input + casedKey)}
            />
          );
        }
      }
    }
    return keyboardLayout.map((k) => {
      return getKey(k);
    });
  }, [capsLock]);

  function toggleKeyboard() {
    toggleOpen((open) => !open);
  }

  return (
    <div className="container">
      <textarea
        value={input}
        className="textarea"
        placeholder="Once Upon a Time..."
        onClick={() => toggleOpen(true)}
      />

      {open ? (
        <div className="keyboard">
          <Key
            value={'key'}
            icon={<CloseRounded />}
            className="close"
            onClick={toggleKeyboard}
          />
          <div className="keyboard_keys">{keyboardKeys}</div>
        </div>
      ) : (
        <Key
          value={'key'}
          icon={<KeyboardRounded />}
          className="keyboard-button"
          onClick={toggleKeyboard}
        />
      )}
    </div>
  );
}

function Key({
  value,
  onClick,
  icon,
  className
}: {
  value: string;
  onClick: () => void;
  icon?: JSX.Element;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={clsx(className, getKeyClass(value))}
      onClick={onClick}
    >
      {icon ?? value}
    </button>
  );
}

function getKeyClass(key: string) {
  return clsx('keyboard_key', {
    'keyboard_key--wide': specialKeys.has(key),
    'keyboard_key--extra-wide': key === 'space',
    'keyboard_key--dark': key === 'done',
    'keyboard_key--activate': key === 'caps'
  });
}
